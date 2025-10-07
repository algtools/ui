import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../collapsible';

// Mock Radix primitives to render simple elements during tests
jest.mock('@radix-ui/react-collapsible', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    CollapsibleTrigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    CollapsibleContent: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('Collapsible', () => {
  it('renders root, trigger, and content with data-slots', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>
    );
    expect(document.querySelector('[data-slot="collapsible"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="collapsible-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="collapsible-content"]')).not.toBeNull();
  });

  it('toggles aria-expanded on trigger when clicked (controlled via open prop)', async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [open, setOpen] = React.useState(false);
      return (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent hidden={!open}>Body</CollapsibleContent>
        </Collapsible>
      );
    }
    render(<Wrapper />);
    const trigger = screen.getByRole('button', { name: /toggle/i });
    const content = screen.getByText('Body');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveAttribute('hidden');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).not.toHaveAttribute('hidden');
  });
});
