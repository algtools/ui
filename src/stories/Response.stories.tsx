import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, useEffect } from 'react';
import { Response } from '../components/ai/response';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Response> = {
  title: 'AI/Response',
  component: Response,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A markdown renderer optimized for streaming AI responses. Supports syntax highlighting, tables, and all standard markdown features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The markdown content to display',
    },
    isStreaming: {
      control: 'boolean',
      description: 'Whether the content is currently streaming',
    },
    showCursor: {
      control: 'boolean',
      description: 'Whether to show a cursor indicator during streaming',
    },
    cursor: {
      control: 'text',
      description: 'Custom cursor character or element',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the response',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const simpleContent = `# Hello World

This is a simple markdown response with **bold** and *italic* text.`;

const richContent = `# AI Response Example

Here's a comprehensive example of markdown rendering:

## Text Formatting

You can use **bold text**, *italic text*, ~~strikethrough~~, and \`inline code\`.

## Lists

Unordered list:
- First item
- Second item
- Third item

Ordered list:
1. Step one
2. Step two
3. Step three

## Code Blocks

Here's a JavaScript example:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

greet('World');
\`\`\`

Python example:

\`\`\`python
def calculate_sum(a, b):
    """Calculate the sum of two numbers."""
    return a + b

result = calculate_sum(5, 3)
print(f"Result: {result}")
\`\`\`

## Tables

| Feature | Supported | Description |
|---------|-----------|-------------|
| Markdown | ✅ | Full GFM support |
| Syntax Highlighting | ✅ | Code blocks with highlighting |
| Streaming | ✅ | Progressive rendering |
| Tables | ✅ | GitHub-flavored tables |

## Blockquotes

> This is a blockquote. It can contain multiple lines
> and is perfect for highlighting important information.

## Links

Check out [OpenAI](https://openai.com) and [shadcn/ui](https://ui.shadcn.com).

---

That's a comprehensive example of what this component can render!`;

const streamingTexts = [
  'Let me explain how to ',
  'Let me explain how to create a React ',
  'Let me explain how to create a React component.\n\n',
  'Let me explain how to create a React component.\n\n## Step 1: ',
  'Let me explain how to create a React component.\n\n## Step 1: Setup\n\n',
  'Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, ',
  'Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```',
  'Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript',
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\n",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\n",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title=\"",
  'Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from \'react\';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title="Click Me" \n  onClick',
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title=\"Click Me\" \n  onClick={() => console.log('Clicked!')}",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title=\"Click Me\" \n  onClick={() => console.log('Clicked!')}\n/>",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title=\"Click Me\" \n  onClick={() => console.log('Clicked!')}\n/>\n```\n\n",
  "Let me explain how to create a React component.\n\n## Step 1: Setup\n\nFirst, create a new file:\n\n```typescript\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  onClick: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {title}\n    </button>\n  );\n};\n```\n\n## Step 2: Usage\n\nNow you can use the component:\n\n```tsx\n<MyComponent \n  title=\"Click Me\" \n  onClick={() => console.log('Clicked!')}\n/>\n```\n\nThat's it! You've created a reusable React component.",
];

export const Default: Story = {
  args: {
    content: simpleContent,
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default response component rendering simple markdown content with basic formatting like headings, bold, and italic text.',
      },
    },
  },
};

export const RichContent: Story = {
  args: {
    content: richContent,
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive example showing all supported markdown features including code blocks, tables, lists, and more.',
      },
    },
  },
};

export const Streaming: Story = {
  args: {
    content: 'This text is currently streaming',
    isStreaming: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the streaming indicator (cursor) while content is being generated.',
      },
    },
  },
};

export const CustomCursor: Story = {
  args: {
    content: 'Custom cursor example',
    isStreaming: true,
    cursor: '|',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a custom cursor character.',
      },
    },
  },
};

export const NoCursor: Story = {
  args: {
    content: 'Streaming without cursor',
    isStreaming: true,
    showCursor: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Streaming mode without showing the cursor indicator.',
      },
    },
  },
};

export const InteractiveStreaming: Story = {
  render: () => {
    const [content, setContent] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const startStreaming = () => {
      setContent('');
      setCurrentIndex(0);
      setIsStreaming(true);
    };

    const stopStreaming = () => {
      setIsStreaming(false);
    };

    const resetStreaming = () => {
      setContent('');
      setCurrentIndex(0);
      setIsStreaming(false);
    };

    useEffect(() => {
      if (isStreaming && currentIndex < streamingTexts.length) {
        const timer = setTimeout(() => {
          setContent(streamingTexts[currentIndex]);
          setCurrentIndex(currentIndex + 1);

          if (currentIndex === streamingTexts.length - 1) {
            setIsStreaming(false);
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    }, [isStreaming, currentIndex]);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={startStreaming} disabled={isStreaming}>
            Start Streaming
          </Button>
          <Button onClick={stopStreaming} disabled={!isStreaming} variant="secondary">
            Stop Streaming
          </Button>
          <Button onClick={resetStreaming} variant="outline">
            Reset
          </Button>
        </div>
        <div className="border rounded-lg p-4 min-h-[400px]">
          <Response
            content={content}
            isStreaming={isStreaming}
            streamingState={{
              isStreaming,
              canCancel: true,
              onCancel: stopStreaming,
            }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing real-time streaming of markdown content. Click "Start Streaming" to see the effect.',
      },
    },
  },
};

export const CodeBlocks: Story = {
  args: {
    content: `# Code Examples

Here are some code examples with syntax highlighting:

## JavaScript
\`\`\`javascript
const greeting = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greeting('World');
\`\`\`

## Python
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## TypeScript
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [];
\`\`\`

Inline code: \`const value = 42;\``,
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of code blocks with syntax highlighting for different languages.',
      },
    },
  },
};

export const Tables: Story = {
  args: {
    content: `# Data Tables

## Feature Comparison

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users | 5 | 50 | Unlimited |
| Storage | 10 GB | 100 GB | 1 TB |
| Support | Email | Priority | 24/7 Phone |
| Price | $0 | $49/mo | $199/mo |

## Performance Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Response Time | 120ms | 100ms | 🟡 |
| Uptime | 99.9% | 99.9% | ✅ |
| Error Rate | 0.1% | 0.5% | ✅ |`,
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of markdown tables with different data types.',
      },
    },
  },
};

export const EmptyContent: Story = {
  args: {
    content: '',
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Response component with empty content.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    content: `# Very Long Response

${Array.from({ length: 50 }, (_, i) => `## Section ${i + 1}\n\nThis is section ${i + 1} with some content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n- Point 1\n- Point 2\n- Point 3`).join('\n\n')}`,
    isStreaming: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Response with very long content to test scrolling behavior.',
      },
    },
  },
};
