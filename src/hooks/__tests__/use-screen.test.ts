import { renderHook, act, waitFor } from '@testing-library/react';

import { useScreen, UseScreenOptions } from '@/hooks/use-screen';

describe('useScreen', () => {
  // Store original screen and window properties
  const originalScreen = window.screen;
  const originalDevicePixelRatio = window.devicePixelRatio;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    // Mock screen object
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1920,
        height: 1080,
        availWidth: 1920,
        availHeight: 1040, // Simulate taskbar
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    // Mock devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 1,
    });

    // Mock touch support
    Object.defineProperty(window, 'ontouchstart', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    // Restore original properties
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: originalScreen,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: originalDevicePixelRatio,
    });
    Object.defineProperty(window, 'navigator', {
      writable: true,
      configurable: true,
      value: originalNavigator,
    });
  });

  test('returns initial screen information', () => {
    const { result } = renderHook(() => useScreen());

    expect(result.current.width).toBe(1920);
    expect(result.current.height).toBe(1080);
    expect(result.current.availWidth).toBe(1920);
    expect(result.current.availHeight).toBe(1040);
    expect(result.current.colorDepth).toBe(24);
    expect(result.current.pixelDepth).toBe(24);
    expect(result.current.pixelRatio).toBe(1);
  });

  test('detects landscape orientation', () => {
    const { result } = renderHook(() => useScreen());

    expect(result.current.orientation).toBe('landscape');
    expect(result.current.isLandscape).toBe(true);
    expect(result.current.isPortrait).toBe(false);
  });

  test('detects portrait orientation', () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 768,
        height: 1024,
        availWidth: 768,
        availHeight: 1000,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.orientation).toBe('portrait');
    expect(result.current.isPortrait).toBe(true);
    expect(result.current.isLandscape).toBe(false);
  });

  test('detects square orientation', () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1000,
        height: 1000,
        availWidth: 1000,
        availHeight: 980,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.orientation).toBe('square');
    expect(result.current.isPortrait).toBe(false);
    expect(result.current.isLandscape).toBe(false);
  });

  test('detects high DPI screens', () => {
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 2,
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.pixelRatio).toBe(2);
  });

  test('handles very high DPI screens (3x)', () => {
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 3,
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.pixelRatio).toBe(3);
  });

  test('detects touch support via ontouchstart', () => {
    Object.defineProperty(window, 'ontouchstart', {
      writable: true,
      configurable: true,
      value: null, // Presence of property indicates touch support
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.isTouch).toBe(true);
  });

  test('detects touch support via maxTouchPoints', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 5,
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.isTouch).toBe(true);
  });

  test('detects non-touch devices', () => {
    // Ensure touch properties are properly mocked as non-touch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(navigator, 'msMaxTouchPoints', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.isTouch).toBe(false);
  });

  test('updates on orientation change', async () => {
    const { result } = renderHook(() => useScreen());

    expect(result.current.orientation).toBe('landscape');

    // Simulate orientation change to portrait
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 768,
        height: 1024,
        availWidth: 768,
        availHeight: 1000,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    act(() => {
      window.dispatchEvent(new Event('orientationchange'));
    });

    await waitFor(() => {
      expect(result.current.orientation).toBe('portrait');
      expect(result.current.isPortrait).toBe(true);
    });
  });

  test('updates on resize event as fallback', async () => {
    const { result } = renderHook(() => useScreen());

    expect(result.current.width).toBe(1920);

    // Simulate screen size change via resize event
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1280,
        height: 720,
        availWidth: 1280,
        availHeight: 700,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(result.current.width).toBe(1280);
      expect(result.current.height).toBe(720);
    });
  });

  test('does not listen for changes when listenForChanges is false', async () => {
    const options: UseScreenOptions = { listenForChanges: false };
    const { result } = renderHook(() => useScreen(options));

    const initialWidth = result.current.width;

    // Simulate orientation change
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 768,
        height: 1024,
        availWidth: 768,
        availHeight: 1000,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    act(() => {
      window.dispatchEvent(new Event('orientationchange'));
    });

    // Should not update
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(result.current.width).toBe(initialWidth);
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScreen());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  test('does not add listeners when listenForChanges is false', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    renderHook(() => useScreen({ listenForChanges: false }));

    // Should only be called for initial setup, not for change listening
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('orientationchange', expect.any(Function));
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('resize', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  test('returns ScreenInfo object with correct shape', () => {
    const { result } = renderHook(() => useScreen());

    expect(result.current).toHaveProperty('width');
    expect(result.current).toHaveProperty('height');
    expect(result.current).toHaveProperty('availWidth');
    expect(result.current).toHaveProperty('availHeight');
    expect(result.current).toHaveProperty('colorDepth');
    expect(result.current).toHaveProperty('pixelDepth');
    expect(result.current).toHaveProperty('pixelRatio');
    expect(result.current).toHaveProperty('orientation');
    expect(result.current).toHaveProperty('isPortrait');
    expect(result.current).toHaveProperty('isLandscape');
    expect(result.current).toHaveProperty('isTouch');

    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
    expect(typeof result.current.availWidth).toBe('number');
    expect(typeof result.current.availHeight).toBe('number');
    expect(typeof result.current.colorDepth).toBe('number');
    expect(typeof result.current.pixelDepth).toBe('number');
    expect(typeof result.current.pixelRatio).toBe('number');
    expect(typeof result.current.orientation).toBe('string');
    expect(typeof result.current.isPortrait).toBe('boolean');
    expect(typeof result.current.isLandscape).toBe('boolean');
    expect(typeof result.current.isTouch).toBe('boolean');
  });

  test('handles missing devicePixelRatio gracefully', () => {
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.pixelRatio).toBe(1); // Default fallback
  });

  test('handles different color depths', () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1920,
        height: 1080,
        availWidth: 1920,
        availHeight: 1040,
        colorDepth: 32,
        pixelDepth: 32,
      },
    });

    const { result } = renderHook(() => useScreen());

    expect(result.current.colorDepth).toBe(32);
    expect(result.current.pixelDepth).toBe(32);
  });

  test('updates when listenForChanges changes from false to true', async () => {
    const { result, rerender } = renderHook<ReturnType<typeof useScreen>, UseScreenOptions>(
      (props) => useScreen(props),
      {
        initialProps: { listenForChanges: false },
      }
    );

    // Enable listening
    rerender({ listenForChanges: true });

    // Now changes should be detected
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1280,
        height: 720,
        availWidth: 1280,
        availHeight: 700,
        colorDepth: 24,
        pixelDepth: 24,
      },
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(result.current.width).toBe(1280);
    });
  });
});
