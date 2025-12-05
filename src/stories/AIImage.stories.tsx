import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AIImage } from '@/components/ui/ai-image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'AI/AIImage',
  component: AIImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AI-specific Image component with loading states, error handling, zoom/preview, and download capabilities. Perfect for displaying AI-generated images with enhanced UX features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    aspectRatio: {
      control: 'text',
      description: 'Optional aspect ratio (e.g., "16/9", "1/1", "4/3")',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the image is currently loading',
    },
    error: {
      control: 'text',
      description: 'Error message if image failed to load',
    },
    showZoom: {
      control: 'boolean',
      description: 'Whether to show the zoom/preview button',
    },
    showDownload: {
      control: 'boolean',
      description: 'Whether to show the download button',
    },
    downloadFilename: {
      control: 'text',
      description: 'Custom filename for downloads',
    },
    caption: {
      control: 'text',
      description: 'Optional caption for the image',
    },
    showControlsOnHover: {
      control: 'boolean',
      description: 'Whether to show image controls on hover',
    },
  },
} satisfies Meta<typeof AIImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample AI-generated images (using Unsplash for demo purposes)
const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=800&fit=crop',
  square: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop',
  abstract: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
};

export const Default: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'AI generated landscape',
    className: 'w-[600px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default AI image component with basic image display functionality.',
      },
    },
  },
};

export const WithCaption: Story = {
  args: {
    src: sampleImages.abstract,
    alt: 'AI generated abstract art',
    caption: 'Generated with DALL-E 3 • "Colorful abstract technology visualization"',
    className: 'w-[600px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with caption text displayed below the image, useful for showing generation metadata or descriptions.',
      },
    },
  },
};

export const WithZoom: Story = {
  args: {
    src: sampleImages.nature,
    alt: 'AI generated nature scene',
    showZoom: true,
    caption: 'Click the zoom button to view full size',
    className: 'w-[600px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with zoom functionality enabled, allowing users to preview the full-size image in a modal overlay.',
      },
    },
  },
};

export const WithDownload: Story = {
  args: {
    src: sampleImages.portrait,
    alt: 'AI generated portrait',
    showDownload: true,
    downloadFilename: 'ai-portrait.png',
    caption: 'Click the download button to save',
    className: 'w-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with download functionality, allowing users to save the generated image with a custom filename.',
      },
    },
  },
};

export const WithAllFeatures: Story = {
  args: {
    src: sampleImages.square,
    alt: 'AI generated futuristic scene',
    showZoom: true,
    showDownload: true,
    downloadFilename: 'ai-generated-art.png',
    caption: 'Full-featured AI image with zoom and download',
    className: 'w-[600px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete AI image component showcasing all available features including zoom, download, and caption functionality.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Loading image',
    isLoading: true,
    className: 'w-[600px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image in loading state, displaying a loading indicator while the image is being generated or fetched.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    src: 'https://invalid-url.example.com/image.jpg',
    alt: 'Failed to load',
    error: 'Network error: Unable to fetch image',
    className: 'w-[600px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image displaying an error state when the image fails to load, showing a user-friendly error message.',
      },
    },
  },
};

export const CustomErrorFallback: Story = {
  args: {
    src: 'https://invalid-url.example.com/image.jpg',
    alt: 'Failed to load',
    error: 'Error',
    fallback: (
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">🤖 AI Generation Failed</p>
        <p className="text-sm text-muted-foreground">
          The AI image could not be generated. Please try again.
        </p>
      </div>
    ),
    className: 'w-[600px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with a custom error fallback component, allowing for branded error messaging when image generation fails.',
      },
    },
  },
};

export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Square (1:1)</p>
        <AIImage src={sampleImages.square} alt="Square" aspectRatio="1/1" className="w-[300px]" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Landscape (16:9)</p>
        <AIImage
          src={sampleImages.landscape}
          alt="Landscape"
          aspectRatio="16/9"
          className="w-[400px]"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Portrait (4:5)</p>
        <AIImage
          src={sampleImages.portrait}
          alt="Portrait"
          aspectRatio="4/5"
          className="w-[300px]"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AI images with different aspect ratio configurations, demonstrating how the component maintains consistent proportions across various formats.',
      },
    },
  },
};

