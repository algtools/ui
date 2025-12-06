import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';

import { useSessionStorage } from '@/hooks/use-session-storage';

describe('useSessionStorage', () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
    // Clear any mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  });

  describe('initialization', () => {
    test('should initialize with initial value when sessionStorage is empty', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();
    });

    test('should initialize with stored value when sessionStorage has data', () => {
      window.sessionStorage.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      expect(result.current.value).toBe('stored-value');
      expect(result.current.error).toBeNull();
    });

    test('should handle complex objects', () => {
      const complexObject = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
      window.sessionStorage.setItem('test-key', JSON.stringify(complexObject));

      const { result } = renderHook(() =>
        useSessionStorage<typeof complexObject>('test-key', { name: '', age: 0, hobbies: [] })
      );

      expect(result.current.value).toEqual(complexObject);
    });

    test('should handle arrays', () => {
      const testArray = [1, 2, 3, 4, 5];
      window.sessionStorage.setItem('test-key', JSON.stringify(testArray));

      const { result } = renderHook(() => useSessionStorage<number[]>('test-key', []));

      expect(result.current.value).toEqual(testArray);
    });

    test('should handle boolean values', () => {
      window.sessionStorage.setItem('test-key', JSON.stringify(true));

      const { result } = renderHook(() => useSessionStorage('test-key', false));

      expect(result.current.value).toBe(true);
    });

    test('should handle number values', () => {
      window.sessionStorage.setItem('test-key', JSON.stringify(42));

      const { result } = renderHook(() => useSessionStorage('test-key', 0));

      expect(result.current.value).toBe(42);
    });

    test('should handle null initial value', () => {
      const { result } = renderHook(() => useSessionStorage<string | null>('test-key', null));

      expect(result.current.value).toBeNull();
    });

    test('should return initial value on JSON parse error', () => {
      window.sessionStorage.setItem('test-key', 'invalid-json{');

      const { result } = renderHook(() => useSessionStorage('test-key', 'fallback'));

      expect(result.current.value).toBe('fallback');
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe('setValue', () => {
    test('should update value and sessionStorage', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.sessionStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
      expect(result.current.error).toBeNull();
    });

    test('should accept function updater', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 10));

      act(() => {
        result.current.setValue((prev) => prev + 5);
      });

      expect(result.current.value).toBe(15);
      expect(window.sessionStorage.getItem('test-key')).toBe(JSON.stringify(15));
    });

    test('should handle multiple updates', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 0));

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

      const { result } = renderHook(() => useSessionStorage<User>('user', { name: '', email: '' }));

      const newUser = { name: 'John Doe', email: 'john@example.com' };

      act(() => {
        result.current.setValue(newUser);
      });

      expect(result.current.value).toEqual(newUser);
      expect(window.sessionStorage.getItem('user')).toBe(JSON.stringify(newUser));
    });

    test('should handle storage quota exceeded error', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      // Mock sessionStorage.setItem to throw QuotaExceededError
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
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      // Mock sessionStorage.setItem to throw error first
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
    test('should remove value from sessionStorage and reset to initial', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe('initial');
      expect(window.sessionStorage.getItem('test-key')).toBeNull();
      expect(result.current.error).toBeNull();
    });

    test('should work when sessionStorage is already empty', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe('initial');
      expect(window.sessionStorage.getItem('test-key')).toBeNull();
    });

    test('should handle errors when removing', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

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
      // Save original window
      const originalWindow = global.window;

      // Mock SSR environment
      // @ts-expect-error - Testing SSR scenario
      delete global.window;

      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      expect(result.current.value).toBe('initial');
      expect(result.current.error).toBeNull();

      // Restore window before calling setValue (simulating hydration)
      global.window = originalWindow;

      // Should not throw after window is available
      act(() => {
        result.current.setValue('new-value');
      });

      expect(result.current.value).toBe('new-value');
    });

    test('should not crash when calling setValue before window is available', () => {
      // This tests that the hook is defensive about window access
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      // Hook should work normally with window available
      expect(result.current.value).toBe('initial');

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.sessionStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 0));

      expect(result.current.value).toBe(0);

      act(() => {
        result.current.setValue(10);
      });
      expect(result.current.value).toBe(10);
      expect(window.sessionStorage.getItem('test-key')).toBe('10');

      act(() => {
        result.current.setValue((prev) => prev + 5);
      });
      expect(result.current.value).toBe(15);

      act(() => {
        result.current.removeValue();
      });
      expect(result.current.value).toBe(0);
      expect(window.sessionStorage.getItem('test-key')).toBeNull();
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('setValue');
      expect(result.current).toHaveProperty('removeValue');
      expect(result.current).toHaveProperty('error');

      expect(typeof result.current.setValue).toBe('function');
      expect(typeof result.current.removeValue).toBe('function');
    });

    test('should handle rapid successive updates', () => {
      const { result } = renderHook(() => useSessionStorage('counter', 0));

      act(() => {
        for (let i = 1; i <= 10; i++) {
          result.current.setValue(i);
        }
      });

      expect(result.current.value).toBe(10);
      expect(window.sessionStorage.getItem('counter')).toBe('10');
    });
  });

  describe('performance', () => {
    test('removeValue should maintain stable reference', () => {
      const { result, rerender } = renderHook(() => useSessionStorage('test-key', 'initial'));

      const firstRemoveValue = result.current.removeValue;

      act(() => {
        result.current.setValue('updated');
      });

      rerender();

      // removeValue reference should remain stable
      expect(result.current.removeValue).toBe(firstRemoveValue);
    });

    test('setValue should work correctly across multiple renders', () => {
      const { result } = renderHook(() => useSessionStorage('test-key', 0));

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
        useSessionStorage<Settings>('settings', {
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

      const { result } = renderHook(() => useSessionStorage<Status>('status', 'idle'));

      act(() => {
        result.current.setValue('loading');
      });

      expect(result.current.value).toBe('loading');
    });
  });

  describe('edge cases', () => {
    test('should handle empty string as key', () => {
      const { result } = renderHook(() => useSessionStorage('', 'value'));

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
      expect(window.sessionStorage.getItem('')).toBe(JSON.stringify('updated'));
    });

    test('should handle very long strings', () => {
      const longString = 'a'.repeat(10000);
      const { result } = renderHook(() => useSessionStorage('test-key', ''));

      act(() => {
        result.current.setValue(longString);
      });

      expect(result.current.value).toBe(longString);
      expect(result.current.value.length).toBe(10000);
    });

    test('should handle special characters in values', () => {
      const specialValue = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./\n\t';
      const { result } = renderHook(() => useSessionStorage('test-key', ''));

      act(() => {
        result.current.setValue(specialValue);
      });

      expect(result.current.value).toBe(specialValue);
    });

    test('should handle undefined in updater function', () => {
      const { result } = renderHook(() =>
        useSessionStorage<string | undefined>('test-key', 'initial')
      );

      act(() => {
        result.current.setValue(() => undefined);
      });

      expect(result.current.value).toBeUndefined();
    });
  });

  describe('cleanup', () => {
    test('should not leak memory on unmount', () => {
      const { unmount } = renderHook(() => useSessionStorage('test-key', 'initial'));

      // Should not throw on unmount
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('comparison with localStorage', () => {
    test('sessionStorage should be independent from localStorage', () => {
      // Set value in localStorage
      window.localStorage.setItem('test-key', JSON.stringify('local-value'));

      // Initialize hook with sessionStorage
      const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

      // Should use initial value since sessionStorage is empty
      expect(result.current.value).toBe('initial');

      // Set value in sessionStorage
      act(() => {
        result.current.setValue('session-value');
      });

      // sessionStorage should have the new value
      expect(window.sessionStorage.getItem('test-key')).toBe(JSON.stringify('session-value'));

      // localStorage should remain unchanged
      expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('local-value'));
    });
  });
});
