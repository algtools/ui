'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';
import { AIComponentProps, StreamingState } from './ai-types';

/**
 * Props for the Response component
 */
export interface ResponseProps extends AIComponentProps {
  /**
   * The markdown content to display (may be partial during streaming)
   */
  content: string;
  /**
   * Whether the content is currently streaming
   * @default false
   */
  isStreaming?: boolean;
  /**
   * Streaming state and controls
   */
  streamingState?: StreamingState;
  /**
   * Whether to show a cursor indicator during streaming
   * @default true
   */
  showCursor?: boolean;
  /**
   * Custom cursor character or element
   * @default '▋'
   */
  cursor?: React.ReactNode;
  /**
   * ARIA label for the response
   */
  ariaLabel?: string;
}

/**
 * Response component for displaying markdown content from AI assistants.
 * Optimized for streaming rendering with syntax highlighting support.
 *
 * @example
 * ```tsx
 * <Response
 *   content="# Hello World\n\nThis is **markdown** content."
 *   isStreaming={false}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With streaming
 * <Response
 *   content={partialContent}
 *   isStreaming={true}
 *   streamingState={{
 *     isStreaming: true,
 *     canCancel: true,
 *     onCancel: handleCancel
 *   }}
 * />
 * ```
 */
export const Response = React.forwardRef<HTMLDivElement, ResponseProps>(
  (
    {
      content,
      isStreaming = false,
      showCursor = true,
      cursor = '▋',
      ariaLabel = 'AI response',
      className,
      ...props
    },
    ref
  ) => {
    // Add cursor to content during streaming
    const displayContent = React.useMemo(() => {
      if (isStreaming && showCursor) {
        return `${content}${typeof cursor === 'string' ? cursor : ''}`;
      }
      return content;
    }, [content, isStreaming, showCursor, cursor]);

    return (
      <div
        ref={ref}
        className={cn('ai-markdown-content', className)}
        role="log"
        aria-live="polite"
        aria-label={ariaLabel}
        aria-busy={isStreaming}
        {...props}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            // Custom component for code blocks
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';

              if (!inline && language) {
                return (
                  <div className="ai-code-block">
                    <div className="ai-code-block__header">
                      <span className="ai-code-block__language">{language}</span>
                    </div>
                    <div className="ai-code-block__content">
                      <pre>
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  </div>
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // Custom component for headings with proper sizing
            h1: ({ children, ...props }) => (
              <h1 className="text-3xl font-bold" {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 className="text-2xl font-semibold" {...props}>
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="text-xl font-semibold" {...props}>
                {children}
              </h3>
            ),
            h4: ({ children, ...props }) => (
              <h4 className="text-lg font-semibold" {...props}>
                {children}
              </h4>
            ),
            h5: ({ children, ...props }) => (
              <h5 className="text-base font-semibold" {...props}>
                {children}
              </h5>
            ),
            h6: ({ children, ...props }) => (
              <h6 className="text-sm font-semibold" {...props}>
                {children}
              </h6>
            ),
            // Custom component for links
            a: ({ children, href, ...props }) => (
              <a
                href={href}
                className="text-primary underline underline-offset-4 hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
            // Custom component for tables
            table: ({ children, ...props }) => (
              <div className="my-4 w-full overflow-auto">
                <table className="w-full border-collapse" {...props}>
                  {children}
                </table>
              </div>
            ),
            th: ({ children, ...props }) => (
              <th
                className="border border-border bg-muted px-4 py-2 text-left font-semibold"
                {...props}
              >
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td className="border border-border px-4 py-2" {...props}>
                {children}
              </td>
            ),
            // Custom component for blockquotes
            blockquote: ({ children, ...props }) => (
              <blockquote
                className="border-l-4 border-border pl-4 italic text-muted-foreground"
                {...props}
              >
                {children}
              </blockquote>
            ),
          }}
        >
          {displayContent}
        </ReactMarkdown>
        {isStreaming && typeof cursor !== 'string' && showCursor && (
          <span className="inline-block animate-pulse">{cursor}</span>
        )}
      </div>
    );
  }
);

Response.displayName = 'Response';
