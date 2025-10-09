'use client';

import * as React from 'react';

/**
 * Options for the useDocumentTitle hook
 */
export interface UseDocumentTitleOptions {
  /** Whether to restore the previous title when component unmounts (default: false) */
  restoreOnUnmount?: boolean;
  /** Prefix to add before the title (e.g., "MySite - ") */
  prefix?: string;
  /** Suffix to add after the title (e.g., " | MySite") */
  suffix?: string;
}

/**
 * A custom hook for dynamically updating the browser's document title (tab title).
 *
 * This hook provides SSR-safe document title management with support for title
 * restoration, prefixes, and suffixes. It automatically handles cleanup and is
 * safe to use in Next.js and other SSR frameworks.
 *
 * @param title - The title to set for the document
 * @param options - Optional configuration for title behavior
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   useDocumentTitle('About Us');
 *   return <div>About page content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With prefix and suffix
 * function ProductPage({ product }) {
 *   useDocumentTitle(product.name, {
 *     prefix: 'Shop - ',
 *     suffix: ' | MyStore'
 *   });
 *   return <div>{product.name}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With restore on unmount
 * function Modal() {
 *   useDocumentTitle('Modal Open', { restoreOnUnmount: true });
 *   return <div>Modal content</div>;
 * }
 * ```
 */
export function useDocumentTitle(title: string, options: UseDocumentTitleOptions = {}): void {
  const { restoreOnUnmount = false, prefix = '', suffix = '' } = options;

  // Store the original title to restore later if needed
  const prevTitleRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // SSR safety check
    if (typeof document === 'undefined') {
      return;
    }

    // Store the previous title only once on mount
    if (prevTitleRef.current === null) {
      prevTitleRef.current = document.title;
    }

    // Set the new title with prefix and suffix
    document.title = `${prefix}${title}${suffix}`;

    // Cleanup function to restore title if requested
    return () => {
      if (restoreOnUnmount && prevTitleRef.current !== null) {
        document.title = prevTitleRef.current;
      }
    };
  }, [title, prefix, suffix, restoreOnUnmount]);
}
