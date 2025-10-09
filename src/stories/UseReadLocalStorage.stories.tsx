import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Eye, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';

import { useReadLocalStorage } from '../hooks/use-read-local-storage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

/**
 * Demo component showing read-only access with manual localStorage updates
 */
function UseReadLocalStorageDemo() {
  const STORAGE_KEY = 'read-demo-text';
  const { value, error } = useReadLocalStorage(STORAGE_KEY, 'Default Value');
  const [inputValue, setInputValue] = React.useState('');

  const handleManualUpdate = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inputValue));
      // Manually dispatch storage event to simulate cross-tab update
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: STORAGE_KEY,
          newValue: JSON.stringify(inputValue),
          oldValue: window.localStorage.getItem(STORAGE_KEY),
          storageArea: window.localStorage,
          url: window.location.href,
        })
      );
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useReadLocalStorage Demo</h3>
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            Read-Only
          </Badge>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>How It Works</AlertTitle>
          <AlertDescription className="text-xs mt-2 space-y-2">
            <p>
              This hook reads from localStorage and listens for changes from{' '}
              <strong>other browser tabs/windows</strong>.
            </p>
            <p>
              Storage events only fire for OTHER tabs, not the same page. To test cross-tab sync:
            </p>
            <ol className="list-decimal ml-4 mt-1 space-y-1">
              <li>Open this story in a new tab</li>
              <li>Update the value in one tab using the controls below</li>
              <li>Watch the value update in the other tab automatically!</li>
            </ol>
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>Error: {error.message}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Current Value (Read-Only):</p>
          <p className="text-sm font-mono break-all bg-background p-3 rounded">{value}</p>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Update localStorage:</p>
          <div className="space-y-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a new value..."
            />
            <Button onClick={handleManualUpdate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Value (Simulates Cross-Tab Change)
            </Button>
            <p className="text-xs text-muted-foreground">
              This manually updates localStorage and dispatches a storage event to simulate a
              cross-tab update.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Reader-only component for cross-tab demo
 */
function ReaderComponent({ storageKey }: { storageKey: string }) {
  const { value } = useReadLocalStorage(storageKey, 0);

  return (
    <Card className="p-6 flex-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reader</h3>
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            Read-Only
          </Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-muted/50">
          <p className="text-6xl font-bold tabular-nums">{value}</p>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            This component only reads the value. It will update when the value changes in another
            tab.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Writer component for cross-tab demo
 */
function WriterComponent({ storageKey }: { storageKey: string }) {
  const [localValue, setLocalValue] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try {
          setLocalValue(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, [storageKey]);

  const updateValue = (newValue: number) => {
    setLocalValue(newValue);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, JSON.stringify(newValue));
      // Storage events don't fire for the same page, so we manually dispatch
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: storageKey,
          newValue: JSON.stringify(newValue),
          oldValue: window.localStorage.getItem(storageKey),
          storageArea: window.localStorage,
          url: window.location.href,
        })
      );
    }
  };

  return (
    <Card className="p-6 flex-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Writer</h3>
          <Badge variant="secondary">
            <RefreshCw className="mr-1 h-3 w-3" />
            Write
          </Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-primary/5">
          <p className="text-6xl font-bold tabular-nums">{localValue}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => updateValue(localValue - 1)} variant="outline">
            -1
          </Button>
          <Button onClick={() => updateValue(0)} variant="secondary">
            Reset
          </Button>
          <Button onClick={() => updateValue(localValue + 1)} variant="default">
            +1
          </Button>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            This component writes to localStorage. The reader will sync automatically.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Demo showing cross-component synchronization
 */
function CrossTabDemo() {
  const STORAGE_KEY = 'sync-counter-demo';

  return (
    <div className="w-full max-w-5xl space-y-4">
      <Alert className="mb-4">
        <ExternalLink className="h-4 w-4" />
        <AlertTitle>Test Cross-Tab Synchronization</AlertTitle>
        <AlertDescription className="text-xs mt-2">
          <p className="mb-2">
            To see the automatic synchronization in action, open this story in multiple browser
            tabs:
          </p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Right-click this tab and select &quot;Duplicate Tab&quot;</li>
            <li>Arrange the windows side-by-side</li>
            <li>Click the +1 or -1 buttons in one tab</li>
            <li>Watch the Reader update automatically in both tabs!</li>
          </ol>
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 flex-wrap">
        <ReaderComponent storageKey={STORAGE_KEY} />
        <WriterComponent storageKey={STORAGE_KEY} />
      </div>
    </div>
  );
}

