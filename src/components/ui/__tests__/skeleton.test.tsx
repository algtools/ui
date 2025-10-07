import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with data-slot and default classes', () => {
    render(<Skeleton />);

    const el = document.querySelector('[data-slot="skeleton"]');
    expect(el).not.toBeNull();
    expect(el).toHaveClass('bg-accent');
    expect(el).toHaveClass('animate-pulse');
    expect(el).toHaveClass('rounded-md');
  });

  it('merges custom className', () => {
    render(<Skeleton className="custom-class" />);

    const el = document.querySelector('[data-slot="skeleton"]');
    expect(el).not.toBeNull();
    expect(el).toHaveClass('custom-class');
  });

  it('forwards arbitrary props', () => {
    render(<Skeleton role="status" aria-label="loading" data-testid="sk" />);

    const el = screen.getByTestId('sk');
    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveAttribute('aria-label', 'loading');
  });

  it('renders children when provided', () => {
    render(<Skeleton data-testid="sk">Child</Skeleton>);

    const el = screen.getByTestId('sk');
    expect(el).toHaveTextContent('Child');
  });
});
