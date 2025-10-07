import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from '../slider';

// Mock Radix Slider primitives to simplify rendering
jest.mock('@radix-ui/react-slider', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Track: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Range: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
    Thumb: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
  };
});

describe('Slider', () => {
  it('renders root, track, range, and thumb with data-slots and merges className', () => {
    render(<Slider defaultValue={[30]} className="extra-root" />);

    const root = document.querySelector('[data-slot="slider"]') as HTMLElement | null;
    const track = document.querySelector('[data-slot="slider-track"]') as HTMLElement | null;
    const range = document.querySelector('[data-slot="slider-range"]') as HTMLElement | null;
    const thumb = document.querySelector('[data-slot="slider-thumb"]') as HTMLElement | null;

    expect(root).not.toBeNull();
    expect(track).not.toBeNull();
    expect(range).not.toBeNull();
    expect(thumb).not.toBeNull();

    expect(root!).toHaveClass('relative');
    expect(root!).toHaveClass('flex');
    expect(root!).toHaveClass('extra-root');
    expect(track!).toHaveClass('rounded-full');
    expect(range!).toHaveClass('bg-primary');
    expect(thumb!).toHaveClass('rounded-full');
    expect(thumb!).toHaveClass('size-4');
  });

  it('renders a thumb for each value in defaultValue (single and range)', () => {
    const { rerender } = render(<Slider defaultValue={[40]} />);

    let thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs.length).toBe(1);

    rerender(<Slider defaultValue={[20, 80]} />);
    thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs.length).toBe(2);
  });
});
