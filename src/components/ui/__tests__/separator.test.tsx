import React from 'react';
import { render, screen } from '@testing-library/react';
import { Separator } from '../separator';

// Mock Radix separator primitive to a simple element to make attributes/classes observable
jest.mock('@radix-ui/react-separator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  };
});

describe('Separator', () => {
  it('renders with data-slot and base classes, merges className', () => {
    render(<Separator className="extra" />);

    const el = document.querySelector('[data-slot="separator"]');
    expect(el).not.toBeNull();
    expect(el).toHaveClass('bg-border');
    expect(el).toHaveClass('shrink-0');
    expect(el).toHaveClass('extra');
  });

  it('supports vertical orientation via prop', () => {
    render(<Separator orientation="vertical" />);
    const el = document.querySelector('[data-slot="separator"]');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute('orientation', 'vertical');
  });

  it('passes through arbitrary props', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });
});
