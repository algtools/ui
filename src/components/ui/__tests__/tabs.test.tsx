import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

// Mock Radix Tabs primitives to simplify rendering
vi.mock('@radix-ui/react-tabs', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    List: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('Tabs', () => {
  it('renders tabs root with data-slot and merges className', () => {
    render(<Tabs className="extra-root" />);

    const root = document.querySelector('[data-slot="tabs"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root!).toHaveClass('flex');
    expect(root!).toHaveClass('flex-col');
    expect(root!).toHaveClass('gap-2');
    expect(root!).toHaveClass('extra-root');
  });

  it('renders tabs list with data-slot and merges className', () => {
    render(
      <Tabs>
        <TabsList className="lst-x" />
      </Tabs>
    );

    const list = document.querySelector('[data-slot="tabs-list"]') as HTMLElement | null;
    expect(list).not.toBeNull();
    expect(list!).toHaveClass('inline-flex');
    expect(list!).toHaveClass('rounded-lg');
    expect(list!).toHaveClass('lst-x');
  });

  it('renders tabs trigger with data-slot and merges className', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger className="trg-x">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );

    const trigger = document.querySelector('[data-slot="tabs-trigger"]') as HTMLElement | null;
    expect(trigger).not.toBeNull();
    expect(trigger!).toHaveClass('inline-flex');
    expect(trigger!).toHaveClass('font-medium');
    expect(trigger!).toHaveClass('trg-x');
  });

  it('renders tabs content with data-slot and merges className', () => {
    render(
      <Tabs>
        <TabsContent className="cnt-x">Content</TabsContent>
      </Tabs>
    );

    const content = document.querySelector('[data-slot="tabs-content"]') as HTMLElement | null;
    expect(content).not.toBeNull();
    expect(content!).toHaveClass('flex-1');
    expect(content!).toHaveClass('outline-none');
    expect(content!).toHaveClass('cnt-x');
  });
});
