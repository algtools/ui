'use client';

import * as React from 'react';

/**
 * A custom hook that detects clicks outside of specified element(s).
 * Useful for implementing modals, dropdowns, popovers, and other overlay components.
 *
 * @param refs - A single ref or an array of refs to monitor
 * @param handler - Callback function to execute when a click outside is detected
 * @param enabled - Whether the hook is enabled (default: true)
 *
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = React.useState(false);
 *   const dropdownRef = React.useRef<HTMLDivElement>(null);
 *
 *   useOnClickOutside(dropdownRef, () => {
 *     setIsOpen(false);
 *   });
 *
 *   return (
 *     <div ref={dropdownRef}>
 *       <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
 *       {isOpen && <div>Dropdown content</div>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With multiple refs
 * function Modal() {
 *   const modalRef = React.useRef<HTMLDivElement>(null);
 *   const buttonRef = React.useRef<HTMLButtonElement>(null);
 *
 *   useOnClickOutside([modalRef, buttonRef], () => {
 *     console.log('Clicked outside modal and button');
 *   });
 *
 *   return (
 *     <>
 *       <button ref={buttonRef}>Open Modal</button>
 *       <div ref={modalRef}>Modal content</div>
 *     </>
 *   );
 * }
 * ```
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  refs: React.RefObject<T> | React.RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  const handlerRef = React.useRef(handler);

  // Update handler ref when handler changes to avoid stale closures
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      // Check if the click is inside any of the refs
      const isClickInside = refsArray.some((ref) => {
        const element = ref.current;
        if (!element) {
          return false;
        }

        const target = event.target as Node;
        return element === target || element.contains(target);
      });

      // If click is outside all refs, call the handler
      if (!isClickInside) {
        handlerRef.current(event);
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, enabled]);
}
