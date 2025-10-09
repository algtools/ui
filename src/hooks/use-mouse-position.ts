'use client';

import * as React from 'react';

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /**
   * X coordinate of the mouse pointer
   */
  x: number;
  /**
   * Y coordinate of the mouse pointer
   */
  y: number;
}

/**
 * Options for configuring the useMousePosition hook behavior
 */
export interface UseMousePositionOptions {
  /**
   * Delay in milliseconds for debouncing mouse position updates.
   * When set, the position will only update after the mouse has stopped moving for this duration.
   * Cannot be used together with throttleMs.
   * @default undefined
   */
  debounceMs?: number;
  /**
   * Interval in milliseconds for throttling mouse position updates.
   * When set, the position will update at most once per this interval.
   * Cannot be used together with debounceMs.
   * @default undefined
   */
  throttleMs?: number;
  /**
   * Whether to track mouse position initially.
   * When false, mouse tracking starts disabled and can be enabled later.
   * @default true
   */
  enabled?: boolean;
  /**
   * Initial mouse position values
   * @default { x: 0, y: 0 }
   */
  initialPosition?: MousePosition;
}

/**
 * Return type for the useMousePosition hook
 */
export interface UseMousePositionReturn {
  /**
   * Current mouse position
   */
  position: MousePosition;
  /**
   * X coordinate of the mouse pointer
   */
  x: number;
  /**
   * Y coordinate of the mouse pointer
   */
  y: number;
}

/**
 * A custom hook for tracking the mouse cursor position with optional debouncing or throttling.
 * Provides real-time mouse coordinates relative to the viewport.
 *
 * @param options - Optional configuration for mouse tracking behavior
 * @returns Object containing the current mouse position and individual x, y coordinates
 *
 * @example
 * ```tsx
 * function MouseTracker() {
 *   const { x, y } = useMousePosition();
 *
 *   return (
 *     <div>
 *       Mouse position: X: {x}, Y: {y}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With debouncing - updates only after mouse stops moving for 200ms
 * function DebouncedTracker() {
 *   const { position } = useMousePosition({ debounceMs: 200 });
 *
 *   return (
 *     <div>
 *       Debounced position: X: {position.x}, Y: {position.y}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With throttling - updates at most once every 100ms
 * function ThrottledTracker() {
 *   const { x, y } = useMousePosition({ throttleMs: 100 });
 *
 *   return (
 *     <div>
 *       Throttled position: X: {x}, Y: {y}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom initial position
 * function CustomInitialTracker() {
 *   const { position } = useMousePosition({
 *     initialPosition: { x: 100, y: 100 }
 *   });
 *
 *   return (
 *     <div>
 *       Position: X: {position.x}, Y: {position.y}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional tracking
 * function ConditionalTracker() {
 *   const [track, setTrack] = useState(false);
 *   const { x, y } = useMousePosition({ enabled: track });
 *
 *   return (
 *     <div>
 *       <button onClick={() => setTrack(!track)}>
 *         {track ? 'Stop' : 'Start'} Tracking
 *       </button>
 *       {track && <div>Mouse: X: {x}, Y: {y}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMousePosition(options: UseMousePositionOptions = {}): UseMousePositionReturn {
  const { debounceMs, throttleMs, enabled = true, initialPosition = { x: 0, y: 0 } } = options;

  // Validate that both debounce and throttle are not set
  if (debounceMs !== undefined && throttleMs !== undefined) {
    throw new Error(
      'useMousePosition: Cannot use both debounceMs and throttleMs options simultaneously. Please use only one.'
    );
  }

  const [position, setPosition] = React.useState<MousePosition>(initialPosition);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = React.useRef<number>(0);

  React.useEffect(() => {
    // If tracking is disabled, don't set up listeners
    if (!enabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      // Handle debouncing
      if (debounceMs !== undefined && debounceMs > 0) {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set new timeout to update position
        timeoutRef.current = setTimeout(() => {
          setPosition(newPosition);
          timeoutRef.current = null;
        }, debounceMs);

        return;
      }

      // Handle throttling
      if (throttleMs !== undefined && throttleMs > 0) {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastUpdateRef.current;

        if (timeSinceLastUpdate >= throttleMs) {
          setPosition(newPosition);
          lastUpdateRef.current = now;
        }

        return;
      }

      // No debouncing or throttling - update immediately
      setPosition(newPosition);
    };

    // Add event listener to window
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [enabled, debounceMs, throttleMs]);

  return {
    position,
    x: position.x,
    y: position.y,
  };
}
