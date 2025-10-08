import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Copy } from 'lucide-react';
import { Actions, type Action } from '../actions';

describe('Actions', () => {
  describe('rendering', () => {
    it('renders nothing when no actions are provided', () => {
      const { container } = render(<Actions />);
      expect(container.firstChild).toBeNull();
    });

    it('renders action buttons from callback props', () => {
      const handleCopy = jest.fn();
      const handleRegenerate = jest.fn();

      render(<Actions onCopy={handleCopy} onRegenerate={handleRegenerate} />);

      expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /regenerate response/i })).toBeInTheDocument();
    });

    it('renders all default action types', () => {
      const handlers = {
        onCopy: jest.fn(),
        onRegenerate: jest.fn(),
        onThumbsUp: jest.fn(),
        onThumbsDown: jest.fn(),
        onShare: jest.fn(),
      };

      render(<Actions {...handlers} />);

      expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /regenerate response/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /good response/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bad response/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });

    it('renders custom actions when provided', () => {
      const customActions: Action[] = [
        {
          id: 'custom-1',
          label: 'Custom Action 1',
          icon: <span data-testid="custom-icon-1">Icon 1</span>,
          onClick: jest.fn(),
        },
        {
          id: 'custom-2',
          label: 'Custom Action 2',
          icon: <span data-testid="custom-icon-2">Icon 2</span>,
          onClick: jest.fn(),
        },
      ];

      render(<Actions actions={customActions} />);

      expect(screen.getByRole('button', { name: 'Custom Action 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Action 2' })).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon-2')).toBeInTheDocument();
    });

    it('has role="group" and aria-label', () => {
      render(<Actions onCopy={jest.fn()} />);
      const group = screen.getByRole('group', { name: /message actions/i });
      expect(group).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Actions onCopy={jest.fn()} className="custom-class" />);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('custom-class');
    });
  });

  describe('orientation', () => {
    it('renders horizontally by default', () => {
      render(<Actions onCopy={jest.fn()} onRegenerate={jest.fn()} />);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('flex-row');
      expect(group).not.toHaveClass('flex-col');
    });

    it('renders vertically when orientation="vertical"', () => {
      render(<Actions onCopy={jest.fn()} onRegenerate={jest.fn()} orientation="vertical" />);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('flex-col');
      expect(group).not.toHaveClass('flex-row');
    });
  });

  describe('size variants', () => {
    it('renders with small size', () => {
      render(<Actions onCopy={jest.fn()} size="sm" />);
      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      expect(button).toHaveClass('size-8');
    });

    it('renders with default size', () => {
      render(<Actions onCopy={jest.fn()} size="default" />);
      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      expect(button).toHaveClass('size-9');
    });

    it('renders with large size', () => {
      render(<Actions onCopy={jest.fn()} size="lg" />);
      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      expect(button).toHaveClass('size-10');
    });
  });

  describe('interactions', () => {
    it('calls onClick when action button is clicked', () => {
      const handleCopy = jest.fn();
      const handleRegenerate = jest.fn();

      render(<Actions onCopy={handleCopy} onRegenerate={handleRegenerate} />);

      fireEvent.click(screen.getByRole('button', { name: /copy to clipboard/i }));
      expect(handleCopy).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByRole('button', { name: /regenerate response/i }));
      expect(handleRegenerate).toHaveBeenCalledTimes(1);
    });

    it('calls custom action onClick handlers', () => {
      const handleCustom1 = jest.fn();
      const handleCustom2 = jest.fn();

      const customActions: Action[] = [
        {
          id: 'custom-1',
          label: 'Custom Action 1',
          icon: <span>Icon 1</span>,
          onClick: handleCustom1,
        },
        {
          id: 'custom-2',
          label: 'Custom Action 2',
          icon: <span>Icon 2</span>,
          onClick: handleCustom2,
        },
      ];

      render(<Actions actions={customActions} />);

      fireEvent.click(screen.getByRole('button', { name: 'Custom Action 1' }));
      expect(handleCustom1).toHaveBeenCalledTimes(1);
      expect(handleCustom2).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: 'Custom Action 2' }));
      expect(handleCustom2).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when action is disabled', () => {
      const handleClick = jest.fn();

      const actions: Action[] = [
        {
          id: 'disabled',
          label: 'Disabled Action',
          icon: <span>Icon</span>,
          onClick: handleClick,
          disabled: true,
        },
      ];

      render(<Actions actions={actions} />);

      const button = screen.getByRole('button', { name: 'Disabled Action' });
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when action is loading', () => {
      const handleClick = jest.fn();

      const actions: Action[] = [
        {
          id: 'loading',
          label: 'Loading Action',
          icon: <span>Icon</span>,
          onClick: handleClick,
          loading: true,
        },
      ];

      render(<Actions actions={actions} />);

      const button = screen.getByRole('button', { name: 'Loading Action' });
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('shows loading indicator when action is loading', () => {
      const actions: Action[] = [
        {
          id: 'loading',
          label: 'Loading Action',
          icon: <Copy className="size-4" />,
          onClick: jest.fn(),
          loading: true,
        },
      ];

      render(<Actions actions={actions} />);

      const loadingIndicator = screen.getByRole('status', { name: /loading/i });
      expect(loadingIndicator).toBeInTheDocument();
    });

    it('shows regular icon when action is not loading', () => {
      const actions: Action[] = [
        {
          id: 'not-loading',
          label: 'Normal Action',
          icon: <Copy className="size-4" data-testid="copy-icon" />,
          onClick: jest.fn(),
          loading: false,
        },
      ];

      render(<Actions actions={actions} />);

      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });
  });

  describe('tooltips', () => {
    it('renders buttons with tooltip triggers when showTooltips is true', () => {
      render(<Actions onCopy={jest.fn()} />);

      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      expect(button).toHaveAttribute('data-slot', 'tooltip-trigger');
    });

    it('renders buttons without tooltip triggers when showTooltips is false', () => {
      render(<Actions onCopy={jest.fn()} showTooltips={false} />);

      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      // When showTooltips is false, buttons are rendered directly without Tooltip wrapper
      expect(button).not.toHaveAttribute('data-slot', 'tooltip-trigger');
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA labels for screen readers', () => {
      render(<Actions onCopy={jest.fn()} onRegenerate={jest.fn()} />);

      expect(screen.getByRole('button', { name: /copy to clipboard/i })).toHaveAttribute(
        'aria-label',
        'Copy to clipboard'
      );
      expect(screen.getByRole('button', { name: /regenerate response/i })).toHaveAttribute(
        'aria-label',
        'Regenerate response'
      );
    });

    it('supports keyboard navigation', () => {
      const handleCopy = jest.fn();

      render(<Actions onCopy={handleCopy} showTooltips={false} />);

      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      button.focus();
      expect(button).toHaveFocus();
    });

    it('indicates disabled state', () => {
      const actions: Action[] = [
        {
          id: 'disabled',
          label: 'Disabled Action',
          icon: <span>Icon</span>,
          onClick: jest.fn(),
          disabled: true,
        },
      ];

      render(<Actions actions={actions} />);

      const button = screen.getByRole('button', { name: 'Disabled Action' });
      expect(button).toBeDisabled();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the container div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Actions ref={ref} onCopy={jest.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute('role')).toBe('group');
    });
  });

  describe('edge cases', () => {
    it('renders empty when actions array is empty', () => {
      const { container } = render(<Actions actions={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('handles actions with no icon gracefully', () => {
      const actions: Action[] = [
        {
          id: 'no-icon',
          label: 'No Icon Action',
          icon: null,
          onClick: jest.fn(),
        },
      ];

      render(<Actions actions={actions} />);
      expect(screen.getByRole('button', { name: 'No Icon Action' })).toBeInTheDocument();
    });

    it('passes through additional HTML attributes', () => {
      render(<Actions onCopy={jest.fn()} data-testid="actions-container" />);
      expect(screen.getByTestId('actions-container')).toBeInTheDocument();
    });
  });
});
