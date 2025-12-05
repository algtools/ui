import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useRef } from 'react';
import { Eye, Heart, Info, Star, Zap } from 'lucide-react';

import { useHover } from '../hooks/use-hover';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component showing basic hover detection
 */
function BasicHoverDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(cardRef as React.RefObject<HTMLDivElement>);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useHover Hook Demo</h3>
          <Badge variant={isHovered ? 'default' : 'secondary'}>
            {isHovered ? (
              <>
                <Eye className="mr-1 h-3 w-3" />
                Hovering
              </>
            ) : (
              <>
                <Eye className="mr-1 h-3 w-3 opacity-50" />
                Not hovering
              </>
            )}
          </Badge>
        </div>

        <div
          ref={cardRef}
          className={`rounded-lg border p-6 text-center transition-all duration-200 ${
            isHovered ? 'border-primary bg-primary/10 scale-105' : 'border-muted bg-muted/50'
          }`}
        >
          <p className="text-2xl font-bold mb-2">{isHovered ? '👋 Hello!' : '🖱️ Hover me'}</p>
          <p className="text-sm text-muted-foreground">
            {isHovered ? 'The hook detected your hover!' : 'Move your mouse over this area'}
          </p>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Hover state: <strong>{isHovered ? 'true' : 'false'}</strong>
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing hover with enter delay (tooltip-like)
 */
function DelayedTooltipDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef as React.RefObject<HTMLButtonElement>, { delayEnter: 500 });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delayed Tooltip</h3>
        <p className="text-sm text-muted-foreground">Hover for 500ms to show the tooltip</p>

        <div className="relative flex justify-center py-4">
          <Button ref={buttonRef} variant="outline" className="relative">
            <Info className="mr-2 h-4 w-4" />
            Hover me
          </Button>

          {isHovered && (
            <div className="absolute top-full mt-2 w-64 rounded-lg border bg-popover p-3 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
              <p className="text-xs text-popover-foreground">
                <strong>Tooltip Content:</strong> This tooltip only appears after hovering for
                500ms. Perfect for avoiding accidental tooltip triggers!
              </p>
            </div>
          )}
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Tooltip:{' '}
          <Badge variant={isHovered ? 'default' : 'secondary'}>
            {isHovered ? 'Visible' : 'Hidden'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing hover with both delays (smooth tooltip)
 */
function SmoothTooltipDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef as React.RefObject<HTMLButtonElement>, {
    delayEnter: 300,
    delayLeave: 200,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Smooth Tooltip</h3>
        <p className="text-sm text-muted-foreground">
          300ms enter delay, 200ms leave delay for smooth UX
        </p>

        <div className="relative flex justify-center py-4">
          <Button ref={buttonRef} variant="default">
            <Star className="mr-2 h-4 w-4" />
            Hover me
          </Button>

          {isHovered && (
            <div className="absolute top-full mt-2 w-72 rounded-lg border bg-popover p-4 shadow-xl animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Pro Tip!</p>
                  <p className="text-xs text-muted-foreground">
                    The leave delay prevents the tooltip from disappearing immediately when you
                    accidentally move your mouse away, creating a smoother experience.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Tooltip:{' '}
          <Badge variant={isHovered ? 'default' : 'secondary'}>
            {isHovered ? 'Visible' : 'Hidden'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing hover effects on cards
 */
function CardHoverDemo() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const isCard1Hovered = useHover(card1Ref as React.RefObject<HTMLDivElement>);
  const isCard2Hovered = useHover(card2Ref as React.RefObject<HTMLDivElement>);
  const isCard3Hovered = useHover(card3Ref as React.RefObject<HTMLDivElement>);

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Cards</h3>
        <p className="text-sm text-muted-foreground">Hover over cards to see interactive effects</p>

        <div className="grid grid-cols-3 gap-4">
          <div
            ref={card1Ref}
            className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
              isCard1Hovered
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20 shadow-lg scale-105'
                : 'border-muted hover:border-red-300'
            }`}
          >
            <Heart
              className={`h-8 w-8 mb-2 transition-colors ${
                isCard1Hovered ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
              }`}
            />
            <h4 className="font-semibold text-sm mb-1">Likes</h4>
            <p className="text-2xl font-bold">1.2k</p>
          </div>

          <div
            ref={card2Ref}
            className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
              isCard2Hovered
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 shadow-lg scale-105'
                : 'border-muted hover:border-yellow-300'
            }`}
          >
            <Star
              className={`h-8 w-8 mb-2 transition-colors ${
                isCard2Hovered ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'
              }`}
            />
            <h4 className="font-semibold text-sm mb-1">Stars</h4>
            <p className="text-2xl font-bold">856</p>
          </div>

          <div
            ref={card3Ref}
            className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
              isCard3Hovered
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg scale-105'
                : 'border-muted hover:border-blue-300'
            }`}
          >
            <Zap
              className={`h-8 w-8 mb-2 transition-colors ${
                isCard3Hovered ? 'text-blue-500 fill-blue-500' : 'text-muted-foreground'
              }`}
            />
            <h4 className="font-semibold text-sm mb-1">Power</h4>
            <p className="text-2xl font-bold">99%</p>
          </div>
        </div>

        <div className="flex gap-2 text-xs text-muted-foreground justify-center">
          <Badge variant={isCard1Hovered ? 'default' : 'outline'}>Card 1</Badge>
          <Badge variant={isCard2Hovered ? 'default' : 'outline'}>Card 2</Badge>
          <Badge variant={isCard3Hovered ? 'default' : 'outline'}>Card 3</Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing hover-triggered content reveal
 */
function ContentRevealDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(containerRef as React.RefObject<HTMLDivElement>, { delayEnter: 200 });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Reveal</h3>
        <p className="text-sm text-muted-foreground">Hover to reveal additional information</p>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 cursor-pointer transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-500/20 p-3">
              <Info className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Feature Preview</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This is a brief description of the feature.
              </p>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t pt-3 mt-2">
                  <p className="text-xs text-muted-foreground mb-2">
                    <strong>Additional Details:</strong>
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Smooth animations and transitions</li>
                    <li>• Delayed hover detection (200ms)</li>
                    <li>• Perfect for progressive disclosure</li>
                    <li>• Clean and accessible design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Details:{' '}
          <Badge variant={isHovered ? 'default' : 'secondary'}>
            {isHovered ? 'Revealed' : 'Hidden'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing button hover effects
 */
function ButtonHoverDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef as React.RefObject<HTMLButtonElement>);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Hover State</h3>
        <p className="text-sm text-muted-foreground">
          Track hover state for custom button interactions
        </p>

        <div className="flex flex-col items-center gap-4 py-4">
          <Button
            ref={buttonRef}
            size="lg"
            className={`transition-all duration-200 ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
          >
            <Heart
              className={`mr-2 h-5 w-5 transition-all duration-200 ${
                isHovered ? 'fill-current scale-110' : ''
              }`}
            />
            {isHovered ? 'Thanks!' : 'Click to Like'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm">
              {isHovered ? '✨ Button is being hovered!' : 'Move your mouse over the button'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isHovered ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                }`}
              />
              <span className="text-xs text-muted-foreground">{isHovered ? 'Active' : 'Idle'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing image zoom on hover
 */
function ImageZoomDemo() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(imageContainerRef as React.RefObject<HTMLDivElement>, {
    delayEnter: 100,
    delayLeave: 150,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Image Hover Zoom</h3>
        <p className="text-sm text-muted-foreground">Hover to zoom the image</p>

        <div className="relative overflow-hidden rounded-lg border">
          <div
            ref={imageContainerRef}
            className="relative w-full h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 cursor-pointer overflow-hidden"
          >
            <div
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out ${
                isHovered ? 'scale-125' : 'scale-100'
              }`}
            >
              <div className="text-white text-center">
                <div className="text-6xl mb-2">🎨</div>
                <p className="font-semibold text-lg">Beautiful Gradient</p>
              </div>
            </div>
          </div>

          {isHovered && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 animate-in slide-in-from-bottom-2 duration-200">
              <p className="text-xs font-medium">Zoomed In</p>
              <p className="text-xs opacity-80">useHover makes this easy!</p>
            </div>
          )}
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Zoom:{' '}
          <Badge variant={isHovered ? 'default' : 'secondary'}>
            {isHovered ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof BasicHoverDemo> = {
  title: 'Hooks/useHover',
  component: BasicHoverDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for detecting hover state on elements with optional enter and leave delays. Perfect for tooltips, hover effects, interactive cards, and any UI that needs to respond to mouse hover. Supports configurable delays to prevent accidental triggers and create smooth user experiences.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicHoverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useHover hook showing immediate hover detection. The hook returns a boolean that tracks whether the element is currently being hovered.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';

function MyComponent() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(cardRef);

  return (
    <div
      ref={cardRef}
      className={isHovered ? 'border-primary bg-primary/10' : 'border-muted bg-muted/50'}
    >
      <p>{isHovered ? 'Hovering!' : 'Hover me'}</p>
      <p>Hover state: {isHovered ? 'true' : 'false'}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const DelayedTooltip: Story = {
  render: () => <DelayedTooltipDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip that only appears after hovering for 500ms. This prevents accidental tooltip triggers when the user quickly moves their mouse across the screen.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef, { delayEnter: 500 });

  return (
    <>
      <Button ref={buttonRef}>Hover me</Button>
      {isHovered && (
        <div className="tooltip">
          This tooltip only appears after hovering for 500ms
        </div>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const SmoothTooltip: Story = {
  render: () => <SmoothTooltipDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with both enter and leave delays for the smoothest user experience. The enter delay prevents accidental triggers, while the leave delay prevents the tooltip from disappearing when the user briefly moves their mouse away.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef, {
    delayEnter: 300,
    delayLeave: 200,
  });

  return (
    <>
      <Button ref={buttonRef}>Hover me</Button>
      {isHovered && (
        <div className="tooltip">
          Smooth tooltip with enter and leave delays
        </div>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const InteractiveCards: Story = {
  render: () => <CardHoverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Multiple cards using independent useHover hooks. Each card responds to hover with custom animations and styling, perfect for dashboards and grid layouts.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';

function MyComponent() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const isHovered1 = useHover(card1Ref);
  const isHovered2 = useHover(card2Ref);
  const isHovered3 = useHover(card3Ref);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div
        ref={card1Ref}
        className={isHovered1 ? 'scale-105 shadow-lg' : ''}
      >
        Card 1
      </div>
      <div
        ref={card2Ref}
        className={isHovered2 ? 'scale-105 shadow-lg' : ''}
      >
        Card 2
      </div>
      <div
        ref={card3Ref}
        className={isHovered3 ? 'scale-105 shadow-lg' : ''}
      >
        Card 3
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ContentReveal: Story = {
  render: () => <ContentRevealDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Progressive disclosure pattern where additional content is revealed on hover. Great for keeping interfaces clean while making detailed information easily accessible.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';

function MyComponent() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(cardRef);

  return (
    <div ref={cardRef}>
      <p>Basic Content</p>
      {isHovered && (
        <div className="additional-content">
          <p>Additional details revealed on hover</p>
          <p>More information here</p>
        </div>
      )}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ButtonHover: Story = {
  render: () => <ButtonHoverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Custom button hover effects that go beyond CSS :hover. Track hover state for complex interactions, animations, or analytics.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(buttonRef);

  return (
    <Button
      ref={buttonRef}
      className={isHovered ? 'scale-110 shadow-lg' : ''}
      onMouseEnter={() => console.log('Button hovered')}
    >
      {isHovered ? 'Hovering!' : 'Hover me'}
    </Button>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ImageZoom: Story = {
  render: () => <ImageZoomDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Image zoom effect on hover with smooth transitions. The delays provide a polished feel by preventing jarring state changes.',
      },
      source: {
        code: `import { useHover } from '@algtools/ui';
import { useRef } from 'react';

function MyComponent() {
  const imageRef = useRef<HTMLImageElement>(null);
  const isHovered = useHover(imageRef, {
    delayEnter: 200,
    delayLeave: 300,
  });

  return (
    <img
      ref={imageRef}
      src="/image.jpg"
      alt="Hover to zoom"
      className={\`transition-transform duration-300 \${isHovered ? 'scale-110' : 'scale-100'}\`}
    />
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
      <BasicHoverDemo />
      <DelayedTooltipDemo />
      <ButtonHoverDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useHover hook working simultaneously without interference. Each hook maintains its own state and delays.',
      },
    },
  },
};
