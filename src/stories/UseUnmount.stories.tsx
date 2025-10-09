import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Trash2, Bell, Clock } from 'lucide-react';

import { useUnmount } from '../hooks/use-unmount';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

/**
 * Demo component that shows cleanup notification
 */
function CleanupNotificationDemo() {
  const [notifications, setNotifications] = React.useState<string[]>([]);
  const [showComponent, setShowComponent] = React.useState(true);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const ComponentWithCleanup = () => {
    useUnmount(() => {
      addNotification('Component unmounted - cleanup executed!');
    });

    return (
      <div className="rounded-lg border border-blue-500 p-4 bg-blue-50 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold">
          Component with cleanup
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
          This component will log a message when it unmounts
        </p>
      </div>
    );
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">useUnmount Hook Demo</h3>

        <Button
          onClick={() => setShowComponent(!showComponent)}
          variant={showComponent ? 'destructive' : 'default'}
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {showComponent ? 'Unmount Component' : 'Mount Component'}
        </Button>

        {showComponent && <ComponentWithCleanup />}

        <div className="rounded-lg border p-3 max-h-40 overflow-y-auto bg-muted">
          <p className="text-xs font-semibold mb-2">Cleanup Log:</p>
          {notifications.length === 0 ? (
            <p className="text-xs text-muted-foreground">No cleanup events yet</p>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <p key={index} className="text-xs font-mono">
                  {notification}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing timer cleanup
 */
function TimerCleanupDemo() {
  const [showTimer, setShowTimer] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const TimerComponent = () => {
    const [count, setCount] = React.useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      addLog('Timer started');
      intervalRef.current = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);

      return () => {
        addLog('Timer stopped in useEffect cleanup');
      };
    }, []);

    useUnmount(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        addLog('Timer cleaned up in useUnmount');
      }
    });

    return (
      <div className="rounded-lg border p-4 bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4" />
          <p className="text-sm font-semibold">Running Timer</p>
        </div>
        <p className="text-2xl font-bold">{count}s</p>
      </div>
    );
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Timer Cleanup Demo</h3>

        <Button onClick={() => setShowTimer(!showTimer)} variant="outline" className="w-full">
          {showTimer ? 'Stop Timer' : 'Start Timer'}
        </Button>

        {showTimer && <TimerComponent />}

        <div className="rounded-lg border p-3 max-h-32 overflow-y-auto bg-muted">
          <p className="text-xs font-semibold mb-2">Event Log:</p>
          {logs.length === 0 ? (
            <p className="text-xs text-muted-foreground">No events yet</p>
          ) : (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <p key={index} className="text-xs font-mono">
                  {log}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing event listener cleanup
 */
function EventListenerCleanupDemo() {
  const [showListener, setShowListener] = React.useState(false);
  const [events, setEvents] = React.useState<string[]>([]);

  const addEvent = (message: string) => {
    setEvents((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const ListenerComponent = () => {
    const handleClick = () => {
      addEvent('Document clicked');
    };

    React.useEffect(() => {
      document.addEventListener('click', handleClick);
      addEvent('Event listener attached');

      return () => {
        addEvent('Component cleanup started');
      };
    }, []);

    useUnmount(() => {
      document.removeEventListener('click', handleClick);
      addEvent('Event listener removed via useUnmount');
    });

    return (
      <div className="rounded-lg border border-purple-500 p-4 bg-purple-50 dark:bg-purple-950">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-4 w-4 text-purple-700 dark:text-purple-300" />
          <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">
            Active Listener
          </p>
        </div>
        <p className="text-xs text-purple-700 dark:text-purple-300">
          Click anywhere to trigger the event
        </p>
      </div>
    );
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Event Listener Cleanup</h3>

        <Button onClick={() => setShowListener(!showListener)} variant="outline" className="w-full">
          {showListener ? 'Remove Listener' : 'Add Listener'}
        </Button>

        {showListener && <ListenerComponent />}

        <div className="rounded-lg border p-3 max-h-40 overflow-y-auto bg-muted">
          <p className="text-xs font-semibold mb-2">Event Log:</p>
          {events.length === 0 ? (
            <p className="text-xs text-muted-foreground">No events yet</p>
          ) : (
            <div className="space-y-1">
              {events.slice(-10).map((event, index) => (
                <p key={index} className="text-xs font-mono">
                  {event}
                </p>
              ))}
            </div>
          )}
        </div>

        <Button onClick={() => setEvents([])} variant="ghost" size="sm" className="w-full text-xs">
          Clear Log
        </Button>
      </div>
    </Card>
  );
}

const meta: Meta<typeof CleanupNotificationDemo> = {
  title: 'Hooks/useUnmount',
  component: CleanupNotificationDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that runs a cleanup function when the component unmounts. Perfect for cleaning up subscriptions, timers, event listeners, and other side effects.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <CleanupNotificationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useUnmount hook showing cleanup execution on unmount.',
      },
    },
  },
};

export const TimerCleanup: Story = {
  render: () => <TimerCleanupDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates using useUnmount to clean up intervals and timers when component unmounts.',
      },
    },
  },
};

export const EventListenerCleanup: Story = {
  render: () => <EventListenerCleanupDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Shows how to use useUnmount to remove event listeners during component cleanup.',
      },
    },
  },
};

export const MultipleCleanups: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CleanupNotificationDemo />
      <TimerCleanupDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple instances showing different cleanup scenarios working independently.',
      },
    },
  },
};
