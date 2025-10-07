import React from 'react';
import { render } from '@testing-library/react';
import { Progress } from '../progress';

describe('Progress', () => {
  it('renders root and indicator with data-slots and merges className', () => {
    render(<Progress value={0} className="extra-root" />);

    const root = document.querySelector('[data-slot="progress"]');
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(root).not.toBeNull();
    expect(indicator).not.toBeNull();
    expect(root).toHaveClass('rounded-full');
    expect(root).toHaveClass('extra-root');
  });

  it('positions indicator based on value via transform translateX', () => {
    const { rerender } = render(<Progress value={0} />);
    let indicator = document.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement | null;
    expect(indicator).not.toBeNull();
    expect(indicator!.style.transform).toBe('translateX(-100%)');

    rerender(<Progress value={50} />);
    indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement | null;
    expect(indicator!.style.transform).toBe('translateX(-50%)');

    rerender(<Progress value={100} />);
    indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement | null;
    expect(indicator!.style.transform).toBe('translateX(-0%)');
  });

  it('handles undefined value by defaulting to 0', () => {
    render(<Progress />);
    const indicator = document.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement | null;
    expect(indicator).not.toBeNull();
    expect(indicator!.style.transform).toBe('translateX(-100%)');
  });

  it('applies custom indicatorColor prop', () => {
    render(<Progress value={50} indicatorColor="bg-red-500" />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveClass('bg-red-500');
  });

  it('uses default bg-primary class when no indicatorColor is provided', () => {
    render(<Progress value={50} />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveClass('bg-primary');
  });

  it('handles edge case values correctly', () => {
    const { rerender } = render(<Progress value={-10} />);
    let indicator = document.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement | null;
    expect(indicator!.style.transform).toBe('translateX(-100%)');

    rerender(<Progress value={150} />);
    indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement | null;
    expect(indicator!.style.transform).toBe('translateX(-0%)');
  });

  it('forwards additional props to the root element', () => {
    render(<Progress value={50} aria-label="Loading progress" data-testid="progress-bar" />);
    const root = document.querySelector('[data-slot="progress"]');
    expect(root).toHaveAttribute('aria-label', 'Loading progress');
    expect(root).toHaveAttribute('data-testid', 'progress-bar');
  });

  it('applies correct default classes to root and indicator', () => {
    render(<Progress value={25} />);
    const root = document.querySelector('[data-slot="progress"]');
    const indicator = document.querySelector('[data-slot="progress-indicator"]');

    expect(root).toHaveClass(
      'bg-primary/20',
      'relative',
      'h-2',
      'w-full',
      'overflow-hidden',
      'rounded-full'
    );
    expect(indicator).toHaveClass('bg-primary', 'h-full', 'w-full', 'flex-1', 'transition-all');
  });

  it('maintains indicator positioning precision for decimal values', () => {
    render(<Progress value={33.33} />);
    const indicator = document.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement | null;
    expect(indicator!.style.transform).toBe('translateX(-66.67%)');
  });

  it('overrides default indicator color when indicatorColor is provided', () => {
    render(<Progress value={50} indicatorColor="bg-green-400" />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveClass('bg-green-400');
    // The custom color should replace the default bg-primary class
    expect(indicator).not.toHaveClass('bg-primary');
  });
});
