'use client';

import * as React from 'react';

/**
 * A custom hook that returns whether the component is currently mounted.
 * Useful for preventing state updates on unmounted components and avoiding memory leaks.
 *
 * @returns A function that returns true if the component is mounted, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *
 *   const fetchData = async () => {
 *     const data = await fetch('/api/data');
 *     // Only update state if component is still mounted
 *     if (isMounted()) {
 *       setState(data);
 *     }
 *   };
 *
 *   React.useEffect(() => {
 *     fetchData();
 *   }, []);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = React.useRef(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return React.useCallback(() => isMountedRef.current, []);
}
