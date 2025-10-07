import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../switch';

describe('Switch', () => {
  it('renders with data-slot and base classes, merges className', () => {
    render(<Switch className="extra" />);
    const sw = screen.getByRole('switch');
    expect(sw).toHaveAttribute('data-slot', 'switch');
    expect(sw).toHaveClass('inline-flex');
    expect(sw).toHaveClass('w-8');
    expect(sw).toHaveClass('rounded-full');
    expect(sw).toHaveClass('extra');
  });

  it('toggles checked state on click and updates aria-checked and data-state', async () => {
    const user = userEvent.setup();
    render(<Switch />);
    const sw = screen.getByRole('switch');
    // Default unchecked
    expect(sw).toHaveAttribute('data-state', 'unchecked');
    expect(sw).toHaveAttribute('aria-checked', 'false');

    await user.click(sw);
    expect(sw).toHaveAttribute('data-state', 'checked');
    expect(sw).toHaveAttribute('aria-checked', 'true');

    await user.click(sw);
    expect(sw).toHaveAttribute('data-state', 'unchecked');
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('is disabled when disabled prop is provided', () => {
    render(<Switch disabled />);
    const sw = screen.getByRole('switch');
    expect(sw).toBeDisabled();
  });

  it('renders thumb with data-slot', () => {
    render(<Switch />);
    const thumb = document.querySelector('[data-slot="switch-thumb"]');
    expect(thumb).toBeTruthy();
  });
});
