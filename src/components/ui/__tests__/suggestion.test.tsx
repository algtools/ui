import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suggestion } from '../suggestion';
import { Sparkles } from 'lucide-react';

describe('Suggestion', () => {
  it('renders with data-slot and base classes', () => {
    render(<Suggestion text="Test suggestion" />);
    const element = screen.getByRole('button', { name: /test suggestion/i });
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-slot', 'suggestion');
    expect(element).toHaveAttribute('type', 'button');
    expect(element).toHaveClass('inline-flex');
    expect(element).toHaveClass('rounded-full');
    expect(element).toHaveClass('cursor-pointer');
  });

  it('displays the provided text', () => {
    render(<Suggestion text="Click me for more" />);
    expect(screen.getByText('Click me for more')).toBeInTheDocument();
  });

  it('renders with an icon when provided', () => {
    render(<Suggestion text="With icon" icon={<Sparkles data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('With icon')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Suggestion text="Default" variant="default" />);
    let element = screen.getByRole('button');
    expect(element).toHaveClass('bg-secondary');

    rerender(<Suggestion text="Outline" variant="outline" />);
    element = screen.getByRole('button');
    expect(element).toHaveClass('border-2');

    rerender(<Suggestion text="Ghost" variant="ghost" />);
    element = screen.getByRole('button');
    expect(element).toHaveClass('hover:bg-accent');

    rerender(<Suggestion text="Primary" variant="primary" />);
    element = screen.getByRole('button');
    expect(element).toHaveClass('bg-primary/10');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Suggestion text="Default" size="default" />);
    let element = screen.getByRole('button');
    expect(element).toHaveClass('h-9');

    rerender(<Suggestion text="Small" size="sm" />);
    element = screen.getByRole('button');
    expect(element).toHaveClass('h-8');
    expect(element).toHaveClass('text-xs');

    rerender(<Suggestion text="Large" size="lg" />);
    element = screen.getByRole('button');
    expect(element).toHaveClass('h-10');
  });

  it('merges custom className', () => {
    render(<Suggestion text="Custom" className="custom-class" />);
    const element = screen.getByRole('button');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('inline-flex');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Suggestion text="Clickable" onClick={handleClick} />);
    const element = screen.getByRole('button');

    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Suggestion text="Disabled" onClick={handleClick} disabled />);
    const element = screen.getByRole('button');

    fireEvent.click(element);
    expect(handleClick).not.toHaveBeenCalled();
    expect(element).toBeDisabled();
  });

  it('supports keyboard navigation (Enter key)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Suggestion text="Keyboard" onClick={handleClick} />);
    const element = screen.getByRole('button');

    element.focus();
    expect(element).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation (Space key)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Suggestion text="Keyboard" onClick={handleClick} />);
    const element = screen.getByRole('button');

    element.focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is focusable by default', () => {
    render(<Suggestion text="Focusable" />);
    const element = screen.getByRole('button');
    element.focus();
    expect(element).toHaveFocus();
  });

  it('applies disabled opacity when disabled', () => {
    render(<Suggestion text="Disabled" disabled />);
    const element = screen.getByRole('button');
    expect(element).toHaveClass('disabled:opacity-50');
    expect(element).toHaveClass('disabled:pointer-events-none');
  });

  it('forwards additional props (aria-label, data attributes)', () => {
    render(
      <Suggestion text="Accessible" aria-label="Custom label" data-testid="custom-suggestion" />
    );
    const element = screen.getByTestId('custom-suggestion');
    expect(element).toHaveAttribute('aria-label', 'Custom label');
  });

  it('renders as child element when asChild is true', () => {
    // When using asChild, the text and icon props are ignored
    // The child element provides the content
    render(
      <Suggestion text="" asChild>
        <a href="#test" data-testid="child-link">
          Link suggestion
        </a>
      </Suggestion>
    );
    const link = screen.getByTestId('child-link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#test');
    expect(link).toHaveAttribute('data-slot', 'suggestion');
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('rounded-full');
    expect(link).toHaveTextContent('Link suggestion');
  });

  it('ignores text and icon props when asChild is true', () => {
    render(
      <Suggestion text="Ignored text" icon={<Sparkles />} asChild>
        <a href="#test" data-testid="child-element">
          Child content
        </a>
      </Suggestion>
    );
    const element = screen.getByTestId('child-element');
    expect(element).toHaveTextContent('Child content');
    expect(element).not.toHaveTextContent('Ignored text');
  });

  it('has proper button type attribute', () => {
    render(<Suggestion text="Button type" />);
    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('type', 'button');
  });

  it('handles multiple clicks correctly', () => {
    const handleClick = vi.fn();
    render(<Suggestion text="Multiple clicks" onClick={handleClick} />);
    const element = screen.getByRole('button');

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('renders with all variants and sizes without errors', () => {
    const variants = ['default', 'outline', 'ghost', 'primary'] as const;
    const sizes = ['default', 'sm', 'lg'] as const;

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        const { unmount } = render(
          <Suggestion text={`${variant}-${size}`} variant={variant} size={size} />
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('handles ref forwarding', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Suggestion text="With ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveTextContent('With ref');
  });

  it('has proper focus-visible styles', () => {
    render(<Suggestion text="Focus visible" />);
    const element = screen.getByRole('button');
    expect(element).toHaveClass('focus-visible:ring-2');
    expect(element).toHaveClass('focus-visible:ring-ring');
  });
});
