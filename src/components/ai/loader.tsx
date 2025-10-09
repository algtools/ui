import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Loader component
 */
export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The message to display alongside the loader
   * @default "AI is thinking..."
   */
  message?: string;
  /**
   * Size variant for the loader
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether to show the animated dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * Loader Component
 *
 * An animated loading indicator designed for AI responses with customizable messages.
 * Features a typing/thinking animation with smooth transitions and proper accessibility support.
 *
 * @example
 * ```tsx
 * <Loader />
 * <Loader message="Processing your request..." size="lg" />
 * <Loader message="Generating response..." showDots={false} />
 * ```
 *
 * @component
 */
export function Loader({
  message = 'AI is thinking...',
  size = 'md',
  showDots = true,
  className,
  ...props
}: LoaderProps) {
  const sizeClasses = {
    sm: 'text-sm gap-2',
    md: 'text-base gap-3',
    lg: 'text-lg gap-4',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div
      className={cn('flex items-center', sizeClasses[size], className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...props}
    >
      {showDots && (
        <div className="flex items-center gap-1">
          <span
            className={cn('rounded-full bg-current animate-bounce', dotSizeClasses[size])}
            style={{
              animationDelay: '0ms',
              animationDuration: '1.4s',
            }}
          />
          <span
            className={cn('rounded-full bg-current animate-bounce', dotSizeClasses[size])}
            style={{
              animationDelay: '150ms',
              animationDuration: '1.4s',
            }}
          />
          <span
            className={cn('rounded-full bg-current animate-bounce', dotSizeClasses[size])}
            style={{
              animationDelay: '300ms',
              animationDuration: '1.4s',
            }}
          />
        </div>
      )}
      <span className="text-muted-foreground animate-pulse">{message}</span>
    </div>
  );
}

Loader.displayName = 'Loader';
