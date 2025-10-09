'use client';

import * as React from 'react';

/**
 * A custom hook that runs a cleanup function when the component unmounts.
 * The cleanup function is guaranteed to run only once when the component is removed from the DOM.
 *
 * @param fn - The cleanup function to run on unmount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useUnmount(() => {
 *     console.log('Component is unmounting');
 *     // Cleanup subscriptions, timers, etc.
 *   });
 *
 *   return <div>Content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function WebSocketComponent() {
 *   const ws = React.useRef<WebSocket | null>(null);
 *
 *   React.useEffect(() => {
 *     ws.current = new WebSocket('ws://localhost:8080');
 *   }, []);
 *
 *   useUnmount(() => {
 *     // Clean up WebSocket connection on unmount
 *     ws.current?.close();
 *   });
 *
 *   return <div>WebSocket Connected</div>;
 * }
 * ```
 */
export function useUnmount(fn: () => void): void {
  const fnRef = React.useRef(fn);

  // Update the ref to the latest function on every render
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  React.useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
}
