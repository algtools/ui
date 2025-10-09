'use client';

import * as React from 'react';

/**
 * A custom hook that detects if the code is running on the client-side (browser).
 * This is useful for SSR (Server-Side Rendering) scenarios where you need to conditionally
 * render content or run code only on the client.
 *
 * The hook returns false during SSR and true once the component has mounted on the client.
 * This prevents hydration mismatches between server and client rendering.
 *
 * @returns true if running on the client-side, false if on the server or before hydration
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isClient = useIsClient();
 *
 *   if (!isClient) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Window width: {window.innerWidth}px</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function LocalStorageComponent() {
 *   const isClient = useIsClient();
 *   const [data, setData] = React.useState<string | null>(null);
 *
 *   React.useEffect(() => {
 *     if (isClient) {
 *       setData(localStorage.getItem('key'));
 *     }
 *   }, [isClient]);
 *
 *   return <div>{data || 'No data'}</div>;
 * }
 * ```
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
