import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Check, Copy, X } from 'lucide-react';
import { useState } from 'react';

import { useCopyToClipboard } from '../hooks/use-copy-to-clipboard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

/**
 * Basic demo component that uses the useCopyToClipboard hook
 */
function UseCopyToClipboardDemo() {
  const { isCopied, copy } = useCopyToClipboard();
  const textToCopy = 'Hello, this text has been copied to your clipboard!';

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useCopyToClipboard Hook</h3>
          <Badge variant={isCopied ? 'default' : 'secondary'}>
            {isCopied ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3" />
                Ready
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-mono break-all">{textToCopy}</p>
        </div>

        <Button
          onClick={() => copy(textToCopy)}
          className="w-full"
          variant={isCopied ? 'default' : 'outline'}
        >
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

/**
 * Demo with auto-reset feature
 */
function AutoResetDemo() {
  const { isCopied, copy } = useCopyToClipboard(2000);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Auto-Reset (2 seconds)</h3>

        <div className="rounded-lg border p-4 bg-muted/50">
          <code className="text-sm">npm install @algtools/ui</code>
        </div>

        <Button onClick={() => copy('npm install @algtools/ui')} className="w-full">
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Command
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Status automatically resets after 2 seconds
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo with custom input
 */
function CustomInputDemo() {
  const [text, setText] = useState('https://github.com/algtools/ui');
  const { isCopied, copiedText, copy } = useCopyToClipboard(1500);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Copy Custom Text</h3>

        <div className="space-y-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to copy..."
          />
        </div>

        <Button onClick={() => copy(text)} disabled={!text} className="w-full">
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </>
          )}
        </Button>

        {copiedText && (
          <div className="rounded-lg border p-3 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">Last copied:</p>
            <p className="text-sm font-mono break-all">{copiedText}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo with code snippet copying
 */
function CodeSnippetDemo() {
  const { isCopied, copy } = useCopyToClipboard(3000);

  const codeSnippet = `import { useCopyToClipboard } from '@algtools/ui';

function MyComponent() {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <button onClick={() => copy('Hello!')}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
}`;

  return (
    <Card className="p-6 w-[500px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Copy Code Snippet</h3>
          <Button
            onClick={() => copy(codeSnippet)}
            size="sm"
            variant={isCopied ? 'default' : 'outline'}
          >
            {isCopied ? (
              <>
                <Check className="mr-2 h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3 w-3" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        <pre className="rounded-lg border p-4 bg-muted/50 overflow-x-auto">
          <code className="text-xs">{codeSnippet}</code>
        </pre>
      </div>
    </Card>
  );
}

/**
 * Demo with multiple copy buttons
 */
function MultipleButtonsDemo() {
  const { isCopied, copiedText, copy } = useCopyToClipboard(2000);

  const items = [
    { label: 'Email', value: 'contact@example.com', icon: '📧' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: '📱' },
    { label: 'Website', value: 'https://example.com', icon: '🌐' },
    { label: 'Address', value: '123 Main St, City, State 12345', icon: '📍' },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Copy Contact Info</h3>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium truncate">{item.value}</p>
                </div>
              </div>
              <Button
                onClick={() => copy(item.value)}
                size="sm"
                variant={isCopied && copiedText === item.value ? 'default' : 'ghost'}
              >
                {isCopied && copiedText === item.value ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with error handling
 */
function ErrorHandlingDemo() {
  const { isCopied, error, copy, reset } = useCopyToClipboard();

  const handleCopyWithError = async () => {
    // Try to copy, but simulate an error scenario if needed
    await copy('This should copy successfully');
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Error Handling</h3>

        <div className="space-y-2">
          <Button onClick={handleCopyWithError} className="w-full" variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Try to Copy
          </Button>

          {isCopied && (
            <div className="rounded-lg border border-green-500 bg-green-500/10 p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-600">Successfully copied!</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-600 font-medium">Copy failed</p>
                  <p className="text-xs text-red-600/80 mt-1">{error.message}</p>
                </div>
              </div>
              <Button onClick={reset} size="sm" variant="outline" className="mt-2 w-full">
                Reset
              </Button>
            </div>
          )}

          {!isCopied && !error && (
            <div className="rounded-lg border border-dashed p-3 text-center">
              <p className="text-sm text-muted-foreground">Ready to copy</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with textarea
 */
function TextareaDemo() {
  const [text, setText] = useState(
    'This is a longer text that you can edit and copy.\n\nTry modifying it and clicking the copy button!'
  );
  const { isCopied, copy } = useCopyToClipboard(2000);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Copy from Textarea</h3>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to copy..."
          rows={6}
          className="resize-none"
        />

        <div className="flex gap-2">
          <Button onClick={() => copy(text)} disabled={!text} className="flex-1">
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
          <Button onClick={() => setText('')} variant="outline">
            Clear
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">{text.length} characters</p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseCopyToClipboardDemo> = {
  title: 'Hooks/useCopyToClipboard',
  component: UseCopyToClipboardDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for copying text to clipboard with fallback support for older browsers. Features include success/error states, auto-reset functionality, and comprehensive error handling using the Clipboard API with document.execCommand fallback.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseCopyToClipboardDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useCopyToClipboard hook showing the copy functionality.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { isCopied, copy } = useCopyToClipboard();
  const textToCopy = 'Hello, this text has been copied to your clipboard!';

  return (
    <Button onClick={() => copy(textToCopy)}>
      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
    </Button>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const AutoReset: Story = {
  render: () => <AutoResetDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demo showing auto-reset functionality - the copied state automatically resets after 2 seconds.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  // Auto-reset after 2 seconds (2000ms)
  const { isCopied, copy } = useCopyToClipboard(2000);

  return (
    <Button onClick={() => copy('npm install @algtools/ui')}>
      {isCopied ? 'Copied!' : 'Copy Command'}
    </Button>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CustomInput: Story = {
  render: () => <CustomInputDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Copy custom text from an input field. Shows the last copied text and auto-resets after 1.5 seconds.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { useState } from 'react';
import { Input, Button } from '@algtools/ui';

function MyComponent() {
  const [text, setText] = useState('https://github.com/algtools/ui');
  const { isCopied, copiedText, copy } = useCopyToClipboard(1500);

  return (
    <>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to copy..."
      />
      <Button onClick={() => copy(text)} disabled={!text}>
        {isCopied ? 'Copied!' : 'Copy Text'}
      </Button>
      {copiedText && <p>Last copied: {copiedText}</p>}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CodeSnippet: Story = {
  render: () => <CodeSnippetDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Perfect for documentation sites - copy code snippets with a single click.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { isCopied, copy } = useCopyToClipboard(3000);

  const codeSnippet = \`import { useCopyToClipboard } from '@algtools/ui';

function MyComponent() {
  const { isCopied, copy } = useCopyToClipboard();
  return (
    <button onClick={() => copy('Hello!')}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
}\`;

  return (
    <Button onClick={() => copy(codeSnippet)}>
      {isCopied ? 'Copied' : 'Copy Code'}
    </Button>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleButtons: Story = {
  render: () => <MultipleButtonsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Multiple copy buttons using a single hook instance. Shows which item was last copied.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { isCopied, copiedText, copy } = useCopyToClipboard(2000);

  const items = [
    { label: 'Email', value: 'contact@example.com' },
    { label: 'Phone', value: '+1 (555) 123-4567' },
    { label: 'Website', value: 'https://example.com' },
  ];

  return (
    <>
      {items.map((item) => (
        <Button
          key={item.label}
          onClick={() => copy(item.value)}
          variant={isCopied && copiedText === item.value ? 'default' : 'ghost'}
        >
          {item.label}: {item.value}
        </Button>
      ))}
    </>
  );
}`,
        language: 'tsx',
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
          'Demonstrates error handling with success and error states. Includes a reset function to clear states.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { isCopied, error, copy, reset } = useCopyToClipboard();

  const handleCopy = async () => {
    await copy('This should copy successfully');
  };

  return (
    <>
      <Button onClick={handleCopy}>Copy</Button>
      {isCopied && <p>Successfully copied!</p>}
      {error && (
        <>
          <p>Copy failed: {error.message}</p>
          <Button onClick={reset}>Reset</Button>
        </>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const TextareaExample: Story = {
  render: () => <TextareaDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Copy longer text from a textarea with character count and clear functionality.',
      },
      source: {
        code: `import { useCopyToClipboard } from '@algtools/ui';
import { useState } from 'react';
import { Textarea, Button } from '@algtools/ui';

function MyComponent() {
  const [text, setText] = useState('Enter text to copy...');
  const { isCopied, copy } = useCopyToClipboard(2000);

  return (
    <>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to copy..."
        rows={6}
      />
      <Button onClick={() => copy(text)} disabled={!text}>
        {isCopied ? 'Copied!' : 'Copy'}
      </Button>
      <p>{text.length} characters</p>
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
    <div className="flex flex-wrap gap-4">
      <UseCopyToClipboardDemo />
      <AutoResetDemo />
      <CustomInputDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useCopyToClipboard hook working together.',
      },
    },
  },
};
