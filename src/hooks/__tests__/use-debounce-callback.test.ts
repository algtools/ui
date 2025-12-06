import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

import { useDebounceCallback } from '@/hooks/use-debounce-callback';

// Enable fake timers for timing tests
vi.useFakeTimers();

describe('useDebounceCallback', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('initialization', () => {
    test('should return callback, cancel, and flush methods', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      expect(result.current).toHaveProperty('callback');
      expect(result.current).toHaveProperty('cancel');
      expect(result.current).toHaveProperty('flush');
      expect(typeof result.current.callback).toBe('function');
      expect(typeof result.current.cancel).toBe('function');
      expect(typeof result.current.flush).toBe('function');
    });

    test('should use default delay of 500ms when not specified', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback));

      result.current.callback();

      // Should not be called immediately
      expect(mockCallback).not.toHaveBeenCalled();

      // Should be called after 500ms
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should not call callback immediately', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback();

      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('debouncing behavior', () => {
    test('should call callback after delay expires', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should not call callback before delay expires', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(499);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should pass arguments to callback', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('arg1', 'arg2', 123);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    test('should reset timer on subsequent calls', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      // First call
      result.current.callback('first');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Second call before first completes
      result.current.callback('second');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Should not be called yet (only 250ms passed since second call)
      expect(mockCallback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Should be called once with the last arguments
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('second');
    });

    test('should handle multiple rapid calls correctly', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      // Simulate rapid calls
      for (let i = 0; i < 10; i++) {
        result.current.callback(i);
        act(() => {
          vi.advanceTimersByTime(50);
        });
      }

      // Should not be called yet
      expect(mockCallback).not.toHaveBeenCalled();

      // Complete the debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should be called once with the last value
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(9);
    });

    test('should work with different argument types', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      const testObj = { key: 'value' };
      const testArr = [1, 2, 3];

      result.current.callback(testObj, testArr, 'string', 123, true, null, undefined);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith(
        testObj,
        testArr,
        'string',
        123,
        true,
        null,
        undefined
      );
    });
  });

  describe('cancel functionality', () => {
    test('should cancel pending callback', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Cancel before timeout completes
      result.current.cancel();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Callback should not have been called
      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle cancel with no pending callback', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      // Cancel without any pending callback
      expect(() => result.current.cancel()).not.toThrow();
      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle multiple cancel calls', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');
      result.current.cancel();
      result.current.cancel();
      result.current.cancel();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should allow new calls after cancel', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('first');
      result.current.cancel();

      result.current.callback('second');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('second');
    });
  });

  describe('flush functionality', () => {
    test('should immediately invoke pending callback', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Flush before timeout completes
      result.current.flush();

      // Callback should have been called immediately
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('test');
    });

    test('should handle flush with no pending callback', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      // Flush without any pending callback
      expect(() => result.current.flush()).not.toThrow();
      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle multiple flush calls', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');
      result.current.flush();
      result.current.flush();
      result.current.flush();

      // Should only be called once
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('test');
    });

    test('should prevent timeout execution after flush', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');
      result.current.flush();

      // Advance time past original delay
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should still only be called once
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should pass correct arguments when flushed', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      const testData = { complex: 'object', with: [1, 2, 3] };
      result.current.callback(testData, 'additional', 123);

      result.current.flush();

      expect(mockCallback).toHaveBeenCalledWith(testData, 'additional', 123);
    });

    test('should allow new calls after flush', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('first');
      result.current.flush();

      mockCallback.mockClear();

      result.current.callback('second');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('second');
    });
  });

  describe('delay configuration', () => {
    test('should respect custom delay of 100ms', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 100));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(99);
      });
      expect(mockCallback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should respect custom delay of 1000ms', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 1000));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(mockCallback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should handle delay of 0ms (immediate execution)', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 0));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('should update behavior when delay changes', () => {
      const mockCallback = vi.fn();
      const { result, rerender } = renderHook(
        ({ delay }) => useDebounceCallback(mockCallback, delay),
        {
          initialProps: { delay: 500 },
        }
      );

      result.current.callback('first');

      // Change delay
      rerender({ delay: 1000 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should not be called yet with old delay
      expect(mockCallback).not.toHaveBeenCalled();

      result.current.callback('second');

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Should be called with new delay
      expect(mockCallback).toHaveBeenCalledWith('second');
    });
  });

  describe('callback updates', () => {
    test('should use the latest callback', () => {
      const mockCallback1 = vi.fn();
      const mockCallback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ callback }) => useDebounceCallback(callback, 500),
        {
          initialProps: { callback: mockCallback1 },
        }
      );

      result.current.callback('test');

      // Update callback before timeout expires
      rerender({ callback: mockCallback2 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should call the new callback
      expect(mockCallback1).not.toHaveBeenCalled();
      expect(mockCallback2).toHaveBeenCalledWith('test');
    });

    test('should maintain debounce state across callback updates', () => {
      const mockCallback1 = vi.fn();
      const mockCallback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ callback }) => useDebounceCallback(callback, 500),
        {
          initialProps: { callback: mockCallback1 },
        }
      );

      result.current.callback('first');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      rerender({ callback: mockCallback2 });

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Should call the new callback after the original delay
      expect(mockCallback2).toHaveBeenCalledWith('first');
    });
  });

  describe('cleanup', () => {
    test('should cleanup timeout on unmount', () => {
      const mockCallback = vi.fn();
      const { result, unmount } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');

      // Unmount before timeout expires
      unmount();

      // Advance time - callback should not be called
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should not throw on unmount with no pending callback', () => {
      const mockCallback = vi.fn();
      const { unmount } = renderHook(() => useDebounceCallback(mockCallback, 500));

      expect(() => unmount()).not.toThrow();
    });

    test('should cleanup after multiple operations', () => {
      const mockCallback = vi.fn();
      const { result, unmount } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('first');
      result.current.cancel();
      result.current.callback('second');
      result.current.flush();
      result.current.callback('third');

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('TypeScript generics', () => {
    test('should work with no arguments', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith();
    });

    test('should work with single argument', () => {
      const mockCallback = vi.fn((value: string) => value);
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith('test');
    });

    test('should work with multiple typed arguments', () => {
      const mockCallback = vi.fn((str: string, num: number, bool: boolean) => {
        return { str, num, bool };
      });

      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('test', 123, true);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith('test', 123, true);
    });

    test('should work with complex types', () => {
      interface ComplexType {
        id: number;
        name: string;
        nested: {
          value: boolean;
        };
      }

      const mockCallback = vi.fn((data: ComplexType) => data);
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      const testData: ComplexType = {
        id: 1,
        name: 'test',
        nested: { value: true },
      };

      result.current.callback(testData);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledWith(testData);
    });
  });

  describe('real-world scenarios', () => {
    test('should simulate search input debouncing', () => {
      const mockSearch = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockSearch, 300));

      // Simulate rapid typing
      const searchTerms = ['r', 're', 'rea', 'reac', 'react'];

      searchTerms.forEach((term) => {
        result.current.callback(term);
        act(() => {
          vi.advanceTimersByTime(50);
        });
      });

      // Should not be called yet
      expect(mockSearch).not.toHaveBeenCalled();

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Should be called once with the last term
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('react');
    });

    test('should simulate window resize handler', () => {
      const mockResize = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockResize, 200));

      // Simulate rapid resize events
      for (let i = 0; i < 20; i++) {
        result.current.callback(800 + i * 10, 600 + i * 5);
        act(() => {
          vi.advanceTimersByTime(10);
        });
      }

      expect(mockResize).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(mockResize).toHaveBeenCalledTimes(1);
      expect(mockResize).toHaveBeenCalledWith(990, 695);
    });

    test('should simulate auto-save with flush on unmount', () => {
      const mockSave = vi.fn();
      const { result, unmount } = renderHook(() => useDebounceCallback(mockSave, 1000));

      result.current.callback('content');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Simulate unmounting component (flush to save before unmount)
      result.current.flush();

      unmount();

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(mockSave).toHaveBeenCalledWith('content');
    });

    test('should simulate API request with cancel on component change', () => {
      const mockApiCall = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockApiCall, 500));

      result.current.callback('/api/users');

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // User navigates away - cancel the request
      result.current.cancel();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockApiCall).not.toHaveBeenCalled();
    });

    test('should simulate form validation', () => {
      const mockValidate = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockValidate, 400));

      // User types email
      const emailChars = ['t', 'te', 'tes', 'test', 'test@', 'test@e', 'test@example.com'];

      emailChars.forEach((email) => {
        result.current.callback(email);
        act(() => {
          vi.advanceTimersByTime(50);
        });
      });

      expect(mockValidate).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(mockValidate).toHaveBeenCalledTimes(1);
      expect(mockValidate).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('edge cases', () => {
    test('should handle calling with same arguments multiple times', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback('same');
      result.current.callback('same');
      result.current.callback('same');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('same');
    });

    test('should handle stress test with many rapid calls', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      // Make 1000 rapid calls
      for (let i = 0; i < 1000; i++) {
        result.current.callback(i);
        act(() => {
          vi.advanceTimersByTime(1);
        });
      }

      expect(mockCallback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(999);
    });

    test('should handle alternating call and cancel', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      for (let i = 0; i < 5; i++) {
        result.current.callback(i);
        act(() => {
          vi.advanceTimersByTime(100);
        });
        result.current.cancel();
      }

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle alternating call and flush', () => {
      const mockCallback = vi.fn();
      const { result } = renderHook(() => useDebounceCallback(mockCallback, 500));

      result.current.callback(1);
      result.current.flush();

      result.current.callback(2);
      result.current.flush();

      result.current.callback(3);
      result.current.flush();

      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenNthCalledWith(1, 1);
      expect(mockCallback).toHaveBeenNthCalledWith(2, 2);
      expect(mockCallback).toHaveBeenNthCalledWith(3, 3);
    });
  });
});
