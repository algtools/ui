'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Clock, Loader2, CheckCircle2, XCircle, MinusCircle, type LucideIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Progress } from '../ui/progress';
import { type AIComponentProps, type Task as TaskType } from './ai-types';

const taskVariants = cva(
  'flex items-start gap-3 rounded-lg border p-4 transition-all duration-200',
  {
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
  }
);

const taskIconVariants = cva('size-5 shrink-0 transition-all', {
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
 * Status icons mapping for different task states
 */
const statusIcons: Record<TaskType['status'], LucideIcon> = {
  pending: Clock,
  'in-progress': Loader2,
  complete: CheckCircle2,
  failed: XCircle,
  cancelled: MinusCircle,
};

/**
 * Task component props
 */
export interface TaskProps extends AIComponentProps, VariantProps<typeof taskVariants> {
  /** The task data to display */
  task: TaskType;
  /** Whether to show the progress bar */
  showProgress?: boolean;
  /** Whether to show timestamps */
  showTimestamp?: boolean;
  /** Custom icon component to override default status icon */
  icon?: LucideIcon;
  /** Callback when task is clicked */
  onClick?: () => void;
}

/**
 * Task component for displaying AI agent work progress in task lists.
 *
 * Displays task information with status indicators, icons, and optional progress bars.
 * Supports different states: pending, in-progress, complete, failed, and cancelled.
 *
 * @example
 * ```tsx
 * <Task
 *   task={{
 *     id: '1',
 *     title: 'Analyze codebase',
 *     status: 'in-progress',
 *     progress: 45
 *   }}
 *   showProgress
 * />
 * ```
 */
export const Task = React.forwardRef<HTMLDivElement, TaskProps>(
  (
    {
      task,
      status,
      showProgress = true,
      showTimestamp = false,
      icon,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const taskStatus = status || task.status;
    const IconComponent = icon || statusIcons[taskStatus];
    const hasProgress = showProgress && typeof task.progress === 'number' && task.progress >= 0;
    const isClickable = !!onClick;

    // Format timestamp
    const formattedTimestamp = React.useMemo(() => {
      if (!showTimestamp) return null;
      const timestamp = task.updatedAt || task.createdAt;
      if (!timestamp) return null;

      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, [showTimestamp, task.updatedAt, task.createdAt]);

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
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
          taskVariants({ status: taskStatus }),
          isClickable && 'cursor-pointer hover:shadow-sm',
          className
        )}
        aria-label={`Task: ${task.title}, Status: ${taskStatus}`}
        {...props}
      >
        {/* Status Icon */}
        <IconComponent className={taskIconVariants({ status: taskStatus })} aria-hidden="true" />

        {/* Task Content */}
        <div className="flex-1 space-y-2 min-w-0">
          {/* Title and Timestamp */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium leading-none break-words">{task.title}</h4>
            {formattedTimestamp && (
              <time
                className="text-xs text-muted-foreground whitespace-nowrap"
                dateTime={(() => {
                  const timestamp = task.updatedAt || task.createdAt;
                  if (!timestamp) return undefined;
                  return typeof timestamp === 'string' ? timestamp : timestamp.toISOString();
                })()}
              >
                {formattedTimestamp}
              </time>
            )}
          </div>

          {/* Error Message */}
          {task.error && taskStatus === 'failed' && (
            <p className="text-xs text-red-600 dark:text-red-400 break-words">{task.error}</p>
          )}

          {/* Progress Bar */}
          {hasProgress && taskStatus === 'in-progress' && (
            <div className="space-y-1">
              <Progress
                value={task.progress}
                className="h-1.5"
                indicatorColor="bg-blue-600 dark:bg-blue-400"
                aria-label={`Progress: ${task.progress}%`}
              />
              <p className="text-xs text-muted-foreground">{task.progress}% complete</p>
            </div>
          )}

          {/* Completion Progress for Complete Status */}
          {hasProgress && taskStatus === 'complete' && task.progress === 100 && (
            <p className="text-xs text-muted-foreground">100% complete</p>
          )}
        </div>
      </div>
    );
  }
);

Task.displayName = 'Task';

/**
 * TaskList component for displaying multiple tasks
 */
export interface TaskListProps extends AIComponentProps {
  /** Array of tasks to display */
  tasks: TaskType[];
  /** Whether to show progress bars for all tasks */
  showProgress?: boolean;
  /** Whether to show timestamps for all tasks */
  showTimestamp?: boolean;
  /** Callback when a task is clicked */
  onTaskClick?: (task: TaskType) => void;
  /** Empty state message */
  emptyMessage?: string;
}

/**
 * TaskList component for displaying multiple AI agent tasks.
 *
 * Renders a list of Task components with consistent spacing and optional empty state.
 *
 * @example
 * ```tsx
 * <TaskList
 *   tasks={[
 *     { id: '1', title: 'Task 1', status: 'complete' },
 *     { id: '2', title: 'Task 2', status: 'in-progress', progress: 60 }
 *   ]}
 *   showProgress
 *   onTaskClick={(task) => console.log('Clicked:', task)}
 * />
 * ```
 */
export const TaskList = React.forwardRef<HTMLDivElement, TaskListProps>(
  (
    {
      tasks,
      showProgress = true,
      showTimestamp = false,
      onTaskClick,
      emptyMessage = 'No tasks',
      className,
      ...props
    },
    ref
  ) => {
    if (tasks.length === 0) {
      return (
        <div
          ref={ref}
          className={cn('text-center py-8 text-sm text-muted-foreground', className)}
          role="status"
          aria-live="polite"
          {...props}
        >
          {emptyMessage}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="log"
        aria-live="polite"
        aria-label="Task list"
        className={cn('space-y-3', className)}
        {...props}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            showProgress={showProgress}
            showTimestamp={showTimestamp}
            onClick={onTaskClick ? () => onTaskClick(task) : undefined}
          />
        ))}
      </div>
    );
  }
);

TaskList.displayName = 'TaskList';
