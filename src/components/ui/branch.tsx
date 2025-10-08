'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { GitBranch } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Branch as BranchType } from '../ai/ai-types';

/**
 * Branch component props extending Radix Tabs Root props
 */
export interface BranchProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Root>, 'children'> {
  /** Array of branch variations to display */
  branches: BranchType[];
  /** Optional custom renderer for branch content */
  renderContent?: (content: string, branch: BranchType) => React.ReactNode;
  /** Optional custom renderer for branch label */
  renderLabel?: (branch: BranchType, index: number) => React.ReactNode;
  /** Callback when active branch changes */
  onBranchChange?: (branchId: string) => void;
  /** Show branch indicators */
  showIndicators?: boolean;
}

/**
 * Branch component for displaying and navigating between multiple AI response variations.
 *
 * @example
 * ```tsx
 * const branches = [
 *   { id: '1', title: 'Response A', content: 'First variation...' },
 *   { id: '2', title: 'Response B', content: 'Second variation...' }
 * ];
 *
 * <Branch branches={branches} defaultValue="1" />
 * ```
 */
function Branch({
  branches,
  renderContent,
  renderLabel,
  onBranchChange,
  showIndicators = true,
  className,
  defaultValue,
  value,
  onValueChange,
  ...props
}: BranchProps) {
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
      onBranchChange?.(newValue);
    },
    [onValueChange, onBranchChange]
  );

  // Use first branch as default if not specified
  const effectiveDefaultValue = defaultValue || branches[0]?.id;

  if (branches.length === 0) {
    return null;
  }

  return (
    <TabsPrimitive.Root
      data-slot="branch"
      className={cn('flex flex-col gap-3', className)}
      defaultValue={effectiveDefaultValue}
      value={value}
      onValueChange={handleValueChange}
      {...props}
    >
      <BranchList showIndicators={showIndicators}>
        {branches.map((branch, index) => (
          <BranchTrigger key={branch.id} value={branch.id} showIndicator={showIndicators}>
            {renderLabel ? (
              renderLabel(branch, index)
            ) : (
              <>{branch.title || `Branch ${index + 1}`}</>
            )}
          </BranchTrigger>
        ))}
      </BranchList>

      {branches.map((branch) => (
        <BranchContent key={branch.id} value={branch.id}>
          {renderContent ? (
            renderContent(branch.content, branch)
          ) : (
            <div className="text-sm">{branch.content}</div>
          )}
        </BranchContent>
      ))}
    </TabsPrimitive.Root>
  );
}

/**
 * BranchList component for displaying the list of branch triggers
 */
interface BranchListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  showIndicators?: boolean;
}

function BranchList({ className, ...props }: BranchListProps) {
  return (
    <TabsPrimitive.List
      data-slot="branch-list"
      className={cn('inline-flex h-9 w-fit items-center gap-1 rounded-lg bg-muted p-1', className)}
      {...props}
    />
  );
}

/**
 * BranchTrigger component for individual branch selection buttons
 */
interface BranchTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  showIndicator?: boolean;
}

function BranchTrigger({
  className,
  showIndicator = true,
  children,
  ...props
}: BranchTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="branch-trigger"
      className={cn(
        'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        'data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground',
        className
      )}
      {...props}
    >
      {showIndicator && <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </TabsPrimitive.Trigger>
  );
}

/**
 * BranchContent component for displaying the content of each branch
 */
function BranchContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="branch-content"
      className={cn(
        'rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=active]:animate-in data-[state=active]:fade-in-50',
        className
      )}
      {...props}
    />
  );
}

/**
 * BranchIndicator component for displaying visual branch indicators
 */
interface BranchIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether this indicator is active */
  active?: boolean;
  /** Optional label for the indicator */
  label?: string;
}

function BranchIndicator({ active, label, className, ...props }: BranchIndicatorProps) {
  return (
    <div
      data-slot="branch-indicator"
      className={cn(
        'flex items-center gap-1.5 text-xs',
        active ? 'text-foreground' : 'text-muted-foreground',
        className
      )}
      {...props}
    >
      <GitBranch className="h-3 w-3" aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}

export { Branch, BranchList, BranchTrigger, BranchContent, BranchIndicator };
export type { BranchListProps, BranchTriggerProps, BranchIndicatorProps };
