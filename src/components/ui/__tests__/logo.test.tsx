import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '../logo';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  __esModule: true,
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as unknown as jest.Mock;

describe('Logo', () => {
  beforeEach(() => {
    mockedUseTheme.mockReturnValue({ resolvedTheme: 'light' });
  });

  it('renders the default logo variant with outer and inner class names', () => {
    render(<Logo className="wrapper" imgClassName="inner" />);

    const wrapper = document.querySelector('div.wrapper');
    const svg = document.querySelector('svg[viewBox="0 0 102 16"]');

    expect(wrapper).not.toBeNull();
    expect(svg).not.toBeNull();
    expect(svg!).toHaveClass('inner');
  });

  it('renders the icon variant with provided width/height and dark theme colors', () => {
    mockedUseTheme.mockReturnValue({ resolvedTheme: 'dark' });
    render(<Logo variant="icon" width={250} height={250} imgClassName="icon-svg" />);

    const svg = document.querySelector('svg[viewBox="0 0 200 200"]') as SVGElement | null;
    expect(svg).not.toBeNull();
    expect(svg!).toHaveClass('icon-svg');
    expect(svg!.getAttribute('width')).toBe('250');
    expect(svg!.getAttribute('height')).toBe('250');

    // Dark theme background fill for IconPath
    const darkRect = document.querySelector('svg[viewBox="0 0 200 200"] rect[fill="#1E2938"]');
    expect(darkRect).not.toBeNull();
  });

  it('applies dark theme colors on the logo variant', () => {
    mockedUseTheme.mockReturnValue({ resolvedTheme: 'dark' });
    render(<Logo variant="logo" />);

    // In dark theme, one of the logo paths uses color1 = #FFFFFF
    const darkPath = document.querySelector('svg[viewBox="0 0 102 16"] path[fill="#FFFFFF"]');
    expect(darkPath).not.toBeNull();
  });
});
