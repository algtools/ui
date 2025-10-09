import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tool } from '../tool';
import { type Tool as ToolType } from '../ai-types';

describe('Tool', () => {
  const mockTool: ToolType = {
    name: 'test_function',
    description: 'A test function',
    status: 'pending',
  };

  it('renders tool with name', () => {
    render(<Tool tool={mockTool} />);
    expect(screen.getByText('test_function')).toBeInTheDocument();
  });

  it('renders tool with description', () => {
    render(<Tool tool={mockTool} />);
    expect(screen.getByText('A test function')).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const toolWithoutDesc: ToolType = {
      name: 'test_function',
      status: 'pending',
    };
    render(<Tool tool={toolWithoutDesc} />);
    expect(screen.getByText('test_function')).toBeInTheDocument();
    expect(screen.queryByText('A test function')).not.toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<Tool tool={mockTool} />);
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('renders with article role by default', () => {
    render(<Tool tool={mockTool} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('applies correct classes for pending status', () => {
    render(<Tool tool={mockTool} />);
    const toolElement = screen.getByLabelText(/tool: test_function, status: pending/i);
    expect(toolElement).toHaveClass('border-border', 'bg-muted/30');
  });

  it('applies correct classes for in-progress status', () => {
    const tool: ToolType = { ...mockTool, status: 'in-progress' };
    render(<Tool tool={tool} />);
    const toolElement = screen.getByLabelText(/status: in-progress/i);
    expect(toolElement).toHaveClass('border-blue-200', 'bg-blue-50');
  });

  it('applies correct classes for complete status', () => {
    const tool: ToolType = { ...mockTool, status: 'complete' };
    render(<Tool tool={tool} />);
    const toolElement = screen.getByLabelText(/status: complete/i);
    expect(toolElement).toHaveClass('border-green-200', 'bg-green-50');
  });

  it('applies correct classes for failed status', () => {
    const tool: ToolType = { ...mockTool, status: 'failed' };
    render(<Tool tool={tool} />);
    const toolElement = screen.getByLabelText(/status: failed/i);
    expect(toolElement).toHaveClass('border-red-200', 'bg-red-50');
  });

  it('applies correct classes for cancelled status', () => {
    const tool: ToolType = { ...mockTool, status: 'cancelled' };
    render(<Tool tool={tool} />);
    const toolElement = screen.getByLabelText(/status: cancelled/i);
    expect(toolElement).toHaveClass('opacity-60');
  });

  describe('Parameters', () => {
    it('shows parameters section when parameters exist', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test', limit: 10 },
      };
      render(<Tool tool={tool} />);
      expect(screen.getByText('Parameters')).toBeInTheDocument();
    });

    it('does not show parameters section when parameters are empty', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: {},
      };
      render(<Tool tool={tool} />);
      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
    });

    it('does not show parameters section when showParameters is false', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test' },
      };
      render(<Tool tool={tool} showParameters={false} />);
      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
    });

    it('displays parameter count', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test', limit: 10, offset: 0 },
      };
      render(<Tool tool={tool} />);
      expect(screen.getByText('(3)')).toBeInTheDocument();
    });

    it('formats parameters as JSON', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test', limit: 10 },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      const pre = screen.getByText(/"query": "test"/);
      expect(pre).toBeInTheDocument();
    });

    it('expands parameters when defaultParametersExpanded is true', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test' },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      expect(screen.getByText(/"query": "test"/)).toBeVisible();
    });

    it('toggles parameters section when clicked', async () => {
      const user = userEvent.setup();
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: 'test' },
      };
      render(<Tool tool={tool} />);

      const trigger = screen.getByRole('button', { name: /parameters/i });
      await user.click(trigger);

      expect(screen.getByText(/"query": "test"/)).toBeVisible();
    });

    it('handles complex nested parameters', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: {
          filters: { status: 'active', tags: ['test', 'dev'] },
          pagination: { page: 1, limit: 20 },
        },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      expect(screen.getByText(/filters/)).toBeInTheDocument();
    });
  });

  describe('Result', () => {
    it('shows result section when result exists and status is complete', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: { data: 'success' },
      };
      render(<Tool tool={tool} />);
      expect(screen.getByText('Result')).toBeInTheDocument();
    });

    it('does not show result section when result is undefined', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
      };
      render(<Tool tool={tool} />);
      expect(screen.queryByText('Result')).not.toBeInTheDocument();
    });

    it('does not show result section when result is null', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: null,
      };
      render(<Tool tool={tool} />);
      expect(screen.queryByText('Result')).not.toBeInTheDocument();
    });

    it('does not show result section when showResult is false', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: { data: 'success' },
      };
      render(<Tool tool={tool} showResult={false} />);
      expect(screen.queryByText('Result')).not.toBeInTheDocument();
    });

    it('does not show result section when status is in-progress', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'in-progress',
        result: { partial: 'data' },
      };
      render(<Tool tool={tool} />);
      expect(screen.queryByText('Result')).not.toBeInTheDocument();
    });

    it('shows "Executing..." for in-progress status without result', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'in-progress',
      };
      render(<Tool tool={tool} />);
      expect(screen.getByText('Executing...')).toBeInTheDocument();
    });

    it('does not show "Executing..." for in-progress status with result', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'in-progress',
        result: { partial: 'data' },
      };
      render(<Tool tool={tool} />);
      expect(screen.queryByText('Executing...')).not.toBeInTheDocument();
    });

    it('shows "Error" label for failed status', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'failed',
        result: 'Connection timeout',
      };
      render(<Tool tool={tool} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('formats result as JSON for objects', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: { count: 42, items: ['a', 'b'] },
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText(/"count": 42/)).toBeInTheDocument();
    });

    it('formats string result as plain text', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: 'Simple text result',
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText('Simple text result')).toBeInTheDocument();
    });

    it('formats number result as string', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: 42,
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('formats boolean result as string', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: true,
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText('true')).toBeInTheDocument();
    });

    it('expands result when defaultResultExpanded is true', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: { data: 'test' },
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText(/"data": "test"/)).toBeVisible();
    });

    it('toggles result section when clicked', async () => {
      const user = userEvent.setup();
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: { data: 'test' },
      };
      render(<Tool tool={tool} defaultResultExpanded={false} />);

      const trigger = screen.getByRole('button', { name: /result/i });
      await user.click(trigger);

      expect(screen.getByText(/"data": "test"/)).toBeVisible();
    });

    it('applies error styling for failed status result', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'failed',
        result: 'Error message',
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      const errorDiv = screen.getByText('Error message').parentElement;
      expect(errorDiv).toHaveClass('bg-red-50');
    });
  });

  describe('Interaction', () => {
    it('calls onClick handler when tool is clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);

      await user.click(screen.getByLabelText(/tool: test_function/i));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Enter) when onClick is provided', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);

      const toolElement = screen.getByLabelText(/tool: test_function/i);
      toolElement.focus();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Space) when onClick is provided', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);

      const toolElement = screen.getByLabelText(/tool: test_function/i);
      toolElement.focus();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is not clickable when onClick is not provided', () => {
      render(<Tool tool={mockTool} />);
      const toolElement = screen.getByLabelText(/tool: test_function/i);
      expect(toolElement).toHaveAttribute('role', 'article');
      expect(toolElement).not.toHaveClass('cursor-pointer');
    });

    it('has button role when onClick is provided', () => {
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Status override', () => {
    it('uses status prop over tool.status', () => {
      const tool: ToolType = { ...mockTool, status: 'pending' };
      render(<Tool tool={tool} status="complete" />);
      expect(screen.getByText('complete')).toBeInTheDocument();
    });

    it('defaults to pending when no status is provided', () => {
      const tool: ToolType = { name: 'test_function' };
      render(<Tool tool={tool} />);
      expect(screen.getByText('pending')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('merges custom className', () => {
      render(<Tool tool={mockTool} className="custom-class" />);
      expect(screen.getByLabelText(/tool: test_function/i)).toHaveClass('custom-class');
    });

    it('applies hover styles when clickable', () => {
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);
      expect(screen.getByLabelText(/tool: test_function/i)).toHaveClass('hover:shadow-sm');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label', () => {
      render(<Tool tool={mockTool} />);
      expect(screen.getByLabelText('Tool: test_function, Status: pending')).toBeInTheDocument();
    });

    it('has tabIndex when clickable', () => {
      const onClick = jest.fn();
      render(<Tool tool={mockTool} onClick={onClick} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('does not have tabIndex when not clickable', () => {
      render(<Tool tool={mockTool} />);
      const toolElement = screen.getByRole('article');
      expect(toolElement).not.toHaveAttribute('tabindex');
    });
  });

  describe('Edge cases', () => {
    it('handles empty string parameters', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { query: '' },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      expect(screen.getByText(/"query": ""/)).toBeInTheDocument();
    });

    it('handles zero as parameter value', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { count: 0 },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      expect(screen.getByText(/"count": 0/)).toBeInTheDocument();
    });

    it('handles false as parameter value', () => {
      const tool: ToolType = {
        ...mockTool,
        parameters: { enabled: false },
      };
      render(<Tool tool={tool} defaultParametersExpanded />);
      expect(screen.getByText(/"enabled": false/)).toBeInTheDocument();
    });

    it('handles very long tool names', () => {
      const tool: ToolType = {
        ...mockTool,
        name: 'very_long_function_name_that_should_wrap_properly_in_the_ui',
      };
      render(<Tool tool={tool} />);
      expect(
        screen.getByText('very_long_function_name_that_should_wrap_properly_in_the_ui')
      ).toBeInTheDocument();
    });

    it('handles empty result value of 0', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: 0,
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles empty string result', () => {
      const tool: ToolType = {
        ...mockTool,
        status: 'complete',
        result: '',
      };
      render(<Tool tool={tool} defaultResultExpanded />);
      // Empty string should still render the Result section
      expect(screen.getByText('Result')).toBeInTheDocument();
    });
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Tool tool={mockTool} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
