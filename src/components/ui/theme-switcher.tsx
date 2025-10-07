'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import { cn } from '../../lib/utils';

const themes = [
  {
    key: 'system',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
];

export type ThemeSwitcherProps = {
  className?: string;
  variant?: 'circle' | 'circle-blur' | 'gif' | 'polygon';
  start?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  url?: string;
};

export const ThemeSwitcher = ({
  className,
  variant = 'circle',
  start = 'center',
  url,
}: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const injectAnimationStyles = useCallback(
    (newTheme: string) => {
      // Only apply animations for light/dark transitions (not system)
      if (newTheme === 'system') return;

      // Remove any previously injected transition styles to avoid stacking
      // multiple style tags when switching themes rapidly.
      document
        .querySelectorAll('style[id^="theme-transition-"]')
        .forEach((existing) => existing.remove());

      const styleId = `theme-transition-${Date.now()}`;
      const style = document.createElement('style');
      style.id = styleId;

      // Generate animation CSS based on variant
      let css = '';

      // Compute an anchor point based on the switcher's on-screen bounds so
      // the animation origin always stays within the component limits.
      const container = containerRef.current;
      const rect = container?.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Default to viewport center if ref is missing (shouldn't happen post-mount)
      let cx = vw / 2;
      let cy = vh / 2;

      if (rect) {
        const centers = {
          center: [rect.left + rect.width / 2, rect.top + rect.height / 2],
          'top-left': [rect.left + 1, rect.top + 1],
          'top-right': [rect.left + rect.width - 1, rect.top + 1],
          'bottom-left': [rect.left + 1, rect.top + rect.height - 1],
          'bottom-right': [rect.left + rect.width - 1, rect.top + rect.height - 1],
        } as const;
        const [x, y] = centers[start] ?? centers.center;
        cx = x;
        cy = y;
      }

      // Radius large enough to cover the viewport from the anchor point
      const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));

      if (variant === 'circle') {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: none; }
          ::view-transition-new(root) {
            animation: circle-expand ${rect ? '0.45s' : '0.4s'} ease-out;
          }
          @keyframes circle-expand {
            from { clip-path: circle(0px at ${cx}px ${cy}px); }
            to { clip-path: circle(${Math.ceil(maxRadius)}px at ${cx}px ${cy}px); }
          }
        }
      `;
      } else if (variant === 'circle-blur') {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: none; }
          ::view-transition-new(root) { animation: circle-blur-expand 0.5s ease-out; filter: blur(0); }
          @keyframes circle-blur-expand {
            from { clip-path: circle(0px at ${cx}px ${cy}px); filter: blur(4px); }
            to { clip-path: circle(${Math.ceil(maxRadius)}px at ${cx}px ${cy}px); filter: blur(0); }
          }
        }
      `;
      } else if (variant === 'gif' && url) {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.4s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `;
      } else if (variant === 'polygon') {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${newTheme === 'light' ? 'wipe-in-light' : 'wipe-in-dark'} 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `;
      }

      if (css) {
        style.textContent = css;
        document.head.appendChild(style);

        // Clean up animation styles after transition
        setTimeout(() => {
          const styleEl = document.getElementById(styleId);
          if (styleEl) {
            styleEl.remove();
          }
        }, 3000);
      }
    },
    [variant, start, url]
  );

  const handleThemeClick = useCallback(
    (themeKey: string) => {
      // Inject animation styles for this specific transition
      injectAnimationStyles(themeKey);

      // Use View Transitions API if available
      if ('startViewTransition' in document) {
        (document as Document).startViewTransition(() => {
          setTheme(themeKey);
        });
      } else {
        setTheme(themeKey);
      }
    },
    [setTheme, injectAnimationStyles]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative isolate inline-flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto h-4 w-4',
                isActive ? 'text-secondary-foreground' : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

// Export a helper hook for using with View Transitions API
export const useThemeTransition = () => {
  const startTransition = useCallback((updateFn: () => void) => {
    if ('startViewTransition' in document) {
      (document as Document).startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);
  return { startTransition };
};
