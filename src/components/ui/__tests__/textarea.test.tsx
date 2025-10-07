import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../textarea';

describe('Textarea', () => {
  it('renders textarea with data-slot and merges className', () => {
    render(<Textarea placeholder="Your message" className="extra-class" />);

    const textarea = screen.getByPlaceholderText('Your message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
    expect(textarea).toHaveClass('rounded-md');
    expect(textarea).toHaveClass('w-full');
    expect(textarea).toHaveClass('min-h-16');
    expect(textarea).toHaveClass('extra-class');
  });

  it('forwards common props like name, rows and disabled', () => {
    render(<Textarea name="msg" rows={5} disabled placeholder="Disabled textarea" />);

    const textarea = screen.getByPlaceholderText('Disabled textarea');
    expect(textarea).toHaveAttribute('name', 'msg');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toBeDisabled();
  });

  it('allows typing in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);

    const textarea = screen.getByPlaceholderText('Type here');
    await user.type(textarea, 'hello');
    expect(textarea).toHaveValue('hello');
  });
});
