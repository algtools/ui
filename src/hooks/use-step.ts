'use client';

import * as React from 'react';

/**
 * Options for configuring the useStep hook
 */
export interface UseStepOptions {
  /** The initial step index (default: 0) */
  initialStep?: number;
  /** The maximum number of steps (default: Infinity) */
  maxStep?: number;
  /** Whether to allow going to the next step (circular navigation) (default: false) */
  circular?: boolean;
}

/**
 * Return type for the useStep hook
 */
export interface UseStepReturn {
  /** The current step index */
  currentStep: number;
  /** Go to the next step */
  goToNextStep: () => void;
  /** Go to the previous step */
  goToPreviousStep: () => void;
  /** Go to a specific step by index */
  goToStep: (step: number) => void;
  /** Reset to the initial step */
  reset: () => void;
  /** Check if can go to next step */
  canGoToNext: boolean;
  /** Check if can go to previous step */
  canGoToPrevious: boolean;
  /** Check if at the first step */
  isFirstStep: boolean;
  /** Check if at the last step */
  isLastStep: boolean;
  /** Set the maximum step */
  setMaxStep: (maxStep: number) => void;
}

/**
 * A custom hook for managing step navigation in wizards, steppers, or multi-step forms.
 *
 * @param options - Configuration options for the step navigation
 * @returns An object containing the current step and navigation functions
 *
 * @example
 * ```tsx
 * function WizardComponent() {
 *   const {
 *     currentStep,
 *     goToNextStep,
 *     goToPreviousStep,
 *     goToStep,
 *     canGoToNext,
 *     canGoToPrevious,
 *     isFirstStep,
 *     isLastStep,
 *   } = useStep({ initialStep: 0, maxStep: 3 });
 *
 *   return (
 *     <div>
 *       <p>Step {currentStep + 1} of 4</p>
 *       <button onClick={goToPreviousStep} disabled={!canGoToPrevious}>
 *         Previous
 *       </button>
 *       <button onClick={goToNextStep} disabled={!canGoToNext}>
 *         Next
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useStep(options: UseStepOptions = {}): UseStepReturn {
  const { initialStep = 0, maxStep = Infinity, circular = false } = options;

  // Clamp initial step to valid range
  const clampedInitialStep = Math.max(0, Math.min(initialStep, maxStep));

  const [currentStep, setCurrentStep] = React.useState(clampedInitialStep);
  const [currentMaxStep, setCurrentMaxStep] = React.useState(maxStep);

  // Store initial step in ref
  const initialStepRef = React.useRef(clampedInitialStep);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === currentMaxStep;
  const canGoToNext = circular || !isLastStep;
  const canGoToPrevious = circular || !isFirstStep;

  const goToStep = React.useCallback(
    (step: number) => {
      const clampedStep = Math.max(0, Math.min(step, currentMaxStep));
      setCurrentStep(clampedStep);
    },
    [currentMaxStep]
  );

  const goToNextStep = React.useCallback(() => {
    setCurrentStep((prevStep) => {
      if (prevStep === currentMaxStep) {
        return circular ? 0 : prevStep;
      }
      return prevStep + 1;
    });
  }, [currentMaxStep, circular]);

  const goToPreviousStep = React.useCallback(() => {
    setCurrentStep((prevStep) => {
      if (prevStep === 0) {
        return circular ? currentMaxStep : prevStep;
      }
      return prevStep - 1;
    });
  }, [currentMaxStep, circular]);

  const reset = React.useCallback(() => {
    setCurrentStep(initialStepRef.current);
  }, []);

  const setMaxStep = React.useCallback((newMaxStep: number) => {
    setCurrentMaxStep(newMaxStep);
    setCurrentStep((prevStep) => Math.min(prevStep, newMaxStep));
  }, []);

  return React.useMemo(
    () => ({
      currentStep,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      reset,
      canGoToNext,
      canGoToPrevious,
      isFirstStep,
      isLastStep,
      setMaxStep,
    }),
    [
      currentStep,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      reset,
      canGoToNext,
      canGoToPrevious,
      isFirstStep,
      isLastStep,
      setMaxStep,
    ]
  );
}
