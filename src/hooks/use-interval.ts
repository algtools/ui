'use client';

import * as React from 'react';

/**
 * Options for configuring the useInterval hook
 */
export interface UseIntervalOptions {
  /** Whether the interval should start immediately (default: true) */
  autoStart?: boolean;
}

/**
 * Return type for the useInterval hook
 */
export interface UseIntervalReturn {
  /** Whether the interval is currently running */
  isRunning: boolean;
  /** Start the interval */
  start: () => void;
  /** Pause the interval */
  pause: () => void;
  /** Resume the interval (alias for start) */
  resume: () => void;
  /** Toggle between running and paused states */
  toggle: () => void;
  /** Reset and restart the interval */
  reset: () => void;
}

/**
 * A custom hook for managing setInterval with automatic cleanup and pause/resume functionality.
 *
 * @param callback - The function to call on each interval
 * @param delay - The delay in milliseconds between each call (null to disable)
 * @param options - Configuration options for the interval
 * @returns An object containing control functions for the interval
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [count, setCount] = useState(0);
 *   const { isRunning, pause, resume, toggle } = useInterval(
 *     () => setCount(c => c + 1),
 *     1000
 *   );
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={toggle}>
 *         {isRunning ? 'Pause' : 'Resume'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  options: UseIntervalOptions = {}
): UseIntervalReturn {
  const { autoStart = true } = options;

  // Store the callback in a ref to avoid recreating the interval when it changes
  const savedCallback = React.useRef(callback);
  const intervalId = React.useRef<NodeJS.Timeout | null>(null);
  const autoStartRef = React.useRef(autoStart);
  const [isRunning, setIsRunning] = React.useState(autoStart && delay !== null);
  const [resetCount, setResetCount] = React.useState(0);

  // Update autoStart ref
  React.useEffect(() => {
    autoStartRef.current = autoStart;
  }, [autoStart]);

  // Update the saved callback when it changes
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Handle delay changes - start if autoStart is true and delay becomes non-null
  const prevDelayRef = React.useRef<number | null>(delay);
  React.useEffect(() => {
    const prevDelay = prevDelayRef.current;
    prevDelayRef.current = delay;

    // If delay changes from null to a number and autoStart is true, start the interval
    if (prevDelay === null && delay !== null && autoStartRef.current) {
      setIsRunning(true);
    } else if (delay === null && isRunning) {
      setIsRunning(false);
    }
  }, [delay, isRunning]);

  // Clear interval on unmount or when delay changes
  React.useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  // Set up and manage the interval
  React.useEffect(() => {
    if (delay === null || !isRunning) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      return;
    }

    intervalId.current = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [delay, isRunning, resetCount]);

  const start = React.useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = React.useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = React.useCallback(() => {
    setIsRunning(true);
  }, []);

  const toggle = React.useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const reset = React.useCallback(() => {
    // Clear the interval first
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    // Restart if autoStart is enabled and delay is not null
    const shouldRun = autoStart && delay !== null;
    setIsRunning(shouldRun);
    // Increment reset count to force interval re-creation
    if (shouldRun) {
      setResetCount((c) => c + 1);
    }
  }, [autoStart, delay]);

  return React.useMemo(
    () => ({
      isRunning,
      start,
      pause,
      resume,
      toggle,
      reset,
    }),
    [isRunning, start, pause, resume, toggle, reset]
  );
}
