import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Eye, Image as ImageIcon, Loader2 } from 'lucide-react';

import { useIntersectionObserver } from '../hooks/use-intersection-observer';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';

/**
 * Demo component showing basic visibility detection
 */
function BasicVisibilityDemo() {
  const { ref, isIntersecting, intersectionRatio } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div className="space-y-4">
      <Card className="p-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Basic Visibility</h3>
            <Badge variant={isIntersecting ? 'default' : 'secondary'}>
              {isIntersecting ? (
                <>
                  <Eye className="mr-1 h-3 w-3" />
                  Visible
                </>
              ) : (
                'Hidden'
              )}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Scroll down to see the target element and watch the visibility state change.
            </p>
            <div className="text-xs text-muted-foreground">
              <strong>Intersection Ratio:</strong> {(intersectionRatio * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </Card>

      {/* Spacer to enable scrolling */}
      <div className="h-[600px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
        <p className="text-sm text-muted-foreground">↓ Scroll down ↓</p>
      </div>

      {/* Target element */}
      <Card
        ref={ref}
        className={`p-6 transition-all duration-300 ${
          isIntersecting ? 'bg-primary/10 border-primary' : 'bg-background'
        }`}
      >
        <div className="text-center space-y-2">
          <Eye className="mx-auto h-8 w-8" />
          <h4 className="font-semibold">Target Element</h4>
          <p className="text-sm text-muted-foreground">
            {isIntersecting ? 'I am visible!' : 'I am hidden!'}
          </p>
        </div>
      </Card>

      {/* Spacer after */}
      <div className="h-[400px]" />
    </div>
  );
}

/**
 * Demo component showing lazy loading of images
 */
function LazyLoadingDemo() {
  const images = [
    { id: 1, src: 'https://picsum.photos/400/300?random=1', alt: 'Image 1' },
    { id: 2, src: 'https://picsum.photos/400/300?random=2', alt: 'Image 2' },
    { id: 3, src: 'https://picsum.photos/400/300?random=3', alt: 'Image 3' },
    { id: 4, src: 'https://picsum.photos/400/300?random=4', alt: 'Image 4' },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Lazy Loading Images</h3>
        <p className="text-sm text-muted-foreground">
          Images load only when they enter the viewport. Scroll down to trigger lazy loading.
        </p>
      </Card>

      {images.map((image) => (
        <LazyImage key={image.id} src={image.src} alt={image.alt} />
      ))}

      <div className="h-[200px]" />
    </div>
  );
}

/**
 * Individual lazy-loaded image component
 */
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px', // Start loading 50px before entering viewport
  });

  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isIntersecting, hasLoaded]);

  return (
    <Card ref={ref} className="overflow-hidden">
      {hasLoaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-[300px] object-cover" loading="lazy" />
      ) : (
        <Skeleton className="w-full h-[300px] flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </Skeleton>
      )}
      <div className="p-4">
        <Badge variant={hasLoaded ? 'default' : 'secondary'}>
          {hasLoaded ? 'Loaded' : 'Waiting...'}
        </Badge>
      </div>
    </Card>
  );
}

/**
 * Demo component showing scroll animations
 */
function ScrollAnimationDemo() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Scroll Animations</h3>
        <p className="text-sm text-muted-foreground">
          Elements fade in and scale up as they enter the viewport using intersection ratio.
        </p>
      </Card>

      <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
        <p className="text-sm text-muted-foreground">↓ Scroll down ↓</p>
      </div>

      {[1, 2, 3, 4].map((item) => (
        <AnimatedCard key={item} index={item} />
      ))}

      <div className="h-[200px]" />
    </div>
  );
}

/**
 * Individual animated card component
 */
function AnimatedCard({ index }: { index: number }) {
  const { ref, intersectionRatio } = useIntersectionObserver({
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  return (
    <Card
      ref={ref}
      className="p-6 transition-all duration-500"
      style={{
        opacity: intersectionRatio,
        transform: `translateY(${(1 - intersectionRatio) * 20}px) scale(${
          0.95 + intersectionRatio * 0.05
        })`,
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Card {index}</h4>
        <Badge variant="outline">{(intersectionRatio * 100).toFixed(0)}%</Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        This card fades in and slides up as it enters the viewport.
      </p>
    </Card>
  );
}

/**
 * Demo component showing infinite scroll
 */
function InfiniteScrollDemo() {
  const [items, setItems] = React.useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 1.0,
  });

  React.useEffect(() => {
    if (isIntersecting && !isLoading && hasMore) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setItems((prev) => {
          const newItems = Array.from({ length: 5 }, (_, i) => prev.length + i + 1);
          return [...prev, ...newItems];
        });
        setIsLoading(false);

        // Stop after 30 items
        if (items.length >= 25) {
          setHasMore(false);
        }
      }, 1000);
    }
  }, [isIntersecting, isLoading, hasMore, items.length]);

  return (
    <div className="space-y-4 max-w-2xl">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Infinite Scroll</h3>
        <p className="text-sm text-muted-foreground">
          New items load automatically when you scroll to the bottom.
        </p>
      </Card>

      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item} className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                {item}
              </div>
              <div>
                <p className="font-medium">Item {item}</p>
                <p className="text-xs text-muted-foreground">Some description here</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <Card ref={ref} className="p-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading more items...</span>
              </>
            ) : (
              <span className="text-sm">Scroll to load more</span>
            )}
          </div>
        </Card>
      )}

      {!hasMore && (
        <Card className="p-4">
          <p className="text-center text-sm text-muted-foreground">No more items to load</p>
        </Card>
      )}
    </div>
  );
}

