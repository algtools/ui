# AI Components

This directory contains AI-specific components for building chat interfaces, conversational UIs, and AI-powered experiences.

## Directory Structure

```
ai/
├── __tests__/          # Test files for AI components
├── ai-types.ts         # Shared TypeScript types and interfaces
└── README.md          # This file
```

## Getting Started

### Importing Types

All shared types are available from `ai-types.ts`:

```typescript
import {
  Role,
  Status,
  Message,
  Source,
  Tool,
  Task,
  Suggestion,
  Branch,
  Citation,
  ReasoningStep,
  ModelConfig,
  StreamingState,
  AIComponentProps,
} from './ai/ai-types';
```

### Using AI Styles

Import the base AI component styles in your application:

```typescript
import '@algtools/ui/ai-components.css';
```

## Component Conventions

### 1. Component Structure

All AI components should follow these conventions:

- **Named exports**: Use named exports for components and their prop types
- **TypeScript**: All components must be written in TypeScript with proper type definitions
- **Props interface**: Define a clear props interface that extends `AIComponentProps` when applicable
- **JSDoc comments**: Include JSDoc documentation for components and their props

Example:

```typescript
import * as React from 'react';
import { AIComponentProps, Message } from './ai-types';

/**
 * Message component for displaying chat messages
 * @param props - Message component props
 */
export interface MessageProps extends AIComponentProps {
  /** The message to display */
  message: Message;
  /** Whether to show the avatar */
  showAvatar?: boolean;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ message, showAvatar = true, className, ...props }, ref) => {
    // Component implementation
  }
);

Message.displayName = 'Message';
```

### 2. Styling Patterns

- Use Tailwind CSS with the `cn()` utility for conditional classes
- Leverage base AI styles from `ai-components.css` where applicable
- Follow the existing component design system
- Support light and dark themes

Example:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'ai-chat-bubble',
  message.role === 'user' && 'ai-chat-bubble--user',
  message.role === 'assistant' && 'ai-chat-bubble--assistant',
  className
)} {...props}>
  {message.content}
</div>
```

### 3. Accessibility

All AI components must be accessible:

- Use semantic HTML elements
- Include ARIA labels and attributes where appropriate
- Support keyboard navigation
- Provide screen reader announcements for dynamic content
- Use ARIA live regions for streaming content

Example:

```typescript
<div
  role="log"
  aria-live="polite"
  aria-label="Chat conversation"
>
  {messages.map(message => (
    <Message key={message.id} message={message} />
  ))}
</div>
```

### 4. Testing Requirements

Every component must have:

- **Unit tests** with at least 85% code coverage
- **Storybook story** demonstrating all variants and states
- Tests for user interactions
- Tests for edge cases and error states
- Accessibility tests

Example test file location: `__tests__/message.test.tsx`

### 5. Streaming Support

Components that display AI-generated content should support streaming:

- Accept partial content updates
- Show loading/streaming indicators
- Handle streaming state properly
- Provide smooth UX during streaming

Example:

```typescript
export interface ResponseProps extends AIComponentProps {
  /** The content to display (may be partial during streaming) */
  content: string;
  /** Whether the content is currently streaming */
  isStreaming?: boolean;
  /** Streaming state and controls */
  streamingState?: StreamingState;
}
```

### 6. Component Exports

All components must be exported from `src/index.ts`:

```typescript
// AI Components
export * from './components/ai/message';
export * from './components/ai/conversation';
export * from './components/ai/response';
// ... etc
```

## Shared Types Reference

### Role

Defines the role of a message sender:

- `user` - Message from the user
- `assistant` - Message from the AI assistant
- `system` - System message or notification

### Status

Defines the status of operations and tasks:

- `pending` - Not yet started
- `in-progress` - Currently executing
- `complete` - Successfully completed
- `failed` - Execution failed
- `cancelled` - Cancelled by user or system

### Message

Core interface for chat messages:

```typescript
interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp?: Date | string;
  metadata?: Record<string, unknown>;
}
```

### Source

Interface for citations and references:

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

### Tool

Interface for AI function calls:

```typescript
interface Tool {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
  result?: unknown;
  status?: Status;
}
```

### Task

Interface for tracking AI agent work:

```typescript
interface Task {
  id: string;
  title: string;
  status: Status;
  progress?: number;
  error?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
```

## Best Practices

### 1. Performance

- Use React.memo() for components that receive frequent updates
- Implement virtualization for long message lists
- Optimize re-renders during streaming
- Use appropriate loading states

### 2. Error Handling

- Handle API errors gracefully
- Provide user-friendly error messages
- Allow retry mechanisms
- Log errors appropriately

### 3. State Management

- Keep component state minimal and focused
- Lift state up when needed for parent coordination
- Use controlled components for forms
- Consider context for deeply nested state

### 4. Responsive Design

- Test on mobile, tablet, and desktop
- Use responsive breakpoints
- Optimize touch targets for mobile
- Handle different screen orientations

### 5. Internationalization

- Design components to support i18n
- Avoid hardcoded strings
- Use proper date/time formatting
- Support RTL languages when applicable

## Component Roadmap

The following AI components are planned for implementation:

### Core Components (High Priority)

- [ ] Message - Chat message display
- [ ] Conversation - Message container with auto-scroll
- [ ] Response - Markdown renderer for AI responses
- [ ] PromptInput - ChatGPT-style input
- [ ] CodeBlock - Syntax highlighted code display
- [ ] Loader - AI thinking indicator

### Supporting Components (Medium Priority)

- [ ] Sources - Citation list display
- [ ] Suggestion - Follow-up prompt chips
- [ ] Tool - Function call display
- [ ] Actions - Action button group

### Advanced Components (Low Priority)

- [ ] Reasoning - Collapsible thinking process
- [ ] Task - Agent task list
- [ ] Branch - Response variation explorer
- [ ] InlineCitation - Hover preview citations
- [ ] AIImage - AI-generated image display
- [ ] WebPreview - Website preview component

## Related Documentation

- [shadcn/ui AI Components](https://ui.shadcn.com/docs/components/ai)
- [Phase 2 Linear Tickets](/LINEAR_TICKETS_PHASE_2_AI.md)
- [Project Roadmap](/ROADMAP_SHADCN_IO.md)

## Contributing

When adding a new AI component:

1. Create the component file in `src/components/ai/`
2. Create the test file in `src/components/ai/__tests__/`
3. Create a Storybook story in `src/stories/`
4. Update `src/index.ts` exports
5. Ensure 85%+ test coverage
6. Run linting and formatting
7. Update this README if adding new conventions

## Support

For questions or issues related to AI components, please refer to:

- Project README
- Storybook documentation
- Component test files for usage examples
