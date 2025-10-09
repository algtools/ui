import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Trash2, RotateCcw, Clock } from 'lucide-react';

import { useSessionStorage } from '../hooks/use-session-storage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Switch } from '../components/ui/switch';

/**
 * Demo component that uses the useSessionStorage hook for basic string storage
 */
function UseSessionStorageDemo() {
  const { value, setValue, removeValue, error } = useSessionStorage(
    'demo-session-text',
    'Session Data'
  );

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useSessionStorage Hook Demo</h3>
          <Badge variant="outline">sessionStorage</Badge>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>Error: {error.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="demo-input">Stored Value</Label>
          <Input
            id="demo-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
          <p className="text-xs text-muted-foreground">
            Changes are automatically saved to sessionStorage
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Current Value:</p>
          <p className="text-sm font-mono break-all">{value}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={removeValue} variant="destructive" className="flex-1" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={() => setValue('Session Data')}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Data persists only for the current tab session. Closing the tab will clear this data.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Demo component showing multi-step form with session persistence
 */
function MultiStepFormDemo() {
  interface FormState {
    step: number;
    name: string;
    email: string;
    phone: string;
  }

  const {
    value: formState,
    setValue: setFormState,
    removeValue,
  } = useSessionStorage<FormState>('multi-step-form', {
    step: 1,
    name: '',
    email: '',
    phone: '',
  });

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => updateField('step', Math.min(3, formState.step + 1));
  const prevStep = () => updateField('step', Math.max(1, formState.step - 1));

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Multi-Step Form</h3>
          <Badge variant="secondary">Step {formState.step}/3</Badge>
        </div>

        <div className="flex gap-1 mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full ${
                step <= formState.step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="space-y-3">
          {formState.step === 1 && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
          )}

          {formState.step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          )}

          {formState.step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="text-xs font-medium mb-1">Review:</p>
                <pre className="text-xs font-mono">{JSON.stringify(formState, null, 2)}</pre>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {formState.step > 1 && (
            <Button onClick={prevStep} variant="outline" className="flex-1">
              Previous
            </Button>
          )}
          {formState.step < 3 ? (
            <Button onClick={nextStep} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={removeValue} className="flex-1">
              Submit & Clear
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Form progress is saved for this session
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing tab-specific counter
 */
function TabCounterDemo() {
  const { value: count, setValue: setCount } = useSessionStorage('tab-counter', 0);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tab-Specific Counter</h3>
          <Badge variant="secondary">This Tab Only</Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
          <p className="text-6xl font-bold tabular-nums">{count}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => setCount((c) => c - 1)} variant="outline">
            -1
          </Button>
          <Button onClick={() => setCount(0)} variant="secondary">
            Reset
          </Button>
          <Button onClick={() => setCount((c) => c + 1)} variant="default">
            +1
          </Button>
        </div>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Open this story in a new tab - each tab has its own counter!
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Demo component showing temporary user settings
 */
function TempSettingsDemo() {
  interface TempSettings {
    viewMode: 'grid' | 'list';
    showPreview: boolean;
    sortBy: string;
  }

  const {
    value: settings,
    setValue: setSettings,
    removeValue,
  } = useSessionStorage<TempSettings>('temp-settings', {
    viewMode: 'grid',
    showPreview: true,
    sortBy: 'name',
  });

  const updateSetting = <K extends keyof TempSettings>(key: K, value: TempSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Temporary Settings</h3>
          <Button onClick={removeValue} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="viewMode">View Mode</Label>
            <select
              id="viewMode"
              value={settings.viewMode}
              onChange={(e) =>
                updateSetting('viewMode', e.target.value as TempSettings['viewMode'])
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showPreview">Show Preview</Label>
            <Switch
              id="showPreview"
              checked={settings.showPreview}
              onCheckedChange={(checked) => updateSetting('showPreview', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort By</Label>
            <Input
              id="sortBy"
              value={settings.sortBy}
              onChange={(e) => updateSetting('sortBy', e.target.value)}
              placeholder="name, date, size..."
            />
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <p className="text-xs font-medium mb-1">Current Settings:</p>
          <pre className="text-xs font-mono overflow-auto">{JSON.stringify(settings, null, 2)}</pre>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            These settings are temporary and won&apos;t persist when you close this tab.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Demo component showing session-based draft storage
 */
function DraftEditorDemo() {
  interface Draft {
    title: string;
    content: string;
    lastModified: string;
  }

  const {
    value: draft,
    setValue: setDraft,
    removeValue,
  } = useSessionStorage<Draft>('draft-editor', {
    title: '',
    content: '',
    lastModified: new Date().toISOString(),
  });

  const updateDraft = (updates: Partial<Draft>) => {
    setDraft((prev) => ({
      ...prev,
      ...updates,
      lastModified: new Date().toISOString(),
    }));
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Draft Editor</h3>
          <Badge variant="outline">Auto-saved</Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={draft.title}
              onChange={(e) => updateDraft({ title: e.target.value })}
              placeholder="Draft title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={draft.content}
              onChange={(e) => updateDraft({ content: e.target.value })}
              placeholder="Start typing your draft..."
              className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Last modified: {new Date(draft.lastModified).toLocaleTimeString()}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => alert('Draft published!')} className="flex-1">
            Publish
          </Button>
          <Button onClick={removeValue} variant="outline" className="flex-1">
            <Trash2 className="mr-2 h-4 w-4" />
            Discard
          </Button>
        </div>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Your draft is saved only for this browsing session. Publish or save elsewhere before
            closing!
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseSessionStorageDemo> = {
  title: 'Hooks/useSessionStorage',
  component: UseSessionStorageDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing state that persists to sessionStorage with automatic JSON serialization. Data is cleared when the tab is closed. Features SSR support and error handling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseSessionStorageDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useSessionStorage hook with string values.',
      },
    },
  },
};

export const MultiStepForm: Story = {
  render: () => <MultiStepFormDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A multi-step form that preserves progress during the session. Perfect for wizards and multi-page forms.',
      },
    },
  },
};

export const TabCounter: Story = {
  render: () => <TabCounterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates tab-specific storage. Each browser tab maintains its own counter value.',
      },
    },
  },
};

export const TemporarySettings: Story = {
  render: () => <TempSettingsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Temporary UI settings that apply only to the current session.',
      },
    },
  },
};

export const DraftEditor: Story = {
  render: () => <DraftEditorDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Auto-saving draft editor with session-scoped persistence.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <UseSessionStorageDemo />
      <TabCounterDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of useSessionStorage working simultaneously.',
      },
    },
  },
};
