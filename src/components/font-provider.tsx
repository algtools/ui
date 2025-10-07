import React from 'react';

interface FontProviderProps {
  children: React.ReactNode;
  /**
   * Whether to load fonts automatically via CSS imports
   * @default true
   */
  loadFonts?: boolean;
  /**
   * Custom font families to override defaults
   */
  fonts?: {
    sans?: string;
    mono?: string;
  };
}

/**
 * FontProvider component that ensures fonts are loaded when using the UI library
 * in host applications. This can be used as an alternative to manual CSS imports.
 */
export function FontProvider({ children, loadFonts = true, fonts }: FontProviderProps) {
  React.useEffect(() => {
    if (loadFonts) {
      // Create and inject font stylesheets if they don't exist
      const existingInter = document.querySelector('link[href*="Inter:wght"]');
      const existingJetBrainsMono = document.querySelector('link[href*="JetBrains+Mono:wght"]');

      if (!existingInter) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
        document.head.appendChild(link);
      }

      if (!existingJetBrainsMono) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap';
        document.head.appendChild(link);
      }
    }

    // Set custom font CSS variables if provided
    if (fonts) {
      const root = document.documentElement;
      if (fonts.sans) {
        root.style.setProperty('--font-family-sans', fonts.sans);
      }
      if (fonts.mono) {
        root.style.setProperty('--font-family-mono', fonts.mono);
      }
    }
  }, [loadFonts, fonts]);

  return <>{children}</>;
}

/**
 * Hook to access font configuration
 */
export function useFonts() {
  return {
    sans: 'var(--font-family-sans)',
    mono: 'var(--font-family-mono)',
  };
}
