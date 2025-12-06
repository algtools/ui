import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useToggle } from '@/hooks/use-toggle';

describe('useToggle', () => {
  describe('initialization', () => {
    test('should initialize with false by default', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current.value).toBe(false);
    });

    test('should initialize with provided initial value (true)', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current.value).toBe(true);
    });

    test('should initialize with provided initial value (false)', () => {
      const { result } = renderHook(() => useToggle(false));
      expect(result.current.value).toBe(false);
    });
  });

  describe('setTrue', () => {
    test('should set value to true when called', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });

    test('should keep value true when already true', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useToggle(false));
      const firstSetTrue = result.current.setTrue;

      rerender();

      expect(result.current.setTrue).toBe(firstSetTrue);
    });
  });

  describe('setFalse', () => {
    test('should set value to false when called', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });

    test('should keep value false when already false', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useToggle(false));
      const firstSetFalse = result.current.setFalse;

      rerender();

      expect(result.current.setFalse).toBe(firstSetFalse);
    });
  });

  describe('toggle', () => {
    test('should toggle from false to true', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(true);
    });

    test('should toggle from true to false', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(false);
    });

    test('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useToggle(false));
      const firstToggle = result.current.toggle;

      rerender();

      expect(result.current.toggle).toBe(firstToggle);
    });
  });

  describe('setValue', () => {
    test('should set value to true', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    test('should set value to false', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current.setValue(false);
      });

      expect(result.current.value).toBe(false);
    });

    test('should accept dynamic boolean values', () => {
      const { result } = renderHook(() => useToggle(false));
      const shouldBeTrue = 1 + 1 === 2;

      act(() => {
        result.current.setValue(shouldBeTrue);
      });

      expect(result.current.value).toBe(true);
    });
  });

  describe('callbacks', () => {
    test('should call onToggleOn when toggled to true', () => {
      const onToggleOn = vi.fn();
      const { result } = renderHook(() => useToggle(false, { onToggleOn }));

      act(() => {
        result.current.toggle();
      });

      expect(onToggleOn).toHaveBeenCalledTimes(1);
    });

    test('should call onToggleOff when toggled to false', () => {
      const onToggleOff = vi.fn();
      const { result } = renderHook(() => useToggle(true, { onToggleOff }));

      act(() => {
        result.current.toggle();
      });

      expect(onToggleOff).toHaveBeenCalledTimes(1);
    });

    test('should call onChange on any state change', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useToggle(false, { onChange }));

      act(() => {
        result.current.toggle();
      });

      expect(onChange).toHaveBeenCalledWith(true);

      act(() => {
        result.current.toggle();
      });

      expect(onChange).toHaveBeenCalledWith(false);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    test('should call onToggleOn when setTrue is called', () => {
      const onToggleOn = vi.fn();
      const { result } = renderHook(() => useToggle(false, { onToggleOn }));

      act(() => {
        result.current.setTrue();
      });

      expect(onToggleOn).toHaveBeenCalledTimes(1);
    });

    test('should call onToggleOff when setFalse is called', () => {
      const onToggleOff = vi.fn();
      const { result } = renderHook(() => useToggle(true, { onToggleOff }));

      act(() => {
        result.current.setFalse();
      });

      expect(onToggleOff).toHaveBeenCalledTimes(1);
    });

    test('should not call callbacks when value does not change', () => {
      const onToggleOn = vi.fn();
      const onChange = vi.fn();
      const { result } = renderHook(() => useToggle(true, { onToggleOn, onChange }));

      act(() => {
        result.current.setTrue();
      });

      expect(onToggleOn).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    test('should work with all callbacks together', () => {
      const onToggleOn = vi.fn();
      const onToggleOff = vi.fn();
      const onChange = vi.fn();
      const { result } = renderHook(() => useToggle(false, { onToggleOn, onToggleOff, onChange }));

      act(() => {
        result.current.setTrue();
      });

      expect(onToggleOn).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
      expect(onToggleOff).not.toHaveBeenCalled();

      act(() => {
        result.current.setFalse();
      });

      expect(onToggleOff).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(false);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    test('should handle updated callbacks', () => {
      const onChange1 = vi.fn();
      const onChange2 = vi.fn();

      const { result, rerender } = renderHook(({ onChange }) => useToggle(false, { onChange }), {
        initialProps: { onChange: onChange1 },
      });

      act(() => {
        result.current.toggle();
      });

      expect(onChange1).toHaveBeenCalledWith(true);
      expect(onChange2).not.toHaveBeenCalled();

      rerender({ onChange: onChange2 });

      act(() => {
        result.current.toggle();
      });

      expect(onChange1).toHaveBeenCalledTimes(1);
      expect(onChange2).toHaveBeenCalledWith(false);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useToggle(false));

      expect(result.current.value).toBe(false);

      act(() => {
        result.current.setTrue();
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(false);

      act(() => {
        result.current.setValue(true);
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.setFalse();
      });
      expect(result.current.value).toBe(false);
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useToggle());

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('setTrue');
      expect(result.current).toHaveProperty('setFalse');
      expect(result.current).toHaveProperty('toggle');
      expect(result.current).toHaveProperty('setValue');

      expect(typeof result.current.value).toBe('boolean');
      expect(typeof result.current.setTrue).toBe('function');
      expect(typeof result.current.setFalse).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
      expect(typeof result.current.setValue).toBe('function');
    });
  });

  describe('performance', () => {
    test('should not cause unnecessary re-renders (stable function references)', () => {
      const { result, rerender } = renderHook(() => useToggle(false));

      const firstRender = {
        setTrue: result.current.setTrue,
        setFalse: result.current.setFalse,
        toggle: result.current.toggle,
        setValue: result.current.setValue,
      };

      // Force a re-render by toggling
      act(() => {
        result.current.toggle();
      });

      rerender();

      // Function references should remain the same
      expect(result.current.setTrue).toBe(firstRender.setTrue);
      expect(result.current.setFalse).toBe(firstRender.setFalse);
      expect(result.current.toggle).toBe(firstRender.toggle);
      expect(result.current.setValue).toBe(firstRender.setValue);
    });
  });
});
