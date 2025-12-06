import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';

import { useEventListener } from '@/hooks/use-event-listener';

describe('useEventListener', () => {
  describe('window events', () => {
    test('should attach listener to window by default', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'resize',
          handler,
        })
      );

      // Trigger window resize event
      window.dispatchEvent(new Event('resize'));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple event triggers', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'scroll',
          handler,
        })
      );

      // Trigger multiple times
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));

      expect(handler).toHaveBeenCalledTimes(3);
    });

    test('should receive event object', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
        })
      );

      const event = new MouseEvent('click', { bubbles: true });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalledWith(event);
    });
  });

  describe('document events', () => {
    test('should attach listener to document when specified', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'keydown',
          handler,
          element: document,
        })
      );

      // Trigger document keydown event
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle document click events', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element: document,
        })
      );

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('element events', () => {
    test('should attach listener to element ref', () => {
      const handler = vi.fn();
      const element = document.createElement('button');
      const ref = { current: element };

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element: ref,
        })
      );

      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should attach listener to direct element reference', () => {
      const handler = vi.fn();
      const element = document.createElement('div');

      renderHook(() =>
        useEventListener({
          eventName: 'mouseenter',
          handler,
          element,
        })
      );

      element.dispatchEvent(new MouseEvent('mouseenter'));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle null element ref gracefully', () => {
      const handler = vi.fn();
      const ref = { current: null };

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element: ref as React.RefObject<HTMLElement>,
        })
      );

      // Trigger window click (should not call handler since ref is null)
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).not.toHaveBeenCalled();
    });

    test('should handle changing element ref', () => {
      const handler = vi.fn();
      const element1 = document.createElement('button');
      const element2 = document.createElement('button');

      const ref1 = { current: element1 };
      const ref2 = { current: element2 };

      const { rerender } = renderHook(
        ({ elementRef }) =>
          useEventListener({
            eventName: 'click',
            handler,
            element: elementRef,
          }),
        { initialProps: { elementRef: ref1 } }
      );

      // Click on first element
      element1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Change to second ref
      rerender({ elementRef: ref2 });

      // Click on second element
      element2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(2);

      // Click on first element (should not trigger handler anymore)
      element1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(2); // Still 2
    });
  });

  describe('handler updates', () => {
    test('should use updated handler', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const { rerender } = renderHook(
        ({ handler }) =>
          useEventListener({
            eventName: 'click',
            handler,
          }),
        { initialProps: { handler: handler1 } }
      );

      // Trigger with first handler
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).not.toHaveBeenCalled();

      // Update handler
      rerender({ handler: handler2 });

      // Trigger with second handler
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler1).toHaveBeenCalledTimes(1); // Still 1
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    test('should use latest closure values', () => {
      const calls: number[] = [];

      const { rerender } = renderHook(
        ({ count }) =>
          useEventListener({
            eventName: 'click',
            handler: () => {
              calls.push(count);
            },
          }),
        { initialProps: { count: 1 } }
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(calls).toEqual([1]);

      rerender({ count: 2 });
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(calls).toEqual([1, 2]);

      rerender({ count: 3 });
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(calls).toEqual([1, 2, 3]);
    });
  });

  describe('event listener options', () => {
    test('should support capture option', () => {
      const handler = vi.fn();
      const element = document.createElement('div');

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element,
          options: { capture: true },
        })
      );

      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should support once option', () => {
      const handler = vi.fn();
      const element = document.createElement('button');

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element,
          options: { once: true },
        })
      );

      // First click
      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Second click (should not trigger due to once option)
      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1); // Still 1
    });

    test('should support passive option', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'scroll',
          handler,
          options: { passive: true },
        })
      );

      window.dispatchEvent(new Event('scroll'));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('enabled parameter', () => {
    test('should attach listener when enabled is true (default)', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
        })
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should attach listener when enabled is explicitly true', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          enabled: true,
        })
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should not attach listener when enabled is false', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          enabled: false,
        })
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).not.toHaveBeenCalled();
    });

    test('should detach listener when enabled changes to false', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(
        ({ enabled }) =>
          useEventListener({
            eventName: 'click',
            handler,
            enabled,
          }),
        { initialProps: { enabled: true } }
      );

      // Click while enabled
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Disable
      rerender({ enabled: false });

      // Click while disabled
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1); // Still 1
    });

    test('should attach listener when enabled changes to true', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(
        ({ enabled }) =>
          useEventListener({
            eventName: 'click',
            handler,
            enabled,
          }),
        { initialProps: { enabled: false } }
      );

      // Click while disabled
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).not.toHaveBeenCalled();

      // Enable
      rerender({ enabled: true });

      // Click while enabled
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup', () => {
    test('should remove listener on unmount', () => {
      const handler = vi.fn();

      const { unmount } = renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
        })
      );

      // Unmount
      unmount();

      // Click after unmount
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).not.toHaveBeenCalled();
    });

    test('should not cause memory leaks with multiple mount/unmount cycles', () => {
      const handler = vi.fn();

      // Mount and unmount multiple times
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() =>
          useEventListener({
            eventName: 'resize',
            handler,
          })
        );
        unmount();
      }

      // Trigger event
      window.dispatchEvent(new Event('resize'));

      expect(handler).not.toHaveBeenCalled();
    });

    test('should clean up element listeners correctly', () => {
      const handler = vi.fn();
      const element = document.createElement('button');
      const ref = { current: element };

      const { unmount } = renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler,
          element: ref,
        })
      );

      unmount();

      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('event name changes', () => {
    test('should handle event name changes', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(
        ({ eventName }) =>
          useEventListener({
            eventName,
            handler,
          }),
        { initialProps: { eventName: 'click' as const } }
      );

      // Trigger click event
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Change to resize event
      rerender({ eventName: 'resize' as const });

      // Trigger click (should not call handler)
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1); // Still 1

      // Trigger resize (should call handler)
      window.dispatchEvent(new Event('resize'));
      expect(handler).toHaveBeenCalledTimes(2);
    });
  });

  describe('multiple instances', () => {
    test('should support multiple independent listeners', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler: handler1,
        })
      );

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler: handler2,
        })
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    test('should support same event on different elements', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const element1 = document.createElement('button');
      const element2 = document.createElement('div');

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler: handler1,
          element: element1,
        })
      );

      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler: handler2,
          element: element2,
        })
      );

      // Click element1
      element1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).not.toHaveBeenCalled();

      // Click element2
      element2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });

  describe('integration', () => {
    test('should work in a realistic component scenario', () => {
      const clickHandler = vi.fn();
      const keyHandler = vi.fn();

      renderHook(() => {
        useEventListener({
          eventName: 'click',
          handler: clickHandler,
        });

        useEventListener({
          eventName: 'keydown',
          handler: keyHandler,
          element: document,
        });
      });

      // Simulate user interactions
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(keyHandler).toHaveBeenCalledTimes(1);
    });

    test('should work with dynamic element creation', () => {
      const handler = vi.fn();
      const ref1 = { current: null };
      let element: HTMLButtonElement | null = null;

      const { rerender } = renderHook(
        ({ elementRef }) =>
          useEventListener({
            eventName: 'click',
            handler,
            element: elementRef as React.RefObject<HTMLButtonElement>,
          }),
        { initialProps: { elementRef: ref1 } }
      );

      // Try to click (element doesn't exist yet)
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).not.toHaveBeenCalled();

      // Create element and new ref
      element = document.createElement('button');
      const ref2 = { current: element };
      rerender({ elementRef: ref2 });

      // Now clicking should work
      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    test('should handle rapid enable/disable toggles', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(
        ({ enabled }) =>
          useEventListener({
            eventName: 'click',
            handler,
            enabled,
          }),
        { initialProps: { enabled: false } }
      );

      // Rapidly toggle enabled state - alternating false/true
      // After 10 toggles starting from false, we end at true
      for (let i = 0; i < 10; i++) {
        rerender({ enabled: i % 2 === 1 });
      }

      // Do one final rerender to ensure we're at enabled: true
      rerender({ enabled: true });

      // Final state is enabled
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle custom events', () => {
      const handler = vi.fn();

      renderHook(() =>
        useEventListener({
          eventName: 'customEvent' as keyof GlobalEventHandlersEventMap,
          handler,
        })
      );

      window.dispatchEvent(new CustomEvent('customEvent', { detail: 'test' }));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
