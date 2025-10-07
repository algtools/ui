import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';

import { MexicanAddressEditor } from '@/components/ui/address-editor-mx';

type AddressData = {
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type AddressSuggestion = {
  id: string;
  description: string;
  address: AddressData;
};

type SuggestionProvider = {
  search: (query: string) => Promise<AddressSuggestion[]>;
};

const mockSuggestions: AddressSuggestion[] = [
  {
    id: '1',
    description: 'Av. Paseo de la Reforma 123, Cuauhtémoc, Ciudad de México',
    address: {
      street: 'Av. Paseo de la Reforma',
      exteriorNumber: '123',
      interiorNumber: '',
      neighborhood: 'Cuauhtémoc',
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '06500',
      country: 'México',
    },
  },
  {
    id: '2',
    description: 'Calle Francisco I. Madero 456, Centro Histórico, Ciudad de México',
    address: {
      street: 'Calle Francisco I. Madero',
      exteriorNumber: '456',
      interiorNumber: '2',
      neighborhood: 'Centro Histórico',
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '06000',
      country: 'México',
    },
  },
  {
    id: '3',
    description: 'Av. Insurgentes Sur 789, Roma Norte, Ciudad de México',
    address: {
      street: 'Av. Insurgentes Sur',
      exteriorNumber: '789',
      interiorNumber: '',
      neighborhood: 'Roma Norte',
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '06700',
      country: 'México',
    },
  },
];

const makeMockProvider = (items: AddressSuggestion[] = mockSuggestions): SuggestionProvider => ({
  search: async (query: string) => {
    await new Promise((r) => setTimeout(r, 200));
    const q = query.toLowerCase();
    return items.filter((s) => s.description.toLowerCase().includes(q));
  },
});

// Dynamic provider that synthesizes suggestions based on the query
const makeDynamicProvider = (): SuggestionProvider => ({
  search: async (query: string) => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 250));
    const base = query.trim();
    if (base.length < 3) return [];

    const cities: Array<{ city: string; state: string; stateCode: string; cp: string }> = [
      { city: 'Ciudad de México', state: 'Ciudad de México', stateCode: 'CMX', cp: '06000' },
      { city: 'Guadalajara', state: 'Jalisco', stateCode: 'JAL', cp: '44100' },
      { city: 'Monterrey', state: 'Nuevo León', stateCode: 'NLE', cp: '64000' },
      { city: 'Querétaro', state: 'Querétaro', stateCode: 'QUE', cp: '76000' },
      { city: 'Puebla', state: 'Puebla', stateCode: 'PUE', cp: '72000' },
    ];

    return Array.from({ length: 6 }).map((_, i) => {
      const cityInfo = cities[i % cities.length];
      const ext = 100 + i * 7;
      const desc = `${base} ${ext}, ${cityInfo.city}, ${cityInfo.state}`;
      const suggestion: AddressSuggestion = {
        id: `${Date.now()}-${i}`,
        description: desc,
        address: {
          street: base,
          exteriorNumber: String(ext),
          interiorNumber: '',
          neighborhood: 'Centro',
          city: cityInfo.city,
          state: cityInfo.stateCode,
          postalCode: cityInfo.cp,
          country: 'México',
        },
      };
      return suggestion;
    });
  },
});

const meta = {
  title: 'Components/AddressEditorMx',
  component: MexicanAddressEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddressChange: { action: 'addressChanged' },
    enableSuggestions: { control: 'boolean' },
  },
} satisfies Meta<typeof MexicanAddressEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <MexicanAddressEditor {...args} suggestionProvider={makeDynamicProvider()} />
    </div>
  ),
  args: {
    enableSuggestions: true,
    initialAddress: {},
  },
};

export const ManualOnly: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <MexicanAddressEditor {...args} enableSuggestions={false} />
    </div>
  ),
  args: {
    initialAddress: {},
  },
};

export const PrefilledAddress: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <MexicanAddressEditor
        {...args}
        suggestionProvider={makeMockProvider()}
        initialAddress={{
          street: 'Av. Paseo de la Reforma',
          exteriorNumber: '123',
          interiorNumber: '',
          neighborhood: 'Cuauhtémoc',
          city: 'Ciudad de México',
          state: 'CMX',
          postalCode: '06500',
          country: 'México',
        }}
      />
    </div>
  ),
};

export const ManySuggestions: Story = {
  name: 'Keyboard navigation demo (many suggestions)',
  render: (args) => {
    const items: AddressSuggestion[] = Array.from({ length: 12 }).map((_, i) => ({
      id: String(i + 1),
      description: `Calle Falsa ${i + 1}, Centro, Guadalajara, Jalisco`,
      address: {
        street: 'Calle Falsa',
        exteriorNumber: String(i + 1),
        interiorNumber: '',
        neighborhood: 'Centro',
        city: 'Guadalajara',
        state: 'JAL',
        postalCode: '44100',
        country: 'México',
      },
    }));
    return (
      <div className="w-full max-w-2xl p-4">
        <MexicanAddressEditor {...args} suggestionProvider={makeMockProvider(items)} />
      </div>
    );
  },
  args: {
    enableSuggestions: true,
  },
};
