'use client';

import * as React from 'react';

/**
 * Status of the script loading process
 */
export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

/**
 * Options for the useScript hook
 */
export interface UseScriptOptions {
  /** Whether to remove the script tag on unmount (default: true) */
  removeOnUnmount?: boolean;
  /** Custom attributes to add to the script tag */
  attributes?: Record<string, string>;
  /** Whether the script should be loaded asynchronously (default: true) */
  async?: boolean;
  /** Whether to defer script execution (default: false) */
  defer?: boolean;
}

/**
 * Return type for the useScript hook
 */
export interface UseScriptReturn {
  /** Current status of the script loading */
  status: ScriptStatus;
  /** Whether the script is currently loading */
  isLoading: boolean;
  /** Whether the script has loaded successfully */
  isReady: boolean;
  /** Whether the script failed to load */
  isError: boolean;
  /** Error object if loading failed, or null if successful */
  error: ErrorEvent | null;
}

/**
 * A custom hook for dynamically loading external scripts with load/error state tracking.
 *
 * This hook provides SSR-safe script loading with comprehensive state management.
 * It prevents duplicate script tags, handles cleanup, and provides loading states
 * for UI feedback. The hook automatically removes the script on unmount unless
 * specified otherwise.
 *
 * @param src - The URL of the script to load
 * @param options - Optional configuration for script loading behavior
 * @returns An object containing the loading status and state flags
 *
 * @example
 * ```tsx
 * function StripePayment() {
 *   const { status, isReady, isError } = useScript('https://js.stripe.com/v3/');
 *
 *   if (isError) return <div>Failed to load Stripe</div>;
 *   if (!isReady) return <div>Loading payment form...</div>;
 *
 *   return <div>Stripe is ready!</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom attributes and defer
 * function GoogleAnalytics() {
 *   const { isReady } = useScript('https://www.googletagmanager.com/gtag/js?id=GA-XXXXXX', {
 *     defer: true,
 *     async: true,
 *     attributes: {
 *       'data-domain': 'example.com'
 *     }
 *   });
 *
 *   React.useEffect(() => {
 *     if (isReady && window.gtag) {
 *       window.gtag('config', 'GA-XXXXXX');
 *     }
 *   }, [isReady]);
 *
 *   return null;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Keep script after unmount (useful for global scripts)
 * function MapComponent() {
 *   const { status } = useScript('https://maps.googleapis.com/maps/api/js', {
 *     removeOnUnmount: false
 *   });
 *
 *   return <div>Map status: {status}</div>;
 * }
 * ```
 */
export function useScript(src: string, options: UseScriptOptions = {}): UseScriptReturn {
  const { removeOnUnmount = true, attributes = {}, async = true, defer = false } = options;

  const [status, setStatus] = React.useState<ScriptStatus>('idle');
  const [error, setError] = React.useState<ErrorEvent | null>(null);

  React.useEffect(() => {
    // SSR safety check
    if (typeof document === 'undefined' || !src) {
      return;
    }

    // Check if script already exists in the document
    let script = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (script) {
      // If script already exists, check its readyState
      if (script.hasAttribute('data-loaded')) {
        setStatus('ready');
        return;
      }

      if (script.hasAttribute('data-error')) {
        setStatus('error');
        return;
      }

      // Script exists but is still loading, attach listeners
      setStatus('loading');
    } else {
      // Create new script element
      script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;

      // Add custom attributes
      Object.entries(attributes).forEach(([key, value]) => {
        script!.setAttribute(key, value);
      });

      // Set initial loading status
      setStatus('loading');

      // Append to document
      document.head.appendChild(script);
    }

    // Event handlers
    const handleLoad = () => {
      script!.setAttribute('data-loaded', 'true');
      setStatus('ready');
      setError(null);
    };

    const handleError = (event: ErrorEvent) => {
      script!.setAttribute('data-error', 'true');
      setStatus('error');
      setError(event);
    };

    // Attach event listeners
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError as EventListener);

    // Cleanup function
    return () => {
      if (script) {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError as EventListener);

        // Remove script from DOM if requested
        if (removeOnUnmount && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    };
  }, [src, async, defer, removeOnUnmount, attributes]);

  return React.useMemo(
    () => ({
      status,
      isLoading: status === 'loading',
      isReady: status === 'ready',
      isError: status === 'error',
      error,
    }),
    [status, error]
  );
}
