'use client';

import * as React from 'react';

/**
 * Return type for the useMap hook
 */
export interface UseMapReturn<K, V> {
  /** The current Map instance */
  value: Map<K, V>;
  /** Set a key-value pair in the map */
  set: (key: K, value: V) => void;
  /** Get a value by key from the map */
  get: (key: K) => V | undefined;
  /** Delete a key from the map */
  remove: (key: K) => void;
  /** Check if a key exists in the map */
  has: (key: K) => boolean;
  /** Clear all entries from the map */
  clear: () => void;
  /** Reset the map to its initial state */
  reset: () => void;
  /** Set multiple key-value pairs at once */
  setAll: (entries: Iterable<[K, V]>) => void;
  /** Get the size of the map */
  size: number;
}

/**
 * A custom hook for managing Map data structure state with convenient helper functions.
 *
 * @param initialMap - The initial Map entries (default: empty Map)
 * @returns An object containing the current Map and helper functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, set, get, remove, has, clear, size } = useMap<string, number>([
 *     ['a', 1],
 *     ['b', 2],
 *   ]);
 *
 *   return (
 *     <div>
 *       <p>Map size: {size}</p>
 *       <button onClick={() => set('c', 3)}>Add 'c'</button>
 *       <button onClick={() => remove('a')}>Remove 'a'</button>
 *       <button onClick={clear}>Clear all</button>
 *       <p>Has 'a': {has('a') ? 'yes' : 'no'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMap<K, V>(initialMap: Iterable<[K, V]> = []): UseMapReturn<K, V> {
  // Create initial map
  const initialMapRef = React.useRef(new Map(initialMap));

  const [map, setMap] = React.useState(() => new Map(initialMapRef.current));

  const set = React.useCallback((key: K, value: V) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const get = React.useCallback(
    (key: K): V | undefined => {
      return map.get(key);
    },
    [map]
  );

  const remove = React.useCallback((key: K) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const has = React.useCallback(
    (key: K): boolean => {
      return map.has(key);
    },
    [map]
  );

  const clear = React.useCallback(() => {
    setMap(new Map());
  }, []);

  const reset = React.useCallback(() => {
    setMap(new Map(initialMapRef.current));
  }, []);

  const setAll = React.useCallback((entries: Iterable<[K, V]>) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      for (const [key, value] of entries) {
        newMap.set(key, value);
      }
      return newMap;
    });
  }, []);

  const size = map.size;

  return React.useMemo(
    () => ({
      value: map,
      set,
      get,
      remove,
      has,
      clear,
      reset,
      setAll,
      size,
    }),
    [map, set, get, remove, has, clear, reset, setAll, size]
  );
}
