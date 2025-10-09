# AI Components Usage Guide

This guide demonstrates how to use the Phase 2 AI components from `@algtools/ui` to build ChatGPT-like interfaces and AI-powered applications.

## Table of Contents

- [Getting Started](#getting-started)
- [Core Chat Components](#core-chat-components)
- [Supporting Components](#supporting-components)
- [Complete Chat Interface Example](#complete-chat-interface-example)
- [TypeScript Types](#typescript-types)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

## Getting Started

### Installation

The AI components are included in `@algtools/ui` version 0.3.0 and above.

```bash
npm install @algtools/ui
# or
pnpm add @algtools/ui
```

### Import AI Components

```typescript
import {
  Message,
  Conversation,
  Response,
  PromptInput,
  CodeBlock,
  Loader,
  Sources,
  Actions,
  Tool,
  Task,
  Reasoning,
  WebPreview,
} from '@algtools/ui';
```

### Import AI Types

```typescript
import type {
  Role,
  Status,
  Message as MessageType,
  Source,
  Tool,
  Task,
  ReasoningStep,
  StreamingState,
} from '@algtools/ui';
```

## Core Chat Components

### Message Component

Display chat messages with role-based styling and avatars.

```tsx
import { Message } from '@algtools/ui';
import type { Message as MessageType } from '@algtools/ui';

function ChatMessage() {
  const userMessage: MessageType = {
    id: '1',
    role: 'user',
    content: 'What is React?',
    timestamp: new Date(),
  };

  const assistantMessage: MessageType = {
    id: '2',
    role: 'assistant',
    content: 'React is a JavaScript library for building user interfaces.',
    timestamp: new Date(),
  };

  return (
    <div>
      <Message message={userMessage} />
      <Message message={assistantMessage} />
    </div>
  );
}
```

**Props:**

- `message: MessageType` - The message object to display
- `showAvatar?: boolean` - Whether to show the avatar (default: true)
- `className?: string` - Additional CSS classes

### Conversation Component

Container for messages with auto-scrolling during streaming.

```tsx
import { Conversation, Message } from '@algtools/ui';
import type { Message as MessageType } from '@algtools/ui';

function ChatConversation() {
  const messages: MessageType[] = [
    {
      id: '1',
      role: 'user',
      content: 'Hello!',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Hi! How can I help you today?',
      timestamp: new Date(),
    },
  ];

  return (
    <Conversation
      messages={messages}
      isStreaming={false}
      onScrollToBottom={() => console.log('Scrolled to bottom')}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Conversation>
  );
}
```

**Props:**

- `messages: MessageType[]` - Array of messages to display
- `isStreaming?: boolean` - Whether AI is currently streaming
- `onScrollToBottom?: () => void` - Callback when scroll to bottom is triggered
- `className?: string` - Additional CSS classes

### Response Component

Markdown renderer optimized for streaming AI responses.

```tsx
import { Response } from '@algtools/ui';

function AIResponse() {
  const markdownContent = `
# Hello World

This is **bold** and this is *italic*.

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
  `;

  return <Response content={markdownContent} isStreaming={false} />;
}
```

**Props:**

- `content: string` - Markdown content to render
- `isStreaming?: boolean` - Whether content is being streamed
- `className?: string` - Additional CSS classes

### PromptInput Component

ChatGPT-style input with auto-resize and keyboard shortcuts.

```tsx
import { PromptInput } from '@algtools/ui';
import { useState } from 'react';

function ChatInput() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (value: string) => {
    console.log('Submitted:', value);
    setIsLoading(true);
    // Send to AI...
    setTimeout(() => {
      setIsLoading(false);
      setInput('');
    }, 2000);
  };

  return (
    <PromptInput
      value={input}
      onChange={setInput}
      onSubmit={handleSubmit}
      placeholder="Ask me anything..."
      disabled={isLoading}
    />
  );
}
```

**Props:**

- `value: string` - Current input value
- `onChange: (value: string) => void` - Input change handler
- `onSubmit: (value: string) => void` - Submit handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Whether input is disabled
- `maxLength?: number` - Maximum character length
- `className?: string` - Additional CSS classes

**Keyboard Shortcuts:**

- `Enter` - Submit message
- `Shift + Enter` - New line

### CodeBlock Component

Code blocks with syntax highlighting and copy functionality.

```tsx
import { CodeBlock } from '@algtools/ui';

function CodeExample() {
  const code = `
function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
  `;

  return <CodeBlock code={code} language="typescript" showLineNumbers />;
}
```

**Props:**

- `code: string` - Code to display
- `language: string` - Programming language for syntax highlighting
- `showLineNumbers?: boolean` - Whether to show line numbers
- `highlightLines?: number[]` - Lines to highlight
- `className?: string` - Additional CSS classes

**Supported Languages:**

- JavaScript, TypeScript, Python, Java, C++, Go, Rust, Ruby, PHP, and many more

### Loader Component

Animated indicator for AI thinking/processing states.

```tsx
import { Loader } from '@algtools/ui';

function AIThinking() {
  return (
    <div>
      <Loader text="AI is thinking..." />
      {/* or */}
      <Loader variant="dots" />
    </div>
  );
}
```

**Props:**

- `text?: string` - Loading text to display
- `variant?: 'spinner' | 'dots' | 'pulse'` - Visual style
- `className?: string` - Additional CSS classes

## Supporting Components

### Sources Component

Expandable citation list for displaying AI sources.

```tsx
import { Sources } from '@algtools/ui';
import type { Source } from '@algtools/ui';

function CitationList() {
  const sources: Source[] = [
    {
      id: '1',
      title: 'React Documentation',
      url: 'https://react.dev',
      description: 'Official React documentation',
    },
    {
      id: '2',
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      description: 'Web technology reference',
    },
  ];

  return <Sources sources={sources} defaultExpanded={false} />;
}
```

**Props:**

- `sources: Source[]` - Array of source citations
- `defaultExpanded?: boolean` - Whether list is expanded by default
- `onSourceClick?: (source: Source) => void` - Click handler for sources
- `className?: string` - Additional CSS classes

### Actions Component

Action button group for AI responses.

```tsx
import { Actions } from '@algtools/ui';
import type { Action } from '@algtools/ui';

function MessageActions() {
  const actions: Action[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: 'Copy',
      onClick: () => console.log('Copied'),
    },
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: 'RefreshCw',
      onClick: () => console.log('Regenerating'),
    },
    {
      id: 'thumbsup',
      label: 'Good response',
      icon: 'ThumbsUp',
      onClick: () => console.log('Liked'),
    },
  ];

  return <Actions actions={actions} />;
}
```

**Props:**

- `actions: Action[]` - Array of action buttons
- `variant?: 'default' | 'compact'` - Display style
- `className?: string` - Additional CSS classes

### Tool Component

Display AI function/tool calls with parameters and results.

```tsx
import { Tool } from '@algtools/ui';
import type { Tool as ToolType } from '@algtools/ui';

function FunctionCall() {
  const tool: ToolType = {
    name: 'search',
    description: 'Search the web for information',
    parameters: {
      query: 'React hooks tutorial',
      limit: 5,
    },
    result: {
      results: ['Result 1', 'Result 2', 'Result 3'],
    },
    status: 'complete',
  };

  return <Tool tool={tool} />;
}
```

**Props:**

- `tool: ToolType` - Tool/function call data
- `showParameters?: boolean` - Whether to show parameters
- `showResult?: boolean` - Whether to show result
- `className?: string` - Additional CSS classes

### Task Component

Task list component showing AI agent work progress.

```tsx
import { Task, TaskList } from '@algtools/ui';
import type { Task as TaskType } from '@algtools/ui';

function AgentTasks() {
  const tasks: TaskType[] = [
    {
      id: '1',
      title: 'Analyzing requirements',
      status: 'complete',
      progress: 100,
    },
    {
      id: '2',
      title: 'Generating code',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: '3',
      title: 'Running tests',
      status: 'pending',
    },
  ];

  return <TaskList tasks={tasks} />;
}
```

**Props:**

- `task: TaskType` - Single task data
- `tasks: TaskType[]` - Array of tasks (for TaskList)
- `showProgress?: boolean` - Whether to show progress bar
- `className?: string` - Additional CSS classes

### Reasoning Component

Collapsible blocks for displaying AI thinking process.

```tsx
import { Reasoning } from '@algtools/ui';
import type { ReasoningStep } from '@algtools/ui';

function AIThinking() {
  const steps: ReasoningStep[] = [
    {
      id: '1',
      title: 'Understanding the question',
      content: 'The user is asking about React hooks...',
      order: 1,
    },
    {
      id: '2',
      title: 'Analyzing context',
      content: 'Based on the conversation history...',
      order: 2,
    },
  ];

  return <Reasoning steps={steps} defaultExpanded={false} />;
}
```

**Props:**

- `steps: ReasoningStep[]` - Array of reasoning steps
- `defaultExpanded?: boolean` - Whether to expand by default
- `className?: string` - Additional CSS classes

### WebPreview Component

Preview component for AI-generated websites.

```tsx
import { WebPreview } from '@algtools/ui';

function SitePreview() {
  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
  `;

  return <WebPreview content={htmlContent} title="Generated Website" showFullscreen />;
}
```

**Props:**

- `content: string` - HTML content to preview
- `url?: string` - URL to load in iframe (alternative to content)
- `title?: string` - Preview title
- `showFullscreen?: boolean` - Whether to show fullscreen button
- `className?: string` - Additional CSS classes

## Complete Chat Interface Example

Here's a complete example of a ChatGPT-like interface using multiple AI components:

```tsx
import { useState } from 'react';
import {
  Conversation,
  Message,
  PromptInput,
  Loader,
  Actions,
  Sources,
  Response,
} from '@algtools/ui';
import type { Message as MessageType, Source, Action } from '@algtools/ui';

export function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);

  const handleSubmit = async (value: string) => {
    if (!value.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: value,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value }),
      });

      const data = await response.json();

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSources(data.sources || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (message: MessageType) => {
    navigator.clipboard.writeText(message.content);
  };

  const handleRegenerate = () => {
    // Regenerate last response
    console.log('Regenerating...');
  };

  const actions: Action[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: 'Copy',
      onClick: handleCopy,
    },
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: 'RefreshCw',
      onClick: handleRegenerate,
    },
  ];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="flex-1 overflow-hidden">
        <Conversation messages={messages} isStreaming={isLoading}>
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <Message message={message} />
              {message.role === 'assistant' && (
                <>
                  <Response content={message.content} />
                  <Actions actions={actions} />
                </>
              )}
            </div>
          ))}
          {isLoading && <Loader text="AI is thinking..." />}
          {sources.length > 0 && <Sources sources={sources} />}
        </Conversation>
      </div>

      <div className="border-t p-4">
        <PromptInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
