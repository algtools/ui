'use client';

import * as React from 'react';
import { Copy, RotateCw, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import type { AIComponentProps } from './ai-types';

/**
 * Action configuration interface
 */
export interface Action {
  /** Unique identifier for the action */
  id: string;
  /** Label for the action (used for tooltip and screen readers) */
  label: string;
  /** Icon component to display */
  icon: React.ReactNode;
  /** Click handler for the action */
  onClick: () => void;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Optional loading state */
  loading?: boolean;
}

/**
 * Props for the Actions component
 */
export interface ActionsProps extends AIComponentProps {
  /** Array of actions to display */
  actions?: Action[];
  /** Layout orientation of the action buttons */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant for the action buttons */
  size?: 'sm' | 'default' | 'lg';
  /** Whether to show tooltips for actions */
  showTooltips?: boolean;
  /** Callback when regenerate is clicked (shortcut for common action) */
  onRegenerate?: () => void;
  /** Callback when copy is clicked (shortcut for common action) */
  onCopy?: () => void;
  /** Callback when thumbs up is clicked (shortcut for common action) */
  onThumbsUp?: () => void;
  /** Callback when thumbs down is clicked (shortcut for common action) */
  onThumbsDown?: () => void;
  /** Callback when share is clicked (shortcut for common action) */
  onShare?: () => void;
}

/**
 * Actions component for interactive action buttons in AI chat interfaces.
 * Provides common actions like regenerate, copy, feedback, and share.
 *
 * @example
 * ```tsx
 * <Actions
 *   onCopy={() => console.log('Copy clicked')}
 *   onRegenerate={() => console.log('Regenerate clicked')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Actions
 *   actions={[
 *     {
 *       id: 'custom',
 *       label: 'Custom Action',
 *       icon: <CustomIcon />,
 *       onClick: () => console.log('Custom action'),
 *     },
 *   ]}
 * />
 * ```
 */
export const Actions = React.forwardRef<HTMLDivElement, ActionsProps>(
  (
    {
      actions: customActions,
      orientation = 'horizontal',
      size = 'sm',
      showTooltips = true,
      onRegenerate,
      onCopy,
      onThumbsUp,
      onThumbsDown,
      onShare,
      className,
      ...props
    },
    ref
  ) => {
    // Build default actions from callback props
    const defaultActions = React.useMemo(() => {
      const actionsArray: Action[] = [];

      if (onRegenerate) {
        actionsArray.push({
          id: 'regenerate',
          label: 'Regenerate response',
          icon: <RotateCw className="size-4" />,
          onClick: onRegenerate,
        });
      }

      if (onCopy) {
        actionsArray.push({
          id: 'copy',
          label: 'Copy to clipboard',
          icon: <Copy className="size-4" />,
          onClick: onCopy,
        });
      }

      if (onThumbsUp) {
        actionsArray.push({
          id: 'thumbs-up',
          label: 'Good response',
          icon: <ThumbsUp className="size-4" />,
          onClick: onThumbsUp,
        });
      }

      if (onThumbsDown) {
        actionsArray.push({
          id: 'thumbs-down',
          label: 'Bad response',
          icon: <ThumbsDown className="size-4" />,
          onClick: onThumbsDown,
        });
      }

      if (onShare) {
        actionsArray.push({
          id: 'share',
          label: 'Share',
          icon: <Share2 className="size-4" />,
          onClick: onShare,
        });
      }

      return actionsArray;
    }, [onRegenerate, onCopy, onThumbsUp, onThumbsDown, onShare]);

    // Use custom actions if provided, otherwise use default actions
    const actions = customActions || defaultActions;

    if (actions.length === 0) {
      return null;
    }

    const ActionButton = ({ action }: { action: Action }) => {
      const button = (
        <Button
          variant="ghost"
          size={size === 'sm' ? 'icon' : size === 'lg' ? 'icon' : 'icon'}
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
          aria-label={action.label}
          className={cn(
            'shrink-0',
            size === 'sm' && 'size-8',
            size === 'default' && 'size-9',
            size === 'lg' && 'size-10'
          )}
        >
          {action.loading ? (
            <div className="animate-spin" role="status" aria-label="Loading">
              <RotateCw className="size-4" />
            </div>
          ) : (
            action.icon
          )}
        </Button>
      );

      if (!showTooltips) {
        return button;
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{action.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    };

    return (
      <TooltipProvider>
        <div
          ref={ref}
          className={cn(
            'flex gap-1',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
            'items-center',
            className
          )}
          role="group"
          aria-label="Message actions"
          {...props}
        >
          {actions.map((action) => (
            <ActionButton key={action.id} action={action} />
          ))}
        </div>
      </TooltipProvider>
    );
  }
);

Actions.displayName = 'Actions';
