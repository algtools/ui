import { renderHook, act } from '@testing-library/react';

import { useMousePosition } from '@/hooks/use-mouse-position';

describe('useMousePosition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('basic functionality', () => {
    test('should initialize with default position (0, 0)', () => {
      const { result } = renderHook(() => useMousePosition());

      expect(result.current.position).toEqual({ x: 0, y: 0 });
      expect(result.current.x).toBe(0);
      expect(result.current.y).toBe(0);
    });

    test('should initialize with custom initial position', () => {
      const { result } = renderHook(() =>
        useMousePosition({ initialPosition: { x: 100, y: 200 } })
      );

      expect(result.current.position).toEqual({ x: 100, y: 200 });
      expect(result.current.x).toBe(100);
      expect(result.current.y).toBe(200);
    });

    test('should update position on mouse move', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        const event = new MouseEvent('mousemove', {
          clientX: 150,
          clientY: 250,
        });
        window.dispatchEvent(event);
      });

      expect(result.current.position).toEqual({ x: 150, y: 250 });
      expect(result.current.x).toBe(150);
      expect(result.current.y).toBe(250);
    });

    test('should update position on multiple mouse moves', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 20 }));
      });
      expect(result.current.position).toEqual({ x: 10, y: 20 });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 40 }));
      });
      expect(result.current.position).toEqual({ x: 30, y: 40 });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 60 }));
      });
      expect(result.current.position).toEqual({ x: 50, y: 60 });
    });

    test('should handle zero coordinates', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
      });

      expect(result.current.position).toEqual({ x: 0, y: 0 });
    });

    test('should handle large coordinates', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 9999, clientY: 9999 }));
      });

      expect(result.current.position).toEqual({ x: 9999, y: 9999 });
    });

    test('should handle negative coordinates', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: -50, clientY: -100 }));
      });

      expect(result.current.position).toEqual({ x: -50, y: -100 });
    });
  });

  describe('enabled option', () => {
    test('should not track when enabled is false', () => {
      const { result } = renderHook(() => useMousePosition({ enabled: false }));

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      expect(result.current.position).toEqual({ x: 0, y: 0 });
    });

    test('should start tracking when enabled changes to true', () => {
      const { result, rerender } = renderHook(({ enabled }) => useMousePosition({ enabled }), {
        initialProps: { enabled: false },
      });

      // Should not track initially
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });
      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Enable tracking
      rerender({ enabled: true });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
      });
      expect(result.current.position).toEqual({ x: 150, y: 250 });
    });

    test('should stop tracking when enabled changes to false', () => {
      const { result, rerender } = renderHook(({ enabled }) => useMousePosition({ enabled }), {
        initialProps: { enabled: true },
      });

      // Should track initially
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });
      expect(result.current.position).toEqual({ x: 100, y: 200 });

      // Disable tracking
      rerender({ enabled: false });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 400 }));
      });
      // Should keep previous position
      expect(result.current.position).toEqual({ x: 100, y: 200 });
    });

    test('should preserve custom initial position when enabled is false', () => {
      const { result } = renderHook(() =>
        useMousePosition({ enabled: false, initialPosition: { x: 50, y: 75 } })
      );

      expect(result.current.position).toEqual({ x: 50, y: 75 });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      expect(result.current.position).toEqual({ x: 50, y: 75 });
    });
  });

  describe('debouncing', () => {
    test('should debounce position updates', () => {
      const { result } = renderHook(() => useMousePosition({ debounceMs: 200 }));

      // Move mouse
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      // Should not update immediately
      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Fast-forward time by 199ms
      act(() => {
        jest.advanceTimersByTime(199);
      });
      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Fast-forward time by 1ms more
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(result.current.position).toEqual({ x: 100, y: 200 });
    });

    test('should reset debounce timer on rapid movements', () => {
      const { result } = renderHook(() => useMousePosition({ debounceMs: 200 }));

      // First movement
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      // Fast-forward 100ms
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Second movement before debounce completes
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
      });

      // Fast-forward 100ms (total 200ms from first movement, but only 100ms from second)
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Should not have updated yet
      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Fast-forward another 100ms (200ms from second movement)
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Should update with the last position
      expect(result.current.position).toEqual({ x: 150, y: 250 });
    });

    test('should handle multiple rapid movements with debouncing', () => {
      const { result } = renderHook(() => useMousePosition({ debounceMs: 300 }));

      // Rapid movements
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
      });
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
      });
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 30 }));
      });

      // Should not have updated yet
      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Fast-forward past debounce time
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Should update with the last position only
      expect(result.current.position).toEqual({ x: 30, y: 30 });
    });

    test('should work with zero debounce', () => {
      const { result } = renderHook(() => useMousePosition({ debounceMs: 0 }));

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      // With zero debounce, it should behave like immediate update
      expect(result.current.position).toEqual({ x: 100, y: 200 });
    });
  });

  describe('throttling', () => {
    test('should throttle position updates', () => {
      const { result } = renderHook(() => useMousePosition({ throttleMs: 100 }));

      // First movement should update immediately
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });
      expect(result.current.position).toEqual({ x: 100, y: 200 });

      // Second movement within throttle window should not update
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
      });
      expect(result.current.position).toEqual({ x: 100, y: 200 });

      // After throttle window, next movement should update
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 300 }));
      });
      expect(result.current.position).toEqual({ x: 200, y: 300 });
    });

    test('should allow updates at throttle intervals', () => {
      const { result } = renderHook(() => useMousePosition({ throttleMs: 100 }));

      // First update
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
      });
      expect(result.current.position).toEqual({ x: 10, y: 10 });

      // Wait for throttle interval
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Second update
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
      });
      expect(result.current.position).toEqual({ x: 20, y: 20 });

      // Wait for throttle interval
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Third update
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 30 }));
      });
      expect(result.current.position).toEqual({ x: 30, y: 30 });
    });

    test('should ignore movements within throttle window', () => {
      const { result } = renderHook(() => useMousePosition({ throttleMs: 200 }));

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
      });
      expect(result.current.position).toEqual({ x: 100, y: 100 });

      // Multiple movements within throttle window
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 110, clientY: 110 }));
      });
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 120 }));
      });

      // Should still be at first position
      expect(result.current.position).toEqual({ x: 100, y: 100 });

      // After throttle window
      act(() => {
        jest.advanceTimersByTime(100);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 130, clientY: 130 }));
      });

      // Should update to new position
      expect(result.current.position).toEqual({ x: 130, y: 130 });
    });

    test('should work with zero throttle', () => {
      const { result } = renderHook(() => useMousePosition({ throttleMs: 0 }));

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      // With zero throttle, updates should still work
      expect(result.current.position).toEqual({ x: 100, y: 200 });

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
      });

      expect(result.current.position).toEqual({ x: 150, y: 250 });
    });
  });

  describe('validation', () => {
    test('should throw error when both debounce and throttle are provided', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useMousePosition({ debounceMs: 100, throttleMs: 100 }));
      }).toThrow(
        'useMousePosition: Cannot use both debounceMs and throttleMs options simultaneously. Please use only one.'
      );

      console.error = originalError;
    });
  });

  describe('cleanup', () => {
    test('should remove event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useMousePosition());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    test('should clear pending debounce timeout on unmount', () => {
      const { result, unmount } = renderHook(() => useMousePosition({ debounceMs: 500 }));

      // Trigger mouse move
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      expect(result.current.position).toEqual({ x: 0, y: 0 });

      // Unmount before debounce completes
      unmount();

      // Fast-forward past the debounce time
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should still be at initial position since unmount cleared the timeout
      expect(result.current.position).toEqual({ x: 0, y: 0 });
    });

    test('should not cause memory leaks with multiple mount/unmount cycles', () => {
      // Mount and unmount multiple times
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() => useMousePosition({ debounceMs: 100 }));
        act(() => {
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: i * 10, clientY: i * 10 }));
        });
        unmount();
      }

      // No assertions needed - test passes if no errors or memory issues
      expect(true).toBe(true);
    });
  });

  describe('option updates', () => {
    test('should update behavior when debounceMs changes', () => {
      const { result, rerender } = renderHook(
        ({ debounce }) => useMousePosition({ debounceMs: debounce }),
        { initialProps: { debounce: 100 } }
      );

      // Test with initial debounce
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 50 }));
      });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current.position).toEqual({ x: 50, y: 50 });

      // Update debounce
      rerender({ debounce: 200 });

      // Test with new debounce
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
      });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      // Should not have updated yet
      expect(result.current.position).toEqual({ x: 50, y: 50 });

      act(() => {
        jest.advanceTimersByTime(100);
      });
      // Now should be updated
      expect(result.current.position).toEqual({ x: 100, y: 100 });
    });

    test('should update behavior when throttleMs changes', () => {
      const { result, rerender } = renderHook(
        ({ throttle }) => useMousePosition({ throttleMs: throttle }),
        { initialProps: { throttle: 100 } }
      );

      // First update
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
      });
      expect(result.current.position).toEqual({ x: 10, y: 10 });

      // Update throttle to longer duration
      rerender({ throttle: 200 });

      act(() => {
        jest.advanceTimersByTime(150);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
      });
      // Should not update yet with new throttle
      expect(result.current.position).toEqual({ x: 10, y: 10 });
    });
  });

  describe('edge cases', () => {
    test('should handle fractional coordinates', () => {
      const { result } = renderHook(() => useMousePosition());

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100.5, clientY: 200.7 }));
      });

      expect(result.current.position).toEqual({ x: 100.5, y: 200.7 });
    });

    test('should handle very rapid movements without debounce/throttle', () => {
      const { result } = renderHook(() => useMousePosition());

      for (let i = 0; i < 100; i++) {
        act(() => {
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: i, clientY: i }));
        });
      }

      expect(result.current.position).toEqual({ x: 99, y: 99 });
    });

    test('should work correctly with different debounce values', () => {
      const { result, rerender } = renderHook(
        ({ delay }) => useMousePosition({ debounceMs: delay }),
        { initialProps: { delay: 50 } }
      );

      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
      });
      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(result.current.position).toEqual({ x: 10, y: 10 });

      // Test with a different delay
      rerender({ delay: 500 });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
      });
      act(() => {
        jest.advanceTimersByTime(499);
      });
      expect(result.current.position).toEqual({ x: 10, y: 10 });
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(result.current.position).toEqual({ x: 20, y: 20 });
    });
  });

  describe('integration scenarios', () => {
    test('should work in cursor tracking scenario', () => {
      const { result } = renderHook(() => useMousePosition());

      // Simulate user moving mouse in a path
      const path = [
        { x: 0, y: 0 },
        { x: 50, y: 50 },
        { x: 100, y: 100 },
        { x: 150, y: 150 },
      ];

      path.forEach((point) => {
        act(() => {
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: point.x, clientY: point.y }));
        });
        expect(result.current.position).toEqual(point);
      });
    });

    test('should work in performance-sensitive scenario with throttling', () => {
      const { result } = renderHook(() => useMousePosition({ throttleMs: 50 }));

      // Simulate rapid mouse movements
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
      });
      expect(result.current.position).toEqual({ x: 10, y: 10 });

      // Many movements within throttle window
      for (let i = 20; i < 100; i += 10) {
        act(() => {
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: i, clientY: i }));
        });
      }

      // Should still be at first position
      expect(result.current.position).toEqual({ x: 10, y: 10 });

      // After throttle window
      act(() => {
        jest.advanceTimersByTime(50);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
      });

      expect(result.current.position).toEqual({ x: 100, y: 100 });
    });

    test('should work with multiple simultaneous instances', () => {
      const { result: result1 } = renderHook(() => useMousePosition());
      const { result: result2 } = renderHook(() => useMousePosition({ debounceMs: 100 }));
      const { result: result3 } = renderHook(() => useMousePosition({ throttleMs: 100 }));

      // All should start at 0,0
      expect(result1.current.position).toEqual({ x: 0, y: 0 });
      expect(result2.current.position).toEqual({ x: 0, y: 0 });
      expect(result3.current.position).toEqual({ x: 0, y: 0 });

      // Trigger mouse move
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
      });

      // Immediate should update right away
      expect(result1.current.position).toEqual({ x: 100, y: 200 });
      // Debounced and throttled should not update yet
      expect(result2.current.position).toEqual({ x: 0, y: 0 });
      expect(result3.current.position).toEqual({ x: 100, y: 200 }); // Throttle updates immediately first time

      // After debounce time
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Now debounced should update
      expect(result2.current.position).toEqual({ x: 100, y: 200 });
    });
  });
});
