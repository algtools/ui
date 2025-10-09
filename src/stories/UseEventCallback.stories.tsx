import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { RefreshCw, Save, Send, CheckCircle2 } from 'lucide-react';

import { useEventCallback } from '../hooks/use-event-callback';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

/**
 * Demo showing stable reference behavior
 */
function StableReferenceDemo() {
  const [count, setCount] = React.useState(0);
  const [renderCount, setRenderCount] = React.useState(0);
  const childRenderCount = React.useRef(0);

  // This callback reference never changes, preventing child re-renders
  const handleClick = useEventCallback(() => {
    setCount((c) => c + 1);
  });

  // Track parent re-renders
  React.useEffect(() => {
    setRenderCount((r) => r + 1);
  }, [count]);

  // Child component that only re-renders if its prop reference changes
  const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
    childRenderCount.current++;
    return (
      <div className="rounded-lg border p-4 bg-muted">
        <p className="text-sm font-medium mb-2">Child Component</p>
        <p className="text-xs text-muted-foreground mb-3">Renders: {childRenderCount.current}</p>
        <Button onClick={onClick} size="sm" className="w-full">
          Increment from Child
        </Button>
      </div>
    );
  });
  ChildComponent.displayName = 'ChildComponent';

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Stable Reference</h3>
          <Badge variant="outline">Count: {count}</Badge>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border p-3">
            <p className="text-sm font-medium mb-1">Parent Component</p>
            <p className="text-xs text-muted-foreground">Renders: {renderCount}</p>
          </div>

          <ChildComponent onClick={handleClick} />

          <Button onClick={() => setCount((c) => c + 1)} variant="outline" className="w-full">
            Increment (Causes Re-render)
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          The child component only renders once despite parent re-renders
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing latest closure values
 */
