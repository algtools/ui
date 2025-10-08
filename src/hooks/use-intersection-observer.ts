'use client';

import * as React from 'react';

/**
 * Options for configuring the IntersectionObserver
 */
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Whether the observer is enabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Callback function when intersection changes
   */
  onChange?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Return type for the useIntersectionObserver hook
 */
export interface UseIntersectionObserverReturn {
  /** The target element ref to attach to the observed element */
  ref: React.RefObject<Element | null>;
  /** The latest IntersectionObserverEntry or null if not yet observed */
  entry: IntersectionObserverEntry | null;
  /** Whether the element is currently intersecting with the root */
  isIntersecting: boolean;
  /** The intersection ratio (0.0 to 1.0) */
  intersectionRatio: number;
}

/**
 * A custom hook that uses the Intersection Observer API to detect when an element
 * enters or leaves the viewport. Useful for lazy loading images, infinite scrolling,
 * scroll animations, and visibility tracking.
 *
 * @param options - Configuration options for the IntersectionObserver
 * @returns An object containing the ref, entry state, and intersection status
 *
 * @example
 * ```tsx
 * // Basic usage - detect when element is visible
 * function LazyImage({ src, alt }: { src: string; alt: string }) {
 *   const { ref, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.1,
 *     rootMargin: '50px',
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       {isIntersecting ? (
 *         <img src={src} alt={alt} />
 *       ) : (
 *         <div className="skeleton">Loading...</div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Lazy loading with callback
 * function LazyComponent() {
 *   const [hasLoaded, setHasLoaded] = React.useState(false);
 *   const { ref, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.5,
 *     onChange: (entry) => {
 *       if (entry.isIntersecting && !hasLoaded) {
 *         setHasLoaded(true);
 *         // Load data or perform expensive operation
 *       }
 *     },
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       {hasLoaded ? <HeavyComponent /> : <Placeholder />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Scroll animation with intersection ratio
 * function AnimatedBox() {
 *   const { ref, intersectionRatio } = useIntersectionObserver({
 *     threshold: [0, 0.25, 0.5, 0.75, 1],
 *   });
 *
 *   return (
 *     <div
 *       ref={ref}
 *       style={{
 *         opacity: intersectionRatio,
 *         transform: `scale(${0.8 + intersectionRatio * 0.2})`,
 *       }}
 *     >
 *       Content fades in as you scroll
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Infinite scroll
 * function InfiniteList() {
 *   const [items, setItems] = React.useState([1, 2, 3]);
 *   const { ref, isIntersecting } = useIntersectionObserver({
 *     threshold: 1.0,
 *   });
 *
 *   React.useEffect(() => {
 *     if (isIntersecting) {
 *       // Load more items
 *       setItems(prev => [...prev, prev.length + 1, prev.length + 2]);
 *     }
 *   }, [isIntersecting]);
 *
 *   return (
 *     <div>
 *       {items.map(item => <div key={item}>Item {item}</div>)}
 *       <div ref={ref}>Loading more...</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    enabled = true,
    onChange,
  } = options;

  const ref = React.useRef<Element>(null);
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);

  // Store onChange callback in a ref to avoid recreating the observer
  const onChangeRef = React.useRef(onChange);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    const element = ref.current;

    // Don't create observer if not enabled or element doesn't exist
    if (!enabled || !element) {
      return;
    }

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported in this browser');
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      setEntry(entry);

      // Call the onChange callback if provided
      if (onChangeRef.current) {
        onChangeRef.current(entry);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    // Cleanup function - disconnect observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, root, rootMargin]);

  return React.useMemo(
    () => ({
      ref,
      entry,
      isIntersecting: entry?.isIntersecting ?? false,
      intersectionRatio: entry?.intersectionRatio ?? 0,
    }),
    [entry]
  );
}
