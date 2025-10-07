import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';

describe('Popover', () => {
  it('renders content with data-slot and merges className when open', () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="extra-content">Hello</PopoverContent>
      </Popover>
    );

    const content = document.querySelector('[data-slot="popover-content"]');
    expect(content).not.toBeNull();
    expect(content).toHaveClass('rounded-md');
    expect(content).toHaveClass('extra-content');
  });

  it('opens on trigger click when controlled by default state', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Hi</PopoverContent>
      </Popover>
    );

    // Initially closed
    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull();

    // Open via trigger
    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull();
  });
});
