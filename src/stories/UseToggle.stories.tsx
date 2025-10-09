import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Check, X, Bell, BellOff } from 'lucide-react';

import { useToggle } from '../hooks/use-toggle';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useToggle hook
 */
function UseToggleDemo() {
  const { value, setTrue, setFalse, toggle } = useToggle(false);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useToggle Hook Demo</h3>
          <Badge variant={value ? 'default' : 'secondary'}>
            {value ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                ON
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" />
                OFF
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-4xl font-bold">{value ? 'TRUE' : 'FALSE'}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={setTrue} variant="default" className="w-full">
            Turn On
          </Button>
          <Button onClick={setFalse} variant="secondary" className="w-full">
            Turn Off
          </Button>
          <Button onClick={toggle} variant="outline" className="w-full">
            Toggle
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing toggle with callbacks
 */
function CallbacksDemo() {
  const { value, toggle } = useToggle(false, {
    onToggleOn: () => console.log('🟢 Turned ON'),
    onToggleOff: () => console.log('🔴 Turned OFF'),
    onChange: (newValue) => console.log('📝 Changed to:', newValue),
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Toggle with Callbacks</h3>
          <Badge variant={value ? 'default' : 'secondary'}>{value ? 'ON' : 'OFF'}</Badge>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground mb-2">
            This demo logs callbacks to the console. Open your browser console to see them!
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• onToggleOn: Called when turned on</li>
            <li>• onToggleOff: Called when turned off</li>
            <li>• onChange: Called on any change</li>
          </ul>
        </div>

        <Button onClick={toggle} className="w-full">
          Toggle & Check Console
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing notification toggle use case
 */
function NotificationToggleDemo() {
  const { value: isEnabled, toggle } = useToggle(true, {
    onToggleOn: () => console.log('Notifications enabled'),
    onToggleOff: () => console.log('Notifications disabled'),
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEnabled ? (
              <Bell className="h-5 w-5 text-primary" />
            ) : (
              <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <Button onClick={toggle} variant="outline" size="sm">
            {isEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>

        <div className={`rounded-lg border p-4 ${isEnabled ? 'bg-primary/5 border-primary' : ''}`}>
          <p className="text-sm">
            Notifications are currently{' '}
            <strong>{isEnabled ? 'enabled' : 'disabled'}</strong>.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {isEnabled
              ? 'You will receive notifications for new updates.'
              : 'You will not receive any notifications.'}
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing dark mode toggle use case
 */
function DarkModeToggleDemo() {
  const { value: isDark, toggle } = useToggle(false);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Theme Toggle</h3>
          <Badge variant="outline">{isDark ? '🌙 Dark' : '☀️ Light'}</Badge>
        </div>

        <div
          className={`rounded-lg border p-6 transition-colors ${
            isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900'
          }`}
        >
          <p className="text-center text-sm">
            This is a preview of {isDark ? 'dark' : 'light'} mode
          </p>
        </div>

        <Button onClick={toggle} className="w-full">
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing feature flag toggle use case
 */
function FeatureFlagDemo() {
  const { value: feature1, toggle: toggleFeature1 } = useToggle(false);
  const { value: feature2, toggle: toggleFeature2 } = useToggle(true);
  const { value: feature3, toggle: toggleFeature3 } = useToggle(false);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Feature Flags</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium text-sm">New Dashboard</p>
              <p className="text-xs text-muted-foreground">Enable redesigned UI</p>
            </div>
            <Button
              onClick={toggleFeature1}
              variant={feature1 ? 'default' : 'outline'}
              size="sm"
            >
              {feature1 ? 'ON' : 'OFF'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium text-sm">Advanced Analytics</p>
              <p className="text-xs text-muted-foreground">Access detailed reports</p>
            </div>
            <Button
              onClick={toggleFeature2}
              variant={feature2 ? 'default' : 'outline'}
              size="sm"
            >
              {feature2 ? 'ON' : 'OFF'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium text-sm">Beta Features</p>
              <p className="text-xs text-muted-foreground">Try experimental features</p>
            </div>
            <Button
              onClick={toggleFeature3}
              variant={feature3 ? 'default' : 'outline'}
              size="sm"
            >
              {feature3 ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">
            Active features:{' '}
            <strong>
              {[feature1, feature2, feature3].filter(Boolean).length} of 3
            </strong>
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseToggleDemo> = {
  title: 'Hooks/useToggle',
  component: UseToggleDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing toggle state with advanced options including callbacks. Similar to useBoolean but with additional callback support for state changes (onToggleOn, onToggleOff, onChange).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useToggle hook showing all available methods.',
      },
    },
  },
};

export const WithCallbacks: Story = {
  render: () => <CallbacksDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Toggle with callback functions. Open the browser console to see callbacks being triggered.',
      },
    },
  },
};

export const NotificationToggle: Story = {
  render: () => <NotificationToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A common use case: toggling notifications on/off with visual feedback.',
      },
    },
  },
};

export const DarkModeToggle: Story = {
  render: () => <DarkModeToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Theme toggling example showing visual preview of the current mode.',
      },
    },
  },
};

export const FeatureFlags: Story = {
  render: () => <FeatureFlagDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent toggles for managing feature flags.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseToggleDemo />
      <NotificationToggleDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useToggle hook working together.',
      },
    },
  },
};
