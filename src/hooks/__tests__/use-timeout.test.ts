import { renderHook, act } from '@testing-library/react';

import { useTimeout } from '@/hooks/use-timeout';

// Mock timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useTimeout', () => {
  describe('initialization', () => {
    test('should start automatically when delay is provided', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      expect(result.current.isActive).toBe(true);
    });

    test('should not start when delay is null', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, null));

      expect(result.current.isActive).toBe(false);
    });

    test('should not call callback immediately', () => {
      const callback = jest.fn();
      renderHook(() => useTimeout(callback, 1000));

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('timeout execution', () => {
    test('should call callback after delay', () => {
      const callback = jest.fn();
      renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should call callback only once', () => {
      const callback = jest.fn();
      renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should not call callback when delay is null', () => {
      const callback = jest.fn();
      renderHook(() => useTimeout(callback, null));

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should use the latest callback', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const { rerender } = renderHook(({ cb }) => useTimeout(cb, 1000), {
        initialProps: { cb: callback1 },
      });

      rerender({ cb: callback2 });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    test('should set isActive to false after timeout executes', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.isActive).toBe(false);
    });
  });

  describe('start', () => {
    test('should restart the timeout', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(500);
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should not have called yet since we restarted at 500ms
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Now it should have been called
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should start after cancel', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        result.current.cancel();
      });

      expect(result.current.isActive).toBe(false);

      act(() => {
        result.current.start();
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should maintain same reference across renders', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useTimeout(callback, 1000));
      const firstStart = result.current.start;

      rerender();

      expect(result.current.start).toBe(firstStart);
    });

    test('should do nothing when delay is null', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, null));

      act(() => {
        result.current.start();
      });

      expect(result.current.isActive).toBe(false);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    test('should cancel a pending timeout', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      expect(result.current.isActive).toBe(true);

      act(() => {
        result.current.cancel();
      });

      expect(result.current.isActive).toBe(false);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should have no effect if timeout already executed', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.cancel();
      });

      expect(result.current.isActive).toBe(false);
    });

    test('should have no effect if already cancelled', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        result.current.cancel();
      });

      expect(result.current.isActive).toBe(false);

      act(() => {
        result.current.cancel();
      });

      expect(result.current.isActive).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useTimeout(callback, 1000));
      const firstCancel = result.current.cancel;

      rerender();

      expect(result.current.cancel).toBe(firstCancel);
    });
  });

  describe('reset', () => {
    test('should reset the timeout', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(500);
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should not have called yet since we reset at 500ms
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Now it should have been called
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should reset multiple times', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      act(() => {
        jest.advanceTimersByTime(800);
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        jest.advanceTimersByTime(800);
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        jest.advanceTimersByTime(800);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should maintain same reference across renders', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useTimeout(callback, 1000));
      const firstReset = result.current.reset;

      rerender();

      expect(result.current.reset).toBe(firstReset);
    });
  });

  describe('delay changes', () => {
    test('should restart timeout when delay changes', () => {
      const callback = jest.fn();
      const { rerender } = renderHook(({ delay }) => useTimeout(callback, delay), {
        initialProps: { delay: 1000 },
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      rerender({ delay: 2000 });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Should not have been called yet (only 1500ms total, but delay was changed to 2000ms)
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should cancel timeout when delay becomes null', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(({ delay }) => useTimeout(callback, delay), {
        initialProps: { delay: 1000 },
      });

      expect(result.current.isActive).toBe(true);

      rerender({ delay: null });

      expect(result.current.isActive).toBe(false);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should start timeout when delay changes from null to number', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(({ delay }) => useTimeout(callback, delay), {
        initialProps: { delay: null },
      });

      expect(result.current.isActive).toBe(false);

      rerender({ delay: 1000 });

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup', () => {
    test('should clear timeout on unmount', () => {
      const callback = jest.fn();
      const { unmount } = renderHook(() => useTimeout(callback, 1000));

      unmount();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should clear timeout on unmount even if already executed', () => {
      const callback = jest.fn();
      const { unmount } = renderHook(() => useTimeout(callback, 500));

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      unmount();

      // Should not throw or cause issues
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      act(() => {
        result.current.cancel();
      });
      expect(result.current.isActive).toBe(false);

      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        result.current.start();
      });
      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);
      expect(result.current.isActive).toBe(false);
    });

    test('should expose all expected properties', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000));

      expect(result.current).toHaveProperty('isActive');
      expect(result.current).toHaveProperty('start');
      expect(result.current).toHaveProperty('cancel');
      expect(result.current).toHaveProperty('reset');

      expect(typeof result.current.isActive).toBe('boolean');
      expect(typeof result.current.start).toBe('function');
      expect(typeof result.current.cancel).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const callback = jest.fn();
      const { result, rerender } = renderHook(() => useTimeout(callback, 1000));

      const firstRender = {
        start: result.current.start,
        cancel: result.current.cancel,
        reset: result.current.reset,
      };

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      rerender();

      // Function references should remain the same
      expect(result.current.start).toBe(firstRender.start);
      expect(result.current.cancel).toBe(firstRender.cancel);
      expect(result.current.reset).toBe(firstRender.reset);
    });
  });

  describe('edge cases', () => {
    test('should handle zero delay', () => {
      const callback = jest.fn();
      renderHook(() => useTimeout(callback, 0));

      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should handle very large delay', () => {
      const callback = jest.fn();
      const { result } = renderHook(() => useTimeout(callback, 1000000));

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(999999);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
