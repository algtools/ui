import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Ensure window and document are available (jsdom should provide these, but guard for safety)
if (typeof window !== 'undefined') {
  // Ensure localStorage is available
  if (!window.localStorage) {
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
        get length() {
          return Object.keys(store).length;
        },
        key: (index: number) => {
          const keys = Object.keys(store);
          return keys[index] || null;
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  }

  // Ensure sessionStorage is available
  if (!window.sessionStorage) {
    const sessionStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
        get length() {
          return Object.keys(store).length;
        },
        key: (index: number) => {
          const keys = Object.keys(store);
          return keys[index] || null;
        },
      };
    })();
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
      writable: true,
    });
  }
}

// Polyfill ResizeObserver for jsdom (used by cmdk)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error ResizeObserver not defined in global
if (typeof (global as GlobalThis).ResizeObserver === 'undefined') {
  // @ts-expect-error Assigning ResizeObserver to global
  (global as GlobalThis).ResizeObserver = ResizeObserver;
}

// Polyfill scrollIntoView used by cmdk in focus management
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
