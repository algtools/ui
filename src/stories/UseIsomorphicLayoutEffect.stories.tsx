import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Ruler, Clock, RefreshCw } from 'lucide-react';

import { useIsomorphicLayoutEffect } from '../hooks/use-isomorphic-layout-effect';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

/**
 * Demo component showing DOM measurements with useIsomorphicLayoutEffect
 */
function DomMeasurementDemo() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [renderCount, setRenderCount] = React.useState(0);
  const boxRef = React.useRef<HTMLDivElement>(null);

  // This effect runs synchronously after DOM mutations on client,
  // but uses useEffect on server to avoid SSR warnings
  useIsomorphicLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [renderCount]);

  return (
    <Card className="p-6 w-[500px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">DOM Measurements</h3>
          <Badge variant="default">
            <Ruler className="mr-1 h-3 w-3" />
            Measuring
          </Badge>
        </div>

        <div
          ref={boxRef}
          className="rounded-lg border-2 border-dashed border-primary p-8 text-center bg-primary/5"
        >
          <p className="text-sm font-medium">Measured Element</p>
          <p className="text-xs text-muted-foreground mt-1">
            Resize the viewport to see measurements update
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Width</p>
            <p className="text-2xl font-bold">{dimensions.width.toFixed(0)}px</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Height</p>
            <p className="text-2xl font-bold">{dimensions.height.toFixed(0)}px</p>
          </div>
        </div>

        <Button onClick={() => setRenderCount((c) => c + 1)} variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-measure ({renderCount})
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing synchronous updates with useIsomorphicLayoutEffect
 */
function SynchronousUpdateDemo() {
  const [count, setCount] = React.useState(0);
  const [layoutEffectTime, setLayoutEffectTime] = React.useState<number>(0);
  const startTimeRef = React.useRef<number>(0);

  // Measure when the layout effect runs
  useIsomorphicLayoutEffect(() => {
    const endTime = performance.now();
    if (startTimeRef.current > 0) {
      setLayoutEffectTime(endTime - startTimeRef.current);
    }
  }, [count]);

  const handleIncrement = () => {
    startTimeRef.current = performance.now();
    setCount((c) => c + 1);
  };

  return (
    <Card className="p-6 w-[500px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Synchronous Execution</h3>
          <Badge variant="default">
            <Clock className="mr-1 h-3 w-3" />
            Timing
          </Badge>
        </div>

        <div className="rounded-lg border p-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Counter</p>
          <p className="text-4xl font-bold">{count}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Layout Effect Timing</p>
          <p className="text-xl font-bold">
            {layoutEffectTime > 0 ? `${layoutEffectTime.toFixed(2)}ms` : 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Time from state update to layout effect execution
          </p>
        </div>

        <Button onClick={handleIncrement} variant="default" className="w-full">
          Increment Counter
        </Button>

        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Uses useLayoutEffect on client (synchronous)</li>
            <li>Uses useEffect on server (no SSR warnings)</li>
            <li>Perfect for DOM measurements and mutations</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing scroll position tracking
 */
function ScrollPositionDemo() {
  const [scrollY, setScrollY] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Card className="p-6 w-[500px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scroll Position Tracking</h3>
          <Badge variant="secondary">Scroll: {scrollY.toFixed(0)}px</Badge>
        </div>

        <div
          ref={containerRef}
          className="h-[300px] overflow-y-auto rounded-lg border p-4 space-y-4"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded-lg bg-muted p-4 text-center text-sm font-medium">
              Item {i + 1}
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Scroll the container above to see position tracking in action.
        </div>
      </div>
    </Card>
  );
}

const meta = {
  title: 'Hooks/useIsomorphicLayoutEffect',
  component: DomMeasurementDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hook that uses `useLayoutEffect` on the client and `useEffect` on the server to avoid SSR warnings. This is useful for effects that need to run synchronously after all DOM mutations on the client, but can run asynchronously on the server.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DomMeasurementDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Shows how to use useIsomorphicLayoutEffect to measure DOM elements.
 * The hook runs synchronously on the client, ensuring accurate measurements
 * before the browser paints.
 */
export const DomMeasurement: Story = {
  render: () => <DomMeasurementDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates DOM measurement using useIsomorphicLayoutEffect to synchronously measure elements before the browser paints.',
      },
      source: {
        code: `import { useIsomorphicLayoutEffect } from '@algtools/ui';
import { useRef, useState } from 'react';

function MyComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div ref={boxRef}>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const SynchronousExecution: Story = {
  render: () => <SynchronousUpdateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the synchronous nature of useIsomorphicLayoutEffect on the client. The layout effect runs immediately after DOM mutations but before the browser paints.',
      },
    },
  },
};

export const ScrollTracking: Story = {
  render: () => <ScrollPositionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to track scroll position with useIsomorphicLayoutEffect. Event listeners are attached synchronously on the client.',
      },
    },
  },
};

export const MultipleEffects: Story = {
  render: () => {
    function MultipleEffectsDemo() {
      const [measurements, setMeasurements] = React.useState({
        effect1: 0,
        effect2: 0,
        effect3: 0,
      });

      useIsomorphicLayoutEffect(() => {
        setMeasurements((m) => ({ ...m, effect1: performance.now() }));
      }, []);

      useIsomorphicLayoutEffect(() => {
        setMeasurements((m) => ({ ...m, effect2: performance.now() }));
      }, []);

      useIsomorphicLayoutEffect(() => {
        setMeasurements((m) => ({ ...m, effect3: performance.now() }));
      }, []);

      return (
        <Card className="p-6 w-[500px]">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Multiple Layout Effects</h3>

            <div className="space-y-2">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Effect 1 Time</p>
                <p className="font-mono text-sm">{measurements.effect1.toFixed(2)}ms</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Effect 2 Time</p>
                <p className="font-mono text-sm">{measurements.effect2.toFixed(2)}ms</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Effect 3 Time</p>
                <p className="font-mono text-sm">{measurements.effect3.toFixed(2)}ms</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              All three effects run synchronously in order during the layout phase.
            </div>
          </div>
        </Card>
      );
    }

    return <MultipleEffectsDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple instances of the hook can be used in the same component, demonstrating how multiple layout effects run synchronously in order.',
      },
    },
  },
};

export const WithCleanup: Story = {
  render: () => {
    function CleanupDemo() {
      const [isActive, setIsActive] = React.useState(true);
      const [events, setEvents] = React.useState<string[]>([]);

      const addEvent = (event: string) => {
        setEvents((prev) => [...prev.slice(-4), event]);
      };

      useIsomorphicLayoutEffect(() => {
        if (isActive) {
          addEvent('Effect mounted');
          const interval = setInterval(() => {
            addEvent(`Tick at ${new Date().toLocaleTimeString()}`);
          }, 2000);

          return () => {
            addEvent('Effect cleaned up');
            clearInterval(interval);
          };
        }
      }, [isActive]);

      return (
        <Card className="p-6 w-[500px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cleanup Function</h3>
              <Badge variant={isActive ? 'default' : 'secondary'}>
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="rounded-lg border p-4 min-h-[120px]">
              <p className="text-xs text-muted-foreground mb-2">Event Log:</p>
              <div className="space-y-1">
                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events yet</p>
                ) : (
                  events.map((event, i) => (
                    <p key={i} className="text-xs font-mono">
                      {event}
                    </p>
                  ))
                )}
              </div>
            </div>

            <Button
              onClick={() => setIsActive(!isActive)}
              variant={isActive ? 'destructive' : 'default'}
              className="w-full"
            >
              {isActive ? 'Deactivate' : 'Activate'} Effect
            </Button>

            <div className="text-xs text-muted-foreground">
              Toggle the effect to see cleanup function in action.
            </div>
          </div>
        </Card>
      );
    }

    return <CleanupDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing cleanup function usage with useIsomorphicLayoutEffect, demonstrating how to properly clean up resources when the effect is disabled or the component unmounts.',
      },
    },
  },
};
