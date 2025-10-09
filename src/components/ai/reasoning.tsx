'use client';

import * as React from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { AIComponentProps, ReasoningStep } from './ai-types';

/**
 * Props for the Reasoning component
 */
export interface ReasoningProps extends AIComponentProps {
  /** Array of reasoning steps to display */
  steps: ReasoningStep[];
  /** Whether the reasoning is initially expanded */
  defaultOpen?: boolean;
  /** Whether the reasoning is expanded (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Title to display in the header */
  title?: string;
  /** Icon to display in the header */
  icon?: React.ReactNode;
  /** Variant style for the component */
  variant?: 'default' | 'compact';
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
}

/**
 * Reasoning component for displaying AI thinking process in collapsible blocks.
 * Shows reasoning steps in a structured, collapsible format with visual indicators.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: '1', title: 'Analysis', content: 'Analyzing the problem...', order: 1 },
 *   { id: '2', title: 'Solution', content: 'Formulating solution...', order: 2 }
 * ];
 * <Reasoning steps={steps} title="AI Thinking Process" />
 * ```
 */
export const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
  (
    {
      steps,
      defaultOpen = false,
      open,
      onOpenChange,
      title = 'Reasoning',
      icon,
      variant = 'default',
      showStepNumbers = true,
      className,
      ...props
    },
    ref
  ) => {
    // Sort steps by order if provided
    const sortedSteps = React.useMemo(() => {
      return [...steps].sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });
    }, [steps]);

    return (
      <Collapsible
        ref={ref}
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
          className={cn(
            'flex w-full items-center justify-between gap-2 p-4 transition-colors hover:bg-muted/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            variant === 'compact' && 'p-2 hover:bg-muted/30'
          )}
          aria-label={`Toggle ${title}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              {icon ?? <Lightbulb className="h-4 w-4 text-yellow-500" />}
            </div>
            <span className={cn('font-medium text-sm', variant === 'compact' && 'text-xs')}>
              {title}
            </span>
            {steps.length > 0 && (
              <span
                className={cn(
                  'rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground',
                  variant === 'compact' && 'px-1.5 py-0 text-[10px]'
                )}
              >
                {steps.length} {steps.length === 1 ? 'step' : 'steps'}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(
            'overflow-hidden transition-all',
            'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
          )}
        >
          <div
            className={cn('space-y-3 px-4 pb-4', variant === 'compact' && 'space-y-2 px-2 pb-2')}
            role="log"
            aria-label="Reasoning steps"
          >
            {sortedSteps.length === 0 ? (
              <div className="py-2 text-sm text-muted-foreground">No reasoning steps available</div>
            ) : (
              sortedSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'rounded-md border border-border bg-background p-3',
                    variant === 'compact' && 'p-2'
                  )}
                >
                  <div className="flex items-start gap-2">
                    {showStepNumbers && (
                      <div
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground',
                          variant === 'compact' && 'h-5 w-5 text-[10px]'
                        )}
                        aria-label={`Step ${index + 1}`}
                      >
                        {index + 1}
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      {step.title && (
                        <h4
                          className={cn(
                            'font-medium text-sm leading-none',
                            variant === 'compact' && 'text-xs'
                          )}
                        >
                          {step.title}
                        </h4>
                      )}
                      <p
                        className={cn(
                          'text-sm text-muted-foreground leading-relaxed',
                          variant === 'compact' && 'text-xs',
                          !step.title && 'mt-0'
                        )}
                      >
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

Reasoning.displayName = 'Reasoning';
