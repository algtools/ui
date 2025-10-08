import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '../loader';

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-live', 'polite');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('renders default message', () => {
    render(<Loader />);
    expect(screen.getByText('AI is thinking...')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<Loader message="Processing your request..." />);
    expect(screen.getByText('Processing your request...')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<Loader size="sm" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-sm', 'gap-2');
  });

  it('renders with medium size (default)', () => {
    render(<Loader size="md" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-base', 'gap-3');
  });

  it('renders with large size', () => {
    render(<Loader size="lg" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-lg', 'gap-4');
  });

  it('shows animated dots by default', () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll('.animate-bounce');
    expect(dots).toHaveLength(3);
  });

  it('hides dots when showDots is false', () => {
    const { container } = render(<Loader showDots={false} />);
    const dots = container.querySelectorAll('.animate-bounce');
    expect(dots).toHaveLength(0);
  });

  it('applies correct dot size classes for small size', () => {
    const { container } = render(<Loader size="sm" />);
    const dots = container.querySelectorAll('.animate-bounce');
    dots.forEach((dot) => {
      expect(dot).toHaveClass('w-1.5', 'h-1.5');
    });
  });

  it('applies correct dot size classes for medium size', () => {
    const { container } = render(<Loader size="md" />);
    const dots = container.querySelectorAll('.animate-bounce');
    dots.forEach((dot) => {
      expect(dot).toHaveClass('w-2', 'h-2');
    });
  });

  it('applies correct dot size classes for large size', () => {
    const { container } = render(<Loader size="lg" />);
    const dots = container.querySelectorAll('.animate-bounce');
    dots.forEach((dot) => {
      expect(dot).toHaveClass('w-2.5', 'h-2.5');
    });
  });

  it('applies animation delays to dots', () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll('.animate-bounce');

    expect(dots[0]).toHaveStyle({ animationDelay: '0ms', animationDuration: '1.4s' });
    expect(dots[1]).toHaveStyle({ animationDelay: '150ms', animationDuration: '1.4s' });
    expect(dots[2]).toHaveStyle({ animationDelay: '300ms', animationDuration: '1.4s' });
  });

  it('merges custom className', () => {
    render(<Loader className="custom-class" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<Loader data-testid="custom-loader" id="loader-1" />);
    const loader = screen.getByTestId('custom-loader');
    expect(loader).toHaveAttribute('id', 'loader-1');
  });

  it('has correct accessibility attributes', () => {
    render(<Loader message="Loading content..." />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-live', 'polite');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('message is accessible to screen readers', () => {
    render(<Loader message="AI is processing..." />);
    const message = screen.getByText('AI is processing...');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-muted-foreground', 'animate-pulse');
  });

  it('renders message with pulse animation', () => {
    const { container } = render(<Loader message="Test message" />);
    const messageElement = container.querySelector('.animate-pulse');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('Test message');
  });

  it('applies text-muted-foreground to message', () => {
    const { container } = render(<Loader />);
    const messageElement = container.querySelector('.text-muted-foreground');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders without size prop defaults to medium', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-base', 'gap-3');
  });

  it('supports all size variants', () => {
    const { rerender } = render(<Loader size="sm" />);
    let loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-sm', 'gap-2');

    rerender(<Loader size="md" />);
    loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-base', 'gap-3');

    rerender(<Loader size="lg" />);
    loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-lg', 'gap-4');
  });

  it('renders with showDots true by default', () => {
    const { container } = render(<Loader />);
    const dotsContainer = container.querySelector('.flex.items-center.gap-1');
    expect(dotsContainer).toBeInTheDocument();
  });

  it('displays correct dot styling', () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll('.rounded-full.bg-current.animate-bounce');
    expect(dots).toHaveLength(3);
    dots.forEach((dot) => {
      expect(dot).toHaveClass('rounded-full', 'bg-current', 'animate-bounce');
    });
  });

  it('works with empty message', () => {
    render(<Loader message="" />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  it('applies flex and items-center classes', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('flex', 'items-center');
  });

  it('has display name', () => {
    expect(Loader.displayName).toBe('Loader');
  });
});
