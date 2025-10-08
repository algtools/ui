'use client';

import * as React from 'react';

/**
 * Options for configuring the useHover hook behavior
 */
export interface UseHoverOptions {
  /**
   * Delay in milliseconds before the hover state becomes true
   * @default 0
   */
  delayEnter?: number;
  /**
   * Delay in milliseconds before the hover state becomes false
   * @default 0
   */
  delayLeave?: number;
}

/**
 * A custom hook for detecting hover state on elements with optional delay support.
 * Tracks mouseenter and mouseleave events to determine if an element is being hovered.
 *
 * @param ref - A ref to the element to monitor for hover state
 * @param options - Optional configuration for hover behavior
 * @returns The current hover state (true when hovering, false otherwise)
 *
 * @example
 * ```tsx
 * function HoverCard() {
 *   const cardRef = React.useRef<HTMLDivElement>(null);
 *   const isHovered = useHover(cardRef);
 *
 *   return (
 *     <div ref={cardRef}>
 *       {isHovered ? 'Hovering!' : 'Not hovering'}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With delay - useful for tooltips
 * function TooltipTrigger() {
 *   const triggerRef = React.useRef<HTMLDivElement>(null);
 *   const isHovered = useHover(triggerRef, { delayEnter: 300, delayLeave: 100 });
 *
 *   return (
 *     <div ref={triggerRef}>
 *       Hover me
 *       {isHovered && <Tooltip>I'm a tooltip!</Tooltip>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useHover<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  options: UseHoverOptions = {}
): boolean {
  const { delayEnter = 0, delayLeave = 0 } = options;
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const enterTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      // Clear any pending leave timeout
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      // Set hover state with optional delay
      if (delayEnter > 0) {
        enterTimeoutRef.current = setTimeout(() => {
          setIsHovered(true);
          enterTimeoutRef.current = null;
        }, delayEnter);
      } else {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      // Clear any pending enter timeout
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }

      // Unset hover state with optional delay
      if (delayLeave > 0) {
        leaveTimeoutRef.current = setTimeout(() => {
          setIsHovered(false);
          leaveTimeoutRef.current = null;
        }, delayLeave);
      } else {
        setIsHovered(false);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);

      // Clear any pending timeouts
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
    };
  }, [ref, delayEnter, delayLeave]);

  return isHovered;
}
