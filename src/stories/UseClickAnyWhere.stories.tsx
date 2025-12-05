import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { MousePointer2, Activity, BarChart3, MapPin } from 'lucide-react';

import { useClickAnyWhere } from '../hooks/use-click-anywhere';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component showing basic click tracking
 */
function ClickCounterDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);

  useClickAnyWhere((event) => {
    setClickCount((count) => count + 1);
    if ('clientX' in event && 'clientY' in event) {
      setLastClick({ x: event.clientX, y: event.clientY });
    }
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MousePointer2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Click Counter</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Click anywhere on the page to increment the counter
        </p>

        <div className="p-4 rounded-lg border bg-muted/50">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">{clickCount}</div>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </div>
        </div>

        {lastClick && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>
              Last click: ({lastClick.x}, {lastClick.y})
            </span>
          </div>
        )}

        <Button
          onClick={() => {
            setClickCount(0);
            setLastClick(null);
          }}
          variant="outline"
          className="w-full"
        >
          Reset Counter
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing analytics tracking
 */
function AnalyticsDemo() {
  const [events, setEvents] = useState<string[]>([]);
  const [isTracking, setIsTracking] = useState(true);

  useClickAnyWhere((event) => {
    const timestamp = new Date().toLocaleTimeString();
    const eventType = event.type;
    const target = (event.target as HTMLElement).tagName.toLowerCase();
    const eventDescription = `${timestamp} - ${eventType} on <${target}>`;

    setEvents((prev) => [eventDescription, ...prev].slice(0, 5));
  }, isTracking);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analytics Tracker</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Tracks all click events with timestamps and targets
        </p>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm font-medium">Tracking Status</span>
          <Button
            onClick={() => setIsTracking(!isTracking)}
            variant={isTracking ? 'default' : 'outline'}
            size="sm"
          >
            {isTracking ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recent Events</span>
            <Badge>{events.length}</Badge>
          </div>

          <div className="rounded-lg border bg-muted/50 p-3 min-h-[120px]">
            {events.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No events tracked yet. {!isTracking && 'Enable tracking to start.'}
              </p>
            ) : (
              <div className="space-y-1">
                {events.map((event, index) => (
                  <div key={index} className="text-xs font-mono text-muted-foreground truncate">
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => setEvents([])}
          variant="outline"
          className="w-full"
          disabled={events.length === 0}
        >
          Clear History
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing conditional tracking with toggle
 */
function ConditionalDemo() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useClickAnyWhere(() => {
    setClickCount((count) => count + 1);
  }, isEnabled);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conditional Tracking</h3>

        <p className="text-sm text-muted-foreground">
          Enable tracking to start counting clicks. When disabled, clicks are ignored.
        </p>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm font-medium">Click Tracking</span>
          <Button
            onClick={() => setIsEnabled(!isEnabled)}
            variant={isEnabled ? 'default' : 'outline'}
            size="sm"
          >
            {isEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <div className="p-4 rounded-lg border bg-muted/50">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">{clickCount}</div>
            <p className="text-xs text-muted-foreground">
              {isEnabled ? 'Tracking active' : 'Tracking paused'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => setClickCount(0)}
            variant="outline"
            className="w-full"
            disabled={clickCount === 0}
          >
            Reset Count
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing click heatmap visualization
 */
function HeatmapDemo() {
  const [clicks, setClicks] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isTracking, setIsTracking] = useState(true);

  useClickAnyWhere((event) => {
    if ('clientX' in event && 'clientY' in event) {
      setClicks((prev) => [
        ...prev,
        {
          x: event.clientX,
          y: event.clientY,
          id: Date.now() + Math.random(),
        },
      ]);
    }
  }, isTracking);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Click Heatmap</h3>
        </div>

        <p className="text-sm text-muted-foreground">Visualizes click positions on the page</p>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm font-medium">Recording</span>
          <Button
            onClick={() => setIsTracking(!isTracking)}
            variant={isTracking ? 'default' : 'outline'}
            size="sm"
          >
            {isTracking ? 'Active' : 'Paused'}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Click Points</span>
            <Badge>{clicks.length}</Badge>
          </div>

          <div className="p-4 rounded-lg border bg-muted/50 min-h-[100px]">
            {clicks.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">
                No clicks recorded yet
              </p>
            ) : (
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium mb-2">Recent clicks:</p>
                {clicks.slice(-5).map((click) => (
                  <div key={click.id} className="flex items-center gap-2 font-mono">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>
                      x: {click.x.toFixed(0)}, y: {click.y.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => setClicks([])}
          variant="outline"
          className="w-full"
          disabled={clicks.length === 0}
        >
          Clear Heatmap
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing activity monitoring
 */
function ActivityMonitorDemo() {
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [totalClicks, setTotalClicks] = useState(0);

  useClickAnyWhere(() => {
    setLastActivity(new Date());
    setTotalClicks((count) => count + 1);
  });

  const timeSinceActivity = lastActivity
    ? `${Math.floor((Date.now() - lastActivity.getTime()) / 1000)}s ago`
    : 'No activity yet';

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Activity Monitor</h3>
        </div>

        <p className="text-sm text-muted-foreground">Monitors user activity on the page</p>

        <div className="space-y-3">
          <div className="p-3 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Total Interactions</div>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </div>

          <div className="p-3 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Last Activity</div>
            <div className="text-sm font-medium">
              {lastActivity ? lastActivity.toLocaleTimeString() : 'Never'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{timeSinceActivity}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              setLastActivity(null);
              setTotalClicks(0);
            }}
            variant="outline"
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              /* Simulate activity */
            }}
            className="flex-1"
          >
            Test Click
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing touch support
 */
function TouchSupportDemo() {
  const [eventType, setEventType] = useState<'mouse' | 'touch' | null>(null);
  const [eventCount, setEventCount] = useState({ mouse: 0, touch: 0 });

  useClickAnyWhere((event) => {
    if (event.type === 'mousedown') {
      setEventType('mouse');
      setEventCount((prev) => ({ ...prev, mouse: prev.mouse + 1 }));
    } else if (event.type === 'touchstart') {
      setEventType('touch');
      setEventCount((prev) => ({ ...prev, touch: prev.touch + 1 }));
    }
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Touch & Mouse Support</h3>

        <p className="text-sm text-muted-foreground">
          Detects both mouse and touch events automatically
        </p>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Mouse Events</div>
              <div className="text-2xl font-bold">{eventCount.mouse}</div>
            </div>

            <div className="flex-1 p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Touch Events</div>
              <div className="text-2xl font-bold">{eventCount.touch}</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border bg-muted/50">
            <div className="text-xs text-muted-foreground mb-1">Last Event Type</div>
            <div className="flex items-center gap-2">
              {eventType ? (
                <>
                  <Badge variant="default">{eventType}</Badge>
                  <span className="text-sm text-muted-foreground">detected</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">No events yet</span>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            setEventType(null);
            setEventCount({ mouse: 0, touch: 0 });
          }}
          variant="outline"
          className="w-full"
        >
          Reset Counters
        </Button>
      </div>
    </Card>
  );
}

const meta: Meta<typeof ClickCounterDemo> = {
  title: 'Hooks/useClickAnyWhere',
  component: ClickCounterDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that detects clicks anywhere on the page. Perfect for tracking user interactions, implementing analytics, monitoring activity, or creating global click handlers. Supports both mouse and touch events with optional conditional enabling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickCounter: Story = {
  render: () => <ClickCounterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic click counter that tracks all clicks on the page. Shows the total count and the coordinates of the last click.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);

  useClickAnyWhere((event) => {
    setClickCount((count) => count + 1);
    if ('clientX' in event && 'clientY' in event) {
      setLastClick({ x: event.clientX, y: event.clientY });
    }
  });

  return (
    <>
      <p>Total Clicks: {clickCount}</p>
      {lastClick && (
        <p>Last click: ({lastClick.x}, {lastClick.y})</p>
      )}
      <Button onClick={() => { setClickCount(0); setLastClick(null); }}>
        Reset Counter
      </Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const AnalyticsTracking: Story = {
  render: () => <AnalyticsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Analytics tracker that logs click events with timestamps and target elements. Can be enabled or disabled dynamically.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [events, setEvents] = useState<string[]>([]);
  const [isTracking, setIsTracking] = useState(true);

  useClickAnyWhere((event) => {
    const timestamp = new Date().toLocaleTimeString();
    const target = (event.target as HTMLElement).tagName.toLowerCase();
    const eventDescription = \`\${timestamp} - click on <\${target}>\`;
    setEvents((prev) => [eventDescription, ...prev].slice(0, 10));
  }, isTracking);

  return (
    <>
      <Button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </Button>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event}</li>
        ))}
      </ul>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ConditionalTracking: Story = {
  render: () => <ConditionalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the optional `enabled` parameter. When disabled, all click events are ignored. Useful for pausing tracking or implementing privacy controls.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(0);

  useClickAnyWhere(() => {
    setCount((c) => c + 1);
  }, enabled);

  return (
    <>
      <Button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Tracking
      </Button>
      <p>Clicks: {count}</p>
      <p>Status: {enabled ? 'Tracking active' : 'Tracking disabled'}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ClickHeatmap: Story = {
  render: () => <HeatmapDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Visualizes click positions to create a simple heatmap. Records the coordinates of each click for analysis.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [clicks, setClicks] = useState<Array<{ x: number; y: number }>>([]);

  useClickAnyWhere((event) => {
    if ('clientX' in event && 'clientY' in event) {
      setClicks((prev) => [...prev, { x: event.clientX, y: event.clientY }].slice(-50));
    }
  });

  return (
    <>
      <div className="relative w-full h-screen">
        {clicks.map((click, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-red-500 rounded-full opacity-50"
            style={{ left: click.x, top: click.y, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>
      <Button onClick={() => setClicks([])}>Clear Heatmap</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ActivityMonitor: Story = {
  render: () => <ActivityMonitorDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Monitors user activity by tracking clicks. Shows total interactions and time since last activity.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

  useClickAnyWhere(() => {
    setTotalClicks((c) => c + 1);
    setLastActivity(new Date());
  });

  return (
    <>
      <p>Total Clicks: {totalClicks}</p>
      {lastActivity && (
        <p>Last Activity: {lastActivity.toLocaleTimeString()}</p>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const TouchSupport: Story = {
  render: () => <TouchSupportDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates support for both mouse and touch events. Automatically detects and handles both input methods.',
      },
      source: {
        code: `import { useClickAnyWhere } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const [events, setEvents] = useState<string[]>([]);

  useClickAnyWhere((event) => {
    const eventType = event.type; // 'click' or 'touchstart'
    setEvents((prev) => [\`\${eventType} detected\`, ...prev].slice(0, 10));
  });

  return (
    <>
      <p>Supports both mouse clicks and touch events</p>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event}</li>
        ))}
      </ul>
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
      <ClickCounterDemo />
      <ActivityMonitorDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of useClickAnyWhere working simultaneously. Each instance maintains its own state and handlers.',
      },
    },
  },
};
