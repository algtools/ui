'use client';

import * as React from 'react';
import { ChevronDown, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { AIComponentProps, Source } from './ai-types';

/**
 * Props for the Sources component
 */
export interface SourcesProps extends AIComponentProps {
  /** Array of sources to display */
  sources: Source[];
  /** Whether the sources are initially expanded */
  defaultOpen?: boolean;
  /** Whether the sources are expanded (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Title to display in the header */
  title?: string;
  /** Icon to display in the header */
  icon?: React.ReactNode;
  /** Variant style for the component */
  variant?: 'default' | 'compact';
  /** Whether to show source icons/favicons */
  showIcons?: boolean;
  /** Callback when a source is clicked */
  onSourceClick?: (source: Source) => void;
  /** Maximum number of sources to display before showing "show more" */
  maxDisplayed?: number;
}

/**
 * SourceItem component for rendering individual source items
 */
interface SourceItemProps {
  source: Source;
  index: number;
  showIcon?: boolean;
  onClick?: (source: Source) => void;
  variant?: 'default' | 'compact';
}

const SourceItem = React.forwardRef<HTMLDivElement, SourceItemProps>(
  ({ source, index, showIcon = true, onClick, variant = 'default' }, ref) => {
    const handleClick = React.useCallback(() => {
      onClick?.(source);
      if (source.url) {
        window.open(source.url, '_blank', 'noopener,noreferrer');
      }
    }, [source, onClick]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    return (
      <div
        ref={ref}
        data-slot="source-item"
        className={cn(
          'flex items-start gap-3 rounded-md p-3 transition-colors',
          source.url &&
            'cursor-pointer hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          variant === 'compact' && 'p-2 gap-2'
        )}
        onClick={source.url ? handleClick : undefined}
        onKeyDown={source.url ? handleKeyDown : undefined}
        role={source.url ? 'link' : 'article'}
        tabIndex={source.url ? 0 : undefined}
        aria-label={source.url ? `Open ${source.title}` : source.title}
      >
        {/* Source Icon/Favicon */}
        {showIcon && (
          <div
            className={cn(
              'flex-shrink-0 flex items-center justify-center rounded',
              variant === 'compact' ? 'h-5 w-5' : 'h-6 w-6'
            )}
          >
            {source.iconUrl ? (
              <img
                src={source.iconUrl}
                alt=""
                className={cn('rounded', variant === 'compact' ? 'h-4 w-4' : 'h-5 w-5')}
                onError={(e) => {
                  // Fallback to default icon on error
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'block';
                  }
                }}
              />
            ) : null}
            <FileText
              className={cn(
                'text-muted-foreground',
                variant === 'compact' ? 'h-4 w-4' : 'h-5 w-5',
                source.iconUrl && 'hidden'
              )}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Source Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {/* Source Number and Title */}
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    'flex-shrink-0 font-mono text-muted-foreground',
                    variant === 'compact' ? 'text-xs' : 'text-sm'
                  )}
                  aria-label={`Source ${index + 1}`}
                >
                  [{index + 1}]
                </span>
                <h4
                  className={cn(
                    'font-medium text-foreground truncate',
                    variant === 'compact' ? 'text-sm' : 'text-base'
                  )}
                  title={source.title}
                >
                  {source.title}
                </h4>
              </div>

              {/* Source URL */}
              {source.url && (
                <p
                  className={cn(
                    'text-muted-foreground truncate mt-0.5',
                    variant === 'compact' ? 'text-xs' : 'text-sm'
                  )}
                  title={source.url}
                >
                  {source.url}
                </p>
              )}

              {/* Source Description */}
              {source.description && (
                <p
                  className={cn(
                    'text-muted-foreground line-clamp-2 mt-1',
                    variant === 'compact' ? 'text-xs' : 'text-sm'
                  )}
                  title={source.description}
                >
                  {source.description}
                </p>
              )}
            </div>

            {/* External Link Icon */}
            {source.url && (
              <ExternalLink
                className={cn(
                  'flex-shrink-0 text-muted-foreground',
                  variant === 'compact' ? 'h-3 w-3' : 'h-4 w-4'
                )}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

SourceItem.displayName = 'SourceItem';

/**
 * Sources component for displaying AI citations in an expandable list.
 * Shows source count and expandable list with metadata (title, url, description, icons).
 *
 * @example
 * ```tsx
 * const sources = [
 *   {
 *     id: '1',
 *     title: 'React Documentation',
 *     url: 'https://react.dev',
 *     description: 'Official React documentation',
 *     iconUrl: 'https://react.dev/favicon.ico'
 *   }
 * ];
 * <Sources sources={sources} title="Used 5 sources" />
 * ```
 *
 * @example
 * ```tsx
 * // Compact variant
 * <Sources sources={sources} variant="compact" showIcons={false} />
 * ```
 */
export const Sources = React.forwardRef<HTMLDivElement, SourcesProps>(
  (
    {
      sources,
      defaultOpen = false,
      open,
      onOpenChange,
      title,
      icon,
      variant = 'default',
      showIcons = true,
      onSourceClick,
      maxDisplayed,
      className,
      ...props
    },
    ref
  ) => {
    const [showAll, setShowAll] = React.useState(false);

    // Compute displayed sources
    const displayedSources = React.useMemo(() => {
      if (!maxDisplayed || showAll) {
        return sources;
      }
      return sources.slice(0, maxDisplayed);
    }, [sources, maxDisplayed, showAll]);

    const hasMore = maxDisplayed && sources.length > maxDisplayed && !showAll;

    // Generate title if not provided
    const displayTitle = React.useMemo(() => {
      if (title) return title;
      const count = sources?.length ?? 0;
      return count === 1 ? 'Used 1 source' : `Used ${count} sources`;
    }, [title, sources]);

    // Don't render if no sources
    if (!sources || sources.length === 0) {
      return null;
    }

    return (
      <Collapsible
        ref={ref}
        data-slot="sources"
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        className={cn(
          'rounded-lg border border-border bg-muted/30',
          variant === 'compact' && 'border-0 bg-transparent',
          className
        )}
        {...props}
      >
        <CollapsibleTrigger
          data-slot="sources-trigger"
          className={cn(
            'flex w-full items-center justify-between gap-2 p-4 transition-colors hover:bg-muted/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            variant === 'compact' && 'p-2 hover:bg-muted/30'
          )}
          aria-label={`Toggle ${displayTitle}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              {icon ?? <FileText className="h-4 w-4 text-blue-500" aria-hidden="true" />}
            </div>
            <span className={cn('font-medium', variant === 'compact' ? 'text-xs' : 'text-sm')}>
              {displayTitle}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform duration-200',
              'group-data-[state=open]:rotate-180'
            )}
            aria-hidden="true"
          />
        </CollapsibleTrigger>

        <CollapsibleContent data-slot="sources-content">
          <div
            className={cn(
              'border-t border-border',
              variant === 'compact' ? 'space-y-1 py-2' : 'space-y-2 p-4 pt-3'
            )}
          >
            {displayedSources.map((source, index) => (
              <SourceItem
                key={source.id}
                source={source}
                index={index}
                showIcon={showIcons}
                onClick={onSourceClick}
                variant={variant}
              />
            ))}

            {/* Show More Button */}
            {hasMore && (
              <button
                onClick={() => setShowAll(true)}
                className={cn(
                  'w-full rounded-md p-2 text-sm font-medium text-primary transition-colors',
                  'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
                aria-label={`Show ${sources.length - maxDisplayed} more sources`}
              >
                Show {sources.length - maxDisplayed} more{' '}
                {sources.length - maxDisplayed === 1 ? 'source' : 'sources'}
              </button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

Sources.displayName = 'Sources';
