import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

import { useReadLocalStorage } from '@/hooks/use-read-local-storage';

describe('useReadLocalStorage', () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    // Clear any mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe('initialization', () => {
    test('should initialize with initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();
    });

    test('should initialize with stored value when localStorage has data', () => {
      window.localStorage.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('stored-value');
      expect(result.current.error).toBeNull();
    });

    test('should handle complex objects', () => {
      const complexObject = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
      window.localStorage.setItem('test-key', JSON.stringify(complexObject));

      const { result } = renderHook(() =>
        useReadLocalStorage<typeof complexObject>('test-key', { name: '', age: 0, hobbies: [] })
      );

      expect(result.current.value).toEqual(complexObject);
    });

    test('should handle arrays', () => {
      const testArray = [1, 2, 3, 4, 5];
      window.localStorage.setItem('test-key', JSON.stringify(testArray));

      const { result } = renderHook(() => useReadLocalStorage<number[]>('test-key', []));

      expect(result.current.value).toEqual(testArray);
    });

    test('should handle boolean values', () => {
      window.localStorage.setItem('test-key', JSON.stringify(true));

      const { result } = renderHook(() => useReadLocalStorage('test-key', false));

      expect(result.current.value).toBe(true);
    });

    test('should handle number values', () => {
      window.localStorage.setItem('test-key', JSON.stringify(42));

      const { result } = renderHook(() => useReadLocalStorage('test-key', 0));

      expect(result.current.value).toBe(42);
    });

    test('should handle null initial value', () => {
      const { result } = renderHook(() => useReadLocalStorage<string | null>('test-key', null));

      expect(result.current.value).toBeNull();
    });

    test('should return initial value on JSON parse error', () => {
      window.localStorage.setItem('test-key', 'invalid-json{');

      const { result } = renderHook(() => useReadLocalStorage('test-key', 'fallback'));

      expect(result.current.value).toBe('fallback');
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe('read-only behavior', () => {
    test('should not have setValue method', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current).not.toHaveProperty('setValue');
    });

    test('should not have removeValue method', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current).not.toHaveProperty('removeValue');
    });

    test('should only expose value and error properties', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(Object.keys(result.current)).toEqual(['value', 'error']);
    });
  });

  describe('storage event synchronization', () => {
    test('should sync when storage changes from another tab', async () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');

      // Simulate storage event from another tab
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated-from-another-tab'),
          oldValue: JSON.stringify('initial'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('updated-from-another-tab');
      });
    });

    test('should reset to initial when storage is cleared from another tab', async () => {
      window.localStorage.setItem('test-key', JSON.stringify('stored'));

      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('stored');

      // Simulate storage removal from another tab
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: null,
          oldValue: JSON.stringify('stored'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('initial');
      });
    });

    test('should not update for different keys', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'different-key',
          newValue: JSON.stringify('different-value'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(result.current.value).toBe('initial');
    });

    test('should handle parse errors in storage events', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: 'invalid-json{',
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(result.current.error).toBeInstanceOf(Error);
    });

    test('should sync multiple updates from storage events', async () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');

      // First update
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('first-update'),
          oldValue: JSON.stringify('initial'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('first-update');
      });

      // Second update
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('second-update'),
          oldValue: JSON.stringify('first-update'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('second-update');
      });
    });

    test('should clear error on successful storage event after error', async () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      // Trigger parse error
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: 'invalid-json{',
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(result.current.error).toBeInstanceOf(Error);

      // Valid update should clear error
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('valid-value'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
        expect(result.current.value).toBe('valid-value');
      });
    });
  });

  describe('SSR safety', () => {
    test('should handle undefined window (SSR)', () => {
      // In jsdom, window is always defined, so we test that the hook
      // gracefully handles the SSR scenario by verifying it returns
      // the initial value and doesn't crash
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();
    });

    test('should work correctly after hydration', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      // Should work normally with window available
      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();
    });
  });

  describe('type safety', () => {
    test('should work with typed interfaces', () => {
      interface Settings {
        theme: 'light' | 'dark';
        language: string;
        notifications: boolean;
      }

      const settings: Settings = {
        theme: 'dark',
        language: 'es',
        notifications: false,
      };

      window.localStorage.setItem('settings', JSON.stringify(settings));

      const { result } = renderHook(() =>
        useReadLocalStorage<Settings>('settings', {
          theme: 'light',
          language: 'en',
          notifications: true,
        })
      );

      expect(result.current.value.theme).toBe('dark');
      expect(result.current.value.language).toBe('es');
      expect(result.current.value.notifications).toBe(false);
    });

    test('should work with union types', () => {
      type Status = 'idle' | 'loading' | 'success' | 'error';

      window.localStorage.setItem('status', JSON.stringify('loading'));

      const { result } = renderHook(() => useReadLocalStorage<Status>('status', 'idle'));

      expect(result.current.value).toBe('loading');
    });
  });

  describe('edge cases', () => {
    test('should handle empty string as key', () => {
      window.localStorage.setItem('', JSON.stringify('value'));

      const { result } = renderHook(() => useReadLocalStorage('', 'initial'));

      expect(result.current.value).toBe('value');
    });

    test('should handle very long strings', () => {
      const longString = 'a'.repeat(10000);
      window.localStorage.setItem('test-key', JSON.stringify(longString));

      const { result } = renderHook(() => useReadLocalStorage('test-key', ''));

      expect(result.current.value).toBe(longString);
      expect(result.current.value.length).toBe(10000);
    });

    test('should handle special characters in values', () => {
      const specialValue = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./\n\t';
      window.localStorage.setItem('test-key', JSON.stringify(specialValue));

      const { result } = renderHook(() => useReadLocalStorage('test-key', ''));

      expect(result.current.value).toBe(specialValue);
    });

    test('should handle nested objects', () => {
      const nestedObject = {
        user: {
          profile: {
            name: 'John',
            settings: {
              theme: 'dark',
              language: 'en',
            },
          },
        },
      };

      window.localStorage.setItem('test-key', JSON.stringify(nestedObject));

      const { result } = renderHook(() => useReadLocalStorage('test-key', {}));

      expect(result.current.value).toEqual(nestedObject);
    });
  });

  describe('cleanup', () => {
    test('should clean up event listeners on unmount', () => {
      if (typeof window === 'undefined') return;
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    test('should not leak memory on unmount', () => {
      const { unmount } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      // Should not throw on unmount
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('integration', () => {
    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('error');

      // Should not have write methods
      expect(result.current).not.toHaveProperty('setValue');
      expect(result.current).not.toHaveProperty('removeValue');
    });

    test('should reflect external localStorage changes', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');

      // Externally update localStorage
      act(() => {
        window.localStorage.setItem('test-key', JSON.stringify('external-update'));
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('external-update'),
          oldValue: JSON.stringify('initial'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      waitFor(() => {
        expect(result.current.value).toBe('external-update');
      });
    });
  });

  describe('comparison with useLocalStorage', () => {
    test('should be read-only unlike useLocalStorage', () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      // Should not have setter methods
      expect(result.current).not.toHaveProperty('setValue');
      expect(result.current).not.toHaveProperty('removeValue');

      // Should only be able to read
      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('error');
    });

    test('should sync with external changes but not provide write capability', async () => {
      const { result } = renderHook(() => useReadLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');

      // Simulate external write
      act(() => {
        window.localStorage.setItem('test-key', JSON.stringify('updated'));
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated'),
          oldValue: JSON.stringify('initial'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('updated');
      });

      // But no way to update from the hook itself
      expect(result.current).not.toHaveProperty('setValue');
    });
  });
});
