import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toggle } from '../toggle';

// Mock Radix Toggle primitive to simplify rendering and avoid implementation details
vi.mock('@radix-ui/react-toggle', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
  };
});

describe('Toggle', () => {
  it('renders with default styles and data-slot', () => {
    render(<Toggle>Toggle</Toggle>);
    const btn = screen.getByRole('button', { name: /toggle/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('data-slot', 'toggle');
    // A few default/base classes
    expect(btn).toHaveClass('inline-flex');
    expect(btn).toHaveClass('text-sm');
    // Default size variant
    expect(btn).toHaveClass('h-9');
    // Default visual variant
    expect(btn).toHaveClass('bg-transparent');
  });

  it('supports variant and size props', () => {
    render(
      <Toggle variant="outline" size="sm">
        Small Outline
      </Toggle>
    );
    const btn = screen.getByRole('button', { name: /small outline/i });
    expect(btn).toHaveClass('border-input');
    expect(btn).toHaveClass('h-8');
  });

  it('merges custom className', () => {
    render(<Toggle className="custom-class">Merge</Toggle>);
    const btn = screen.getByRole('button', { name: /merge/i });
    expect(btn).toHaveClass('custom-class');
  });

  it('forwards common props (aria-label, disabled)', () => {
    render(
      <Toggle aria-label="tgl" disabled>
        A
      </Toggle>
    );
    const btn = screen.getByRole('button', { name: /tgl/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-label', 'tgl');
  });
});
