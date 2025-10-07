import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Info,
  HelpCircle,
  Plus,
  MoreHorizontal,
  Share,
  Edit,
  Trash,
  Bell,
  Star,
  Heart,
  MessageCircle,
  Download,
  ExternalLink,
  Copy,
} from 'lucide-react';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating card popped by a trigger element to display additional content without navigating away from the current context.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold">Sarah Connor</h4>
              <p className="text-sm text-muted-foreground">@sarahconnor</p>
            </div>
            <p className="text-sm">
              Senior Frontend Developer passionate about building beautiful user experiences.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">
                <User className="w-3 h-3 mr-1" />
                Team Lead
              </Badge>
              <Badge variant="outline">
                <Star className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const QuickActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="grid gap-1">
          <Button variant="ghost" className="justify-start">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="ghost" className="justify-start">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="ghost" className="justify-start">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" className="justify-start">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Separator />
          <Button variant="ghost" className="justify-start text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ContactInfo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">Contact Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-3">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Contact Information</h4>
            <p className="text-sm text-muted-foreground">Get in touch with our team</p>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contact@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  123 Business Ave, Suite 100
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <Button className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Contact Page
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AddNewItem: Story = {
  render: () => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add New Item</h4>
              <p className="text-sm text-muted-foreground">Create a new item in your collection.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description (optional)"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Create Item</Button>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const HelpTooltip: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label>API Key</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <HelpCircle className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-3">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">API Key Help</h4>
              <p className="text-sm text-muted-foreground">
                Your API key is used to authenticate requests to our service.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-medium">How to use:</h5>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Copy your API key from the settings</li>
                <li>Include it in the Authorization header</li>
                <li>Format: Bearer YOUR_API_KEY</li>
              </ol>
            </div>
            <div className="bg-muted p-3 rounded text-xs font-mono">
              Authorization: Bearer sk-1234567890abcdef
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Notifications: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Notifications</h4>
            <Badge variant="secondary">3 new</Badge>
          </div>
          <div className="grid gap-2">
            <div className="flex gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">Sarah Connor joined your team</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-950">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-muted-foreground">$299.00 from Acme Corp</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-950">
              <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">System maintenance</p>
                <p className="text-xs text-muted-foreground">Scheduled for tonight at 2 AM</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
          <Separator />
          <Button variant="ghost" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CalendarPreview: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Quick Schedule</h4>
            <p className="text-sm text-muted-foreground">Pick a time slot for your meeting</p>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start">
              Today at 2:00 PM
            </Button>
            <Button variant="outline" className="justify-start">
              Tomorrow at 10:00 AM
            </Button>
            <Button variant="outline" className="justify-start">
              Friday at 3:30 PM
            </Button>
            <Button variant="outline" className="justify-start">
              Next Monday at 9:00 AM
            </Button>
          </div>
          <Separator />
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Open Full Calendar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ShareOptions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this document</h4>
            <p className="text-sm text-muted-foreground">
              Choose how you&apos;d like to share this document
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Input readOnly value="https://example.com/doc/abc123" className="flex-1" />
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <h5 className="text-sm font-medium">Share via:</h5>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Slack
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm">Anyone with link can view</span>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const InfoPopover: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Premium Feature</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Info className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <h4 className="font-medium leading-none">Premium Feature</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              This feature is available to Premium subscribers only. Upgrade your plan to access
              advanced analytics and reporting.
            </p>
            <Button size="sm">Upgrade to Premium</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const MultiplePopovers: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Profile</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Settings</Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-2">
            <Button variant="ghost" className="justify-start">
              <User className="mr-2 h-4 w-4" />
              Account
            </Button>
            <Button variant="ghost" className="justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Actions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="grid gap-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
