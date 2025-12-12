'use client';

import * as React from 'react';

/**
 * Options for configuring the useScrollLock hook
 */
export interface UseScrollLockOptions {
  /** Whether the scroll lock should be active (default: false) */
  enabled?: boolean;
  /** Whether to preserve scrollbar width to prevent layout shift (default: true) */
  preserveScrollbarWidth?: boolean;
}

/**
 * Return type for the useScrollLock hook
 */
export interface UseScrollLockReturn {
  /** Whether scroll is currently locked */
  isLocked: boolean;
  /** Lock body scroll */
  lock: () => void;
  /** Unlock body scroll */
  unlock: () => void;
  /** Toggle scroll lock state */
  toggle: () => void;
}

// Global counter to track nested scroll locks
let lockCount = 0;

// Store original body styles
const originalStyles: {
  overflow?: string;
  paddingRight?: string;
} = {};

/**
 * Gets the current scrollbar width
 * @returns The scrollbar width in pixels
 */
function getScrollbarWidth(): number {
  if (typeof document === 'undefined') return 0;

  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;
  return windowWidth - documentWidth;
}

/**
 * A custom hook for locking and unlocking body scroll, useful for modals and overlays.
 * Prevents scrolling on the body element while preserving scrollbar width to avoid layout shift.
 * Handles nested locks through a counter mechanism, ensuring scroll is only unlocked when all
 * locks are released.
 *
 * @param options - Configuration options for the scroll lock
 * @returns An object containing the lock state and control functions
 *
 * @example
 * ```tsx
 * function Modal({ isOpen }: { isOpen: boolean }) {
 *   const { isLocked, lock, unlock } = useScrollLock({ enabled: isOpen });
 *
 *   return isOpen ? (
 *     <div className="modal">
 *       <button onClick={unlock}>Close</button>
 *       Modal content
 *     </div>
 *   ) : null;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isLocked, toggle } = useScrollLock();
 *
 *   return (
 *     <button onClick={toggle}>
 *       {isLocked ? 'Unlock' : 'Lock'} Scroll
 *     </button>
 *   );
 * }
 * ```
 */
export function useScrollLock(options: UseScrollLockOptions = {}): UseScrollLockReturn {
  const { enabled = false, preserveScrollbarWidth = true } = options;

  const [isLocked, setIsLocked] = React.useState<boolean>(false);
  const instanceLockCountRef = React.useRef<number>(0);

  const lock = React.useCallback(() => {
    if (typeof document === 'undefined') return;

    // Store original styles on first lock
    if (lockCount === 0) {
      originalStyles.overflow = document.body.style.overflow;
      originalStyles.paddingRight = document.body.style.paddingRight;
    }

    lockCount++;
    instanceLockCountRef.current++;

    // Apply scroll lock
    document.body.style.overflow = 'hidden';

    // Preserve scrollbar width to prevent layout shift
    if (preserveScrollbarWidth) {
      const scrollbarWidth = getScrollbarWidth();
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    setIsLocked(true);
  }, [preserveScrollbarWidth]);

  const unlock = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    if (instanceLockCountRef.current === 0) return; // Not locked by this instance

    // Decrement lock counts
    lockCount = Math.max(0, lockCount - 1);
    instanceLockCountRef.current = Math.max(0, instanceLockCountRef.current - 1);

    // Only unlock if no more locks exist
    if (lockCount === 0) {
      // Restore original styles
      document.body.style.overflow = originalStyles.overflow || '';
      document.body.style.paddingRight = originalStyles.paddingRight || '';
    }

    // Update state based on instance lock count
    setIsLocked(instanceLockCountRef.current > 0);
  }, []);

  const toggle = React.useCallback(() => {
    if (instanceLockCountRef.current > 0) {
      unlock();
    } else {
      lock();
    }
  }, [lock, unlock]);

  // Handle enabled option
  React.useEffect(() => {
    if (enabled) {
      lock();
      return unlock;
    }
  }, [enabled, lock, unlock]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // Unlock all locks from this instance
      while (instanceLockCountRef.current > 0) {
        lockCount = Math.max(0, lockCount - 1);
        instanceLockCountRef.current--;
      }

      // Only restore styles if no more locks exist
      if (lockCount === 0 && typeof document !== 'undefined') {
        document.body.style.overflow = originalStyles.overflow || '';
        document.body.style.paddingRight = originalStyles.paddingRight || '';
      }
    };
  }, []);

  return React.useMemo(
    () => ({
      isLocked,
      lock,
      unlock,
      toggle,
    }),
    [isLocked, lock, unlock, toggle]
  );
}
