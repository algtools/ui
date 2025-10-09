import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Monitor, Maximize2, Minimize2, Smartphone } from 'lucide-react';

import { useWindowSize } from '../hooks/use-window-size';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that displays current window size
 */
function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Window Size</h3>
        <p className="text-sm text-muted-foreground">
          Resize your browser window to see the dimensions update in real-time (debounced by 150ms).
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Width</p>
            </div>
            <p className="text-3xl font-bold">{width}px</p>
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Height</p>
            </div>
            <p className="text-3xl font-bold">{height}px</p>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary rounded-lg">
          <p className="text-sm font-medium">
            Dimensions:{' '}
            <span className="text-primary font-mono">
              {width} × {height}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing responsive breakpoints using window size
 */
function ResponsiveBreakpointsDemo() {
  const { width } = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024 && width < 1280;
  const isLargeDesktop = width >= 1280;

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Responsive Breakpoints</h3>
        <p className="text-sm text-muted-foreground">
          Based on current window width: <span className="font-mono font-semibold">{width}px</span>
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="font-medium">Mobile</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">&lt; 768px</code>
            </div>
            <Badge variant={isMobile ? 'default' : 'secondary'}>
              {isMobile ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Tablet</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">768px - 1023px</code>
            </div>
            <Badge variant={isTablet ? 'default' : 'secondary'}>
              {isTablet ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Desktop</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">1024px - 1279px</code>
            </div>
            <Badge variant={isDesktop ? 'default' : 'secondary'}>
              {isDesktop ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Large Desktop</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">≥ 1280px</code>
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
              {isDesktop && 'Desktop'}
              {isLargeDesktop && 'Large Desktop'}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component with custom debounce delay
 */
function CustomDebounceDemo() {
  const fast = useWindowSize({ debounceMs: 50 });
  const normal = useWindowSize({ debounceMs: 150 });
  const slow = useWindowSize({ debounceMs: 500 });

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Debounce Delays</h3>
        <p className="text-sm text-muted-foreground">
          Compare different debounce delays. Resize quickly to see the difference in update
          frequency.
        </p>

        <div className="space-y-3">
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900 dark:text-green-100">
                Fast (50ms debounce)
              </span>
              <code className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-green-900 dark:text-green-100">
                debounceMs: 50
              </code>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              {fast.width} × {fast.height}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-900 dark:text-blue-100">
                Normal (150ms debounce)
              </span>
              <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-900 dark:text-blue-100">
                debounceMs: 150
              </code>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {normal.width} × {normal.height}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-950">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-purple-900 dark:text-purple-100">
                Slow (500ms debounce)
              </span>
              <code className="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-900 dark:text-purple-100">
                debounceMs: 500
              </code>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              {slow.width} × {slow.height}
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            💡 Tip: Faster debounce = more frequent updates = higher CPU usage. Choose based on your
            needs!
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing aspect ratio calculation
 */
function AspectRatioDemo() {
  const { width, height } = useWindowSize();

  const aspectRatio = (width / height).toFixed(2);
  const isWidescreen = width / height > 1.7;
  const isUltrawide = width / height > 2.3;

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Aspect Ratio Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Calculate and display window aspect ratio for adaptive layouts.
        </p>

        <div className="p-4 border rounded-lg bg-muted/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Width</p>
              <p className="text-lg font-bold">{width}px</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Height</p>
              <p className="text-lg font-bold">{height}px</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Ratio</p>
              <p className="text-lg font-bold">{aspectRatio}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">Standard (16:9 ≈ 1.78)</span>
            <Badge variant={!isWidescreen ? 'default' : 'secondary'}>
              {!isWidescreen ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">Widescreen (&gt; 1.7)</span>
            <Badge variant={isWidescreen && !isUltrawide ? 'default' : 'secondary'}>
              {isWidescreen && !isUltrawide ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">Ultrawide (&gt; 2.3)</span>
            <Badge variant={isUltrawide ? 'default' : 'secondary'}>
              {isUltrawide ? 'Yes' : 'No'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof WindowSizeDemo> = {
  title: 'Hooks/useWindowSize',
  component: WindowSizeDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that tracks window dimensions with debounced resize events. Perfect for responsive layouts, adaptive UI, and performance-optimized resize handling. The hook is SSR-safe and automatically cleans up listeners on unmount.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <WindowSizeDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Display the current window dimensions in real-time. The hook debounces resize events by 150ms (default) to prevent excessive re-renders during window resizing.',
      },
    },
  },
};

export const ResponsiveBreakpoints: Story = {
  render: () => <ResponsiveBreakpointsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Use window size to determine responsive breakpoints and conditionally render content. This is an alternative to CSS media queries when you need JavaScript-based responsive logic.',
      },
    },
  },
};

export const CustomDebounce: Story = {
  render: () => <CustomDebounceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Compare different debounce delays side-by-side. Lower delays give faster updates but use more CPU. Higher delays are more efficient but less responsive. Choose based on your performance requirements.',
      },
    },
  },
};

export const AspectRatio: Story = {
  render: () => <AspectRatioDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Calculate and display window aspect ratio. Useful for adaptive layouts that need to respond to different screen proportions (standard, widescreen, ultrawide).',
      },
    },
  },
};

export const Combined: Story = {
  render: () => (
    <div className="space-y-6">
      <WindowSizeDemo />
      <ResponsiveBreakpointsDemo />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Multiple useWindowSize hooks can be used simultaneously in the same component or across different components, each with its own debounce settings.',
      },
    },
  },
};
