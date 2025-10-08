import { renderHook, act } from '@testing-library/react';

import { useBoolean } from '@/hooks/use-boolean';

describe('useBoolean', () => {
  describe('initialization', () => {
    test('should initialize with false by default', () => {
      const { result } = renderHook(() => useBoolean());
      expect(result.current.value).toBe(false);
    });

    test('should initialize with provided initial value (true)', () => {
      const { result } = renderHook(() => useBoolean(true));
      expect(result.current.value).toBe(true);
    });

    test('should initialize with provided initial value (false)', () => {
      const { result } = renderHook(() => useBoolean(false));
      expect(result.current.value).toBe(false);
    });
  });

  describe('setTrue', () => {
    test('should set value to true when called', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });

    test('should keep value true when already true', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useBoolean(false));
      const firstSetTrue = result.current.setTrue;

      rerender();

      expect(result.current.setTrue).toBe(firstSetTrue);
    });
  });

  describe('setFalse', () => {
    test('should set value to false when called', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });

    test('should keep value false when already false', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useBoolean(false));
      const firstSetFalse = result.current.setFalse;

      rerender();

      expect(result.current.setFalse).toBe(firstSetFalse);
    });
  });

  describe('toggle', () => {
    test('should toggle from false to true', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(true);
    });

    test('should toggle from true to false', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(false);
    });

    test('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useBoolean(false));

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
      const { result, rerender } = renderHook(() => useBoolean(false));
      const firstToggle = result.current.toggle;

      rerender();

      expect(result.current.toggle).toBe(firstToggle);
    });
  });

  describe('setValue', () => {
    test('should set value to true', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    test('should set value to false', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setValue(false);
      });

      expect(result.current.value).toBe(false);
    });

    test('should accept dynamic boolean values', () => {
      const { result } = renderHook(() => useBoolean(false));
      const shouldBeTrue = 1 + 1 === 2;

      act(() => {
        result.current.setValue(shouldBeTrue);
      });

      expect(result.current.value).toBe(true);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useBoolean(false));

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
      const { result } = renderHook(() => useBoolean());

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
      const { result, rerender } = renderHook(() => useBoolean(false));

      const firstRender = {
        setTrue: result.current.setTrue,
        setFalse: result.current.setFalse,
        toggle: result.current.toggle,
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
    });
  });
});
