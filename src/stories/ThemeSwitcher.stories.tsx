import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

const meta = {
  title: 'UI/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated theme toggle with support for light, dark and system themes. Applies classes to `document.documentElement` so tokens update live.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circle', 'circle-blur', 'polygon', 'gif'],
    },
    start: {
      control: 'select',
      options: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
  },
  args: {
    variant: 'circle',
    start: 'center',
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'circle-blur', start: 'top-left' },
  parameters: {
    docs: {
      description: {
        story: 'Default theme switcher with circle-blur animation starting from the top-left corner, providing smooth theme transitions.',
      },
    },
  },
};

export const Controlled: Story = {
  args: { variant: 'circle', start: 'center' },
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with circle animation starting from the center, offering a classic expanding circle transition effect.',
      },
    },
  },
};

export const CircleBlurFromCorners: Story = {
  args: { variant: 'circle-blur', start: 'top-left' },
  parameters: {
    docs: {
      description: {
        story: 'Circle-blur animation variant starting from corners (top-left, top-right, bottom-left, bottom-right), creating directional theme transitions.',
      },
    },
  },
};

export const PolygonWipe: Story = {
  args: { variant: 'polygon' },
  parameters: {
    docs: {
      description: {
        story: 'Polygon wipe animation variant, providing a geometric transition effect when switching between light and dark themes.',
      },
    },
  },
};
