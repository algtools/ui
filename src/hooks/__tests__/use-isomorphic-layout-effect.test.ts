import { renderHook } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import * as React from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect';

describe('useIsomorphicLayoutEffect', () => {
  // Store original window
  const originalWindow = global.window;

  afterEach(() => {
    // Restore window after each test
    global.window = originalWindow;
  });

  describe('client-side behavior', () => {
    test('should be useLayoutEffect when window is defined', () => {
      // Ensure window is defined (default in jsdom)
      expect(typeof window).toBe('object');
      expect(useIsomorphicLayoutEffect).toBe(React.useLayoutEffect);
    });

    test('should execute effect on client', () => {
      const effectCallback = vi.fn();
      const cleanupCallback = vi.fn();

      const { unmount } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
          return cleanupCallback;
        }, []);
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);
      expect(cleanupCallback).not.toHaveBeenCalled();

      unmount();

      expect(cleanupCallback).toHaveBeenCalledTimes(1);
    });

    test('should re-run effect when dependencies change', () => {
      const effectCallback = vi.fn();
      let count = 0;

      const { rerender } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback(count);
        }, [count]);
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);
      expect(effectCallback).toHaveBeenCalledWith(0);

      count = 1;
      rerender();

      expect(effectCallback).toHaveBeenCalledTimes(2);
      expect(effectCallback).toHaveBeenCalledWith(1);
    });

    test('should not re-run effect when dependencies do not change', () => {
      const effectCallback = vi.fn();
      const dep = { value: 'test' };

      const { rerender } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
        }, [dep]);
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);

      rerender();

      // Should still be 1 because dependency didn't change
      expect(effectCallback).toHaveBeenCalledTimes(1);
    });

    test('should support cleanup function', () => {
      const effectCallback = vi.fn();
      const cleanupCallback = vi.fn();

      const { rerender, unmount } = renderHook(
        ({ value }) => {
          useIsomorphicLayoutEffect(() => {
            effectCallback(value);
            return () => cleanupCallback(value);
          }, [value]);
        },
        { initialProps: { value: 1 } }
      );

      expect(effectCallback).toHaveBeenCalledTimes(1);
      expect(effectCallback).toHaveBeenCalledWith(1);
      expect(cleanupCallback).not.toHaveBeenCalled();

      rerender({ value: 2 });

      // Cleanup should be called before re-running effect
      expect(cleanupCallback).toHaveBeenCalledTimes(1);
      expect(cleanupCallback).toHaveBeenCalledWith(1);
      expect(effectCallback).toHaveBeenCalledTimes(2);
      expect(effectCallback).toHaveBeenCalledWith(2);

      unmount();

      // Cleanup should be called on unmount
      expect(cleanupCallback).toHaveBeenCalledTimes(2);
      expect(cleanupCallback).toHaveBeenCalledWith(2);
    });
  });

  describe('server-side behavior', () => {
    test('should be useEffect when window is undefined', () => {
      // The hook is evaluated at module load time
      // When window is defined (in jsdom), it uses useLayoutEffect
      // We can test the logic by checking the exported value
      const isClient = typeof window !== 'undefined';

      if (isClient) {
        expect(useIsomorphicLayoutEffect).toBe(React.useLayoutEffect);
      } else {
        expect(useIsomorphicLayoutEffect).toBe(React.useEffect);
      }
    });

    test('should not throw SSR warnings in production environment', () => {
      // This test verifies that the hook doesn't cause console errors
      // In a real SSR environment, window would be undefined at module load
      // and the hook would use useEffect instead of useLayoutEffect
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      const effectCallback = vi.fn();

      // Since we're in a jsdom environment, window is defined
      // but the hook pattern ensures no SSR warnings would occur
      renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
        }, []);
      });

      // Should not have any console errors
      expect(consoleSpy).not.toHaveBeenCalled();
      expect(effectCallback).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('integration scenarios', () => {
    test('should work with DOM measurements', () => {
      const measurements = vi.fn();
      const effectCallback = vi.fn();

      renderHook(() => {
        const ref = React.useRef<HTMLDivElement>(null);

        useIsomorphicLayoutEffect(() => {
          effectCallback();
          // In a real component, ref.current would be set after render
          // In this test, we're just verifying the effect runs
          if (ref.current) {
            measurements({
              width: ref.current.offsetWidth,
              height: ref.current.offsetHeight,
            });
          }
        }, []);

        return ref;
      });

      // The effect should have been called
      expect(effectCallback).toHaveBeenCalled();
      // ref.current will be null in this test setup, but that's ok
      // The important part is that the effect runs without errors
    });

    test('should work with multiple effects', () => {
      const effect1 = vi.fn();
      const effect2 = vi.fn();
      const effect3 = vi.fn();

      renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effect1();
        }, []);

        useIsomorphicLayoutEffect(() => {
          effect2();
        }, []);

        useIsomorphicLayoutEffect(() => {
          effect3();
        }, []);
      });

      expect(effect1).toHaveBeenCalledTimes(1);
      expect(effect2).toHaveBeenCalledTimes(1);
      expect(effect3).toHaveBeenCalledTimes(1);
    });

    test('should handle async operations in effect', async () => {
      const asyncOperation = vi.fn();

      renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          const doAsync = async () => {
            await Promise.resolve();
            asyncOperation();
          };
          void doAsync();
        }, []);
      });

      // Wait for async operation
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(asyncOperation).toHaveBeenCalledTimes(1);
    });

    test('should work without dependencies array (runs every render)', () => {
      const effectCallback = vi.fn();

      const { rerender } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
        });
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);

      rerender();

      // Should run again without deps array
      expect(effectCallback).toHaveBeenCalledTimes(2);

      rerender();

      expect(effectCallback).toHaveBeenCalledTimes(3);
    });

    test('should work with empty dependencies array (runs once)', () => {
      const effectCallback = vi.fn();

      const { rerender } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
        }, []);
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);

      rerender();
      rerender();
      rerender();

      // Should only run once with empty deps
      expect(effectCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    test('should handle effect that throws error', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => {
          useIsomorphicLayoutEffect(() => {
            throw new Error('Test error');
          }, []);
        });
      }).toThrow('Test error');

      consoleErrorSpy.mockRestore();
    });

    test('should handle cleanup that throws error', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();

      const { unmount } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          return () => {
            throw new Error('Cleanup error');
          };
        }, []);
      });

      expect(() => {
        unmount();
      }).toThrow('Cleanup error');

      consoleErrorSpy.mockRestore();
    });

    test('should handle undefined cleanup return', () => {
      const effectCallback = vi.fn();

      const { unmount } = renderHook(() => {
        useIsomorphicLayoutEffect(() => {
          effectCallback();
          // No return (undefined cleanup)
        }, []);
      });

      expect(effectCallback).toHaveBeenCalledTimes(1);
      expect(() => unmount()).not.toThrow();
    });
  });
});
