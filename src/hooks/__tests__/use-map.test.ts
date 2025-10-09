import { renderHook, act } from '@testing-library/react';

import { useMap } from '@/hooks/use-map';

describe('useMap', () => {
  describe('initialization', () => {
    test('should initialize with empty map by default', () => {
      const { result } = renderHook(() => useMap<string, number>());
      expect(result.current.size).toBe(0);
      expect(result.current.value).toBeInstanceOf(Map);
    });

    test('should initialize with provided entries', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ])
      );
      expect(result.current.size).toBe(3);
      expect(result.current.get('a')).toBe(1);
      expect(result.current.get('b')).toBe(2);
      expect(result.current.get('c')).toBe(3);
    });

    test('should initialize with Map instance', () => {
      const initialMap = new Map([
        ['x', 10],
        ['y', 20],
      ]);
      const { result } = renderHook(() => useMap<string, number>(initialMap));
      expect(result.current.size).toBe(2);
      expect(result.current.get('x')).toBe(10);
      expect(result.current.get('y')).toBe(20);
    });
  });

  describe('set', () => {
    test('should add a new entry to the map', () => {
      const { result } = renderHook(() => useMap<string, number>());

      act(() => {
        result.current.set('key1', 100);
      });

      expect(result.current.size).toBe(1);
      expect(result.current.get('key1')).toBe(100);
    });

    test('should update existing entry', () => {
      const { result } = renderHook(() => useMap<string, number>([['key1', 100]]));

      act(() => {
        result.current.set('key1', 200);
      });

      expect(result.current.size).toBe(1);
      expect(result.current.get('key1')).toBe(200);
    });

    test('should add multiple entries', () => {
      const { result } = renderHook(() => useMap<string, number>());

      act(() => {
        result.current.set('a', 1);
        result.current.set('b', 2);
        result.current.set('c', 3);
      });

      expect(result.current.size).toBe(3);
      expect(result.current.get('a')).toBe(1);
      expect(result.current.get('b')).toBe(2);
      expect(result.current.get('c')).toBe(3);
    });

    test('should work with different value types', () => {
      const { result } = renderHook(() =>
        useMap<string, string | number | boolean | object | number[]>()
      );

      act(() => {
        result.current.set('string', 'hello');
        result.current.set('number', 42);
        result.current.set('boolean', true);
        result.current.set('object', { foo: 'bar' });
        result.current.set('array', [1, 2, 3]);
      });

      expect(result.current.get('string')).toBe('hello');
      expect(result.current.get('number')).toBe(42);
      expect(result.current.get('boolean')).toBe(true);
      expect(result.current.get('object')).toEqual({ foo: 'bar' });
      expect(result.current.get('array')).toEqual([1, 2, 3]);
    });
  });

  describe('get', () => {
    test('should get value by key', () => {
      const { result } = renderHook(() => useMap<string, number>([['key1', 100]]));

      expect(result.current.get('key1')).toBe(100);
    });

    test('should return undefined for non-existent key', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current.get('nonexistent')).toBeUndefined();
    });

    test('should return updated value after set', () => {
      const { result } = renderHook(() => useMap<string, number>([['key1', 100]]));

      expect(result.current.get('key1')).toBe(100);

      act(() => {
        result.current.set('key1', 200);
      });

      expect(result.current.get('key1')).toBe(200);
    });
  });

  describe('remove', () => {
    test('should remove entry from map', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
        ])
      );

      act(() => {
        result.current.remove('a');
      });

      expect(result.current.size).toBe(1);
      expect(result.current.has('a')).toBe(false);
      expect(result.current.has('b')).toBe(true);
    });

    test('should handle removing non-existent key', () => {
      const { result } = renderHook(() => useMap<string, number>([['a', 1]]));

      act(() => {
        result.current.remove('nonexistent');
      });

      expect(result.current.size).toBe(1);
    });

    test('should remove multiple entries', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ])
      );

      act(() => {
        result.current.remove('a');
        result.current.remove('c');
      });

      expect(result.current.size).toBe(1);
      expect(result.current.has('a')).toBe(false);
      expect(result.current.has('b')).toBe(true);
      expect(result.current.has('c')).toBe(false);
    });
  });

  describe('has', () => {
    test('should return true for existing key', () => {
      const { result } = renderHook(() => useMap<string, number>([['key1', 100]]));

      expect(result.current.has('key1')).toBe(true);
    });

    test('should return false for non-existent key', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current.has('nonexistent')).toBe(false);
    });

    test('should update after adding entry', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current.has('key1')).toBe(false);

      act(() => {
        result.current.set('key1', 100);
      });

      expect(result.current.has('key1')).toBe(true);
    });

    test('should update after removing entry', () => {
      const { result } = renderHook(() => useMap<string, number>([['key1', 100]]));

      expect(result.current.has('key1')).toBe(true);

      act(() => {
        result.current.remove('key1');
      });

      expect(result.current.has('key1')).toBe(false);
    });
  });

  describe('clear', () => {
    test('should clear all entries', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ])
      );

      expect(result.current.size).toBe(3);

      act(() => {
        result.current.clear();
      });

      expect(result.current.size).toBe(0);
      expect(result.current.has('a')).toBe(false);
      expect(result.current.has('b')).toBe(false);
      expect(result.current.has('c')).toBe(false);
    });

    test('should handle clearing empty map', () => {
      const { result } = renderHook(() => useMap<string, number>());

      act(() => {
        result.current.clear();
      });

      expect(result.current.size).toBe(0);
    });
  });

  describe('reset', () => {
    test('should reset to initial state', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
        ])
      );

      act(() => {
        result.current.set('c', 3);
        result.current.remove('a');
      });

      expect(result.current.size).toBe(2);
      expect(result.current.has('a')).toBe(false);
      expect(result.current.has('c')).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.size).toBe(2);
      expect(result.current.has('a')).toBe(true);
      expect(result.current.has('b')).toBe(true);
      expect(result.current.has('c')).toBe(false);
      expect(result.current.get('a')).toBe(1);
      expect(result.current.get('b')).toBe(2);
    });

    test('should reset to empty map if initialized empty', () => {
      const { result } = renderHook(() => useMap<string, number>());

      act(() => {
        result.current.set('a', 1);
        result.current.set('b', 2);
      });

      expect(result.current.size).toBe(2);

      act(() => {
        result.current.reset();
      });

      expect(result.current.size).toBe(0);
    });
  });

  describe('setAll', () => {
    test('should add multiple entries at once', () => {
      const { result } = renderHook(() => useMap<string, number>());

      act(() => {
        result.current.setAll([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]);
      });

      expect(result.current.size).toBe(3);
      expect(result.current.get('a')).toBe(1);
      expect(result.current.get('b')).toBe(2);
      expect(result.current.get('c')).toBe(3);
    });

    test('should merge with existing entries', () => {
      const { result } = renderHook(() => useMap<string, number>([['a', 1]]));

      act(() => {
        result.current.setAll([
          ['b', 2],
          ['c', 3],
        ]);
      });

      expect(result.current.size).toBe(3);
      expect(result.current.get('a')).toBe(1);
      expect(result.current.get('b')).toBe(2);
      expect(result.current.get('c')).toBe(3);
    });

    test('should update existing entries', () => {
      const { result } = renderHook(() =>
        useMap<string, number>([
          ['a', 1],
          ['b', 2],
        ])
      );

      act(() => {
        result.current.setAll([
          ['a', 10],
          ['c', 3],
        ]);
      });

      expect(result.current.size).toBe(3);
      expect(result.current.get('a')).toBe(10);
      expect(result.current.get('b')).toBe(2);
      expect(result.current.get('c')).toBe(3);
    });

    test('should handle empty iterable', () => {
      const { result } = renderHook(() => useMap<string, number>([['a', 1]]));

      act(() => {
        result.current.setAll([]);
      });

      expect(result.current.size).toBe(1);
      expect(result.current.get('a')).toBe(1);
    });
  });

  describe('size', () => {
    test('should return correct size', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current.size).toBe(0);

      act(() => {
        result.current.set('a', 1);
      });
      expect(result.current.size).toBe(1);

      act(() => {
        result.current.set('b', 2);
      });
      expect(result.current.size).toBe(2);

      act(() => {
        result.current.remove('a');
      });
      expect(result.current.size).toBe(1);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current.size).toBe(0);

      act(() => {
        result.current.set('a', 1);
        result.current.set('b', 2);
      });
      expect(result.current.size).toBe(2);

      act(() => {
        result.current.setAll([
          ['c', 3],
          ['d', 4],
        ]);
      });
      expect(result.current.size).toBe(4);

      act(() => {
        result.current.remove('b');
      });
      expect(result.current.size).toBe(3);
      expect(result.current.has('b')).toBe(false);

      act(() => {
        result.current.set('a', 10);
      });
      expect(result.current.get('a')).toBe(10);

      act(() => {
        result.current.clear();
      });
      expect(result.current.size).toBe(0);
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useMap<string, number>());

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('set');
      expect(result.current).toHaveProperty('get');
      expect(result.current).toHaveProperty('remove');
      expect(result.current).toHaveProperty('has');
      expect(result.current).toHaveProperty('clear');
      expect(result.current).toHaveProperty('reset');
      expect(result.current).toHaveProperty('setAll');
      expect(result.current).toHaveProperty('size');

      expect(result.current.value).toBeInstanceOf(Map);
      expect(typeof result.current.set).toBe('function');
      expect(typeof result.current.get).toBe('function');
      expect(typeof result.current.remove).toBe('function');
      expect(typeof result.current.has).toBe('function');
      expect(typeof result.current.clear).toBe('function');
      expect(typeof result.current.reset).toBe('function');
      expect(typeof result.current.setAll).toBe('function');
      expect(typeof result.current.size).toBe('number');
    });

    test('should work with complex objects as values', () => {
      interface User {
        id: number;
        name: string;
      }

      const { result } = renderHook(() => useMap<string, User>());

      act(() => {
        result.current.set('user1', { id: 1, name: 'Alice' });
        result.current.set('user2', { id: 2, name: 'Bob' });
      });

      expect(result.current.get('user1')).toEqual({ id: 1, name: 'Alice' });
      expect(result.current.get('user2')).toEqual({ id: 2, name: 'Bob' });

      act(() => {
        result.current.set('user1', { id: 1, name: 'Alice Updated' });
      });

      expect(result.current.get('user1')).toEqual({ id: 1, name: 'Alice Updated' });
    });

    test('should work with number keys', () => {
      const { result } = renderHook(() => useMap<number, string>());

      act(() => {
        result.current.set(1, 'one');
        result.current.set(2, 'two');
        result.current.set(3, 'three');
      });

      expect(result.current.get(1)).toBe('one');
      expect(result.current.get(2)).toBe('two');
      expect(result.current.get(3)).toBe('three');
      expect(result.current.size).toBe(3);
    });
  });

  describe('performance', () => {
    test('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useMap<string, number>());

      const firstRender = {
        set: result.current.set,
        remove: result.current.remove,
        clear: result.current.clear,
        reset: result.current.reset,
        setAll: result.current.setAll,
      };

      act(() => {
        result.current.set('a', 1);
      });

      rerender();

      expect(result.current.set).toBe(firstRender.set);
      expect(result.current.remove).toBe(firstRender.remove);
      expect(result.current.clear).toBe(firstRender.clear);
      expect(result.current.reset).toBe(firstRender.reset);
      expect(result.current.setAll).toBe(firstRender.setAll);
    });
  });
});
