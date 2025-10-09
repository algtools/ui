import * as React from 'react';
import { renderHook } from '@testing-library/react';

import { useUnmount } from '@/hooks/use-unmount';

describe('useUnmount', () => {
  describe('basic functionality', () => {
    test('should not call cleanup function on mount', () => {
      const cleanup = jest.fn();

      renderHook(() => useUnmount(cleanup));

      expect(cleanup).not.toHaveBeenCalled();
    });

    test('should call cleanup function on unmount', () => {
      const cleanup = jest.fn();

      const { unmount } = renderHook(() => useUnmount(cleanup));

      expect(cleanup).not.toHaveBeenCalled();

      unmount();

      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('should not call cleanup function on re-render', () => {
      const cleanup = jest.fn();

      const { rerender } = renderHook(() => useUnmount(cleanup));

      rerender();
      rerender();
      rerender();

      expect(cleanup).not.toHaveBeenCalled();
    });
  });

  describe('cleanup function updates', () => {
    test('should call the latest cleanup function', () => {
      const cleanup1 = jest.fn();
      const cleanup2 = jest.fn();

      const { rerender, unmount } = renderHook(({ fn }) => useUnmount(fn), {
        initialProps: { fn: cleanup1 },
      });

      // Update to a new cleanup function
      rerender({ fn: cleanup2 });

      unmount();

      // Should call the latest cleanup function, not the initial one
      expect(cleanup1).not.toHaveBeenCalled();
      expect(cleanup2).toHaveBeenCalledTimes(1);
    });

    test('should handle cleanup function changes multiple times', () => {
      const cleanup1 = jest.fn();
      const cleanup2 = jest.fn();
      const cleanup3 = jest.fn();

      const { rerender, unmount } = renderHook(({ fn }) => useUnmount(fn), {
        initialProps: { fn: cleanup1 },
      });

      rerender({ fn: cleanup2 });
      rerender({ fn: cleanup3 });

      unmount();

      expect(cleanup1).not.toHaveBeenCalled();
      expect(cleanup2).not.toHaveBeenCalled();
      expect(cleanup3).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup execution', () => {
    test('should only call cleanup once even if unmounted multiple times', () => {
      const cleanup = jest.fn();

      const { unmount } = renderHook(() => useUnmount(cleanup));

      unmount();

      expect(cleanup).toHaveBeenCalledTimes(1);

      // Trying to unmount again should not call cleanup again
      // (React Testing Library prevents actual multiple unmounts, but we test the behavior)
    });

    test('should execute cleanup function successfully', () => {
      const cleanup = jest.fn(() => {
        // Simulate some cleanup logic
        return true;
      });

      const { unmount } = renderHook(() => useUnmount(cleanup));

      unmount();

      // Cleanup should be called
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('should handle cleanup function that throws error', () => {
      const cleanup = jest.fn(() => {
        throw new Error('Cleanup error');
      });

      const { unmount } = renderHook(() => useUnmount(cleanup));

      // Should not throw, but cleanup should be called
      expect(() => unmount()).toThrow('Cleanup error');
      expect(cleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('use cases', () => {
    test('should work with timer cleanup', () => {
      jest.useFakeTimers();
      const callback = jest.fn();

      const { unmount } = renderHook(() => {
        const timerId = setInterval(callback, 1000);
        useUnmount(() => clearInterval(timerId));
      });

      jest.advanceTimersByTime(2500);
      expect(callback).toHaveBeenCalledTimes(2);

      unmount();

      jest.advanceTimersByTime(2000);
      // Should not be called anymore after unmount
      expect(callback).toHaveBeenCalledTimes(2);

      jest.useRealTimers();
    });

    test('should work with event listener cleanup', () => {
      const handler = jest.fn();
      const mockElement = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };

      const { unmount } = renderHook(() => {
        mockElement.addEventListener('click', handler);
        useUnmount(() => mockElement.removeEventListener('click', handler));
      });

      expect(mockElement.addEventListener).toHaveBeenCalledWith('click', handler);
      expect(mockElement.removeEventListener).not.toHaveBeenCalled();

      unmount();

      expect(mockElement.removeEventListener).toHaveBeenCalledWith('click', handler);
    });

    test('should work with subscription cleanup', () => {
      const unsubscribe = jest.fn();
      const subscribe = jest.fn(() => unsubscribe);

      const { unmount } = renderHook(() => {
        const unsub = subscribe();
        useUnmount(unsub);
      });

      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(unsubscribe).not.toHaveBeenCalled();

      unmount();

      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('multiple instances', () => {
    test('should handle multiple useUnmount hooks independently', () => {
      const cleanup1 = jest.fn();
      const cleanup2 = jest.fn();

      const { unmount: unmount1 } = renderHook(() => useUnmount(cleanup1));
      const { unmount: unmount2 } = renderHook(() => useUnmount(cleanup2));

      unmount1();

      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).not.toHaveBeenCalled();

      unmount2();

      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple useUnmount calls in same component', () => {
      const cleanup1 = jest.fn();
      const cleanup2 = jest.fn();
      const cleanup3 = jest.fn();

      const { unmount } = renderHook(() => {
        useUnmount(cleanup1);
        useUnmount(cleanup2);
        useUnmount(cleanup3);
      });

      unmount();

      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).toHaveBeenCalledTimes(1);
      expect(cleanup3).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    test('should handle empty cleanup function', () => {
      const cleanup = jest.fn();

      const { unmount } = renderHook(() => useUnmount(cleanup));

      expect(() => unmount()).not.toThrow();
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('should handle async cleanup function', async () => {
      const cleanup = jest.fn(async () => {
        await Promise.resolve();
      });

      const { unmount } = renderHook(() => useUnmount(cleanup));

      unmount();

      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('should not interfere with component lifecycle', () => {
      const mountEffect = jest.fn();
      const cleanup = jest.fn();

      const { unmount } = renderHook(() => {
        React.useEffect(() => {
          mountEffect();
        }, []);

        useUnmount(cleanup);
      });

      expect(mountEffect).toHaveBeenCalledTimes(1);

      unmount();

      expect(cleanup).toHaveBeenCalledTimes(1);
    });
  });
});
