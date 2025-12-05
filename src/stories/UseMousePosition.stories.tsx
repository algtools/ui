import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, useRef, useEffect } from 'react';
import { MousePointer, Move, Crosshair as CrosshairIcon, Zap, Timer, Sparkles } from 'lucide-react';

import { useMousePosition } from '../hooks/use-mouse-position';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component showing basic mouse position tracking
 */
function BasicMousePositionDemo() {
  const { x, y, position } = useMousePosition();

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useMousePosition Hook</h3>
          <Badge variant="default">
            <MousePointer className="mr-1 h-3 w-3" />
            Tracking
          </Badge>
        </div>

        <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎯</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">X Position</div>
                  <div className="text-2xl font-bold">{x}px</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Y Position</div>
                  <div className="text-2xl font-bold">{y}px</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Move your mouse around to track position
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground bg-muted/50 rounded p-2">
          Position: ({position.x}, {position.y})
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing debounced mouse position tracking
 */
function DebouncedMousePositionDemo() {
  const immediate = useMousePosition();
  const debounced = useMousePosition({ debounceMs: 300 });

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Debounced Tracking</h3>
          <Badge variant="outline">
            <Timer className="mr-1 h-3 w-3" />
            300ms delay
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Debouncing updates position only after the mouse stops moving
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold">Immediate</span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {immediate.x}, {immediate.y}
                </div>
                <div className="text-xs text-muted-foreground">Updates instantly</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold">Debounced</span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {debounced.x}, {debounced.y}
                </div>
                <div className="text-xs text-muted-foreground">Updates after 300ms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Move your mouse rapidly to see the difference between immediate and debounced updates
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing throttled mouse position tracking
 */
function ThrottledMousePositionDemo() {
  const immediate = useMousePosition();
  const throttled = useMousePosition({ throttleMs: 100 });

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Throttled Tracking</h3>
          <Badge variant="outline">
            <Zap className="mr-1 h-3 w-3" />
            100ms interval
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Throttling limits updates to at most once per interval
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold">Immediate</span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {immediate.x}, {immediate.y}
                </div>
                <div className="text-xs text-muted-foreground">Every movement</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Timer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-semibold">Throttled</span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {throttled.x}, {throttled.y}
                </div>
                <div className="text-xs text-muted-foreground">Max 10 updates/sec</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Move your mouse quickly to see throttling in action (updates limited to 100ms intervals)
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing cursor follower effect
 */
function CursorFollowerDemo() {
  const { x, y } = useMousePosition({ throttleMs: 16 }); // ~60fps
  const containerRef = useRef<HTMLDivElement>(null);
  const [relativePos, setRelativePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      // Only update if mouse is within container bounds
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        setRelativePos({ x: relX, y: relY });
      }
    }
  }, [x, y]);

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cursor Follower</h3>
          <Badge variant="outline">
            <Move className="mr-1 h-3 w-3" />
            Smooth tracking
          </Badge>
        </div>

        <div
          ref={containerRef}
          className="relative rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 h-64 overflow-hidden"
        >
          <div
            className="absolute w-8 h-8 rounded-full bg-primary/70 backdrop-blur-sm border-2 border-primary shadow-lg transition-all duration-150 ease-out pointer-events-none"
            style={{
              left: `${relativePos.x}px`,
              top: `${relativePos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            <div className="text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Move your mouse in this area</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Container position: ({Math.round(relativePos.x)}, {Math.round(relativePos.y)}) • Throttled
          at 16ms (~60fps)
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing mouse trail effect
 */
function MouseTrailDemo() {
  const { x, y } = useMousePosition({ throttleMs: 16 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      // Only add to trail if mouse is within container bounds
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        setTrail((prev) => {
          const newTrail = [...prev, { x: relX, y: relY, id: Date.now() }];
          // Keep only last 15 positions
          return newTrail.slice(-15);
        });
      }
    }
  }, [x, y]);

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mouse Trail Effect</h3>
          <Badge variant="outline">
            <Sparkles className="mr-1 h-3 w-3" />
            Visual feedback
          </Badge>
        </div>

        <div
          ref={containerRef}
          className="relative rounded-lg border bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 h-64 overflow-hidden"
        >
          {trail.map((point, index) => {
            const opacity = (index + 1) / trail.length;
            const scale = 0.3 + (index / trail.length) * 0.7;

            return (
              <div
                key={point.id}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 pointer-events-none"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                  transition: 'opacity 0.3s ease-out',
                }}
              />
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            <div className="text-center">
              <MousePointer className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Move your mouse to create a trail</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Trail points: {trail.length}/15
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing coordinate display
 */
function CoordinateDisplayDemo() {
  const [enabled, setEnabled] = useState(true);
  const { x, y } = useMousePosition({ enabled });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Coordinate Display</h3>
          <Button
            size="sm"
            variant={enabled ? 'default' : 'outline'}
            onClick={() => setEnabled(!enabled)}
          >
            {enabled ? 'Disable' : 'Enable'}
          </Button>
        </div>

        <div className="rounded-lg border bg-muted/50 p-6">
          <div className="text-center space-y-4">
            <CrosshairIcon className="h-16 w-16 mx-auto text-muted-foreground" />

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <span className="text-sm text-muted-foreground">X Coordinate:</span>
                <Badge variant="secondary" className="font-mono">
                  {x}px
                </Badge>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-sm text-muted-foreground">Y Coordinate:</span>
                <Badge variant="secondary" className="font-mono">
                  {y}px
                </Badge>
              </div>
            </div>

            {!enabled && (
              <p className="text-xs text-muted-foreground">Tracking is currently disabled</p>
            )}
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Status:{' '}
          <Badge variant={enabled ? 'default' : 'secondary'}>
            {enabled ? 'Active' : 'Disabled'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing drawing canvas
 */
function DrawingCanvasDemo() {
  const { x, y } = useMousePosition({ throttleMs: 16 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDrawing(true);
    setPoints([{ x, y }]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (isDrawing && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const relativeX = x - rect.left;
      const relativeY = y - rect.top;

      if (relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height) {
        setPoints((prev) => [...prev, { x: relativeX, y: relativeY }]);
      }
    }
  }, [x, y, isDrawing]);

  const clearCanvas = () => {
    setPoints([]);
    setIsDrawing(false);
  };

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Drawing Canvas</h3>
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            Clear Canvas
          </Button>
        </div>

        <div
          ref={canvasRef}
          className="relative rounded-lg border bg-white dark:bg-slate-950 h-64 cursor-crosshair overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {points.length > 1 && (
              <polyline
                points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>

          {points.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
              <div className="text-center">
                <MousePointer className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Click and drag to draw</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Points drawn: {points.length}</span>
          <span>
            Status:{' '}
            <Badge variant={isDrawing ? 'default' : 'secondary'}>
              {isDrawing ? 'Drawing' : 'Idle'}
            </Badge>
          </span>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing crosshair overlay
 */
function CrosshairDemo() {
  const { x, y } = useMousePosition({ throttleMs: 10 });

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Crosshair Overlay</h3>
          <Badge variant="outline">
            <CrosshairIcon className="mr-1 h-3 w-3" />
            Precision tracking
          </Badge>
        </div>

        <div className="relative rounded-lg border bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 h-80 overflow-hidden">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-primary/50 pointer-events-none"
            style={{ left: `${x}px` }}
          />
          {/* Horizontal line */}
          <div
            className="absolute left-0 right-0 h-px bg-primary/50 pointer-events-none"
            style={{ top: `${y}px` }}
          />
          {/* Center dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-primary pointer-events-none"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Coordinate label */}
          <div
            className="absolute px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-mono pointer-events-none"
            style={{
              left: `${Math.min(x + 10, 500)}px`,
              top: `${Math.min(y + 10, 300)}px`,
            }}
          >
            ({x}, {y})
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            <div className="text-center">
              <CrosshairIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm opacity-50">Move your mouse in this area</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Precise coordinates: X: {x}px, Y: {y}px
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof BasicMousePositionDemo> = {
  title: 'Hooks/useMousePosition',
  component: BasicMousePositionDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for tracking the mouse cursor position with optional debouncing or throttling. Perfect for cursor effects, drawing applications, coordinate displays, and interactive visualizations that respond to mouse movement. Supports performance optimization through configurable update intervals.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicMousePositionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useMousePosition hook showing real-time mouse coordinate tracking. The hook returns both individual x, y values and a position object.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';

function MyComponent() {
  const { x, y, position } = useMousePosition();

  return (
    <>
      <p>X: {x}px</p>
      <p>Y: {y}px</p>
      <p>Position: ({position.x}, {position.y})</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Debounced: Story = {
  render: () => <DebouncedMousePositionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debouncing delays position updates until the mouse stops moving for the specified duration. This is useful for reducing update frequency and preventing excessive re-renders when continuous tracking is not necessary.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';

function MyComponent() {
  const immediate = useMousePosition();
  const debounced = useMousePosition({ debounceMs: 300 });

  return (
    <>
      <p>Immediate: ({immediate.x}, {immediate.y})</p>
      <p>Debounced (300ms): ({debounced.x}, {debounced.y})</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Throttled: Story = {
  render: () => <ThrottledMousePositionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Throttling limits position updates to at most once per interval. This is ideal for performance-sensitive applications where you need regular updates but want to limit frequency, such as animations or real-time visualizations.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';

function MyComponent() {
  const immediate = useMousePosition();
  const throttled = useMousePosition({ throttleMs: 100 });

  return (
    <>
      <p>Immediate: ({immediate.x}, {immediate.y})</p>
      <p>Throttled (100ms): ({throttled.x}, {throttled.y})</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CursorFollower: Story = {
  render: () => <CursorFollowerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A smooth cursor follower effect using throttled mouse position tracking at 60fps (16ms). Perfect for creating custom cursor effects, spotlight effects, or interactive visual elements that follow the mouse.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';

function MyComponent() {
  const { x, y } = useMousePosition({ throttleMs: 16 }); // 60fps

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-4 h-4 bg-primary rounded-full" />
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MouseTrail: Story = {
  render: () => <MouseTrailDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Creates a trailing effect behind the cursor by maintaining a history of recent positions. This pattern is great for adding visual flair to interactive experiences and making cursor movement more visible.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';
import { useState, useEffect } from 'react';

function MyComponent() {
  const { x, y } = useMousePosition();
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    setTrail((prev) => [...prev, { x, y }].slice(-10));
  }, [x, y]);

  return (
    <>
      {trail.map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: i / trail.length,
          }}
        />
      ))}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const CoordinateDisplay: Story = {
  render: () => <CoordinateDisplayDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Simple coordinate display with enable/disable functionality. Demonstrates conditional tracking using the enabled option, useful for toggling mouse tracking on and off.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [enabled, setEnabled] = useState(true);
  const { x, y } = useMousePosition({ enabled });

  return (
    <>
      <Button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Tracking
      </Button>
      <p>X: {x}px, Y: {y}px</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const DrawingCanvas: Story = {
  render: () => <DrawingCanvasDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive drawing canvas using mouse position tracking. Demonstrates practical use of the hook for drawing applications where mouse coordinates drive visual output.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';
import { useState } from 'react';

function MyComponent() {
  const { x, y } = useMousePosition();
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  return (
    <div
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseMove={() => {
        if (isDrawing) {
          setPoints((prev) => [...prev, { x, y }]);
        }
      }}
    >
      {points.map((point, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-black"
          style={{ left: point.x, top: point.y }}
        />
      ))}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Crosshair: Story = {
  render: () => <CrosshairDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Crosshair overlay showing vertical and horizontal guides following the cursor. Useful for precision tools, image editors, design applications, and any interface requiring accurate coordinate visualization.',
      },
      source: {
        code: `import { useMousePosition } from '@algtools/ui';

function MyComponent() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Vertical line */}
      <div
        className="fixed w-px h-full bg-primary/50 pointer-events-none"
        style={{ left: x }}
      />
      {/* Horizontal line */}
      <div
        className="fixed h-px w-full bg-primary/50 pointer-events-none"
        style={{ top: y }}
      />
      {/* Center point */}
      <div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none"
        style={{ left: x - 4, top: y - 4 }}
      />
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BasicMousePositionDemo />
      <CoordinateDisplayDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useMousePosition hook working simultaneously. Each hook maintains its own state and configuration without interference.',
      },
    },
  },
};
