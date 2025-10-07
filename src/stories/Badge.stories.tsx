import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  X,
  Star,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Tag,
  Calendar,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
    },
    asChild: {
      control: 'boolean',
      description: 'Change the component to a Slot component for composition',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">
        <Check />
        Verified
      </Badge>
      <Badge variant="secondary">
        <Star />
        Featured
      </Badge>
      <Badge variant="destructive">
        <X />
        Error
      </Badge>
      <Badge variant="outline">
        <Info />
        Info
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-green-500 text-white border-green-500">
        <Check />
        Active
      </Badge>
      <Badge className="bg-yellow-500 text-white border-yellow-500">
        <Clock />
        Pending
      </Badge>
      <Badge className="bg-blue-500 text-white border-blue-500">
        <Info />
        Draft
      </Badge>
      <Badge variant="destructive">
        <X />
        Inactive
      </Badge>
      <Badge className="bg-purple-500 text-white border-purple-500">
        <Sparkles />
        Premium
      </Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">Messages</span>
        <Badge variant="destructive">3</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Notifications</span>
        <Badge variant="default">12</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Updates</span>
        <Badge variant="secondary">New</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Alerts</span>
        <Badge variant="outline">
          <AlertTriangle />2
        </Badge>
      </div>
    </div>
  ),
};

export const CategoryTags: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <div>
        <h3 className="text-sm font-medium mb-2">Article Categories</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">
            <Tag />
            Technology
          </Badge>
          <Badge variant="outline">
            <Tag />
            Design
          </Badge>
          <Badge variant="outline">
            <Tag />
            Development
          </Badge>
          <Badge variant="outline">
            <Tag />
            Tutorial
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">GraphQL</Badge>
          <Badge variant="secondary">PostgreSQL</Badge>
        </div>
      </div>
    </div>
  ),
};

export const EventBadges: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="border rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium">React Conference 2024</h3>
          <Badge className="bg-green-500 text-white border-green-500">Live</Badge>
        </div>
        <div className="flex gap-2 flex-wrap text-sm text-muted-foreground">
          <Badge variant="outline">
            <Calendar />
            Dec 15
          </Badge>
          <Badge variant="outline">
            <Clock />
            2:00 PM
          </Badge>
          <Badge variant="outline">
            <MapPin />
            Online
          </Badge>
          <Badge variant="outline">
            <Users />
            500+ attendees
          </Badge>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium">Design Workshop</h3>
          <Badge variant="secondary">Upcoming</Badge>
        </div>
        <div className="flex gap-2 flex-wrap text-sm text-muted-foreground">
          <Badge variant="outline">
            <Calendar />
            Dec 20
          </Badge>
          <Badge variant="outline">
            <Clock />
            10:00 AM
          </Badge>
          <Badge variant="outline">
            <MapPin />
            San Francisco
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export const PriorityBadges: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center justify-between p-3 border rounded">
        <span className="text-sm">Fix authentication bug</span>
        <Badge variant="destructive">
          <AlertTriangle />
          Critical
        </Badge>
      </div>

      <div className="flex items-center justify-between p-3 border rounded">
        <span className="text-sm">Update documentation</span>
        <Badge className="bg-orange-500 text-white border-orange-500">
          <Zap />
          High
        </Badge>
      </div>

      <div className="flex items-center justify-between p-3 border rounded">
        <span className="text-sm">Refactor components</span>
        <Badge className="bg-yellow-500 text-black border-yellow-500">Medium</Badge>
      </div>

      <div className="flex items-center justify-between p-3 border rounded">
        <span className="text-sm">Update dependencies</span>
        <Badge variant="secondary">Low</Badge>
      </div>
    </div>
  ),
};

export const UserRoles: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center gap-3">
        <div className="size-8 bg-muted rounded-full"></div>
        <div className="flex-1">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@company.com</p>
        </div>
        <Badge className="bg-purple-500 text-white border-purple-500">
          <Crown />
          Admin
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="size-8 bg-muted rounded-full"></div>
        <div className="flex-1">
          <p className="text-sm font-medium">Sarah Wilson</p>
          <p className="text-xs text-muted-foreground">sarah@company.com</p>
        </div>
        <Badge className="bg-blue-500 text-white border-blue-500">
          <Shield />
          Moderator
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="size-8 bg-muted rounded-full"></div>
        <div className="flex-1">
          <p className="text-sm font-medium">Mike Johnson</p>
          <p className="text-xs text-muted-foreground">mike@company.com</p>
        </div>
        <Badge variant="secondary">User</Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="size-8 bg-muted rounded-full"></div>
        <div className="flex-1">
          <p className="text-sm font-medium">Alice Brown</p>
          <p className="text-xs text-muted-foreground">alice@company.com</p>
        </div>
        <Badge variant="outline">Guest</Badge>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">
        <Sparkles />
        Gradient
      </Badge>

      <Badge className="bg-black text-white border-black">
        <Star />
        Dark
      </Badge>

      <Badge className="bg-white text-black border-2 border-black">Contrast</Badge>

      <Badge className="bg-amber-100 text-amber-800 border-amber-300">
        <Crown />
        Gold
      </Badge>

      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
        <Check />
        Success
      </Badge>
    </div>
  ),
};

export const InteractiveBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Clickable Tags</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge asChild>
            <button className="cursor-pointer hover:opacity-80">
              <Tag />
              JavaScript
            </button>
          </Badge>
          <Badge asChild variant="secondary">
            <button className="cursor-pointer hover:opacity-80">
              <Tag />
              React
            </button>
          </Badge>
          <Badge asChild variant="outline">
            <button className="cursor-pointer hover:opacity-80">
              <Tag />
              TypeScript
            </button>
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Removable Tags</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="pr-1">
            Design
            <button className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">
              <X className="size-2" />
            </button>
          </Badge>
          <Badge variant="secondary" className="pr-1">
            Frontend
            <button className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">
              <X className="size-2" />
            </button>
          </Badge>
          <Badge variant="secondary" className="pr-1">
            UI/UX
            <button className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">
              <X className="size-2" />
            </button>
          </Badge>
        </div>
      </div>
    </div>
  ),
};
