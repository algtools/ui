import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Conversation } from '@/components/ai/conversation';
import { useState } from 'react';
import type { Message } from '@/components/ai/ai-types';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'AI/Conversation',
  component: Conversation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A complete conversation interface for AI chat applications. Displays messages, handles streaming, auto-scrolling, and provides a full chat experience with avatars, timestamps, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    messages: {
      description: 'Array of messages to display in the conversation',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the conversation is currently streaming/loading',
    },
    autoScroll: {
      control: 'boolean',
      description: 'Whether to auto-scroll to bottom during streaming',
    },
    showAvatars: {
      control: 'boolean',
      description: 'Whether to show avatars in messages',
    },
    showTimestamps: {
      control: 'boolean',
      description: 'Whether to show timestamps in messages',
    },
    showSenderNames: {
      control: 'boolean',
      description: 'Whether to show sender names in messages',
    },
    height: {
      control: 'text',
      description: 'Custom height for the conversation container',
    },
    scrollThreshold: {
      control: 'number',
      description: 'Threshold in pixels from bottom to hide scroll-to-bottom button',
    },
  },
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello! Can you help me with React hooks?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: '2',
    role: 'assistant',
    content:
      "Of course! I'd be happy to help you with React hooks. What specific aspect would you like to learn about?",
    timestamp: new Date(Date.now() - 9 * 60 * 1000),
  },
  {
    id: '3',
    role: 'user',
    content: 'How does the useEffect hook work?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: '4',
    role: 'assistant',
    content: `The useEffect hook lets you perform side effects in function components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

Here's a basic example:

\`\`\`javascript
useEffect(() => {
  // Side effect code here
  console.log('Component mounted or updated');

  // Cleanup function (optional)
  return () => {
    console.log('Component will unmount');
  };
}, [dependencies]);
\`\`\`

The dependency array controls when the effect runs. Would you like me to explain more about dependencies?`,
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
  },
  {
    id: '5',
    role: 'user',
    content: 'Yes, please explain the dependency array.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '6',
    role: 'assistant',
    content: `Great question! The dependency array is crucial for controlling when your effect runs:

1. **No array**: Effect runs after every render
2. **Empty array []**: Effect runs only once after initial mount
3. **With values [a, b]**: Effect runs when any dependency changes

Example:
\`\`\`javascript
// Runs only when 'userId' changes
useEffect(() => {
  fetchUserData(userId);
}, [userId]);
\`\`\`

This helps optimize performance and prevent infinite loops!`,
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
];

const shortMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hi!',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
];

const longMessages: Message[] = [
  ...mockMessages,
  {
    id: '7',
    role: 'user',
    content: 'Can you show me more examples?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: '8',
    role: 'assistant',
    content: 'Absolutely! Let me share some common use cases...',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
  {
    id: '9',
    role: 'user',
    content: 'What about useState?',
    timestamp: new Date(Date.now() - 30 * 1000),
  },
  {
    id: '10',
    role: 'assistant',
    content:
      'useState is the most fundamental hook. It allows you to add state to functional components.',
    timestamp: new Date(Date.now() - 10 * 1000),
  },
];

export const Default: Story = {
  args: {
    messages: mockMessages,
    isLoading: false,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default conversation component displaying a typical chat interface with user and assistant messages, avatars, and timestamps.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
    height: '400px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty conversation state with no messages, showing the default empty state message.',
      },
    },
  },
};

export const CustomEmptyState: Story = {
  args: {
    messages: [],
    isLoading: false,
    height: '400px',
    emptyState: (
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">Welcome to AI Chat!</p>
        <p className="text-sm text-muted-foreground">Ask me anything to get started.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with a custom empty state component, allowing for branded welcome messages or instructions.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    messages: mockMessages,
    isLoading: true,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation in loading state while streaming a response, showing the loading indicator at the bottom.',
      },
    },
  },
};

export const LoadingOnly: Story = {
  args: {
    messages: [],
    isLoading: true,
    height: '400px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty conversation showing only the loading state, useful for initial connection or first message scenarios.',
      },
    },
  },
};

export const WithoutAvatars: Story = {
  args: {
    messages: mockMessages,
    showAvatars: false,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Conversation without avatars, providing a cleaner, more compact message display.',
      },
    },
  },
};

export const WithoutTimestamps: Story = {
  args: {
    messages: mockMessages,
    showTimestamps: false,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation without timestamp display, creating a more streamlined chat interface.',
      },
    },
  },
};

export const WithSenderNames: Story = {
  args: {
    messages: mockMessages,
    showSenderNames: true,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with sender names displayed, useful for multi-user chat scenarios or when clarity is needed.',
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    messages: mockMessages,
    height: '400px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with custom height set to 400px, demonstrating how to control the container size.',
      },
    },
  },
};

export const TallHeight: Story = {
  args: {
    messages: mockMessages,
    height: '800px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with tall height (800px), providing more vertical space for longer conversations.',
      },
    },
  },
};

export const ShortConversation: Story = {
  args: {
    messages: shortMessages,
    height: '300px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Short conversation with just a few messages, demonstrating the component with minimal content.',
      },
    },
  },
};

