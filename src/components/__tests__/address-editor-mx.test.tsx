import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

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

const makeProvider = (items: AddressSuggestion[]) => ({
  search: async (query: string) => {
    await new Promise((r) => setTimeout(r, 10));
    const q = query.toLowerCase();
    return items.filter((s) => s.description.toLowerCase().includes(q));
  },
});

const suggestions: AddressSuggestion[] = [
  {
    id: '1',
    description: 'Av. Reforma 123, Cuauhtémoc, Ciudad de México',
    address: {
      street: 'Av. Reforma',
      exteriorNumber: '123',
      interiorNumber: '',
      neighborhood: 'Cuauhtémoc',
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '06000',
      country: 'México',
    },
  },
  {
    id: '2',
    description: 'Calle Falsa 456, Centro, Guadalajara, Jalisco',
    address: {
      street: 'Calle Falsa',
      exteriorNumber: '456',
      interiorNumber: '',
      neighborhood: 'Centro',
      city: 'Guadalajara',
      state: 'JAL',
      postalCode: '44100',
      country: 'México',
    },
  },
];

describe('MexicanAddressEditor', () => {
  it('shows suggestions after typing and allows keyboard selection', async () => {
    const provider = makeProvider(suggestions);
    const onChange = jest.fn();

    render(
      <MexicanAddressEditor
        onAddressChange={onChange}
        suggestionProvider={provider}
        enableSuggestions
      />
    );

    const search = screen.getByLabelText('Buscar dirección') as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'Av. Ref' } });

    await waitFor(() => expect(screen.getAllByRole('option').length).toBeGreaterThan(0));

    // Arrow down to highlight first, then Enter to select
    fireEvent.keyDown(search, { key: 'ArrowDown' });
    fireEvent.keyDown(search, { key: 'Enter' });

    // onAddressChange should be called with the selected suggestion address
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const last = onChange.mock.calls.at(-1)?.[0] as AddressData;
    expect(last?.street).toBeDefined();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('validates postal code length and shows error icon', async () => {
    const provider = makeProvider([]);
    render(<MexicanAddressEditor suggestionProvider={provider} enableSuggestions={false} />);

    const cp = screen.getByLabelText('C.P. *') as HTMLInputElement;
    fireEvent.change(cp, { target: { value: '12' } });
    expect(await screen.findByText(/exactamente 5 dígitos/i)).toBeInTheDocument();

    fireEvent.change(cp, { target: { value: '12345' } });
    await waitFor(() =>
      expect(screen.queryByText(/exactamente 5 dígitos/i)).not.toBeInTheDocument()
    );
  });
});
