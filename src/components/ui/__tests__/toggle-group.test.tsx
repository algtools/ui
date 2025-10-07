import React from 'react';
import { render } from '@testing-library/react';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

// Mock Radix Toggle Group primitives to simplify rendering
jest.mock('@radix-ui/react-toggle-group', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Item: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
  };
});

describe('ToggleGroup', () => {
  it('renders group root with data-slot and merges className', () => {
    render(<ToggleGroup type="single" className="extra-root" />);

    const root = document.querySelector('[data-slot="toggle-group"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root!).toHaveClass('flex');
    expect(root!).toHaveClass('items-center');
    expect(root!).toHaveClass('rounded-md');
    expect(root!).toHaveClass('w-fit');
    expect(root!).toHaveClass('extra-root');
  });

  it('renders item with data-slot and merges className', () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a" className="extra-item" />
      </ToggleGroup>
    );

    const item = document.querySelector('[data-slot="toggle-group-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    // Classes from toggleVariants and group-specific styling
    expect(item!).toHaveClass('inline-flex');
    expect(item!).toHaveClass('flex-1');
    expect(item!).toHaveClass('rounded-none');
    expect(item!).toHaveClass('extra-item');
  });

  it('applies variant and size from parent context to child items', () => {
    render(
      <ToggleGroup type="multiple" variant="outline" size="sm">
        <ToggleGroupItem value="a" />
      </ToggleGroup>
    );

    const item = document.querySelector('[data-slot="toggle-group-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    // Outline variant adds border styles from toggleVariants
    expect(item!).toHaveClass('border-input');
    // Size sm from toggleVariants
    expect(item!).toHaveClass('h-8');
  });

  it('uses item props when parent does not provide variant/size', () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a" variant="outline" size="sm" />
      </ToggleGroup>
    );

    const item = document.querySelector('[data-slot="toggle-group-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    expect(item!).toHaveClass('border-input');
    expect(item!).toHaveClass('h-8');
  });

  it('parent context takes precedence over item props', () => {
    render(
      <ToggleGroup type="multiple" variant="outline" size="lg">
        <ToggleGroupItem value="a" variant="default" size="sm" />
      </ToggleGroup>
    );

    const item = document.querySelector('[data-slot="toggle-group-item"]') as HTMLElement | null;
    expect(item).not.toBeNull();
    // From parent variant/size
    expect(item!).toHaveClass('border-input');
    expect(item!).toHaveClass('h-10');
  });
});
