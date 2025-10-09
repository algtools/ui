import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

import { useEventCallback } from '@/hooks/use-event-callback';

describe('useEventCallback', () => {
  describe('initialization', () => {
    test('should return a function', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useEventCallback(callback));

      expect(typeof result.current).toBe('function');
    });

    test('should return the same function reference across renders', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useEventCallback(callback));

      const firstReference = result.current;
      rerender();
      const secondReference = result.current;

      expect(firstReference).toBe(secondReference);
    });
  });

  describe('callback execution', () => {
    test('should call the provided callback when invoked', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useEventCallback(callback));

      act(() => {
        result.current();
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should pass arguments to the callback', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useEventCallback(callback));

      act(() => {
        result.current('arg1', 'arg2', 123);
      });

      expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    test('should return the callback return value', () => {
      const callback = jest.fn(() => 'return value');
      const { result } = renderHook(() => useEventCallback(callback));

      let returnValue: string = '';
      act(() => {
        returnValue = result.current();
      });

      expect(returnValue).toBe('return value');
    });

    test('should work with callbacks that return undefined', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useEventCallback(callback));

      let returnValue: unknown;
      act(() => {
        returnValue = result.current();
      });

      expect(returnValue).toBeUndefined();
    });
  });

  describe('callback updates', () => {
    test('should call the latest callback version', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();

      const { result, rerender } = renderHook(({ callback }) => useEventCallback(callback), {
        initialProps: { callback: firstCallback },
      });

      // Call with first callback
      act(() => {
        result.current();
      });
      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).not.toHaveBeenCalled();

      // Update to second callback
      rerender({ callback: secondCallback });

      // Call with second callback
      act(() => {
        result.current();
      });
      expect(firstCallback).toHaveBeenCalledTimes(1); // Still 1
      expect(secondCallback).toHaveBeenCalledTimes(1);
    });

    test('should use latest closure values', () => {
      const calls: number[] = [];

      const { result, rerender } = renderHook(
        ({ count }) => {
          return useEventCallback(() => {
            calls.push(count);
          });
        },
        { initialProps: { count: 1 } }
      );

      // Call with count = 1
      act(() => {
        result.current();
      });
      expect(calls).toEqual([1]);

      // Update count to 2
      rerender({ count: 2 });

      // Call with count = 2
      act(() => {
        result.current();
      });
      expect(calls).toEqual([1, 2]);

      // Update count to 3
      rerender({ count: 3 });

      // Call with count = 3
      act(() => {
        result.current();
      });
      expect(calls).toEqual([1, 2, 3]);
    });
  });

  describe('reference stability', () => {
    test('should maintain same reference when callback changes', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();
      const thirdCallback = jest.fn();

      const { result, rerender } = renderHook(({ callback }) => useEventCallback(callback), {
        initialProps: { callback: firstCallback },
      });

      const originalReference = result.current;

      // Update callback multiple times
      rerender({ callback: secondCallback });
      expect(result.current).toBe(originalReference);

      rerender({ callback: thirdCallback });
      expect(result.current).toBe(originalReference);
    });

    test('should not cause re-renders in parent components', () => {
      let renderCount = 0;

      function TestComponent() {
        renderCount++;
        const [count, setCount] = useState(0);
        const callback = useEventCallback(() => {
          console.log(count);
        });

        return { callback, setCount };
      }

      const { result } = renderHook(() => TestComponent());
      const initialRenderCount = renderCount;

      // Get initial callback reference
      const firstCallback = result.current.callback;

      // Trigger a re-render by updating state
      act(() => {
        result.current.setCount(1);
      });

      // Callback reference should be the same
      expect(result.current.callback).toBe(firstCallback);
      // Component should have re-rendered once
      expect(renderCount).toBe(initialRenderCount + 1);
    });
  });

  describe('edge cases', () => {
    test('should work with async callbacks', async () => {
      const callback = jest.fn(async () => {
        await Promise.resolve();
        return 'async result';
      });

      const { result } = renderHook(() => useEventCallback(callback));

      let returnValue: Promise<string> | undefined;
      await act(async () => {
        returnValue = result.current() as Promise<string>;
      });

      expect(callback).toHaveBeenCalledTimes(1);
      await expect(returnValue).resolves.toBe('async result');
    });

    test('should work with callbacks that throw errors', () => {
      const error = new Error('Test error');
      const callback = jest.fn(() => {
        throw error;
      });

      const { result } = renderHook(() => useEventCallback(callback));

      expect(() => {
        result.current();
      }).toThrow(error);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should work with complex argument types', () => {
      const callback = jest.fn((obj: { a: number }, arr: string[], fn: () => void) => {
        fn();
        return obj.a + arr.length;
      });

      const { result } = renderHook(() => useEventCallback(callback));
      const mockFn = jest.fn();

      let returnValue: number = 0;
      act(() => {
        returnValue = result.current({ a: 5 }, ['x', 'y'], mockFn);
      });

      expect(callback).toHaveBeenCalledWith({ a: 5 }, ['x', 'y'], mockFn);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(returnValue).toBe(7);
    });

    test('should work with event objects', () => {
      const callback = jest.fn((event: React.MouseEvent) => {
        event.preventDefault();
      });

      const { result } = renderHook(() => useEventCallback(callback));

      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: null,
      } as unknown as React.MouseEvent;

      act(() => {
        result.current(mockEvent);
      });

      expect(callback).toHaveBeenCalledWith(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('integration', () => {
    test('should work correctly in a realistic scenario', () => {
      const onSubmit = jest.fn();

      function useForm() {
        const [value, setValue] = useState('');

        const handleSubmit = useEventCallback(() => {
          onSubmit(value);
        });

        return { value, setValue, handleSubmit };
      }

      const { result } = renderHook(() => useForm());

      // Initial submission
      act(() => {
        result.current.handleSubmit();
      });
      expect(onSubmit).toHaveBeenCalledWith('');

      // Update value
      act(() => {
        result.current.setValue('test value');
      });

      // Submit with new value
      act(() => {
        result.current.handleSubmit();
      });
      expect(onSubmit).toHaveBeenCalledWith('test value');
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    test('should work with multiple callback instances', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      const { result } = renderHook(() => ({
        cb1: useEventCallback(callback1),
        cb2: useEventCallback(callback2),
      }));

      act(() => {
        result.current.cb1();
        result.current.cb2();
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('performance', () => {
    test('should not create new function on every render', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useEventCallback(callback));

      const references: Array<(...args: unknown[]) => unknown> = [];
      references.push(result.current);

      // Force multiple re-renders
      for (let i = 0; i < 10; i++) {
        rerender();
        references.push(result.current);
      }

      // All references should be identical
      const firstReference = references[0];
      references.forEach((ref) => {
        expect(ref).toBe(firstReference);
      });
    });
  });

  describe('type safety', () => {
    test('should preserve callback signature', () => {
      // This test is mainly for type checking at compile time
      const typedCallback = (a: string, b: number): boolean => {
        return a.length > b;
      };

      const { result } = renderHook(() => useEventCallback(typedCallback));

      let returnValue: boolean = false;
      act(() => {
        returnValue = result.current('test', 3);
      });

      expect(returnValue).toBe(true);
    });

    test('should work with void return type', () => {
      const callback = jest.fn((x: number): void => {
        console.log(x);
      });

      const { result } = renderHook(() => useEventCallback(callback));

      act(() => {
        result.current(42);
      });

      expect(callback).toHaveBeenCalledWith(42);
    });
  });
});
