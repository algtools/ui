import * as React from 'react';

/**
 * A custom hook that listens for changes to a specified media query.
 * This hook uses the window.matchMedia API to detect when a media query matches or stops matching.
 *
 * @param query - A string representing the media query to match (e.g., "(min-width: 768px)")
 * @returns A boolean indicating whether the media query currently matches
 *
 * @example
 * Basic usage with breakpoints:
 * ```tsx
 * function MyComponent() {
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 *   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 *
 *   return (
 *     <div>
 *       {isDesktop && <p>Desktop View</p>}
 *       {isTablet && <p>Tablet View</p>}
 *       {isMobile && <p>Mobile View</p>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Common breakpoints:
 * ```tsx
 * // Mobile-first approach
 * const isSm = useMediaQuery("(min-width: 640px)");   // Small devices
 * const isMd = useMediaQuery("(min-width: 768px)");   // Medium devices
 * const isLg = useMediaQuery("(min-width: 1024px)");  // Large devices
 * const isXl = useMediaQuery("(min-width: 1280px)");  // Extra large devices
 * const is2Xl = useMediaQuery("(min-width: 1536px)"); // 2X large devices
 *
 * // Desktop-first approach
 * const isMobile = useMediaQuery("(max-width: 767px)");
 * const isTablet = useMediaQuery("(max-width: 1023px)");
 * ```
 *
 * @example
 * Other media features:
 * ```tsx
 * function MyComponent() {
 *   const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 *   const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 *   const isPortrait = useMediaQuery("(orientation: portrait)");
 *   const isRetina = useMediaQuery("(min-resolution: 2dppx)");
 *
 *   return (
 *     <div>
 *       <p>Dark mode: {prefersDark ? 'Yes' : 'No'}</p>
 *       <p>Reduced motion: {prefersReducedMotion ? 'Yes' : 'No'}</p>
 *       <p>Orientation: {isPortrait ? 'Portrait' : 'Landscape'}</p>
 *       <p>Retina display: {isRetina ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - This hook is SSR-safe and returns `false` on the server
 * - Event listeners are automatically cleaned up on unmount
 * - The hook responds to media query changes in real-time
 * - The query parameter is memoized, so changing it will re-subscribe to the new query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    // SSR support: return false on server
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    // SSR support: do nothing on server
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener for changes
    mediaQueryList.addEventListener('change', handleChange);

    // Set initial value (in case it changed between mount and effect)
    setMatches(mediaQueryList.matches);

    // Cleanup: remove event listener on unmount or when query changes
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