```

## TypeScript Types

### Message Type

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date | string;
  metadata?: Record<string, unknown>;
}
```

### Source Type

```typescript
interface Source {
  id: string;
  title: string;
  url?: string;
  description?: string;
  iconUrl?: string;
  metadata?: Record<string, unknown>;
}
```

### Tool Type

```typescript
interface Tool {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
  result?: unknown;
  status?: 'pending' | 'in-progress' | 'complete' | 'failed' | 'cancelled';
}
```

### Task Type

```typescript
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'complete' | 'failed' | 'cancelled';
  progress?: number;
  error?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
```

### ReasoningStep Type

```typescript
interface ReasoningStep {
  id: string;
  title: string;
  content: string;
  order?: number;
}
```

### StreamingState Type

```typescript
interface StreamingState {
  isStreaming: boolean;
  canCancel?: boolean;
  onCancel?: () => void;
}
```

## Best Practices

### 1. Message Management

- Always provide unique `id` for each message
- Include timestamps for better UX
- Use optimistic updates for instant feedback

```tsx
const userMessage: MessageType = {
  id: crypto.randomUUID(), // Use UUID for unique IDs
  role: 'user',
  content: input,
  timestamp: new Date(),
};
```

### 2. Streaming Responses

- Set `isStreaming={true}` during streaming
- Update content incrementally
- Handle errors gracefully

