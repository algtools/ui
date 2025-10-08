import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Monitor, Tablet, Smartphone, Moon, Sun, Minimize2 } from 'lucide-react';

import { useMediaQuery } from '../hooks/use-media-query';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that shows responsive breakpoints
 */
function ResponsiveBreakpointsDemo() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Responsive Breakpoints</h3>
        <p className="text-sm text-muted-foreground">
          Resize your browser window to see the breakpoints change in real-time.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="font-medium">Mobile</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (max-width: 767px)
              </code>
            </div>
            <Badge variant={isMobile ? 'default' : 'secondary'}>
              {isMobile ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Tablet className="h-4 w-4" />
              <span className="font-medium">Tablet</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (768px - 1023px)
              </code>
            </div>
            <Badge variant={isTablet ? 'default' : 'secondary'}>
              {isTablet ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Desktop</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (min-width: 1024px)
              </code>
            </div>
            <Badge variant={isDesktop ? 'default' : 'secondary'}>
              {isDesktop ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Large Desktop</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (min-width: 1280px)
              </code>
            </div>
            <Badge variant={isLargeDesktop ? 'default' : 'secondary'}>
              {isLargeDesktop ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary/5 border border-primary rounded-lg">
          <p className="text-sm font-medium">
            Current Device Type:{' '}
            <span className="text-primary">
              {isMobile && 'Mobile'}
              {isTablet && 'Tablet'}
              {isDesktop && !isLargeDesktop && 'Desktop'}
              {isLargeDesktop && 'Large Desktop'}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing conditional rendering based on screen size
 */
function ConditionalRenderDemo() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conditional Rendering</h3>
        <p className="text-sm text-muted-foreground">
          Different content is shown based on the screen size.
        </p>

        {isMobile && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <p className="font-medium text-blue-900 dark:text-blue-100">Mobile View</p>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This content is only visible on mobile devices (width &lt; 768px).
              Perfect for touch-optimized interfaces!
            </p>
          </div>
        )}

        {isDesktop && (
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="font-medium text-green-900 dark:text-green-100">Desktop View</p>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              This content is only visible on desktop devices (width ≥ 1024px).
              Great for complex layouts with more screen real estate!
            </p>
          </div>
        )}

        {!isMobile && !isDesktop && (
          <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Tablet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <p className="font-medium text-purple-900 dark:text-purple-100">Tablet View</p>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              This content is only visible on tablet devices (768px - 1023px).
              A perfect middle ground for both touch and mouse interactions!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing system preferences detection
 */
function SystemPreferencesDemo() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersContrast = useMediaQuery('(prefers-contrast: more)');

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">System Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Detect user system preferences for better accessibility and UX.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              {prefersDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="font-medium">Color Scheme</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                prefers-color-scheme
              </code>
            </div>
            <Badge variant={prefersDark ? 'default' : 'secondary'}>
              {prefersDark ? 'Dark' : 'Light'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Minimize2 className="h-4 w-4" />
              <span className="font-medium">Reduced Motion</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                prefers-reduced-motion
              </code>
            </div>
            <Badge variant={prefersReducedMotion ? 'default' : 'secondary'}>
              {prefersReducedMotion ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium">High Contrast</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                prefers-contrast
              </code>
            </div>
            <Badge variant={prefersContrast ? 'default' : 'secondary'}>
              {prefersContrast ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            💡 Tip: These preferences are set in your system settings and help create
            more accessible and user-friendly experiences.
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing orientation detection
 */
function OrientationDemo() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Device Orientation</h3>
        <p className="text-sm text-muted-foreground">
          Detect device orientation for better mobile experiences.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-6 border-2 rounded" />
              <span className="font-medium">Portrait</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (orientation: portrait)
              </code>
            </div>
            <Badge variant={isPortrait ? 'default' : 'secondary'}>
              {isPortrait ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 border-2 rounded" />
              <span className="font-medium">Landscape</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                (orientation: landscape)
              </code>
            </div>
            <Badge variant={isLandscape ? 'default' : 'secondary'}>
              {isLandscape ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary/5 border border-primary rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Current Orientation: </span>
            <span className="text-primary">
              {isPortrait && 'Portrait (Height > Width)'}
              {isLandscape && 'Landscape (Width > Height)'}
            </span>
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            💡 Try rotating your device or resizing your browser to see the orientation change!
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing Tailwind CSS breakpoints
 */
function TailwindBreakpointsDemo() {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tailwind CSS Breakpoints</h3>
        <p className="text-sm text-muted-foreground">
          Standard Tailwind CSS responsive breakpoints for consistent design systems.
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 border rounded">
            <code className="text-xs font-mono">sm: (min-width: 640px)</code>
            <Badge variant={isSm ? 'default' : 'secondary'} className="text-xs">
              {isSm ? '✓' : '✗'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 border rounded">
            <code className="text-xs font-mono">md: (min-width: 768px)</code>
            <Badge variant={isMd ? 'default' : 'secondary'} className="text-xs">
              {isMd ? '✓' : '✗'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 border rounded">
            <code className="text-xs font-mono">lg: (min-width: 1024px)</code>
            <Badge variant={isLg ? 'default' : 'secondary'} className="text-xs">
              {isLg ? '✓' : '✗'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 border rounded">
            <code className="text-xs font-mono">xl: (min-width: 1280px)</code>
            <Badge variant={isXl ? 'default' : 'secondary'} className="text-xs">
              {isXl ? '✓' : '✗'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 border rounded">
            <code className="text-xs font-mono">2xl: (min-width: 1536px)</code>
            <Badge variant={is2Xl ? 'default' : 'secondary'} className="text-xs">
              {is2Xl ? '✓' : '✗'}
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary/5 border border-primary rounded-lg">
          <p className="text-sm font-medium">
            Active Breakpoint:{' '}
            <span className="text-primary font-mono">
              {is2Xl ? '2xl' : isXl ? 'xl' : isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : 'base'}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof ResponsiveBreakpointsDemo> = {
  title: 'Hooks/useMediaQuery',
  component: ResponsiveBreakpointsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that listens for changes to a specified media query using the window.matchMedia API. Perfect for responsive design, system preferences detection, and building adaptive user interfaces. The hook is SSR-safe and automatically cleans up listeners on unmount.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveBreakpoints: Story = {
  render: () => <ResponsiveBreakpointsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Monitor common responsive breakpoints (mobile, tablet, desktop) and see which ones are currently active. Try resizing your browser window to see real-time updates.',
      },
    },
  },
};

export const ConditionalRendering: Story = {
  render: () => <ConditionalRenderDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Conditionally render different content based on screen size. This pattern is useful for showing device-specific UI elements or optimizing layouts for different devices.',
      },
    },
  },
};

export const SystemPreferences: Story = {
  render: () => <SystemPreferencesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detect user system preferences like color scheme (dark/light mode), reduced motion, and contrast preferences. Great for accessibility and respecting user preferences.',
      },
    },
  },
};

export const OrientationDetection: Story = {
  render: () => <OrientationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detect device orientation (portrait vs landscape). Particularly useful for mobile apps and responsive designs that need to adapt to device rotation.',
      },
    },
  },
};

export const TailwindBreakpoints: Story = {
  render: () => <TailwindBreakpointsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Examples using standard Tailwind CSS breakpoints (sm, md, lg, xl, 2xl). Useful when you need to synchronize JavaScript logic with Tailwind CSS responsive utilities.',
      },
    },
  },
};

export const MultipleQueries: Story = {
  render: () => (
    <div className="space-y-6">
      <ResponsiveBreakpointsDemo />
      <SystemPreferencesDemo />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Multiple useMediaQuery hooks can be used simultaneously in the same component, each tracking different media queries independently.',
      },
    },
  },
};
