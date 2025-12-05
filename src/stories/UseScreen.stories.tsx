import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Monitor,
  Smartphone,
  Maximize2,
  Palette,
  Image as ImageIcon,
  RotateCw,
} from 'lucide-react';

import { useScreen } from '../hooks/use-screen';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that displays comprehensive screen information
 */
function ScreenInfoDemo() {
  const screen = useScreen();

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Screen Information</h3>
        <p className="text-sm text-muted-foreground">
          Complete information about your physical screen and display capabilities.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Maximize2 className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Screen Size</p>
            </div>
            <p className="text-lg font-bold">
              {screen.width} × {screen.height}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Available Size</p>
            </div>
            <p className="text-lg font-bold">
              {screen.availWidth} × {screen.availHeight}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Color Depth</p>
            </div>
            <p className="text-lg font-bold">{screen.colorDepth} bits</p>
          </div>

          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              <p className="text-xs font-medium text-muted-foreground">Pixel Ratio</p>
            </div>
            <p className="text-lg font-bold">{screen.pixelRatio}×</p>
          </div>

          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <RotateCw className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Orientation</p>
            </div>
            <p className="text-lg font-bold capitalize">{screen.orientation}</p>
          </div>

          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Touch Support</p>
            </div>
            <p className="text-lg font-bold">{screen.isTouch ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            💡 Tip: Available size excludes OS taskbars and system UI. Try rotating your device to
            see orientation changes!
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
  const { orientation, isPortrait, isLandscape } = useScreen();

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Screen Orientation</h3>
        <p className="text-sm text-muted-foreground">
          Detect and respond to screen orientation changes in real-time.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-6 border-2 rounded" />
              <span className="font-medium">Portrait</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">Height &gt; Width</code>
            </div>
            <Badge variant={isPortrait ? 'default' : 'secondary'}>
              {isPortrait ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 border-2 rounded" />
              <span className="font-medium">Landscape</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">Width &gt; Height</code>
            </div>
            <Badge variant={isLandscape ? 'default' : 'secondary'}>
              {isLandscape ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 rounded" />
              <span className="font-medium">Square</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">Width = Height</code>
            </div>
            <Badge variant={orientation === 'square' ? 'default' : 'secondary'}>
              {orientation === 'square' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Current Orientation: </span>
            <span className="text-primary capitalize">{orientation}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing pixel density detection
 */
function PixelDensityDemo() {
  const { pixelRatio } = useScreen();

  const displayType =
    pixelRatio >= 3
      ? 'Super Retina / 3x'
      : pixelRatio >= 2
        ? 'Retina / 2x'
        : pixelRatio >= 1.5
          ? 'High DPI / 1.5x'
          : 'Standard / 1x';

  const isHighDPI = pixelRatio >= 2;

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pixel Density</h3>
        <p className="text-sm text-muted-foreground">
          Detect high-DPI displays for serving optimized images and assets.
        </p>

        <div className="p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Device Pixel Ratio</p>
              <p className="text-4xl font-bold">{pixelRatio}×</p>
            </div>
            <Badge variant={isHighDPI ? 'default' : 'secondary'} className="text-lg px-4 py-2">
              {displayType}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Standard Display (1x)</span>
              <Badge variant={pixelRatio === 1 ? 'default' : 'outline'}>
                {pixelRatio === 1 ? '✓' : ''}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>High DPI / 1.5x</span>
              <Badge variant={pixelRatio >= 1.5 && pixelRatio < 2 ? 'default' : 'outline'}>
                {pixelRatio >= 1.5 && pixelRatio < 2 ? '✓' : ''}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Retina / 2x</span>
              <Badge variant={pixelRatio >= 2 && pixelRatio < 3 ? 'default' : 'outline'}>
                {pixelRatio >= 2 && pixelRatio < 3 ? '✓' : ''}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Super Retina / 3x</span>
              <Badge variant={pixelRatio >= 3 ? 'default' : 'outline'}>
                {pixelRatio >= 3 ? '✓' : ''}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-2">💡 Image optimization example:</p>
          <code className="text-xs bg-background p-2 rounded block">
            {`const imageSrc = pixelRatio >= 2 ? 'image@2x.png' : 'image.png';`}
          </code>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing touch support detection
 */
function TouchSupportDemo() {
  const { isTouch } = useScreen();

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Touch Support Detection</h3>
        <p className="text-sm text-muted-foreground">
          Detect touch capabilities to optimize interactions for different input methods.
        </p>

        <div className="p-6 border rounded-lg bg-muted/50 text-center">
          <div className="flex justify-center mb-4">
            {isTouch ? (
              <Smartphone className="h-16 w-16 text-primary" aria-label="Touch device" />
            ) : (
              <Monitor className="h-16 w-16 text-primary" aria-label="Non-touch device" />
            )}
          </div>
          <p className="text-2xl font-bold mb-2">{isTouch ? 'Touch Device' : 'Non-Touch Device'}</p>
          <Badge variant="outline" className="text-sm">
            {isTouch
              ? 'Optimized for touch interactions'
              : 'Optimized for mouse/trackpad interactions'}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-1">Recommended Interaction Design:</p>
            <p className="text-xs text-muted-foreground">
              {isTouch
                ? '• Larger touch targets (44×44px minimum)\n• Touch-friendly spacing\n• Swipe gestures\n• Pull-to-refresh'
                : '• Hover states\n• Tooltips on hover\n• Context menus\n• Keyboard shortcuts'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing color depth information
 */
function ColorDepthDemo() {
  const { colorDepth, pixelDepth } = useScreen();

  const colorSupport =
    colorDepth >= 32
      ? 'True Color (16.7M+ colors)'
      : colorDepth >= 24
        ? 'True Color (16.7M colors)'
        : colorDepth >= 16
          ? 'High Color (65K colors)'
          : 'Limited Color';

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Capabilities</h3>
        <p className="text-sm text-muted-foreground">
          Information about your display&apos;s color depth and pixel depth.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Color Depth</p>
            <p className="text-3xl font-bold mb-2">{colorDepth} bits</p>
            <Badge variant="outline" className="text-xs">
              {colorSupport}
            </Badge>
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Pixel Depth</p>
            <p className="text-3xl font-bold mb-2">{pixelDepth} bits</p>
            <Badge variant="outline" className="text-xs">
              Per pixel
            </Badge>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500">
          <p className="text-center text-white font-medium text-sm drop-shadow-lg">
            Your display can show {colorSupport.toLowerCase()}
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof ScreenInfoDemo> = {
  title: 'Hooks/useScreen',
  component: ScreenInfoDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that provides comprehensive screen information including dimensions, color depth, pixel ratio, orientation, and touch support. Perfect for adaptive UI, asset optimization, and device-specific experiences. The hook is SSR-safe and automatically tracks orientation changes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <ScreenInfoDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Display comprehensive screen information including physical dimensions, available space, color depth, pixel ratio, orientation, and touch support capabilities.',
      },
      source: {
        code: `import { useScreen } from '@algtools/ui';

function MyComponent() {
  const screen = useScreen();

  return (
    <>
      <p>Screen Size: {screen.width} × {screen.height}</p>
      <p>Available: {screen.availWidth} × {screen.availHeight}</p>
      <p>Color Depth: {screen.colorDepth} bits</p>
      <p>Pixel Ratio: {screen.pixelRatio}×</p>
      <p>Orientation: {screen.orientation}</p>
      <p>Touch Support: {screen.isTouch ? 'Yes' : 'No'}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Orientation: Story = {
  render: () => <OrientationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detect and respond to screen orientation changes. Particularly useful for mobile devices and responsive layouts that need to adapt to device rotation.',
      },
    },
  },
};

export const PixelDensity: Story = {
  render: () => <PixelDensityDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detect high-DPI displays (Retina, etc.) to serve appropriately sized images and assets. This helps provide crisp visuals on high-resolution screens while saving bandwidth on standard displays.',
      },
    },
  },
};

export const TouchSupport: Story = {
  render: () => <TouchSupportDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detect touch capabilities to optimize UI interactions. Use this to conditionally show touch-friendly controls, adjust spacing, or provide different interaction patterns for touch vs. mouse/keyboard.',
      },
    },
  },
};

export const ColorDepth: Story = {
  render: () => <ColorDepthDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Display information about the screen's color capabilities. This can be useful for graphics-intensive applications that need to adapt to different display capabilities.",
      },
    },
  },
};

export const Combined: Story = {
  render: () => (
    <div className="space-y-6">
      <ScreenInfoDemo />
      <OrientationDemo />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Multiple screen information displays combined. The useScreen hook provides all information in a single call, making it efficient to use across your application.',
      },
    },
  },
};
