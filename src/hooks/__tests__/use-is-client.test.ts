import * as React from 'react';
import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useIsClient } from '@/hooks/use-is-client';

describe('useIsClient', () => {
  describe('initialization', () => {
    test('should return boolean value', () => {
      const { result } = renderHook(() => useIsClient());

      expect(typeof result.current).toBe('boolean');
    });

    test('should become true after effect runs', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      // In testing environment, useEffect runs synchronously, so it's already true
      expect(result.current).toBe(true);

      rerender();

      expect(result.current).toBe(true);
    });
  });

  describe('client detection', () => {
    test('should detect client-side environment', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      // In testing environment (client-like), should be true after mount
      expect(result.current).toBe(true);

      rerender();

      expect(result.current).toBe(true);
    });

    test('should remain true once set to true', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      rerender();
      expect(result.current).toBe(true);

      rerender();
      expect(result.current).toBe(true);

      rerender();
      expect(result.current).toBe(true);
    });

    test('should stay true across multiple re-renders', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      rerender();

      const values: boolean[] = [];
      for (let i = 0; i < 5; i++) {
        values.push(result.current);
        rerender();
      }

      expect(values).toEqual([true, true, true, true, true]);
    });
  });

  describe('SSR safety', () => {
    test('should work in client environment', () => {
      const { result } = renderHook(() => useIsClient());

      // In test environment (which is client-like), should be true
      expect(result.current).toBe(true);
    });

    test('should handle conditional rendering based on client state', () => {
      const { result, rerender } = renderHook(() => {
        const isClient = useIsClient();
        return {
          isClient,
          canAccessWindow: isClient && typeof window !== 'undefined',
        };
      });

      // In test environment
      expect(result.current.isClient).toBe(true);
      expect(result.current.canAccessWindow).toBe(true);

      // After rerender
      rerender();

      expect(result.current.isClient).toBe(true);
      expect(result.current.canAccessWindow).toBe(true);
    });
  });

  describe('use cases', () => {
    test('should work for conditional browser API access', () => {
      const { result, rerender } = renderHook(() => {
        const isClient = useIsClient();
        return {
          isClient,
          windowWidth: isClient ? window.innerWidth : 0,
        };
      });

      // In client environment
      expect(result.current.isClient).toBe(true);
      expect(result.current.windowWidth).toBeGreaterThan(0);

      rerender();

      expect(result.current.windowWidth).toBeGreaterThan(0);
    });

    test('should work for localStorage access', () => {
      const { result, rerender } = renderHook(() => {
        const isClient = useIsClient();
        return {
          isClient,
          canUseLocalStorage: isClient && typeof localStorage !== 'undefined',
        };
      });

      expect(result.current.canUseLocalStorage).toBe(true);

      rerender();

      expect(result.current.canUseLocalStorage).toBe(true);
    });

    test('should work for document access', () => {
      const { result, rerender } = renderHook(() => {
        const isClient = useIsClient();
        return {
          isClient,
          documentTitle: isClient ? document.title : 'SSR',
        };
      });

      expect(result.current.isClient).toBe(true);
      expect(result.current.documentTitle).toBe(document.title);

      rerender();

      expect(result.current.documentTitle).toBe(document.title);
    });
  });

  describe('multiple instances', () => {
    test('should work independently for multiple components', () => {
      const { result: result1, rerender: rerender1 } = renderHook(() => useIsClient());
      const { result: result2, rerender: rerender2 } = renderHook(() => useIsClient());

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);

      rerender1();

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);

      rerender2();

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);
    });

    test('should synchronize state across instances after mount', () => {
      const { result: result1, rerender: rerender1 } = renderHook(() => useIsClient());
      const { result: result2, rerender: rerender2 } = renderHook(() => useIsClient());

      rerender1();
      rerender2();

      expect(result1.current).toBe(result2.current);
      expect(result1.current).toBe(true);
    });
  });

  describe('lifecycle behavior', () => {
    test('should not change after unmount and remount', () => {
      const { result, unmount, rerender } = renderHook(() => useIsClient());

      rerender();
      expect(result.current).toBe(true);

      const valueBeforeUnmount = result.current;

      unmount();

      // After unmount, the value should still be accessible (though component is gone)
      expect(result.current).toBe(valueBeforeUnmount);
    });

    test('should work correctly in new instance', () => {
      const { result: result1, rerender: rerender1 } = renderHook(() => useIsClient());

      rerender1();
      expect(result1.current).toBe(true);

      // New instance should also detect client environment
      const { result: result2 } = renderHook(() => useIsClient());
      expect(result2.current).toBe(true);
    });
  });

  describe('edge cases', () => {
    test('should return boolean type', () => {
      const { result } = renderHook(() => useIsClient());

      expect(typeof result.current).toBe('boolean');
    });

    test('should handle rapid re-renders', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      expect(result.current).toBe(true);

      // Rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender();
      }

      expect(result.current).toBe(true);
    });

    test('should be consistent across renders after becoming true', () => {
      const { result, rerender } = renderHook(() => useIsClient());

      rerender();

      const values = new Set();
      for (let i = 0; i < 100; i++) {
        values.add(result.current);
        rerender();
      }

      // Should only have one value: true
      expect(values.size).toBe(1);
      expect(values.has(true)).toBe(true);
    });
  });

  describe('integration with React effects', () => {
    test('should work correctly with useEffect dependencies', () => {
      const effectCallback = vi.fn();

      const { rerender } = renderHook(() => {
        const isClient = useIsClient();

        React.useEffect(() => {
          effectCallback(isClient);
        }, [isClient]);

        return isClient;
      });

      // In test environment with React 18 strict mode, effect may run twice
      expect(effectCallback).toHaveBeenCalledWith(true);
      expect(effectCallback.mock.calls.length).toBeGreaterThanOrEqual(1);

      const initialCallCount = effectCallback.mock.calls.length;

      rerender();

      // Should not re-run since value hasn't changed
      expect(effectCallback.mock.calls.length).toBe(initialCallCount);
    });

    test('should trigger effects correctly in client environment', () => {
      const mountEffect = vi.fn();
      const clientEffect = vi.fn();

      const { rerender } = renderHook(() => {
        const isClient = useIsClient();

        React.useEffect(() => {
          mountEffect();

          if (isClient) {
            clientEffect();
          }
        }, [isClient]);

        return isClient;
      });

      // In test environment with React 18 strict mode, effects may run twice
      expect(mountEffect.mock.calls.length).toBeGreaterThanOrEqual(1);
      expect(clientEffect.mock.calls.length).toBeGreaterThanOrEqual(1);
      expect(mountEffect).toHaveBeenCalled();
      expect(clientEffect).toHaveBeenCalled();

      const initialMountCount = mountEffect.mock.calls.length;
      const initialClientCount = clientEffect.mock.calls.length;

      rerender();

      // Should not re-run since isClient hasn't changed
      expect(mountEffect.mock.calls.length).toBe(initialMountCount);
      expect(clientEffect.mock.calls.length).toBe(initialClientCount);
    });
  });
});
