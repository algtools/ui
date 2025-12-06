import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock next/font/google to provide stable class names for fonts used by layout
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'geist-sans-var' }),
  JetBrains_Mono: () => ({ variable: 'geist-mono-var' }),
}));

// Mock ThemeProvider to render children directly and make it discoverable
vi.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: React.PropsWithChildren) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock ThemeSwitcher to a simple marker
vi.mock('@/components/ui/theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders html/body with expected attributes, wraps children with ThemeProvider and includes ThemeSwitcher', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    // html element should exist with the configured lang
    expect(html).toContain('<html lang="es">');

    // body should include the font variables and antialiased class
    expect(html).toContain('class="geist-sans-var geist-mono-var antialiased"');

    // ThemeProvider wraps children and ThemeSwitcher is present
    expect(html).toContain('data-testid="theme-provider"');
    expect(html).toContain('Content');
    expect(html).toContain('data-testid="theme-switcher"');
  });
});
