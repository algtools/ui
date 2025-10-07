import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Banner,
  BannerTitle,
  BannerIcon,
  BannerAction,
  BannerClose,
} from '../components/ui/banner';
import { InfoIcon } from 'lucide-react';

const meta: Meta<typeof Banner> = {
  title: 'UI/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An inline notification banner with optional icon, actions, and a dismiss button. Supports controlled and uncontrolled visibility and an inset style.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
      description:
        'Controlled visibility. When provided, the component does not manage its own visibility.',
    },
    defaultVisible: {
      control: { type: 'boolean' },
      description: 'Initial visibility in uncontrolled mode.',
    },
    onClose: {
      action: 'onClose',
      description: 'Called when the close button is clicked.',
    },
    inset: {
      control: { type: 'boolean' },
      description: 'Applies rounded corners and inset styling.',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional classes for the root element.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  render: () => (
    <Banner>
      <BannerIcon icon={InfoIcon} />
      <BannerTitle>You have an unpaid invoice. Please update your billing information.</BannerTitle>
      <BannerAction>Review</BannerAction>
      <BannerClose aria-label="Close" />
    </Banner>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled banner that manages visibility internally and can be dismissed.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <Banner
        visible={visible}
        onClose={() => {
          // keep it visible but show that onClose fires
          // toggle can be wired by consumer
          setVisible(true);
        }}
      >
        <BannerIcon icon={InfoIcon} />
        <BannerTitle>Controlled banner stays visible on close.</BannerTitle>
        <BannerAction onClick={() => setVisible((v) => !v)}>Toggle</BannerAction>
        <BannerClose aria-label="Close" />
      </Banner>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled example where visibility is driven by state. The close button triggers onClose without hiding.',
      },
    },
  },
};

export const Inset: Story = {
  render: () => (
    <Banner inset>
      <BannerIcon icon={InfoIcon} />
      <BannerTitle>Inset style with rounded corners.</BannerTitle>
      <BannerClose aria-label="Close" />
    </Banner>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inset variant adds rounded corners suited for placement inside cards or sections.',
      },
    },
  },
};
