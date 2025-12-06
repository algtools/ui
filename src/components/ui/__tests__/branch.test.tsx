import React from 'react';
import { vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Branch, BranchList, BranchTrigger, BranchContent, BranchIndicator } from '../branch';
import type { Branch as BranchType } from '../../ai/ai-types';

// Mock Radix Tabs primitives to simplify rendering
vi.mock('@radix-ui/react-tabs', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({
      children,
      onValueChange,
      defaultValue,
      value,
      ...props
    }: React.ComponentProps<'div'> & {
      onValueChange?: (v: string) => void;
      defaultValue?: string;
      value?: string;
    }) => {
      const [internalValue, setInternalValue] = React.useState(value || defaultValue);
      const currentValue = value !== undefined ? value : internalValue;

      const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const button = target.closest('button');
        if (button?.getAttribute('data-value')) {
          const newValue = button.getAttribute('data-value')!;
          setInternalValue(newValue);
          onValueChange?.(newValue);
        }
      };

      return (
        <div {...props} onClick={handleClick} data-current-value={currentValue}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                'data-active-value': currentValue,
              } as React.ComponentProps<'div'>);
            }
            return child;
          })}
        </div>
      );
    },
    List: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Trigger: ({
      children,
      value,
      ...props
    }: React.ComponentProps<'button'> & { value: string }) => {
      const activeValue = (props as React.ComponentProps<'button'>)['data-active-value'];
      const isActive = activeValue === value;
      return (
        <button {...props} data-value={value} data-state={isActive ? 'active' : 'inactive'}>
          {children}
        </button>
      );
    },
    Content: ({ children, value, ...props }: React.ComponentProps<'div'> & { value: string }) => {
      const activeValue = (props as React.ComponentProps<'div'>)['data-active-value'];
      const isActive = activeValue === value;
      return (
        <div {...props} data-state={isActive ? 'active' : 'inactive'}>
          {isActive ? children : null}
        </div>
      );
    },
  };
});

