import React from 'react';
import { vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineCitation, InlineCitationList } from '../inline-citation';
import type { Citation } from '../../ai/ai-types';

// Mock Radix Popover primitives
vi.mock('@radix-ui/react-popover', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({
      children,
      open,
      onOpenChange,
    }: React.ComponentProps<'div'> & {
      open?: boolean;
      onOpenChange?: (open: boolean) => void;
    }) => (
      <div data-popover-root data-open={open} onClick={() => onOpenChange?.(!open)}>
        {children}
      </div>
    ),
    Portal: ({ children }: React.ComponentProps<'div'>) => (
      <div data-popover-portal>{children}</div>
    ),
    Trigger: React.forwardRef<
      HTMLButtonElement,
      React.ComponentProps<'button'> & { asChild?: boolean }
    >(function PopoverTrigger({ children, asChild, ...props }, ref) {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ...props, ref } as React.HTMLAttributes<HTMLElement>);
      }
      return (
        <button ref={ref} {...props}>
          {children}
        </button>
      );
    }),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div data-popover-content {...props}>
        {children}
      </div>
    ),
    Anchor: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('InlineCitation', () => {
  const mockCitation: Citation = {
    id: 'citation-1',
    number: 1,
    source: {
      id: 'source-1',
      title: 'Example Article',
      url: 'https://example.com/article',
      description: 'A detailed description of the example article',
      iconUrl: 'https://example.com/icon.png',
    },
    excerpt: 'This is an important excerpt from the source',
  };

  const mockCitationMinimal: Citation = {
    id: 'citation-2',
    number: 2,
    source: {
      id: 'source-2',
      title: 'Minimal Source',
    },
  };

  const mockCitationWithMetadata: Citation = {
    id: 'citation-3',
    number: 3,
    source: {
      id: 'source-3',
      title: 'Source with Metadata',
      url: 'https://example.com',
      metadata: {
        author: 'John Doe',
        published_date: '2024-01-15',
        category: 'Technology',
      },
    },
  };

  describe('Rendering', () => {
    it('renders citation button with number', () => {
      render(<InlineCitation citation={mockCitation} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('[1]');
    });

    it('renders with numbered variant styling', () => {
      render(<InlineCitation citation={mockCitation} variant="numbered" />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('[1]');
    });

    it('renders with compact variant', () => {
      render(<InlineCitation citation={mockCitation} variant="compact" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<InlineCitation citation={mockCitation} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders without preview when showPreview is false', () => {
      const { container } = render(<InlineCitation citation={mockCitation} showPreview={false} />);
      expect(container.querySelector('[data-popover-root]')).not.toBeInTheDocument();
    });

    it('applies expanded styling when expanded prop is true', () => {
      render(<InlineCitation citation={mockCitation} expanded={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary/10');
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label with citation info', () => {
      render(<InlineCitation citation={mockCitation} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Citation 1: Example Article');
    });

    it('has aria-expanded attribute', () => {
      render(<InlineCitation citation={mockCitation} expanded={false} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when expanded changes', () => {
      const { rerender } = render(<InlineCitation citation={mockCitation} expanded={false} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      rerender(<InlineCitation citation={mockCitation} expanded={true} />);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has data attributes for citation id and number', () => {
      render(<InlineCitation citation={mockCitation} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-citation-id', 'citation-1');
      expect(button).toHaveAttribute('data-citation-number', '1');
    });

    it('has focus styles', () => {
      render(<InlineCitation citation={mockCitation} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary');
    });
  });

  describe('Interactions', () => {
    it('calls onExpand when clicked', async () => {
      const onExpand = vi.fn();
      render(<InlineCitation citation={mockCitation} onExpand={onExpand} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(onExpand).toHaveBeenCalledTimes(1);
      expect(onExpand).toHaveBeenCalledWith(mockCitation);
    });

    it('handles click event properly', async () => {
      const onExpand = vi.fn();
      render(<InlineCitation citation={mockCitation} onExpand={onExpand} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Verify the handler was called, which means the event was processed
      expect(onExpand).toHaveBeenCalledWith(mockCitation);
    });

    it('works without onExpand callback', async () => {
      render(<InlineCitation citation={mockCitation} />);
      const button = screen.getByRole('button');

      expect(() => userEvent.click(button)).not.toThrow();
    });
  });

  describe('Preview Content', () => {
    it('displays citation preview with all fields', () => {
      render(<InlineCitation citation={mockCitation} />);

      expect(screen.getByText('Example Article')).toBeInTheDocument();
      expect(screen.getByText('https://example.com/article')).toBeInTheDocument();
      expect(screen.getByText('A detailed description of the example article')).toBeInTheDocument();
      expect(screen.getByText(/This is an important excerpt/)).toBeInTheDocument();
    });

    it('displays minimal citation without optional fields', () => {
      render(<InlineCitation citation={mockCitationMinimal} />);

      expect(screen.getByText('Minimal Source')).toBeInTheDocument();
    });

    it('displays metadata when present', () => {
      render(<InlineCitation citation={mockCitationWithMetadata} />);

      expect(screen.getByText('author')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('published date')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
      expect(screen.getByText('category')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('renders icon when iconUrl is provided', () => {
      const { container } = render(<InlineCitation citation={mockCitation} />);
      const icon = container.querySelector('img[src="https://example.com/icon.png"]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('url link has correct attributes', () => {
      render(<InlineCitation citation={mockCitation} />);
      const links = screen.getAllByRole('link');
      const urlLink = links[0];

      expect(urlLink).toHaveAttribute('href', 'https://example.com/article');
      expect(urlLink).toHaveAttribute('target', '_blank');
      expect(urlLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('url link can be clicked', async () => {
      render(<InlineCitation citation={mockCitation} />);
      const links = screen.getAllByRole('link');
      const urlLink = links[0];

      // Verify link exists and has correct href
      expect(urlLink).toHaveAttribute('href', 'https://example.com/article');

      // Click should work without errors
      await userEvent.click(urlLink);
    });
  });

  describe('Variants', () => {
    it('applies correct styles for default variant', () => {
      render(<InlineCitation citation={mockCitation} variant="default" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-1');
    });

    it('applies correct styles for compact variant', () => {
      render(<InlineCitation citation={mockCitation} variant="compact" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-0.5');
    });

    it('applies correct styles for numbered variant', () => {
      render(<InlineCitation citation={mockCitation} variant="numbered" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('align-super');
    });
  });

  describe('ForwardRef', () => {
    it('accepts ref prop', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const { container } = render(<InlineCitation citation={mockCitation} ref={ref} />);

      // Verify component renders with ref prop
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('[1]');
    });
  });
});

describe('InlineCitationList', () => {
  const mockCitations: Citation[] = [
    {
      id: 'citation-1',
      number: 1,
      source: {
        id: 'source-1',
        title: 'First Article',
        url: 'https://example.com/first',
        description: 'Description of first article',
      },
      excerpt: 'Excerpt from first source',
    },
    {
      id: 'citation-2',
      number: 2,
      source: {
        id: 'source-2',
        title: 'Second Article',
        url: 'https://example.com/second',
      },
    },
    {
      id: 'citation-3',
      number: 3,
      source: {
        id: 'source-3',
        title: 'Third Article',
      },
    },
  ];

  describe('Rendering', () => {
    it('renders list of citations', () => {
      render(<InlineCitationList citations={mockCitations} />);

      expect(screen.getByText('First Article')).toBeInTheDocument();
      expect(screen.getByText('Second Article')).toBeInTheDocument();
      expect(screen.getByText('Third Article')).toBeInTheDocument();
    });

    it('renders default title', () => {
      render(<InlineCitationList citations={mockCitations} />);
      expect(screen.getByText('Sources')).toBeInTheDocument();
    });

    it('renders custom title', () => {
      render(<InlineCitationList citations={mockCitations} title="References" />);
      expect(screen.getByText('References')).toBeInTheDocument();
    });

    it('renders citation numbers', () => {
      render(<InlineCitationList citations={mockCitations} />);
      expect(screen.getByText('[1]')).toBeInTheDocument();
      expect(screen.getByText('[2]')).toBeInTheDocument();
      expect(screen.getByText('[3]')).toBeInTheDocument();
    });

    it('renders descriptions when present', () => {
      render(<InlineCitationList citations={mockCitations} />);
      expect(screen.getByText('Description of first article')).toBeInTheDocument();
    });

    it('renders excerpts when present', () => {
      render(<InlineCitationList citations={mockCitations} />);
      expect(screen.getByText(/Excerpt from first source/)).toBeInTheDocument();
    });

    it('renders nothing when citations array is empty', () => {
      const { container } = render(<InlineCitationList citations={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('applies custom className', () => {
      const { container } = render(
        <InlineCitationList citations={mockCitations} className="custom-list" />
      );
      expect(container.firstChild).toHaveClass('custom-list');
    });

    it('has data attributes for citation items', () => {
      const { container } = render(<InlineCitationList citations={mockCitations} />);
      const items = container.querySelectorAll('[data-citation-item]');

      expect(items).toHaveLength(3);
      expect(items[0]).toHaveAttribute('data-citation-id', 'citation-1');
      expect(items[1]).toHaveAttribute('data-citation-id', 'citation-2');
      expect(items[2]).toHaveAttribute('data-citation-id', 'citation-3');
    });
  });

  describe('URL Links', () => {
    it('renders clickable links for citations with URLs', () => {
      render(<InlineCitationList citations={mockCitations} />);

      const firstLink = screen.getByText('First Article');
      expect(firstLink.tagName).toBe('A');
      expect(firstLink).toHaveAttribute('href', 'https://example.com/first');
      expect(firstLink).toHaveAttribute('target', '_blank');
      expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders plain text for citations without URLs', () => {
      render(<InlineCitationList citations={mockCitations} />);

      const thirdItem = screen.getByText('Third Article');
      expect(thirdItem.tagName).toBe('SPAN');
      expect(thirdItem).not.toHaveAttribute('href');
    });
  });

  describe('Interactions', () => {
    it('calls onCitationClick when citation link is clicked', async () => {
      const onCitationClick = vi.fn();
      render(<InlineCitationList citations={mockCitations} onCitationClick={onCitationClick} />);

      const firstLink = screen.getByText('First Article');
      await userEvent.click(firstLink);

      expect(onCitationClick).toHaveBeenCalledTimes(1);
      expect(onCitationClick).toHaveBeenCalledWith(mockCitations[0]);
    });

    it('citation link handles clicks properly', async () => {
      const onCitationClick = vi.fn();
      render(<InlineCitationList citations={mockCitations} onCitationClick={onCitationClick} />);

      const firstLink = screen.getByText('First Article');
      await userEvent.click(firstLink);

      // Verify the callback was called
      expect(onCitationClick).toHaveBeenCalledWith(mockCitations[0]);
    });

    it('works without onCitationClick callback', async () => {
      render(<InlineCitationList citations={mockCitations} />);
      const firstLink = screen.getByText('First Article');

      expect(() => userEvent.click(firstLink)).not.toThrow();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to container div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<InlineCitationList citations={mockCitations} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles citations with very long titles', () => {
      const longTitleCitation: Citation = {
        id: 'long',
        number: 1,
        source: {
          id: 'source-long',
          title: 'This is a very long title '.repeat(10),
          url: 'https://example.com',
        },
      };

      render(<InlineCitationList citations={[longTitleCitation]} />);
      expect(screen.getByText(/This is a very long title/)).toBeInTheDocument();
    });

    it('handles special characters in metadata keys', () => {
      const citationWithSpecialChars: Citation = {
        id: 'special',
        number: 1,
        source: {
          id: 'source-special',
          title: 'Special Source',
          metadata: {
            special_key_with_underscores: 'value',
          },
        },
      };

      render(<InlineCitation citation={citationWithSpecialChars} />);
      expect(screen.getByText('special key with underscores')).toBeInTheDocument();
    });
  });
});
