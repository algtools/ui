import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../hover-card';

// Mock Radix HoverCard primitives to simplify rendering
vi.mock('@radix-ui/react-hover-card', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
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
  };
});

describe('HoverCard', () => {
  it('renders root, trigger, portal, and content with data-slots', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>
    );

    expect(document.querySelector('[data-slot="hover-card"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="hover-card-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="hover-card-portal"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="hover-card-content"]')).not.toBeNull();
  });

  it('merges className onto content and preserves base classes', () => {
    render(
      <HoverCard>
        <HoverCardContent className="extra-class">Content</HoverCardContent>
      </HoverCard>
    );

    const content = document.querySelector(
      '[data-slot="hover-card-content"]'
    ) as HTMLElement | null;
    expect(content).not.toBeNull();
    expect(content!).toHaveClass('bg-popover');
    expect(content!).toHaveClass('rounded-md');
    expect(content!).toHaveClass('p-4');
    expect(content!).toHaveClass('extra-class');
  });
});