/**
 * Demo showing theme monitoring
 */
function ThemeMonitorDemo() {
  interface ThemeConfig {
    mode: 'light' | 'dark' | 'system';
    primaryColor: string;
  }

  const THEME_KEY = 'app-theme-demo';
  const { value: theme } = useReadLocalStorage<ThemeConfig>(THEME_KEY, {
    mode: 'system',
    primaryColor: '#3b82f6',
  });

  const [localTheme, setLocalTheme] = React.useState<ThemeConfig>(theme);

  React.useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...localTheme, ...updates };
    setLocalTheme(newTheme);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, JSON.stringify(newTheme));
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: THEME_KEY,
          newValue: JSON.stringify(newTheme),
          oldValue: window.localStorage.getItem(THEME_KEY),
          storageArea: window.localStorage,
          url: window.location.href,
        })
      );
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Open this story in multiple tabs to see theme changes sync automatically between them.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 flex-wrap">
        <Card className="p-6 flex-1 min-w-[300px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Theme Monitor</h3>
              <Badge variant="outline">
                <Eye className="mr-1 h-3 w-3" />
                Read-Only
              </Badge>
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">Current Theme:</p>
              <div className="space-y-1 text-sm font-mono">
                <p>Mode: {theme.mode}</p>
                <div className="flex items-center gap-2">
                  <p>Color:</p>
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <p>{theme.primaryColor}</p>
                </div>
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                This view is read-only and syncs automatically with changes from other tabs.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        <Card className="p-6 flex-1 min-w-[300px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Theme Controller</h3>
              <Badge variant="secondary">
                <RefreshCw className="mr-1 h-3 w-3" />
                Write
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="theme-mode">Theme Mode</Label>
                <select
                  id="theme-mode"
                  value={localTheme.mode}
                  onChange={(e) => updateTheme({ mode: e.target.value as ThemeConfig['mode'] })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="theme-color"
                    type="color"
                    value={localTheme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={localTheme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                Changes here will be reflected in the Theme Monitor and in other tabs.
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Simple demo showing the read-only nature
 */
function ReadOnlyDemo() {
  const DEMO_KEY = 'read-only-demo';
  const { value } = useReadLocalStorage(DEMO_KEY, 'Initial value');

  return (
    <Card className="p-6 w-full max-w-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Read-Only View</h3>
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            No Write Access
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Stored Value:</p>
          <p className="text-sm font-mono break-all bg-background p-3 rounded">{value}</p>
        </div>

        <Alert>
          <AlertTitle className="text-sm">Key Features</AlertTitle>
          <AlertDescription className="text-xs mt-2">
            <ul className="list-disc ml-4 space-y-1">
              <li>No setValue or removeValue methods</li>
              <li>Prevents accidental modifications</li>
              <li>Automatically syncs with changes from other tabs</li>
              <li>Perfect for display-only components</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="text-xs text-muted-foreground p-3 bg-muted rounded">
          <p className="font-medium mb-1">💡 Tip:</p>
          <p>
            Use browser DevTools to modify localStorage (key: &quot;{DEMO_KEY}&quot;) and see the
            value update, or open in multiple tabs to see cross-tab sync.
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseReadLocalStorageDemo> = {
  title: 'Hooks/useReadLocalStorage',
  component: UseReadLocalStorageDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for reading values from localStorage without write capabilities. Automatically syncs when values change from **other browser tabs/windows** via the storage event. Features SSR support and error handling. **Note**: Storage events only fire for OTHER tabs, not the same page.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseReadLocalStorageDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Basic usage of the useReadLocalStorage hook. Demonstrates read-only access with simulated cross-tab updates. The button manually dispatches a storage event to demonstrate the hook's reactivity.",
      },
    },
  },
};

export const ReadOnlyNature: Story = {
  render: () => <ReadOnlyDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the read-only nature of the hook. No write methods are exposed, making it perfect for display-only components that need to read shared state.',
      },
    },
  },
};

export const CrossTabSync: Story = {
  render: () => <CrossTabDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstrates automatic synchronization between reader and writer components. **To test**: Open this story in multiple browser tabs and watch values sync automatically when you make changes in one tab!',
      },
    },
  },
};

export const ThemeMonitor: Story = {
  render: () => <ThemeMonitorDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Monitor theme configuration in read-only mode. Open in multiple tabs to see theme changes sync automatically. Perfect for display components that need to reflect settings from a central store.',
      },
    },
  },
};