describe('Branch', () => {
  const mockBranches: BranchType[] = [
    { id: '1', title: 'Branch A', content: 'Content for branch A' },
    { id: '2', title: 'Branch B', content: 'Content for branch B' },
    { id: '3', content: 'Content for branch C' },
  ];

  describe('Branch Component', () => {
    it('renders with data-slot attribute', () => {
      render(<Branch branches={mockBranches} />);
      const branch = document.querySelector('[data-slot="branch"]');
      expect(branch).toBeInTheDocument();
    });

    it('renders all branch triggers', () => {
      render(<Branch branches={mockBranches} />);
      expect(screen.getByText('Branch A')).toBeInTheDocument();
      expect(screen.getByText('Branch B')).toBeInTheDocument();
      expect(screen.getByText('Branch 3')).toBeInTheDocument(); // No title, uses default
    });

    it('renders branch content', () => {
      render(<Branch branches={mockBranches} />);
      expect(screen.getByText('Content for branch A')).toBeInTheDocument();
    });

    it('defaults to first branch when no defaultValue provided', () => {
      render(<Branch branches={mockBranches} />);
      expect(screen.getByText('Content for branch A')).toBeInTheDocument();
    });

    it('uses provided defaultValue', () => {
      render(<Branch branches={mockBranches} defaultValue="2" />);
      expect(screen.getByText('Content for branch B')).toBeInTheDocument();
    });

    it('returns null when branches array is empty', () => {
      const { container } = render(<Branch branches={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('calls onBranchChange when branch is selected', () => {
      const onBranchChange = vi.fn();
      render(<Branch branches={mockBranches} onBranchChange={onBranchChange} />);

      const trigger = screen.getByText('Branch B');
      fireEvent.click(trigger);

      expect(onBranchChange).toHaveBeenCalledWith('2');
    });

    it('merges className prop', () => {
      render(<Branch branches={mockBranches} className="custom-class" />);
      const branch = document.querySelector('[data-slot="branch"]');
      expect(branch).toHaveClass('custom-class');
    });

    it('shows branch indicators by default', () => {
      render(<Branch branches={mockBranches} />);
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('hides branch indicators when showIndicators is false', () => {
      render(<Branch branches={mockBranches} showIndicators={false} />);
      const triggers = document.querySelectorAll('[data-slot="branch-trigger"]');
      triggers.forEach((trigger) => {
        expect(trigger.querySelector('svg')).toBeNull();
      });
    });

    it('uses custom renderLabel when provided', () => {
      const renderLabel = (branch: BranchType, index: number) => (
        <span>
          Custom {index}: {branch.title}
        </span>
      );
      render(<Branch branches={mockBranches} renderLabel={renderLabel} />);
      expect(screen.getByText('Custom 0: Branch A')).toBeInTheDocument();
    });

    it('uses custom renderContent when provided', () => {
      const renderContent = (content: string) => <div>Custom: {content}</div>;
      render(<Branch branches={mockBranches} renderContent={renderContent} />);
      expect(screen.getByText('Custom: Content for branch A')).toBeInTheDocument();
    });

    it('supports controlled mode with value prop', () => {
      const { rerender } = render(<Branch branches={mockBranches} value="1" />);
      expect(screen.getByText('Content for branch A')).toBeInTheDocument();

      rerender(<Branch branches={mockBranches} value="2" />);
      expect(screen.getByText('Content for branch B')).toBeInTheDocument();
    });

    it('calls onValueChange when provided', () => {
      const onValueChange = vi.fn();
      render(<Branch branches={mockBranches} onValueChange={onValueChange} />);

      const trigger = screen.getByText('Branch B');
      fireEvent.click(trigger);

      expect(onValueChange).toHaveBeenCalledWith('2');
    });
  });

  describe('BranchList Component', () => {
    it('renders with data-slot attribute', () => {
      render(<BranchList />);
      const list = document.querySelector('[data-slot="branch-list"]');
      expect(list).toBeInTheDocument();
    });

    it('applies default styles', () => {
      render(<BranchList />);
      const list = document.querySelector('[data-slot="branch-list"]');
      expect(list).toHaveClass('inline-flex');
      expect(list).toHaveClass('rounded-lg');
    });

    it('merges className prop', () => {
      render(<BranchList className="custom-list" />);
      const list = document.querySelector('[data-slot="branch-list"]');
      expect(list).toHaveClass('custom-list');
    });

    it('renders children', () => {
      render(
        <BranchList>
          <div>Test Child</div>
        </BranchList>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('BranchTrigger Component', () => {
    it('renders with data-slot attribute', () => {
      render(<BranchTrigger value="test">Trigger</BranchTrigger>);
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger).toBeInTheDocument();
    });

    it('applies default styles', () => {
      render(<BranchTrigger value="test">Trigger</BranchTrigger>);
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger).toHaveClass('inline-flex');
      expect(trigger).toHaveClass('rounded-md');
    });

    it('shows indicator by default', () => {
      render(<BranchTrigger value="test">Trigger</BranchTrigger>);
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger?.querySelector('svg')).toBeInTheDocument();
    });

    it('hides indicator when showIndicator is false', () => {
      render(
        <BranchTrigger value="test" showIndicator={false}>
          Trigger
        </BranchTrigger>
      );
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger?.querySelector('svg')).toBeNull();
    });

    it('merges className prop', () => {
      render(
        <BranchTrigger value="test" className="custom-trigger">
          Trigger
        </BranchTrigger>
      );
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('renders children', () => {
      render(<BranchTrigger value="test">Test Text</BranchTrigger>);
      expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('handles disabled state', () => {
      render(
        <BranchTrigger value="test" disabled>
          Trigger
        </BranchTrigger>
      );
      const trigger = document.querySelector('[data-slot="branch-trigger"]');
      expect(trigger).toHaveClass('disabled:pointer-events-none');
      expect(trigger).toHaveClass('disabled:opacity-50');
    });
  });

  describe('BranchContent Component', () => {
    it('renders with data-slot attribute', () => {
      const { container } = render(<BranchContent value="test">Content</BranchContent>);
      const content = container.querySelector('[data-slot="branch-content"]');
      expect(content).toBeInTheDocument();
    });

    it('applies default styles', () => {
      const { container } = render(<BranchContent value="test">Content</BranchContent>);
      const content = container.querySelector('[data-slot="branch-content"]');
      expect(content).toHaveClass('rounded-lg');
      expect(content).toHaveClass('border');
      expect(content).toHaveClass('bg-card');
    });

    it('merges className prop', () => {
      const { container } = render(
        <BranchContent value="test" className="custom-content">
          Content
        </BranchContent>
      );
      const content = container.querySelector('[data-slot="branch-content"]');
      expect(content).toHaveClass('custom-content');
    });

    it('renders children when active', () => {
      const { container } = render(
        <BranchContent value="test" data-active-value="test">
          Test Content
        </BranchContent>
      );
      const content = container.querySelector('[data-slot="branch-content"]');
      expect(content).toHaveTextContent('Test Content');
    });
  });

  describe('BranchIndicator Component', () => {
    it('renders with data-slot attribute', () => {
      render(<BranchIndicator />);
      const indicator = document.querySelector('[data-slot="branch-indicator"]');
      expect(indicator).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(<BranchIndicator />);
      const indicator = document.querySelector('[data-slot="branch-indicator"]');
      expect(indicator?.querySelector('svg')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<BranchIndicator label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('applies active styles when active is true', () => {
      render(<BranchIndicator active />);
      const indicator = document.querySelector('[data-slot="branch-indicator"]');
      expect(indicator).toHaveClass('text-foreground');
    });

    it('applies inactive styles when active is false', () => {
      render(<BranchIndicator active={false} />);
      const indicator = document.querySelector('[data-slot="branch-indicator"]');
      expect(indicator).toHaveClass('text-muted-foreground');
    });

    it('merges className prop', () => {
      render(<BranchIndicator className="custom-indicator" />);
      const indicator = document.querySelector('[data-slot="branch-indicator"]');
      expect(indicator).toHaveClass('custom-indicator');
    });
  });

  describe('Accessibility', () => {
    it('has proper keyboard navigation support through focus-visible classes', () => {
      render(<Branch branches={mockBranches} />);
      const triggers = document.querySelectorAll('[data-slot="branch-trigger"]');
      triggers.forEach((trigger) => {
        expect(trigger).toHaveClass('focus-visible:outline-none');
        expect(trigger).toHaveClass('focus-visible:ring-2');
      });
    });

    it('marks icons as aria-hidden', () => {
      render(<Branch branches={mockBranches} />);
      const icons = document.querySelectorAll('svg');
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('branch content has keyboard focus support', () => {
      const { container } = render(<Branch branches={mockBranches} />);
      const content = container.querySelector('[data-slot="branch-content"]');
      expect(content).toHaveClass('focus-visible:outline-none');
      expect(content).toHaveClass('focus-visible:ring-2');
    });
  });
});
