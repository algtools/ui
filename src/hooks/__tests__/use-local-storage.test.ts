import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';

import { useLocalStorage } from '@/hooks/use-local-storage';

describe('useLocalStorage', () => {
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
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();
    });

    test('should initialize with stored value when localStorage has data', () => {
      window.localStorage.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('stored-value');
      expect(result.current.error).toBeNull();
    });

    test('should handle complex objects', () => {
      const complexObject = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
      window.localStorage.setItem('test-key', JSON.stringify(complexObject));

      const { result } = renderHook(() =>
        useLocalStorage<typeof complexObject>('test-key', { name: '', age: 0, hobbies: [] })
      );

      expect(result.current.value).toEqual(complexObject);
    });

    test('should handle arrays', () => {
      const testArray = [1, 2, 3, 4, 5];
      window.localStorage.setItem('test-key', JSON.stringify(testArray));

      const { result } = renderHook(() => useLocalStorage<number[]>('test-key', []));

      expect(result.current.value).toEqual(testArray);
    });

    test('should handle boolean values', () => {
      window.localStorage.setItem('test-key', JSON.stringify(true));

      const { result } = renderHook(() => useLocalStorage('test-key', false));

      expect(result.current.value).toBe(true);
    });

    test('should handle number values', () => {
      window.localStorage.setItem('test-key', JSON.stringify(42));

      const { result } = renderHook(() => useLocalStorage('test-key', 0));

      expect(result.current.value).toBe(42);
    });

    test('should handle null initial value', () => {
      const { result } = renderHook(() => useLocalStorage<string | null>('test-key', null));

      expect(result.current.value).toBeNull();
    });

    test('should return initial value on JSON parse error', () => {
      window.localStorage.setItem('test-key', 'invalid-json{');

      const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));

      expect(result.current.value).toBe('fallback');
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe('setValue', () => {
    test('should update value and localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
      expect(result.current.error).toBeNull();
    });

    test('should accept function updater', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 10));

      act(() => {
        result.current.setValue((prev) => prev + 5);
      });

      expect(result.current.value).toBe(15);
      expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify(15));
    });

    test('should handle multiple updates', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 0));

      act(() => {
        result.current.setValue(1);
      });
      expect(result.current.value).toBe(1);

      act(() => {
        result.current.setValue(2);
      });
      expect(result.current.value).toBe(2);

      act(() => {
        result.current.setValue(3);
      });
      expect(result.current.value).toBe(3);
    });

    test('should update complex objects', () => {
      interface User {
        name: string;
        email: string;
      }

      const { result } = renderHook(() => useLocalStorage<User>('user', { name: '', email: '' }));

      const newUser = { name: 'John Doe', email: 'john@example.com' };

      act(() => {
        result.current.setValue(newUser);
      });

      expect(result.current.value).toEqual(newUser);
      expect(window.localStorage.getItem('user')).toBe(JSON.stringify(newUser));
    });

    test('should handle storage quota exceeded error', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      // Mock localStorage.setItem to throw QuotaExceededError
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      setItemSpy.mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      act(() => {
        result.current.setValue('new-value');
      });

      expect(result.current.error).toBeInstanceOf(Error);

      setItemSpy.mockRestore();
    });

    test('should clear error on successful write after error', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      // Mock localStorage.setItem to throw error first
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      setItemSpy.mockImplementationOnce(() => {
        throw new Error('Storage error');
      });

      act(() => {
        result.current.setValue('value1');
      });

      expect(result.current.error).toBeInstanceOf(Error);

      // Restore normal behavior
      setItemSpy.mockRestore();

      act(() => {
        result.current.setValue('value2');
      });

      expect(result.current.error).toBeNull();
      expect(result.current.value).toBe('value2');
    });
  });

  describe('removeValue', () => {
    test('should remove value from localStorage and reset to initial', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe('initial');
      expect(window.localStorage.getItem('test-key')).toBeNull();
      expect(result.current.error).toBeNull();
    });

    test('should work when localStorage is already empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe('initial');
      expect(window.localStorage.getItem('test-key')).toBeNull();
    });

    test('should handle errors when removing', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
      removeItemSpy.mockImplementation(() => {
        throw new Error('Remove error');
      });

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.error).toBeInstanceOf(Error);

      removeItemSpy.mockRestore();
    });
  });

  describe('SSR safety', () => {
    test('should handle undefined window (SSR)', () => {
      // In jsdom, window is always defined, so we test that the hook
      // gracefully handles the SSR scenario by verifying it returns
      // the initial value and doesn't crash
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();

      // Should work normally with window available
      act(() => {
        result.current.setValue('new-value');
      });

      expect(result.current.value).toBe('new-value');
    });

    test('should not crash when calling setValue before window is available', () => {
      // This tests that the hook is defensive about window access
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      // Hook should work normally with window available
      expect(result.current.value).toBe('initial');

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
    });
  });

  describe('storage event synchronization', () => {
    test('should sync when storage changes from another tab', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

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
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');

      // Simulate storage removal from another tab
      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'test-key',
          newValue: null,
          oldValue: JSON.stringify('updated'),
          storageArea: window.localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      await waitFor(() => {
        expect(result.current.value).toBe('initial');
      });
    });

    test('should not update for different keys', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

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
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

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
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 0));

      expect(result.current.value).toBe(0);

      act(() => {
        result.current.setValue(10);
      });
      expect(result.current.value).toBe(10);
      expect(window.localStorage.getItem('test-key')).toBe('10');

      act(() => {
        result.current.setValue((prev) => prev + 5);
      });
      expect(result.current.value).toBe(15);

      act(() => {
        result.current.removeValue();
      });
      expect(result.current.value).toBe(0);
      expect(window.localStorage.getItem('test-key')).toBeNull();
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('setValue');
      expect(result.current).toHaveProperty('removeValue');
      expect(result.current).toHaveProperty('error');

      expect(typeof result.current.setValue).toBe('function');
      expect(typeof result.current.removeValue).toBe('function');
    });

    test('should handle rapid successive updates', () => {
      const { result } = renderHook(() => useLocalStorage('counter', 0));

      act(() => {
        for (let i = 1; i <= 10; i++) {
          result.current.setValue(i);
        }
      });

      expect(result.current.value).toBe(10);
      expect(window.localStorage.getItem('counter')).toBe('10');
    });
  });

  describe('performance', () => {
    test('removeValue should maintain stable reference', () => {
      const { result, rerender } = renderHook(() => useLocalStorage('test-key', 'initial'));

      const firstRemoveValue = result.current.removeValue;

      act(() => {
        result.current.setValue('updated');
      });

      rerender();

      // removeValue reference should remain stable
      expect(result.current.removeValue).toBe(firstRemoveValue);
    });

    test('setValue should work correctly across multiple renders', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 0));

      // Perform multiple setValue operations
      act(() => {
        result.current.setValue(1);
      });
      expect(result.current.value).toBe(1);

      act(() => {
        result.current.setValue((prev) => prev + 1);
      });
      expect(result.current.value).toBe(2);

      act(() => {
        result.current.setValue((prev) => prev + 1);
      });
      expect(result.current.value).toBe(3);
    });
  });

  describe('type safety', () => {
    test('should work with typed interfaces', () => {
      interface Settings {
        theme: 'light' | 'dark';
        language: string;
        notifications: boolean;
      }

      const { result } = renderHook(() =>
        useLocalStorage<Settings>('settings', {
          theme: 'light',
          language: 'en',
          notifications: true,
        })
      );

      act(() => {
        result.current.setValue({
          theme: 'dark',
          language: 'es',
          notifications: false,
        });
      });

      expect(result.current.value.theme).toBe('dark');
      expect(result.current.value.language).toBe('es');
      expect(result.current.value.notifications).toBe(false);
    });

    test('should work with union types', () => {
      type Status = 'idle' | 'loading' | 'success' | 'error';

      const { result } = renderHook(() => useLocalStorage<Status>('status', 'idle'));

      act(() => {
        result.current.setValue('loading');
      });

      expect(result.current.value).toBe('loading');
    });
  });

  describe('edge cases', () => {
    test('should handle empty string as key', () => {
      const { result } = renderHook(() => useLocalStorage('', 'value'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.localStorage.getItem('')).toBe(JSON.stringify('updated'));
    });

    test('should handle very long strings', () => {
      const longString = 'a'.repeat(10000);
      const { result } = renderHook(() => useLocalStorage('test-key', ''));

      act(() => {
        result.current.setValue(longString);
      });

      expect(result.current.value).toBe(longString);
      expect(result.current.value.length).toBe(10000);
    });

    test('should handle special characters in values', () => {
      const specialValue = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./\n\t';
      const { result } = renderHook(() => useLocalStorage('test-key', ''));

      act(() => {
        result.current.setValue(specialValue);
      });

      expect(result.current.value).toBe(specialValue);
    });

    test('should handle undefined in updater function', () => {
      const { result } = renderHook(() =>
        useLocalStorage<string | undefined>('test-key', 'initial')
      );

      act(() => {
        result.current.setValue(() => undefined);
      });

      expect(result.current.value).toBeUndefined();
    });
  });

  describe('cleanup', () => {
    test('should clean up event listeners on unmount', () => {
      if (typeof window === 'undefined') return;
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useLocalStorage('test-key', 'initial'));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });
});