/**
 * Demo component showing visibility tracking
 */
function VisibilityTrackingDemo() {
  const sections = [
    { id: 'section1', title: 'Section 1', color: 'bg-blue-500/10 border-blue-500' },
    { id: 'section2', title: 'Section 2', color: 'bg-green-500/10 border-green-500' },
    { id: 'section3', title: 'Section 3', color: 'bg-purple-500/10 border-purple-500' },
    { id: 'section4', title: 'Section 4', color: 'bg-orange-500/10 border-orange-500' },
  ];

  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(new Set());

  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="p-6 sticky top-4 z-10">
        <h3 className="text-lg font-semibold mb-2">Visibility Tracking</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Tracks which sections are currently visible in the viewport.
        </p>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Badge
              key={section.id}
              variant={visibleSections.has(section.id) ? 'default' : 'outline'}
            >
              {section.title}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
        <p className="text-sm text-muted-foreground">↓ Scroll down ↓</p>
      </div>

      {sections.map((section) => (
        <TrackedSection
          key={section.id}
          id={section.id}
          title={section.title}
          color={section.color}
          onVisibilityChange={(id, isVisible) => {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              if (isVisible) {
                newSet.add(id);
              } else {
                newSet.delete(id);
              }
              return newSet;
            });
          }}
        />
      ))}

      <div className="h-[200px]" />
    </div>
  );
}

/**
 * Individual tracked section component
 */
function TrackedSection({
  id,
  title,
  color,
  onVisibilityChange,
}: {
  id: string;
  title: string;
  color: string;
  onVisibilityChange: (id: string, isVisible: boolean) => void;
}) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5, // Consider visible when 50% is in viewport
    onChange: (entry) => {
      onVisibilityChange(id, entry.isIntersecting);
    },
  });

  return (
    <Card ref={ref} className={`p-6 min-h-[300px] ${color} border-2`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold">{title}</h4>
        <Badge variant={isIntersecting ? 'default' : 'secondary'}>
          {isIntersecting ? 'Visible' : 'Hidden'}
        </Badge>
      </div>
      <p className="text-muted-foreground">
        This section is being tracked. When more than 50% of it is visible in the viewport, it will
        be marked as active in the header above.
      </p>
    </Card>
  );
}

/**
 * Demo component showing trigger-once behavior
 */
function TriggerOnceDemo() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });

  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);

  React.useEffect(() => {
    if (isIntersecting && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isIntersecting, hasBeenVisible]);

  return (
    <div className="space-y-4 max-w-2xl">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Trigger Once</h3>
            <Badge variant={hasBeenVisible ? 'default' : 'secondary'}>
              {hasBeenVisible ? 'Triggered' : 'Not Triggered'}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            This pattern is useful when you want to trigger an action only once (e.g., analytics,
            loading data). Scroll down to trigger the animation.
          </p>
        </div>
      </Card>

      <div className="h-[600px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
        <p className="text-sm text-muted-foreground">↓ Scroll down ↓</p>
      </div>

      <Card
        ref={ref}
        className={`p-8 transition-all duration-700 ${
          hasBeenVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <h4 className="text-xl font-semibold">You found me!</h4>
          <p className="text-muted-foreground">
            This animation triggered once when the element first entered the viewport. Scrolling
            back up won&apos;t hide it again.
          </p>
        </div>
      </Card>

      <div className="h-[400px]" />
    </div>
  );
}

const meta: Meta<typeof BasicVisibilityDemo> = {
  title: 'Hooks/useIntersectionObserver',
  component: BasicVisibilityDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A custom hook that uses the Intersection Observer API to detect when an element enters or leaves the viewport. Perfect for lazy loading images, infinite scrolling, scroll animations, and visibility tracking.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicVisibility: Story = {
  render: () => <BasicVisibilityDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage showing element visibility detection and intersection ratio tracking.',
      },
    },
  },
};

export const LazyLoading: Story = {
  render: () => <LazyLoadingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Lazy loading images as they enter the viewport. Images are loaded with a rootMargin to preload slightly before they become visible.',
      },
    },
  },
};

export const ScrollAnimations: Story = {
  render: () => <ScrollAnimationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Smooth scroll-based animations using intersection ratio. Elements fade in and slide up as they enter the viewport.',
      },
    },
  },
};

export const InfiniteScroll: Story = {
  render: () => <InfiniteScrollDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Infinite scroll implementation that automatically loads more content when the user scrolls to the bottom.',
      },
    },
  },
};

export const VisibilityTracking: Story = {
  render: () => <VisibilityTrackingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Track multiple sections and highlight which ones are currently visible in the viewport.',
      },
    },
  },
};

export const TriggerOnce: Story = {
  render: () => <TriggerOnceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Trigger an action only once when an element first becomes visible. Useful for analytics, one-time animations, or lazy data loading.',
      },
    },
  },
};
