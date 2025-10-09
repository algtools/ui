import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CheckCircle2, XCircle, Loader2, Code, AlertCircle } from 'lucide-react';
import { useState } from 'react';

import { useScript } from '../hooks/use-script';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';

/**
 * Basic demo component that uses the useScript hook
 */
function UseScriptDemo() {
  const { status, isLoading, isReady, isError } = useScript(
    'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
  );

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">useScript Hook</h3>
          </div>
          <Badge
            variant={isReady ? 'default' : isError ? 'destructive' : 'secondary'}
            className="capitalize"
          >
            {status}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Loading:</span>
            <span className="font-medium">{isLoading ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ready:</span>
            <span className="font-medium">{isReady ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Error:</span>
            <span className="font-medium">{isError ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Script URL:</p>
          <p className="text-xs font-mono break-all">
            https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
          </p>
        </div>

        {isReady && (
          <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="text-xs text-green-600 dark:text-green-400">
                Lodash library loaded successfully!
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo with loading states
 */
function LoadingStatesDemo() {
  const [scriptUrl, setScriptUrl] = useState('');
  const [loadScript, setLoadScript] = useState(false);

  const { status, isLoading, isReady, isError } = useScript(loadScript ? scriptUrl : '', {
    removeOnUnmount: true,
  });

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    if (isReady) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (isError) return <XCircle className="h-5 w-5 text-red-500" />;
    return <Code className="h-5 w-5 text-gray-400" />;
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Loading States</h3>
          {getStatusIcon()}
        </div>

        <div className="space-y-2">
          <Label htmlFor="script-url">Script URL</Label>
          <Input
            id="script-url"
            value={scriptUrl}
            onChange={(e) => setScriptUrl(e.target.value)}
            placeholder="https://cdn.example.com/script.js"
            disabled={loadScript}
          />
        </div>

        <Button
          onClick={() => setLoadScript(!loadScript)}
          className="w-full"
          disabled={!scriptUrl}
          variant={loadScript ? 'destructive' : 'default'}
        >
          {loadScript ? 'Unload Script' : 'Load Script'}
        </Button>

        {loadScript && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={isReady ? 'default' : isError ? 'destructive' : 'secondary'}
                  className="capitalize"
                >
                  {status}
                </Badge>
              </div>

              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Loading script...</span>
                </div>
              )}

              {isReady && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Script loaded successfully!</span>
                </div>
              )}

              {isError && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <XCircle className="h-3 w-3" />
                  <span>Failed to load script</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo with popular CDN libraries
 */
function CDNLibrariesDemo() {
  const libraries = [
    {
      name: 'Lodash',
      url: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
      description: 'Utility library',
    },
    {
      name: 'Moment.js',
      url: 'https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js',
      description: 'Date library',
    },
    {
      name: 'Chart.js',
      url: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
      description: 'Charting library',
    },
  ];

  const [selectedLib, setSelectedLib] = useState<string | null>(null);
  const { status, isLoading, isReady, isError } = useScript(selectedLib || '');

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Load CDN Libraries</h3>

        <div className="space-y-2">
          {libraries.map((lib) => (
            <button
              key={lib.name}
              onClick={() => setSelectedLib(lib.url)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedLib === lib.url
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{lib.name}</p>
                  <p className="text-xs text-muted-foreground">{lib.description}</p>
                </div>
                {selectedLib === lib.url && (
                  <div>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
                    {isReady && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {isError && <XCircle className="h-4 w-4 text-red-500" />}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedLib && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <p className="text-xs text-muted-foreground mb-2">Status:</p>
            <div className="flex items-center gap-2">
              <Badge
                variant={isReady ? 'default' : isError ? 'destructive' : 'secondary'}
                className="capitalize"
              >
                {status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {isLoading && 'Loading...'}
                {isReady && 'Ready to use!'}
                {isError && 'Failed to load'}
              </span>
            </div>
          </div>
        )}

        <Button onClick={() => setSelectedLib(null)} variant="outline" className="w-full">
          Clear Selection
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo with script options
 */
function ScriptOptionsDemo() {
  const [options, setOptions] = useState({
    async: true,
    defer: false,
    removeOnUnmount: true,
  });

  const { status } = useScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js', {
    async: options.async,
    defer: options.defer,
    removeOnUnmount: options.removeOnUnmount,
    attributes: {
      'data-test': 'custom-attribute',
    },
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Script Options</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="async-switch" className="text-sm font-medium">
                Async Loading
              </Label>
              <p className="text-xs text-muted-foreground">Load script asynchronously</p>
            </div>
            <Switch
              id="async-switch"
              checked={options.async}
              onCheckedChange={(checked) => setOptions({ ...options, async: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="defer-switch" className="text-sm font-medium">
                Defer Execution
              </Label>
              <p className="text-xs text-muted-foreground">Defer script execution</p>
            </div>
            <Switch
              id="defer-switch"
              checked={options.defer}
              onCheckedChange={(checked) => setOptions({ ...options, defer: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="remove-switch" className="text-sm font-medium">
                Remove on Unmount
              </Label>
              <p className="text-xs text-muted-foreground">Clean up script on unmount</p>
            </div>
            <Switch
              id="remove-switch"
              checked={options.removeOnUnmount}
              onCheckedChange={(checked) => setOptions({ ...options, removeOnUnmount: checked })}
            />
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground mb-2">Current Status:</p>
          <Badge variant={status === 'ready' ? 'default' : 'secondary'} className="capitalize">
            {status}
          </Badge>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Changes to async/defer require remounting to take effect
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with error handling
 */
function ErrorHandlingDemo() {
  const [scriptUrl, setScriptUrl] = useState('https://cdn.example.com/nonexistent-script.js');
  const [loadScript, setLoadScript] = useState(false);

  const { status, isError, error } = useScript(loadScript ? scriptUrl : '');

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Error Handling</h3>

        <div className="space-y-2">
          <Label htmlFor="error-script-url">Script URL (try an invalid URL)</Label>
          <Input
            id="error-script-url"
            value={scriptUrl}
            onChange={(e) => setScriptUrl(e.target.value)}
            placeholder="https://example.com/script.js"
            disabled={loadScript}
          />
        </div>

        <Button
          onClick={() => setLoadScript(!loadScript)}
          className="w-full"
          variant={loadScript ? 'destructive' : 'default'}
        >
          {loadScript ? 'Reset' : 'Try Loading Script'}
        </Button>

        {loadScript && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant={isError ? 'destructive' : 'secondary'} className="capitalize">
                {status}
              </Badge>
            </div>

            {isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950 p-3">
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Failed to load script
                    </p>
                    {error && (
                      <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">
                        {error.message || 'Unknown error occurred'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 p-3">
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Try loading an invalid URL to see error handling in action
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with multiple scripts
 */
function MultipleScriptsDemo() {
  const script1 = useScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
  const script2 = useScript('https://cdn.jsdelivr.net/npm/axios@1.6.2/dist/axios.min.js');
  const script3 = useScript('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js');

  const scripts = [
    { name: 'Lodash', ...script1 },
    { name: 'Axios', ...script2 },
    { name: 'Day.js', ...script3 },
  ];

  const allReady = scripts.every((s) => s.isReady);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Multiple Scripts</h3>
          <Badge variant={allReady ? 'default' : 'secondary'}>
            {allReady ? 'All Ready' : 'Loading...'}
          </Badge>
        </div>

        <div className="space-y-2">
          {scripts.map((script) => (
            <div
              key={script.name}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
            >
              <span className="text-sm font-medium">{script.name}</span>
              <div className="flex items-center gap-2">
                {script.isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
                {script.isReady && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {script.isError && <XCircle className="h-4 w-4 text-red-500" />}
                <Badge
                  variant={
                    script.isReady ? 'default' : script.isError ? 'destructive' : 'secondary'
                  }
                  className="capitalize text-xs"
                >
                  {script.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {allReady && (
          <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-600 dark:text-green-400">
                All libraries loaded successfully!
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseScriptDemo> = {
  title: 'Hooks/useScript',
  component: UseScriptDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for dynamically loading external scripts with comprehensive state tracking. Features include SSR-safe implementation, duplicate script prevention, loading/error states, and automatic cleanup. Perfect for loading CDN libraries, analytics scripts, or any external JavaScript dynamically.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseScriptDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useScript hook. Loads a CDN library and tracks its loading status.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => <LoadingStatesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates all loading states (idle, loading, ready, error) with a dynamic script URL.',
      },
    },
  },
};

export const CDNLibraries: Story = {
  render: () => <CDNLibrariesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Load popular CDN libraries on demand. Shows how to dynamically load different scripts based on user selection.',
      },
    },
  },
};

export const WithOptions: Story = {
  render: () => <ScriptOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Configure script loading with options like async, defer, removeOnUnmount, and custom attributes.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  render: () => <ErrorHandlingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates error handling when a script fails to load. Try entering an invalid URL to see error states.',
      },
    },
  },
};

export const MultipleScripts: Story = {
  render: () => <MultipleScriptsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Load multiple scripts simultaneously. Each script is tracked independently with its own state.',
      },
    },
  },
};
