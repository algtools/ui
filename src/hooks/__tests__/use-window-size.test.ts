import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';

import { useWindowSize, UseWindowSizeOptions } from '@/hooks/use-window-size';

// Mock timers for debouncing tests
vi.useFakeTimers();

describe('useWindowSize', () => {
  // Store original window dimensions
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('returns initial window dimensions', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  test('returns custom initial size for SSR', () => {
    const options: UseWindowSizeOptions = {
      initialSize: { width: 1920, height: 1080 },
    };

    const { result } = renderHook(() => useWindowSize(options));

    // Should use actual window size if available, not initial size
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  test('updates dimensions on window resize with debounce', async () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    // Change window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Should not update immediately (debounced)
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    // Fast-forward time by default debounce delay (150ms)
    act(() => {
      vi.advanceTimersByTime(150);
    });

    // Now it should be updated (after advancing timers, state updates immediately)
    expect(result.current.width).toBe(1920);
    expect(result.current.height).toBe(1080);
  });

  test('respects custom debounce delay', async () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 300 }));

    expect(result.current.width).toBe(1024);

    // Change window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Should not update after default 150ms
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current.width).toBe(1024);

    // Should update after custom 300ms
    act(() => {
      vi.advanceTimersByTime(150); // Total 300ms
    });

    expect(result.current.width).toBe(800);
  });

  test('debounces multiple rapid resize events', async () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 100 }));

    expect(result.current.width).toBe(1024);

    // Simulate multiple rapid resizes
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));

      vi.advanceTimersByTime(50);

      Object.defineProperty(window, 'innerWidth', { writable: true, value: 900 });
      window.dispatchEvent(new Event('resize'));

      vi.advanceTimersByTime(50);

      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1000 });
      window.dispatchEvent(new Event('resize'));
    });

    // Should still be original size (debouncing)
    expect(result.current.width).toBe(1024);

    // Fast-forward remaining time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should only update to the last value
    expect(result.current.width).toBe(1000);
  });

  test('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowSize());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  test('clears timeout on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize());

    // Trigger a resize event
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
    });

    // Unmount before debounce completes
    unmount();

    // The timeout should be cleared, so advancing timers shouldn't cause updates
    act(() => {
      vi.advanceTimersByTime(150);
    });

    // No error should occur
  });

  test('handles multiple resize events and cancels pending timeouts', async () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 200 }));

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(100);
    });

    // Trigger another resize before first completes
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 900 });
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(100);
    });

    // Still original value
    expect(result.current.width).toBe(1024);

    // Complete the debounce for second resize
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.width).toBe(900);
  });

  test('updates debounce delay when option changes', async () => {
    const { result, rerender } = renderHook<ReturnType<typeof useWindowSize>, UseWindowSizeOptions>(
      (props) => useWindowSize(props),
      {
        initialProps: { debounceMs: 100 },
      }
    );

    // First resize with 100ms debounce
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(100);
    });

    expect(result.current.width).toBe(800);

    // Change debounce delay
    rerender({ debounceMs: 300 });

    // Second resize with 300ms debounce
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 600 });
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(100);
    });

    // Should not update yet
    expect(result.current.width).toBe(800);

    act(() => {
      vi.advanceTimersByTime(200); // Total 300ms
    });

    expect(result.current.width).toBe(600);
  });

  test('works with zero debounce delay', async () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 0 }));

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(0);
    });

    expect(result.current.width).toBe(800);
  });

  test('returns WindowSize object with correct shape', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toHaveProperty('width');
    expect(result.current).toHaveProperty('height');
    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });
});