export const ControlsAlwaysVisible: Story = {
  args: {
    src: sampleImages.abstract,
    alt: 'AI generated abstract',
    showZoom: true,
    showDownload: true,
    showControlsOnHover: false,
    caption: 'Controls are always visible',
    className: 'w-[600px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with controls always visible instead of showing on hover, useful for accessibility or when controls should be persistently available.',
      },
    },
  },
};

export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <AIImage
        src={sampleImages.landscape}
        alt="Landscape"
        showZoom
        showDownload
        caption="Mountain Vista"
        aspectRatio="4/3"
      />
      <AIImage
        src={sampleImages.abstract}
        alt="Abstract"
        showZoom
        showDownload
        caption="Digital Dreams"
        aspectRatio="4/3"
      />
      <AIImage
        src={sampleImages.nature}
        alt="Nature"
        showZoom
        showDownload
        caption="Forest Path"
        aspectRatio="4/3"
      />
      <AIImage
        src={sampleImages.square}
        alt="Technology"
        showZoom
        showDownload
        caption="Tech Future"
        aspectRatio="4/3"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple AI images displayed in a grid gallery layout, each with zoom and download capabilities.',
      },
    },
  },
};

export const LoadingSequence: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
      <div className="space-y-4">
        <AIImage
          src={sampleImages.landscape}
          alt="Simulated loading"
          isLoading={isLoading}
          error={hasError ? 'Failed to generate image' : null}
          className="w-[600px] h-[400px]"
        />
        <div className="flex gap-2">
          <Button onClick={() => setIsLoading(!isLoading)} variant="outline">
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          <Button onClick={() => setHasError(!hasError)} variant="outline">
            {hasError ? 'Clear Error' : 'Simulate Error'}
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of loading and error states, allowing users to toggle between loading and error conditions.',
      },
    },
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(sampleImages).map(([key, src]) => (
          <AIImage
            key={key}
            src={src}
            alt={`AI generated ${key}`}
            showZoom
            showDownload
            caption={`AI Generated - ${key}`}
            aspectRatio="1/1"
          />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AI images displayed in a responsive grid layout that adapts to different screen sizes, from single column on mobile to three columns on large screens.',
      },
    },
  },
};

export const ChatMessage: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-start gap-3">
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
          U
        </div>
        <div className="flex-1">
          <p className="text-sm bg-muted rounded-lg p-3">
            Generate an image of a serene mountain landscape at sunset
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
          AI
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm">Here&apos;s your generated image:</p>
          <AIImage
            src={sampleImages.landscape}
            alt="AI generated mountain landscape"
            showZoom
            showDownload
            caption="Mountain sunset landscape • Generated with DALL-E 3"
            aspectRatio="16/9"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AI image component integrated into a chat message interface, demonstrating how it appears in conversational AI contexts.',
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Small (200px)</p>
        <AIImage
          src={sampleImages.square}
          alt="Small image"
          showZoom
          className="w-[200px]"
          aspectRatio="1/1"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (400px)</p>
        <AIImage
          src={sampleImages.landscape}
          alt="Medium image"
          showZoom
          showDownload
          className="w-[400px]"
          aspectRatio="16/9"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large (800px)</p>
        <AIImage
          src={sampleImages.nature}
          alt="Large image"
          showZoom
          showDownload
          caption="Large format AI-generated image"
          className="w-[800px]"
          aspectRatio="16/9"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AI images displayed in different size configurations, from small thumbnails to large format displays.',
      },
    },
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    return (
      <div className="space-y-4">
        <AIImage
          src={sampleImages.abstract}
          alt="Image with callbacks"
          showZoom
          showDownload
          caption="Image with event callbacks"
          onLoad={() => addLog('Image loaded successfully')}
          onImageError={(error) => addLog(`Error: ${error.message}`)}
          className="w-[600px]"
        />
        <div className="bg-muted rounded-lg p-4 max-w-[600px]">
          <p className="text-sm font-semibold mb-2">Event Log:</p>
          <div className="space-y-1 max-h-32 overflow-auto">
            {logs.length === 0 ? (
              <p className="text-xs text-muted-foreground">No events yet...</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-xs font-mono">
                  {log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'AI image with event callbacks for load and error events, demonstrating how to handle image lifecycle events programmatically.',
      },
    },
  },
};
