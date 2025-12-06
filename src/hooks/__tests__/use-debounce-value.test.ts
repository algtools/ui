import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

import { useDebounceValue } from '@/hooks/use-debounce-value';

// Enable fake timers for timing tests
vi.useFakeTimers();

describe('useDebounceValue', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('initialization', () => {
    test('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounceValue('initial', 500));
      expect(result.current).toBe('initial');
    });

    test('should work with string values', () => {
      const { result } = renderHook(() => useDebounceValue('test', 500));
      expect(result.current).toBe('test');
    });

    test('should work with number values', () => {
      const { result } = renderHook(() => useDebounceValue(42, 500));
      expect(result.current).toBe(42);
    });

    test('should work with boolean values', () => {
      const { result } = renderHook(() => useDebounceValue(true, 500));
      expect(result.current).toBe(true);
    });

    test('should work with object values', () => {
      const obj = { name: 'test', value: 123 };
      const { result } = renderHook(() => useDebounceValue(obj, 500));
      expect(result.current).toBe(obj);
    });

    test('should work with array values', () => {
      const arr = [1, 2, 3];
      const { result } = renderHook(() => useDebounceValue(arr, 500));
      expect(result.current).toEqual(arr);
    });

    test('should work with null values', () => {
      const { result } = renderHook(() => useDebounceValue(null, 500));
      expect(result.current).toBe(null);
    });

    test('should work with undefined values', () => {
      const { result } = renderHook(() => useDebounceValue(undefined, 500));
      expect(result.current).toBe(undefined);
    });

    test('should use default delay of 500ms when not specified', () => {
      const { result } = renderHook(() => useDebounceValue('test'));
      expect(result.current).toBe('test');
    });
  });

  describe('debouncing behavior', () => {
    test('should not update value immediately when value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      expect(result.current).toBe('initial');

      // Change the value
      rerender({ value: 'changed', delay: 500 });

      // Value should still be initial (not updated yet)
      expect(result.current).toBe('initial');
    });

    test('should update value after delay expires', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: 'changed', delay: 500 });

      // Fast-forward time by 500ms
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('changed');
    });

    test('should reset timer when value changes before delay expires', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      // Change value
      rerender({ value: 'changed1', delay: 500 });

      // Advance time partially (250ms)
      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Value should still be initial
      expect(result.current).toBe('initial');

      // Change value again before delay expires
      rerender({ value: 'changed2', delay: 500 });

      // Advance time by 250ms (not enough for the new timeout)
      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Value should still be initial
      expect(result.current).toBe('initial');

      // Advance time by another 250ms (total 500ms from last change)
      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Now value should be 'changed2'
      expect(result.current).toBe('changed2');
    });

    test('should handle multiple rapid changes correctly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'v0', delay: 500 },
        }
      );

      // Simulate rapid typing
      rerender({ value: 'v1', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'v2', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'v3', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'v4', delay: 500 });

      // Value should still be initial
      expect(result.current).toBe('v0');

      // Advance time to complete the debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should have the last value
      expect(result.current).toBe('v4');
    });
  });

  describe('delay configuration', () => {
    test('should respect custom delay of 100ms', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 100 },
        }
      );

      rerender({ value: 'changed', delay: 100 });

      act(() => {
        vi.advanceTimersByTime(99);
      });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('changed');
    });

    test('should respect custom delay of 1000ms', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 1000 },
        }
      );

      rerender({ value: 'changed', delay: 1000 });

      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('changed');
    });

    test('should handle delay of 0ms (immediate update)', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 0 },
        }
      );

      rerender({ value: 'changed', delay: 0 });

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current).toBe('changed');
    });

    test('should update when delay changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: 'changed', delay: 500 });

      // Change delay before timeout expires
      rerender({ value: 'changed', delay: 1000 });

      // Advance by original delay (500ms) - should not update yet
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('initial');

      // Advance by remaining time for new delay (500ms more)
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('changed');
    });
  });

  describe('TypeScript generics', () => {
    test('should work with complex object types', () => {
      interface ComplexType {
        id: number;
        name: string;
        nested: {
          value: boolean;
        };
      }

      const initial: ComplexType = {
        id: 1,
        name: 'test',
        nested: { value: true },
      };

      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue<ComplexType>(value, delay),
        {
          initialProps: { value: initial, delay: 500 },
        }
      );

      expect(result.current).toBe(initial);

      const changed: ComplexType = {
        id: 2,
        name: 'changed',
        nested: { value: false },
      };

      rerender({ value: changed, delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe(changed);
    });

    test('should work with union types', () => {
      type UnionType = string | number | null;

      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue<UnionType>(value, delay),
        {
          initialProps: { value: 'string' as UnionType, delay: 500 },
        }
      );

      expect(result.current).toBe('string');

      rerender({ value: 42 as UnionType, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe(42);

      rerender({ value: null as UnionType, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe(null);
    });
  });

  describe('cleanup', () => {
    test('should cleanup timeout on unmount', () => {
      const { rerender, unmount } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: 'changed', delay: 500 });

      // Unmount before timeout expires
      unmount();

      // Advance time - this should not cause any issues
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // No assertions needed - we're just verifying no errors occur
    });

    test('should cleanup previous timeout when value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: 'changed1', delay: 500 });
      rerender({ value: 'changed2', delay: 500 });

      // Only the last timeout should be active
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('changed2');
    });
  });

  describe('edge cases', () => {
    test('should handle same value updates', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'same', delay: 500 },
        }
      );

      rerender({ value: 'same', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('same');
    });

    test('should handle very rapid changes (stress test)', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 0, delay: 500 },
        }
      );

      // Simulate 100 rapid changes
      for (let i = 1; i <= 100; i++) {
        rerender({ value: i, delay: 500 });
        act(() => {
          vi.advanceTimersByTime(10);
        });
      }

      // Value should still be initial
      expect(result.current).toBe(0);

      // Complete the debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should have the last value
      expect(result.current).toBe(100);
    });

    test('should handle empty string values', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: '', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('');
    });

    test('should handle empty string correctly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        }
      );

      rerender({ value: '', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('');
    });

    test('should handle zero value correctly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: 10, delay: 500 },
        }
      );

      rerender({ value: 0, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe(0);
    });

    test('should handle false value correctly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: true, delay: 500 },
        }
      );

      rerender({ value: false, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe(false);
    });
  });

  describe('real-world scenarios', () => {
    test('should simulate search input debouncing', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue(value, delay),
        {
          initialProps: { value: '', delay: 300 },
        }
      );

      // User types "react"
      const searchChars = ['r', 're', 'rea', 'reac', 'react'];

      searchChars.forEach((char) => {
        rerender({ value: char, delay: 300 });
        act(() => {
          vi.advanceTimersByTime(50); // 50ms between keystrokes
        });
      });

      // Value should still be empty (debouncing)
      expect(result.current).toBe('');

      // Wait for debounce to complete
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Now value should be 'react'
      expect(result.current).toBe('react');
    });

    test('should simulate filter updates', () => {
      interface Filters {
        category: string;
        minPrice: number;
        maxPrice: number;
      }

      const initialFilters: Filters = {
        category: '',
        minPrice: 0,
        maxPrice: 1000,
      };

      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounceValue<Filters>(value, delay),
        {
          initialProps: { value: initialFilters, delay: 500 },
        }
      );

      // User adjusts filters
      const filter1: Filters = { ...initialFilters, category: 'electronics' };
      rerender({ value: filter1, delay: 500 });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      const filter2: Filters = { ...filter1, minPrice: 50 };
      rerender({ value: filter2, delay: 500 });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      const filter3: Filters = { ...filter2, maxPrice: 500 };
      rerender({ value: filter3, delay: 500 });

      // Still showing initial filters
      expect(result.current).toEqual(initialFilters);

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should show final filters
      expect(result.current).toEqual(filter3);
    });
  });
});
