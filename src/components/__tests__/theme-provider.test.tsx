import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next-themes provider to validate props passthrough
vi.mock('next-themes', () => {
  const MockNextThemesProvider = ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="next-themes" data-props={JSON.stringify(props)}>
      {children}
    </div>
  );
  return {
    ThemeProvider: MockNextThemesProvider,
  };
});

import { ThemeProvider } from '../theme-provider';

describe('ThemeProvider (wrapper)', () => {
  it('renders children and passes props to next-themes provider', () => {
    // Render with extra props to ensure they are forwarded
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div data-testid="child">Child</div>
      </ThemeProvider>
    );

    // Child should be rendered and props are forwarded
    expect(screen.getByTestId('child')).toBeInTheDocument();
    const provider = screen.getByTestId('next-themes');
    const forwarded = JSON.parse(provider.getAttribute('data-props') || '{}');
    expect(forwarded.attribute).toBe('class');
    expect(forwarded.defaultTheme).toBe('system');
    expect(forwarded.enableSystem).toBe(true);
  });
});
