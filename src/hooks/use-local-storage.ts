'use client';

import * as React from 'react';

/**
 * Return type for the useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
  /** The current stored value */
  value: T;
  /** Set a new value in localStorage */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Remove the value from localStorage and reset to initial value */
  removeValue: () => void;
  /** Error state if storage operations fail */
  error: Error | null;
}

/**
 * A custom hook for managing state that persists to localStorage with automatic serialization.
 * 
 * Features:
 * - Automatic JSON serialization/deserialization
 * - SSR-safe (checks for window object)
 * - Error handling for storage quota exceeded
 * - TypeScript generics for type safety
 * - Syncs state across browser tabs/windows
 *
 * @template T - The type of the value to store
 * @param key - The localStorage key to use
 * @param initialValue - The initial value if no stored value exists
 * @returns An object containing the current value, setter, remover, and error state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, setValue, removeValue } = useLocalStorage('theme', 'light');
 *
 *   return (
 *     <div>
 *       <p>Current theme: {value}</p>
 *       <button onClick={() => setValue('dark')}>Set Dark</button>
 *       <button onClick={removeValue}>Clear</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With complex types
 * interface User {
 *   name: string;
 *   email: string;
 * }
 * 
 * function UserProfile() {
 *   const { value: user, setValue: setUser } = useLocalStorage<User>('user', {
 *     name: 'Guest',
 *     email: ''
 *   });
 *
 *   return (
 *     <div>
 *       <p>Welcome, {user.name}!</p>
 *       <button onClick={() => setUser({ name: 'John', email: 'john@example.com' })}>
 *         Update User
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
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

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      // SSR check: do nothing if window is not available
      if (typeof window === 'undefined') {
        console.warn('localStorage is not available in SSR environment');
        return;
      }

      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Handle storage quota exceeded or other errors
        const error = err instanceof Error ? err : new Error('Failed to write to localStorage');
        setError(error);
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage
  const removeValue = React.useCallback(() => {
    // SSR check: do nothing if window is not available
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Remove from local storage
      window.localStorage.removeItem(key);
      
      // Reset to initial value
      setStoredValue(initialValue);
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove from localStorage');
      setError(error);
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to this key from other tabs/windows
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
      setValue,
      removeValue,
      error,
    }),
    [storedValue, setValue, removeValue, error]
  );
}
