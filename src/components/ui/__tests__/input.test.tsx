import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
  it('renders input with data-slot and merges className', () => {
    render(<Input placeholder="Your name" className="extra-class" />);

    const input = screen.getByPlaceholderText('Your name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
    // A couple of key default classes + merged className
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('min-w-0');
    expect(input).toHaveClass('extra-class');
  });

  it('forwards common props like type, name and disabled', () => {
    render(<Input type="password" name="pwd" disabled placeholder="Secret" />);

    const input = screen.getByPlaceholderText('Secret') as HTMLInputElement;
    expect(input.type).toBe('password');
    expect(input).toHaveAttribute('name', 'pwd');
    expect(input).toBeDisabled();
  });

  it('allows typing in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
});
