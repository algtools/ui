import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Clock, RotateCcw, X } from 'lucide-react';

import { useTimeout } from '../hooks/use-timeout';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useTimeout hook
 */
function UseTimeoutDemo() {
  const [message, setMessage] = React.useState('');
  const { isActive, reset, cancel } = useTimeout(() => {
    setMessage('Timeout executed! 🎉');
  }, 3000);

  const handleReset = () => {
    setMessage('');
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useTimeout Hook Demo</h3>
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? (
              <>
                <Clock className="mr-1 h-3 w-3 animate-pulse" />
                Active
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" />
                Inactive
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-8 text-center min-h-[120px] flex items-center justify-center bg-secondary/50">
          {!message && isActive && (
            <div className="text-center">
              <p className="text-2xl mb-2">⏰</p>
              <p className="text-sm text-muted-foreground">Waiting for timeout...</p>
            </div>
          )}
          {!message && !isActive && (
            <div className="text-center">
              <p className="text-2xl mb-2">⏸️</p>
              <p className="text-sm text-muted-foreground">Timeout cancelled</p>
            </div>
          )}
          {message && (
            <div className="text-center">
              <p className="text-lg font-semibold">{message}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleReset} variant="default" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset (3s)
          </Button>
          <Button
            onClick={() => {
              setMessage('Timeout cancelled');
              cancel();
            }}
            variant="secondary"
            className="w-full"
            disabled={!isActive}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {isActive ? 'Timeout will execute in ~3 seconds' : 'Timeout is not active'}
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a notification/toast use case
 */
function NotificationDemo() {
  const [notification, setNotification] = React.useState<string | null>(null);
  const { isActive, reset, cancel } = useTimeout(() => {
    setNotification(null);
  }, 3000);

  const showNotification = (message: string) => {
    setNotification(message);
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Auto-dismiss Notification</h3>

        <div className="space-y-2">
          <Button
            onClick={() => showNotification('Success! Your changes have been saved.')}
            variant="default"
            className="w-full"
          >
            Show Success Message
          </Button>
          <Button
            onClick={() => showNotification('Warning! Please review your input.')}
            variant="outline"
            className="w-full"
          >
            Show Warning Message
          </Button>
          <Button
            onClick={() => showNotification('Info: New features are available!')}
            variant="secondary"
            className="w-full"
          >
            Show Info Message
          </Button>
        </div>

        {notification && (
          <div className="rounded-lg border border-primary p-4 bg-primary/5 relative">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm flex-1">{notification}</p>
              <Button
                onClick={() => {
                  setNotification(null);
                  cancel();
                }}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {isActive && (
              <div className="mt-2 w-full bg-secondary rounded-full h-1 overflow-hidden">
                <div
                  className="bg-primary h-full animate-[shrink_3s_linear_forwards]"
                  style={{
                    animation: 'shrink 3s linear forwards',
                    width: '100%',
                  }}
                />
              </div>
            )}
          </div>
        )}

        {!notification && (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p className="text-sm">Click a button to show a notification</p>
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground">
          Notifications auto-dismiss after 3 seconds
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing a delayed action use case
 */
function DelayedActionDemo() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<string | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);

  const performSearch = React.useCallback(() => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setSearchResult(`Results for: "${searchTerm}"`);
      setIsSearching(false);
    }, 500);
  }, [searchTerm]);

  const { isActive, reset, cancel } = useTimeout(performSearch, 1000);

  React.useEffect(() => {
    if (searchTerm) {
      setSearchResult(null);
      reset();
    } else {
      cancel();
      setSearchResult(null);
    }
  }, [searchTerm, reset, cancel]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Debounced Search</h3>

        <div className="space-y-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {isActive && 'Searching in 1 second...'}
              {isSearching && 'Searching...'}
              {!isActive && !isSearching && searchTerm && 'Search complete'}
              {!searchTerm && 'Start typing to search'}
            </span>
            {isActive && (
              <Badge variant="outline" className="text-xs">
                <Clock className="mr-1 h-3 w-3" />
                Waiting
              </Badge>
            )}
          </div>
        </div>

        <div className="rounded-lg border p-4 min-h-[100px] bg-secondary/50">
          {searchResult ? (
            <div>
              <p className="text-sm font-semibold mb-2">{searchResult}</p>
              <div className="space-y-1">
                <div className="text-xs p-2 bg-background rounded border">Result item 1</div>
                <div className="text-xs p-2 bg-background rounded border">Result item 2</div>
                <div className="text-xs p-2 bg-background rounded border">Result item 3</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                {isSearching ? (
                  <>
                    <span className="animate-spin inline-block mr-2">⏳</span>
                    Searching...
                  </>
                ) : (
                  'No results yet'
                )}
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Search executes 1 second after you stop typing
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing an idle detection use case
 */
function IdleDetectionDemo() {
  const [isIdle, setIsIdle] = React.useState(false);
  const [lastActivity, setLastActivity] = React.useState(new Date());

  const handleIdle = React.useCallback(() => {
    setIsIdle(true);
  }, []);

  const { reset } = useTimeout(handleIdle, 5000);

  const handleActivity = () => {
    setIsIdle(false);
    setLastActivity(new Date());
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Idle Detection</h3>

        <div
          className={`rounded-lg border p-8 text-center transition-all ${isIdle ? 'bg-destructive/10 border-destructive' : 'bg-primary/10 border-primary'}`}
        >
          <p className="text-4xl mb-2">{isIdle ? '😴' : '👋'}</p>
          <p className="text-lg font-semibold">{isIdle ? 'Idle' : 'Active'}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Last activity: {lastActivity.toLocaleTimeString()}
          </p>
        </div>

        <div className="space-y-2">
          <Button onClick={handleActivity} variant="default" className="w-full">
            Simulate Activity
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Status changes to idle after 5 seconds of inactivity
          </p>
        </div>

        <div className="rounded-lg border p-3 bg-secondary/50">
          <p className="text-xs font-semibold mb-2">Try these interactions:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• Click the button to reset idle timer</div>
            <div>• Wait 5 seconds to see idle state</div>
            <div>• Activity resets the countdown</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing custom delay control
 */
function CustomDelayDemo() {
  const [delay, setDelay] = React.useState(3);
  const [message, setMessage] = React.useState('');

  const { isActive, reset } = useTimeout(() => {
    setMessage(`Timeout executed after ${delay} seconds! 🎉`);
  }, delay * 1000);

  const handleReset = () => {
    setMessage('');
    reset();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Custom Delay Control</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delay: {delay}s</span>
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1s</span>
            <span>10s</span>
          </div>
        </div>

        <div className="rounded-lg border p-8 text-center min-h-[100px] flex items-center justify-center bg-secondary/50">
          {message ? (
            <p className="text-sm font-semibold">{message}</p>
          ) : isActive ? (
            <div className="text-center">
              <p className="text-2xl mb-2">⏰</p>
              <p className="text-sm text-muted-foreground">Waiting {delay} seconds...</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Adjust delay and click start</p>
          )}
        </div>

        <Button onClick={handleReset} variant="default" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Start Timeout
        </Button>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseTimeoutDemo> = {
  title: 'Hooks/useTimeout',
  component: UseTimeoutDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing setTimeout with automatic cleanup. Perfect for delayed actions, notifications, debouncing, and idle detection.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseTimeoutDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useTimeout hook showing reset and cancel functionality.',
      },
      source: {
        code: `import { useTimeout } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [message, setMessage] = useState('');
  const { isActive, reset, cancel } = useTimeout(() => {
    setMessage('Timeout executed!');
  }, 3000);

  const handleReset = () => {
    setMessage('');
    reset();
  };

  return (
    <>
      {message && <p>{message}</p>}
      <Button onClick={handleReset}>Reset (3s)</Button>
      <Button onClick={cancel} disabled={!isActive}>Cancel</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Notification: Story = {
  render: () => <NotificationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Auto-dismissing notifications using useTimeout.',
      },
      source: {
        code: `import { useTimeout } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const [showNotification, setShowNotification] = useState(false);

  useTimeout(() => {
    setShowNotification(false);
  }, showNotification ? 3000 : null);

  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show Notification
      </Button>
      {showNotification && (
        <div className="notification">
          <p>This notification will auto-dismiss in 3 seconds</p>
        </div>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const DelayedAction: Story = {
  render: () => <DelayedActionDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Debounced search input using useTimeout to delay search execution.',
      },
      source: {
        code: `import { useTimeout } from '@algtools/ui';
import { useState } from 'react';
import { Input } from '@algtools/ui';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useTimeout(() => {
    if (searchTerm) {
      // Perform search
      setSearchResults([\`Result for \${searchTerm}\`]);
    }
  }, searchTerm ? 500 : null);

  return (
    <>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {searchResults.map((result, i) => (
        <p key={i}>{result}</p>
      ))}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const IdleDetection: Story = {
  render: () => <IdleDetectionDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Detecting user idle state with automatic timeout reset on activity.',
      },
      source: {
        code: `import { useTimeout } from '@algtools/ui';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [isIdle, setIsIdle] = useState(false);
  const { reset } = useTimeout(() => {
    setIsIdle(true);
  }, 5000);

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      reset();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [reset]);

  return (
    <p>User is {isIdle ? 'idle' : 'active'}</p>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CustomDelay: Story = {
  render: () => <CustomDelayDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Dynamic delay control showing how useTimeout adapts to delay changes.',
      },
      source: {
        code: `import { useTimeout } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [delay, setDelay] = useState(1000);
  const [message, setMessage] = useState('');

  const { reset } = useTimeout(() => {
    setMessage(\`Executed after \${delay}ms\`);
  }, delay);

  return (
    <>
      <input
        type="number"
        value={delay}
        onChange={(e) => {
          setDelay(Number(e.target.value));
          setMessage('');
          reset();
        }}
      />
      <Button onClick={reset}>Reset</Button>
      {message && <p>{message}</p>}
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
      <UseTimeoutDemo />
      <NotificationDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useTimeout hook working together.',
      },
    },
  },
};