function LatestClosureDemo() {
  const [name, setName] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);

  // Always uses the latest name value, even though reference never changes
  const handleSend = useEventCallback(() => {
    if (name.trim()) {
      const message = `Hello, ${name}!`;
      setMessages((prev) => [...prev.slice(-2), message]);
    }
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Latest Closure Values</h3>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button onClick={handleSend} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Greeting
          </Button>

          <div className="rounded-lg border p-3 min-h-[100px]">
            <p className="text-sm font-medium mb-2">Messages:</p>
            {messages.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No messages yet</p>
            ) : (
              <div className="space-y-1">
                {messages.map((msg, idx) => (
                  <p key={idx} className="text-xs bg-primary/10 p-2 rounded">
                    {msg}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          The callback always uses the current name value
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing form submission use case
 */
function FormSubmissionDemo() {
  const [formData, setFormData] = React.useState({ email: '', message: '' });
  const [submissions, setSubmissions] = React.useState<(typeof formData)[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Stable callback that always has access to latest form data
  const handleSubmit = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmissions((prev) => [...prev, formData]);
      setFormData({ email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Save className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Form Submission</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </form>

        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium mb-2">Submissions: {submissions.length}</p>
          {submissions.slice(-2).map((sub, idx) => (
            <div key={idx} className="text-xs bg-muted p-2 rounded mb-1">
              <p className="font-medium">{sub.email}</p>
              <p className="text-muted-foreground">{sub.message}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Stable form handler with latest values
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing event handler optimization
 */
function EventHandlerOptimizationDemo() {
  const [clicks, setClicks] = React.useState(0);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = React.useState(false);

  // Stable callbacks that always use latest state
  const handleClick = useEventCallback(() => {
    setClicks((c) => c + 1);
  });

  const handleMouseMove = useEventCallback((e: React.MouseEvent) => {
    if (isTracking) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Event Handler Optimization</h3>
          <Badge>{clicks} clicks</Badge>
        </div>

        <div
          className="rounded-lg border p-8 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
        >
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Click or Move Mouse Here</p>
            {isTracking && (
              <p className="text-xs text-muted-foreground">
                Position: ({position.x}, {position.y})
              </p>
            )}
          </div>
        </div>

        <Button onClick={() => setIsTracking(!isTracking)} variant="outline" className="w-full">
          {isTracking ? 'Stop' : 'Start'} Tracking
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Handlers never change, preventing re-renders
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing callback with dependencies
 */
function CallbackWithDependenciesDemo() {
  const [multiplier, setMultiplier] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [results, setResults] = React.useState<number[]>([]);

  // Always uses latest multiplier, no need to list in dependencies
  const calculate = useEventCallback(() => {
    const result = value * multiplier;
    setResults((prev) => [...prev.slice(-3), result]);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Dynamic Dependencies</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Multiplier</label>
            <div className="flex gap-2">
              {[1, 2, 5, 10].map((m) => (
                <Button
                  key={m}
                  size="sm"
                  variant={multiplier === m ? 'default' : 'outline'}
                  onClick={() => setMultiplier(m)}
                >
                  ×{m}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Value</label>
            <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate ({value} × {multiplier})
          </Button>

          <div className="rounded-lg border p-3">
            <p className="text-sm font-medium mb-2">Results:</p>
            {results.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No calculations yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {results.map((r, idx) => (
                  <Badge key={idx} variant="secondary">
                    {r}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          No dependency array needed—always gets latest values
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo comparing useCallback vs useEventCallback
 */
function ComparisonDemo() {
  const [count, setCount] = React.useState(0);
  const [callbackRerenders, setCallbackRerenders] = React.useState(0);
  const [eventCallbackRerenders, setEventCallbackRerenders] = React.useState(0);

  // Regular useCallback - changes when count changes
  const regularCallback = React.useCallback(() => {
    console.log('Regular callback, count:', count);
  }, [count]);

  // useEventCallback - never changes
  const stableCallback = useEventCallback(() => {
    console.log('Event callback, count:', count);
  });

  // Track when callbacks change
  React.useEffect(() => {
    setCallbackRerenders((r) => r + 1);
  }, [regularCallback]);

  React.useEffect(() => {
    setEventCallbackRerenders((r) => r + 1);
  }, [stableCallback]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Comparison</h3>
          <Badge variant="outline">Count: {count}</Badge>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 bg-orange-50 dark:bg-orange-950/20">
              <p className="text-xs font-medium mb-1">useCallback</p>
              <p className="text-lg font-bold">{callbackRerenders - 1}</p>
              <p className="text-xs text-muted-foreground">changes</p>
            </div>

            <div className="rounded-lg border p-3 bg-green-50 dark:bg-green-950/20">
              <p className="text-xs font-medium mb-1">useEventCallback</p>
              <p className="text-lg font-bold">{eventCallbackRerenders - 1}</p>
              <p className="text-xs text-muted-foreground">changes</p>
            </div>
          </div>

          <Button onClick={() => setCount((c) => c + 1)} className="w-full">
            Increment Count
          </Button>

          <Button
            onClick={() => {
              setCount(0);
              setCallbackRerenders(0);
              setEventCallbackRerenders(0);
            }}
            variant="outline"
            className="w-full"
          >
            Reset
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• useCallback changes when dependencies change</p>
          <p>• useEventCallback never changes</p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof StableReferenceDemo> = {
  title: 'Hooks/useEventCallback',
  component: StableReferenceDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hook that provides a stable callback reference that always calls the latest version of the callback. Unlike `useCallback`, it never changes its reference, preventing unnecessary re-renders while still capturing the latest closure values. Perfect for optimizing performance and simplifying event handlers.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const StableReference: Story = {
  render: () => <StableReferenceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how useEventCallback maintains a stable reference across re-renders, preventing child components from re-rendering unnecessarily. The child component (wrapped in React.memo) only renders once despite parent re-renders.',
      },
    },
  },
};

export const LatestClosure: Story = {
  render: () => <LatestClosureDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how useEventCallback always captures the latest closure values without needing to update the callback reference. The callback can access the current state value even though the callback reference never changes.',
      },
    },
  },
};

export const FormSubmission: Story = {
  render: () => <FormSubmissionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example of using useEventCallback for form submission. The submit handler has a stable reference but always accesses the latest form data, simplifying the code and preventing unnecessary re-renders.',
      },
    },
  },
};

export const EventHandlerOptimization: Story = {
  render: () => <EventHandlerOptimizationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how useEventCallback optimizes event handlers like onClick and onMouseMove. The handlers maintain stable references while always accessing the latest state, providing optimal performance.',
      },
    },
  },
};

export const DynamicDependencies: Story = {
  render: () => <CallbackWithDependenciesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how useEventCallback eliminates the need for dependency arrays. The callback automatically has access to the latest values without needing to be recreated, simplifying the code significantly.',
      },
    },
  },
};

export const Comparison: Story = {
  render: () => <ComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of useCallback vs useEventCallback. While useCallback changes when dependencies change (causing potential re-renders), useEventCallback never changes its reference, providing better optimization.',
      },
    },
  },
};

export const AllFeatures: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <StableReferenceDemo />
      <LatestClosureDemo />
      <FormSubmissionDemo />
      <EventHandlerOptimizationDemo />
      <CallbackWithDependenciesDemo />
      <ComparisonDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of all useEventCallback features and use cases.',
      },
    },
  },
};
