import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';
import { useTernaryDarkMode, type TernaryDarkMode } from '@/hooks/use-ternary-dark-mode';

describe('useTernaryDarkMode', () => {
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

    // Mock matchMedia
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
    test('should initialize with system mode by default', () => {
      const { result } = renderHook(() => useTernaryDarkMode());

      expect(result.current.mode).toBe('system');
    });

    test('should initialize with custom default value', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should use stored value from localStorage if available', () => {
      window.localStorage.setItem('theme-mode', JSON.stringify('light'));

      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should resolve system mode to system preference (dark)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.mode).toBe('system');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should resolve system mode to system preference (light)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.mode).toBe('system');
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('setLight', () => {
    test('should set mode to light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.setLight();
      });

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('theme-mode')).toBe('"light"');
    });

    test('should be idempotent when already light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setLight();
      });

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('setDark', () => {
    test('should set mode to dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setDark();
      });

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(window.localStorage.getItem('theme-mode')).toBe('"dark"');
    });

    test('should be idempotent when already dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.setDark();
      });

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });
  });

  describe('setSystem', () => {
    test('should set mode to system', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setSystem();
      });

      expect(result.current.mode).toBe('system');
      expect(window.localStorage.getItem('theme-mode')).toBe('"system"');
    });

    test('should follow system preference when set to system (dark)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setSystem();
      });

      expect(result.current.mode).toBe('system');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should follow system preference when set to system (light)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.setSystem();
      });

      expect(result.current.mode).toBe('system');
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('setMode', () => {
    test('should set mode to light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.setMode('light');
      });

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should set mode to dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setMode('dark');
      });

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should set mode to system', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setMode('system');
      });

      expect(result.current.mode).toBe('system');
    });

    test('should accept TernaryDarkMode type parameter', () => {
      const { result } = renderHook(() => useTernaryDarkMode());

      const modes: TernaryDarkMode[] = ['light', 'dark', 'system'];

      modes.forEach((mode) => {
        act(() => {
          result.current.setMode(mode);
        });
        expect(result.current.mode).toBe(mode);
      });
    });
  });

  describe('toggle', () => {
    test('should toggle from light to dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should toggle from dark to light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should toggle from system to opposite of current system preference (dark system)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.isDarkMode).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should toggle from system to opposite of current system preference (light system)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.isDarkMode).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.toggle();
      });
      expect(result.current.mode).toBe('dark');

      act(() => {
        result.current.toggle();
      });
      expect(result.current.mode).toBe('light');

      act(() => {
        result.current.toggle();
      });
      expect(result.current.mode).toBe('dark');
    });
  });

  describe('isDarkMode resolution', () => {
    test('should return true when mode is dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      expect(result.current.isDarkMode).toBe(true);
    });

    test('should return false when mode is light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      expect(result.current.isDarkMode).toBe(false);
    });

    test('should follow system preference when mode is system (dark)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.isDarkMode).toBe(true);
    });

    test('should follow system preference when mode is system (light)', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    test('should persist mode to localStorage', () => {
      const { result } = renderHook(() => useTernaryDarkMode('system'));

      act(() => {
        result.current.setLight();
      });
      expect(window.localStorage.getItem('theme-mode')).toBe('"light"');

      act(() => {
        result.current.setDark();
      });
      expect(window.localStorage.getItem('theme-mode')).toBe('"dark"');

      act(() => {
        result.current.setSystem();
      });
      expect(window.localStorage.getItem('theme-mode')).toBe('"system"');
    });

    test('should sync across tabs/windows via storage events', async () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      expect(result.current.mode).toBe('light');

      // Simulate storage event from another tab
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'theme-mode',
          newValue: JSON.stringify('dark'),
          oldValue: JSON.stringify('light'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.mode).toBe('dark');
      });
    });
  });

  describe('document element class management', () => {
    test('should add dark class when mode is dark', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      act(() => {
        result.current.setDark();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should remove dark class when mode is light', () => {
      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      act(() => {
        result.current.setLight();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should add dark class when system preference is dark', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(result.current.isDarkMode).toBe(true);
    });

    test('should remove dark class when system preference is light', () => {
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

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should update class when toggling modes', () => {
      const { result } = renderHook(() => useTernaryDarkMode('light'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('system preference changes', () => {
    test('should react to system preference changes when in system mode', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];

      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') {
            listeners.push(listener);
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTernaryDarkMode('system'));

      expect(result.current.isDarkMode).toBe(false);

      // Simulate system preference change to dark
      act(() => {
        listeners.forEach((listener) =>
          listener({ matches: true, media: '(prefers-color-scheme: dark)' } as MediaQueryListEvent)
        );
      });

      expect(result.current.isDarkMode).toBe(true);
    });

    test('should not affect explicit light/dark modes when system changes', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];

      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') {
            listeners.push(listener);
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTernaryDarkMode('dark'));

      expect(result.current.isDarkMode).toBe(true);

      // Simulate system preference change
      act(() => {
        listeners.forEach((listener) =>
          listener({ matches: true, media: '(prefers-color-scheme: dark)' } as MediaQueryListEvent)
        );
      });

      // Should still be in dark mode (explicit setting)
      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });
  });

  describe('SSR safety', () => {
    test('should not crash in SSR environment', () => {
      // Save original window
      const originalWindow = global.window;

      // Mock SSR environment
      // @ts-expect-error - Testing SSR scenario
      delete global.window;

      const { result } = renderHook(() => useTernaryDarkMode('light'));

      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('hook return value', () => {
    test('should expose all expected properties and methods', () => {
      const { result } = renderHook(() => useTernaryDarkMode());

      expect(result.current).toHaveProperty('mode');
      expect(result.current).toHaveProperty('isDarkMode');
      expect(result.current).toHaveProperty('setLight');
      expect(result.current).toHaveProperty('setDark');
      expect(result.current).toHaveProperty('setSystem');
      expect(result.current).toHaveProperty('setMode');
      expect(result.current).toHaveProperty('toggle');

      expect(typeof result.current.mode).toBe('string');
      expect(typeof result.current.isDarkMode).toBe('boolean');
      expect(typeof result.current.setLight).toBe('function');
      expect(typeof result.current.setDark).toBe('function');
      expect(typeof result.current.setSystem).toBe('function');
      expect(typeof result.current.setMode).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
    });
  });

  describe('integration', () => {
    test('should work correctly with full workflow', () => {
      const { result } = renderHook(() => useTernaryDarkMode('system'));

      // Set to light
      act(() => {
        result.current.setLight();
      });
      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Toggle to dark
      act(() => {
        result.current.toggle();
      });
      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Set to system
      act(() => {
        result.current.setSystem();
      });
      expect(result.current.mode).toBe('system');

      // Use setMode
      act(() => {
        result.current.setMode('light');
      });
      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    test('should handle rapid mode changes', () => {
      const { result } = renderHook(() => useTernaryDarkMode('system'));

      const modes: TernaryDarkMode[] = ['light', 'dark', 'system', 'light', 'dark'];

      act(() => {
        modes.forEach((mode) => {
          result.current.setMode(mode);
        });
      });

      expect(result.current.mode).toBe('dark');
    });
  });

  describe('type safety', () => {
    test('should work with TernaryDarkMode type', () => {
      const { result } = renderHook(() => useTernaryDarkMode());

      const validModes: TernaryDarkMode[] = ['light', 'dark', 'system'];

      validModes.forEach((mode) => {
        act(() => {
          result.current.setMode(mode);
        });
        expect(result.current.mode).toBe(mode);
      });
    });
  });
});
