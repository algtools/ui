'use client';

import * as React from 'react';

/**
 * Size dimensions returned by the useResizeObserver hook
 */
export interface Size {
  /** The width of the observed element in pixels */
  width: number;
  /** The height of the observed element in pixels */
  height: number;
}

/**
 * Callback function that receives size changes
 */
export type ResizeCallback = (size: Size) => void;

/**
 * Options for the useResizeObserver hook
 */
export interface UseResizeObserverOptions {
  /** Optional callback to be invoked when the element size changes */
  onResize?: ResizeCallback;
}

/**
 * A custom hook that observes size changes of an element using the ResizeObserver API.
 * Returns the current dimensions and optionally calls a callback on resize.
 *
 * @param options - Configuration options including an optional callback
 * @returns A tuple containing a ref to attach to the element and the current size
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [ref, size] = useResizeObserver<HTMLDivElement>();
 *
 *   return (
 *     <div ref={ref}>
 *       <p>Width: {size.width}px</p>
 *       <p>Height: {size.height}px</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With callback
 * function MyComponent() {
 *   const [ref, size] = useResizeObserver<HTMLDivElement>({
 *     onResize: (size) => {
 *       console.log('Element resized:', size);
 *     },
 *   });
 *
 *   return <div ref={ref}>Resize me!</div>;
 * }
 * ```
 */
export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  options?: UseResizeObserverOptions
): [React.RefObject<T>, Size] {
  const { onResize } = options || {};
  const ref = React.useRef<T>(null) as React.RefObject<T>;
  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 });
  const onResizeRef = React.useRef(onResize);

  // Update callback ref when it changes to avoid stale closures
  React.useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Create ResizeObserver instance
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) {
        return;
      }

      const entry = entries[0];
      let width: number;
      let height: number;

      // Use borderBoxSize if available (more accurate)
      if (entry.borderBoxSize) {
        const borderBoxSize = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;
        width = borderBoxSize.inlineSize;
        height = borderBoxSize.blockSize;
      } else {
        // Fallback to contentRect
        width = entry.contentRect.width;
        height = entry.contentRect.height;
      }

      const newSize = { width, height };
      setSize(newSize);

      // Call the callback if provided
      if (onResizeRef.current) {
        onResizeRef.current(newSize);
      }
    });

    // Start observing
    observer.observe(element);

    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, size];
}
