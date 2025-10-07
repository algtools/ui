import React from 'react';
import { render } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollDownButton,
  SelectScrollUpButton,
} from '../select';

// Mock Radix Select primitives to simplify rendering
jest.mock('@radix-ui/react-select', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Group: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Value: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Portal: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Viewport: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Label: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Item: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    ItemText: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
    ItemIndicator: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
    Separator: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
    ScrollUpButton: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    ScrollDownButton: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Icon: ({ children, ...props }: React.ComponentProps<'span'> & { asChild?: boolean }) => (
      <span {...props}>{children}</span>
    ),
  };
});

describe('Select', () => {
  it('renders root, trigger, and value with data-slots and merges className', () => {
    render(
      <Select>
        <SelectTrigger className="extra-trigger" size="sm">
          <SelectValue className="extra-value">Choose</SelectValue>
        </SelectTrigger>
      </Select>
    );

    const root = document.querySelector('[data-slot="select"]');
    const trigger = document.querySelector('[data-slot="select-trigger"]') as HTMLElement | null;
    const value = document.querySelector('[data-slot="select-value"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(value).not.toBeNull();
    expect(trigger!).toHaveAttribute('data-size', 'sm');
    expect(trigger!).toHaveClass('flex');
    expect(trigger!).toHaveClass('rounded-md');
    expect(trigger!).toHaveClass('extra-trigger');
    expect(value!).toHaveClass('extra-value');
    // Chevron icon inside trigger
    expect(trigger!.querySelector('svg')).not.toBeNull();
  });

  it('renders content, viewport, and scroll buttons with data-slots and merges className', () => {
    render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent className="content-x">
          <SelectScrollUpButton />
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    );

    const content = document.querySelector('[data-slot="select-content"]') as HTMLElement | null;
    const viewport = content!.querySelector('[class]');
    const up = document.querySelector('[data-slot="select-scroll-up-button"]');
    const down = document.querySelector('[data-slot="select-scroll-down-button"]');
    expect(content).not.toBeNull();
    expect(content!).toHaveClass('relative');
    expect(content!).toHaveClass('rounded-md');
    expect(content!).toHaveClass('content-x');
    expect(viewport).not.toBeNull();
    expect(up).not.toBeNull();
    expect(down).not.toBeNull();
    // Chevron icons inside scroll buttons
    expect(up!.querySelector('svg')).not.toBeNull();
    expect(down!.querySelector('svg')).not.toBeNull();
  });

  it('renders group, label, items, separator with expected data-slots', () => {
    render(
      <Select>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="lbl-x">Group</SelectLabel>
            <SelectItem value="1" className="it-x">
              One
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
    );

    expect(document.querySelector('[data-slot="select-group"]')).not.toBeNull();
    const label = document.querySelector('[data-slot="select-label"]') as HTMLElement | null;
    expect(label).not.toBeNull();
    expect(label!).toHaveClass('text-xs');
    expect(label!).toHaveClass('lbl-x');
    const item = document.querySelector('[data-slot="select-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    expect(item!).toHaveClass('rounded-sm');
    expect(item!).toHaveClass('it-x');
    expect(document.querySelector('[data-slot="select-separator"]')).not.toBeNull();
  });

  it('renders item indicator inside item', async () => {
    render(
      <Select>
        <SelectContent>
          <SelectItem value="x">X</SelectItem>
        </SelectContent>
      </Select>
    );

    const item = document.querySelector('[data-slot="select-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    const indicator = item!.querySelector('[data-slot="select-item"] span');
    expect(indicator).not.toBeNull();
    // Check icon rendered inside indicator
    expect(item!.querySelector('svg')).not.toBeNull();
  });
});
