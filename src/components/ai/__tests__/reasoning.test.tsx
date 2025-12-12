import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Reasoning, ReasoningProps } from '../reasoning';
import type { ReasoningStep } from '../ai-types';

// Mock Radix primitives to render simple elements during tests
vi.mock('@radix-ui/react-collapsible', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');

  const MockRoot = React.forwardRef(
    (
      {
        children,
        open,
        defaultOpen,
        onOpenChange,
        ...props
      }: React.ComponentPropsWithoutRef<'div'> & {
        open?: boolean;
        defaultOpen?: boolean;
        onOpenChange?: (open: boolean) => void;
      },
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      const [isOpen, setIsOpen] = React.useState(open ?? defaultOpen ?? false);
      const currentOpen = open !== undefined ? open : isOpen;
      const divRef = React.useRef(null as HTMLDivElement | null);

      React.useImperativeHandle(ref, () => divRef.current as HTMLDivElement);

      React.useEffect(() => {
        if (open !== undefined) {
          setIsOpen(open);
        }
      }, [open]);

      React.useEffect(() => {
        const element = divRef.current;
        if (!element) return;

        const handleCollapsibleChange = (e: Event) => {
          const customEvent = e as CustomEvent<{ open: boolean }>;
          const newOpen = customEvent.detail.open;

          if (open === undefined) {
            setIsOpen(newOpen);
          }
          onOpenChange?.(newOpen);
        };

        element.addEventListener('collapsible-change', handleCollapsibleChange);
        return () => element.removeEventListener('collapsible-change', handleCollapsibleChange);
      }, [open, onOpenChange]);

      return (
        <div ref={divRef} data-state={currentOpen ? 'open' : 'closed'} {...props}>
          {children}
        </div>
      );
    }
  );
  MockRoot.displayName = 'MockRoot';

  const MockTrigger = React.forwardRef(
    (
      { children, onClick, ...props }: React.ComponentPropsWithoutRef<'button'>,
      ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = e.currentTarget.parentElement;
        if (parent) {
          const isOpen = parent.getAttribute('data-state') === 'open';
          parent.setAttribute('data-state', isOpen ? 'closed' : 'open');

          // Trigger re-render by dispatching a custom event
          const event = new CustomEvent('collapsible-change', { detail: { open: !isOpen } });
          parent.dispatchEvent(event);
        }
        onClick?.(e);
      };

      return (
        <button ref={ref} onClick={handleClick} {...props}>
          {children}
        </button>
      );
    }
  );
  MockTrigger.displayName = 'MockTrigger';

  const MockContent = React.forwardRef(
    (
      { children, ...props }: React.ComponentPropsWithoutRef<'div'>,
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      const [parent, setParent] = React.useState(null as HTMLElement | null);
      const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);
      const divRef = React.useRef(null as HTMLDivElement | null);

      React.useImperativeHandle(ref, () => divRef.current as HTMLDivElement);

      React.useEffect(() => {
        if (divRef.current) {
          setParent(divRef.current.parentElement);
        }
      }, []);

      React.useEffect(() => {
        if (!parent) return;

        const handleCollapsibleChange = () => {
          forceUpdate();
        };

        parent.addEventListener('collapsible-change', handleCollapsibleChange);
        return () => parent.removeEventListener('collapsible-change', handleCollapsibleChange);
      }, [parent]);

      const isOpen = parent?.getAttribute('data-state') === 'open';

      return (
        <div ref={divRef} data-state={isOpen ? 'open' : 'closed'} {...props}>
          {children}
        </div>
      );
    }
  );
  MockContent.displayName = 'MockContent';

  return {
    __esModule: true,
    Root: MockRoot,
    CollapsibleTrigger: MockTrigger,
    CollapsibleContent: MockContent,
  };
});

const mockSteps: ReasoningStep[] = [
  {
    id: '1',
    title: 'Analysis',
    content: 'Analyzing the problem and understanding requirements.',
    order: 1,
  },
  {
    id: '2',
    title: 'Planning',
    content: 'Creating a plan to solve the problem.',
    order: 2,
  },
  {
    id: '3',
    title: 'Execution',
    content: 'Implementing the solution.',
    order: 3,
  },
];

