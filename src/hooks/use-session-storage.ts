'use client';

import * as React from 'react';

/**
 * Return type for the useSessionStorage hook
 */
export interface UseSessionStorageReturn<T> {
  /** The current stored value */
  value: T;
  /** Set a new value in sessionStorage */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Remove the value from sessionStorage and reset to initial value */
  removeValue: () => void;
  /** Error state if storage operations fail */
  error: Error | null;
}

/**
 * A custom hook for managing state that persists to sessionStorage with automatic serialization.
 *
 * Features:
 * - Automatic JSON serialization/deserialization
 * - SSR-safe (checks for window object)
 * - Error handling for storage quota exceeded
 * - TypeScript generics for type safety
 * - Session-scoped storage (cleared when tab closes)
 *
 * @template T - The type of the value to store
 * @param key - The sessionStorage key to use
 * @param initialValue - The initial value if no stored value exists
 * @returns An object containing the current value, setter, remover, and error state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, setValue, removeValue } = useSessionStorage('formData', {});
 *
 *   return (
 *     <div>
 *       <p>Form data: {JSON.stringify(value)}</p>
 *       <button onClick={() => setValue({ name: 'John' })}>Set Data</button>
 *       <button onClick={removeValue}>Clear</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With complex types
 * interface FormState {
 *   step: number;
 *   data: Record<string, string>;
 * }
 *
 * function MultiStepForm() {
 *   const { value: formState, setValue: setFormState } = useSessionStorage<FormState>('formState', {
 *     step: 1,
 *     data: {}
 *   });
 *
 *   return (
 *     <div>
 *       <p>Current step: {formState.step}</p>
 *       <button onClick={() => setFormState({ ...formState, step: formState.step + 1 })}>
 *         Next Step
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSessionStorage<T>(key: string, initialValue: T): UseSessionStorageReturn<T> {
  const [error, setError] = React.useState<Error | null>(null);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    // SSR check: return initial value if window is not available
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from session storage by key
      const item = window.sessionStorage.getItem(key);
      // Parse stored json or return initialValue if null
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      // If error, return initial value
      const error = err instanceof Error ? err : new Error('Failed to read from sessionStorage');
      setError(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to sessionStorage
  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      // SSR check: do nothing if window is not available
      if (typeof window === 'undefined') {
        console.warn('sessionStorage is not available in SSR environment');
        return;
      }

      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to session storage
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));

        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Handle storage quota exceeded or other errors
        const error = err instanceof Error ? err : new Error('Failed to write to sessionStorage');
        setError(error);
        console.error(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from sessionStorage
  const removeValue = React.useCallback(() => {
    // SSR check: do nothing if window is not available
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Remove from session storage
      window.sessionStorage.removeItem(key);

      // Reset to initial value
      setStoredValue(initialValue);

      // Clear any previous errors
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove from sessionStorage');
      setError(error);
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
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
