import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { useState } from 'react';
import { Search, Save, MousePointer, CheckCircle2, XCircle, Zap } from 'lucide-react';

import { useDebounceCallback } from '../hooks/use-debounce-callback';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

/**
 * Demo component that uses the useDebounceCallback hook for search
 */
function SearchDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (query: string) => {
    setIsSearching(true);
    setSearchCount((prev) => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const results = query
        ? [
            `Result 1 for "${query}"`,
            `Result 2 for "${query}"`,
            `Result 3 for "${query}"`,
            `Result 4 for "${query}"`,
          ]
        : [];
      setSearchResults(results);
      setIsSearching(false);
    }, 100);
  };

  const { callback: debouncedSearch, cancel, flush } = useDebounceCallback(performSearch, 500);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value) {
      debouncedSearch(value);
    } else {
      cancel();
      setSearchResults([]);
    }
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Search with Debounce</h3>
          <Badge variant="secondary">500ms delay</Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search Query</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              cancel();
              setSearchResults([]);
            }}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <XCircle className="mr-2 h-3 w-3" />
            Cancel
          </Button>
          <Button onClick={() => flush()} variant="outline" size="sm" className="flex-1">
            <Zap className="mr-2 h-3 w-3" />
            Search Now
          </Button>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Calls Made:</span>
              <span className="font-mono font-semibold">{searchCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-mono font-semibold">
                {isSearching ? 'Searching...' : 'Idle'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Search Results</p>
          {searchResults.length > 0 ? (
            <ul className="space-y-1">
              {searchResults.map((result, index) => (
                <li key={index} className="text-sm p-2 rounded border bg-card hover:bg-accent">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded">
              {searchTerm ? 'Waiting for search...' : 'Start typing to see results...'}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          API calls are only made 500ms after you stop typing. Use Cancel to abort pending searches
          or Search Now to execute immediately.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing auto-save with flush on unmount
 */
function AutoSaveDemo() {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [saveCount, setSaveCount] = useState(0);
  const [lastSaveTime, setLastSaveTime] = useState<string>('Never');

  const saveContent = (text: string) => {
    setSavedContent(text);
    setSaveCount((prev) => prev + 1);
    setLastSaveTime(new Date().toLocaleTimeString());
  };

  const { callback: debouncedSave, cancel, flush } = useDebounceCallback(saveContent, 1000);

  const handleChange = (text: string) => {
    setContent(text);
    debouncedSave(text);
  };

  const hasUnsavedChanges = content !== savedContent;

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Auto-Save Editor</h3>
          <Badge variant="secondary">1000ms delay</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="editor">Content</Label>
            <Badge variant={hasUnsavedChanges ? 'outline' : 'default'}>
              {hasUnsavedChanges ? (
                <>
                  <Save className="mr-1 h-3 w-3" />
                  Unsaved
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Saved
                </>
              )}
            </Badge>
          </div>
          <textarea
            id="editor"
            placeholder="Start typing... Auto-saves after 1 second"
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <p className="text-xs text-muted-foreground">{content.length} characters</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              flush();
            }}
            variant="default"
            size="sm"
            className="flex-1"
            disabled={!hasUnsavedChanges}
          >
            <Save className="mr-2 h-3 w-3" />
            Save Now
          </Button>
          <Button
            onClick={() => {
              cancel();
              setContent(savedContent);
            }}
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={!hasUnsavedChanges}
          >
            <XCircle className="mr-2 h-3 w-3" />
            Discard
          </Button>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Auto-Saves:</span>
              <span className="font-mono font-semibold">{saveCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Saved:</span>
              <span className="font-mono font-semibold">{lastSaveTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Saved Content Preview</Label>
          <div className="rounded-lg border p-3 bg-muted/30 min-h-[80px]">
            {savedContent ? (
              <p className="text-sm whitespace-pre-wrap">{savedContent}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Nothing saved yet. Start typing to see auto-save in action.
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Content is automatically saved 1 second after you stop typing. Use Save Now to save
          immediately or Discard to revert to the last saved version.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing window resize handler
 */
function ResizeHandlerDemo() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [resizeCount, setResizeCount] = useState(0);

  const handleResize = (width: number, height: number) => {
    setDimensions({ width, height });
    setResizeCount((prev) => prev + 1);
  };

  const { callback: debouncedResize } = useDebounceCallback(handleResize, 300);

  React.useEffect(() => {
    const handler = () => {
      debouncedResize(window.innerWidth, window.innerHeight);
    };

    // Initial call
    handler();

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [debouncedResize]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Window Resize Handler</h3>
          <Badge variant="secondary">300ms delay</Badge>
        </div>

        <div className="rounded-lg border p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="space-y-3 text-center">
            <MousePointer className="h-8 w-8 mx-auto text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Window Dimensions</p>
              <p className="text-3xl font-bold font-mono">
                {dimensions.width} × {dimensions.height}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resize Events Processed:</span>
              <span className="font-mono font-semibold">{resizeCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aspect Ratio:</span>
              <span className="font-mono font-semibold">
                {dimensions.width && dimensions.height
                  ? (dimensions.width / dimensions.height).toFixed(2)
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded">
          <p>Try resizing your browser window!</p>
        </div>

        <p className="text-xs text-muted-foreground">
          Window resize events are debounced to prevent excessive updates. The handler is called
          300ms after the user stops resizing.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing form validation
 */
function FormValidationDemo() {
  const [email, setEmail] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);
  const [validationCount, setValidationCount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = (value: string) => {
    setIsValidating(true);
    setValidationCount((prev) => prev + 1);

    // Simulate async validation
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(value);

      setValidationResult({
        isValid,
        message: isValid ? 'Email is valid!' : 'Please enter a valid email address',
      });
      setIsValidating(false);
    }, 100);
  };

  const { callback: debouncedValidate, cancel } = useDebounceCallback(validateEmail, 400);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setValidationResult(null);

    if (value.trim()) {
      debouncedValidate(value);
    } else {
      cancel();
    }
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Form Validation</h3>
          <Badge variant="secondary">400ms delay</Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={
                validationResult
                  ? validationResult.isValid
                    ? 'border-green-500'
                    : 'border-red-500'
                  : ''
              }
            />
            {validationResult && (
              <div className="absolute right-2 top-2.5">
                {validationResult.isValid ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
          </div>

          {isValidating && <p className="text-xs text-muted-foreground">Validating...</p>}

          {validationResult && !isValidating && (
            <p
              className={`text-xs ${validationResult.isValid ? 'text-green-600' : 'text-red-600'}`}
            >
              {validationResult.message}
            </p>
          )}
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validations Performed:</span>
              <span className="font-mono font-semibold">{validationCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-mono font-semibold">
                {isValidating
                  ? 'Validating...'
                  : validationResult
                    ? validationResult.isValid
                      ? 'Valid'
                      : 'Invalid'
                    : 'Idle'}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Email validation is debounced to reduce server load. Validation occurs 400ms after you
          stop typing.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing comparison with different delays
 */
function DelayComparisonDemo() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState({
    delay100: '',
    delay500: '',
    delay1000: '',
  });

  const update100 = (val: string) => setResults((prev) => ({ ...prev, delay100: val }));
  const update500 = (val: string) => setResults((prev) => ({ ...prev, delay500: val }));
  const update1000 = (val: string) => setResults((prev) => ({ ...prev, delay1000: val }));

  const { callback: callback100 } = useDebounceCallback(update100, 100);
  const { callback: callback500 } = useDebounceCallback(update500, 500);
  const { callback: callback1000 } = useDebounceCallback(update1000, 1000);

  const handleChange = (val: string) => {
    setValue(val);
    callback100(val);
    callback500(val);
    callback1000(val);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delay Comparison</h3>

        <div className="space-y-2">
          <Label htmlFor="input">Type here</Label>
          <Input
            id="input"
            placeholder="Type to see different delays..."
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Debounced Results</p>
          <div className="rounded-lg border p-3 bg-muted/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  100ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {results.delay100 || '(waiting...)'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  500ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {results.delay500 || '(waiting...)'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  1000ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {results.delay1000 || '(waiting...)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Watch how different delay values affect when the debounced callbacks are executed. Shorter
          delays respond faster but may cause more frequent updates.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing cancel and flush operations
 */
function CancelFlushDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`].slice(-8));
  };

  const executeCallback = (value: string) => {
    addLog(`✅ Executed callback with: "${value}"`);
  };

  const { callback: debouncedCallback, cancel, flush } = useDebounceCallback(executeCallback, 800);

  const handleChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      debouncedCallback(value);
      addLog(`⏱️  Scheduled callback for: "${value}"`);
    }
  };

  const handleCancel = () => {
    cancel();
    addLog('❌ Cancelled pending callback');
  };

  const handleFlush = () => {
    flush();
    addLog(`⚡ Flushed callback immediately`);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cancel & Flush Demo</h3>
          <Badge variant="secondary">800ms delay</Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancelFlushInput">Type to schedule callback</Label>
          <Input
            id="cancelFlushInput"
            placeholder="Type something..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleCancel} variant="destructive" size="sm">
            <XCircle className="mr-2 h-3 w-3" />
            Cancel
          </Button>
          <Button onClick={handleFlush} variant="default" size="sm">
            <Zap className="mr-2 h-3 w-3" />
            Flush
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Event Log</Label>
          <div className="rounded-lg border p-3 bg-muted/50 min-h-[200px] max-h-[200px] overflow-y-auto">
            {logs.length > 0 ? (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <p key={index} className="text-xs font-mono">
                    {log}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Start typing to see the event log...
              </p>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            • <strong>Type</strong> to schedule a debounced callback (800ms delay)
          </p>
          <p>
            • <strong>Cancel</strong> aborts any pending callback
          </p>
          <p>
            • <strong>Flush</strong> executes the pending callback immediately
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof SearchDebounceDemo> = {
  title: 'Hooks/useDebounceCallback',
  component: SearchDebounceDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that debounces a callback function by a specified delay. Perfect for preventing excessive function calls when dealing with rapidly occurring events like scroll, resize, or user input. Includes cancel and flush methods for fine-grained control over callback execution. Supports TypeScript generics for type-safe debouncing of any callback signature.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchInput: Story = {
  render: () => <SearchDebounceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce search API calls to prevent requests on every keystroke. Includes cancel button to abort pending searches and a flush button to execute search immediately.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState } from 'react';
import { Input, Button } from '@algtools/ui';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const performSearch = (query: string) => {
    // Perform API call
    fetch(\`/api/search?q=\${query}\`)
      .then((res) => res.json())
      .then(setSearchResults);
  };

  const { callback: debouncedSearch, cancel, flush } = useDebounceCallback(performSearch, 500);

  return (
    <>
      <Input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder="Search..."
      />
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={flush}>Search Now</Button>
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

export const AutoSave: Story = {
  render: () => <AutoSaveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Auto-save text content with debouncing. Shows how to create an editor that automatically saves after a pause in typing, with manual save and discard options.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState } from 'react';
import { Textarea, Button } from '@algtools/ui';

function MyComponent() {
  const [content, setContent] = useState('');

  const saveContent = (text: string) => {
    // Auto-save to server
    fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ content: text }),
    });
  };

  const { callback: debouncedSave, flush, cancel } = useDebounceCallback(saveContent, 1000);

  return (
    <>
      <Textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          debouncedSave(e.target.value);
        }}
      />
      <Button onClick={() => flush()}>Save Now</Button>
      <Button onClick={() => cancel()}>Discard</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const WindowResize: Story = {
  render: () => <ResizeHandlerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce window resize events to prevent excessive handler calls. Updates dimensions only after the user stops resizing.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = (width: number, height: number) => {
    setSize({ width, height });
    // Perform expensive resize operations
  };

  const { callback: debouncedResize } = useDebounceCallback(handleResize, 300);

  useEffect(() => {
    const updateSize = () => {
      debouncedResize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [debouncedResize]);

  return <p>Size: {size.width} × {size.height}</p>;
}`,
        language: 'tsx',
      },
    },
  },
};

export const FormValidation: Story = {
  render: () => <FormValidationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce form validation to reduce server load. Validates email format after user stops typing, preventing validation on every keystroke.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState } from 'react';
import { Input } from '@algtools/ui';

function MyComponent() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    setIsValid(valid);
  };

  const { callback: debouncedValidate } = useDebounceCallback(validateEmail, 500);

  return (
    <>
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          debouncedValidate(e.target.value);
        }}
        placeholder="Email"
      />
      {isValid !== null && (
        <p>{isValid ? 'Valid email' : 'Invalid email'}</p>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const DelayComparison: Story = {
  render: () => <DelayComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Compare different debounce delay values (100ms, 500ms, 1000ms) to see how they affect callback execution timing.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState } from 'react';
import { Input } from '@algtools/ui';

function MyComponent() {
  const [input, setInput] = useState('');

  const handle100 = useDebounceCallback(() => console.log('100ms'), 100).callback;
  const handle500 = useDebounceCallback(() => console.log('500ms'), 500).callback;
  const handle1000 = useDebounceCallback(() => console.log('1000ms'), 1000).callback;

  return (
    <Input
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        handle100();
        handle500();
        handle1000();
      }}
    />
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CancelAndFlush: Story = {
  render: () => <CancelFlushDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates cancel and flush functionality. Cancel aborts pending callbacks, while flush executes them immediately. Watch the event log to see the timing of operations.',
      },
      source: {
        code: `import { useDebounceCallback } from '@algtools/ui';
import { useState } from 'react';
import { Input, Button } from '@algtools/ui';

function MyComponent() {
  const [value, setValue] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const handleAction = (val: string) => {
    setLog((prev) => [...prev, \`Executed: \${val}\`]);
  };

  const { callback: debouncedAction, cancel, flush } = useDebounceCallback(handleAction, 1000);

  return (
    <>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedAction(e.target.value);
        }}
      />
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={flush}>Flush (Execute Now)</Button>
      {log.map((entry, i) => (
        <p key={i}>{entry}</p>
      ))}
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
      <SearchDebounceDemo />
      <DelayComparisonDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useDebounceCallback hook working simultaneously with different callbacks and delays.',
      },
    },
  },
};
