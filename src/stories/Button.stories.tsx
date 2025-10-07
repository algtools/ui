import type { Meta, StoryObj } from '@storybook/react-webpack5';
// Test actions will be handled by addons
import { Plus, Download, Heart } from 'lucide-react';

import { Button } from '../components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes. Built with Radix UI Slot for composition.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    asChild: {
      control: { type: 'boolean' },
      description:
        'Change the default rendered element for the one passed as a child, merging their props and behavior.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants showcasing different visual styles.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes including a special icon variant.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Plus />
        Add Item
      </Button>
      <Button variant="outline">
        <Download />
        Download
      </Button>
      <Button variant="secondary">
        <Heart />
        Like
      </Button>
      <Button size="icon" variant="ghost">
        <Plus />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons showing how the component handles icon integration.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button states including disabled variants.',
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using asChild prop to render button styling on other elements like links.',
      },
    },
  },
};
