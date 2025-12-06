import { renderHook } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

import { useClickAnyWhere } from '@/hooks/use-click-anywhere';

describe('useClickAnyWhere', () => {
  let testElement: HTMLDivElement;

  beforeEach(() => {
    // Setup a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    // Cleanup
    document.body.removeChild(testElement);
  });

  describe('mouse events', () => {
    test('should call handler on mousedown anywhere', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Click on test element
      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    test('should call handler on mousedown on document body', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Click on body
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    test('should call handler on mousedown on document', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Click on document
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should call handler multiple times for multiple clicks', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // First click
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event1);

      // Second click
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event2);

      // Third click
      const event3 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event3);

      expect(handler).toHaveBeenCalledTimes(3);
    });
  });

  describe('touch events', () => {
    test('should call handler on touchstart anywhere', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Touch on test element
      const event = new TouchEvent('touchstart', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    test('should call handler on touchstart on document body', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Touch on body
      const event = new TouchEvent('touchstart', { bubbles: true });
      document.body.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should call handler multiple times for multiple touches', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // First touch
      const event1 = new TouchEvent('touchstart', { bubbles: true });
      testElement.dispatchEvent(event1);

      // Second touch
      const event2 = new TouchEvent('touchstart', { bubbles: true });
      document.body.dispatchEvent(event2);

      expect(handler).toHaveBeenCalledTimes(2);
    });
  });

  describe('mixed events', () => {
    test('should handle both mouse and touch events', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      // Mouse event
      const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(mouseEvent);

      // Touch event
      const touchEvent = new TouchEvent('touchstart', { bubbles: true });
      document.body.dispatchEvent(touchEvent);

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(1, mouseEvent);
      expect(handler).toHaveBeenNthCalledWith(2, touchEvent);
    });
  });

  describe('enabled parameter', () => {
    test('should call handler when enabled is true (default)', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should call handler when enabled is explicitly true', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler, true));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should not call handler when enabled is false', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler, false));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should stop listening when enabled changes to false', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(({ enabled }) => useClickAnyWhere(handler, enabled), {
        initialProps: { enabled: true },
      });

      // Click while enabled
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event1);
      expect(handler).toHaveBeenCalledTimes(1);

      // Disable the hook
      rerender({ enabled: false });

      // Click while disabled
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event2);
      expect(handler).toHaveBeenCalledTimes(1); // Should still be 1
    });

    test('should start listening when enabled changes to true', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(({ enabled }) => useClickAnyWhere(handler, enabled), {
        initialProps: { enabled: false },
      });

      // Click while disabled
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event1);
      expect(handler).not.toHaveBeenCalled();

      // Enable the hook
      rerender({ enabled: true });

      // Click while enabled
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event2);
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple enable/disable toggles', () => {
      const handler = vi.fn();

      const { rerender } = renderHook(({ enabled }) => useClickAnyWhere(handler, enabled), {
        initialProps: { enabled: true },
      });

      // Click while enabled
      testElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Disable
      rerender({ enabled: false });
      testElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Enable again
      rerender({ enabled: true });
      testElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(2);

      // Disable again
      rerender({ enabled: false });
      testElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(2);
    });
  });

  describe('cleanup', () => {
    test('should remove event listeners on unmount', () => {
      const handler = vi.fn();

      const { unmount } = renderHook(() => useClickAnyWhere(handler));

      // Unmount the hook
      unmount();

      // Click after unmount
      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      // Handler should not be called
      expect(handler).not.toHaveBeenCalled();
    });

    test('should not cause memory leaks with multiple mount/unmount cycles', () => {
      const handler = vi.fn();

      // Mount and unmount multiple times
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() => useClickAnyWhere(handler));
        unmount();
      }

      // Click after all unmounts
      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      // Handler should not be called
      expect(handler).not.toHaveBeenCalled();
    });

    test('should cleanup both mouse and touch listeners on unmount', () => {
      const handler = vi.fn();

      const { unmount } = renderHook(() => useClickAnyWhere(handler));

      unmount();

      // Try both event types after unmount
      const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
      const touchEvent = new TouchEvent('touchstart', { bubbles: true });
      testElement.dispatchEvent(mouseEvent);
      testElement.dispatchEvent(touchEvent);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('handler updates', () => {
    test('should use updated handler on subsequent clicks', () => {
      const firstHandler = vi.fn();
      const secondHandler = vi.fn();

      const { rerender } = renderHook(({ handler }) => useClickAnyWhere(handler), {
        initialProps: { handler: firstHandler },
      });

      // Click with first handler
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event1);
      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).not.toHaveBeenCalled();

      // Update handler
      rerender({ handler: secondHandler });

      // Click with second handler
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event2);
      expect(firstHandler).toHaveBeenCalledTimes(1); // Still 1
      expect(secondHandler).toHaveBeenCalledTimes(1);
    });

    test('should not re-attach listeners when only handler changes', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const firstHandler = vi.fn();
      const secondHandler = vi.fn();

      const { rerender } = renderHook(({ handler }) => useClickAnyWhere(handler), {
        initialProps: { handler: firstHandler },
      });

      const initialAddCount = addEventListenerSpy.mock.calls.length;
      const initialRemoveCount = removeEventListenerSpy.mock.calls.length;

      // Update handler
      rerender({ handler: secondHandler });

      // Event listeners should not be re-attached
      expect(addEventListenerSpy.mock.calls.length).toBe(initialAddCount);
      expect(removeEventListenerSpy.mock.calls.length).toBe(initialRemoveCount);

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    test('should handle rapid handler updates', () => {
      const handlers = [vi.fn(), vi.fn(), vi.fn()];

      const { rerender } = renderHook(({ handler }) => useClickAnyWhere(handler), {
        initialProps: { handler: handlers[0] },
      });

      // Update handlers rapidly
      rerender({ handler: handlers[1] });
      rerender({ handler: handlers[2] });

      // Only the last handler should be called
      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handlers[0]).not.toHaveBeenCalled();
      expect(handlers[1]).not.toHaveBeenCalled();
      expect(handlers[2]).toHaveBeenCalledTimes(1);
    });
  });

  describe('event details', () => {
    test('should pass event with correct properties to handler', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      const event = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: 100,
        clientY: 200,
      });
      testElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent));
      const calledEvent = handler.mock.calls[0][0] as MouseEvent;
      expect(calledEvent.type).toBe('mousedown');
      expect(calledEvent.clientX).toBe(100);
      expect(calledEvent.clientY).toBe(200);
    });

    test('should handle event with target information', () => {
      const handler = vi.fn();

      renderHook(() => useClickAnyWhere(handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      const calledEvent = handler.mock.calls[0][0] as MouseEvent;
      expect(calledEvent.target).toBe(testElement);
    });
  });

  describe('nested elements', () => {
    test('should call handler for clicks on nested elements', () => {
      const handler = vi.fn();
      const childElement = document.createElement('span');
      testElement.appendChild(childElement);

      renderHook(() => useClickAnyWhere(handler));

      // Click on nested child
      const event = new MouseEvent('mousedown', { bubbles: true });
      childElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should call handler for clicks on deeply nested elements', () => {
      const handler = vi.fn();
      const level1 = document.createElement('div');
      const level2 = document.createElement('div');
      const level3 = document.createElement('span');

      testElement.appendChild(level1);
      level1.appendChild(level2);
      level2.appendChild(level3);

      renderHook(() => useClickAnyWhere(handler));

      // Click on deeply nested element
      const event = new MouseEvent('mousedown', { bubbles: true });
      level3.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('multiple instances', () => {
    test('should support multiple independent instances', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      renderHook(() => useClickAnyWhere(handler1));
      renderHook(() => useClickAnyWhere(handler2));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      // Both handlers should be called
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple instances with different enabled states', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      renderHook(() => useClickAnyWhere(handler1, true));
      renderHook(() => useClickAnyWhere(handler2, false));

      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    test('should handle clicks on window-created elements', () => {
      const handler = vi.fn();
      const newElement = document.createElement('button');
      document.body.appendChild(newElement);

      renderHook(() => useClickAnyWhere(handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      newElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);

      document.body.removeChild(newElement);
    });

    test('should work with disabled state toggling during cleanup', () => {
      const handler = vi.fn();

      const { rerender, unmount } = renderHook(
        ({ enabled }) => useClickAnyWhere(handler, enabled),
        {
          initialProps: { enabled: true },
        }
      );

      // Disable before unmounting
      rerender({ enabled: false });
      unmount();

      // Click after unmount
      const event = new MouseEvent('mousedown', { bubbles: true });
      testElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
