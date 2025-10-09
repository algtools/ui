import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

import { useStep } from '../hooks/use-step';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

/**
 * Demo component that uses the useStep hook
 */
function UseStepDemo() {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    reset,
    canGoToNext,
    canGoToPrevious,
    isFirstStep,
    isLastStep,
  } = useStep({ maxStep: 4 });

  const steps = ['Start', 'Step 1', 'Step 2', 'Step 3', 'Complete'];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useStep Hook Demo</h3>
          <Badge variant="default">
            {currentStep + 1} / {steps.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} />
        </div>

        <div className="rounded-lg border p-6 text-center bg-secondary/50">
          <div className="text-5xl font-bold mb-2">{currentStep}</div>
          <div className="text-lg font-semibold">{steps[currentStep]}</div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={goToPreviousStep}
            variant="outline"
            className="flex-1"
            disabled={!canGoToPrevious}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={goToNextStep}
            variant="default"
            className="flex-1"
            disabled={!canGoToNext}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          {steps.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToStep(index)}
              variant={currentStep === index ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          Reset
        </Button>

        <div className="flex gap-2 text-xs">
          <Badge variant={isFirstStep ? 'default' : 'secondary'}>First: {isFirstStep ? 'Yes' : 'No'}</Badge>
          <Badge variant={isLastStep ? 'default' : 'secondary'}>Last: {isLastStep ? 'Yes' : 'No'}</Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing wizard/form flow
 */
function WizardDemo() {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    reset,
    canGoToNext,
    canGoToPrevious,
    isLastStep,
  } = useStep({ maxStep: 3 });

  const steps = [
    { title: 'Account', description: 'Create your account' },
    { title: 'Profile', description: 'Set up your profile' },
    { title: 'Preferences', description: 'Customize settings' },
    { title: 'Complete', description: 'Review and finish' },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Setup Wizard</h3>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div className="text-xs mt-1 text-center">
                <div className="font-medium">{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border p-6 min-h-32">
          <h4 className="font-semibold mb-2">{steps[currentStep].title}</h4>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          {currentStep === 3 && (
            <div className="mt-4 p-3 rounded bg-primary/10">
              <p className="text-sm font-medium">Setup complete! 🎉</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={goToPreviousStep}
            variant="outline"
            className="flex-1"
            disabled={!canGoToPrevious}
          >
            Back
          </Button>
          {isLastStep ? (
            <Button onClick={reset} className="flex-1">
              Finish
            </Button>
          ) : (
            <Button onClick={goToNextStep} className="flex-1" disabled={!canGoToNext}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing onboarding flow
 */
function OnboardingDemo() {
  const { currentStep, goToNextStep, goToPreviousStep, isFirstStep, isLastStep } = useStep({
    maxStep: 2,
  });

  const screens = [
    {
      emoji: '👋',
      title: 'Welcome!',
      description: 'Thanks for joining us. Let us show you around.',
    },
    {
      emoji: '🎯',
      title: 'Set Your Goals',
      description: 'Tell us what you want to achieve.',
    },
    {
      emoji: '🚀',
      title: 'Get Started',
      description: "You're all set! Let's begin your journey.",
    },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex justify-center gap-1">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentStep ? 'w-8 bg-primary' : 'w-1 bg-secondary'
              }`}
            />
          ))}
        </div>

        <div className="text-center py-8">
          <div className="text-6xl mb-4">{screens[currentStep].emoji}</div>
          <h3 className="text-xl font-bold mb-2">{screens[currentStep].title}</h3>
          <p className="text-sm text-muted-foreground">{screens[currentStep].description}</p>
        </div>

        <div className="flex gap-2">
          {!isFirstStep && (
            <Button onClick={goToPreviousStep} variant="ghost" className="flex-1">
              Skip
            </Button>
          )}
          <Button onClick={goToNextStep} className="flex-1">
            {isLastStep ? "Let's Go!" : 'Next'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing carousel navigation
 */
function CarouselDemo() {
  const { currentStep, goToNextStep, goToPreviousStep, goToStep } = useStep({
    maxStep: 4,
    circular: true,
  });

  const slides = [
    { color: 'bg-blue-500', title: 'Slide 1' },
    { color: 'bg-green-500', title: 'Slide 2' },
    { color: 'bg-purple-500', title: 'Slide 3' },
    { color: 'bg-orange-500', title: 'Slide 4' },
    { color: 'bg-pink-500', title: 'Slide 5' },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Carousel (Circular)</h3>

        <div className="relative">
          <div
            className={`${slides[currentStep].color} rounded-lg h-48 flex items-center justify-center text-white text-2xl font-bold`}
          >
            {slides[currentStep].title}
          </div>
          <Button
            onClick={goToPreviousStep}
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={goToNextStep}
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-primary w-6' : 'bg-secondary'
              }`}
            />
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Circular navigation enabled - wraps around at edges
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing tabbed interface
 */
function TabbedInterfaceDemo() {
  const { currentStep, goToStep } = useStep({ maxStep: 2 });

  const tabs = [
    { label: 'Overview', content: 'This is the overview section with general information.' },
    { label: 'Details', content: 'Here are the detailed specifications and features.' },
    { label: 'Settings', content: 'Configure your preferences and options here.' },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex gap-1 border-b">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                currentStep === index
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border p-4 min-h-32">
          <p className="text-sm">{tabs[currentStep].content}</p>
        </div>

        <div className="flex justify-center">
          <Badge variant="outline">Current Tab: {tabs[currentStep].label}</Badge>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseStepDemo> = {
  title: 'Hooks/useStep',
  component: UseStepDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing step navigation in wizards, steppers, carousels, or multi-step forms. Supports linear and circular navigation with helper functions and state flags.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseStepDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useStep hook showing all available methods and state flags.',
      },
    },
  },
};

export const Wizard: Story = {
  render: () => <WizardDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Multi-step wizard/form flow with progress indicators.',
      },
    },
  },
};

export const Onboarding: Story = {
  render: () => <OnboardingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'User onboarding flow with slide-based navigation.',
      },
    },
  },
};

export const Carousel: Story = {
  render: () => <CarouselDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Circular carousel navigation that wraps around at edges.',
      },
    },
  },
};

export const Tabs: Story = {
  render: () => <TabbedInterfaceDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Tabbed interface using useStep for tab state management.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <WizardDemo />
      <OnboardingDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useStep hook working together.',
      },
    },
  },
};
