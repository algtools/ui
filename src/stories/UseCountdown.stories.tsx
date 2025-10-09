import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Play, Pause, RotateCcw, Timer, Clock, Plus, Minus } from 'lucide-react';

import { useCountdown } from '../hooks/use-countdown';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

/**
 * Helper function to format time
 */
function formatTime(ms: number): { hours: number; minutes: number; seconds: number } {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

/**
 * Demo component that uses the useCountdown hook
 */
function UseCountdownDemo() {
  const { timeRemaining, isRunning, toggle, reset } = useCountdown(60000);

  const { minutes, seconds } = formatTime(timeRemaining);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useCountdown Hook Demo</h3>
          <Badge variant={isRunning ? 'default' : 'secondary'}>
            {isRunning ? (
              <>
                <Timer className="mr-1 h-3 w-3 animate-pulse" />
                Running
              </>
            ) : (
              <>
                <Pause className="mr-1 h-3 w-3" />
                Paused
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-secondary/50">
          <p className="text-6xl font-bold font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Time remaining</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={toggle} variant={isRunning ? 'secondary' : 'default'} className="w-full">
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a Pomodoro timer use case
 */
function PomodoroTimerDemo() {
  const [mode, setMode] = React.useState<'work' | 'break'>('work');
  const workDuration = 25 * 60 * 1000; // 25 minutes
  const breakDuration = 5 * 60 * 1000; // 5 minutes
  const [completedPomodoros, setCompletedPomodoros] = React.useState(0);

  const initialDuration = mode === 'work' ? workDuration : breakDuration;

  const handleComplete = React.useCallback(() => {
    if (mode === 'work') {
      setCompletedPomodoros((prev) => prev + 1);
      setMode('break');
    } else {
      setMode('work');
    }
  }, [mode]);

  const { timeRemaining, isRunning, toggle, reset, setDuration } = useCountdown(initialDuration, {
    onComplete: handleComplete,
  });

  const { minutes, seconds } = formatTime(timeRemaining);
  const progress = (timeRemaining / initialDuration) * 100;

  const switchMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setDuration(newMode === 'work' ? workDuration : breakDuration);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pomodoro Timer</h3>
          <Badge variant={mode === 'work' ? 'default' : 'secondary'}>
            {mode === 'work' ? '🍅 Work' : '☕ Break'}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
        </div>

        <div
          className={`rounded-lg border p-8 text-center ${mode === 'work' ? 'bg-primary/5 border-primary/20' : 'bg-green-500/5 border-green-500/20'}`}
        >
          <p
            className={`text-6xl font-bold font-mono ${timeRemaining <= 60000 && timeRemaining > 0 ? 'text-destructive animate-pulse' : ''}`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === 'work' ? 'Focus time' : 'Break time'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={toggle}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={switchMode} variant="secondary" className="w-full text-xs">
            Switch
          </Button>
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">Completed pomodoros</p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: completedPomodoros }).map((_, i) => (
              <span key={i} className="text-xl">
                🍅
              </span>
            ))}
            {completedPomodoros === 0 && (
              <span className="text-sm text-muted-foreground">None yet</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a cooking timer use case
 */
function CookingTimerDemo() {
  const presets = [
    { name: 'Soft Egg', duration: 3 * 60 * 1000, emoji: '🥚' },
    { name: 'Hard Egg', duration: 7 * 60 * 1000, emoji: '🥚' },
    { name: 'Pasta', duration: 10 * 60 * 1000, emoji: '🍝' },
    { name: 'Rice', duration: 15 * 60 * 1000, emoji: '🍚' },
    { name: 'Steak', duration: 8 * 60 * 1000, emoji: '🥩' },
    { name: 'Pizza', duration: 12 * 60 * 1000, emoji: '🍕' },
  ];

  const [selectedPreset, setSelectedPreset] = React.useState(presets[0]);

  const handleComplete = React.useCallback(() => {
    // In a real app, this would show a notification or play a sound
    alert(`${selectedPreset.name} is ready! 🎉`);
  }, [selectedPreset]);

  const { timeRemaining, isRunning, toggle, reset, setDuration } = useCountdown(
    selectedPreset.duration,
    {
      onComplete: handleComplete,
    }
  );

  const { minutes, seconds } = formatTime(timeRemaining);
  const progress = 100 - (timeRemaining / selectedPreset.duration) * 100;

  const selectPreset = (preset: (typeof presets)[0]) => {
    setSelectedPreset(preset);
    setDuration(preset.duration);
  };

  const addTime = (amount: number) => {
    setDuration(timeRemaining + amount);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cooking Timer</h3>
          <Badge variant="outline">
            {selectedPreset.emoji} {selectedPreset.name}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
        </div>

        <div
          className={`rounded-lg border p-8 text-center ${timeRemaining === 0 ? 'bg-green-500/10 border-green-500' : 'bg-secondary/50'}`}
        >
          <p
            className={`text-6xl font-bold font-mono ${timeRemaining <= 60000 && timeRemaining > 0 ? 'text-orange-500 animate-pulse' : ''}`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          {timeRemaining === 0 && (
            <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2">
              {selectedPreset.emoji} Done! {selectedPreset.emoji}
            </p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            onClick={toggle}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
            disabled={timeRemaining === 0}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => addTime(60000)}
            variant="outline"
            className="w-full"
            disabled={isRunning}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => addTime(-60000)}
            variant="outline"
            className="w-full"
            disabled={isRunning || timeRemaining < 60000}
          >
            <Minus className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick presets:</p>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                onClick={() => selectPreset(preset)}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2"
                disabled={isRunning}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{preset.emoji}</span>
                  <span className="text-[10px] mt-1">{preset.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a workout timer use case
 */
function WorkoutTimerDemo() {
  const exercises = ['Push-ups', 'Squats', 'Plank', 'Jumping Jacks', 'Rest'];
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const exerciseDuration = 30000; // 30 seconds per exercise
  const [round, setRound] = React.useState(1);

  const handleComplete = React.useCallback(() => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1);
    } else {
      setCurrentExercise(0);
      setRound((prev) => prev + 1);
    }
  }, [currentExercise, exercises.length]);

  const { timeRemaining, isRunning, start, pause, reset } = useCountdown(exerciseDuration, {
    onComplete: handleComplete,
    autoStart: false,
  });

  const seconds = Math.ceil(timeRemaining / 1000);
  const progress = ((exerciseDuration - timeRemaining) / exerciseDuration) * 100;

  const handleReset = () => {
    setCurrentExercise(0);
    setRound(1);
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Workout Timer</h3>
          <Badge variant="default">Round {round}</Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
          <p className="text-sm text-muted-foreground mb-2">Current exercise</p>
          <p className="text-3xl font-bold mb-4">{exercises[currentExercise]}</p>
          <p className="text-7xl font-bold font-mono">{seconds}</p>
          <p className="text-sm text-muted-foreground mt-2">seconds</p>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={isRunning ? pause : start}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleComplete()}
            variant="secondary"
            className="w-full text-xs"
            disabled={!isRunning}
          >
            Skip
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Exercise sequence:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {exercises.map((exercise, index) => (
              <Badge
                key={index}
                variant={index === currentExercise ? 'default' : 'outline'}
                className="text-xs whitespace-nowrap"
              >
                {index < currentExercise ? '✓' : index === currentExercise ? '→' : ''} {exercise}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a meeting timer use case
 */
function MeetingTimerDemo() {
  const meetingDuration = 30 * 60 * 1000; // 30 minutes
  const warningThreshold = 5 * 60 * 1000; // 5 minutes

  const handleComplete = React.useCallback(() => {
    alert('Meeting time is up! ⏰');
  }, []);

  const { timeRemaining, isRunning, toggle, reset, setDuration } = useCountdown(meetingDuration, {
    onComplete: handleComplete,
  });

  const { hours, minutes, seconds } = formatTime(timeRemaining);
  const isWarning = timeRemaining <= warningThreshold && timeRemaining > 0;
  const progress = ((meetingDuration - timeRemaining) / meetingDuration) * 100;

  const adjustDuration = (minutes: number) => {
    setDuration(minutes * 60 * 1000);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Meeting Timer</h3>
          <Badge variant={isRunning ? 'default' : 'secondary'}>
            {isRunning ? (
              <>
                <Clock className="mr-1 h-3 w-3 animate-pulse" />
                In Progress
              </>
            ) : (
              'Not Started'
            )}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress
            value={progress}
            className={`h-2 ${isWarning ? 'bg-orange-200 dark:bg-orange-900' : ''}`}
          />
        </div>

        <div
          className={`rounded-lg border p-8 text-center transition-all ${
            isWarning
              ? 'bg-orange-500/10 border-orange-500/50'
              : timeRemaining === 0
                ? 'bg-destructive/10 border-destructive'
                : 'bg-secondary/50'
          }`}
        >
          <p
            className={`text-6xl font-bold font-mono ${isWarning ? 'text-orange-600 dark:text-orange-400 animate-pulse' : ''}`}
          >
            {hours > 0 && `${String(hours).padStart(2, '0')}:`}
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {timeRemaining === 0 && "Time's up!"}
            {isWarning && timeRemaining > 0 && 'Wrapping up...'}
            {!isWarning && timeRemaining > 0 && 'Time remaining'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={toggle}
            variant={isRunning ? 'secondary' : 'default'}
            className="w-full"
            disabled={timeRemaining === 0}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick durations:</p>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((mins) => (
              <Button
                key={mins}
                onClick={() => adjustDuration(mins)}
                variant="outline"
                size="sm"
                className="text-xs"
                disabled={isRunning}
              >
                {mins}m
              </Button>
            ))}
          </div>
        </div>

        {isWarning && (
          <div className="rounded-lg border border-orange-500 p-3 bg-orange-500/5 text-center">
            <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
              ⚠️ Less than 5 minutes remaining
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing custom interval
 */
function CustomIntervalDemo() {
  const [interval, setInterval] = React.useState(1000);
  const { timeRemaining, isRunning, toggle, reset } = useCountdown(10000, { interval });

  const seconds = Math.floor(timeRemaining / 1000);
  const milliseconds = timeRemaining % 1000;

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Custom Interval Demo</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Update interval: {interval}ms</span>
            <Badge variant="outline">{isRunning ? 'Running' : 'Stopped'}</Badge>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value))}
            className="w-full"
            disabled={isRunning}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100ms (fast)</span>
            <span>1000ms (slow)</span>
          </div>
        </div>

        <div className="rounded-lg border p-8 text-center bg-secondary/50">
          <p className="text-5xl font-bold font-mono">
            {seconds}.{String(milliseconds).padStart(3, '0')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Seconds remaining</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={toggle} variant={isRunning ? 'secondary' : 'default'} className="w-full">
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Lower intervals provide smoother countdown animation
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseCountdownDemo> = {
  title: 'Hooks/useCountdown',
  component: UseCountdownDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing countdown timers with play/pause controls. Perfect for timers, countdowns, Pomodoro technique, cooking timers, and time-boxed activities.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseCountdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useCountdown hook showing start, pause, and reset functionality.',
      },
    },
  },
};

export const PomodoroTimer: Story = {
  render: () => <PomodoroTimerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Pomodoro timer implementation with work/break cycles and completion tracking. Demonstrates onComplete callback and dynamic duration switching.',
      },
    },
  },
};

export const CookingTimer: Story = {
  render: () => <CookingTimerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Cooking timer with preset durations and time adjustment. Shows practical use of setDuration for quick preset selection.',
      },
    },
  },
};

export const WorkoutTimer: Story = {
  render: () => <WorkoutTimerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interval training workout timer that cycles through exercises. Demonstrates chaining countdowns with automatic progression.',
      },
    },
  },
};

export const MeetingTimer: Story = {
  render: () => <MeetingTimerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Meeting timer with warning threshold and quick duration presets. Shows visual feedback for time-critical situations.',
      },
    },
  },
};

export const CustomInterval: Story = {
  render: () => <CustomIntervalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates custom interval configuration for different update frequencies. Useful for smooth animations or precise timing.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseCountdownDemo />
      <PomodoroTimerDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useCountdown hook working simultaneously.',
      },
    },
  },
};
