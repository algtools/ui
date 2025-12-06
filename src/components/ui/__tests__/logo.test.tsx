import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { Logo } from '../logo';

vi.mock('lucide-react', () => ({
  Triangle: ({
    className,
    size,
    strokeWidth,
  }: {
    className?: string;
    size?: number;
    strokeWidth?: number;
  }) => (
    <svg
      data-testid="triangle-icon"
      className={className}
      data-size={size}
      data-stroke-width={strokeWidth}
    />
  ),
}));

describe('Logo', () => {
  it('renders with rounded div and primary background', () => {
    const { container } = render(<Logo className="custom-wrapper" imgClassName="custom-icon" />);

    const wrapper = container.querySelector('div');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('inline-flex');
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('justify-center');
    expect(wrapper).toHaveClass('rounded-lg');
    expect(wrapper).toHaveClass('bg-primary');
    expect(wrapper).toHaveClass('p-2');
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  it('renders Triangle icon with foreground color', () => {
    const { container } = render(<Logo imgClassName="custom-icon" />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg).toHaveClass('text-primary-foreground');
    expect(svg).toHaveClass('custom-icon');
  });

  it('uses default size for logo variant', () => {
    const { container } = render(<Logo variant="logo" />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('data-size')).toBe('24');
  });

  it('uses default size for icon variant', () => {
    const { container } = render(<Logo variant="icon" />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('data-size')).toBe('48');
  });

  it('uses custom width when provided', () => {
    const { container } = render(<Logo width={64} />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('data-size')).toBe('64');
  });

  it('uses custom height when provided', () => {
    const { container } = render(<Logo height={32} />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('data-size')).toBe('32');
  });

  it('applies strokeWidth of 2', () => {
    const { container } = render(<Logo />);

    const svg = container.querySelector('svg[data-testid="triangle-icon"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('data-stroke-width')).toBe('2');
  });
});
