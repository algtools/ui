import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import es from 'react-phone-number-input/locale/es.json';

import { PhoneInput } from '@/components/ui/phone-input';

const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultCountry: { control: 'text' },
    placeholder: { control: 'text' },
    labels: { control: 'object' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="max-w-md w-full p-4">
        <PhoneInput
          {...args}
          value={value}
          onChange={(v) => setValue((v as string) || '')}
          placeholder="Enter a phone number"
        />
        <div className="mt-3 text-sm text-muted-foreground">Value: {value || '—'}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A default phone input component with country selection, allowing users to enter phone numbers with international formatting.',
      },
    },
  },
};

export const DefaultCountryMX: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="max-w-md w-full p-4">
        <PhoneInput
          {...args}
          defaultCountry="MX"
          value={value}
          onChange={(v) => setValue((v as string) || '')}
          placeholder="Enter a phone number"
        />
        <div className="mt-3 text-sm text-muted-foreground">Value: {value || '—'}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A phone input with Mexico (MX) set as the default country, demonstrating country-specific default configuration.',
      },
    },
  },
};

export const InternationalizationES: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="max-w-md w-full p-4">
        <PhoneInput
          {...args}
          labels={es}
          value={value}
          onChange={(v) => setValue((v as string) || '')}
          placeholder="Número de teléfono"
        />
        <div className="mt-3 text-sm text-muted-foreground">Valor: {value || '—'}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A phone input with Spanish (ES) internationalization, demonstrating how to localize the component for different languages.',
      },
    },
  },
};
