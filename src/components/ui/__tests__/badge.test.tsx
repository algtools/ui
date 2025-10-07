import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders with data-slot and base classes, merges className', () => {
    render(<Badge className="extra">New</Badge>);
    const el = screen.getByText('New');
    expect(el).toHaveAttribute('data-slot', 'badge');
    // A few base classes
    expect(el).toHaveClass('inline-flex');
    expect(el).toHaveClass('rounded-md');
    expect(el).toHaveClass('text-xs');
    // merged className
    expect(el).toHaveClass('extra');
  });

  it('applies variant classes (destructive)', () => {
    render(<Badge variant="destructive">Danger</Badge>);
    const el = screen.getByText('Danger');
    expect(el).toHaveClass('bg-destructive');
    expect(el).toHaveClass('text-white');
  });

  it('renders as child element when asChild is true and passes props/classes', () => {
    render(
      <Badge asChild className="extra">
        <a href="#" data-testid="child-anchor">
          Link badge
        </a>
      </Badge>
    );
    const anchor = screen.getByTestId('child-anchor');
    expect(anchor.tagName).toBe('A');
    expect(anchor).toHaveAttribute('href', '#');
    expect(anchor).toHaveAttribute('data-slot', 'badge');
    expect(anchor).toHaveClass('inline-flex');
    expect(anchor).toHaveClass('extra');
  });
});
