'use client';

import * as React from 'react';
import { useLocalStorage } from './use-local-storage';
import { useMediaQuery } from './use-media-query';

/**
 * Theme value type: 'light', 'dark', or 'system'
 */
export type TernaryDarkMode = 'light' | 'dark' | 'system';

/**
 * Return type for the useTernaryDarkMode hook
 */
export interface UseTernaryDarkModeReturn {
  /** The current theme setting ('light', 'dark', or 'system') */
  mode: TernaryDarkMode;
  /** Whether dark mode is currently active (resolves 'system' to actual value) */
  isDarkMode: boolean;
  /** Set the theme to 'light' */
  setLight: () => void;
  /** Set the theme to 'dark' */
  setDark: () => void;
  /** Set the theme to 'system' (follows OS preference) */
  setSystem: () => void;
  /** Set the theme to a specific value */
  setMode: (mode: TernaryDarkMode) => void;
  /** Toggle between light and dark (maintains system if currently system) */
  toggle: () => void;
}

/**
 * A custom hook for managing dark mode with light/dark/system options.
 *
 * Features:
 * - Three modes: 'light', 'dark', and 'system'
 * - Automatic localStorage persistence
 * - Syncs with system color scheme preference when mode is 'system'
 * - Applies dark mode class to document element
 * - TypeScript support with strict typing
 * - SSR-safe
 *
 * @param defaultValue - The default theme mode (defaults to 'system')
 * @returns An object containing theme state and control functions
 *
 * @example
 * Basic usage:
 * ```tsx
 * function ThemeSelector() {
 *   const { mode, setLight, setDark, setSystem, isDarkMode } = useTernaryDarkMode();
 *
 *   return (
 *     <div>
 *       <p>Current mode: {mode}</p>
 *       <p>Dark mode active: {isDarkMode ? 'Yes' : 'No'}</p>
 *       <button onClick={setLight}>Light</button>
 *       <button onClick={setDark}>Dark</button>
 *       <button onClick={setSystem}>System</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * With toggle:
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, isDarkMode, toggle } = useTernaryDarkMode();
 *
 *   return (
 *     <button onClick={toggle}>
 *       {mode === 'system' ? '🖥️' : isDarkMode ? '🌙' : '☀️'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * With dropdown:
 * ```tsx
 * function ThemeDropdown() {
 *   const { mode, setMode } = useTernaryDarkMode();
 *
 *   return (
 *     <select value={mode} onChange={(e) => setMode(e.target.value as TernaryDarkMode)}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   );
 * }
 * ```
 *
 * @example
 * System preference respects user's OS settings:
 * ```tsx
 * function ThemeInfo() {
 *   const { mode, isDarkMode } = useTernaryDarkMode('system');
 *
 *   return (
 *     <div>
 *       {mode === 'system' && (
 *         <p>Following system preference: {isDarkMode ? 'Dark' : 'Light'}</p>
 *       )}
 *       {mode !== 'system' && (
 *         <p>Manual override: {mode}</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTernaryDarkMode(
  defaultValue: TernaryDarkMode = 'system'
): UseTernaryDarkModeReturn {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const { value: mode, setValue: setMode } = useLocalStorage<TernaryDarkMode>(
    'theme-mode',
    defaultValue
  );

  // Resolve the actual dark mode state based on mode and system preference
  const isDarkMode = React.useMemo(() => {
    if (mode === 'system') {
      return systemPrefersDark;
    }
    return mode === 'dark';
  }, [mode, systemPrefersDark]);

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

  const setLight = React.useCallback(() => {
    setMode('light');
  }, [setMode]);

  const setDark = React.useCallback(() => {
    setMode('dark');
  }, [setMode]);

  const setSystem = React.useCallback(() => {
    setMode('system');
  }, [setMode]);

  const toggle = React.useCallback(() => {
    setMode((prev) => {
      // If system, toggle based on current system preference
      if (prev === 'system') {
        return systemPrefersDark ? 'light' : 'dark';
      }
      // Otherwise, toggle between light and dark
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [setMode, systemPrefersDark]);

  return React.useMemo(
    () => ({
      mode,
      isDarkMode,
      setLight,
      setDark,
      setSystem,
      setMode,
      toggle,
    }),
    [mode, isDarkMode, setLight, setDark, setSystem, setMode, toggle]
  );
}
