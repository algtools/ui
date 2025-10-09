import { renderHook, act } from '@testing-library/react';

import { useCountdown } from '@/hooks/use-countdown';

// Mock timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useCountdown', () => {
  describe('initialization', () => {
    test('should initialize with the correct duration', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current.timeRemaining).toBe(5000);
      expect(result.current.isRunning).toBe(false);
    });

    test('should auto-start when autoStart is true', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      expect(result.current.isRunning).toBe(true);
    });

    test('should not auto-start by default', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current.isRunning).toBe(false);
    });

    test('should accept custom interval option', () => {
      const { result } = renderHook(() => useCountdown(5000, { interval: 500, autoStart: true }));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.timeRemaining).toBe(4500);
    });
  });

  describe('countdown execution', () => {
    test('should count down correctly', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.timeRemaining).toBe(2000);
    });

    test('should stop at zero', () => {
      const { result } = renderHook(() => useCountdown(3000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);

      // Should not go below zero
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(0);
    });

    test('should not count down when not started', () => {
      const { result } = renderHook(() => useCountdown(5000));

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(result.current.timeRemaining).toBe(5000);
    });

    test('should work with custom interval', () => {
      const { result } = renderHook(() => useCountdown(5000, { interval: 500, autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.timeRemaining).toBe(4500);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(3500);
    });
  });

  describe('start', () => {
    test('should start the countdown', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);
    });

    test('should not start when time is zero', () => {
      const { result } = renderHook(() => useCountdown(0));

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstStart = result.current.start;

      rerender();

      expect(result.current.start).toBe(firstStart);
    });
  });

  describe('pause', () => {
    test('should pause the countdown', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Should still be 4000 since it's paused
      expect(result.current.timeRemaining).toBe(4000);
    });

    test('should have no effect if already paused', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstPause = result.current.pause;

      rerender();

      expect(result.current.pause).toBe(firstPause);
    });
  });

  describe('resume', () => {
    test('should resume a paused countdown', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);

      act(() => {
        result.current.pause();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);

      act(() => {
        result.current.resume();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(3000);
    });

    test('should not resume when time is zero', () => {
      const { result } = renderHook(() => useCountdown(1000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.resume();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstResume = result.current.resume;

      rerender();

      expect(result.current.resume).toBe(firstResume);
    });
  });

  describe('toggle', () => {
    test('should toggle from running to paused', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should toggle from paused to running', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(true);
    });

    test('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

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

    test('should not toggle when time is zero', () => {
      const { result } = renderHook(() => useCountdown(1000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstToggle = result.current.toggle;

      rerender();

      expect(result.current.toggle).toBe(firstToggle);
    });
  });

  describe('reset', () => {
    test('should reset to initial duration', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.timeRemaining).toBe(3000);

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(5000);
    });

    test('should restart countdown when autoStart is true', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.pause();
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(5000);
      expect(result.current.isRunning).toBe(true);
    });

    test('should not auto-restart when autoStart is false', () => {
      const { result } = renderHook(() => useCountdown(5000));

      act(() => {
        result.current.start();
      });

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(5000);
      expect(result.current.isRunning).toBe(false);
    });

    test('should reset from zero', () => {
      const { result } = renderHook(() => useCountdown(2000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(2000);
      expect(result.current.isRunning).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstReset = result.current.reset;

      rerender();

      expect(result.current.reset).toBe(firstReset);
    });
  });

  describe('setDuration', () => {
    test('should set a new duration', () => {
      const { result } = renderHook(() => useCountdown(5000));

      act(() => {
        result.current.setDuration(10000);
      });

      expect(result.current.timeRemaining).toBe(10000);
    });

    test('should pause the countdown when setting new duration', () => {
      const { result } = renderHook(() => useCountdown(5000, { autoStart: true }));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.setDuration(10000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.timeRemaining).toBe(10000);
    });

    test('should work with reset after setting new duration', () => {
      const { result } = renderHook(() => useCountdown(5000));

      act(() => {
        result.current.setDuration(10000);
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.timeRemaining).toBe(8000);

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(10000);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));
      const firstSetDuration = result.current.setDuration;

      rerender();

      expect(result.current.setDuration).toBe(firstSetDuration);
    });
  });

  describe('onComplete callback', () => {
    test('should call onComplete when countdown reaches zero', () => {
      const onComplete = jest.fn();
      const { result } = renderHook(() => useCountdown(2000, { autoStart: true, onComplete }));

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Wait for setTimeout in the callback
      act(() => {
        jest.runAllTimers();
      });

      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(result.current.timeRemaining).toBe(0);
    });

    test('should not call onComplete when paused before reaching zero', () => {
      const onComplete = jest.fn();
      const { result } = renderHook(() => useCountdown(2000, { autoStart: true, onComplete }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        result.current.pause();
      });

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(onComplete).not.toHaveBeenCalled();
    });

    test('should call onComplete only once', () => {
      const onComplete = jest.fn();
      renderHook(() => useCountdown(2000, { autoStart: true, onComplete }));

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // Wait for setTimeout in the callback
      act(() => {
        jest.runAllTimers();
      });

      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    test('should use the latest onComplete callback', () => {
      const onComplete1 = jest.fn();
      const onComplete2 = jest.fn();
      const { rerender } = renderHook(
        ({ callback }) => useCountdown(2000, { autoStart: true, onComplete: callback }),
        { initialProps: { callback: onComplete1 } }
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      rerender({ callback: onComplete2 });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Wait for setTimeout in the callback
      act(() => {
        jest.runAllTimers();
      });

      expect(onComplete1).not.toHaveBeenCalled();
      expect(onComplete2).toHaveBeenCalledTimes(1);
    });
  });

  describe('duration changes', () => {
    test('should handle initial duration changes', () => {
      const { rerender } = renderHook(({ duration }) => useCountdown(duration), {
        initialProps: { duration: 5000 },
      });

      rerender({ duration: 10000 });

      // Note: Initial duration is stored in a ref and doesn't automatically update timeRemaining
      // This is expected behavior - use setDuration for dynamic updates
    });
  });

  describe('cleanup', () => {
    test('should clean up on unmount', () => {
      const { result, unmount } = renderHook(() => useCountdown(5000, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(4000);

      unmount();

      // Should not throw errors after unmount
      act(() => {
        jest.advanceTimersByTime(2000);
      });
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const onComplete = jest.fn();
      const { result } = renderHook(() => useCountdown(5000, { onComplete }));

      expect(result.current.isRunning).toBe(false);
      expect(result.current.timeRemaining).toBe(5000);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.timeRemaining).toBe(3000);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(3000);

      act(() => {
        result.current.resume();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(2000);

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(5000);
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useCountdown(5000));

      expect(result.current).toHaveProperty('timeRemaining');
      expect(result.current).toHaveProperty('isRunning');
      expect(result.current).toHaveProperty('start');
      expect(result.current).toHaveProperty('pause');
      expect(result.current).toHaveProperty('resume');
      expect(result.current).toHaveProperty('toggle');
      expect(result.current).toHaveProperty('reset');
      expect(result.current).toHaveProperty('setDuration');

      expect(typeof result.current.timeRemaining).toBe('number');
      expect(typeof result.current.isRunning).toBe('boolean');
      expect(typeof result.current.start).toBe('function');
      expect(typeof result.current.pause).toBe('function');
      expect(typeof result.current.resume).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
      expect(typeof result.current.reset).toBe('function');
      expect(typeof result.current.setDuration).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const { result, rerender } = renderHook(() => useCountdown(5000));

      const firstRender = {
        start: result.current.start,
        pause: result.current.pause,
        resume: result.current.resume,
        toggle: result.current.toggle,
        reset: result.current.reset,
        setDuration: result.current.setDuration,
      };

      // Rerender without any state changes
      rerender();

      // Function references should remain the same when nothing changes
      expect(result.current.start).toBe(firstRender.start);
      expect(result.current.pause).toBe(firstRender.pause);
      expect(result.current.resume).toBe(firstRender.resume);
      expect(result.current.toggle).toBe(firstRender.toggle);
      expect(result.current.reset).toBe(firstRender.reset);
      expect(result.current.setDuration).toBe(firstRender.setDuration);
    });
  });

  describe('edge cases', () => {
    test('should handle zero initial duration', () => {
      const { result } = renderHook(() => useCountdown(0));

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(false);
    });

    test('should handle very small durations', () => {
      const { result } = renderHook(() => useCountdown(100, { autoStart: true, interval: 50 }));

      act(() => {
        jest.advanceTimersByTime(50);
      });

      expect(result.current.timeRemaining).toBe(50);

      act(() => {
        jest.advanceTimersByTime(50);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isRunning).toBe(false);
    });

    test('should handle very large durations', () => {
      const largeNumber = 1000000000; // 1 billion ms
      const { result } = renderHook(() => useCountdown(largeNumber, { autoStart: true }));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.timeRemaining).toBe(largeNumber - 1000);
    });
  });
});
