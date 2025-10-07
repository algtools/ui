import { renderHook, act, waitFor } from '@testing-library/react';

import { useIsMobile } from '@/hooks/use-mobile';

// Simple matchMedia stub that lets us trigger the registered listeners
let listeners = new Set<() => void>();

function installMatchMediaStub() {
  listeners = new Set<() => void>();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      media: query,
      matches: window.innerWidth < 768,
      addEventListener: (_type: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_type: string, cb: () => void) => listeners.delete(cb),
      onchange: null,
      dispatchEvent: () => false,
    }),
  });
}

function triggerMediaChange() {
  listeners.forEach((cb) => cb());
}

describe('useIsMobile', () => {
  beforeEach(() => {
    installMatchMediaStub();
  });

  test('returns true when width is below breakpoint and false otherwise', async () => {
    // Desktop width
    (window as Window & { innerWidth: number }).innerWidth = 1024;
    const { result, rerender } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    // Mobile width
    (window as Window & { innerWidth: number }).innerWidth = 500;
    rerender(undefined);
    triggerMediaChange();

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  test('updates on resize change events via matchMedia', async () => {
    (window as Window & { innerWidth: number }).innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Resize to desktop
    (window as Window & { innerWidth: number }).innerWidth = 800;
    act(() => {
      triggerMediaChange();
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    // Resize back to mobile
    (window as Window & { innerWidth: number }).innerWidth = 600;
    act(() => {
      triggerMediaChange();
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  test('removes listener on unmount (no further updates)', async () => {
    (window as Window & { innerWidth: number }).innerWidth = 600;
    const { unmount } = renderHook(() => useIsMobile());

    await waitFor(() => {});
    expect(listeners.size).toBe(1);

    unmount();
    expect(listeners.size).toBe(0);

    // Should not throw and no listeners should be called
    (window as Window & { innerWidth: number }).innerWidth = 1000;
    act(() => {
      triggerMediaChange();
    });
    expect(listeners.size).toBe(0);
  });
});
