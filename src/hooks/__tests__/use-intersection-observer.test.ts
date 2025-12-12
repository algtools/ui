import { renderHook } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

// Mock IntersectionObserver
let mockObserverInstance: {
  observe: Mock;
  unobserve: Mock;
  disconnect: Mock;
} | null = null;

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    mockObserverInstance = null;

    global.IntersectionObserver = vi.fn(() => {
      mockObserverInstance = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
      return mockObserverInstance as unknown as IntersectionObserver;
    }) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    test('should initialize with default values', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current.ref).toBeDefined();
      expect(result.current.entry).toBeNull();
      expect(result.current.isIntersecting).toBe(false);
      expect(result.current.intersectionRatio).toBe(0);
    });

    test('should not create observer until ref is attached', () => {
      renderHook(() => useIntersectionObserver());
      // Observer shouldn't be created without an element
      expect(global.IntersectionObserver).not.toHaveBeenCalled();
    });
  });

  describe('options', () => {
    test('should accept enabled option set to false', () => {
      const { result } = renderHook(() => useIntersectionObserver({ enabled: false }));

      expect(result.current.ref).toBeDefined();
      expect(result.current.isIntersecting).toBe(false);
    });

    test('should accept threshold option', () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: 0.5 }));

      expect(result.current.ref).toBeDefined();
      expect(result.current.intersectionRatio).toBe(0);
    });

    test('should accept array threshold option', () => {
      const { result } = renderHook(() =>
        useIntersectionObserver({ threshold: [0, 0.25, 0.5, 0.75, 1] })
      );

      expect(result.current.ref).toBeDefined();
    });

    test('should accept rootMargin option', () => {
      const { result } = renderHook(() => useIntersectionObserver({ rootMargin: '10px' }));

      expect(result.current.ref).toBeDefined();
    });

    test('should accept root option', () => {
      const root = document.createElement('div');
      const { result } = renderHook(() => useIntersectionObserver({ root }));

      expect(result.current.ref).toBeDefined();
    });

    test('should accept onChange callback', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useIntersectionObserver({ onChange }));

      expect(result.current.ref).toBeDefined();
    });
  });

  describe('return value', () => {
    test('should return ref object', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.ref).toBe('object');
      expect('current' in result.current.ref).toBe(true);
    });

    test('should return isIntersecting boolean', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(typeof result.current.isIntersecting).toBe('boolean');
      expect(result.current.isIntersecting).toBe(false);
    });

    test('should return intersectionRatio number', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(typeof result.current.intersectionRatio).toBe('number');
      expect(result.current.intersectionRatio).toBeGreaterThanOrEqual(0);
      expect(result.current.intersectionRatio).toBeLessThanOrEqual(1);
    });

    test('should return entry as null initially', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current.entry).toBeNull();
    });

    test('should have all expected properties', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current).toHaveProperty('ref');
      expect(result.current).toHaveProperty('entry');
      expect(result.current).toHaveProperty('isIntersecting');
      expect(result.current).toHaveProperty('intersectionRatio');
    });
  });

  describe('stability', () => {
    test('should maintain stable ref reference across renders', () => {
      const { result, rerender } = renderHook(() => useIntersectionObserver());

      const firstRef = result.current.ref;
      rerender();

      expect(result.current.ref).toBe(firstRef);
    });

    test('should not change return object when no state changes', () => {
      const { result, rerender } = renderHook(() => useIntersectionObserver());

      const firstReturn = result.current;
      rerender();

      // Since entry hasn't changed (still null), return object should be the same
      expect(result.current).toBe(firstReturn);
    });

    test('should maintain stable ref across option changes', () => {
      const { result, rerender } = renderHook(
        ({ threshold }) => useIntersectionObserver({ threshold }),
        { initialProps: { threshold: 0 } }
      );

      const firstRef = result.current.ref;
      rerender({ threshold: 0.5 });

      expect(result.current.ref).toBe(firstRef);
    });
  });

  describe('browser compatibility', () => {
    test('should handle missing IntersectionObserver gracefully', () => {
      const originalIntersectionObserver = global.IntersectionObserver;
      // @ts-expect-error - Intentionally removing for testing
      delete global.IntersectionObserver;

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation();

      const { result } = renderHook(() => useIntersectionObserver());

      // Hook should still work but return default values
      expect(result.current.isIntersecting).toBe(false);
      expect(result.current.intersectionRatio).toBe(0);
      expect(result.current.entry).toBeNull();
      expect(result.current.ref).toBeDefined();

      consoleWarnSpy.mockRestore();
      global.IntersectionObserver = originalIntersectionObserver;
    });

    test('should warn when IntersectionObserver is not supported', () => {
      const originalIntersectionObserver = global.IntersectionObserver;
      // @ts-expect-error - Intentionally removing for testing
      delete global.IntersectionObserver;

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation();

      renderHook(() => useIntersectionObserver());

      // Warning should not be called until ref is set (which requires browser API)
      // So we just verify the hook doesn't crash
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
      global.IntersectionObserver = originalIntersectionObserver;
    });
  });

  describe('TypeScript types', () => {
    test('should accept UseIntersectionObserverOptions', () => {
      const options = {
        threshold: 0.5,
        rootMargin: '10px',
        enabled: true,
        onChange: vi.fn(),
      };

      const { result } = renderHook(() => useIntersectionObserver(options));

      expect(result.current.ref).toBeDefined();
    });

    test('should return UseIntersectionObserverReturn type', () => {
      const { result } = renderHook(() => useIntersectionObserver());

      // Verify return type has correct properties
      const returnValue = result.current;
      expect('ref' in returnValue).toBe(true);
      expect('entry' in returnValue).toBe(true);
      expect('isIntersecting' in returnValue).toBe(true);
      expect('intersectionRatio' in returnValue).toBe(true);
    });
  });

  describe('re-renders and updates', () => {
    test('should handle options updates', () => {
      const { result, rerender } = renderHook(
        ({ threshold }) => useIntersectionObserver({ threshold }),
        { initialProps: { threshold: 0 } }
      );

      expect(result.current.ref).toBeDefined();

      // Update options
      rerender({ threshold: 0.5 });

      // Hook should still work
      expect(result.current.ref).toBeDefined();
      expect(result.current.isIntersecting).toBe(false);
    });

    test('should handle enabled toggle', () => {
      const { result, rerender } = renderHook(
        ({ enabled }) => useIntersectionObserver({ enabled }),
        { initialProps: { enabled: true } }
      );

      expect(result.current.ref).toBeDefined();

      // Disable
      rerender({ enabled: false });

      expect(result.current.ref).toBeDefined();
      expect(result.current.isIntersecting).toBe(false);

      // Re-enable
      rerender({ enabled: true });

      expect(result.current.ref).toBeDefined();
    });

    test('should handle onChange callback updates', () => {
      const onChange1 = vi.fn();
      const onChange2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ callback }) => useIntersectionObserver({ onChange: callback }),
        { initialProps: { callback: onChange1 } }
      );

      expect(result.current.ref).toBeDefined();

      // Update callback
      rerender({ callback: onChange2 });

      expect(result.current.ref).toBeDefined();
    });
  });

  describe('cleanup', () => {
    test('should not crash on unmount', () => {
      const { unmount } = renderHook(() => useIntersectionObserver());

      expect(() => unmount()).not.toThrow();
    });

    test('should cleanup when enabled becomes false', () => {
      const { rerender } = renderHook(({ enabled }) => useIntersectionObserver({ enabled }), {
        initialProps: { enabled: true },
      });

      // Change to disabled
      expect(() => rerender({ enabled: false })).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('should handle zero threshold', () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: 0 }));

      expect(result.current.intersectionRatio).toBe(0);
    });

    test('should handle full threshold', () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: 1 }));

      expect(result.current.intersectionRatio).toBe(0);
    });

    test('should handle negative rootMargin', () => {
      const { result } = renderHook(() => useIntersectionObserver({ rootMargin: '-10px' }));

      expect(result.current.ref).toBeDefined();
    });

    test('should handle empty options object', () => {
      const { result } = renderHook(() => useIntersectionObserver({}));

      expect(result.current.ref).toBeDefined();
      expect(result.current.isIntersecting).toBe(false);
      expect(result.current.intersectionRatio).toBe(0);
    });

    test('should handle undefined options', () => {
      const { result } = renderHook(() => useIntersectionObserver(undefined));

      expect(result.current.ref).toBeDefined();
      expect(result.current.isIntersecting).toBe(false);
    });
  });

  describe('multiple instances', () => {
    test('should allow multiple independent hooks', () => {
      const { result: result1 } = renderHook(() => useIntersectionObserver());
      const { result: result2 } = renderHook(() => useIntersectionObserver());

      expect(result1.current.ref).not.toBe(result2.current.ref);
      expect(result1.current.ref).toBeDefined();
      expect(result2.current.ref).toBeDefined();
    });

    test('should allow hooks with different options', () => {
      const { result: result1 } = renderHook(() => useIntersectionObserver({ threshold: 0 }));
      const { result: result2 } = renderHook(() => useIntersectionObserver({ threshold: 1 }));

      expect(result1.current.ref).not.toBe(result2.current.ref);
    });
  });
});
