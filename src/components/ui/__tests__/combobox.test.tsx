import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxCreateNew,
} from '@/components/ui/combobox';

const DATA = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Combobox', () => {
  test('renders trigger with placeholder and selected label', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <Combobox data={DATA} type="fruit" value="" onValueChange={() => {}}>
        <ComboboxTrigger data-testid="trigger" />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            <ComboboxEmpty>No fruits</ComboboxEmpty>
            <ComboboxGroup heading="Fruits">
              {DATA.map((d) => (
                <ComboboxItem key={d.value} value={d.value}>
                  {d.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText('Seleccionar fruit...')).toBeInTheDocument();

    // control value via prop
    rerender(
      <Combobox data={DATA} type="fruit" value="banana" onValueChange={() => {}}>
        <ComboboxTrigger data-testid="trigger" />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList />
        </ComboboxContent>
      </Combobox>
    );
    expect(screen.getByText('Banana')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('input value is controllable and used by create-new', async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();

    render(
      <Combobox data={DATA} type="fruit">
        <ComboboxTrigger data-testid="trigger" />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            <ComboboxEmpty>No fruits</ComboboxEmpty>
            <ComboboxCreateNew onCreateNew={onCreate} />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    await user.click(screen.getByTestId('trigger'));
    const input = screen.getByPlaceholderText('Search fruit...');
    await user.type(input, 'Dragon');

    // Button with default render appears
    const createBtn = await screen.findByRole('button', { name: /crear/i });
    await user.click(createBtn);

    expect(onCreate).toHaveBeenCalledWith('Dragon');
    // popover should close after create
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('selecting item updates value and closes popover', async () => {
    const user = userEvent.setup();

    render(
      <Combobox data={DATA} type="fruit">
        <ComboboxTrigger data-testid="trigger" />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {DATA.map((d) => (
              <ComboboxItem key={d.value} value={d.value}>
                {d.label}
              </ComboboxItem>
            ))}
            <ComboboxSeparator />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    await user.click(screen.getByTestId('trigger'));
    await user.click(screen.getByText('Cherry'));

    // closes dialog
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // trigger should show selected label
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });
});
