import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioGroupItem } from '../radio-group';

describe('RadioGroup', () => {
  it('renders group with data-slot and base classes, merges className', () => {
    render(
      <RadioGroup className="extra-group">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-slot', 'radio-group');
    expect(group).toHaveClass('grid');
    expect(group).toHaveClass('gap-3');
    expect(group).toHaveClass('extra-group');
  });

  it('renders item with data-slot and base classes, merges className', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" className="extra-item" />
      </RadioGroup>
    );

    const [item] = screen.getAllByRole('radio');
    expect(item).toHaveAttribute('data-slot', 'radio-group-item');
    expect(item).toHaveClass('rounded-full');
    expect(item).toHaveClass('size-4');
    expect(item).toHaveClass('extra-item');
  });

  it('changes selection on click and only one item is checked', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );

    const items = screen.getAllByRole('radio');
    expect(items[0]).toHaveAttribute('data-state', 'checked');
    expect(items[1]).toHaveAttribute('data-state', 'unchecked');

    await user.click(items[1]);
    expect(items[0]).toHaveAttribute('data-state', 'unchecked');
    expect(items[1]).toHaveAttribute('data-state', 'checked');
  });

  it('respects disabled prop on item', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" disabled />
      </RadioGroup>
    );

    const [item] = screen.getAllByRole('radio');
    expect(item).toBeDisabled();
  });

  it('renders indicator inside checked item', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );

    const [item] = screen.getAllByRole('radio');
    const indicator = item.querySelector('[data-slot="radio-group-indicator"]');
    expect(indicator).toBeTruthy();
  });
});
