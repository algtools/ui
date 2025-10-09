import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Loader } from '../components/ai/loader';

const meta: Meta<typeof Loader> = {
  title: 'AI/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated loading indicator designed for AI responses. Features a typing/thinking animation with customizable messages and proper accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The message to display alongside the loader',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the loader',
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Whether to show the animated dots',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the loader',
    },
  },
  args: {
    message: 'AI is thinking...',
    size: 'md',
    showDots: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default loader with standard AI thinking message
 */
export const Default: Story = {
  args: {
    message: 'AI is thinking...',
    size: 'md',
    showDots: true,
  },
};

/**
 * Different size variants of the loader
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col gap-2">
        <Loader size="sm" message="Small loader" />
        <span className="text-xs text-muted-foreground">Small (sm)</span>
      </div>
      <div className="flex flex-col gap-2">
        <Loader size="md" message="Medium loader" />
        <span className="text-xs text-muted-foreground">Medium (md) - Default</span>
      </div>
      <div className="flex flex-col gap-2">
        <Loader size="lg" message="Large loader" />
        <span className="text-xs text-muted-foreground">Large (lg)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different loader sizes available: small, medium (default), and large.',
      },
    },
  },
};

/**
 * Loader with custom messages for different AI operations
 */
export const CustomMessages: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Loader message="AI is thinking..." />
      <Loader message="Processing your request..." />
      <Loader message="Generating response..." />
      <Loader message="Analyzing data..." />
      <Loader message="Searching knowledge base..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of loaders with different custom messages for various AI operations.',
      },
    },
  },
};

/**
 * Loader without animated dots, showing only the message
 */
export const WithoutDots: Story = {
  args: {
    message: 'Processing...',
    showDots: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader with the animated dots hidden, showing only the text message.',
      },
    },
  },
};

/**
 * Loader with custom colors using className
 */
export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Loader message="Default color" className="text-foreground" />
      <Loader message="Blue loader" className="text-blue-500" />
      <Loader message="Green loader" className="text-green-500" />
      <Loader message="Purple loader" className="text-purple-500" />
      <Loader message="Red loader" className="text-red-500" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loaders can be customized with different colors using CSS classes.',
      },
    },
  },
};

/**
 * Loaders in different contexts and layouts
 */
export const InContext: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      {/* Card context */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">AI Response</h3>
        <Loader message="AI is generating your response..." />
      </div>

      {/* Centered context */}
      <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
        <Loader size="lg" message="Processing your request..." />
        <p className="mt-4 text-sm text-muted-foreground">This may take a few moments</p>
      </div>

      {/* Inline context */}
      <div className="p-4 border rounded-lg">
        <p className="mb-3">Please wait while the AI assistant analyzes your question...</p>
        <Loader size="sm" message="Analyzing..." />
      </div>

      {/* Chat context */}
      <div className="p-4 border rounded-lg bg-background">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            AI
          </div>
          <div className="flex-1">
            <Loader message="Typing..." size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Examples of how the loader can be used in real-world contexts like cards, chat interfaces, and inline content.',
      },
    },
  },
};

/**
 * Demonstrating the animation timing
 */
export const AnimationDemo: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center">
        <Loader size="lg" message="Watch the dots bounce in sequence" />
        <p className="mt-4 text-sm text-muted-foreground">
          Each dot has a staggered animation delay for a smooth wave effect
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the smooth, staggered animation of the loader dots.',
      },
    },
  },
};

/**
 * Accessibility features demonstration
 */
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-2">ARIA Live Region</h3>
        <p className="text-sm text-muted-foreground mb-3">
          The loader uses <code>role=&quot;status&quot;</code> and{' '}
          <code>aria-live=&quot;polite&quot;</code>
          to announce loading states to screen readers.
        </p>
        <Loader message="Accessible loading indicator" />
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Accessible Messages</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Messages are accessible to screen readers through the ARIA live region.
        </p>
        <Loader message="This message is announced to screen readers" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The loader component includes proper accessibility features including ARIA live regions for announcing loading states to assistive technologies.',
      },
    },
  },
};
