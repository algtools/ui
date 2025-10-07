import React from 'react';
import { render } from '@testing-library/react';
import { ScrollArea, ScrollBar } from '../scroll-area';

// Mock Radix scroll-area primitives to simple elements
jest.mock('@radix-ui/react-scroll-area', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Viewport: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Corner: (props: React.ComponentProps<'div'>) => <div {...props} />,
    ScrollAreaScrollbar: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    ScrollAreaThumb: (props: React.ComponentProps<'div'>) => <div {...props} />,
  };
});

describe('ScrollArea', () => {
  it('renders root, viewport, scrollbar and thumb with data-slots', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    expect(document.querySelector('[data-slot="scroll-area"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="scroll-area-viewport"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="scroll-area-scrollbar"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="scroll-area-thumb"]')).not.toBeNull();
  });

  it('supports horizontal orientation on ScrollBar', () => {
    render(<ScrollBar orientation="horizontal" />);
    const bar = document.querySelector('[data-slot="scroll-area-scrollbar"]');
    expect(bar).not.toBeNull();
  });
});
