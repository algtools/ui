'use client';

import * as React from 'react';
import { useInterval } from './use-interval';

/**
 * Options for configuring the useCountdown hook
 */
export interface UseCountdownOptions {
  /** The interval in milliseconds for the countdown tick (default: 1000) */
  interval?: number;
  /** Whether the countdown should start immediately (default: false) */
  autoStart?: boolean;
  /** Callback function to execute when countdown reaches zero */
  onComplete?: () => void;
}

/**
 * Return type for the useCountdown hook
 */
export interface UseCountdownReturn {
  /** The current time remaining in milliseconds */
  timeRemaining: number;
  /** Whether the countdown is currently running */
  isRunning: boolean;
  /** Start the countdown */
  start: () => void;
  /** Pause the countdown */
  pause: () => void;
  /** Resume the countdown */
  resume: () => void;
  /** Toggle between running and paused states */
  toggle: () => void;
  /** Reset the countdown to the initial duration */
  reset: () => void;
  /** Set a new countdown duration (in milliseconds) */
  setDuration: (duration: number) => void;
}

/**
 * A custom hook for managing countdown timers with play/pause controls.
 *
 * @param initialDuration - The initial countdown duration in milliseconds
 * @param options - Configuration options for the countdown
 * @returns An object containing the time remaining and control functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { timeRemaining, isRunning, start, pause, reset } = useCountdown(60000, {
 *     onComplete: () => console.log('Countdown finished!'),
 *   });
 *
 *   const seconds = Math.floor(timeRemaining / 1000);
 *
 *   return (
 *     <div>
 *       <p>Time remaining: {seconds}s</p>
 *       <button onClick={isRunning ? pause : start}>
 *         {isRunning ? 'Pause' : 'Start'}
 *       </button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCountdown(
  initialDuration: number,
  options: UseCountdownOptions = {}
): UseCountdownReturn {
  const { interval = 1000, autoStart = false, onComplete } = options;

  // Store the initial duration and callback in refs
  const initialDurationRef = React.useRef(initialDuration);
  const onCompleteRef = React.useRef(onComplete);

  // State for time remaining
  const [timeRemaining, setTimeRemaining] = React.useState(initialDuration);
  const [duration, setDuration] = React.useState(initialDuration);
  const timeRemainingRef = React.useRef(timeRemaining);

  // Update refs when they change
  React.useEffect(() => {
    initialDurationRef.current = initialDuration;
  }, [initialDuration]);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  // Countdown tick function
  const tick = React.useCallback(() => {
    setTimeRemaining((prevTime) => {
      const newTime = Math.max(0, prevTime - interval);

      // Call onComplete when countdown reaches zero
      if (newTime === 0 && prevTime > 0 && onCompleteRef.current) {
        // Use setTimeout to avoid calling during render
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 0);
      }

      return newTime;
    });
  }, [interval]);

  // Use the interval hook for the countdown mechanism
  const intervalControls = useInterval(tick, timeRemaining > 0 ? interval : null, { autoStart });

  // Wrap the interval controls with stable references
  const start = React.useCallback(() => {
    if (timeRemainingRef.current > 0) {
      intervalControls.start();
    }
  }, [intervalControls]);

  const pause = React.useCallback(() => {
    intervalControls.pause();
  }, [intervalControls]);

  const resume = React.useCallback(() => {
    if (timeRemainingRef.current > 0) {
      intervalControls.resume();
    }
  }, [intervalControls]);

  const toggle = React.useCallback(() => {
    if (timeRemainingRef.current > 0) {
      intervalControls.toggle();
    }
  }, [intervalControls]);

  const reset = React.useCallback(() => {
    setTimeRemaining(duration);
    intervalControls.reset();
  }, [intervalControls, duration]);

  const setDurationFunc = React.useCallback(
    (newDuration: number) => {
      setDuration(newDuration);
      setTimeRemaining(newDuration);
      intervalControls.pause();
    },
    [intervalControls]
  );

  return React.useMemo(
    () => ({
      timeRemaining,
      isRunning: intervalControls.isRunning && timeRemaining > 0,
      start,
      pause,
      resume,
      toggle,
      reset,
      setDuration: setDurationFunc,
    }),
    [
      timeRemaining,
      intervalControls.isRunning,
      start,
      pause,
      resume,
      toggle,
      reset,
      setDurationFunc,
    ]
  );
}
