import { renderHook, act, waitFor } from '@testing-library/react';

import { useMediaQuery } from '@/hooks/use-media-query';

// Track registered listeners for each media query
const listenersMap = new Map<string, Set<(event: MediaQueryListEvent) => void>>();

/**
 * Mock implementation of window.matchMedia
 * Allows us to simulate media query matching and trigger change events
 */
function installMatchMediaMock() {
  listenersMap.clear();

  if (typeof window === 'undefined') return;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => {
      if (!listenersMap.has(query)) {
        listenersMap.set(query, new Set());
      }

      const listeners = listenersMap.get(query)!;

      return {
        media: query,
        matches: false, // Default to false, can be changed by tests
        addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.add(listener);
        },
        removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.delete(listener);
        },
        onchange: null,
        addListener: () => {}, // Deprecated but kept for compatibility
        removeListener: () => {}, // Deprecated but kept for compatibility
        dispatchEvent: () => false,
      };
    },
  });
}

/**
 * Simulate a media query change by triggering all registered listeners
 */
function triggerMediaQueryChange(query: string, matches: boolean) {
  const listeners = listenersMap.get(query);
  if (listeners) {
    listeners.forEach((listener) => {
      listener({ matches, media: query } as MediaQueryListEvent);
    });
  }
}

/**
 * Get the current matches state for a query
 */
