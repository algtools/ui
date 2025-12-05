import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use to show a placeholder while content is loading. Creates a shimmer effect to indicate that content is being loaded.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="w-[300px] h-6" />
      <Skeleton className="w-[250px] h-6" />
      <Skeleton className="w-[200px] h-6" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default skeleton loaders in different widths, demonstrating basic skeleton loading states.',
      },
    },
  },
};

export const SingleSkeleton: Story = {
  render: () => <Skeleton className="w-[250px] h-8 rounded-md" />,
  parameters: {
    docs: {
      description: {
        story: 'A single skeleton loader element, demonstrating minimal skeleton usage.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Text Lines</p>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Rectangles</p>
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-16 w-48" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Circles</p>
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loaders in different sizes (small, medium, large), demonstrating size variations.',
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A card skeleton loader mimicking a card layout with image, title, and description placeholders.',
      },
    },
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A list skeleton loader with multiple list item placeholders, demonstrating list loading states.',
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      {/* Table Header */}
      <div className="flex space-x-4 py-2 border-b">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      {/* Table Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex space-x-4 py-3">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-8 w-[60px] rounded-md" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A table skeleton loader with table rows and columns, demonstrating table loading states.',
      },
    },
  },
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-16" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A form skeleton loader with input fields and labels, demonstrating form loading states.',
      },
    },
  },
};

export const ProfileSkeleton: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-12 mx-auto" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-12 mx-auto" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-12 mx-auto" />
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-6 w-6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A profile skeleton loader with avatar, name, and bio placeholders, demonstrating profile loading states.',
      },
    },
  },
};

export const ChatSkeleton: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      {/* Received message */}
      <div className="flex items-start space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-16 w-3/4 rounded-lg" />
        </div>
      </div>

      {/* Sent message */}
      <div className="flex items-start space-x-3 justify-end">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2 justify-end">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-12 w-2/3 rounded-lg ml-auto" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Another received message */}
      <div className="flex items-start space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-20 w-4/5 rounded-lg" />
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex items-start space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chat skeleton loader with message bubbles and avatars, demonstrating chat interface loading states.',
      },
    },
  },
};

export const DashboardSkeleton: Story = {
  render: () => (
    <div className="w-[800px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-2 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A dashboard skeleton loader with cards, charts, and widgets, demonstrating complex dashboard loading states.',
      },
    },
  },
};

export const GallerySkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A gallery skeleton loader with image grid placeholders, demonstrating gallery loading states.',
      },
    },
  },
};

export const ArticleSkeleton: Story = {
  render: () => (
    <div className="w-[700px] space-y-6">
      {/* Article Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <Skeleton className="h-[300px] w-full rounded-lg" />

      {/* Article Content */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-[150px] w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An article skeleton loader with header, featured image, content paragraphs, and tags, demonstrating article loading states.',
      },
    },
  },
};

export const TimelineSkeleton: Story = {
  render: () => (
    <div className="w-[500px] space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            {i !== 3 && <div className="w-px h-16 bg-border mt-2" />}
          </div>
          <div className="flex-1 space-y-2 pb-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            {i % 2 === 0 && <Skeleton className="h-20 w-full rounded-md mt-2" />}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A timeline skeleton loader with timeline items and connecting lines, demonstrating timeline loading states.',
      },
    },
  },
};
