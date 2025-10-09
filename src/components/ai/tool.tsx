'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Wrench, Loader2, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { type AIComponentProps, type Tool as ToolType } from './ai-types';

const toolVariants = cva('flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200', {
  variants: {
    status: {
      pending: 'border-border bg-muted/30',
      'in-progress': 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30',
      complete: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30',
      failed: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30',
      cancelled: 'border-border bg-muted/50 opacity-60',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

const toolIconVariants = cva('size-5 shrink-0 transition-all', {
  variants: {
    status: {
      pending: 'text-muted-foreground',
      'in-progress': 'text-blue-600 dark:text-blue-400 animate-spin',
      complete: 'text-green-600 dark:text-green-400',
      failed: 'text-red-600 dark:text-red-400',
      cancelled: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

/**
 * Tool component props
 */
export interface ToolProps extends AIComponentProps, VariantProps<typeof toolVariants> {
  /** The tool data to display */
  tool: ToolType;
  /** Whether to show parameters section */
  showParameters?: boolean;
  /** Whether to show result section */
  showResult?: boolean;
  /** Whether parameters section is initially expanded */
  defaultParametersExpanded?: boolean;
  /** Whether result section is initially expanded */
  defaultResultExpanded?: boolean;
  /** Callback when tool is clicked */
  onClick?: () => void;
}

/**
 * Formats a value for display in JSON-like format
 * @param value - The value to format
 * @returns Formatted string representation
 */
function formatValue(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value, null, 2);
}

/**
 * Tool component for displaying AI function calls (OpenAI tool usage pattern).
 *
 * Displays tool information including name, description, parameters, and results.
 * Supports different states: pending, in-progress, complete, failed, and cancelled.
 *
 * @example
 * ```tsx
 * <Tool
 *   tool={{
 *     name: 'search_database',
 *     description: 'Search for records in the database',
 *     parameters: { query: 'users', limit: 10 },
 *     result: { count: 42, records: [...] },
 *     status: 'complete'
 *   }}
 *   showParameters
 *   showResult
 * />
 * ```
 */
export const Tool = React.forwardRef<HTMLDivElement, ToolProps>(
  (
    {
      tool,
      status,
      showParameters = true,
      showResult = true,
      defaultParametersExpanded = false,
      defaultResultExpanded = true,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const toolStatus = status || tool.status || 'pending';
    const hasParameters = tool.parameters && Object.keys(tool.parameters).length > 0;
    const hasResult = tool.result !== undefined && tool.result !== null;
    const isClickable = !!onClick;

    // Determine status icon
    const StatusIcon =
      toolStatus === 'in-progress'
        ? Loader2
        : toolStatus === 'complete'
          ? CheckCircle2
          : toolStatus === 'failed'
            ? XCircle
            : Wrench;

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : 'article'}
        tabIndex={isClickable ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          toolVariants({ status: toolStatus }),
          isClickable && 'cursor-pointer hover:shadow-sm',
          className
        )}
        aria-label={`Tool: ${tool.name}, Status: ${toolStatus}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <StatusIcon className={toolIconVariants({ status: toolStatus })} aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-mono font-semibold break-all">{tool.name}</h4>
              <Badge
                variant={
                  toolStatus === 'complete'
                    ? 'default'
                    : toolStatus === 'in-progress'
                      ? 'secondary'
                      : toolStatus === 'failed'
                        ? 'destructive'
                        : 'outline'
                }
                className="text-xs"
              >
                {toolStatus}
              </Badge>
            </div>
            {tool.description && (
              <p className="text-sm text-muted-foreground mt-1 break-words">{tool.description}</p>
            )}
          </div>
        </div>

        {/* Parameters Section */}
        {showParameters && hasParameters && (
          <Collapsible defaultOpen={defaultParametersExpanded} className="space-y-2">
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors group w-full">
              <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
              <span>Parameters</span>
              <span className="text-xs text-muted-foreground">
                ({Object.keys(tool.parameters!).length})
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <div className="ml-6 rounded-md bg-muted/50 p-3 font-mono text-xs overflow-auto max-h-64">
                <pre className="whitespace-pre-wrap break-words">
                  {formatValue(tool.parameters)}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Result Section */}
        {showResult && hasResult && toolStatus !== 'in-progress' && (
          <Collapsible defaultOpen={defaultResultExpanded} className="space-y-2">
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors group w-full">
              <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
              <span>{toolStatus === 'failed' ? 'Error' : 'Result'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <div
                className={cn(
                  'ml-6 rounded-md p-3 font-mono text-xs overflow-auto max-h-64',
                  toolStatus === 'failed'
                    ? 'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200'
                    : 'bg-muted/50'
                )}
              >
                <pre className="whitespace-pre-wrap break-words">{formatValue(tool.result)}</pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Loading indicator for in-progress without result */}
        {toolStatus === 'in-progress' && !hasResult && (
          <div className="ml-8 text-sm text-muted-foreground italic">Executing...</div>
        )}
      </div>
    );
  }
);

Tool.displayName = 'Tool';
