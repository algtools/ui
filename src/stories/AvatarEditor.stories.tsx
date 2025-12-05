import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { AvatarEditor } from '@/components/ui/avatar-editor';

const meta = {
  title: 'Components/AvatarEditor',
  component: AvatarEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentAvatar: {
      control: 'text',
      description: 'Current avatar URL or null',
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Border radius for the avatar preview (0 = square, 50 = circle)',
    },
    size: {
      control: { type: 'range', min: 200, max: 500, step: 50 },
      description: 'Size of the editor canvas',
    },
    quality: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Quality of the output image (0-1)',
    },
    onSave: {
      action: 'saved',
      description: 'Async function to save the avatar - receives base64 data URL',
    },
    onDiscard: {
      action: 'discarded',
      description: 'Function called when avatar is discarded',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when avatar is changed - receives base64 data URL',
    },
  },
} satisfies Meta<typeof AvatarEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock handlers for stories
const mockSave = async (dataUrl: string): Promise<void> => {
  console.log('Avatar saved:', dataUrl.substring(0, 50) + '...');
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
};

const mockDiscard = () => {
  console.log('Avatar discarded');
};

export const Default: Story = {
  args: {
    currentAvatar: 'https://github.com/shadcn.png',
    borderRadius: 50,
    size: 300,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'A default avatar editor with a circular shape, allowing users to upload, crop, and adjust their avatar image.',
      },
    },
  },
};

export const Square: Story = {
  args: {
    currentAvatar: 'https://github.com/shadcn.png',
    borderRadius: 0,
    size: 300,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'A square avatar editor with no border radius, demonstrating how to create square avatars.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    currentAvatar: 'https://github.com/shadcn.png',
    borderRadius: 50,
    size: 400,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'A large avatar editor with increased size, demonstrating how to create larger avatar images.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    currentAvatar: 'https://github.com/shadcn.png',
    borderRadius: 50,
    size: 200,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'A small avatar editor with reduced size, demonstrating how to create compact avatar images.',
      },
    },
  },
};

export const NoImage: Story = {
  args: {
    currentAvatar: null,
    borderRadius: 50,
    size: 300,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'An avatar editor with no initial image, demonstrating how the component handles empty states and new avatar uploads.',
      },
    },
  },
};

export const LargeSquare: Story = {
  args: {
    currentAvatar: 'https://github.com/shadcn.png',
    borderRadius: 10,
    size: 400,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'A large square avatar editor combining large size with square shape, demonstrating size and shape combinations.',
      },
    },
  },
};

export const HighQuality: Story = {
  args: {
    currentAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    borderRadius: 50,
    size: 300,
    quality: 1.0,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'An avatar editor with maximum quality settings (quality: 1.0), demonstrating how to configure high-quality image output.',
      },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    currentAvatar: null,
    borderRadius: 50,
    size: 300,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
    labels: {
      uploadPrompt: 'Click to upload your photo',
      controlsPlaceholder: 'Add an image to start editing',
      allowedTypesLabel: 'Supported formats',
      save: 'Save Avatar',
      discard: 'Remove',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotateClockwise: 'Rotate Right',
      rotateCounterClockwise: 'Rotate Left',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'An avatar editor with custom labels for all UI text, demonstrating how to customize button labels and messages.',
      },
    },
  },
};

export const ProfileSetup: Story = {
  render: (args) => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Set up your profile</h2>
        <p className="text-muted-foreground">Upload and customize your profile picture</p>
      </div>
      <AvatarEditor {...args} />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          You can drag to reposition, zoom, and rotate your image
        </p>
      </div>
    </div>
  ),
  args: {
    currentAvatar: null,
    borderRadius: 50,
    size: 300,
    quality: 0.9,
    onSave: mockSave,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'An avatar editor integrated into a profile setup flow, demonstrating how to use the component in a complete user onboarding experience.',
      },
    },
  },
};

export const ComparisonSizes: Story = {
  args: { onDiscard: mockDiscard },
  render: () => (
    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Small (200px)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={50}
          size={200}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Medium (300px)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={50}
          size={300}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Large (400px)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={50}
          size={400}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Extra Large (500px)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={50}
          size={500}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comparison of avatar editors in different sizes (small, medium, large, extra large), demonstrating size variations side by side.',
      },
    },
  },
};

export const ComparisonShapes: Story = {
  args: { onDiscard: mockDiscard },
  render: () => (
    <div className="flex justify-center gap-12">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Circle (borderRadius: 50)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={50}
          size={300}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Rounded Square (borderRadius: 20)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={20}
          size={300}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Square (borderRadius: 0)</h3>
        <AvatarEditor
          currentAvatar="https://github.com/shadcn.png"
          borderRadius={0}
          size={300}
          quality={0.9}
          onSave={mockSave}
          onDiscard={mockDiscard}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comparison of avatar editors with different shapes (circle, rounded square, square), demonstrating border radius variations side by side.',
      },
    },
  },
};

export const LivePreviewOnChange: Story = {
  name: 'Live preview (onChange only)',
  render: (args) => {
    const [preview, setPreview] = React.useState<string | null>('https://github.com/shadcn.png');

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Live preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview ?? ''}
            alt="Preview"
            width={96}
            height={96}
            className="rounded-full border"
          />
        </div>
        <AvatarEditor
          {...args}
          currentAvatar={preview}
          onChange={(dataUrl) => setPreview(dataUrl)}
          // Intentionally omit onSave to hide the save button
          onDiscard={() => setPreview(null)}
        />
      </div>
    );
  },
  args: {
    borderRadius: 50,
    size: 300,
    quality: 0.9,
    onDiscard: mockDiscard,
  },
  parameters: {
    docs: {
      description: {
        story: 'An avatar editor with live preview that updates on change, demonstrating real-time preview functionality without requiring a save action.',
      },
    },
  },
};
