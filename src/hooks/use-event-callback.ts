'use client';

import * as React from 'react';

/**
 * A custom hook that returns a stable callback reference that always calls the latest version
 * of the provided callback. This is useful for event handlers and callbacks passed to child
 * components to avoid unnecessary re-renders while ensuring the latest closure is always used.
 *
 * Unlike useCallback with dependencies, useEventCallback:
 * - Always maintains the same reference (never changes)
 * - Always calls the latest version of the callback
 * - Doesn't require dependency management
 *
 * @template Args - The argument types of the callback function
 * @template Return - The return type of the callback function
 * @param callback - The callback function to stabilize
 * @returns A stable callback reference that always calls the latest version of the input callback
 *
 * @example
 * ```tsx
 * function MyComponent({ onEvent }: { onEvent: (value: string) => void }) {
 *   const [count, setCount] = React.useState(0);
 *
 *   // This callback reference never changes, but always calls the latest onEvent
 *   // with the latest count value
 *   const handleEvent = useEventCallback((value: string) => {
 *     onEvent(`${value} (count: ${count})`);
 *   });
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *       <ChildComponent onEvent={handleEvent} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With event listeners
 * function ScrollTracker() {
 *   const [scrollPosition, setScrollPosition] = React.useState(0);
 *
 *   const handleScroll = useEventCallback(() => {
 *     setScrollPosition(window.scrollY);
 *     console.log('Scrolled to:', window.scrollY);
 *   });
 *
 *   React.useEffect(() => {
 *     window.addEventListener('scroll', handleScroll);
 *     return () => window.removeEventListener('scroll', handleScroll);
 *   }, [handleScroll]); // handleScroll never changes, so this effect runs once
 *
 *   return <div>Scroll position: {scrollPosition}</div>;
 * }
 * ```
 */
export function useEventCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return
): (...args: Args) => Return {
  const callbackRef = React.useRef(callback);

  // Update the ref whenever callback changes to ensure we always call the latest version
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // Return a stable callback that calls the latest version from the ref
  return React.useCallback((...args: Args) => {
    return callbackRef.current(...args);
  }, []);
}
