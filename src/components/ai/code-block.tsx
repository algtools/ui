'use client';

import * as React from 'react';
import { codeToHtml } from 'shiki';
import { useTheme } from 'next-themes';
import { Check, Copy } from 'lucide-react';

import { cn } from '../../lib/utils';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';
import { Button } from '../ui/button';
import { AIComponentProps } from './ai-types';

/**
 * Props for the CodeBlock component
 */
export interface CodeBlockProps extends AIComponentProps {
  /** The code content to display */
  code: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Optional filename to display */
  filename?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Lines to highlight (1-indexed) */
  highlightLines?: number[];
  /** Whether to show the copy button */
  showCopyButton?: boolean;
  /** Whether to show the language label */
  showLanguage?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: string;
  /** Custom theme for light mode */
  lightTheme?: string;
  /** Custom theme for dark mode */
  darkTheme?: string;
  /** Callback when code is copied */
  onCopy?: () => void;
}

/**
 * CodeBlock component for displaying syntax-highlighted code with copy functionality.
 *
 * This component provides syntax highlighting for code blocks using Shiki,
 * with support for multiple languages, themes, line numbers, and line highlighting.
 * It integrates with the theme system for light/dark mode support.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const greeting = 'Hello, World!';"
 *   language="typescript"
 *   showLineNumbers
 *   highlightLines={[1]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With filename
 * <CodeBlock
 *   code="function add(a, b) { return a + b; }"
 *   language="javascript"
 *   filename="math.js"
 *   showCopyButton
 * />
 * ```
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language = 'plaintext',
      filename,
      showLineNumbers = false,
      highlightLines = [],
      showCopyButton = true,
      showLanguage = true,
      maxHeight,
      lightTheme = 'github-light',
      darkTheme = 'github-dark',
      onCopy,
      className,
      ...props
    },
    ref
  ) => {
    const [highlightedCode, setHighlightedCode] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { isCopied, copy } = useCopyToClipboard(2000);
    const { resolvedTheme } = useTheme();

    // Determine which theme to use based on current theme
    const currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

    // Generate highlighted HTML when code, language, or theme changes
    React.useEffect(() => {
      let isMounted = true;

      const generateHighlight = async () => {
        try {
          setIsLoading(true);
          const html = await codeToHtml(code, {
            lang: language,
            theme: currentTheme,
            decorations: highlightLines.map((line) => ({
              start: { line: line - 1, character: 0 },
              end: { line: line - 1, character: code.split('\n')[line - 1]?.length ?? 0 },
              properties: { class: 'highlighted-line' },
            })),
          });

          if (isMounted) {
            setHighlightedCode(html);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Failed to highlight code:', error);
          // Fallback to plain text
          if (isMounted) {
            setHighlightedCode(`<pre><code>${escapeHtml(code)}</code></pre>`);
            setIsLoading(false);
          }
        }
      };

      generateHighlight();

      return () => {
        isMounted = false;
      };
    }, [code, language, currentTheme, highlightLines]);

    const handleCopy = React.useCallback(async () => {
      await copy(code);
      onCopy?.();
    }, [code, copy, onCopy]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        // Allow copy with Ctrl+C or Cmd+C when focused
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
          handleCopy();
          event.preventDefault();
        }
      },
      [handleCopy]
    );

    return (
      <div
        ref={ref}
        className={cn(
          'ai-code-block group relative rounded-lg border bg-muted/30',
          'dark:bg-muted/10 dark:border-border/50',
          className
        )}
        {...props}
      >
        {/* Header with filename and controls */}
        {(filename || showLanguage || showCopyButton) && (
          <div
            className={cn(
              'flex items-center justify-between gap-2 px-4 py-2',
              'border-b bg-muted/50 dark:bg-muted/20 rounded-t-lg',
              'dark:border-border/50'
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              {filename && (
                <span className="text-sm font-medium text-foreground truncate">{filename}</span>
              )}
              {showLanguage && !filename && (
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {language}
                </span>
              )}
            </div>

            {showCopyButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={isCopied ? 'Copied to clipboard' : 'Copy code to clipboard'}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="sr-only">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="sr-only">Copy</span>
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Code content */}
        <div
          className={cn('relative overflow-auto', showLineNumbers && 'code-with-line-numbers')}
          style={{ maxHeight }}
          role="region"
          aria-label={`Code block${language ? ` in ${language}` : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {isLoading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          ) : (
            <div
              className={cn('code-content', showLineNumbers && 'with-line-numbers')}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </div>

        {/* Copy button for mobile (always visible) */}
        {showCopyButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={cn(
              'absolute top-2 right-2 h-8 w-8 md:hidden',
              (filename || showLanguage) && 'top-12'
            )}
            aria-label={isCopied ? 'Copied to clipboard' : 'Copy code to clipboard'}
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

/**
 * Helper function to escape HTML
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
