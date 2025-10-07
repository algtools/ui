import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-phone-number-input with a minimal controlled component
jest.mock('react-phone-number-input', () => {
  const ReactLocal: typeof React = React;

  type MockProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    value?: string;
    onChange?: (v?: string) => void;
    inputComponent?: React.ElementType;
    // The real component also receives these; we render them to exercise our custom impls
    flagComponent?: React.ElementType;
    countrySelectComponent?: React.ElementType;
    disabled?: boolean;
  };

  const Mock = ReactLocal.forwardRef<HTMLInputElement, MockProps>((props: MockProps, ref) => {
    const {
      value,
      onChange,
      inputComponent: InputComponent = 'input',
      flagComponent,
      countrySelectComponent,
      disabled,
      ...rest
    } = props;
    const [selectedCountry, setSelectedCountry] = ReactLocal.useState<'MX' | 'US'>('MX');
    const Comp = InputComponent as React.ElementType;
    return (
      <div data-testid="rpn-root">
        {flagComponent ? (
          <div data-testid="mock-flag">
            {ReactLocal.createElement(flagComponent as React.ElementType, {
              country: selectedCountry,
              countryName: selectedCountry,
            })}
          </div>
        ) : null}
        {countrySelectComponent ? (
          <div data-testid="mock-country-select">
            {ReactLocal.createElement(countrySelectComponent as React.ElementType, {
              disabled,
              value: selectedCountry,
              options: [
                { label: 'Mexico', value: 'MX' },
                { label: 'United States', value: 'US' },
              ],
              placeholder: 'Buscar país...',
              noCountryFoundMessage: 'No se encontró ningún país.',
              onChange: (c: 'MX' | 'US') => setSelectedCountry(c),
            })}
          </div>
        ) : null}
        <Comp
          data-testid="rpn-input"
          value={value ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value;
            if (/[^\d+]/.test(v)) {
              onChange?.(undefined);
            } else {
              onChange?.(v);
            }
          }}
          ref={ref}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    );
  });
  Mock.displayName = 'MockPhoneNumberInput';

  return {
    __esModule: true,
    default: Mock,
    getCountryCallingCode: (country: string) => (country === 'MX' ? '52' : '1'),
  };
});

import { PhoneInput } from '@/components/ui/phone-input';

describe('PhoneInput', () => {
  it('renders and accepts digits', () => {
    const handleChange = jest.fn();
    render(<PhoneInput value="" onChange={handleChange} />);

    const input = screen.getByTestId('rpn-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '+525511223344' } });

    expect(handleChange).toHaveBeenCalledWith('+525511223344');
  });

  it('coerces undefined onChange to empty string', () => {
    const handleChange = jest.fn();
    render(<PhoneInput value="" onChange={handleChange} />);

    const input = screen.getByTestId('rpn-input') as HTMLInputElement;
    // Include an invalid character to trigger undefined from the mock
    fireEvent.change(input, { target: { value: '+52 abc' } });

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('renders custom flag and updates when selecting a country', async () => {
    render(<PhoneInput value="" onChange={() => {}} />);

    // Flag from our custom FlagComponent should render for default MX
    const flagContainer = screen.getByTestId('mock-flag');
    expect(flagContainer).toBeInTheDocument();

    // Open popover and select United States
    const cs = screen.getByTestId('mock-country-select');
    const openBtn = within(cs).getByRole('button');
    fireEvent.click(openBtn);

    const popover = (await waitFor(
      () => document.querySelector('[data-slot="popover-content"]') as HTMLElement | null
    )) as HTMLElement;
    expect(popover).not.toBeNull();

    // There are duplicate matches (svg <title> and visible label). Choose the visible span label.
    const usLabels = await within(popover).findAllByText('United States');
    const usLabelSpan = usLabels.find((el) => el.tagName.toLowerCase() === 'span');
    expect(usLabelSpan).toBeTruthy();
    const usItem = (usLabelSpan as HTMLElement).closest('[data-slot="command-item"]');
    expect(usItem).toBeTruthy();
    fireEvent.click(usItem as HTMLElement);

    // Flag updates to US (Flag component sets title to countryName)
    await waitFor(() => {
      expect(within(flagContainer).getByTitle('US')).toBeInTheDocument();
    });
  });

  it('filters via search and closes after selecting', async () => {
    render(<PhoneInput value="" onChange={() => {}} />);

    const cs = screen.getByTestId('mock-country-select');
    fireEvent.click(within(cs).getByRole('button'));

    const popover = (await waitFor(
      () => document.querySelector('[data-slot="popover-content"]') as HTMLElement | null
    )) as HTMLElement;
    expect(popover).not.toBeNull();
    const search = await within(popover).findByPlaceholderText('Buscar país...');
    fireEvent.change(search, { target: { value: 'Mex' } });

    const mxLabels = await within(popover).findAllByText('Mexico');
    const mxLabelSpan = mxLabels.find((el) => el.tagName.toLowerCase() === 'span');
    expect(mxLabelSpan).toBeTruthy();
    const mxItem = (mxLabelSpan as HTMLElement).closest('[data-slot="command-item"]');
    expect(mxItem).toBeTruthy();
    fireEvent.click(mxItem as HTMLElement);

    // Popover should close after selection
    await waitFor(() => {
      const content = document.querySelector('[data-slot="popover-content"]') as HTMLElement | null;
      expect(content).toBeNull();
    });
  });
});
