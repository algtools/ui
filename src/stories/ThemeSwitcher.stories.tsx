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
};

export const Controlled: Story = {
  args: { variant: 'circle', start: 'center' },
};

export const CircleBlurFromCorners: Story = {
  args: { variant: 'circle-blur', start: 'top-left' },
};

export const PolygonWipe: Story = {
  args: { variant: 'polygon' },
};
