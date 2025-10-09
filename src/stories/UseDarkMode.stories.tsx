import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Moon, Sun, Monitor } from 'lucide-react';

import { useDarkMode } from '../hooks/use-dark-mode';
import { useTernaryDarkMode, type TernaryDarkMode } from '../hooks/use-ternary-dark-mode';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useDarkMode hook (binary)
 */
function UseDarkModeDemo() {
  const { isDarkMode, enable, disable, toggle } = useDarkMode();

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useDarkMode Hook</h3>
          <Badge variant={isDarkMode ? 'default' : 'secondary'}>
            {isDarkMode ? (
              <>
                <Moon className="mr-1 h-3 w-3" />
                Dark
              </>
            ) : (
              <>
                <Sun className="mr-1 h-3 w-3" />
                Light
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-6 text-center bg-background">
          <div className="text-6xl mb-2">{isDarkMode ? '🌙' : '☀️'}</div>
          <p className="text-sm text-muted-foreground">
            Current mode: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={enable} variant={isDarkMode ? 'default' : 'outline'} className="w-full">
            <Moon className="mr-2 h-4 w-4" />
            Enable Dark Mode
          </Button>
          <Button
            onClick={disable}
            variant={!isDarkMode ? 'default' : 'outline'}
            className="w-full"
          >
            <Sun className="mr-2 h-4 w-4" />
            Enable Light Mode
          </Button>
          <Button onClick={toggle} variant="secondary" className="w-full">
            Toggle Mode
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Persists to localStorage</p>
          <p>• Syncs across browser tabs</p>
          <p>• Applies dark class to document</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component that uses the useTernaryDarkMode hook (light/dark/system)
 */
function UseTernaryDarkModeDemo() {
  const { mode, isDarkMode, setLight, setDark, setSystem, toggle } = useTernaryDarkMode();

  const getModeIcon = () => {
    if (mode === 'system') return <Monitor className="h-4 w-4" />;
    if (mode === 'dark') return <Moon className="h-4 w-4" />;
    return <Sun className="h-4 w-4" />;
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useTernaryDarkMode Hook</h3>
          <Badge variant={isDarkMode ? 'default' : 'secondary'}>
            <span className="mr-1">{getModeIcon()}</span>
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Badge>
        </div>

        <div className="rounded-lg border p-6 text-center bg-background">
          <div className="text-6xl mb-2">{mode === 'system' ? '🖥️' : isDarkMode ? '🌙' : '☀️'}</div>
          <p className="text-sm text-muted-foreground">
            Mode: <strong>{mode}</strong>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Currently rendering: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={setLight} variant={mode === 'light' ? 'default' : 'outline'}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>
          <Button onClick={setDark} variant={mode === 'dark' ? 'default' : 'outline'}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>
          <Button onClick={setSystem} variant={mode === 'system' ? 'default' : 'outline'}>
            <Monitor className="mr-2 h-4 w-4" />
            System
          </Button>
          <Button onClick={toggle} variant="secondary">
            Toggle
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Three modes: light, dark, system</p>
          <p>• System mode follows OS preference</p>
          <p>• Persists to localStorage</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo showing both hooks side by side
 */
function ComparisonDemo() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Binary Mode</h4>
        <UseDarkModeDemo />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Ternary Mode</h4>
        <UseTernaryDarkModeDemo />
      </div>
    </div>
  );
}

/**
 * Demo with dropdown selector for ternary mode
 */
function DropdownSelectorDemo() {
  const { mode, setMode, isDarkMode } = useTernaryDarkMode();

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as TernaryDarkMode);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dropdown Selector</h3>

        <div className="space-y-2">
          <label htmlFor="theme-select" className="text-sm font-medium">
            Select Theme:
          </label>
          <select
            id="theme-select"
            value={mode}
            onChange={handleModeChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="rounded-lg border p-4 bg-secondary/10">
          <p className="text-sm">
            Current mode: <strong>{mode}</strong>
          </p>
          <p className="text-sm">
            Active theme: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong>
          </p>
          {mode === 'system' && (
            <p className="text-xs text-muted-foreground mt-2">
              Following your operating system preference
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo showing theme-aware content
 */
function ThemeAwareContentDemo() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Theme-Aware Content</h3>
          <Button onClick={toggle} variant="outline" size="sm">
            {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border p-4 bg-background">
            <h4 className="font-semibold text-sm mb-2">Background Colors</h4>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded bg-background border" />
              <div className="h-8 w-8 rounded bg-foreground" />
              <div className="h-8 w-8 rounded bg-muted" />
              <div className="h-8 w-8 rounded bg-accent" />
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-card">
            <p className="text-sm">
              The theme automatically updates all Tailwind CSS color tokens. This includes{' '}
              <code className="text-xs bg-secondary px-1 py-0.5 rounded">background</code>,{' '}
              <code className="text-xs bg-secondary px-1 py-0.5 rounded">foreground</code>,{' '}
              <code className="text-xs bg-secondary px-1 py-0.5 rounded">border</code>, and more.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseDarkModeDemo> = {
  title: 'Hooks/Dark Mode',
  component: UseDarkModeDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom hooks for managing dark mode with localStorage persistence and system preference sync. Includes both binary (useDarkMode) and ternary (useTernaryDarkMode) options.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BinaryMode: Story = {
  render: () => <UseDarkModeDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Simple binary dark mode hook with light and dark options. Perfect for basic theme switching.',
      },
    },
  },
};

export const TernaryMode: Story = {
  render: () => <UseTernaryDarkModeDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Advanced ternary dark mode hook with light, dark, and system options. System mode automatically follows OS preferences.',
      },
    },
  },
};

export const Comparison: Story = {
  render: () => <ComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of both dark mode hooks.',
      },
    },
  },
};

export const DropdownSelector: Story = {
  render: () => <DropdownSelectorDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Using the ternary dark mode hook with a dropdown selector.',
      },
    },
  },
};

export const ThemeAwareContent: Story = {
  render: () => <ThemeAwareContentDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how dark mode affects theme-aware content and Tailwind CSS color tokens.',
      },
    },
  },
};
