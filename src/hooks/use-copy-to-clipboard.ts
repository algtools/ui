'use client';

import * as React from 'react';

/**
 * Return type for the useCopyToClipboard hook
 */
export interface UseCopyToClipboardReturn {
  /** The text that was last copied, or null if nothing has been copied */
  copiedText: string | null;
  /** Whether the copy operation was successful */
  isCopied: boolean;
  /** Error object if the copy operation failed, or null if successful */
  error: Error | null;
  /** Function to copy text to clipboard */
  copy: (text: string) => Promise<void>;
  /** Function to reset the copied state */
  reset: () => void;
}

/**
 * A custom hook for copying text to clipboard with fallback support for older browsers.
 *
 * This hook uses the modern Clipboard API when available, with a fallback to
 * the deprecated document.execCommand('copy') method for older browsers.
 *
 * @param resetDelay - Optional delay in milliseconds before automatically resetting the copied state (default: undefined, no auto-reset)
 * @returns An object containing the copied text, success state, error state, and helper functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { copiedText, isCopied, error, copy, reset } = useCopyToClipboard();
 *
 *   return (
 *     <div>
 *       <button onClick={() => copy('Hello World')}>
 *         {isCopied ? 'Copied!' : 'Copy Text'}
 *       </button>
 *       {error && <p>Error: {error.message}</p>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With auto-reset after 2 seconds
 * function MyComponent() {
 *   const { isCopied, copy } = useCopyToClipboard(2000);
 *
 *   return (
 *     <button onClick={() => copy('Hello World')}>
 *       {isCopied ? 'Copied!' : 'Copy Text'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCopyToClipboard(resetDelay?: number): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);
  const resetTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const reset = React.useCallback(() => {
    setCopiedText(null);
    setIsCopied(false);
    setError(null);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  const copy = React.useCallback(
    async (text: string) => {
      // Clear any existing timeout
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }

      try {
        // Try modern Clipboard API first
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setCopiedText(text);
          setIsCopied(true);
          setError(null);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;

          // Prevent scrolling to bottom of page in Microsoft Edge
          textArea.style.position = 'fixed';
          textArea.style.top = '0';
          textArea.style.left = '0';
          textArea.style.width = '2em';
          textArea.style.height = '2em';
          textArea.style.padding = '0';
          textArea.style.border = 'none';
          textArea.style.outline = 'none';
          textArea.style.boxShadow = 'none';
          textArea.style.background = 'transparent';

          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          try {
            const successful = document.execCommand('copy');
            if (successful) {
              setCopiedText(text);
              setIsCopied(true);
              setError(null);
            } else {
              throw new Error('Copy command was unsuccessful');
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to copy text';
            const copyError = new Error(errorMessage);
            setError(copyError);
            setIsCopied(false);
            throw copyError;
          } finally {
            document.body.removeChild(textArea);
          }
        }

        // Auto-reset after delay if specified
        if (resetDelay !== undefined && resetDelay > 0) {
          resetTimeoutRef.current = setTimeout(() => {
            reset();
          }, resetDelay);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to copy text';
        const copyError = new Error(errorMessage);
        setError(copyError);
        setIsCopied(false);
        setCopiedText(null);
      }
    },
    [resetDelay, reset]
  );

  return React.useMemo(
    () => ({
      copiedText,
      isCopied,
      error,
      copy,
      reset,
    }),
    [copiedText, isCopied, error, copy, reset]
  );
}
