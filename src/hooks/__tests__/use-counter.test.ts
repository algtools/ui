import { renderHook, act } from '@testing-library/react';

import { useCounter } from '@/hooks/use-counter';

describe('useCounter', () => {
  describe('initialization', () => {
    test('should initialize with 0 by default', () => {
      const { result } = renderHook(() => useCounter());
      expect(result.current.value).toBe(0);
    });

    test('should initialize with provided initial value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10 }));
      expect(result.current.value).toBe(10);
    });

    test('should initialize with negative initial value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: -5 }));
      expect(result.current.value).toBe(-5);
    });

    test('should clamp initial value to min boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 10 })
      );
      expect(result.current.value).toBe(10);
    });

    test('should clamp initial value to max boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 15, max: 10 })
      );
      expect(result.current.value).toBe(10);
    });

    test('should clamp initial value within min and max range', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 0, min: 5, max: 10 })
      );
      expect(result.current.value).toBe(5);
    });
  });

  describe('increment', () => {
    test('should increment by 1 by default', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 0 }));

      act(() => {
        result.current.increment();
      });

      expect(result.current.value).toBe(1);
    });

    test('should increment by specified delta', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 0 }));

      act(() => {
        result.current.increment(5);
      });

      expect(result.current.value).toBe(5);
    });

    test('should increment multiple times', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 0 }));

      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.value).toBe(3);
    });

    test('should not exceed max boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 8, max: 10 })
      );

      act(() => {
        result.current.increment(5);
      });

      expect(result.current.value).toBe(10);
    });

    test('should handle negative delta (decrement)', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.increment(-3);
      });

      expect(result.current.value).toBe(2);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCounter());
      const firstIncrement = result.current.increment;

      rerender();

      expect(result.current.increment).toBe(firstIncrement);
    });
  });

  describe('decrement', () => {
    test('should decrement by 1 by default', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.decrement();
      });

      expect(result.current.value).toBe(4);
    });

    test('should decrement by specified delta', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10 }));

      act(() => {
        result.current.decrement(5);
      });

      expect(result.current.value).toBe(5);
    });

    test('should decrement multiple times', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10 }));

      act(() => {
        result.current.decrement();
        result.current.decrement();
        result.current.decrement();
      });

      expect(result.current.value).toBe(7);
    });

    test('should not go below min boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 3, min: 0 })
      );

      act(() => {
        result.current.decrement(5);
      });

      expect(result.current.value).toBe(0);
    });

    test('should handle negative delta (increment)', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.decrement(-3);
      });

      expect(result.current.value).toBe(8);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCounter());
      const firstDecrement = result.current.decrement;

      rerender();

      expect(result.current.decrement).toBe(firstDecrement);
    });
  });

  describe('reset', () => {
    test('should reset to initial value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10 }));

      act(() => {
        result.current.increment(5);
      });
      expect(result.current.value).toBe(15);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(10);
    });

    test('should reset to 0 when no initial value provided', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment(10);
      });
      expect(result.current.value).toBe(10);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(0);
    });

    test('should reset to clamped initial value', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 0, min: 5, max: 10 })
      );

      act(() => {
        result.current.increment(3);
      });
      expect(result.current.value).toBe(8);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(5);
    });

    test('should work multiple times', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.increment();
      });
      expect(result.current.value).toBe(6);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(5);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.value).toBe(4);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(5);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCounter());
      const firstReset = result.current.reset;

      rerender();

      expect(result.current.reset).toBe(firstReset);
    });
  });

  describe('setValue', () => {
    test('should set value directly', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 0 }));

      act(() => {
        result.current.setValue(42);
      });

      expect(result.current.value).toBe(42);
    });

    test('should set negative value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 0 }));

      act(() => {
        result.current.setValue(-10);
      });

      expect(result.current.value).toBe(-10);
    });

    test('should accept function updater', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.setValue((prev) => prev * 2);
      });

      expect(result.current.value).toBe(10);
    });

    test('should clamp value to max boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 0, max: 10 })
      );

      act(() => {
        result.current.setValue(20);
      });

      expect(result.current.value).toBe(10);
    });

    test('should clamp value to min boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 0, min: -5 })
      );

      act(() => {
        result.current.setValue(-10);
      });

      expect(result.current.value).toBe(-5);
    });

    test('should clamp function updater result', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 0, max: 10 })
      );

      act(() => {
        result.current.setValue((prev) => prev + 100);
      });

      expect(result.current.value).toBe(10);
    });
  });

  describe('boundaries', () => {
    test('should respect both min and max boundaries', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 0, max: 10 })
      );

      // Try to exceed max
      act(() => {
        result.current.increment(10);
      });
      expect(result.current.value).toBe(10);

      // Try to go below min
      act(() => {
        result.current.decrement(15);
      });
      expect(result.current.value).toBe(0);
    });

    test('should work with negative min and max', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: -5, min: -10, max: -1 })
      );

      expect(result.current.value).toBe(-5);

      act(() => {
        result.current.increment(10);
      });
      expect(result.current.value).toBe(-1);

      act(() => {
        result.current.decrement(20);
      });
      expect(result.current.value).toBe(-10);
    });

    test('should handle zero as boundary', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 0 })
      );

      act(() => {
        result.current.decrement(10);
      });
      expect(result.current.value).toBe(0);
    });

    test('should handle equal min and max (fixed value)', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 5, max: 5 })
      );

      expect(result.current.value).toBe(5);

      act(() => {
        result.current.increment();
      });
      expect(result.current.value).toBe(5);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.value).toBe(5);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 5, min: 0, max: 20 })
      );

      expect(result.current.value).toBe(5);

      act(() => {
        result.current.increment(3);
      });
      expect(result.current.value).toBe(8);

      act(() => {
        result.current.decrement(2);
      });
      expect(result.current.value).toBe(6);

      act(() => {
        result.current.setValue(15);
      });
      expect(result.current.value).toBe(15);

      act(() => {
        result.current.increment(10); // Should clamp to 20
      });
      expect(result.current.value).toBe(20);

      act(() => {
        result.current.reset();
      });
      expect(result.current.value).toBe(5);

      act(() => {
        result.current.decrement(10); // Should clamp to 0
      });
      expect(result.current.value).toBe(0);
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useCounter());

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('increment');
      expect(result.current).toHaveProperty('decrement');
      expect(result.current).toHaveProperty('reset');
      expect(result.current).toHaveProperty('setValue');

      expect(typeof result.current.value).toBe('number');
      expect(typeof result.current.increment).toBe('function');
      expect(typeof result.current.decrement).toBe('function');
      expect(typeof result.current.reset).toBe('function');
      expect(typeof result.current.setValue).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const { result, rerender } = renderHook(() => useCounter());

      const firstRender = {
        increment: result.current.increment,
        decrement: result.current.decrement,
        reset: result.current.reset,
        setValue: result.current.setValue,
      };

      // Force a re-render by incrementing
      act(() => {
        result.current.increment();
      });

      rerender();

      // Function references should remain the same
      expect(result.current.increment).toBe(firstRender.increment);
      expect(result.current.decrement).toBe(firstRender.decrement);
      expect(result.current.reset).toBe(firstRender.reset);
      expect(result.current.setValue).toBe(firstRender.setValue);
    });
  });

  describe('edge cases', () => {
    test('should handle decimal values', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 1.5 }));

      expect(result.current.value).toBe(1.5);

      act(() => {
        result.current.increment(0.5);
      });
      expect(result.current.value).toBe(2.0);
    });

    test('should handle very large numbers', () => {
      const { result } = renderHook(() =>
        useCounter({ initialValue: 1000000 })
      );

      act(() => {
        result.current.increment(500000);
      });
      expect(result.current.value).toBe(1500000);
    });

    test('should handle zero delta', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.increment(0);
      });
      expect(result.current.value).toBe(5);

      act(() => {
        result.current.decrement(0);
      });
      expect(result.current.value).toBe(5);
    });
  });
});
