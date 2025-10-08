import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Copy, RotateCw, ThumbsUp, ThumbsDown, Share2, Download, Edit, Trash } from 'lucide-react';
import { Actions } from '../components/ai/actions';
import type { Action } from '../components/ai/actions';

const meta: Meta<typeof Actions> = {
  title: 'AI/Actions',
  component: Actions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Actions component for interactive action buttons in AI chat interfaces. Provides common actions like regenerate, copy, feedback, and share with built-in icons and tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the action buttons',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant for the action buttons',
    },
    showTooltips: {
      control: { type: 'boolean' },
      description: 'Whether to show tooltips for actions',
    },
    onRegenerate: {
      description: 'Callback when regenerate button is clicked',
    },
    onCopy: {
      description: 'Callback when copy button is clicked',
    },
    onThumbsUp: {
      description: 'Callback when thumbs up button is clicked',
    },
    onThumbsDown: {
      description: 'Callback when thumbs down button is clicked',
    },
    onShare: {
      description: 'Callback when share button is clicked',
    },
  },
  args: {
    onCopy: () => console.log('Copy clicked'),
    onRegenerate: () => console.log('Regenerate clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Actions component with common chat actions.
 */
export const Default: Story = {
  args: {
    onCopy: () => console.log('Copy clicked'),
    onRegenerate: () => console.log('Regenerate clicked'),
  },
};

/**
 * All available default actions including feedback and sharing.
 */
export const AllDefaultActions: Story = {
  args: {
    onCopy: () => console.log('Copy clicked'),
    onRegenerate: () => console.log('Regenerate clicked'),
    onThumbsUp: () => console.log('Thumbs up clicked'),
    onThumbsDown: () => console.log('Thumbs down clicked'),
    onShare: () => console.log('Share clicked'),
  },
};

/**
 * Actions with different size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Small</p>
        <Actions size="sm" onCopy={() => {}} onRegenerate={() => {}} onThumbsUp={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Default</p>
        <Actions size="default" onCopy={() => {}} onRegenerate={() => {}} onThumbsUp={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Large</p>
        <Actions size="lg" onCopy={() => {}} onRegenerate={() => {}} onThumbsUp={() => {}} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Actions component in different sizes: small, default, and large.',
      },
    },
  },
};

/**
 * Actions with vertical orientation.
 */
export const VerticalOrientation: Story = {
  args: {
    orientation: 'vertical',
    onCopy: () => console.log('Copy clicked'),
    onRegenerate: () => console.log('Regenerate clicked'),
    onThumbsUp: () => console.log('Thumbs up clicked'),
    onThumbsDown: () => console.log('Thumbs down clicked'),
  },
};

/**
 * Custom actions with your own icons and handlers.
 */
export const CustomActions: Story = {
  render: () => {
    const customActions: Action[] = [
      {
        id: 'download',
        label: 'Download',
        icon: <Download className="size-4" />,
        onClick: () => console.log('Download clicked'),
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: <Edit className="size-4" />,
        onClick: () => console.log('Edit clicked'),
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <Trash className="size-4" />,
        onClick: () => console.log('Delete clicked'),
      },
    ];

    return <Actions actions={customActions} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can provide custom actions with your own icons and handlers using the `actions` prop.',
      },
    },
  },
};

/**
 * Actions with disabled states.
 */
export const DisabledActions: Story = {
  render: () => {
    const actions: Action[] = [
      {
        id: 'copy',
        label: 'Copy to clipboard',
        icon: <Copy className="size-4" />,
        onClick: () => console.log('Copy clicked'),
      },
      {
        id: 'regenerate',
        label: 'Regenerate (disabled)',
        icon: <RotateCw className="size-4" />,
        onClick: () => console.log('Regenerate clicked'),
        disabled: true,
      },
      {
        id: 'share',
        label: 'Share (disabled)',
        icon: <Share2 className="size-4" />,
        onClick: () => console.log('Share clicked'),
        disabled: true,
      },
    ];

    return <Actions actions={actions} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Actions can be disabled by setting the `disabled` property to true.',
      },
    },
  },
};

