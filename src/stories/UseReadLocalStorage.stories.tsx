import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Eye, RefreshCw, Settings } from 'lucide-react';

import { useReadLocalStorage } from '../hooks/use-read-local-storage';
import { useLocalStorage } from '../hooks/use-local-storage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Switch } from '../components/ui/switch';

/**
 * Demo component showing read-only access to localStorage
 */
function UseReadLocalStorageDemo() {
  const { value, error } = useReadLocalStorage('read-demo-text', 'Default Value');
  const { setValue: setWritableValue } = useLocalStorage('read-demo-text', 'Default Value');

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useReadLocalStorage Demo</h3>
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            Read-Only
          </Badge>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>Error: {error.message}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Current Value (Read-Only):</p>
          <p className="text-sm font-mono break-all">{value}</p>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            This hook only reads from localStorage. To modify the value, use another source or
            useLocalStorage.
          </AlertDescription>
        </Alert>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">External Writer:</p>
          <div className="space-y-2">
            <Input
              value={value}
              onChange={(e) => setWritableValue(e.target.value)}
              placeholder="Modify value here..."
            />
            <p className="text-xs text-muted-foreground">
              Changes made here are reflected in the read-only view above
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing theme monitoring
 */
function ThemeMonitorDemo() {
  interface ThemeConfig {
    mode: 'light' | 'dark' | 'system';
    primaryColor: string;
    fontSize: number;
  }

  const { value: theme } = useReadLocalStorage<ThemeConfig>('app-theme', {
    mode: 'system',
    primaryColor: '#3b82f6',
    fontSize: 16,
  });

  const { setValue: setTheme } = useLocalStorage<ThemeConfig>('app-theme', {
    mode: 'system',
    primaryColor: '#3b82f6',
    fontSize: 16,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Theme Monitor</h3>
          <Badge variant="secondary">
            <Eye className="mr-1 h-3 w-3" />
            Observer
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Current Theme:</p>
          <div className="space-y-1 text-sm font-mono">
            <p>Mode: {theme.mode}</p>
            <p>Color: {theme.primaryColor}</p>
            <p>Font Size: {theme.fontSize}px</p>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            This component only reads the theme. Changes from other components are automatically
            reflected here.
          </AlertDescription>
        </Alert>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Theme Controller:</p>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <select
              value={theme.mode}
              onChange={(e) =>
                setTheme((prev) => ({ ...prev, mode: e.target.value as ThemeConfig['mode'] }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <Input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => setTheme((prev) => ({ ...prev, primaryColor: e.target.value }))}
            />
            <Input
              type="number"
              value={theme.fontSize}
              onChange={(e) =>
                setTheme((prev) => ({ ...prev, fontSize: parseInt(e.target.value) || 16 }))
              }
              min="12"
              max="24"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing settings display
 */
function SettingsDisplayDemo() {
  interface AppSettings {
    notifications: boolean;
    autoSave: boolean;
    language: string;
  }

  const { value: settings } = useReadLocalStorage<AppSettings>('app-settings-demo', {
    notifications: true,
    autoSave: false,
    language: 'en',
  });

  const { setValue: setSettings } = useLocalStorage<AppSettings>('app-settings-demo', {
    notifications: true,
    autoSave: false,
    language: 'en',
  });

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Settings Display</h3>
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            Read-Only View
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-primary/5">
          <p className="text-sm font-medium mb-3">Current Settings:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Notifications:</span>
              <Badge variant={settings.notifications ? 'default' : 'secondary'}>
                {settings.notifications ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Auto Save:</span>
              <Badge variant={settings.autoSave ? 'default' : 'secondary'}>
                {settings.autoSave ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Language:</span>
              <Badge variant="outline">{settings.language}</Badge>
            </div>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            This is a read-only display. Modify settings using the controls below.
          </AlertDescription>
        </Alert>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Settings Controls:</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave">Auto Save</Label>
              <Switch
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing cross-component synchronization
 */
function SyncDemo() {
  const { value: counter } = useReadLocalStorage('sync-counter', 0);
  const { setValue: setCounter } = useLocalStorage('sync-counter', 0);

  return (
    <div className="flex gap-4">
      <Card className="p-6 w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reader Component</h3>
            <Badge variant="outline">
              <Eye className="mr-1 h-3 w-3" />
              Read
            </Badge>
          </div>

          <div className="rounded-lg border p-8 text-center bg-muted/50">
            <p className="text-6xl font-bold tabular-nums">{counter}</p>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              This component only reads the value. It automatically updates when the value changes.
            </AlertDescription>
          </Alert>
        </div>
      </Card>

      <Card className="p-6 w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Writer Component</h3>
            <Badge variant="secondary">
              <RefreshCw className="mr-1 h-3 w-3" />
              Write
            </Badge>
          </div>

          <div className="rounded-lg border p-8 text-center bg-primary/5">
            <p className="text-6xl font-bold tabular-nums">{counter}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => setCounter((c) => c - 1)} variant="outline">
              -1
            </Button>
            <Button onClick={() => setCounter(0)} variant="secondary">
              Reset
            </Button>
            <Button onClick={() => setCounter((c) => c + 1)} variant="default">
              +1
            </Button>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              This component can modify the value. The reader component will automatically sync.
            </AlertDescription>
          </Alert>
        </div>
      </Card>
    </div>
  );
}

/**
 * Demo component showing user info display
 */
function UserInfoDemo() {
  interface User {
    name: string;
    email: string;
    role: string;
  }

  const { value: user, error } = useReadLocalStorage<User>('user-info-demo', {
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'visitor',
  });

  const { setValue: setUser } = useLocalStorage<User>('user-info-demo', {
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'visitor',
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">User Profile View</h3>
          <Badge variant="outline">Read-Only</Badge>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>Error loading user data: {error.message}</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription className="text-xs">
            This component displays user data in read-only mode. Perfect for dashboards and info
            panels.
          </AlertDescription>
        </Alert>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Update User (Simulated):</p>
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            />
            <select
              value={user.role}
              onChange={(e) => setUser((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="visitor">Visitor</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
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
          'A custom hook for reading values from localStorage without write capabilities. Automatically syncs when values change from other sources. Features SSR support and error handling.',
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
          'Basic usage of the useReadLocalStorage hook. Demonstrates read-only access with external modification.',
      },
    },
  },
};

export const ThemeMonitor: Story = {
  render: () => <ThemeMonitorDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Monitor theme configuration in read-only mode. Perfect for display components that need to reflect settings.',
      },
    },
  },
};

export const SettingsDisplay: Story = {
  render: () => <SettingsDisplayDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Display application settings in read-only mode with external controls.',
      },
    },
  },
};

export const CrossComponentSync: Story = {
  render: () => <SyncDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstrates automatic synchronization between reader and writer components. Changes in one are reflected in the other.',
      },
    },
  },
};

export const UserInfo: Story = {
  render: () => <UserInfoDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Display user information in read-only mode. Useful for profile displays and info panels.',
      },
    },
  },
};
