'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Suggestion chip styling variants
 * ChatGPT-style follow-up prompt chips with hover and focus states
 */
const suggestionVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-secondary-foreground border border-input hover:bg-accent hover:text-accent-foreground dark:bg-secondary/50 dark:hover:bg-secondary',
        outline:
          'border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        primary:
          'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 py-1.5 text-xs',
        lg: 'h-10 px-5 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * SuggestionProps interface
 * Extends button props with variant and size options
 */
export interface SuggestionProps
  extends Omit<React.ComponentProps<'button'>, 'children'>,
    VariantProps<typeof suggestionVariants> {
  /**
   * Text content of the suggestion
   */
  text: string;
  /**
   * Optional icon element to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Whether to render as a child component using Slot
   * When true, the `text` and `icon` props are ignored and children should be provided
   */
  asChild?: boolean;
  /**
   * Children to render when using asChild prop
   */
  children?: React.ReactNode;
}

/**
 * Suggestion Component
 *
 * A chip/pill component for displaying ChatGPT-style follow-up prompts.
 * Supports click handlers, optional icons, and keyboard navigation.
 *
 * @example
 * ```tsx
 * import { Suggestion } from '@algtools/ui';
 * import { Sparkles } from 'lucide-react';
 *
 * function MyComponent() {
 *   return (
 *     <Suggestion
 *       text="Tell me more about this"
 *       icon={<Sparkles />}
 *       onClick={() => console.log('Clicked')}
 *     />
 *   );
 * }
 * ```
 */
const Suggestion = React.forwardRef<HTMLButtonElement, SuggestionProps>(
  ({ className, variant, size, text, icon, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="suggestion"
        className={cn(suggestionVariants({ variant, size, className }))}
        type="button"
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{text}</span>
          </>
        )}
      </Comp>
    );
  }
);

Suggestion.displayName = 'Suggestion';

export { Suggestion, suggestionVariants };
