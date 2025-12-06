import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders a button with default styles and data-slot', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'button');
    // A few default classes
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('bg-primary');
  });

  it('supports variant and size props', () => {
    render(
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    );
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('h-8');
  });

  it('merges custom className', () => {
    render(<Button className="custom-class">Merge</Button>);
    const button = screen.getByRole('button', { name: /merge/i });
    expect(button).toHaveClass('custom-class');
  });

  it('forwards common props (aria-label, disabled)', () => {
    render(
      <Button aria-label="do it" disabled>
        Do it
      </Button>
    );
    const button = screen.getByRole('button', { name: /do it/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'do it');
  });

  it('calls onClick when enabled and not when disabled', () => {
    const handleClick = vi.fn();
    render(
      <>
        <Button onClick={handleClick}>Enabled</Button>
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: /enabled/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /disabled/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as child element when asChild is true and passes props/classes', () => {
    render(
      <Button asChild className="extra">
        <a href="#" data-testid="child-anchor">
          Anchor
        </a>
      </Button>
    );
    const anchor = screen.getByTestId('child-anchor');
    expect(anchor.tagName).toBe('A');
    expect(anchor).toHaveAttribute('href', '#');
    // Slot should pass data-slot and classes to child
    expect(anchor).toHaveAttribute('data-slot', 'button');
    expect(anchor).toHaveClass('inline-flex');
    expect(anchor).toHaveClass('extra');
  });
});
