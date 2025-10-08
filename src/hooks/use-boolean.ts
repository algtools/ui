'use client';

import * as React from 'react';

/**
 * Return type for the useBoolean hook
 */
export interface UseBooleanReturn {
  /** The current boolean value */
  value: boolean;
  /** Set the value to true */
  setTrue: () => void;
  /** Set the value to false */
  setFalse: () => void;
  /** Toggle the current value */
  toggle: () => void;
  /** Set a specific boolean value */
  setValue: (value: boolean) => void;
}

/**
 * A custom hook for managing boolean state with convenient helper functions.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @returns An object containing the current value and helper functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, setTrue, setFalse, toggle } = useBoolean(false);
 *
 *   return (
 *     <div>
 *       <p>Value: {value ? 'true' : 'false'}</p>
 *       <button onClick={setTrue}>Set True</button>
 *       <button onClick={setFalse}>Set False</button>
 *       <button onClick={toggle}>Toggle</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = React.useState<boolean>(initialValue);

  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  const toggle = React.useCallback(() => setValue((prev) => !prev), []);

  return React.useMemo(
    () => ({
      value,
      setValue,
      setTrue,
      setFalse,
      toggle,
    }),
    [value, setTrue, setFalse, toggle]
  );
}
