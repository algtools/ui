'use client';

import * as React from 'react';

/**
 * A hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 * This prevents SSR warnings when using layout effects.
 *
 * This is useful for effects that need to run synchronously after all DOM mutations
 * on the client, but can run asynchronously on the server where there is no DOM.
 *
 * @param effect - The effect callback function, similar to useEffect/useLayoutEffect
 * @param deps - The dependency array for the effect
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const ref = React.useRef<HTMLDivElement>(null);
 *
 *   useIsomorphicLayoutEffect(() => {
 *     // This will run with useLayoutEffect on client
 *     // and useEffect on server (no SSR warning)
 *     if (ref.current) {
 *       console.log('Element dimensions:', ref.current.getBoundingClientRect());
 *     }
 *   }, []);
 *
 *   return <div ref={ref}>Content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Measuring DOM elements safely
 * function MeasuredBox() {
 *   const [height, setHeight] = React.useState(0);
 *   const boxRef = React.useRef<HTMLDivElement>(null);
 *
 *   useIsomorphicLayoutEffect(() => {
 *     if (boxRef.current) {
 *       setHeight(boxRef.current.offsetHeight);
 *     }
 *   }, []);
 *
 *   return (
 *     <div>
 *       <div ref={boxRef}>Box content</div>
 *       <p>Height: {height}px</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
