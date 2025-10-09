'use client';

import * as React from 'react';

/**
 * Interface representing the window dimensions
 */
export interface WindowSize {
  /** The width of the window in pixels */
  width: number;
  /** The height of the window in pixels */
  height: number;
}

/**
 * Options for configuring the useWindowSize hook
 */
export interface UseWindowSizeOptions {
  /**
   * Delay in milliseconds for debouncing resize events
   * @default 150
   */
  debounceMs?: number;
  /**
   * Initial window size for SSR
   * @default { width: 0, height: 0 }
   */
  initialSize?: WindowSize;
}

/**
 * A custom hook that tracks the window dimensions with debounced resize events.
 * This hook listens for window resize events and updates the dimensions accordingly.
 *
 * @param options - Configuration options for the hook
 * @returns The current window dimensions
 *
 * @example
 * Basic usage:
 * ```tsx
 * function MyComponent() {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Window width: {width}px</p>
 *       <p>Window height: {height}px</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * With custom debounce delay:
 * ```tsx
 * function MyComponent() {
 *   // Update less frequently for better performance
 *   const { width, height } = useWindowSize({ debounceMs: 300 });
 *
 *   return (
 *     <div>
 *       <p>Window dimensions: {width} x {height}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Responsive layout with breakpoints:
 * ```tsx
 * function ResponsiveLayout() {
 *   const { width } = useWindowSize();
 *
 *   const isMobile = width < 768;
 *   const isTablet = width >= 768 && width < 1024;
 *   const isDesktop = width >= 1024;
 *
 *   return (
 *     <div>
 *       {isMobile && <MobileLayout />}
 *       {isTablet && <TabletLayout />}
 *       {isDesktop && <DesktopLayout />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * With SSR initial size:
 * ```tsx
 * function MyComponent() {
 *   const { width, height } = useWindowSize({
 *     initialSize: { width: 1920, height: 1080 }
 *   });
 *
 *   return (
 *     <div>
 *       <p>Window: {width} x {height}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - This hook is SSR-safe and returns the initial size on the server
 * - Resize events are debounced for better performance (default 150ms)
 * - Event listeners are automatically cleaned up on unmount
 * - The hook uses window.innerWidth and window.innerHeight for dimensions
 */
export function useWindowSize(options: UseWindowSizeOptions = {}): WindowSize {
  const { debounceMs = 150, initialSize = { width: 0, height: 0 } } = options;

  const [windowSize, setWindowSize] = React.useState<WindowSize>(() => {
    // SSR support: return initial size on server
    if (typeof window === 'undefined') {
      return initialSize;
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  React.useEffect(() => {
    // SSR support: do nothing on server
    if (typeof window === 'undefined') {
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    // Handler for window resize events
    const handleResize = () => {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout for debouncing
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMs);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Set initial value (in case it changed between mount and effect)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Cleanup: remove event listener and clear timeout on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debounceMs]);

  return windowSize;
}
