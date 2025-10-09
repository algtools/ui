'use client';

import * as React from 'react';
import { useLocalStorage } from './use-local-storage';
import { useMediaQuery } from './use-media-query';

/**
 * Return type for the useDarkMode hook
 */
export interface UseDarkModeReturn {
  /** Whether dark mode is currently enabled */
  isDarkMode: boolean;
  /** Enable dark mode */
  enable: () => void;
  /** Disable dark mode (switch to light mode) */
  disable: () => void;
  /** Toggle between dark and light mode */
  toggle: () => void;
  /** Set dark mode to a specific value */
  setDarkMode: (enabled: boolean) => void;
}

/**
 * A custom hook for managing dark mode with localStorage persistence and system preference sync.
 *
 * Features:
 * - Automatic localStorage persistence
 * - Syncs with system color scheme preference on first load
 * - Applies dark mode class to document element
 * - TypeScript support
 * - SSR-safe
 *
 * @param defaultValue - Optional default value if no stored value exists (defaults to system preference)
 * @returns An object containing dark mode state and control functions
 *
 * @example
 * Basic usage:
 * ```tsx
 * function ThemeToggle() {
 *   const { isDarkMode, toggle } = useDarkMode();
 *
 *   return (
 *     <button onClick={toggle}>
 *       {isDarkMode ? '🌙 Dark' : '☀️ Light'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * With individual controls:
 * ```tsx
 * function ThemeControls() {
 *   const { isDarkMode, enable, disable } = useDarkMode();
 *
 *   return (
 *     <div>
 *       <p>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
 *       <button onClick={enable}>Enable Dark Mode</button>
 *       <button onClick={disable}>Enable Light Mode</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * With custom default:
 * ```tsx
 * function App() {
 *   // Start with light mode regardless of system preference
 *   const darkMode = useDarkMode(false);
 *
 *   return (
 *     <div>
 *       <ThemeToggle {...darkMode} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useDarkMode(defaultValue?: boolean): UseDarkModeReturn {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Determine initial value: use provided default, or fall back to system preference
  const initialValue = React.useMemo(
    () => defaultValue ?? prefersDarkMode,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Only compute once on mount
  );

  const { value: isDarkMode, setValue } = useLocalStorage<boolean>('dark-mode', initialValue);

  // Apply dark mode class to document element
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const enable = React.useCallback(() => {
    setValue(true);
  }, [setValue]);

  const disable = React.useCallback(() => {
    setValue(false);
  }, [setValue]);

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  const setDarkMode = React.useCallback(
    (enabled: boolean) => {
      setValue(enabled);
    },
    [setValue]
  );

  return React.useMemo(
    () => ({
      isDarkMode,
      enable,
      disable,
      toggle,
      setDarkMode,
    }),
    [isDarkMode, enable, disable, toggle, setDarkMode]
  );
}
