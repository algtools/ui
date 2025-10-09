import { renderHook, act } from '@testing-library/react';

import { useStep } from '@/hooks/use-step';

describe('useStep', () => {
  describe('initialization', () => {
    test('should initialize with step 0 by default', () => {
      const { result } = renderHook(() => useStep());
      expect(result.current.currentStep).toBe(0);
    });

    test('should initialize with provided initial step', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3 }));
      expect(result.current.currentStep).toBe(3);
    });

    test('should clamp initial step to maxStep', () => {
      const { result } = renderHook(() => useStep({ initialStep: 10, maxStep: 5 }));
      expect(result.current.currentStep).toBe(5);
    });

    test('should clamp negative initial step to 0', () => {
      const { result } = renderHook(() => useStep({ initialStep: -5 }));
      expect(result.current.currentStep).toBe(0);
    });
  });

  describe('goToNextStep', () => {
    test('should go to next step', () => {
      const { result } = renderHook(() => useStep({ maxStep: 5 }));

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.currentStep).toBe(1);
    });

    test('should not exceed maxStep', () => {
      const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 5 }));

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.currentStep).toBe(5);
    });

    test('should go to next step multiple times', () => {
      const { result } = renderHook(() => useStep({ maxStep: 10 }));

      act(() => {
        result.current.goToNextStep();
        result.current.goToNextStep();
        result.current.goToNextStep();
      });

      expect(result.current.currentStep).toBe(3);
    });

    test('should wrap to 0 when circular is true and at maxStep', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 3, circular: true }));

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.currentStep).toBe(0);
    });
  });

  describe('goToPreviousStep', () => {
    test('should go to previous step', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 5 }));

      act(() => {
        result.current.goToPreviousStep();
      });

      expect(result.current.currentStep).toBe(2);
    });

    test('should not go below 0', () => {
      const { result } = renderHook(() => useStep({ initialStep: 0, maxStep: 5 }));

      act(() => {
        result.current.goToPreviousStep();
      });

      expect(result.current.currentStep).toBe(0);
    });

    test('should go to previous step multiple times', () => {
      const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 10 }));

      act(() => {
        result.current.goToPreviousStep();
        result.current.goToPreviousStep();
        result.current.goToPreviousStep();
      });

      expect(result.current.currentStep).toBe(2);
    });

    test('should wrap to maxStep when circular is true and at 0', () => {
      const { result } = renderHook(() => useStep({ initialStep: 0, maxStep: 5, circular: true }));

      act(() => {
        result.current.goToPreviousStep();
      });

      expect(result.current.currentStep).toBe(5);
    });
  });

  describe('goToStep', () => {
    test('should go to specific step', () => {
      const { result } = renderHook(() => useStep({ maxStep: 10 }));

      act(() => {
        result.current.goToStep(5);
      });

      expect(result.current.currentStep).toBe(5);
    });

    test('should clamp to maxStep', () => {
      const { result } = renderHook(() => useStep({ maxStep: 5 }));

      act(() => {
        result.current.goToStep(10);
      });

      expect(result.current.currentStep).toBe(5);
    });

    test('should clamp to 0 for negative values', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 10 }));

      act(() => {
        result.current.goToStep(-5);
      });

      expect(result.current.currentStep).toBe(0);
    });

    test('should handle going to same step', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 10 }));

      act(() => {
        result.current.goToStep(3);
      });

      expect(result.current.currentStep).toBe(3);
    });
  });

  describe('reset', () => {
    test('should reset to initial step', () => {
      const { result } = renderHook(() => useStep({ initialStep: 2, maxStep: 10 }));

      act(() => {
        result.current.goToStep(7);
      });
      expect(result.current.currentStep).toBe(7);

      act(() => {
        result.current.reset();
      });
      expect(result.current.currentStep).toBe(2);
    });

    test('should reset to 0 if no initial step provided', () => {
      const { result } = renderHook(() => useStep({ maxStep: 10 }));

      act(() => {
        result.current.goToStep(5);
      });
      expect(result.current.currentStep).toBe(5);

      act(() => {
        result.current.reset();
      });
      expect(result.current.currentStep).toBe(0);
    });

    test('should reset to clamped initial step', () => {
      const { result } = renderHook(() => useStep({ initialStep: 10, maxStep: 5 }));

      expect(result.current.currentStep).toBe(5);

      act(() => {
        result.current.goToStep(2);
      });
      expect(result.current.currentStep).toBe(2);

      act(() => {
        result.current.reset();
      });
      expect(result.current.currentStep).toBe(5);
    });
  });

  describe('setMaxStep', () => {
    test('should update maxStep', () => {
      const { result } = renderHook(() => useStep({ maxStep: 5 }));

      act(() => {
        result.current.setMaxStep(10);
      });

      act(() => {
        result.current.goToStep(8);
      });

      expect(result.current.currentStep).toBe(8);
    });

    test('should clamp current step if new maxStep is lower', () => {
      const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 10 }));

      expect(result.current.currentStep).toBe(5);

      act(() => {
        result.current.setMaxStep(3);
      });

      expect(result.current.currentStep).toBe(3);
    });

    test('should not affect current step if it is within new maxStep', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 5 }));

      act(() => {
        result.current.setMaxStep(10);
      });

      expect(result.current.currentStep).toBe(3);
    });
  });

  describe('state flags', () => {
    describe('isFirstStep', () => {
      test('should be true when at step 0', () => {
        const { result } = renderHook(() => useStep({ maxStep: 5 }));
        expect(result.current.isFirstStep).toBe(true);
      });

      test('should be false when not at step 0', () => {
        const { result } = renderHook(() => useStep({ initialStep: 2, maxStep: 5 }));
        expect(result.current.isFirstStep).toBe(false);
      });

      test('should update when step changes', () => {
        const { result } = renderHook(() => useStep({ maxStep: 5 }));

        expect(result.current.isFirstStep).toBe(true);

        act(() => {
          result.current.goToNextStep();
        });

        expect(result.current.isFirstStep).toBe(false);
      });
    });

    describe('isLastStep', () => {
      test('should be true when at maxStep', () => {
        const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 5 }));
        expect(result.current.isLastStep).toBe(true);
      });

      test('should be false when not at maxStep', () => {
        const { result } = renderHook(() => useStep({ initialStep: 2, maxStep: 5 }));
        expect(result.current.isLastStep).toBe(false);
      });

      test('should update when step changes', () => {
        const { result } = renderHook(() => useStep({ initialStep: 4, maxStep: 5 }));

        expect(result.current.isLastStep).toBe(false);

        act(() => {
          result.current.goToNextStep();
        });

        expect(result.current.isLastStep).toBe(true);
      });
    });

    describe('canGoToNext', () => {
      test('should be true when not at maxStep', () => {
        const { result } = renderHook(() => useStep({ initialStep: 2, maxStep: 5 }));
        expect(result.current.canGoToNext).toBe(true);
      });

      test('should be false when at maxStep and not circular', () => {
        const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 5 }));
        expect(result.current.canGoToNext).toBe(false);
      });

      test('should be true when at maxStep and circular', () => {
        const { result } = renderHook(() => useStep({ initialStep: 5, maxStep: 5, circular: true }));
        expect(result.current.canGoToNext).toBe(true);
      });
    });

    describe('canGoToPrevious', () => {
      test('should be true when not at step 0', () => {
        const { result } = renderHook(() => useStep({ initialStep: 2, maxStep: 5 }));
        expect(result.current.canGoToPrevious).toBe(true);
      });

      test('should be false when at step 0 and not circular', () => {
        const { result } = renderHook(() => useStep({ maxStep: 5 }));
        expect(result.current.canGoToPrevious).toBe(false);
      });

      test('should be true when at step 0 and circular', () => {
        const { result } = renderHook(() => useStep({ maxStep: 5, circular: true }));
        expect(result.current.canGoToPrevious).toBe(true);
      });
    });
  });

  describe('circular navigation', () => {
    test('should wrap from maxStep to 0 on next', () => {
      const { result } = renderHook(() => useStep({ initialStep: 3, maxStep: 3, circular: true }));

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.currentStep).toBe(0);
    });

    test('should wrap from 0 to maxStep on previous', () => {
      const { result } = renderHook(() => useStep({ initialStep: 0, maxStep: 5, circular: true }));

      act(() => {
        result.current.goToPreviousStep();
      });

      expect(result.current.currentStep).toBe(5);
    });

    test('should allow continuous circular navigation', () => {
      const { result } = renderHook(() => useStep({ maxStep: 2, circular: true }));

      expect(result.current.currentStep).toBe(0);

      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(1);

      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(2);

      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(0);

      act(() => {
        result.current.goToPreviousStep();
      });
      expect(result.current.currentStep).toBe(2);
    });
  });

  describe('integration', () => {
    test('should work correctly with multiple operations in sequence', () => {
      const { result } = renderHook(() => useStep({ initialStep: 0, maxStep: 5 }));

      expect(result.current.currentStep).toBe(0);
      expect(result.current.isFirstStep).toBe(true);
      expect(result.current.isLastStep).toBe(false);

      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(1);

      act(() => {
        result.current.goToStep(4);
      });
      expect(result.current.currentStep).toBe(4);

      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(5);
      expect(result.current.isLastStep).toBe(true);

      act(() => {
        result.current.reset();
      });
      expect(result.current.currentStep).toBe(0);

      act(() => {
        result.current.goToPreviousStep();
      });
      expect(result.current.currentStep).toBe(0); // Should not go below 0
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useStep());

      expect(result.current).toHaveProperty('currentStep');
      expect(result.current).toHaveProperty('goToNextStep');
      expect(result.current).toHaveProperty('goToPreviousStep');
      expect(result.current).toHaveProperty('goToStep');
      expect(result.current).toHaveProperty('reset');
      expect(result.current).toHaveProperty('canGoToNext');
      expect(result.current).toHaveProperty('canGoToPrevious');
      expect(result.current).toHaveProperty('isFirstStep');
      expect(result.current).toHaveProperty('isLastStep');
      expect(result.current).toHaveProperty('setMaxStep');

      expect(typeof result.current.currentStep).toBe('number');
      expect(typeof result.current.goToNextStep).toBe('function');
      expect(typeof result.current.goToPreviousStep).toBe('function');
      expect(typeof result.current.goToStep).toBe('function');
      expect(typeof result.current.reset).toBe('function');
      expect(typeof result.current.canGoToNext).toBe('boolean');
      expect(typeof result.current.canGoToPrevious).toBe('boolean');
      expect(typeof result.current.isFirstStep).toBe('boolean');
      expect(typeof result.current.isLastStep).toBe('boolean');
      expect(typeof result.current.setMaxStep).toBe('function');
    });

    test('should handle wizard flow scenario', () => {
      const { result } = renderHook(() => useStep({ maxStep: 3 }));

      // Step 1
      expect(result.current.currentStep).toBe(0);
      expect(result.current.canGoToPrevious).toBe(false);
      expect(result.current.canGoToNext).toBe(true);

      // Go to step 2
      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(1);

      // Go to step 3
      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(2);

      // Go to step 4 (final)
      act(() => {
        result.current.goToNextStep();
      });
      expect(result.current.currentStep).toBe(3);
      expect(result.current.isLastStep).toBe(true);
      expect(result.current.canGoToNext).toBe(false);

      // Go back
      act(() => {
        result.current.goToPreviousStep();
      });
      expect(result.current.currentStep).toBe(2);
    });
  });

  describe('performance', () => {
    test('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useStep({ maxStep: 5 }));

      const firstRender = {
        goToNextStep: result.current.goToNextStep,
        goToPreviousStep: result.current.goToPreviousStep,
        goToStep: result.current.goToStep,
        reset: result.current.reset,
        setMaxStep: result.current.setMaxStep,
      };

      act(() => {
        result.current.goToNextStep();
      });

      rerender();

      expect(result.current.goToNextStep).toBe(firstRender.goToNextStep);
      expect(result.current.goToPreviousStep).toBe(firstRender.goToPreviousStep);
      expect(result.current.goToStep).toBe(firstRender.goToStep);
      expect(result.current.reset).toBe(firstRender.reset);
      expect(result.current.setMaxStep).toBe(firstRender.setMaxStep);
    });
  });
});