/**
 * Actions with loading states.
 */
export const LoadingActions: Story = {
  render: () => {
    const actions: Action[] = [
      {
        id: 'copy',
        label: 'Copy to clipboard',
        icon: <Copy className="size-4" />,
        onClick: () => console.log('Copy clicked'),
      },
      {
        id: 'regenerate',
        label: 'Regenerating...',
        icon: <RotateCw className="size-4" />,
        onClick: () => console.log('Regenerate clicked'),
        loading: true,
      },
      {
        id: 'share',
        label: 'Share',
        icon: <Share2 className="size-4" />,
        onClick: () => console.log('Share clicked'),
      },
    ];

    return <Actions actions={actions} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Actions can show a loading state by setting the `loading` property to true. The button will be disabled and show a spinning icon.',
      },
    },
  },
};

/**
 * Actions without tooltips for a cleaner look.
 */
export const WithoutTooltips: Story = {
  args: {
    showTooltips: false,
    onCopy: () => console.log('Copy clicked'),
    onRegenerate: () => console.log('Regenerate clicked'),
    onThumbsUp: () => console.log('Thumbs up clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be disabled by setting `showTooltips` to false.',
      },
    },
  },
};

/**
 * Example of Actions in a chat message context.
 */
export const InChatContext: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-card p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Assistant</p>
        <p className="text-base">
          Here&apos;s a comprehensive answer to your question. The solution involves three main
          steps: analyzing the data, processing it through the pipeline, and generating the final
          output.
        </p>
        <div className="flex justify-end pt-2">
          <Actions
            onCopy={() => console.log('Copy clicked')}
            onRegenerate={() => console.log('Regenerate clicked')}
            onThumbsUp={() => console.log('Thumbs up clicked')}
            onThumbsDown={() => console.log('Thumbs down clicked')}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how Actions component looks in a typical chat message context.',
      },
    },
  },
};

/**
 * Interactive example with state management.
 */
export const Interactive: Story = {
  render: () => {
    const [copied, setCopied] = React.useState(false);
    const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null);

    const handleCopy = () => {
      setCopied(true);
      console.log('Copied!');
      setTimeout(() => setCopied(false), 2000);
    };

    const handleThumbsUp = () => {
      setFeedback(feedback === 'up' ? null : 'up');
      console.log('Thumbs up!');
    };

    const handleThumbsDown = () => {
      setFeedback(feedback === 'down' ? null : 'down');
      console.log('Thumbs down!');
    };

    const actions: Action[] = [
      {
        id: 'copy',
        label: copied ? 'Copied!' : 'Copy to clipboard',
        icon: <Copy className="size-4" />,
        onClick: handleCopy,
      },
      {
        id: 'regenerate',
        label: 'Regenerate response',
        icon: <RotateCw className="size-4" />,
        onClick: () => console.log('Regenerate'),
      },
      {
        id: 'thumbs-up',
        label: 'Good response',
        icon: <ThumbsUp className={`size-4 ${feedback === 'up' ? 'fill-current' : ''}`} />,
        onClick: handleThumbsUp,
      },
      {
        id: 'thumbs-down',
        label: 'Bad response',
        icon: <ThumbsDown className={`size-4 ${feedback === 'down' ? 'fill-current' : ''}`} />,
        onClick: handleThumbsDown,
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <Actions actions={actions} />
        {copied && <p className="text-sm text-muted-foreground">Content copied to clipboard!</p>}
        {feedback && (
          <p className="text-sm text-muted-foreground">
            Thanks for your feedback! ({feedback === 'up' ? '👍' : '👎'})
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example demonstrating stateful behavior like copy confirmation and feedback selection.',
      },
    },
  },
};
