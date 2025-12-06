import React from 'react';
import { vi, Mock } from 'vitest';
import { render } from '@testing-library/react';
import { Toaster } from '../sonner';

// Mock next-themes and sonner primitives
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

vi.mock('sonner', () => ({
  // The component under test imports: `Toaster as Sonner`
  Toaster: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-slot="sonner-toaster" {...props}>
      {children}
    </div>
  ),
}));

import { useTheme } from 'next-themes';

describe('Toaster (sonner)', () => {
  it('forwards theme from next-themes and merges className and styles', () => {
    vi.mocked(useTheme).mockReturnValue({ theme: 'dark' } as any);

    const { container } = render(<Toaster position="top-right" />);
    const el = container.querySelector('[data-slot="sonner-toaster"]') as HTMLElement | null;
    expect(el).not.toBeNull();

    // theme prop forwarded to the mocked DOM node
    expect(el!).toHaveAttribute('theme', 'dark');

    // className merged
    expect(el!).toHaveClass('toaster');
    expect(el!).toHaveClass('group');

    // inline style contains CSS variables
    const styleAttr = el!.getAttribute('style') || '';
    expect(styleAttr).toContain('--normal-bg');
    expect(styleAttr).toContain('--normal-text');
    expect(styleAttr).toContain('--normal-border');

    // passes through additional props
    expect(el!).toHaveAttribute('position', 'top-right');
  });

  it('defaults to system theme when theme is undefined', () => {
    vi.mocked(useTheme).mockReturnValue({} as any);

    const { container } = render(<Toaster />);
    const el = container.querySelector('[data-slot="sonner-toaster"]') as HTMLElement | null;
    expect(el).not.toBeNull();
    expect(el!).toHaveAttribute('theme', 'system');
  });
});
