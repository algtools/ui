/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The desired aspect ratio (width / height)',
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="max-w-md">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default aspect ratio component maintaining a 16:9 widescreen ratio for images and media content.',
      },
    },
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="max-w-sm">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&dpr=2&q=80"
          alt="Profile photo"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A square aspect ratio (1:1) commonly used for profile pictures and social media images.',
      },
    },
  },
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="max-w-xs">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&dpr=2&q=80"
          alt="Portrait photo"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A portrait aspect ratio (3:4) suitable for vertical images and portrait photography.',
      },
    },
  },
};

export const UltraWide: Story = {
  args: {
    ratio: 21 / 9,
  },
  render: (args) => (
    <div className="max-w-2xl">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&dpr=2&q=80"
          alt="Landscape photo"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An ultra-wide aspect ratio (21:9) ideal for cinematic landscape images and panoramic views.',
      },
    },
  },
};

export const VideoPlayer: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="max-w-2xl">
      <AspectRatio {...args}>
        <div className="bg-black rounded-md flex items-center justify-center w-full h-full">
          <div className="text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm opacity-75">Video Player</p>
            <p className="text-xs opacity-50">16:9 Aspect Ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An aspect ratio container for video players, maintaining the standard 16:9 widescreen format.',
      },
    },
  },
};

export const CardContent: Story = {
  args: {
    ratio: 4 / 3,
  },
  render: (args) => (
    <div className="max-w-sm">
      <div className="border rounded-lg overflow-hidden">
        <AspectRatio {...args}>
          <img
            src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&dpr=2&q=80"
            alt="Card image"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-semibold mb-2">Beautiful Landscape</h3>
          <p className="text-sm text-muted-foreground">
            A stunning view captured during golden hour, showcasing the natural beauty of the
            mountains and valleys.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An aspect ratio component used within a card layout, maintaining a 4:3 standard ratio for card images.',
      },
    },
  },
};

export const PlaceholderContent: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="max-w-md">
      <AspectRatio {...args}>
        <div className="bg-muted rounded-md flex items-center justify-center w-full h-full border-2 border-dashed border-border">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
            </svg>
            <p className="text-sm">Image Placeholder</p>
            <p className="text-xs opacity-75">16:9 Ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An aspect ratio container with placeholder content, useful for loading states or empty image slots.',
      },
    },
  },
};

export const ResponsiveGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&dpr=2&q=80"
          alt="Gallery image 1"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&dpr=2&q=80"
          alt="Gallery image 2"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&dpr=2&q=80"
          alt="Gallery image 3"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&dpr=2&q=80"
          alt="Gallery image 4"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&dpr=2&q=80"
          alt="Gallery image 5"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1518312420957-717ff7816e41?w=400&dpr=2&q=80"
          alt="Gallery image 6"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A responsive image gallery using square aspect ratios in a grid layout that adapts to different screen sizes.',
      },
    },
  },
};

export const CommonRatios: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-sm font-medium mb-2">16:9 (Widescreen)</h3>
        <AspectRatio ratio={16 / 9}>
          <div className="bg-blue-100 rounded-md flex items-center justify-center w-full h-full">
            <span className="text-blue-800 font-medium">16:9</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">4:3 (Standard)</h3>
        <AspectRatio ratio={4 / 3}>
          <div className="bg-green-100 rounded-md flex items-center justify-center w-full h-full">
            <span className="text-green-800 font-medium">4:3</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">1:1 (Square)</h3>
        <AspectRatio ratio={1}>
          <div className="bg-purple-100 rounded-md flex items-center justify-center w-full h-full">
            <span className="text-purple-800 font-medium">1:1</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">3:4 (Portrait)</h3>
        <AspectRatio ratio={3 / 4}>
          <div className="bg-orange-100 rounded-md flex items-center justify-center w-full h-full">
            <span className="text-orange-800 font-medium">3:4</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">21:9 (Ultra-wide)</h3>
        <AspectRatio ratio={21 / 9}>
          <div className="bg-red-100 rounded-md flex items-center justify-center w-full h-full">
            <span className="text-red-800 font-medium">21:9</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of common aspect ratios (16:9, 4:3, 1:1, 3:4, 21:9) demonstrating their visual differences.',
      },
    },
  },
};
