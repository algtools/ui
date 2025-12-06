/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock motion to avoid animation internals affecting DOM
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      // Strip motion-only props that React DOM would warn about
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { layoutId, transition, ...rest } = props as Record<string, unknown>;
      return <div {...rest}>{children}</div>;
    },
  },
}));

// Mock next-themes to control current theme and capture setTheme
const setThemeMock = vi.fn();
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({ theme: 'system', setTheme: setThemeMock })),
}));

import { ThemeSwitcher, useThemeTransition } from '../theme-switcher';

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    setThemeMock.mockReset();
    // Ensure real timers by default and clear any leftover injected styles
    vi.useRealTimers();
    document.querySelectorAll('style[id^="theme-transition-"]').forEach((el) => el.remove());
  });
  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('style[id^="theme-transition-"]').forEach((el) => el.remove());
  });

  it('renders three theme buttons with correct aria-labels and merges className on container', async () => {
    render(<ThemeSwitcher className="extra-class" />);

    // Wait for hydration (component mounts after useEffect)
    const systemBtn = await screen.findByRole('button', { name: 'System theme' });
    const lightBtn = screen.getByRole('button', { name: 'Light theme' });
    const darkBtn = screen.getByRole('button', { name: 'Dark theme' });

    expect(systemBtn).toBeInTheDocument();
    expect(lightBtn).toBeInTheDocument();
    expect(darkBtn).toBeInTheDocument();

    const container = systemBtn.parentElement as HTMLElement;
    expect(container).toHaveClass('inline-flex');
    expect(container).toHaveClass('rounded-full');
    expect(container).toHaveClass('extra-class');
  });

  it('calls setTheme with the selected theme when a button is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const darkBtn = await screen.findByRole('button', { name: 'Dark theme' });
    await user.click(darkBtn);
    expect(setThemeMock).toHaveBeenCalledWith('dark');

    const lightBtn = screen.getByRole('button', { name: 'Light theme' });
    await user.click(lightBtn);
    expect(setThemeMock).toHaveBeenCalledWith('light');

    const systemBtn = screen.getByRole('button', { name: 'System theme' });
    await user.click(systemBtn);
    expect(setThemeMock).toHaveBeenCalledWith('system');
  });

  it('renders active indicator and icon color for the current theme', async () => {
    // Make useTheme return dark as the current theme for this test
    const { useTheme } = require('next-themes');
    (useTheme as Mock).mockReturnValue({ theme: 'dark', setTheme: setThemeMock });

    render(<ThemeSwitcher />);

    const darkBtn = await screen.findByRole('button', { name: 'Dark theme' });
    const lightBtn = screen.getByRole('button', { name: 'Light theme' });

    // Active indicator exists only in the active button
    expect(darkBtn.querySelector('.bg-secondary')).not.toBeNull();
    expect(lightBtn.querySelector('.bg-secondary')).toBeNull();

    // Icon color reflects active/inactive state
    const darkIcon = darkBtn.querySelector('svg');
    const lightIcon = lightBtn.querySelector('svg');
    expect(darkIcon).toHaveClass('text-secondary-foreground');
    expect(lightIcon).toHaveClass('text-muted-foreground');
  });

  it.skip('injects and removes animation styles for circle-blur variant', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();

    render(<ThemeSwitcher variant="circle-blur" />);

    const lightBtn = await screen.findByRole('button', { name: 'Light theme' });
    // No injected styles initially
    document.querySelectorAll('style[id^="theme-transition-"]').forEach((el) => el.remove());
    expect(document.head.querySelectorAll('style[id^="theme-transition-"]').length).toBe(0);
    await user.click(lightBtn);

    // Style should be injected
    const injected = document.head.querySelectorAll('style[id^="theme-transition-"]');
    expect(injected.length).toBe(1);
    expect(injected[0].textContent).toContain('@keyframes circle-blur-expand');

    // After timers, it should be removed
    act(() => {
      vi.advanceTimersByTime(3100);
    });
    expect(document.head.querySelectorAll('style[id^="theme-transition-"]').length).toBe(0);

    vi.useRealTimers();
  });

  it.skip('injects gif mask CSS when using gif variant with url', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();
    render(<ThemeSwitcher variant="gif" url="https://example.com/mask.gif" />);

    const darkBtn = await screen.findByRole('button', { name: 'Dark theme' });
    await user.click(darkBtn);

    const styleEl = document.head.querySelector('style[id^="theme-transition-"]');
    expect(styleEl).not.toBeNull();
    expect(styleEl!.textContent).toContain('@keyframes gif-reveal');
    expect(styleEl!.textContent).toContain("mask-image: url('https://example.com/mask.gif')");

    act(() => {
      vi.advanceTimersByTime(3100);
    });
    vi.useRealTimers();
  });

  xit('uses polygon animation and selects light/dark keyframes accordingly', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();
    render(<ThemeSwitcher variant="polygon" />);

    const lightBtn = await screen.findByRole('button', { name: 'Light theme' });
    await user.click(lightBtn);
    let styleEl = document.head.querySelector('style[id^="theme-transition-"]');
    expect(styleEl).not.toBeNull();
    expect(styleEl!.textContent).toContain('wipe-in-light');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Click dark now to cover other branch
    const darkBtn = screen.getByRole('button', { name: 'Dark theme' });
    await user.click(darkBtn);
    styleEl = document.head.querySelector('style[id^="theme-transition-"]');
    expect(styleEl).not.toBeNull();
    expect(styleEl!.textContent).toContain('wipe-in-dark');

    vi.useRealTimers();
  });

  it('calls document.startViewTransition when available', async () => {
    const user = userEvent.setup();
    const startViewTransitionMock = vi.fn((cb: () => void) => {
      cb();
      return {} as unknown as ViewTransition;
    });
    (document as Document & { startViewTransition?: unknown }).startViewTransition =
      startViewTransitionMock;

    render(<ThemeSwitcher />);
    const darkBtn = await screen.findByRole('button', { name: 'Dark theme' });
    await user.click(darkBtn);

    expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith('dark');

    // Cleanup
    // @ts-expect-error cleanup test-only augmentation
    delete (document as Document & { startViewTransition?: unknown }).startViewTransition;
  }, 10000);

  it('useThemeTransition uses document.startViewTransition if present, else falls back', () => {
    const updateFn = vi.fn();

    // With startViewTransition present
    const startViewTransitionMock = vi.fn((cb: () => void) => {
      cb();
      return {} as unknown as ViewTransition;
    });
    (document as Document & { startViewTransition?: unknown }).startViewTransition =
      startViewTransitionMock;

    const { result, rerender } = renderHook(() => useThemeTransition());
    act(() => result.current.startTransition(updateFn));
    expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
    expect(updateFn).toHaveBeenCalledTimes(1);

    // Remove and verify fallback
    // @ts-expect-error cleanup test-only augmentation
    delete (document as Document & { startViewTransition?: unknown }).startViewTransition;
    updateFn.mockReset();
    rerender();
    act(() => result.current.startTransition(updateFn));
    expect(updateFn).toHaveBeenCalledTimes(1);
  });
});
