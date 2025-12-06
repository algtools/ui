import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock root package.json import used by the page component
vi.mock('../../../package.json', () => ({
  default: { version: '0.0.0-test' },
  version: '0.0.0-test',
}));

// Mock UI components used
vi.mock('@/components/ui/logo', () => ({
  Logo: () => <div data-testid="logo" />,
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: React.PropsWithChildren) => <span data-testid="badge">{children}</span>,
}));

import Home from '../page';

describe('Home page', () => {
  it('renders logo, title and version badge', () => {
    render(<Home />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Algenium UI')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveTextContent('v0.0.0-test');
  });
});
