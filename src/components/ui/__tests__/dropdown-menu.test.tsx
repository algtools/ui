import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '../dropdown-menu';

// Mock Radix Dropdown primitives to simplify rendering
jest.mock('@radix-ui/react-dropdown-menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Portal: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Group: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Item: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    CheckboxItem: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    ItemIndicator: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
    RadioGroup: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    RadioItem: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Label: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Separator: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
    Sub: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    SubTrigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    SubContent: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('DropdownMenu', () => {
  it('renders root, trigger, and content with data-slots', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('[data-slot="dropdown-menu"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dropdown-menu-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dropdown-menu-item"]')).not.toBeNull();
  });

  it('supports checkbox and radio items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Check me</DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="two">Two</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('[data-slot="dropdown-menu-checkbox-item"]')).not.toBeNull();
    expect(
      document.querySelectorAll('[data-slot="dropdown-menu-radio-item"]').length
    ).toBeGreaterThan(0);
  });

  it('renders label, separator, and sub menu', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(document.querySelector('[data-slot="dropdown-menu-label"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dropdown-menu-separator"]')).not.toBeNull();

    // Open sub content by "clicking" the trigger (mocked as a simple button)
    await user.click(screen.getByRole('button', { name: /more/i }));
    expect(document.querySelector('[data-slot="dropdown-menu-sub-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dropdown-menu-item"]')).not.toBeNull();
  });
});
