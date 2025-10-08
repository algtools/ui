import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { useHover } from '@/hooks/use-hover';

describe('useHover', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    // Setup DOM element for testing
    element = document.createElement('div');
    document.body.appendChild(element);
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup DOM element
    document.body.removeChild(element);
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('basic hover detection', () => {
    test('should initialize with false', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref));

      expect(result.current).toBe(false);
    });

    test('should return true when mouse enters element', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref));

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });

      expect(result.current).toBe(true);
    });

    test('should return false when mouse leaves element', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref));

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(false);
    });

    test('should handle multiple hover cycles', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref));

      // First hover
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      // Second hover
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(false);
    });

    test('should handle null ref gracefully', () => {
      const ref = { current: null } as unknown as React.RefObject<HTMLDivElement>;
      const { result } = renderHook(() => useHover(ref));

      expect(result.current).toBe(false);
    });

    test('should handle undefined ref gracefully', () => {
      const ref = { current: undefined } as unknown as React.RefObject<HTMLDivElement>;
      const { result } = renderHook(() => useHover(ref));

      expect(result.current).toBe(false);
    });
  });

  describe('delay options', () => {
    describe('delayEnter', () => {
      test('should delay hover state becoming true', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayEnter: 200 }));

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        // Should not be hovered immediately
        expect(result.current).toBe(false);

        // Fast-forward time by 199ms - still not hovered
        act(() => {
          jest.advanceTimersByTime(199);
        });
        expect(result.current).toBe(false);

        // Fast-forward time by 1ms more - now hovered
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(result.current).toBe(true);
      });

      test('should cancel delayed enter on quick mouse leave', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayEnter: 200 }));

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        // Fast-forward time by 100ms
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(result.current).toBe(false);

        // Mouse leaves before delay completes
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        // Fast-forward past the original delay
        act(() => {
          jest.advanceTimersByTime(150);
        });

        // Should still be false since enter was cancelled
        expect(result.current).toBe(false);
      });

      test('should work with zero delay (default)', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayEnter: 0 }));

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        // Should be hovered immediately
        expect(result.current).toBe(true);
      });
    });

    describe('delayLeave', () => {
      test('should delay hover state becoming false', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayLeave: 200 }));

        // Enter hover state
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        // Leave hover
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        // Should still be hovered immediately after leave
        expect(result.current).toBe(true);

        // Fast-forward time by 199ms - still hovered
        act(() => {
          jest.advanceTimersByTime(199);
        });
        expect(result.current).toBe(true);

        // Fast-forward time by 1ms more - now not hovered
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(result.current).toBe(false);
      });

      test('should cancel delayed leave on quick mouse enter', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayLeave: 200 }));

        // Enter hover state
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        // Leave hover
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        // Fast-forward time by 100ms
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(result.current).toBe(true);

        // Mouse enters again before delay completes
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        // Fast-forward past the original delay
        act(() => {
          jest.advanceTimersByTime(150);
        });

        // Should still be true since leave was cancelled
        expect(result.current).toBe(true);
      });

      test('should work with zero delay (default)', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayLeave: 0 }));

        // Enter hover state
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        // Leave hover
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        // Should not be hovered immediately
        expect(result.current).toBe(false);
      });
    });

    describe('both delays', () => {
      test('should work with both delayEnter and delayLeave', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayEnter: 100, delayLeave: 200 }));

        // Mouse enters
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(false);

        // Fast-forward enter delay
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(result.current).toBe(true);

        // Mouse leaves
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        // Fast-forward leave delay
        act(() => {
          jest.advanceTimersByTime(200);
        });
        expect(result.current).toBe(false);
      });

      test('should handle rapid enter/leave with both delays', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, { delayEnter: 100, delayLeave: 100 }));

        // Rapid enter
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        // Quick leave before enter completes
        act(() => {
          jest.advanceTimersByTime(50);
        });
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        // Fast-forward past both delays
        act(() => {
          jest.advanceTimersByTime(200);
        });

        // Should be false since we never fully entered
        expect(result.current).toBe(false);
      });
    });

    describe('default options', () => {
      test('should work without options parameter', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref));

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });
        expect(result.current).toBe(false);
      });

      test('should work with empty options object', () => {
        const ref = { current: element };
        const { result } = renderHook(() => useHover(ref, {}));

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        expect(result.current).toBe(true);

        act(() => {
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });
        expect(result.current).toBe(false);
      });
    });
  });

  describe('cleanup', () => {
    test('should remove event listeners on unmount', () => {
      const ref = { current: element };
      const removeEventListenerSpy = jest.spyOn(element, 'removeEventListener');

      const { unmount } = renderHook(() => useHover(ref));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    test('should clear pending timeouts on unmount', () => {
      const ref = { current: element };
      const { result, unmount } = renderHook(() => useHover(ref, { delayEnter: 500 }));

      // Start hover with delay
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });

      expect(result.current).toBe(false);

      // Unmount before delay completes
      unmount();

      // Fast-forward past the delay
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should still be false since unmount cleared the timeout
      expect(result.current).toBe(false);
    });

    test('should not cause memory leaks with multiple mount/unmount cycles', () => {
      const ref = { current: element };

      // Mount and unmount multiple times
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() => useHover(ref, { delayEnter: 100 }));
        act(() => {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        unmount();
      }

      // No assertions needed - test passes if no errors or memory issues
      expect(true).toBe(true);
    });

    test('should handle ref changing to null', () => {
      const ref: { current: HTMLDivElement | null } = { current: element };
      const { rerender } = renderHook(({ currentRef }) => useHover(currentRef), {
        initialProps: { currentRef: ref as React.RefObject<HTMLDivElement> },
      });

      // Change ref to null
      ref.current = null;
      rerender({ currentRef: ref as React.RefObject<HTMLDivElement> });

      // Should not throw errors
      expect(true).toBe(true);
    });
  });

  describe('ref updates', () => {
    test('should handle element updates correctly', () => {
      const element1 = document.createElement('div');
      document.body.appendChild(element1);

      const ref = { current: element1 };
      const { result } = renderHook(() => useHover(ref));

      // Hover element
      act(() => {
        element1.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      // Leave element
      act(() => {
        element1.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      // Hover again to ensure listeners are still working
      act(() => {
        element1.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      document.body.removeChild(element1);
    });
  });

  describe('options updates', () => {
    test('should update behavior when delayEnter changes', () => {
      const ref = { current: element };
      const { result, rerender } = renderHook(({ delay }) => useHover(ref, { delayEnter: delay }), {
        initialProps: { delay: 100 },
      });

      // Test with initial delay
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(true);

      // Reset
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });

      // Update delay
      rerender({ delay: 200 });

      // Test with new delay
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(true);
    });

    test('should update behavior when delayLeave changes', () => {
      const ref = { current: element };
      const { result, rerender } = renderHook(({ delay }) => useHover(ref, { delayLeave: delay }), {
        initialProps: { delay: 100 },
      });

      // Enter hover
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      // Test with initial delay
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(false);

      // Enter hover again
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      // Update delay
      rerender({ delay: 200 });

      // Test with new delay
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(true);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(true);

      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle very large delays', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref, { delayEnter: 10000 }));

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(9999);
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(result.current).toBe(true);
    });

    test('should handle negative delay values as zero', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref, { delayEnter: -100 }));

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });

      // Negative delay should behave as zero
      expect(result.current).toBe(true);
    });

    test('should handle fractional delay values', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref, { delayEnter: 150.5 }));

      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result.current).toBe(false);

      act(() => {
        jest.advanceTimersByTime(151);
      });
      expect(result.current).toBe(true);
    });
  });

  describe('integration', () => {
    test('should work correctly in tooltip-like scenario', () => {
      const ref = { current: element };
      const { result } = renderHook(() => useHover(ref, { delayEnter: 500, delayLeave: 200 }));

      // Quick hover shouldn't show tooltip
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(result.current).toBe(false);

      // Long hover should show tooltip
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(result.current).toBe(true);

      // Quick leave should keep tooltip visible
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result.current).toBe(true);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(true);

      // Re-entering should keep it visible
      act(() => {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current).toBe(true);
    });

    test('should work with multiple simultaneous hover hooks', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      const ref1 = { current: element1 };
      const ref2 = { current: element2 };

      const { result: result1 } = renderHook(() => useHover(ref1));
      const { result: result2 } = renderHook(() => useHover(ref2));

      expect(result1.current).toBe(false);
      expect(result2.current).toBe(false);

      // Hover first element
      act(() => {
        element1.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result1.current).toBe(true);
      expect(result2.current).toBe(false);

      // Hover second element
      act(() => {
        element2.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);

      // Leave first element
      act(() => {
        element1.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      expect(result1.current).toBe(false);
      expect(result2.current).toBe(true);

      document.body.removeChild(element1);
      document.body.removeChild(element2);
    });
  });
});
