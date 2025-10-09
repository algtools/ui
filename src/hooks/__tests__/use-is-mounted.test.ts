import { renderHook } from '@testing-library/react';

import { useIsMounted } from '@/hooks/use-is-mounted';

describe('useIsMounted', () => {
  describe('initialization', () => {
    test('should return a function', () => {
      const { result } = renderHook(() => useIsMounted());
      expect(typeof result.current).toBe('function');
    });

    test('should return true when mounted', async () => {
      const { result, rerender } = renderHook(() => useIsMounted());

      // In test environment, effect runs synchronously
      rerender();

      expect(result.current()).toBe(true);
    });
  });

  describe('mount state tracking', () => {
    test('should return true when component is mounted', () => {
      const { result, rerender } = renderHook(() => useIsMounted());

      rerender();

      expect(result.current()).toBe(true);
    });

    test('should maintain true state across multiple checks', () => {
      const { result, rerender } = renderHook(() => useIsMounted());

      rerender();

      expect(result.current()).toBe(true);
      expect(result.current()).toBe(true);
      expect(result.current()).toBe(true);
    });

    test('should return false after unmount', () => {
      const { result, unmount, rerender } = renderHook(() => useIsMounted());

      rerender();
      expect(result.current()).toBe(true);

      unmount();

      expect(result.current()).toBe(false);
    });
  });

  describe('function reference stability', () => {
    test('should return the same function reference across renders', () => {
      const { result, rerender } = renderHook(() => useIsMounted());

      const firstIsMounted = result.current;

      rerender();

      expect(result.current).toBe(firstIsMounted);
    });

    test('should maintain same reference even when mount state changes', () => {
      const { result, rerender, unmount } = renderHook(() => useIsMounted());

      const firstIsMounted = result.current;

      rerender();
      const secondIsMounted = result.current;

      unmount();
      const thirdIsMounted = result.current;

      expect(firstIsMounted).toBe(secondIsMounted);
      expect(secondIsMounted).toBe(thirdIsMounted);
    });
  });

  describe('use cases', () => {
    test('should help prevent state updates on unmounted components', () => {
      const { result, unmount, rerender } = renderHook(() => useIsMounted());

      rerender();

      // Simulate async operation
      const shouldUpdate = result.current();
      expect(shouldUpdate).toBe(true);

      unmount();

      // After unmount, should return false to prevent updates
      const shouldNotUpdate = result.current();
      expect(shouldNotUpdate).toBe(false);
    });

    test('should work with conditional rendering logic', () => {
      const { result, rerender, unmount } = renderHook(() => {
        const isMounted = useIsMounted();
        return { isMounted, canRender: isMounted() };
      });

      // After mount
      rerender();
      expect(result.current.canRender).toBe(true);

      rerender();

      // Still mounted
      expect(result.current.canRender).toBe(true);

      // Store the isMounted function before unmounting
      const isMountedFunc = result.current.isMounted;

      unmount();

      // After unmount, calling the stored function should return false
      expect(isMountedFunc()).toBe(false);
    });
  });

  describe('multiple instances', () => {
    test('should work independently for multiple hook instances', () => {
      const { result: result1, rerender: rerender1 } = renderHook(() => useIsMounted());
      const {
        result: result2,
        rerender: rerender2,
        unmount: unmount2,
      } = renderHook(() => useIsMounted());

      rerender1();
      rerender2();

      expect(result1.current()).toBe(true);
      expect(result2.current()).toBe(true);

      unmount2();

      // First instance should still be mounted
      expect(result1.current()).toBe(true);
      // Second instance should be unmounted
      expect(result2.current()).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle rapid mount/unmount cycles', () => {
      const { result, unmount, rerender } = renderHook(() => useIsMounted());

      rerender();
      expect(result.current()).toBe(true);

      unmount();
      expect(result.current()).toBe(false);
    });

    test('should return a function', () => {
      const { result } = renderHook(() => useIsMounted());

      expect(typeof result.current).toBe('function');
    });

    test('should return boolean when called', () => {
      const { result } = renderHook(() => useIsMounted());

      const returnValue = result.current();
      expect(typeof returnValue).toBe('boolean');
    });
  });
});
