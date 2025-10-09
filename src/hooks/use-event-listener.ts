'use client';

import * as React from 'react';

import { useEventCallback } from './use-event-callback';

/**
 * Window event map for type safety
 */
type WindowEventMap = GlobalEventHandlersEventMap;

/**
 * Document event map for type safety
 */
type DocumentEventMap = DocumentEventMap;

/**
 * Element event map for type safety
 */
type ElementEventMap = HTMLElementEventMap;

/**
 * Options for configuring the event listener
 */
export interface UseEventListenerOptions<
  T extends HTMLElement | Window | Document = HTMLElement,
  K extends string = string,
> {
  /** The event name to listen for */
  eventName: K;
  /** The event handler callback */
  handler: (
    event: T extends Window
      ? K extends keyof WindowEventMap
        ? WindowEventMap[K]
        : Event
      : T extends Document
        ? K extends keyof DocumentEventMap
          ? DocumentEventMap[K]
          : Event
        : T extends HTMLElement
          ? K extends keyof ElementEventMap
            ? ElementEventMap[K]
            : Event
          : Event
  ) => void;
  /** The element to attach the listener to (defaults to window) */
  element?: React.RefObject<T> | T | null;
  /** Additional event listener options */
  options?: boolean | AddEventListenerOptions;
  /** Whether the listener is enabled (defaults to true) */
  enabled?: boolean;
}

/**
 * A custom hook that attaches and manages event listeners on DOM elements, window, or document.
 * Automatically handles cleanup and updates when the handler changes without re-attaching the listener.
 *
 * @template T - The type of element (HTMLElement, Window, or Document)
 * @template K - The event name type
 * @param options - Configuration options for the event listener
 *
 * @example
 * ```tsx
 * // Listen to window resize events
 * function WindowSize() {
 *   const [size, setSize] = React.useState({ width: 0, height: 0 });
 *
 *   useEventListener({
 *     eventName: 'resize',
 *     handler: () => {
 *       setSize({
 *         width: window.innerWidth,
 *         height: window.innerHeight,
 *       });
 *     },
 *   });
 *
 *   return <div>Window: {size.width} x {size.height}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Listen to click events on a specific element
 * function ClickTracker() {
 *   const buttonRef = React.useRef<HTMLButtonElement>(null);
 *   const [clicks, setClicks] = React.useState(0);
 *
 *   useEventListener({
 *     eventName: 'click',
 *     handler: () => setClicks((c) => c + 1),
 *     element: buttonRef,
 *   });
 *
 *   return (
 *     <div>
 *       <button ref={buttonRef}>Click me</button>
 *       <p>Clicks: {clicks}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Listen to document keydown events with options
 * function KeyboardShortcuts() {
 *   useEventListener({
 *     eventName: 'keydown',
 *     handler: (event) => {
 *       if (event.key === 'Escape') {
 *         console.log('Escape pressed');
 *       }
 *     },
 *     element: document,
 *     options: { capture: true },
 *   });
 *
 *   return <div>Press Escape to trigger the handler</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditionally enable/disable the listener
 * function ConditionalListener() {
 *   const [enabled, setEnabled] = React.useState(true);
 *
 *   useEventListener({
 *     eventName: 'mousemove',
 *     handler: (event) => {
 *       console.log('Mouse moved:', event.clientX, event.clientY);
 *     },
 *     enabled,
 *   });
 *
 *   return (
 *     <button onClick={() => setEnabled(!enabled)}>
 *       {enabled ? 'Disable' : 'Enable'} Tracking
 *     </button>
 *   );
 * }
 * ```
 */
export function useEventListener<
  T extends HTMLElement | Window | Document = Window,
  K extends T extends Window
    ? keyof WindowEventMap
    : T extends Document
      ? keyof DocumentEventMap
      : T extends HTMLElement
        ? keyof ElementEventMap
        : never = T extends Window
    ? keyof WindowEventMap
    : T extends Document
      ? keyof DocumentEventMap
      : T extends HTMLElement
        ? keyof ElementEventMap
        : never,
>({
  eventName,
  handler,
  element,
  options,
  enabled = true,
}: UseEventListenerOptions<T, K & string>): void {
  // Create a stable callback reference that always calls the latest handler
  const savedHandler = useEventCallback(handler);

  React.useEffect(() => {
    // If not enabled, don't attach listener
    if (!enabled) {
      return;
    }

    // Define the target element (defaults to window)
    let targetElement: T | Window | Document | null = null;

    if (element === undefined || element === null) {
      // Default to window if no element provided
      targetElement = window as unknown as T;
    } else if ('current' in element) {
      // It's a ref object
      targetElement = element.current;
    } else {
      // It's a direct element reference
      targetElement = element;
    }

    // Don't attach if element doesn't exist
    if (!targetElement) {
      return;
    }

    // Verify that the target supports addEventListener
    if (!('addEventListener' in targetElement)) {
      return;
    }

    // Add event listener
    (targetElement as unknown as HTMLElement).addEventListener(
      eventName as string,
      savedHandler as EventListener,
      options
    );

    // Cleanup function - remove event listener
    return () => {
      (targetElement as unknown as HTMLElement).removeEventListener(
        eventName as string,
        savedHandler as EventListener,
        options
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    eventName,
    element,
    // For ref objects, we need to track the current value to re-run the effect
    'current' in (element || {}) ? (element as React.RefObject<T>).current : element,
    savedHandler,
    options,
    enabled,
  ]);
}
