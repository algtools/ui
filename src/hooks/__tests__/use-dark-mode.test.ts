import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';
import { useDarkMode } from '@/hooks/use-dark-mode';

describe('useDarkMode', () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    // Clear any mocks
    vi.clearAllMocks();
    // Remove dark class from document
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.classList.remove('dark');
    }
  });

  afterEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.classList.remove('dark');
    }
  });

  describe('initialization', () => {
    test('should initialize with system preference when no default provided', () => {
      // Mock system prefers dark
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should initialize with custom default value', () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should use stored value from localStorage if available', () => {
      window.localStorage.setItem('dark-mode', JSON.stringify(true));

      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should apply dark class to document element when dark mode is enabled', () => {
      const { result } = renderHook(() => useDarkMode(true));

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should not apply dark class when dark mode is disabled', () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('enable', () => {
    test('should enable dark mode', () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(false);

      act(() => {
        result.current.enable();
      });

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(window.localStorage.getItem('dark-mode')).toBe('true');
    });

    test('should be idempotent when already enabled', () => {
      const { result } = renderHook(() => useDarkMode(true));

      act(() => {
        result.current.enable();
      });

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('disable', () => {
    test('should disable dark mode', () => {
      const { result } = renderHook(() => useDarkMode(true));

      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        result.current.disable();
      });

      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('dark-mode')).toBe('false');
    });

    test('should be idempotent when already disabled', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.disable();
      });

      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('toggle', () => {
    test('should toggle from light to dark', () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should toggle from dark to light', () => {
      const { result } = renderHook(() => useDarkMode(true));

      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should toggle multiple times', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isDarkMode).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isDarkMode).toBe(true);
    });
  });

  describe('setDarkMode', () => {
    test('should set dark mode to true', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.setDarkMode(true);
      });

      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(window.localStorage.getItem('dark-mode')).toBe('true');
    });

    test('should set dark mode to false', () => {
      const { result } = renderHook(() => useDarkMode(true));

      act(() => {
        result.current.setDarkMode(false);
      });

      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('dark-mode')).toBe('false');
    });

    test('should accept boolean parameter correctly', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.setDarkMode(true);
      });
      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        result.current.setDarkMode(false);
      });
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    test('should persist dark mode state to localStorage', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.enable();
      });

      expect(window.localStorage.getItem('dark-mode')).toBe('true');

      act(() => {
        result.current.disable();
      });

      expect(window.localStorage.getItem('dark-mode')).toBe('false');
    });

    test('should sync across tabs/windows via storage events', async () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(false);

      // Simulate storage event from another tab
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'dark-mode',
          newValue: JSON.stringify(true),
          oldValue: JSON.stringify(false),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.isDarkMode).toBe(true);
      });
    });

    test('should handle storage event with false value', async () => {
      const { result } = renderHook(() => useDarkMode(true));

      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'dark-mode',
          newValue: JSON.stringify(false),
          oldValue: JSON.stringify(true),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.isDarkMode).toBe(false);
      });
    });
  });

  describe('system preference sync', () => {
    test('should sync with system dark mode preference on initial load', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(true);
    });

    test('should sync with system light mode preference on initial load', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(false);
    });

    test('should prefer explicit default over system preference', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useDarkMode(false));

      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('SSR safety', () => {
    test('should not crash in SSR environment', () => {
      // Save original window
      const originalWindow = global.window;

      try {
        // Mock SSR environment
        // @ts-expect-error - Testing SSR scenario
        delete global.window;
        // @ts-expect-error - Testing SSR scenario
        delete (global as any).window;

        const { result } = renderHook(() => useDarkMode(false));

        expect(result.current.isDarkMode).toBe(false);
      } finally {
        // Always restore window
        global.window = originalWindow;
        (global as any).window = originalWindow;
      }
    });
  });

  describe('document element class management', () => {
    test('should add dark class when enabling dark mode', () => {
      const { result } = renderHook(() => useDarkMode(false));

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      act(() => {
        result.current.enable();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should remove dark class when disabling dark mode', () => {
      const { result } = renderHook(() => useDarkMode(true));

      expect(document.documentElement.classList.contains('dark')).toBe(true);

      act(() => {
        result.current.disable();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should maintain dark class across multiple enables', () => {
      const { result } = renderHook(() => useDarkMode(false));

      act(() => {
        result.current.enable();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);

      act(() => {
        result.current.enable();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('hook return value', () => {
    test('should expose all expected properties and methods', () => {
      const { result } = renderHook(() => useDarkMode());

      expect(result.current).toHaveProperty('isDarkMode');
      expect(result.current).toHaveProperty('enable');
      expect(result.current).toHaveProperty('disable');
      expect(result.current).toHaveProperty('toggle');
      expect(result.current).toHaveProperty('setDarkMode');

      expect(typeof result.current.isDarkMode).toBe('boolean');
      expect(typeof result.current.enable).toBe('function');
      expect(typeof result.current.disable).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
      expect(typeof result.current.setDarkMode).toBe('function');
    });
  });

  describe('integration', () => {
    test('should work correctly with full workflow', () => {
      const { result } = renderHook(() => useDarkMode(false));

      // Initial state
      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Enable
      act(() => {
        result.current.enable();
      });
      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Toggle off
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Set to true
      act(() => {
        result.current.setDarkMode(true);
      });
      expect(result.current.isDarkMode).toBe(true);

      // Disable
      act(() => {
        result.current.disable();
      });
      expect(result.current.isDarkMode).toBe(false);
    });
  });
});