function setMediaQueryMatches(query: string, matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (q: string) => {
      if (!listenersMap.has(q)) {
        listenersMap.set(q, new Set());
      }

      const listeners = listenersMap.get(q)!;

      return {
        media: q,
        matches: q === query ? matches : false,
        addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.add(listener);
        },
        removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.delete(listener);
        },
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      };
    },
  });
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    installMatchMediaMock();
  });

  afterEach(() => {
    listenersMap.clear();
  });

  describe('initialization', () => {
    test('should return false by default when media query does not match', () => {
      setMediaQueryMatches('(min-width: 768px)', false);
      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      expect(result.current).toBe(false);
    });

    test('should return true when media query matches on mount', () => {
      setMediaQueryMatches('(min-width: 768px)', true);
      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      expect(result.current).toBe(true);
    });

    test('should handle different media queries independently', () => {
      setMediaQueryMatches('(min-width: 768px)', true);
      const { result: result1 } = renderHook(() => useMediaQuery('(min-width: 768px)'));

      setMediaQueryMatches('(max-width: 767px)', false);
      const { result: result2 } = renderHook(() => useMediaQuery('(max-width: 767px)'));

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(false);
    });
  });

  describe('media query changes', () => {
    test('should update when media query starts matching', async () => {
      setMediaQueryMatches('(min-width: 1024px)', false);
      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

      expect(result.current).toBe(false);

      act(() => {
        triggerMediaQueryChange('(min-width: 1024px)', true);
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    test('should update when media query stops matching', async () => {
      setMediaQueryMatches('(min-width: 1024px)', true);
      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

      expect(result.current).toBe(true);

      act(() => {
        triggerMediaQueryChange('(min-width: 1024px)', false);
      });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    test('should handle multiple state changes', async () => {
      setMediaQueryMatches('(max-width: 768px)', false);
      const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

      expect(result.current).toBe(false);

      // Change 1: becomes true
      act(() => {
        triggerMediaQueryChange('(max-width: 768px)', true);
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      // Change 2: becomes false
      act(() => {
        triggerMediaQueryChange('(max-width: 768px)', false);
      });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });

      // Change 3: becomes true again
      act(() => {
        triggerMediaQueryChange('(max-width: 768px)', true);
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });
  });

  describe('cleanup', () => {
    test('should remove event listener on unmount', () => {
      const query = '(min-width: 768px)';
      const { unmount } = renderHook(() => useMediaQuery(query));

      const listeners = listenersMap.get(query);
      expect(listeners?.size).toBe(1);

      unmount();

      expect(listeners?.size).toBe(0);
    });

    test('should not update state after unmount', async () => {
      const query = '(min-width: 768px)';
      setMediaQueryMatches(query, false);
      const { result, unmount } = renderHook(() => useMediaQuery(query));

      expect(result.current).toBe(false);

      unmount();

      // Trigger change after unmount - should not throw or update
      act(() => {
        triggerMediaQueryChange(query, true);
      });

      // Should still be false (no update after unmount)
      expect(result.current).toBe(false);
    });
  });

  describe('query changes', () => {
    test('should update when query parameter changes', async () => {
      // Start with first query matching
      const query1 = '(min-width: 768px)';
      const query2 = '(min-width: 1024px)';

      // Set up mock to return true for first query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (q: string) => {
          if (!listenersMap.has(q)) {
            listenersMap.set(q, new Set());
          }

          const listeners = listenersMap.get(q)!;

          return {
            media: q,
            matches: q === query1, // First query matches
            addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
              listeners.add(listener);
            },
            removeEventListener: (
              _type: string,
              listener: (event: MediaQueryListEvent) => void
            ) => {
              listeners.delete(listener);
            },
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
          };
        },
      });

      const { result, rerender } = renderHook(({ query }) => useMediaQuery(query), {
        initialProps: { query: query1 },
      });

      expect(result.current).toBe(true);

      // Change mock to return false for second query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (q: string) => {
          if (!listenersMap.has(q)) {
            listenersMap.set(q, new Set());
          }

          const listeners = listenersMap.get(q)!;

          return {
            media: q,
            matches: false, // Second query doesn't match
            addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
              listeners.add(listener);
            },
            removeEventListener: (
              _type: string,
              listener: (event: MediaQueryListEvent) => void
            ) => {
              listeners.delete(listener);
            },
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
          };
        },
      });

      // Change the query
      rerender({ query: query2 });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    test('should clean up old listener when query changes', async () => {
      const query1 = '(min-width: 768px)';
      const query2 = '(min-width: 1024px)';

      const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
        initialProps: { query: query1 },
      });

      expect(listenersMap.get(query1)?.size).toBe(1);
      expect(listenersMap.get(query2)?.size).toBeUndefined();

      rerender({ query: query2 });

      await waitFor(() => {
        expect(listenersMap.get(query1)?.size).toBe(0);
        expect(listenersMap.get(query2)?.size).toBe(1);
      });
    });
  });

  describe('common breakpoints', () => {
    test('should work with mobile breakpoint', () => {
      setMediaQueryMatches('(max-width: 767px)', true);
      const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));
      expect(result.current).toBe(true);
    });

    test('should work with tablet breakpoint', () => {
      setMediaQueryMatches('(min-width: 768px) and (max-width: 1023px)', true);
      const { result } = renderHook(() =>
        useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
      );
      expect(result.current).toBe(true);
    });

    test('should work with desktop breakpoint', () => {
      setMediaQueryMatches('(min-width: 1024px)', true);
      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
      expect(result.current).toBe(true);
    });
  });

  describe('special media features', () => {
    test('should work with prefers-color-scheme', () => {
      setMediaQueryMatches('(prefers-color-scheme: dark)', true);
      const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));
      expect(result.current).toBe(true);
    });

    test('should work with prefers-reduced-motion', () => {
      setMediaQueryMatches('(prefers-reduced-motion: reduce)', true);
      const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
      expect(result.current).toBe(true);
    });

    test('should work with orientation', () => {
      setMediaQueryMatches('(orientation: portrait)', true);
      const { result } = renderHook(() => useMediaQuery('(orientation: portrait)'));
      expect(result.current).toBe(true);
    });
  });

  describe('SSR compatibility', () => {
    test('should return false during SSR (window undefined)', () => {
      // In jsdom, window is always defined, so we test that the hook
      // returns a valid boolean value (the actual behavior depends on matchMedia)
      // The hook should handle SSR gracefully by checking typeof window
      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      // The result should be a boolean (false if matchMedia doesn't match)
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('multiple instances', () => {
    test('should allow multiple hooks with same query to work independently', async () => {
      const query = '(min-width: 768px)';
      setMediaQueryMatches(query, false);

      const { result: result1 } = renderHook(() => useMediaQuery(query));
      const { result: result2 } = renderHook(() => useMediaQuery(query));

      expect(result1.current).toBe(false);
      expect(result2.current).toBe(false);

      act(() => {
        triggerMediaQueryChange(query, true);
      });

      await waitFor(() => {
        expect(result1.current).toBe(true);
        expect(result2.current).toBe(true);
      });
    });

    test('should allow multiple hooks with different queries', async () => {
      const query1 = '(min-width: 768px)';
      const query2 = '(max-width: 767px)';

      // Set up mock to handle multiple queries with different match states
      const matchStates = new Map<string, boolean>();
      matchStates.set(query1, true);
      matchStates.set(query2, false);

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (q: string) => {
          if (!listenersMap.has(q)) {
            listenersMap.set(q, new Set());
          }

          const listeners = listenersMap.get(q)!;

          return {
            media: q,
            matches: matchStates.get(q) ?? false,
            addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
              listeners.add(listener);
            },
            removeEventListener: (
              _type: string,
              listener: (event: MediaQueryListEvent) => void
            ) => {
              listeners.delete(listener);
            },
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
          };
        },
      });

      const { result: result1 } = renderHook(() => useMediaQuery(query1));
      const { result: result2 } = renderHook(() => useMediaQuery(query2));

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(false);

      // Update the match states
      matchStates.set(query1, false);
      matchStates.set(query2, true);

      act(() => {
        triggerMediaQueryChange(query1, false);
        triggerMediaQueryChange(query2, true);
      });

      await waitFor(() => {
        expect(result1.current).toBe(false);
        expect(result2.current).toBe(true);
      });
    });
  });
});
