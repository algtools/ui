import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MousePointer2, Keyboard, Maximize2, Pointer } from 'lucide-react';

import { useEventListener } from '../hooks/use-event-listener';
import { useEventCallback } from '../hooks/use-event-callback';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component showing window resize tracking
 */
function ResizeTrackerDemo() {
  const [size, setSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEventListener({
    eventName: 'resize',
    handler: () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Maximize2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Window Resize Tracker</h3>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Width:</span>
            <Badge variant="secondary">{size.width}px</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Height:</span>
            <Badge variant="secondary">{size.height}px</Badge>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Resize your browser window to see updates
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing keyboard event tracking
 */
function KeyPressTrackerDemo() {
  const [lastKey, setLastKey] = React.useState<string>('');
  const [pressCount, setPressCount] = React.useState(0);

  useEventListener({
    eventName: 'keydown',
    handler: (event: KeyboardEvent) => {
      setLastKey(event.key);
      setPressCount((c) => c + 1);
    },
    element: document,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Keyboard className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Keyboard Tracker</h3>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Key:</p>
            <div className="font-mono text-2xl font-bold text-center py-2">
              {lastKey || '(none)'}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm text-muted-foreground">Total Presses:</span>
            <Badge>{pressCount}</Badge>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Press any key to track keyboard events
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing mouse position tracking
 */
function MouseTrackerDemo() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = React.useState(true);

  useEventListener({
    eventName: 'mousemove',
    handler: (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    },
    enabled: isTracking,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MousePointer2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Mouse Tracker</h3>
          </div>
          <Badge variant={isTracking ? 'default' : 'secondary'}>
            {isTracking ? 'Active' : 'Paused'}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">X Position:</span>
            <Badge variant="outline">{position.x}px</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Y Position:</span>
            <Badge variant="outline">{position.y}px</Badge>
          </div>
        </div>

        <Button onClick={() => setIsTracking(!isTracking)} className="w-full">
          {isTracking ? 'Pause' : 'Resume'} Tracking
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Move your mouse to track position
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing element-specific click tracking
 */
function ElementClickTrackerDemo() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [clicks, setClicks] = React.useState(0);
  const [lastTimestamp, setLastTimestamp] = React.useState<number>(0);

  useEventListener({
    eventName: 'click',
    handler: () => {
      setClicks((c) => c + 1);
      setLastTimestamp(Date.now());
    },
    element: buttonRef,
  });

  const timeSinceClick = lastTimestamp ? Math.floor((Date.now() - lastTimestamp) / 1000) : null;

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Pointer className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Element Click Tracker</h3>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Clicks:</span>
            <Badge variant="default" className="text-lg px-3">
              {clicks}
            </Badge>
          </div>

          {timeSinceClick !== null && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Last clicked {timeSinceClick}s ago
              </p>
            </div>
          )}
        </div>

        <Button ref={buttonRef} className="w-full" variant="outline">
          Click Me!
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Only clicks on the button are tracked
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing useEventCallback with useEventListener
 */
function StableCallbackDemo() {
  const [count, setCount] = React.useState(0);
  const [events, setEvents] = React.useState<string[]>([]);

  // This callback reference is stable, but always uses the latest count
  const handleClick = useEventCallback(() => {
    const message = `Clicked at count ${count}`;
    setEvents((prev) => [...prev.slice(-2), message]);
  });

  useEventListener({
    eventName: 'click',
    handler: handleClick,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Stable Callback Demo</h3>
          <Badge>{count}</Badge>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <p className="text-sm font-medium">Recent Events:</p>
          {events.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No events yet</p>
          ) : (
            <div className="space-y-1">
              {events.map((event, idx) => (
                <p key={idx} className="text-xs font-mono bg-muted p-2 rounded">
                  {event}
                </p>
              ))}
            </div>
          )}
        </div>

        <Button onClick={() => setCount((c) => c + 1)} className="w-full">
          Increment Count
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Click anywhere to see how useEventCallback captures the latest count
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo showing scroll position tracking
 */
function ScrollTrackerDemo() {
  const [scrollY, setScrollY] = React.useState(0);
  const [isEnabled, setIsEnabled] = React.useState(true);

  useEventListener({
    eventName: 'scroll',
    handler: () => {
      setScrollY(window.scrollY);
    },
    enabled: isEnabled,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scroll Tracker</h3>
          <Badge variant={isEnabled ? 'default' : 'secondary'}>
            {isEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Scroll Position:</p>
            <p className="text-3xl font-bold">{scrollY}px</p>
          </div>
        </div>

        <Button onClick={() => setIsEnabled(!isEnabled)} className="w-full" variant="outline">
          {isEnabled ? 'Disable' : 'Enable'} Tracking
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Scroll the page to see position updates
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof ResizeTrackerDemo> = {
  title: 'Hooks/useEventListener',
  component: ResizeTrackerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for attaching and managing event listeners on DOM elements, window, or document. Automatically handles cleanup and provides a stable callback reference using useEventCallback internally. Perfect for handling global events, element-specific interactions, and dynamic event management.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ResizeTracker: Story = {
  render: () => <ResizeTrackerDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Track window resize events to monitor the browser window dimensions in real-time.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEventListener({
    eventName: 'resize',
    handler: () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
  });

  return (
    <>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const KeyboardTracker: Story = {
  render: () => <KeyPressTrackerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Listen to keyboard events on the document to track key presses. Useful for keyboard shortcuts and navigation.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const [lastKey, setLastKey] = useState<string>('');
  const [pressCount, setPressCount] = useState(0);

  useEventListener({
    eventName: 'keydown',
    handler: (event: KeyboardEvent) => {
      setLastKey(event.key);
      setPressCount((c) => c + 1);
    },
    element: document,
  });

  return (
    <>
      <p>Last key: {lastKey}</p>
      <p>Total presses: {pressCount}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MouseTracker: Story = {
  render: () => <MouseTrackerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Track mouse position with the ability to enable/disable tracking dynamically. Demonstrates the enabled parameter.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(true);

  useEventListener({
    eventName: 'mousemove',
    handler: (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    },
    enabled,
  });

  return (
    <>
      <Button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Tracking
      </Button>
      <p>Position: ({position.x}, {position.y})</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ElementClickTracker: Story = {
  render: () => <ElementClickTrackerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Track clicks on a specific element using a ref. Only clicks on the target element trigger the handler.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useRef, useState } from 'react';

function MyComponent() {
  const [clickCount, setClickCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEventListener({
    eventName: 'click',
    handler: () => {
      setClickCount((c) => c + 1);
    },
    element: elementRef,
  });

  return (
    <div ref={elementRef} className="border p-4 cursor-pointer">
      <p>Click me! Count: {clickCount}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const StableCallback: Story = {
  render: () => <StableCallbackDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates useEventCallback providing a stable callback reference that always uses the latest closure values. The callback never changes but accesses the current count.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useEventCallback } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useEventCallback(() => {
    // This callback always has access to the latest count value
    console.log('Current count:', count);
    setCount((c) => c + 1);
  });

  useEventListener({
    eventName: 'click',
    handler: handleClick,
    element: document,
  });

  return <p>Count: {count}</p>;
}`,
        language: 'tsx',
      },
    },
  },
};

export const ScrollTracker: Story = {
  render: () => <ScrollTrackerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Track scroll position with dynamic enable/disable functionality. Shows how to conditionally attach event listeners.',
      },
      source: {
        code: `import { useEventListener } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [scrollY, setScrollY] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEventListener({
    eventName: 'scroll',
    handler: () => {
      setScrollY(window.scrollY);
    },
    enabled,
  });

  return (
    <>
      <Button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Scroll Tracking
      </Button>
      <p>Scroll position: {scrollY}px</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleListeners: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ResizeTrackerDemo />
      <MouseTrackerDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent event listeners working together, demonstrating that each hook instance operates independently.',
      },
    },
  },
};

export const AllFeatures: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <ResizeTrackerDemo />
      <KeyPressTrackerDemo />
      <MouseTrackerDemo />
      <ElementClickTrackerDemo />
      <StableCallbackDemo />
      <ScrollTrackerDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A comprehensive showcase of all useEventListener and useEventCallback features in action.',
      },
    },
  },
};
