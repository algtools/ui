import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Logo } from '@/components/ui/logo';

const meta = {
  title: 'UI/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['logo', 'icon'],
      description: 'Choose between full logo or square icon',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
    width: {
      control: { type: 'number', min: 8, max: 512, step: 1 },
      description: 'Explicit width in pixels (overrides default)',
    },
    height: {
      control: { type: 'number', min: 8, max: 512, step: 1 },
      description: 'Explicit height in pixels (overrides default)',
    },
  },
  args: {
    variant: 'logo',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <Logo {...args} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Default logo component displaying the full logo variant, ready for use in headers and navigation.',
      },
    },
  },
};

export const Themes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-white">
        <div className="text-xs text-muted-foreground">Light</div>
        <Logo {...args} />
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-black">
        <div className="text-xs text-white/70">Dark</div>
        <Logo {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo displayed on both light and dark backgrounds, demonstrating how it adapts to different theme contexts.',
      },
    },
  },
};

export const Variants: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground">Logo</div>
          <Logo {...args} variant="logo" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground">Icon</div>
          <Logo {...args} variant="icon" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Two logo variants: full logo (horizontal with text) and icon-only (square), suitable for different layout contexts.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-6">
        <Logo {...args} variant="icon" width={16} height={16} />
        <Logo {...args} variant="icon" width={24} height={24} />
        <Logo {...args} variant="icon" width={32} height={32} />
        <Logo {...args} variant="logo" width={104} height={16} />
        <Logo {...args} variant="logo" width={156} height={24} />
        <Logo {...args} variant="logo" width={208} height={32} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo in various sizes for both icon and full logo variants, demonstrating how to scale the logo for different use cases (favicons, headers, footers).',
      },
    },
  },
};
