import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserCircle } from 'lucide-react';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://broken-link.jpg" alt="Broken image" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {/* Small */}
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback className="text-xs">V</AvatarFallback>
      </Avatar>

      {/* Default */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Medium */}
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>

      {/* Large */}
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback className="text-lg">CN</AvatarFallback>
      </Avatar>

      {/* Extra Large */}
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback className="text-xl">V</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>
          <User className="size-4" />
        </AvatarFallback>
      </Avatar>

      <Avatar className="size-12">
        <AvatarFallback>
          <UserCircle className="size-6" />
        </AvatarFallback>
      </Avatar>

      <Avatar className="size-16">
        <AvatarFallback>
          <User className="size-8" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-red-500 text-white">R</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">G</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">B</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-purple-500 text-white">P</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-orange-500 text-white">O</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const UserProfiles: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            alt="John Doe"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
            alt="Sarah Wilson"
          />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Sarah Wilson</p>
          <p className="text-xs text-muted-foreground">sarah@example.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="broken-link.jpg" alt="Mike Johnson" />
          <AvatarFallback className="bg-blue-500 text-white">MJ</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Mike Johnson</p>
          <p className="text-xs text-muted-foreground">mike@example.com</p>
        </div>
      </div>
    </div>
  ),
};

export const CommentSection: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex gap-3">
        <Avatar className="size-10">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            alt="Alex"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium mb-1">Alex Thompson</p>
            <p className="text-sm">
              This looks really great! I love the design choices you made here.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="bg-green-500 text-white">M</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium mb-1">Maria Garcia</p>
            <p className="text-sm">
              Thanks for sharing this! Can you tell me more about the implementation?
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Avatar className="size-10">
          <AvatarImage
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            alt="David"
          />
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium mb-1">David Lee</p>
            <p className="text-sm">Amazing work! 🎉</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">30 minutes ago</p>
        </div>
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Small stack */}
      <div>
        <p className="text-sm font-medium mb-2">Team Members (4)</p>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="John"
            />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
              alt="Sarah"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt="Alex"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">+1</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Larger stack */}
      <div>
        <p className="text-sm font-medium mb-2">Project Contributors (8+)</p>
        <div className="flex -space-x-3">
          <Avatar className="size-12 border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="John"
            />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
              alt="Sarah"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 border-2 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt="Alex"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 border-2 border-background">
            <AvatarFallback className="bg-blue-500 text-white">M</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 border-2 border-background">
            <AvatarFallback className="bg-muted text-muted-foreground">+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {/* Online */}
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            alt="Online user"
          />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-background rounded-full"></div>
      </div>

      {/* Away */}
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
            alt="Away user"
          />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-3 bg-yellow-500 border-2 border-background rounded-full"></div>
      </div>

      {/* Offline */}
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            alt="Offline user"
          />
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-3 bg-gray-400 border-2 border-background rounded-full"></div>
      </div>

      {/* Do not disturb */}
      <div className="relative">
        <Avatar>
          <AvatarFallback className="bg-purple-500 text-white">DN</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-3 bg-red-500 border-2 border-background rounded-full"></div>
      </div>
    </div>
  ),
};
