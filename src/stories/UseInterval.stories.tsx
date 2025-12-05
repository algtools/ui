import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

import { useInterval } from '../hooks/use-interval';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useInterval hook
 */
function UseIntervalDemo() {
  const [count, setCount] = React.useState(0);
  const { isRunning, toggle, reset } = useInterval(() => setCount((c) => c + 1), 1000);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useInterval Hook Demo</h3>
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
          <p className="text-6xl font-bold font-mono">{count}</p>
          <p className="text-sm text-muted-foreground mt-2">Increments every second</p>
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
                Resume
              </>
            )}
          </Button>
          <Button
            onClick={() => {
              setCount(0);
              reset();
            }}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Total elapsed: {count} seconds
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a stopwatch use case
 */
function StopwatchDemo() {
  const [seconds, setSeconds] = React.useState(0);
  const { isRunning, toggle, reset } = useInterval(() => setSeconds((s) => s + 1), 1000, {
    autoStart: false,
  });

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const handleReset = () => {
    setSeconds(0);
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Stopwatch</h3>

        <div className="rounded-lg border p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
          <p className="text-5xl font-bold font-mono">
            {String(hours).padStart(2, '0')}:{String(remainingMinutes).padStart(2, '0')}:
            {String(remainingSeconds).padStart(2, '0')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={toggle}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" />
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setSeconds((s) => s + 60)}
            variant="outline"
            className="w-full text-xs"
          >
            +1 min
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          {!isRunning && seconds === 0 && 'Press play to start'}
          {!isRunning && seconds > 0 && 'Paused'}
          {isRunning && 'Running...'}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a countdown timer use case
 */
function CountdownTimerDemo() {
  const [timeLeft, setTimeLeft] = React.useState(60);
  const { isRunning, pause, toggle, reset } = useInterval(
    () => setTimeLeft((t) => Math.max(0, t - 1)),
    1000,
    { autoStart: false }
  );

  React.useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      pause();
    }
  }, [timeLeft, isRunning, pause]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / 60) * 100;

  const handleReset = () => {
    setTimeLeft(60);
    reset();
  };

  const addTime = (amount: number) => {
    setTimeLeft((t) => t + amount);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Countdown Timer</h3>

        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          className={`rounded-lg border p-8 text-center ${timeLeft === 0 ? 'bg-destructive/10 border-destructive' : 'bg-secondary/50'}`}
        >
          <p
            className={`text-6xl font-bold font-mono ${timeLeft <= 10 && timeLeft > 0 ? 'text-destructive animate-pulse' : ''}`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          {timeLeft === 0 && (
            <p className="text-sm text-destructive font-semibold mt-2">Time&apos;s up!</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={toggle}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
            disabled={timeLeft === 0}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => addTime(30)}
            variant="outline"
            className="w-full text-xs"
            disabled={isRunning}
          >
            +30s
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => {
              setTimeLeft(30);
              pause();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            30s
          </Button>
          <Button
            onClick={() => {
              setTimeLeft(60);
              pause();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            1m
          </Button>
          <Button
            onClick={() => {
              setTimeLeft(300);
              pause();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            5m
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing an auto-refresh use case
 */
function AutoRefreshDemo() {
  const [data, setData] = React.useState<{ id: number; timestamp: string }[]>([]);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const fetchData = React.useCallback(() => {
    const newItem = {
      id: refreshCount,
      timestamp: new Date().toLocaleTimeString(),
    };
    setData((prev) => [newItem, ...prev].slice(0, 5));
    setRefreshCount((c) => c + 1);
  }, [refreshCount]);

  const { isRunning, toggle, reset } = useInterval(fetchData, 2000);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Auto-Refresh Data</h3>
          <Badge variant={isRunning ? 'default' : 'secondary'}>
            {isRunning ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-secondary/50 min-h-[200px]">
          <p className="text-xs text-muted-foreground mb-2">Recent updates:</p>
          {data.length === 0 ? (
            <p className="text-sm text-center text-muted-foreground py-8">
              No data yet. Updates every 2 seconds.
            </p>
          ) : (
            <div className="space-y-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-background rounded border text-sm"
                >
                  <span className="font-mono">Update #{item.id}</span>
                  <span className="text-muted-foreground">{item.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={toggle} variant={isRunning ? 'secondary' : 'default'} className="flex-1">
            {isRunning ? 'Disable Auto-refresh' : 'Enable Auto-refresh'}
          </Button>
          <Button
            onClick={() => {
              setData([]);
              setRefreshCount(0);
              reset();
            }}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Refreshed {refreshCount} times • Every 2 seconds
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a progress bar use case
 */
function ProgressBarDemo() {
  const [progress, setProgress] = React.useState(0);
  const pauseRef = React.useRef<(() => void) | null>(null);

  const { start, pause, reset } = useInterval(
    () => {
      setProgress((p) => {
        if (p >= 100) {
          pauseRef.current?.();
          return 100;
        }
        return p + 1;
      });
    },
    100,
    { autoStart: false }
  );

  pauseRef.current = pause;

  const handleReset = () => {
    setProgress(0);
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Progress Tracker</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border p-8 text-center bg-secondary/50">
          {progress === 0 && <p className="text-2xl">⏸️</p>}
          {progress > 0 && progress < 100 && <p className="text-2xl">⏳</p>}
          {progress === 100 && <p className="text-2xl">✅</p>}
          <p className="text-sm text-muted-foreground mt-2">
            {progress === 0 && 'Ready to start'}
            {progress > 0 && progress < 100 && 'In progress...'}
            {progress === 100 && 'Completed!'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={start} variant="default" className="w-full" disabled={progress === 100}>
            <Play className="h-4 w-4" />
          </Button>
          <Button onClick={pause} variant="secondary" className="w-full">
            <Pause className="h-4 w-4" />
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseIntervalDemo> = {
  title: 'Hooks/useInterval',
  component: UseIntervalDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing setInterval with automatic cleanup and pause/resume functionality. Perfect for timers, stopwatches, auto-refresh, and periodic tasks.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseIntervalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useInterval hook showing pause, resume, and reset functionality.',
      },
      source: {
        code: `import { useInterval } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [count, setCount] = useState(0);
  const { isRunning, toggle, reset } = useInterval(() => setCount((c) => c + 1), 1000);

  return (
    <>
      <p className="text-6xl font-bold">{count}</p>
      <Button onClick={toggle}>
        {isRunning ? 'Pause' : 'Resume'}
      </Button>
      <Button onClick={() => { setCount(0); reset(); }}>
        Reset
      </Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Stopwatch: Story = {
  render: () => <StopwatchDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A stopwatch implementation using useInterval with manual start control (autoStart: false).',
      },
      source: {
        code: `import { useInterval } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [seconds, setSeconds] = useState(0);
  const { isRunning, start, pause, reset } = useInterval(
    () => setSeconds((s) => s + 1),
    1000,
    { autoStart: false }
  );

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <>
      <p className="text-6xl font-bold font-mono">
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </p>
      {!isRunning ? (
        <Button onClick={start}>Start</Button>
      ) : (
        <Button onClick={pause}>Pause</Button>
      )}
      <Button onClick={() => { setSeconds(0); reset(); }}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CountdownTimer: Story = {
  render: () => <CountdownTimerDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A countdown timer that stops automatically when reaching zero.',
      },
      source: {
        code: `import { useInterval } from '@algtools/ui';
import { useState, useEffect } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [timeLeft, setTimeLeft] = useState(60);
  const { isRunning, start, pause, reset } = useInterval(
    () => setTimeLeft((t) => Math.max(0, t - 1)),
    1000,
    { autoStart: false }
  );

  useEffect(() => {
    if (timeLeft === 0) {
      pause();
    }
  }, [timeLeft, pause]);

  return (
    <>
      <p className="text-6xl font-bold">{timeLeft}</p>
      {!isRunning ? (
        <Button onClick={start}>Start</Button>
      ) : (
        <Button onClick={pause}>Pause</Button>
      )}
      <Button onClick={() => { setTimeLeft(60); reset(); }}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const AutoRefresh: Story = {
  render: () => <AutoRefreshDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Auto-refresh data every 2 seconds with toggle functionality.',
      },
      source: {
        code: `import { useInterval } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [data, setData] = useState(null);
  const { isRunning, toggle } = useInterval(
    async () => {
      // Fetch fresh data
      const response = await fetch('/api/data');
      const newData = await response.json();
      setData(newData);
    },
    2000
  );

  return (
    <>
      <Button onClick={toggle}>
        {isRunning ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
      </Button>
      {data && <div>{/* Render data */}</div>}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ProgressBar: Story = {
  render: () => <ProgressBarDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Progress bar that increments automatically using useInterval.',
      },
      source: {
        code: `import { useInterval } from '@algtools/ui';
import { useState, useRef } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [progress, setProgress] = useState(0);
  const pauseRef = useRef<(() => void) | null>(null);

  const { start, pause, reset } = useInterval(
    () => {
      setProgress((p) => {
        if (p >= 100) {
          pauseRef.current?.();
          return 100;
        }
        return p + 1;
      });
    },
    100,
    { autoStart: false }
  );

  pauseRef.current = pause;

  return (
    <>
      <div className="w-full bg-secondary rounded-full h-4">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <p>{progress}%</p>
      <Button onClick={start} disabled={progress === 100}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={() => { setProgress(0); reset(); }}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseIntervalDemo />
      <StopwatchDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useInterval hook working together.',
      },
    },
  },
};