```tsx
<Conversation messages={messages} isStreaming={isStreaming}>
  {messages.map((msg) => (
    <Message key={msg.id} message={msg} />
  ))}
</Conversation>
```

### 3. Accessibility

- All components support keyboard navigation
- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure sufficient color contrast

### 4. Performance

- Use React.memo() for message components
- Implement virtual scrolling for long conversations
- Debounce input handlers
- Optimize re-renders during streaming

### 5. Error Handling

```tsx
try {
  // Send message to AI
} catch (error) {
  const errorMessage: MessageType = {
    id: crypto.randomUUID(),
    role: 'system',
    content: 'Sorry, an error occurred. Please try again.',
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, errorMessage]);
}
```

## Accessibility

All AI components are built with accessibility in mind:

### Keyboard Navigation

- `Tab` - Navigate between interactive elements
- `Enter` - Submit input or activate buttons
- `Escape` - Close modals or cancel actions
- `Space` - Toggle collapsible sections

### Screen Reader Support

- ARIA labels on all interactive elements
- ARIA live regions for streaming content
- Semantic HTML structure
- Proper heading hierarchy

### Visual Accessibility

- Sufficient color contrast (WCAG AA)
- Focus indicators on interactive elements
- Responsive text sizing
- Support for reduced motion preferences

## Additional Resources

- [Storybook Documentation](https://your-storybook-url.com) - Interactive component examples
- [API Reference](/src/components/ai/README.md) - Detailed API documentation
- [TypeScript Types](/src/components/ai/ai-types.ts) - Complete type definitions
- [Test Examples](/src/components/ai/__tests__/) - Component test cases

## Support

For questions or issues:

1. Check the [Storybook examples](https://your-storybook-url.com)
2. Review [test files](/src/components/ai/__tests__/) for usage examples
3. Open an issue on GitHub
4. Consult the team documentation

---

**Version:** 0.3.0
**Last Updated:** 2025-10-09
**Status:** Production Ready ✅
