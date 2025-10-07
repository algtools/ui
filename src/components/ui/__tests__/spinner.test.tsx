import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Cargando');
  });

  it('renders with small size', () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-4', 'w-4', 'border-2');
  });

  it('renders with medium size (default)', () => {
    render(<Spinner size="md" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-4');
  });

  it('renders with large size', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-12', 'w-12', 'border-4');
  });

  it('applies default spinner classes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(
      'inline-block',
      'animate-spin',
      'rounded-full',
      'border-4',
      'border-solid',
      'border-current',
      'border-r-transparent',
      'align-[-0.125em]',
      'motion-reduce:animate-[spin_1.5s_linear_infinite]'
    );
  });

  it('merges custom className', () => {
    render(<Spinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<Spinner data-testid="custom-spinner" id="spinner-1" />);
    const spinner = screen.getByTestId('custom-spinner');
    expect(spinner).toHaveAttribute('id', 'spinner-1');
  });

  it('has correct accessibility attributes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', 'Cargando');
  });

  it('contains screen reader text', () => {
    render(<Spinner />);
    const screenReaderText = screen.getByText('Cargando...');
    expect(screenReaderText).toBeInTheDocument();
    expect(screenReaderText).toHaveClass(
      '!absolute',
      '!-m-px',
      '!h-px',
      '!w-px',
      '!overflow-hidden',
      '!whitespace-nowrap',
      '!border-0',
      '!p-0',
      '![clip:rect(0,0,0,0)]'
    );
  });

  it('renders without size prop defaults to medium', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-4');
  });

  it('supports all size variants', () => {
    const { rerender } = render(<Spinner size="sm" />);
    let spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-4', 'w-4', 'border-2');

    rerender(<Spinner size="md" />);
    spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-4');

    rerender(<Spinner size="lg" />);
    spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-12', 'w-12', 'border-4');
  });
});
