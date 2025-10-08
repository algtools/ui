import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Maximize2, Minimize2 } from 'lucide-react';
import * as React from 'react';

import { useResizeObserver } from '../hooks/use-resize-observer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useResizeObserver hook
 */
function UseResizeObserverDemo() {
  const [ref, size] = useResizeObserver<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useResizeObserver Hook Demo</h3>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="mr-2 h-4 w-4" />
                Shrink
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" />
                Expand
              </>
            )}
          </Button>
        </div>

        <div
          ref={ref}
          className={`rounded-lg border p-4 transition-all duration-300 ${
            isExpanded ? 'h-96' : 'h-48'
          }`}
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 100%)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-primary-foreground">
            <p className="text-4xl font-bold mb-4">
              {size.width} × {size.height}
            </p>
            <p className="text-sm opacity-90">Width × Height (px)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Width</p>
              <p className="text-2xl font-bold">{size.width}px</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="text-2xl font-bold">{size.height}px</p>
            </div>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Click the button or resize your browser window to see the dimensions change
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing responsive behavior
 */
function ResponsiveDemo() {
  const [ref, size] = useResizeObserver<HTMLDivElement>();

  const getBreakpoint = (width: number): string => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  };

  const breakpoint = getBreakpoint(size.width);

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Responsive Breakpoint Detection</h3>
          <Badge variant="default">{breakpoint.toUpperCase()}</Badge>
        </div>

        <div ref={ref} className="rounded-lg border p-6 bg-muted">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Extra Small (xs)</span>
              <Badge variant={breakpoint === 'xs' ? 'default' : 'outline'}>
                &lt; 640px
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Small (sm)</span>
              <Badge variant={breakpoint === 'sm' ? 'default' : 'outline'}>
                640px - 768px
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium (md)</span>
              <Badge variant={breakpoint === 'md' ? 'default' : 'outline'}>
                768px - 1024px
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Large (lg)</span>
              <Badge variant={breakpoint === 'lg' ? 'default' : 'outline'}>
                1024px - 1280px
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Extra Large (xl)</span>
              <Badge variant={breakpoint === 'xl' ? 'default' : 'outline'}>
                ≥ 1280px
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Current width: <strong>{size.width}px</strong>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing callback usage
 */
function CallbackDemo() {
  const [resizeCount, setResizeCount] = React.useState(0);

  const [ref, size] = useResizeObserver<HTMLTextAreaElement>({
    onResize: (newSize) => {
      setResizeCount((prev) => prev + 1);
      console.log('Element resized:', newSize);
    },
  });

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Callback Demo</h3>
          <Badge variant="secondary">Resized {resizeCount} times</Badge>
        </div>

        <textarea
          ref={ref}
          className="w-full min-h-[200px] rounded-lg border p-4 resize"
          placeholder="Drag the bottom-right corner to resize this textarea..."
          style={{ resize: 'both' }}
        />

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Width</p>
              <p className="text-xl font-bold">{size.width}px</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Height</p>
              <p className="text-xl font-bold">{size.height}px</p>
            </div>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          The callback is triggered every time the textarea is resized. Check the console for
          logs.
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing aspect ratio tracking
 */
function AspectRatioDemo() {
  const [ref, size] = useResizeObserver<HTMLDivElement>();
  const [dimensions, setDimensions] = React.useState({ width: 400, height: 300 });

  const aspectRatio =
    size.height > 0 ? (size.width / size.height).toFixed(2) : '0.00';

  const getOrientation = (): string => {
    if (size.width > size.height) return 'Landscape';
    if (size.width < size.height) return 'Portrait';
    return 'Square';
  };

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Aspect Ratio Tracker</h3>
          <Badge variant="default">{getOrientation()}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <label className="text-sm w-16">Width:</label>
            <input
              type="range"
              min="200"
              max="800"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions((prev) => ({ ...prev, width: Number(e.target.value) }))
              }
              className="flex-1"
            />
            <span className="text-sm w-16 text-right">{dimensions.width}px</span>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm w-16">Height:</label>
            <input
              type="range"
              min="200"
              max="800"
              value={dimensions.height}
              onChange={(e) =>
                setDimensions((prev) => ({ ...prev, height: Number(e.target.value) }))
              }
              className="flex-1"
            />
            <span className="text-sm w-16 text-right">{dimensions.height}px</span>
          </div>
        </div>

        <div
          ref={ref}
          className="rounded-lg border bg-gradient-to-br from-blue-500 to-purple-500 mx-auto"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white">
            <p className="text-3xl font-bold">{aspectRatio}</p>
            <p className="text-sm opacity-90">Aspect Ratio</p>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Dimensions: {size.width} × {size.height} pixels
          </p>
          <p className="text-xs text-muted-foreground">
            Use the sliders to adjust the size
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing multiple instances
 */
function MultipleInstancesDemo() {
  const [ref1, size1] = useResizeObserver<HTMLDivElement>();
  const [ref2, size2] = useResizeObserver<HTMLDivElement>();
  const [ref3, size3] = useResizeObserver<HTMLDivElement>();

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h3 className="text-lg font-semibold text-center">Multiple Independent Observers</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">Box 1</h4>
            <div
              ref={ref1}
              className="rounded-lg border bg-red-500/20 p-4 min-h-[150px] resize overflow-auto"
              style={{ resize: 'both' }}
            >
              <p className="text-sm text-center">
                {size1.width} × {size1.height}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">Box 2</h4>
            <div
              ref={ref2}
              className="rounded-lg border bg-green-500/20 p-4 min-h-[150px] resize overflow-auto"
              style={{ resize: 'both' }}
            >
              <p className="text-sm text-center">
                {size2.width} × {size2.height}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">Box 3</h4>
            <div
              ref={ref3}
              className="rounded-lg border bg-blue-500/20 p-4 min-h-[150px] resize overflow-auto"
              style={{ resize: 'both' }}
            >
              <p className="text-sm text-center">
                {size3.width} × {size3.height}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Each box has its own independent resize observer
      </p>
    </div>
  );
}

const meta: Meta<typeof UseResizeObserverDemo> = {
  title: 'Hooks/useResizeObserver',
  component: UseResizeObserverDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that observes size changes of an element using the ResizeObserver API. Returns the current dimensions and optionally calls a callback on resize. Perfect for responsive layouts, dynamic sizing, and viewport tracking.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseResizeObserverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useResizeObserver hook showing real-time dimension tracking.',
      },
    },
  },
};

export const ResponsiveBreakpoints: Story = {
  render: () => <ResponsiveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Using useResizeObserver to detect responsive breakpoints and adapt UI accordingly.',
      },
    },
  },
};

export const WithCallback: Story = {
  render: () => <CallbackDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how to use the optional callback parameter to react to size changes.',
      },
    },
  },
};

export const AspectRatioTracking: Story = {
  render: () => <AspectRatioDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Tracking aspect ratio and orientation changes using useResizeObserver.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => <MultipleInstancesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useResizeObserver hook working simultaneously.',
      },
    },
  },
};
