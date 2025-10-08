'use client';

import * as React from 'react';

/**
 * Options for configuring the useCounter hook
 */
export interface UseCounterOptions {
  /** The initial counter value (default: 0) */
  initialValue?: number;
  /** The minimum allowed value (default: -Infinity) */
  min?: number;
  /** The maximum allowed value (default: Infinity) */
  max?: number;
}

/**
 * Return type for the useCounter hook
 */
export interface UseCounterReturn {
  /** The current counter value */
  value: number;
  /** Increment the counter by a specified amount (default: 1) */
  increment: (delta?: number) => void;
  /** Decrement the counter by a specified amount (default: 1) */
  decrement: (delta?: number) => void;
  /** Reset the counter to its initial value */
  reset: () => void;
  /** Set a specific counter value */
  setValue: (value: number | ((prev: number) => number)) => void;
}

/**
 * A custom hook for managing counter state with convenient helper functions.
 *
 * @param options - Configuration options for the counter
 * @returns An object containing the current value and helper functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, increment, decrement, reset, setValue } = useCounter({
 *     initialValue: 0,
 *     min: 0,
 *     max: 10
 *   });
 *
 *   return (
 *     <div>
 *       <p>Count: {value}</p>
 *       <button onClick={() => increment()}>Increment</button>
 *       <button onClick={() => decrement()}>Decrement</button>
 *       <button onClick={reset}>Reset</button>
 *       <button onClick={() => setValue(5)}>Set to 5</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
  } = options;

  // Clamp the initial value to respect min/max boundaries
  const clampedInitialValue = Math.min(Math.max(initialValue, min), max);
  
  const [value, setValueInternal] = React.useState<number>(clampedInitialValue);

  // Store min, max, and initialValue in refs to avoid recreating callbacks when they change
  const minRef = React.useRef(min);
  const maxRef = React.useRef(max);
  const initialValueRef = React.useRef(clampedInitialValue);

  // Update refs when options change
  React.useEffect(() => {
    minRef.current = min;
    maxRef.current = max;
    initialValueRef.current = clampedInitialValue;
  }, [min, max, clampedInitialValue]);

  // Helper function to clamp a value within bounds
  const clamp = React.useCallback((val: number): number => {
    return Math.min(Math.max(val, minRef.current), maxRef.current);
  }, []);

  const setValue = React.useCallback((newValue: number | ((prev: number) => number)) => {
    setValueInternal((prev) => {
      const nextValue = typeof newValue === 'function' ? newValue(prev) : newValue;
      return clamp(nextValue);
    });
  }, [clamp]);

  const increment = React.useCallback((delta: number = 1) => {
    setValue((prev) => prev + delta);
  }, [setValue]);

  const decrement = React.useCallback((delta: number = 1) => {
    setValue((prev) => prev - delta);
  }, [setValue]);

  const reset = React.useCallback(() => {
    setValueInternal(initialValueRef.current);
  }, []);

  return React.useMemo(
    () => ({
      value,
      increment,
      decrement,
      reset,
      setValue,
    }),
    [value, increment, decrement, reset, setValue]
  );
}
