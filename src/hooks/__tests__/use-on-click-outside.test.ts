import { renderHook } from '@testing-library/react';
import React from 'react';

import { useOnClickOutside } from '@/hooks/use-on-click-outside';

describe('useOnClickOutside', () => {
  let container: HTMLDivElement;
  let insideElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    // Setup DOM elements for testing
    container = document.createElement('div');
    insideElement = document.createElement('div');
    outsideElement = document.createElement('div');

    container.appendChild(insideElement);
    document.body.appendChild(container);
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    // Cleanup DOM elements
    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  describe('single ref', () => {
    test('should call handler when clicking outside the element', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    test('should not call handler when clicking inside the element', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click inside
      const event = new MouseEvent('mousedown', { bubbles: true });
      insideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should not call handler when clicking on the element itself', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click on the element itself
      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', {
        value: insideElement,
        enumerable: true,
      });
      insideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should handle null ref gracefully', () => {
      const handler = jest.fn();
      // Use a plain object that matches RefObject structure
      const ref = { current: null } as unknown as React.RefObject<HTMLDivElement>;

      renderHook(() => useOnClickOutside(ref, handler));

      // Click anywhere
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      // Handler should be called since ref is null (no element to check)
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('multiple refs', () => {
    test('should call handler when clicking outside all elements', () => {
      const handler = jest.fn();
      const secondElement = document.createElement('div');
      container.appendChild(secondElement);

      const refs = [
        { current: insideElement },
        { current: secondElement },
      ];

      renderHook(() => useOnClickOutside(refs, handler));

      // Click outside all elements
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should not call handler when clicking inside first element', () => {
      const handler = jest.fn();
      const secondElement = document.createElement('div');
      container.appendChild(secondElement);

      const refs = [
        { current: insideElement },
        { current: secondElement },
      ];

      renderHook(() => useOnClickOutside(refs, handler));

      // Click inside first element
      const event = new MouseEvent('mousedown', { bubbles: true });
      insideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should not call handler when clicking inside second element', () => {
      const handler = jest.fn();
      const secondElement = document.createElement('div');
      container.appendChild(secondElement);

      const refs = [
        { current: insideElement },
        { current: secondElement },
      ];

      renderHook(() => useOnClickOutside(refs, handler));

      // Click inside second element
      const event = new MouseEvent('mousedown', { bubbles: true });
      secondElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should handle array with null refs', () => {
      const handler = jest.fn();
      const refs = [
        { current: insideElement },
        { current: null },
      ] as React.RefObject<HTMLDivElement>[];

      renderHook(() => useOnClickOutside(refs, handler));

      // Click inside the valid element
      const event = new MouseEvent('mousedown', { bubbles: true });
      insideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should handle empty array of refs', () => {
      const handler = jest.fn();
      const refs: React.RefObject<HTMLDivElement>[] = [];

      renderHook(() => useOnClickOutside(refs, handler));

      // Click anywhere
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      // Handler should be called since there are no refs to check
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('touch events', () => {
    test('should call handler on touchstart outside the element', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Touch outside
      const event = new TouchEvent('touchstart', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    test('should not call handler on touchstart inside the element', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Touch inside
      const event = new TouchEvent('touchstart', { bubbles: true });
      insideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('enabled parameter', () => {
    test('should call handler when enabled is true (default)', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should call handler when enabled is explicitly true', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler, true));

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should not call handler when enabled is false', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler, false));

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should stop listening when enabled changes to false', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      const { rerender } = renderHook(
        ({ enabled }) => useOnClickOutside(ref, handler, enabled),
        { initialProps: { enabled: true } }
      );

      // Click outside while enabled
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event1);
      expect(handler).toHaveBeenCalledTimes(1);

      // Disable the hook
      rerender({ enabled: false });

      // Click outside while disabled
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event2);
      expect(handler).toHaveBeenCalledTimes(1); // Should still be 1
    });

    test('should start listening when enabled changes to true', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      const { rerender } = renderHook(
        ({ enabled }) => useOnClickOutside(ref, handler, enabled),
        { initialProps: { enabled: false } }
      );

      // Click outside while disabled
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event1);
      expect(handler).not.toHaveBeenCalled();

      // Enable the hook
      rerender({ enabled: true });

      // Click outside while enabled
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event2);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup', () => {
    test('should remove event listeners on unmount', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      const { unmount } = renderHook(() => useOnClickOutside(ref, handler));

      // Unmount the hook
      unmount();

      // Click outside after unmount
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      // Handler should not be called
      expect(handler).not.toHaveBeenCalled();
    });

    test('should not cause memory leaks with multiple mount/unmount cycles', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      // Mount and unmount multiple times
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() => useOnClickOutside(ref, handler));
        unmount();
      }

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      // Handler should not be called
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('handler updates', () => {
    test('should use updated handler on subsequent clicks', () => {
      const firstHandler = jest.fn();
      const secondHandler = jest.fn();
      const ref = { current: insideElement };

      const { rerender } = renderHook(
        ({ handler }) => useOnClickOutside(ref, handler),
        { initialProps: { handler: firstHandler } }
      );

      // Click outside with first handler
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event1);
      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).not.toHaveBeenCalled();

      // Update handler
      rerender({ handler: secondHandler });

      // Click outside with second handler
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event2);
      expect(firstHandler).toHaveBeenCalledTimes(1); // Still 1
      expect(secondHandler).toHaveBeenCalledTimes(1);
    });

    test('should not re-attach listeners when only handler changes', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      const firstHandler = jest.fn();
      const secondHandler = jest.fn();
      const ref = { current: insideElement };

      const { rerender } = renderHook(
        ({ handler }) => useOnClickOutside(ref, handler),
        { initialProps: { handler: firstHandler } }
      );

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
  });

  describe('nested elements', () => {
    test('should not call handler when clicking on nested child element', () => {
      const handler = jest.fn();
      const childElement = document.createElement('span');
      insideElement.appendChild(childElement);

      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click on nested child
      const event = new MouseEvent('mousedown', { bubbles: true });
      childElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    test('should not call handler when clicking on deeply nested element', () => {
      const handler = jest.fn();
      const level1 = document.createElement('div');
      const level2 = document.createElement('div');
      const level3 = document.createElement('span');
      
      insideElement.appendChild(level1);
      level1.appendChild(level2);
      level2.appendChild(level3);

      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click on deeply nested element
      const event = new MouseEvent('mousedown', { bubbles: true });
      level3.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple clicks in sequence', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click outside
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event1);
      expect(handler).toHaveBeenCalledTimes(1);

      // Click inside
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      insideElement.dispatchEvent(event2);
      expect(handler).toHaveBeenCalledTimes(1); // Still 1

      // Click outside again
      const event3 = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event3);
      expect(handler).toHaveBeenCalledTimes(2);
    });

    test('should work with both mouse and touch events in sequence', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Mouse event outside
      const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(mouseEvent);
      expect(handler).toHaveBeenCalledTimes(1);

      // Touch event outside
      const touchEvent = new TouchEvent('touchstart', { bubbles: true });
      outsideElement.dispatchEvent(touchEvent);
      expect(handler).toHaveBeenCalledTimes(2);
    });
  });

  describe('edge cases', () => {
    test('should handle ref changing from null to element', () => {
      const handler = jest.fn();
      // Create a mutable ref object
      const ref: { current: HTMLDivElement | null } = { current: null };

      const { rerender } = renderHook(
        ({ currentRef }) => useOnClickOutside(currentRef as React.RefObject<HTMLDivElement>, handler),
        { initialProps: { currentRef: ref } }
      );

      // Set the ref to an element
      ref.current = insideElement;
      rerender({ currentRef: ref });

      // Click outside
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should handle document body clicks', () => {
      const handler = jest.fn();
      const ref = { current: insideElement };

      renderHook(() => useOnClickOutside(ref, handler));

      // Click on document body
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
