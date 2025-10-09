'use client';

import * as React from 'react';

/**
 * Return type for the useDebounceCallback hook
 * @template TArgs - The type of the callback arguments
 */
export interface UseDebounceCallbackReturn<TArgs extends unknown[]> {
  /**
   * The debounced callback function
   */
  callback: (...args: TArgs) => void;
  /**
   * Cancels any pending debounced invocation
   */
  cancel: () => void;
  /**
   * Immediately invokes any pending debounced callback
   */
  flush: () => void;
}

/**
 * A custom hook that debounces a callback function by a specified delay.
 * This hook is useful for preventing excessive function calls when dealing with
 * rapidly occurring events like scroll, resize, or user input.
 *
 * @template TArgs - The type of the callback arguments
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds (default: 500ms)
 * @returns An object containing the debounced callback, cancel, and flush methods
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [results, setResults] = useState([]);
 *
 *   const fetchResults = async (query: string) => {
 *     const data = await api.search(query);
 *     setResults(data);
 *   };
 *
 *   const { callback: debouncedSearch, cancel, flush } = useDebounceCallback(
 *     fetchResults,
 *     500
 *   );
 *
 *   return (
 *     <div>
 *       <input
 *         onChange={(e) => debouncedSearch(e.target.value)}
 *         placeholder="Search..."
 *       />
 *       <button onClick={cancel}>Cancel Search</button>
 *       <button onClick={flush}>Search Now</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function AutoSaveEditor() {
 *   const saveContent = async (content: string) => {
 *     await api.save(content);
 *     console.log('Content saved!');
 *   };
 *
 *   const { callback: debouncedSave, flush } = useDebounceCallback(
 *     saveContent,
 *     1000
 *   );
 *
 *   // Save immediately on unmount
 *   useEffect(() => {
 *     return () => {
 *       flush();
 *     };
 *   }, [flush]);
 *
 *   return (
 *     <textarea
 *       onChange={(e) => debouncedSave(e.target.value)}
 *       placeholder="Your content will auto-save..."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ResizeHandler() {
 *   const handleResize = (width: number, height: number) => {
 *     console.log(`Window resized to ${width}x${height}`);
 *   };
 *
 *   const { callback: debouncedResize } = useDebounceCallback(
 *     handleResize,
 *     300
 *   );
 *
 *   useEffect(() => {
 *     const handler = () => {
 *       debouncedResize(window.innerWidth, window.innerHeight);
 *     };
 *
 *     window.addEventListener('resize', handler);
 *     return () => window.removeEventListener('resize', handler);
 *   }, [debouncedResize]);
 *
 *   return <div>Resize the window...</div>;
 * }
 * ```
 */
export function useDebounceCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number = 500
): UseDebounceCallbackReturn<TArgs> {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const callbackRef = React.useRef(callback);
  const pendingArgsRef = React.useRef<TArgs | null>(null);

  // Keep callback ref up to date
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cancel function
  const cancel = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    pendingArgsRef.current = null;
  }, []);

  // Flush function
  const flush = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (pendingArgsRef.current !== null) {
      callbackRef.current(...pendingArgsRef.current);
      pendingArgsRef.current = null;
    }
  }, []);

  // Debounced callback
  const debouncedCallback = React.useCallback(
    (...args: TArgs) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Store the arguments
      pendingArgsRef.current = args;

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        pendingArgsRef.current = null;
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    callback: debouncedCallback,
    cancel,
    flush,
  };
}