export const LongConversation: Story = {
  args: {
    messages: longMessages,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long conversation with many messages, showing how the component handles scrolling and performance with extended chat history.',
      },
    },
  },
};

export const CustomAvatars: Story = {
  args: {
    messages: mockMessages,
    userAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    assistantAvatarUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150',
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with custom avatar URLs for both user and assistant, allowing for personalized branding.',
      },
    },
  },
};

export const WithoutAutoScroll: Story = {
  args: {
    messages: mockMessages,
    autoScroll: false,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with auto-scroll disabled, allowing users to manually control scroll position while new messages arrive.',
      },
    },
  },
};

export const CustomScrollThreshold: Story = {
  args: {
    messages: longMessages,
    scrollThreshold: 200,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with custom scroll threshold (200px), controlling when the scroll-to-bottom button appears.',
      },
    },
  },
};

export const AllCustomizations: Story = {
  args: {
    messages: mockMessages,
    isLoading: false,
    showAvatars: true,
    showTimestamps: true,
    showSenderNames: true,
    height: '600px',
    userAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    assistantAvatarUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation with all customization options enabled, showcasing avatars, timestamps, sender names, and custom avatar URLs.',
      },
    },
  },
};

export const MinimalStyle: Story = {
  args: {
    messages: mockMessages,
    showAvatars: false,
    showTimestamps: false,
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal conversation style without avatars or timestamps, providing the cleanest possible chat interface.',
      },
    },
  },
};

export const SystemMessages: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'system',
        content: 'Chat session started',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        id: '2',
        role: 'user',
        content: 'Hello!',
        timestamp: new Date(Date.now() - 9 * 60 * 1000),
      },
      {
        id: '3',
        role: 'assistant',
        content: 'Hi there! How can I help?',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: '4',
        role: 'system',
        content: 'Connection lost. Reconnecting...',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: '5',
        role: 'system',
        content: 'Connection restored',
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
      },
    ],
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Conversation including system messages for status updates, connection events, and other non-user/assistant notifications.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    messages: [],
  },
  render: () => {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddMessage = () => {
      const newMessage: Message = {
        id: `${messages.length + 1}`,
        role: 'user',
        content: `This is message ${messages.length + 1}`,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
    };

    const handleAddAssistantMessage = () => {
      const newMessage: Message = {
        id: `${messages.length + 1}`,
        role: 'assistant',
        content: `Assistant response ${messages.length + 1}`,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
    };

    const handleToggleLoading = () => {
      setIsLoading(!isLoading);
    };

    const handleClearMessages = () => {
      setMessages([]);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleAddMessage} size="sm">
            Add User Message
          </Button>
          <Button onClick={handleAddAssistantMessage} size="sm" variant="secondary">
            Add Assistant Message
          </Button>
          <Button onClick={handleToggleLoading} size="sm" variant="outline">
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          <Button onClick={handleClearMessages} size="sm" variant="destructive">
            Clear Messages
          </Button>
        </div>
        <Conversation messages={messages} isLoading={isLoading} height="500px" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive conversation with controls to add messages, toggle loading state, and clear the chat, demonstrating dynamic message management.',
      },
    },
  },
};

export const StreamingSimulation: Story = {
  args: {
    messages: [],
  },
  render: () => {
    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        role: 'user',
        content: 'Tell me a story',
        timestamp: new Date(Date.now() - 5000),
      },
    ]);
    const [isStreaming, setIsStreaming] = useState(false);

    const simulateStreaming = () => {
      setIsStreaming(true);
      const words = [
        'Once',
        'upon',
        'a',
        'time,',
        'in',
        'a',
        'distant',
        'land,',
        'there',
        'lived',
        'a',
        'wise',
        'developer',
        'who',
        'loved',
        'React...',
      ];

      let currentText = '';
      let index = 0;

      const interval = setInterval(() => {
        if (index < words.length) {
          currentText += (index > 0 ? ' ' : '') + words[index];
          setMessages([
            messages[0],
            {
              id: '2',
              role: 'assistant',
              content: currentText,
              timestamp: new Date(),
            },
          ]);
          index++;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, 200);
    };

    return (
      <div className="space-y-4">
        <Button onClick={simulateStreaming} disabled={isStreaming}>
          {isStreaming ? 'Streaming...' : 'Start Streaming'}
        </Button>
        <Conversation messages={messages} isLoading={isStreaming} height="500px" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simulated streaming conversation where messages appear word-by-word, demonstrating real-time AI response streaming behavior.',
      },
    },
  },
};

export const MultipleConversations: Story = {
  args: {
    messages: [],
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Conversation 1</h3>
        <Conversation messages={shortMessages} height="400px" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Conversation 2</h3>
        <Conversation messages={mockMessages} height="400px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple conversation components displayed side-by-side, useful for comparison views or multi-threaded chat interfaces.',
      },
    },
  },
};

export const DifferentHeights: Story = {
  args: {
    messages: [],
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">Compact (300px)</h3>
        <Conversation messages={shortMessages} height="300px" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Standard (500px)</h3>
        <Conversation messages={mockMessages} height="500px" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Tall (700px)</h3>
        <Conversation messages={longMessages} height="700px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Conversation components with different height configurations, demonstrating how the component adapts to various container sizes.',
      },
    },
  },
};
