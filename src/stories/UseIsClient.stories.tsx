import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Globe, Server, Monitor } from 'lucide-react';

import { useIsClient } from '../hooks/use-is-client';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

/**
 * Demo component that shows client detection
 */
function UseIsClientDemo() {
  const isClient = useIsClient();

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useIsClient Hook Demo</h3>
          <Badge variant={isClient ? 'default' : 'secondary'}>
            {isClient ? (
              <>
                <Monitor className="mr-1 h-3 w-3" />
                Client
              </>
            ) : (
              <>
                <Server className="mr-1 h-3 w-3" />
                Server
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-muted">
          <p className="text-sm text-muted-foreground mb-2">Current environment:</p>
          <p className="text-2xl font-bold">{isClient ? '🖥️ Client-Side' : '⚙️ Server-Side'}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 rounded bg-muted">
            <span className="text-muted-foreground">Can access window:</span>
            <span className="font-semibold">{isClient ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-muted">
            <span className="text-muted-foreground">Can use localStorage:</span>
            <span className="font-semibold">{isClient ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-muted">
            <span className="text-muted-foreground">Can access document:</span>
            <span className="font-semibold">{isClient ? '✓ Yes' : '✗ No'}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Note: In Storybook, this will always show client-side after initial render.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing browser API access
 */
function BrowserAPIDemo() {
  const isClient = useIsClient();
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (isClient) {
      const updateSize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      updateSize();
      window.addEventListener('resize', updateSize);

      return () => window.removeEventListener('resize', updateSize);
    }
  }, [isClient]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Browser API Access</h3>
        </div>

        {!isClient ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">Waiting for client-side hydration...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border p-3 bg-primary/5">
                <p className="text-xs text-muted-foreground">Width</p>
                <p className="text-xl font-bold">{windowSize.width}px</p>
              </div>
              <div className="rounded-lg border p-3 bg-primary/5">
                <p className="text-xs text-muted-foreground">Height</p>
                <p className="text-xl font-bold">{windowSize.height}px</p>
              </div>
            </div>

            <div className="rounded-lg border p-3 bg-muted space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User Agent:</span>
                <span className="font-mono text-xs truncate max-w-[200px]">
                  {navigator.userAgent.split(' ')[0]}...
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Language:</span>
                <span className="font-semibold">{navigator.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Online:</span>
                <span className="font-semibold">{navigator.onLine ? '✓ Yes' : '✗ No'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing localStorage usage
 */
function LocalStorageDemo() {
  const isClient = useIsClient();
  const [value, setValue] = React.useState('');
  const [saved, setSaved] = React.useState('');

  React.useEffect(() => {
    if (isClient) {
      const savedValue = localStorage.getItem('useIsClient-demo') || '';
      setSaved(savedValue);
    }
  }, [isClient]);

  const handleSave = () => {
    if (isClient) {
      localStorage.setItem('useIsClient-demo', value);
      setSaved(value);
    }
  };

  const handleClear = () => {
    if (isClient) {
      localStorage.removeItem('useIsClient-demo');
      setValue('');
      setSaved('');
    }
  };

  if (!isClient) {
    return (
      <Card className="p-6 w-96">
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Server className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            localStorage access not available during SSR
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">localStorage Demo</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium">Enter value to save:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!value} className="flex-1">
            Save to Storage
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {saved && (
          <div className="rounded-lg border border-green-500 p-3 bg-green-50 dark:bg-green-950">
            <p className="text-xs text-green-700 dark:text-green-300 mb-1">Saved value:</p>
            <p className="text-sm font-semibold text-green-900 dark:text-green-100">{saved}</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          This data persists across page reloads (try refreshing the page).
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing conditional rendering
 */
function ConditionalRenderDemo() {
  const isClient = useIsClient();
  const [renderCount, setRenderCount] = React.useState(0);

  React.useEffect(() => {
    setRenderCount((c) => c + 1);
  }, [isClient]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conditional Rendering</h3>

        <div className="rounded-lg border p-4 bg-muted space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Render count:</p>
            <p className="text-2xl font-bold">{renderCount}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Environment:</p>
            <p className="text-lg font-semibold">{isClient ? 'Client' : 'Server'}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold mb-1">
              Always Rendered:
            </p>
            <p className="text-sm text-blue-900 dark:text-blue-100">
              This content is safe for both server and client.
            </p>
          </div>

          {isClient && (
            <div className="rounded-lg border p-3 bg-green-50 dark:bg-green-950">
              <p className="text-xs text-green-700 dark:text-green-300 font-semibold mb-1">
                Client-Only:
              </p>
              <p className="text-sm text-green-900 dark:text-green-100">
                This content only renders on the client to prevent hydration mismatches.
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Using useIsClient prevents hydration mismatches when conditionally rendering
          client-specific content.
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseIsClientDemo> = {
  title: 'Hooks/useIsClient',
  component: UseIsClientDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that detects if the code is running on the client-side (browser). Essential for SSR scenarios where you need to conditionally render content or access browser APIs safely. Prevents hydration mismatches between server and client rendering.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseIsClientDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useIsClient hook showing how to detect client-side environment.',
      },
    },
  },
};

export const BrowserAPI: Story = {
  render: () => <BrowserAPIDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates safe access to browser APIs like window, navigator, and DOM after client-side detection.',
      },
    },
  },
};

export const LocalStorage: Story = {
  render: () => <LocalStorageDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to safely use localStorage with useIsClient to prevent SSR errors and hydration issues.',
      },
    },
  },
};

export const ConditionalRendering: Story = {
  render: () => <ConditionalRenderDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Illustrates conditional rendering based on client detection to prevent hydration mismatches.',
      },
    },
  },
};

export const MultipleUseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseIsClientDemo />
      <BrowserAPIDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple use cases of the useIsClient hook working together.',
      },
    },
  },
};