describe('Reasoning', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Reasoning steps={mockSteps} />);
      expect(screen.getByText('Reasoning')).toBeInTheDocument();
      expect(screen.getByText('3 steps')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(<Reasoning steps={mockSteps} title="AI Thinking Process" />);
      expect(screen.getByText('AI Thinking Process')).toBeInTheDocument();
    });

    it('renders all reasoning steps', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      expect(screen.getByText('Analysis')).toBeInTheDocument();
      expect(screen.getByText('Planning')).toBeInTheDocument();
      expect(screen.getByText('Execution')).toBeInTheDocument();
    });

    it('renders step content correctly', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      expect(
        screen.getByText('Analyzing the problem and understanding requirements.')
      ).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Reasoning steps={mockSteps} className="custom-class" />);
      const collapsible = container.querySelector('[data-state]');
      expect(collapsible).toHaveClass('custom-class');
    });

    it('renders with custom icon', () => {
      const CustomIcon = () => <span data-testid="custom-icon">★</span>;
      render(<Reasoning steps={mockSteps} icon={<CustomIcon />} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Step Numbering', () => {
    it('shows step numbers by default', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      expect(screen.getByLabelText('Step 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Step 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Step 3')).toBeInTheDocument();
    });

    it('hides step numbers when showStepNumbers is false', () => {
      render(<Reasoning steps={mockSteps} defaultOpen showStepNumbers={false} />);
      expect(screen.queryByLabelText('Step 1')).not.toBeInTheDocument();
    });

    it('displays correct step count', () => {
      render(<Reasoning steps={mockSteps} />);
      expect(screen.getByText('3 steps')).toBeInTheDocument();
    });

    it('displays singular "step" for single step', () => {
      const singleStep: ReasoningStep[] = [
        { id: '1', title: 'Step', content: 'Content', order: 1 },
      ];
      render(<Reasoning steps={singleStep} />);
      expect(screen.getByText('1 step')).toBeInTheDocument();
    });
  });

  describe('Collapsible Behavior', () => {
    it('starts collapsed by default', () => {
      render(<Reasoning steps={mockSteps} />);
      const content = screen.getByRole('log');
      expect(content.parentElement).toHaveAttribute('data-state', 'closed');
    });

    it('starts expanded when defaultOpen is true', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      const content = screen.getByRole('log');
      expect(content.parentElement).toHaveAttribute('data-state', 'open');
    });

    it('toggles expansion when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<Reasoning steps={mockSteps} />);

      const trigger = screen.getByRole('button', { name: /Toggle Reasoning/i });
      const content = screen.getByRole('log');

      // Initially closed
      expect(content.parentElement).toHaveAttribute('data-state', 'closed');

      // Click to open
      await user.click(trigger);
      expect(content.parentElement).toHaveAttribute('data-state', 'open');

      // Click to close
      await user.click(trigger);
      expect(content.parentElement).toHaveAttribute('data-state', 'closed');
    });

    it('calls onOpenChange when toggled', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<Reasoning steps={mockSteps} onOpenChange={onOpenChange} />);

      const trigger = screen.getByRole('button', { name: /Toggle Reasoning/i });
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      const { container } = render(<Reasoning steps={mockSteps} variant="default" />);
      const collapsible = container.querySelector('[data-state]');
      expect(collapsible).not.toHaveClass('bg-transparent');
    });

    it('renders compact variant correctly', () => {
      const { container } = render(<Reasoning steps={mockSteps} variant="compact" />);
      const collapsible = container.querySelector('[data-state]');
      expect(collapsible).toHaveClass('bg-transparent');
    });
  });

  describe('Step Ordering', () => {
    it('sorts steps by order property', () => {
      const unorderedSteps: ReasoningStep[] = [
        { id: '3', title: 'Third', content: 'Content 3', order: 3 },
        { id: '1', title: 'First', content: 'Content 1', order: 1 },
        { id: '2', title: 'Second', content: 'Content 2', order: 2 },
      ];

      render(<Reasoning steps={unorderedSteps} defaultOpen />);

      const stepTitles = screen.getAllByRole('heading', { level: 4 });
      expect(stepTitles[0]).toHaveTextContent('First');
      expect(stepTitles[1]).toHaveTextContent('Second');
      expect(stepTitles[2]).toHaveTextContent('Third');
    });

    it('handles steps without order property', () => {
      const stepsWithoutOrder: ReasoningStep[] = [
        { id: '1', title: 'Step 1', content: 'Content 1' },
        { id: '2', title: 'Step 2', content: 'Content 2' },
      ];

      render(<Reasoning steps={stepsWithoutOrder} defaultOpen />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('shows message when no steps are provided', () => {
      render(<Reasoning steps={[]} defaultOpen />);
      expect(screen.getByText('No reasoning steps available')).toBeInTheDocument();
    });

    it('does not show step count when steps array is empty', () => {
      render(<Reasoning steps={[]} />);
      expect(screen.queryByText(/steps?$/)).not.toBeInTheDocument();
    });
  });

  describe('Step Display', () => {
    it('renders steps without titles', () => {
      const stepsWithoutTitles: ReasoningStep[] = [
        { id: '1', title: '', content: 'Just content without title', order: 1 },
      ];

      render(<Reasoning steps={stepsWithoutTitles} defaultOpen />);
      expect(screen.getByText('Just content without title')).toBeInTheDocument();
    });

    it('handles long step content', () => {
      const longContent = 'A'.repeat(500);
      const stepsWithLongContent: ReasoningStep[] = [
        { id: '1', title: 'Long Content', content: longContent, order: 1 },
      ];

      render(<Reasoning steps={stepsWithLongContent} defaultOpen />);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Reasoning steps={mockSteps} title="Custom Reasoning" />);
      expect(screen.getByRole('button', { name: 'Toggle Custom Reasoning' })).toBeInTheDocument();
    });

    it('has role="log" on content area', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      expect(screen.getByRole('log')).toBeInTheDocument();
    });

    it('has aria-label on reasoning steps container', () => {
      render(<Reasoning steps={mockSteps} defaultOpen />);
      expect(screen.getByLabelText('Reasoning steps')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Reasoning steps={mockSteps} />);

      const trigger = screen.getByRole('button', { name: /Toggle Reasoning/i });
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.keyboard('{Enter}');
      // Button should still be focusable after interaction
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const { container, rerender } = render(<Reasoning steps={mockSteps} open={false} />);
      let root = container.querySelector('[data-state]');

      expect(root).toHaveAttribute('data-state', 'closed');

      rerender(<Reasoning steps={mockSteps} open={true} />);

      // Wait for the state to update
      await screen.findByRole('log');

      // Query the root again after rerender
      root = container.querySelector('[data-state]');
      expect(root).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Edge Cases', () => {
    it('handles duplicate step IDs gracefully', () => {
      const stepsWithDuplicateIds: ReasoningStep[] = [
        { id: '1', title: 'First', content: 'Content 1', order: 1 },
        { id: '1', title: 'Duplicate', content: 'Content 2', order: 2 },
      ];

      render(<Reasoning steps={stepsWithDuplicateIds} defaultOpen />);
      // Both should render despite duplicate IDs
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Duplicate')).toBeInTheDocument();
    });

    it('renders with all optional props provided', () => {
      const allPropsConfig: ReasoningProps = {
        steps: mockSteps,
        defaultOpen: true,
        title: 'Full Config',
        icon: <span>🤔</span>,
        variant: 'compact',
        showStepNumbers: true,
        className: 'test-class',
        onOpenChange: vi.fn(),
      };

      render(<Reasoning {...allPropsConfig} />);
      expect(screen.getByText('Full Config')).toBeInTheDocument();
    });
  });
});
