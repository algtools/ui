import { renderHook, act } from '@testing-library/react';

import { useScrollLock } from '@/hooks/use-scroll-lock';

describe('useScrollLock', () => {
  // Store original body styles
  let originalOverflow: string;
  let originalPaddingRight: string;

  beforeEach(() => {
    // Reset DOM state before each test
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Reset scrollbar width mock
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1015,
    });
  });

  afterEach(() => {
    // Restore original body styles
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  });

  describe('initialization', () => {
    test('should initialize with unlocked state by default', () => {
      const { result } = renderHook(() => useScrollLock());
      expect(result.current.isLocked).toBe(false);
    });

    test('should not lock scroll on mount by default', () => {
      renderHook(() => useScrollLock());
      expect(document.body.style.overflow).toBe('');
    });

    test('should lock scroll when enabled option is true', () => {
      renderHook(() => useScrollLock({ enabled: true }));
      expect(document.body.style.overflow).toBe('hidden');
    });

    test('should not lock scroll when enabled option is false', () => {
      renderHook(() => useScrollLock({ enabled: false }));
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('lock', () => {
    test('should lock body scroll when called', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(result.current.isLocked).toBe(true);
    });

    test('should preserve scrollbar width by default', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.paddingRight).toBe('15px');
    });

    test('should not add padding when preserveScrollbarWidth is false', () => {
      const { result } = renderHook(() => useScrollLock({ preserveScrollbarWidth: false }));

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.paddingRight).toBe('');
    });

    test('should not add padding when scrollbar width is 0', () => {
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.paddingRight).toBe('');
    });

    test('should handle multiple consecutive locks', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
        result.current.lock();
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(result.current.isLocked).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useScrollLock());
      const firstLock = result.current.lock;

      rerender();

      expect(result.current.lock).toBe(firstLock);
    });
  });

  describe('unlock', () => {
    test('should unlock body scroll when called', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        result.current.unlock();
      });

      expect(document.body.style.overflow).toBe('');
      expect(result.current.isLocked).toBe(false);
    });

    test('should restore original padding when unlocking', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.paddingRight).toBe('15px');

      act(() => {
        result.current.unlock();
      });

      expect(document.body.style.paddingRight).toBe('');
    });

    test('should handle unlock without prior lock', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.unlock();
      });

      expect(result.current.isLocked).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useScrollLock());
      const firstUnlock = result.current.unlock;

      rerender();

      expect(result.current.unlock).toBe(firstUnlock);
    });
  });

  describe('toggle', () => {
    test('should toggle from unlocked to locked', () => {
      const { result } = renderHook(() => useScrollLock());

      expect(result.current.isLocked).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isLocked).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');
    });

    test('should toggle from locked to unlocked', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(result.current.isLocked).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isLocked).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    test('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isLocked).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isLocked).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isLocked).toBe(true);
    });
  });

  describe('nested locks', () => {
    test('should handle nested locks from multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useScrollLock());
      const { result: result2 } = renderHook(() => useScrollLock());

      // First hook locks
      act(() => {
        result1.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(result1.current.isLocked).toBe(true);

      // Second hook locks
      act(() => {
        result2.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(result2.current.isLocked).toBe(true);

      // First hook unlocks, but body should still be locked
      act(() => {
        result1.current.unlock();
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(result1.current.isLocked).toBe(false);

      // Second hook unlocks, now body should be unlocked
      act(() => {
        result2.current.unlock();
      });

      expect(document.body.style.overflow).toBe('');
      expect(result2.current.isLocked).toBe(false);
    });

    test('should handle three nested locks', () => {
      const { result: result1 } = renderHook(() => useScrollLock());
      const { result: result2 } = renderHook(() => useScrollLock());
      const { result: result3 } = renderHook(() => useScrollLock());

      // Lock all three
      act(() => {
        result1.current.lock();
        result2.current.lock();
        result3.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      // Unlock first two
      act(() => {
        result1.current.unlock();
        result2.current.unlock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      // Unlock last one
      act(() => {
        result3.current.unlock();
      });

      expect(document.body.style.overflow).toBe('');
    });

    test('should not unlock when one instance locks multiple times', () => {
      const { result } = renderHook(() => useScrollLock());

      // Lock three times
      act(() => {
        result.current.lock();
        result.current.lock();
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      // Unlock once
      act(() => {
        result.current.unlock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      // Unlock twice more
      act(() => {
        result.current.unlock();
        result.current.unlock();
      });

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('cleanup on unmount', () => {
    test('should unlock scroll when component unmounts while locked', () => {
      const { result, unmount } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });

    test('should not affect scroll when component unmounts while unlocked', () => {
      const { unmount } = renderHook(() => useScrollLock());

      expect(document.body.style.overflow).toBe('');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });

    test('should handle cleanup with nested locks', () => {
      const { result: result1, unmount: unmount1 } = renderHook(() => useScrollLock());
      const { result: result2, unmount: unmount2 } = renderHook(() => useScrollLock());

      // Lock both
      act(() => {
        result1.current.lock();
        result2.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      // Unmount first hook
      unmount1();

      // Body should still be locked due to second hook
      expect(document.body.style.overflow).toBe('hidden');

      // Unmount second hook
      unmount2();

      // Now body should be unlocked
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('enabled option', () => {
    test('should lock when enabled changes to true', () => {
      const { rerender } = renderHook(({ enabled }) => useScrollLock({ enabled }), {
        initialProps: { enabled: false },
      });

      expect(document.body.style.overflow).toBe('');

      rerender({ enabled: true });

      expect(document.body.style.overflow).toBe('hidden');
    });

    test('should unlock when enabled changes to false', () => {
      const { rerender } = renderHook(({ enabled }) => useScrollLock({ enabled }), {
        initialProps: { enabled: true },
      });

      expect(document.body.style.overflow).toBe('hidden');

      rerender({ enabled: false });

      expect(document.body.style.overflow).toBe('');
    });

    test('should toggle lock state when enabled toggles', () => {
      const { rerender } = renderHook(({ enabled }) => useScrollLock({ enabled }), {
        initialProps: { enabled: false },
      });

      expect(document.body.style.overflow).toBe('');

      rerender({ enabled: true });
      expect(document.body.style.overflow).toBe('hidden');

      rerender({ enabled: false });
      expect(document.body.style.overflow).toBe('');

      rerender({ enabled: true });
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useScrollLock());

      expect(result.current.isLocked).toBe(false);

      act(() => {
        result.current.lock();
      });
      expect(result.current.isLocked).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isLocked).toBe(false);
      expect(document.body.style.overflow).toBe('');

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isLocked).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        result.current.unlock();
      });
      expect(result.current.isLocked).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useScrollLock());

      expect(result.current).toHaveProperty('isLocked');
      expect(result.current).toHaveProperty('lock');
      expect(result.current).toHaveProperty('unlock');
      expect(result.current).toHaveProperty('toggle');

      expect(typeof result.current.isLocked).toBe('boolean');
      expect(typeof result.current.lock).toBe('function');
      expect(typeof result.current.unlock).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const { result, rerender } = renderHook(() => useScrollLock());

      const firstRender = {
        lock: result.current.lock,
        unlock: result.current.unlock,
        toggle: result.current.toggle,
      };

      // Force a re-render by locking
      act(() => {
        result.current.lock();
      });

      rerender();

      // Function references should remain the same
      expect(result.current.lock).toBe(firstRender.lock);
      expect(result.current.unlock).toBe(firstRender.unlock);
      expect(result.current.toggle).toBe(firstRender.toggle);
    });
  });

  describe('edge cases', () => {
    test('should handle rapid lock/unlock cycles', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
        result.current.unlock();
        result.current.lock();
        result.current.unlock();
        result.current.lock();
      });

      expect(result.current.isLocked).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');
    });

    test('should restore original styles when they were set before locking', () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '10px';

      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        result.current.unlock();
      });

      expect(document.body.style.overflow).toBe('auto');
      expect(document.body.style.paddingRight).toBe('10px');
    });

    test('should handle excessive unlock calls gracefully', () => {
      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(result.current.isLocked).toBe(true);

      act(() => {
        result.current.unlock();
        result.current.unlock();
        result.current.unlock();
      });

      expect(result.current.isLocked).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('scrollbar width calculation', () => {
    test('should calculate scrollbar width correctly', () => {
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1017,
      });

      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.paddingRight).toBe('17px');
    });

    test('should handle no scrollbar (same width)', () => {
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useScrollLock());

      act(() => {
        result.current.lock();
      });

      expect(document.body.style.paddingRight).toBe('');
    });
  });
});
