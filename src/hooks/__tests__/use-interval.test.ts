import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

import { useInterval } from '@/hooks/use-interval';

// Mock timers
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('useInterval', () => {
  describe('initialization', () => {
    test('should start automatically by default', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current.isRunning).toBe(true);
    });

    test('should not start automatically when autoStart is false', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      expect(result.current.isRunning).toBe(false);
    });

    test('should not start when delay is null', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, null));

      expect(result.current.isRunning).toBe(false);
    });

    test('should not call callback immediately', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, 1000));

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('interval execution', () => {
    test('should call callback after delay', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should call callback multiple times', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(callback).toHaveBeenCalledTimes(3);
    });

    test('should not call callback when delay is null', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, null));

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should not call callback when autoStart is false', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test('should use the latest callback', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const { rerender } = renderHook(({ cb }) => useInterval(cb, 1000), {
        initialProps: { cb: callback1 },
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();

      rerender({ cb: callback2 });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('start', () => {
    test('should start a paused interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should have no effect if already running', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));
      const firstStart = result.current.start;

      rerender();

      expect(result.current.start).toBe(firstStart);
    });
  });

  describe('pause', () => {
    test('should pause a running interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should still be 1, not 3
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should have no effect if already paused', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));
      const firstPause = result.current.pause;

      rerender();

      expect(result.current.pause).toBe(firstPause);
    });
  });

  describe('resume', () => {
    test('should resume a paused interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      act(() => {
        result.current.pause();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        result.current.resume();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should maintain same reference across renders', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));
      const firstResume = result.current.resume;

      rerender();

      expect(result.current.resume).toBe(firstResume);
    });
  });

  describe('toggle', () => {
    test('should toggle from running to paused', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should toggle from paused to running', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(true);
    });

    test('should toggle multiple times correctly', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));
      const firstToggle = result.current.toggle;

      rerender();

      expect(result.current.toggle).toBe(firstToggle);
    });
  });

  describe('reset', () => {
    test('should restart the interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(500);
      });

      act(() => {
        result.current.reset();
      });

      // After reset, it should restart (if autoStart is true)
      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should not have called yet since we reset
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Now it should have been called
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should not auto-restart when autoStart is false', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000, { autoStart: false }));

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));
      const firstReset = result.current.reset;

      rerender();

      expect(result.current.reset).toBe(firstReset);
    });
  });

  describe('delay changes', () => {
    test('should update interval when delay changes', () => {
      const callback = vi.fn();
      const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
        initialProps: { delay: 1000 },
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      rerender({ delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });

    test('should stop interval when delay becomes null', () => {
      const callback = vi.fn();
      const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
        initialProps: { delay: 1000 },
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      rerender({ delay: null });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should start interval when delay changes from null to number', () => {
      const callback = vi.fn();
      const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
        initialProps: { delay: null },
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(callback).not.toHaveBeenCalled();

      rerender({ delay: 1000 });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup', () => {
    test('should clear interval on unmount', () => {
      const callback = vi.fn();
      const { unmount } = renderHook(() => useInterval(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      unmount();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should not have been called again after unmount
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      act(() => {
        result.current.pause();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      act(() => {
        result.current.resume();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(3);

      act(() => {
        result.current.toggle();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(3);

      act(() => {
        result.current.toggle();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(4);
    });

    test('should expose all expected properties', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 1000));

      expect(result.current).toHaveProperty('isRunning');
      expect(result.current).toHaveProperty('start');
      expect(result.current).toHaveProperty('pause');
      expect(result.current).toHaveProperty('resume');
      expect(result.current).toHaveProperty('toggle');
      expect(result.current).toHaveProperty('reset');

      expect(typeof result.current.isRunning).toBe('boolean');
      expect(typeof result.current.start).toBe('function');
      expect(typeof result.current.pause).toBe('function');
      expect(typeof result.current.resume).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() => useInterval(callback, 1000));

      const firstRender = {
        start: result.current.start,
        pause: result.current.pause,
        resume: result.current.resume,
        toggle: result.current.toggle,
        reset: result.current.reset,
      };

      act(() => {
        result.current.toggle();
      });

      rerender();

      // Function references should remain the same
      expect(result.current.start).toBe(firstRender.start);
      expect(result.current.pause).toBe(firstRender.pause);
      expect(result.current.resume).toBe(firstRender.resume);
      expect(result.current.toggle).toBe(firstRender.toggle);
      expect(result.current.reset).toBe(firstRender.reset);
    });
  });
});
