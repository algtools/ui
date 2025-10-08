'use client';

import { Triangle } from 'lucide-react';
import * as React from 'react';

function Logo({
  variant = 'logo',
  className,
  imgClassName,
  width,
  height,
}: {
  variant?: 'logo' | 'icon';
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
}) {
  // Default sizes
  const defaultSize = variant === 'icon' ? 48 : 24;
  const iconSize = width || height || defaultSize;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-primary p-2 ${className || ''}`}
    >
      <Triangle
        size={iconSize}
        className={`text-primary-foreground ${imgClassName || ''}`}
        strokeWidth={2}
      />
    </div>
  );
}

export { Logo };
