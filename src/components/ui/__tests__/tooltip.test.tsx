import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render } from '@testing-library/react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

// Mock Radix Tooltip primitives to simplify rendering and assertions
vi.mock('@radix-ui/react-tooltip', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Provider: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Portal: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Arrow: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
  };
});

describe('Tooltip', () => {
  it('renders provider, root, trigger, and content with data-slots', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>
    );

    expect(document.querySelector('[data-slot="tooltip-provider"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="tooltip"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="tooltip-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeNull();
  });

  it('merges className onto content and includes arrow element', () => {
    render(
      <Tooltip>
        <TooltipContent className="extra-class">Tip</TooltipContent>
      </Tooltip>
    );

    const content = document.querySelector('[data-slot="tooltip-content"]') as HTMLElement | null;
    expect(content).not.toBeNull();
    expect(content!).toHaveClass('rounded-md');
    expect(content!).toHaveClass('px-3');
    expect(content!).toHaveClass('py-1.5');
    expect(content!).toHaveClass('extra-class');

    // Arrow should be rendered inside content with base classes
    const arrow = content!.querySelector('.bg-primary.fill-primary');
    expect(arrow).not.toBeNull();
  });
});
