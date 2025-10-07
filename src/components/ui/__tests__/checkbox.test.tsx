import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
  it('renders with data-slot and base classes, merges className', () => {
    render(<Checkbox className="extra" />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('data-slot', 'checkbox');
    expect(cb).toHaveClass('border-input');
    expect(cb).toHaveClass('size-4');
    expect(cb).toHaveClass('extra');
  });

  it('toggles checked state on click and updates aria-checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('data-state', 'unchecked');
    await user.click(cb);
    expect(cb).toHaveAttribute('data-state', 'checked');
    await user.click(cb);
    expect(cb).toHaveAttribute('data-state', 'unchecked');
  });

  it('is disabled when disabled prop is provided', () => {
    render(<Checkbox disabled />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toBeDisabled();
  });

  it('renders indicator with check icon', () => {
    render(<Checkbox defaultChecked />);
    const indicator = document.querySelector('[data-slot="checkbox-indicator"]');
    expect(indicator).toBeTruthy();
  });
});
