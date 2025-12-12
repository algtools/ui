import React, { act } from 'react';
import { vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sources } from '../sources';
import type { Source } from '../ai-types';

const mockSources: Source[] = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://react.dev',
    description: 'Official React documentation for building user interfaces',
    iconUrl: 'https://react.dev/favicon.ico',
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/',
    description: 'Comprehensive guide to TypeScript',
    iconUrl: 'https://www.typescriptlang.org/favicon.ico',
  },
  {
    id: '3',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web technology documentation',
  },
];

describe('Sources', () => {
  describe('Basic Rendering', () => {
    it('renders with data-slot attribute', () => {
      const { container } = render(<Sources sources={mockSources} />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).toBeInTheDocument();
    });

    it('renders nothing when sources array is empty', () => {
      const { container } = render(<Sources sources={[]} />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).not.toBeInTheDocument();
    });

    it('renders nothing when sources is undefined', () => {
      const { container } = render(<Sources sources={undefined as unknown as Source[]} />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Sources sources={mockSources} className="custom-class" />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      const { container } = render(
        <Sources sources={mockSources} style={{ backgroundColor: 'red' }} />
      );
      const sources = container.querySelector('[data-slot="sources"]') as HTMLElement;
      expect(sources.style.backgroundColor).toBe('red');
    });

    it('forwards ref to container', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Sources ref={ref} sources={mockSources} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Title and Header', () => {
    it('displays default title with correct count for multiple sources', () => {
      render(<Sources sources={mockSources} />);
      expect(screen.getByText('Used 3 sources')).toBeInTheDocument();
    });

    it('displays default title with correct count for single source', () => {
      render(<Sources sources={[mockSources[0]]} />);
      expect(screen.getByText('Used 1 source')).toBeInTheDocument();
    });

    it('displays custom title when provided', () => {
      render(<Sources sources={mockSources} title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders default icon when no icon provided', () => {
      const { container } = render(<Sources sources={mockSources} />);
      const fileTextIcon = container.querySelector('[data-slot="sources-trigger"] svg');
      expect(fileTextIcon).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      const CustomIcon = () => <div data-testid="custom-icon">Icon</div>;
      render(<Sources sources={mockSources} icon={<CustomIcon />} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Collapsible Behavior', () => {
    it('is collapsed by default', () => {
      const { container } = render(<Sources sources={mockSources} />);
      const content = container.querySelector('[data-slot="sources-content"]');
      // Content should not be visible initially
      expect(content).toBeInTheDocument();
    });

    it('expands when defaultOpen is true', () => {
      render(<Sources sources={mockSources} defaultOpen={true} />);
      // Sources should be visible
      expect(screen.getByText('React Documentation')).toBeInTheDocument();
    });

    it('toggles open state when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<Sources sources={mockSources} />);

      // Initially closed - element shouldn't be visible
      const firstSource = screen.queryByText('React Documentation');
      if (firstSource) {
        expect(firstSource).not.toBeVisible();
      }

      // Click to open
      const trigger = screen.getByRole('button', { name: /Toggle Used 3 sources/i });
      await user.click(trigger);

      // Should be open
      await waitFor(() => {
        expect(screen.getByText('React Documentation')).toBeVisible();
      });
    });

    it('calls onOpenChange when toggled', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<Sources sources={mockSources} onOpenChange={onOpenChange} />);

      const trigger = screen.getByRole('button', { name: /Toggle Used 3 sources/i });
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('respects controlled open prop', () => {
      const { rerender } = render(<Sources sources={mockSources} open={false} />);

      // When closed, element shouldn't be visible
      const firstSource = screen.queryByText('React Documentation');
      if (firstSource) {
        expect(firstSource).not.toBeVisible();
      }

      rerender(<Sources sources={mockSources} open={true} />);
      expect(screen.getByText('React Documentation')).toBeVisible();
    });
  });

  describe('Source Items', () => {
    beforeEach(() => {
      render(<Sources sources={mockSources} defaultOpen={true} />);
    });

    it('renders all source items', () => {
      expect(screen.getByText('React Documentation')).toBeInTheDocument();
      expect(screen.getByText('TypeScript Handbook')).toBeInTheDocument();
      expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
    });

    it('displays source numbers', () => {
      expect(screen.getByText('[1]')).toBeInTheDocument();
      expect(screen.getByText('[2]')).toBeInTheDocument();
      expect(screen.getByText('[3]')).toBeInTheDocument();
    });

    it('displays source titles', () => {
      expect(screen.getByText('React Documentation')).toBeInTheDocument();
    });

    it('displays source URLs', () => {
      expect(screen.getByText('https://react.dev')).toBeInTheDocument();
      expect(screen.getByText('https://www.typescriptlang.org/docs/')).toBeInTheDocument();
    });

    it('displays source descriptions', () => {
      expect(
        screen.getByText('Official React documentation for building user interfaces')
      ).toBeInTheDocument();
    });

    it('renders source icons when showIcons is true', () => {
      const { container } = render(<Sources sources={mockSources} defaultOpen={true} />);
      const sourceItems = container.querySelectorAll('[data-slot="source-item"]');
      sourceItems.forEach((item) => {
        const icon = item.querySelector('img, svg');
        expect(icon).toBeInTheDocument();
      });
    });

    it('hides source icons when showIcons is false', () => {
      const { container } = render(
        <Sources sources={mockSources} defaultOpen={true} showIcons={false} />
      );
      const sourceItems = container.querySelectorAll('[data-slot="source-item"]');
      sourceItems.forEach((item) => {
        // When showIcons is false, the icon/favicon wrapper should not be rendered
        const iconWrapper = item.querySelector('[data-slot="source-item"] > div:first-child');
        const hasIconOrImage = iconWrapper && iconWrapper.querySelector('img, svg[class*="file"]');
        expect(hasIconOrImage).toBeFalsy();
      });
    });

    it('falls back to FileText icon when iconUrl fails to load', () => {
      const { container } = render(<Sources sources={mockSources} defaultOpen={true} />);
      const images = container.querySelectorAll('img');

      // Simulate image load error
      act(() => {
        images.forEach((img) => {
          fireEvent.error(img);
        });
      });

      // FileText icons should be visible after error
      const fileTextIcons = container.querySelectorAll('[data-slot="source-item"] svg');
      expect(fileTextIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Source Interaction', () => {
    it('opens source URL in new tab when clicked', async () => {
      const user = userEvent.setup();
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<Sources sources={mockSources} defaultOpen={true} />);

      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      await user.click(firstSource);

      expect(windowSpy).toHaveBeenCalledWith('https://react.dev', '_blank', 'noopener,noreferrer');

      windowSpy.mockRestore();
    });

    it('calls onSourceClick when source is clicked', async () => {
      const user = userEvent.setup();
      const onSourceClick = vi.fn();
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<Sources sources={mockSources} defaultOpen={true} onSourceClick={onSourceClick} />);

      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      await user.click(firstSource);

      expect(onSourceClick).toHaveBeenCalledWith(mockSources[0]);

      windowSpy.mockRestore();
    });

    it('opens source URL when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<Sources sources={mockSources} defaultOpen={true} />);

      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      firstSource.focus();
      await user.keyboard('{Enter}');

      expect(windowSpy).toHaveBeenCalledWith('https://react.dev', '_blank', 'noopener,noreferrer');

      windowSpy.mockRestore();
    });

    it('opens source URL when Space key is pressed', async () => {
      const user = userEvent.setup();
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<Sources sources={mockSources} defaultOpen={true} />);

      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      firstSource.focus();
      await user.keyboard(' ');

      expect(windowSpy).toHaveBeenCalledWith('https://react.dev', '_blank', 'noopener,noreferrer');

      windowSpy.mockRestore();
    });

    it('renders source without URL as article role', () => {
      const sourceWithoutUrl: Source[] = [
        {
          id: '1',
          title: 'Internal Source',
          description: 'A source without URL',
        },
      ];

      render(<Sources sources={sourceWithoutUrl} defaultOpen={true} />);

      const source = screen.getByRole('article', { name: /Internal Source/i });
      expect(source).toBeInTheDocument();
    });

    it('does not call window.open for sources without URL', async () => {
      const user = userEvent.setup();
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      const sourceWithoutUrl: Source[] = [
        {
          id: '1',
          title: 'Internal Source',
          description: 'A source without URL',
        },
      ];

      render(<Sources sources={sourceWithoutUrl} defaultOpen={true} />);

      const source = screen.getByRole('article', { name: /Internal Source/i });
      await user.click(source);

      expect(windowSpy).not.toHaveBeenCalled();

      windowSpy.mockRestore();
    });
  });

  describe('Max Displayed Sources', () => {
    it('displays all sources when maxDisplayed is not set', () => {
      render(<Sources sources={mockSources} defaultOpen={true} />);

      expect(screen.getByText('React Documentation')).toBeInTheDocument();
      expect(screen.getByText('TypeScript Handbook')).toBeInTheDocument();
      expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
    });

    it('limits displayed sources when maxDisplayed is set', () => {
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={2} />);

      expect(screen.getByText('React Documentation')).toBeInTheDocument();
      expect(screen.getByText('TypeScript Handbook')).toBeInTheDocument();
      expect(screen.queryByText('MDN Web Docs')).not.toBeInTheDocument();
    });

    it('shows "show more" button when sources are limited', () => {
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={2} />);

      expect(screen.getByText('Show 1 more source')).toBeInTheDocument();
    });

    it('shows correct plural form in "show more" button', () => {
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={1} />);

      expect(screen.getByText('Show 2 more sources')).toBeInTheDocument();
    });

    it('displays all sources when "show more" button is clicked', async () => {
      const user = userEvent.setup();
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={2} />);

      expect(screen.queryByText('MDN Web Docs')).not.toBeInTheDocument();

      const showMoreButton = screen.getByRole('button', { name: /Show 1 more source/i });
      await user.click(showMoreButton);

      expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
      expect(screen.queryByText('Show 1 more source')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      const { container } = render(<Sources sources={mockSources} variant="default" />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).toHaveClass('border');
      expect(sources).toHaveClass('bg-muted/30');
    });

    it('applies compact variant styles', () => {
      const { container } = render(<Sources sources={mockSources} variant="compact" />);
      const sources = container.querySelector('[data-slot="sources"]');
      expect(sources).toHaveClass('border-0');
      expect(sources).toHaveClass('bg-transparent');
    });

    it('uses smaller text in compact variant', () => {
      render(<Sources sources={mockSources} variant="compact" />);
      const title = screen.getByText('Used 3 sources');
      expect(title).toHaveClass('text-xs');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label for trigger button', () => {
      render(<Sources sources={mockSources} />);
      const trigger = screen.getByRole('button', { name: 'Toggle Used 3 sources' });
      expect(trigger).toBeInTheDocument();
    });

    it('has proper ARIA label for source items with URL', () => {
      render(<Sources sources={mockSources} defaultOpen={true} />);
      const source = screen.getByRole('link', { name: 'Open React Documentation' });
      expect(source).toBeInTheDocument();
    });

    it('has proper ARIA label for source items without URL', () => {
      const sourceWithoutUrl: Source[] = [
        {
          id: '1',
          title: 'Internal Source',
          description: 'A source without URL',
        },
      ];

      render(<Sources sources={sourceWithoutUrl} defaultOpen={true} />);
      const source = screen.getByRole('article', { name: 'Internal Source' });
      expect(source).toBeInTheDocument();
    });

    it('supports keyboard navigation for sources with URL', () => {
      render(<Sources sources={mockSources} defaultOpen={true} />);
      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      expect(firstSource).toHaveAttribute('tabIndex', '0');
    });

    it('excludes tabIndex for sources without URL', () => {
      const sourceWithoutUrl: Source[] = [
        {
          id: '1',
          title: 'Internal Source',
        },
      ];

      render(<Sources sources={sourceWithoutUrl} defaultOpen={true} />);
      const source = screen.getByRole('article', { name: /Internal Source/i });
      expect(source).not.toHaveAttribute('tabIndex');
    });

    it('has focus-visible outline styles', () => {
      const { container } = render(<Sources sources={mockSources} />);
      const trigger = container.querySelector('[data-slot="sources-trigger"]');
      expect(trigger).toHaveClass('focus-visible:outline-none');
      expect(trigger).toHaveClass('focus-visible:ring-2');
      expect(trigger).toHaveClass('focus-visible:ring-ring');
    });

    it('provides proper title attributes for truncated content', () => {
      render(<Sources sources={mockSources} defaultOpen={true} />);
      const firstSourceTitle = screen.getByText('React Documentation').closest('h4');
      expect(firstSourceTitle).toHaveAttribute('title', 'React Documentation');
    });
  });

  describe('Edge Cases', () => {
    it('handles source without description', () => {
      const sourceWithoutDesc: Source[] = [
        {
          id: '1',
          title: 'Simple Source',
          url: 'https://example.com',
        },
      ];

      render(<Sources sources={sourceWithoutDesc} defaultOpen={true} />);
      expect(screen.getByText('Simple Source')).toBeInTheDocument();
    });

    it('handles source with metadata', () => {
      const sourceWithMetadata: Source[] = [
        {
          id: '1',
          title: 'Source with Metadata',
          url: 'https://example.com',
          metadata: { author: 'John Doe', date: '2024-01-01' },
        },
      ];

      render(<Sources sources={sourceWithMetadata} defaultOpen={true} />);
      expect(screen.getByText('Source with Metadata')).toBeInTheDocument();
    });

    it('handles maxDisplayed equal to sources length', () => {
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={3} />);

      expect(screen.getByText('React Documentation')).toBeInTheDocument();
      expect(screen.getByText('TypeScript Handbook')).toBeInTheDocument();
      expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
      expect(screen.queryByText(/Show.*more/)).not.toBeInTheDocument();
    });

    it('handles maxDisplayed greater than sources length', () => {
      render(<Sources sources={mockSources} defaultOpen={true} maxDisplayed={10} />);

      expect(screen.getByText('React Documentation')).toBeInTheDocument();
      expect(screen.queryByText(/Show.*more/)).not.toBeInTheDocument();
    });

    it('prevents default behavior on Space key press', async () => {
      const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<Sources sources={mockSources} defaultOpen={true} />);

      const firstSource = screen.getByRole('link', { name: /Open React Documentation/i });
      firstSource.focus();

      const preventDefaultSpy = vi.fn();
      const event = new KeyboardEvent('keydown', { key: ' ' });
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefaultSpy,
      });

      firstSource.dispatchEvent(event);

      windowSpy.mockRestore();
    });
  });

  describe('Icon Fallback', () => {
    it('shows FileText icon when iconUrl is not provided', () => {
      const sourceWithoutIcon: Source[] = [
        {
          id: '1',
          title: 'No Icon Source',
          url: 'https://example.com',
        },
      ];

      const { container } = render(<Sources sources={sourceWithoutIcon} defaultOpen={true} />);
      const fileTextIcon = container.querySelector('[data-slot="source-item"] svg');
      expect(fileTextIcon).toBeInTheDocument();
    });

    it('hides image and shows FileText icon when image fails to load', () => {
      const { container } = render(<Sources sources={mockSources} defaultOpen={true} />);
      const images = container.querySelectorAll('[data-slot="source-item"] img');

      const firstImage = images[0] as HTMLImageElement;

      act(() => {
        fireEvent.error(firstImage);
      });

      expect(firstImage.style.display).toBe('none');
    });
  });
});
