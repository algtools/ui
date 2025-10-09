'use client';

import * as React from 'react';

/**
 * Return type for the useReadLocalStorage hook
 */
export interface UseReadLocalStorageReturn<T> {
  /** The current stored value (read-only) */
  value: T;
  /** Error state if storage operations fail */
  error: Error | null;
}

/**
 * A custom hook for reading values from localStorage without write capabilities.
 *
 * Features:
 * - Read-only access to localStorage
 * - Automatic JSON deserialization
 * - SSR-safe (checks for window object)
 * - Error handling
 * - TypeScript generics for type safety
 * - Syncs state when localStorage changes from other tabs/windows
 * - No setter function - prevents accidental modifications
 *
 * @template T - The type of the value to read
 * @param key - The localStorage key to read
 * @param initialValue - The fallback value if no stored value exists
 * @returns An object containing the current value and error state
 *
 * @example
 * ```tsx
 * function DisplayTheme() {
 *   const { value: theme } = useReadLocalStorage('theme', 'light');
 *
 *   return <p>Current theme: {theme}</p>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With complex types
 * interface UserPreferences {
 *   theme: 'light' | 'dark';
 *   language: string;
 * }
 *
 * function UserProfile() {
 *   const { value: preferences, error } = useReadLocalStorage<UserPreferences>('preferences', {
 *     theme: 'light',
 *     language: 'en'
 *   });
 *
 *   if (error) {
 *     return <p>Error loading preferences</p>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Theme: {preferences.theme}</p>
 *       <p>Language: {preferences.language}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useReadLocalStorage<T>(key: string, initialValue: T): UseReadLocalStorageReturn<T> {
  const [error, setError] = React.useState<Error | null>(null);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    // SSR check: return initial value if window is not available
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue if null
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      // If error, return initial value
      const error = err instanceof Error ? err : new Error('Failed to read from localStorage');
      setError(error);
      return initialValue;
    }
  });

  // Listen for changes to this key from other tabs/windows or same page
  React.useEffect(() => {
    // SSR check
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
          setError(null);
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Failed to parse storage event');
          setError(error);
        }
      } else if (e.key === key && e.newValue === null) {
        // Key was removed
        setStoredValue(initialValue);
        setError(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return React.useMemo(
    () => ({
      value: storedValue,
      error,
    }),
    [storedValue, error]
  );
}
