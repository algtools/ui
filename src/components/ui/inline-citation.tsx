'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { cn } from '../../lib/utils';
import type { Citation } from '../ai/ai-types';

/**
 * Props for the InlineCitation component
 */
export interface InlineCitationProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** The citation data to display */
  citation: Citation;
  /** Whether the citation is currently expanded */
  expanded?: boolean;
  /** Callback when the citation is clicked */
  onExpand?: (citation: Citation) => void;
  /** Optional variant styling */
  variant?: 'default' | 'compact' | 'numbered';
  /** Whether to show the preview on hover */
  showPreview?: boolean;
  /** Custom className for the trigger button */
  className?: string;
}

/**
 * InlineCitation component displays citations inline with hover previews
 *
 * @example
 * ```tsx
 * <InlineCitation
 *   citation={{
 *     id: '1',
 *     number: 1,
 *     source: {
 *       id: 'source-1',
 *       title: 'Example Article',
 *       url: 'https://example.com',
 *       description: 'An example source'
 *     },
 *     excerpt: 'Relevant excerpt from the source'
 *   }}
 *   onExpand={(citation) => console.log('Expanded:', citation)}
 * />
 * ```
 */
export const InlineCitation = React.forwardRef<HTMLButtonElement, InlineCitationProps>(
  (
    {
      citation,
      expanded = false,
      onExpand,
      variant = 'default',
      showPreview = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onExpand?.(citation);
      },
      [citation, onExpand]
    );

    const triggerButton = (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center',
          'text-xs font-medium',
          'text-primary hover:text-primary/80',
          'transition-colors duration-200',
          'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded',
          'no-underline',
          variant === 'numbered' && 'align-super',
          variant === 'compact' && 'px-0.5',
          variant === 'default' && 'px-1',
          expanded && 'bg-primary/10',
          className
        )}
        aria-label={`Citation ${citation.number}: ${citation.source.title}`}
        aria-expanded={expanded}
        data-citation-id={citation.id}
        data-citation-number={citation.number}
        {...props}
      >
        {variant === 'numbered' ? (
          <span className="text-[0.7em]">[{citation.number}]</span>
        ) : (
          <span>[{citation.number}]</span>
        )}
      </button>
    );

    if (!showPreview) {
      return triggerButton;
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          className="w-80 p-4"
          align="start"
          side="top"
          data-citation-preview
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="space-y-3">
            {/* Citation Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                  {citation.source.title}
                </h4>
                {citation.source.url && (
                  <a
                    href={citation.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary hover:underline truncate block mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {citation.source.url}
                  </a>
                )}
              </div>
              {citation.source.iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={citation.source.iconUrl}
                  alt=""
                  className="w-5 h-5 rounded flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Description */}
            {citation.source.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {citation.source.description}
              </p>
            )}

            {/* Excerpt */}
            {citation.excerpt && (
              <div className="pt-3 border-t border-border">
                <blockquote className="text-sm text-foreground/90 italic">
                  &quot;{citation.excerpt}&quot;
                </blockquote>
              </div>
            )}

            {/* Metadata */}
            {citation.source.metadata && Object.keys(citation.source.metadata).length > 0 && (
              <div className="pt-2 border-t border-border">
                <dl className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(citation.source.metadata).map(([key, value]) => (
                    <div key={key} className="space-y-0.5">
                      <dt className="font-medium text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}
                      </dt>
                      <dd className="text-foreground truncate">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

InlineCitation.displayName = 'InlineCitation';

/**
 * Props for the InlineCitationList component
 */
export interface InlineCitationListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of citations to display */
  citations: Citation[];
  /** Callback when a citation is clicked */
  onCitationClick?: (citation: Citation) => void;
  /** Optional title for the citations list */
  title?: string;
  /** Custom className for the container */
  className?: string;
}

/**
 * InlineCitationList component displays a list of citations
 * Useful for showing all sources referenced in a document
 *
 * @example
 * ```tsx
 * <InlineCitationList
 *   citations={citations}
 *   title="Sources"
 *   onCitationClick={(citation) => console.log('Clicked:', citation)}
 * />
 * ```
 */
export const InlineCitationList = React.forwardRef<HTMLDivElement, InlineCitationListProps>(
  ({ citations, onCitationClick, title = 'Sources', className, ...props }, ref) => {
    if (citations.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)} {...props}>
        {title && (
          <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
            {title}
          </h3>
        )}
        <ol className="space-y-3 list-none">
          {citations.map((citation) => (
            <li
              key={citation.id}
              className="flex gap-3 text-sm"
              data-citation-item
              data-citation-id={citation.id}
            >
              <span className="text-muted-foreground font-medium flex-shrink-0">
                [{citation.number}]
              </span>
              <div className="flex-1 min-w-0">
                <div className="space-y-1">
                  {citation.source.url ? (
                    <a
                      href={citation.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline break-words"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCitationClick?.(citation);
                      }}
                    >
                      {citation.source.title}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{citation.source.title}</span>
                  )}
                  {citation.source.description && (
                    <p className="text-muted-foreground text-xs line-clamp-2">
                      {citation.source.description}
                    </p>
                  )}
                  {citation.excerpt && (
                    <blockquote className="text-muted-foreground text-xs italic border-l-2 border-border pl-2 mt-1">
                      &quot;{citation.excerpt}&quot;
                    </blockquote>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
);

InlineCitationList.displayName = 'InlineCitationList';
