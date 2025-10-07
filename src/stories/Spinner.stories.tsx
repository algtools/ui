import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Spinner } from '../components/ui/spinner';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component with multiple sizes. Provides visual feedback during loading states with proper accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the spinner',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the spinner',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-sm text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spinner sizes available: small, medium, and large.',
      },
    },
  },
};

export const WithCustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-blue-500" />
        <span className="text-sm text-muted-foreground">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-green-500" />
        <span className="text-sm text-muted-foreground">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-red-500" />
        <span className="text-sm text-muted-foreground">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-purple-500" />
        <span className="text-sm text-muted-foreground">Purple</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners can be customized with different colors using CSS classes.',
      },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 border rounded-lg">
        <Spinner size="sm" />
        <span>Loading data...</span>
      </div>
      <div className="flex flex-col items-center gap-3 p-8 border rounded-lg">
        <Spinner size="md" />
        <span className="text-sm text-muted-foreground">
          Please wait while we process your request
        </span>
      </div>
      <div className="flex items-center justify-center gap-3 p-6 bg-primary text-primary-foreground rounded-lg">
        <Spinner size="md" className="text-primary-foreground" />
        <span>Saving changes...</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of how the spinner can be used in real-world contexts and layouts.',
      },
    },
  },
};
