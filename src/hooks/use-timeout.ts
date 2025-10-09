'use client';

import * as React from 'react';

/**
 * Return type for the useTimeout hook
 */
export interface UseTimeoutReturn {
  /** Whether the timeout is currently active (pending) */
  isActive: boolean;
  /** Start or restart the timeout */
  start: () => void;
  /** Cancel the timeout */
  cancel: () => void;
  /** Reset the timeout (cancel and start again) */
  reset: () => void;
}

/**
 * A custom hook for managing setTimeout with automatic cleanup.
 *
 * @param callback - The function to call when the timeout expires
 * @param delay - The delay in milliseconds (null to disable)
 * @returns An object containing control functions for the timeout
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [message, setMessage] = useState('');
 *   const { isActive, reset, cancel } = useTimeout(
 *     () => setMessage('Timeout executed!'),
 *     3000
 *   );
 *
 *   return (
 *     <div>
 *       <p>{message}</p>
 *       <p>Timeout is {isActive ? 'active' : 'inactive'}</p>
 *       <button onClick={reset}>Reset Timeout</button>
 *       <button onClick={cancel}>Cancel Timeout</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null): UseTimeoutReturn {
  // Store the callback in a ref to avoid recreating the timeout when it changes
  const savedCallback = React.useRef(callback);
  const timeoutId = React.useRef<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = React.useState(false);

  // Update the saved callback when it changes
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Clear timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);

  const cancel = React.useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    setIsActive(false);
  }, []);

  const start = React.useCallback(() => {
    // Clear any existing timeout
    cancel();

    if (delay === null) {
      return;
    }

    setIsActive(true);
    timeoutId.current = setTimeout(() => {
      savedCallback.current();
      setIsActive(false);
      timeoutId.current = null;
    }, delay);
  }, [delay, cancel]);

  const reset = React.useCallback(() => {
    cancel();
    start();
  }, [cancel, start]);

  // Auto-start the timeout when delay changes and is not null
  React.useEffect(() => {
    if (delay !== null) {
      start();
    } else {
      cancel();
    }
  }, [delay, start, cancel]);

  return React.useMemo(
    () => ({
      isActive,
      start,
      cancel,
      reset,
    }),
    [isActive, start, cancel, reset]
  );
}
