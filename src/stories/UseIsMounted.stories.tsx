import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

import { useIsMounted } from '../hooks/use-is-mounted';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that shows mount state
 */
function UseIsMountedDemo() {
  const isMounted = useIsMounted();
  const [checkResult, setCheckResult] = React.useState<boolean | null>(null);

  const checkMountState = () => {
    setCheckResult(isMounted());
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useIsMounted Hook Demo</h3>
          <Badge variant={isMounted() ? 'default' : 'secondary'}>
            {isMounted() ? (
              <>
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Mounted
              </>
            ) : (
              <>
                <XCircle className="mr-1 h-3 w-3" />
                Not Mounted
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground mb-2">Current mount state:</p>
          <p className="text-2xl font-bold">{isMounted() ? '✓ Mounted' : '✗ Not Mounted'}</p>
        </div>

        <Button onClick={checkMountState} className="w-full">
          Check Mount State
        </Button>

        {checkResult !== null && (
          <div className="rounded-lg border p-3 bg-muted">
            <p className="text-sm">
              Last check result: <strong>{checkResult ? 'Mounted' : 'Not Mounted'}</strong>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing async operation safety
 */
function AsyncSafetyDemo() {
  const isMounted = useIsMounted();
  const [data, setData] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    setData(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Only update state if component is still mounted
    if (isMounted()) {
      setData('Data fetched successfully!');
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Async Operation Safety</h3>

        <div className="text-sm text-muted-foreground">
          <p>This demo shows how useIsMounted prevents state updates after unmount.</p>
        </div>

        <Button onClick={fetchData} disabled={loading} className="w-full">
          {loading ? 'Fetching Data...' : 'Fetch Data'}
        </Button>

        {data && (
          <div className="rounded-lg border border-green-500 p-3 bg-green-50 dark:bg-green-950">
            <p className="text-sm text-green-900 dark:text-green-100">{data}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Try clicking the button and quickly navigating away to test unmount safety.</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing conditional updates
 */
function ConditionalUpdateDemo() {
  const isMounted = useIsMounted();
  const [updates, setUpdates] = React.useState<string[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startUpdates = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (isMounted()) {
        setUpdates((prev) => [...prev, new Date().toLocaleTimeString()]);
      }
    }, 1000);
  };

  const stopUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const clearUpdates = () => {
    setUpdates([]);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conditional Updates</h3>

        <div className="flex gap-2">
          <Button onClick={startUpdates} variant="default" className="flex-1">
            Start
          </Button>
          <Button onClick={stopUpdates} variant="secondary" className="flex-1">
            Stop
          </Button>
          <Button onClick={clearUpdates} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        <div className="rounded-lg border p-3 max-h-40 overflow-y-auto">
          {updates.length === 0 ? (
            <p className="text-sm text-muted-foreground">No updates yet</p>
          ) : (
            <div className="space-y-1">
              {updates.map((update, index) => (
                <p key={index} className="text-xs font-mono">
                  {index + 1}. {update}
                </p>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Updates only occur when component is mounted (checked via useIsMounted).
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseIsMountedDemo> = {
  title: 'Hooks/useIsMounted',
  component: UseIsMountedDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that returns whether the component is currently mounted. Useful for preventing state updates on unmounted components and avoiding memory leaks in async operations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseIsMountedDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useIsMounted hook showing how to check mount state.',
      },
    },
  },
};

export const AsyncSafety: Story = {
  render: () => <AsyncSafetyDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how useIsMounted prevents state updates after component unmounts during async operations.',
      },
    },
  },
};

export const ConditionalUpdates: Story = {
  render: () => <ConditionalUpdateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to use useIsMounted with intervals and timers to ensure updates only happen when mounted.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseIsMountedDemo />
      <AsyncSafetyDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useIsMounted hook working together.',
      },
    },
  },
};
