import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Message } from '@/components/ai/message';
import { Bot, User } from 'lucide-react';

const meta = {
  title: 'AI/Message',
  component: Message,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
      description: 'The role of the message sender',
    },
    content: {
      control: 'text',
      description: 'The content of the message',
    },
    timestamp: {
      control: 'date',
      description: 'Timestamp when the message was created',
    },
    avatarUrl: {
      control: 'text',
      description: 'Avatar URL for the message sender',
    },
    avatarFallback: {
      control: 'text',
      description: 'Fallback text for the avatar (e.g., initials)',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Whether to show the avatar',
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Whether to show the timestamp',
    },
    showSenderName: {
      control: 'boolean',
      description: 'Whether to show the sender name',
    },
    senderName: {
      control: 'text',
      description: 'Custom name to display for the message sender',
    },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello! Can you help me with something?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
};

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: "Of course! I'd be happy to help. What do you need assistance with?",
    timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
  },
};

export const SystemMessage: Story = {
  args: {
    role: 'system',
    content: 'Connection established. Chat session started.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  },
};

export const WithCustomAvatar: Story = {
  args: {
    role: 'user',
    content: 'This message has a custom avatar!',
    timestamp: new Date(),
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
};

export const WithFallbackText: Story = {
  args: {
    role: 'assistant',
    content: 'This message uses fallback text instead of an icon.',
    timestamp: new Date(),
    avatarFallback: 'AI',
    avatarUrl: 'https://example.com/ai-avatar.png',
  },
};

export const WithSenderName: Story = {
  args: {
    role: 'assistant',
    content: 'This message displays the sender name above the content.',
    timestamp: new Date(),
    showSenderName: true,
    senderName: 'ChatGPT',
  },
};

export const WithoutAvatar: Story = {
  args: {
    role: 'user',
    content: 'This message does not show an avatar.',
    timestamp: new Date(),
    showAvatar: false,
  },
};

export const WithoutTimestamp: Story = {
  args: {
    role: 'assistant',
    content: 'This message does not show a timestamp.',
    showTimestamp: false,
  },
};

export const LongMessage: Story = {
  args: {
    role: 'assistant',
    content:
      'This is a much longer message that demonstrates how the component handles lengthy content. It should wrap properly and maintain good readability. The message bubble will expand to accommodate the content while respecting the maximum width constraint. This ensures that messages remain easy to read even when they contain multiple sentences or paragraphs of information.',
    timestamp: new Date(),
  },
};

export const MultilineMessage: Story = {
  args: {
    role: 'user',
    content: 'This message has\nmultiple lines\nof content\n\nwith proper spacing.',
    timestamp: new Date(),
  },
};

export const ConversationExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Message
        role="user"
        content="Hi! I need help with React components."
        timestamp={new Date(Date.now() - 10 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="Hello! I'd be happy to help you with React components. What specifically would you like to know?"
        timestamp={new Date(Date.now() - 9 * 60 * 1000)}
      />
      <Message
        role="user"
        content="How do I create a reusable button component?"
        timestamp={new Date(Date.now() - 8 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="Great question! To create a reusable button component, you'll want to:\n\n1. Define props for customization\n2. Use forwardRef for ref passing\n3. Apply proper TypeScript types\n4. Add accessibility attributes\n\nWould you like me to show you an example?"
        timestamp={new Date(Date.now() - 7 * 60 * 1000)}
      />
      <Message
        role="user"
        content="Yes, please!"
        timestamp={new Date(Date.now() - 5 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="Here's a simple example of a reusable button component with TypeScript..."
        timestamp={new Date(Date.now() - 3 * 60 * 1000)}
      />
    </div>
  ),
};

export const WithCustomAvatars: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Message
        role="user"
        content="I really like this UI library!"
        timestamp={new Date(Date.now() - 5 * 60 * 1000)}
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        showSenderName
        senderName="John Doe"
      />
      <Message
        role="assistant"
        content="Thank you! I'm glad you're finding it useful. What features do you like most?"
        timestamp={new Date(Date.now() - 3 * 60 * 1000)}
        avatarUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150"
        showSenderName
        senderName="AI Assistant"
      />
    </div>
  ),
};

export const TimestampFormats: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Message role="assistant" content="Just now" timestamp={new Date(Date.now() - 30 * 1000)} />
      <Message
        role="assistant"
        content="5 minutes ago"
        timestamp={new Date(Date.now() - 5 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="2 hours ago"
        timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="3 days ago"
        timestamp={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)}
      />
      <Message
        role="assistant"
        content="2 weeks ago"
        timestamp={new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)}
      />
    </div>
  ),
};

export const AllRoles: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Message role="user" content="This is a user message" timestamp={new Date()} />
      <Message role="assistant" content="This is an assistant message" timestamp={new Date()} />
      <Message role="system" content="This is a system message" timestamp={new Date()} />
    </div>
  ),
};

export const CodeExample: Story = {
  args: {
    role: 'assistant',
    content: `Here's a code example:\n\nconst Button = () => {\n  return <button>Click me</button>;\n};`,
    timestamp: new Date(),
  },
};

export const MinimalMessage: Story = {
  args: {
    role: 'user',
    content: 'Hi!',
    showAvatar: false,
    showTimestamp: false,
  },
};

export const FullyCustomized: Story = {
  args: {
    role: 'assistant',
    content: 'This message has all customization options enabled.',
    timestamp: new Date(),
    avatarUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150',
    avatarFallback: 'CA',
    showAvatar: true,
    showTimestamp: true,
    showSenderName: true,
    senderName: 'Custom Assistant',
  },
};
