'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../lib/utils';

function Progress({
  className,
  value,
  indicatorColor,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorColor?: string;
}) {
  // Clamp value between 0 and 100 for proper positioning
  const clampedValue = Math.max(0, Math.min(100, value || 0));
  const translateX = 100 - clampedValue;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn('h-full w-full flex-1 transition-all', indicatorColor || 'bg-primary')}
        style={{ transform: `translateX(-${translateX}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
