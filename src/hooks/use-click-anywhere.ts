'use client';

import * as React from 'react';

/**
 * A custom hook that detects clicks anywhere on the page.
 * Useful for tracking user interactions, analytics, or global click handlers.
 *
 * @param handler - Callback function to execute when any click is detected
 * @param enabled - Whether the hook is enabled (default: true)
 *
 * @example
 * ```tsx
 * function ClickTracker() {
 *   const [clickCount, setClickCount] = React.useState(0);
 *
 *   useClickAnyWhere(() => {
 *     setClickCount((count) => count + 1);
 *   });
 *
 *   return (
 *     <div>
 *       <p>Total clicks: {clickCount}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With conditional enabling
 * function ConditionalTracker() {
 *   const [isTracking, setIsTracking] = React.useState(false);
 *
 *   useClickAnyWhere(
 *     (event) => {
 *       console.log('Click detected at:', event.clientX, event.clientY);
 *     },
 *     isTracking
 *   );
 *
 *   return (
 *     <button onClick={() => setIsTracking(!isTracking)}>
 *       {isTracking ? 'Stop' : 'Start'} Tracking
 *     </button>
 *   );
 * }
 * ```
 */
export function useClickAnyWhere(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  const handlerRef = React.useRef(handler);

  // Update handler ref when handler changes to avoid stale closures
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      handlerRef.current(event);
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [enabled]);
}
