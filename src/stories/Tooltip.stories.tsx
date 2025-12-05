import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  HelpCircle,
  Info,
  AlertTriangle,
  Star,
  Heart,
  Download,
  Share,
  Copy,
  Edit,
  Trash2,
  User,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  Wifi,
  Battery,
  Volume2,
  Bluetooth,
} from 'lucide-react';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the tooltip',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state when uncontrolled',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Event handler called when the open state changes',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description:
        'Override the duration given to the `Provider` to customize the open delay for a specific tooltip',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="p-8">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <HelpCircle className="mr-2 h-4 w-4" />
          Hover me
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default tooltip that appears on hover, providing helpful information when users hover over an element.',
      },
    },
  },
};

export const Positioning: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-3 gap-12 place-items-center">
      <div></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <div></div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>

      <div className="p-4 border-2 border-dashed border-muted-foreground/20 rounded">
        <span className="text-sm text-muted-foreground">Center Reference</span>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <div></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      <div></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips positioned in different directions (top, right, bottom, left), demonstrating positioning options.',
      },
    },
  },
};

export const WithDelay: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label>Different Delays</Label>
        <div className="flex space-x-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                No Delay
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Appears immediately</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                500ms Delay
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Appears after 500ms</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                1s Delay
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Appears after 1 second</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with a delay before appearing, demonstrating how to control tooltip timing for better UX.',
      },
    },
  },
};

export const RichContent: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            User Profile
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-medium">John Doe</span>
            </div>
            <p className="text-xs">Senior Developer at Acme Corp</p>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">
                React
              </Badge>
              <Badge variant="secondary" className="text-xs">
                TypeScript
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Star className="mr-2 h-4 w-4" />
            Rating
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs">4.0 out of 5 stars</p>
            <p className="text-xs text-muted-foreground">Based on 127 reviews</p>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Event
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Team Meeting</p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>2:00 PM - 3:00 PM</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>Conference Room A</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with rich content including formatted text, links, and structured information, demonstrating advanced tooltip content.',
      },
    },
  },
};

export const IconTooltips: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Action Icons</Label>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download file</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete item permanently</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Information Icons</Label>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4 text-blue-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Additional information available</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Need help? Contact our support team for assistance with this feature.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Warning: This action cannot be undone</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips attached to icons, providing contextual help and information for icon buttons and icon-only elements.',
      },
    },
  },
};

export const FormTooltips: Story = {
  args: {},
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
        <CardDescription>Create your account with helpful tooltips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="email">Email</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>We&apos;ll never share your email with anyone else</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="password">Password</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">Password requirements:</p>
                  <ul className="text-xs space-y-0.5">
                    <li>• At least 8 characters</li>
                    <li>• One uppercase letter</li>
                    <li>• One lowercase letter</li>
                    <li>• One number</li>
                    <li>• One special character</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="password" type="password" placeholder="Create a strong password" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="username">Username</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>This will be your public display name</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="username" placeholder="Choose a unique username" />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips in forms providing help text and validation messages, demonstrating how to use tooltips for form assistance.',
      },
    },
  },
};

export const StatusTooltips: Story = {
  args: {},
  render: () => {
    // const [status, setStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');

    const statusConfig = {
      online: { color: 'bg-green-500', label: 'Online', description: 'Available for chat' },
      away: { color: 'bg-yellow-500', label: 'Away', description: 'Will respond when back' },
      busy: { color: 'bg-red-500', label: 'Busy', description: 'Do not disturb' },
      offline: { color: 'bg-gray-500', label: 'Offline', description: 'Not available' },
    };

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Hover over status indicators for details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'].map((name, index) => {
            const statuses = ['online', 'away', 'busy', 'offline'] as const;
            const memberStatus = statuses[index % 4];
            const config = statusConfig[memberStatus];

            return (
              <div key={name} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${config.color}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">{config.label}</p>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{config.label}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips showing status information like success, error, and warning states, demonstrating status indicators.',
      },
    },
  },
};

export const SystemTooltips: Story = {
  args: {},
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>System information with detailed tooltips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg hover:bg-muted/50">
                <Wifi className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium">WiFi</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">WiFi Connected</p>
                <p className="text-xs">Network: Home_Network_5G</p>
                <p className="text-xs">Signal: Strong (85%)</p>
                <p className="text-xs">Speed: 150 Mbps</p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg hover:bg-muted/50">
                <Battery className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium">Battery</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Battery Status</p>
                <p className="text-xs">Charge: 67%</p>
                <p className="text-xs">Time remaining: 4h 23m</p>
                <p className="text-xs">Condition: Good</p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg hover:bg-muted/50">
                <Volume2 className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium">Audio</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Audio Output</p>
                <p className="text-xs">Device: AirPods Pro</p>
                <p className="text-xs">Volume: 75%</p>
                <p className="text-xs">Quality: Lossless</p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg hover:bg-muted/50">
                <Bluetooth className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Bluetooth</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Bluetooth Active</p>
                <p className="text-xs">Connected: 2 devices</p>
                <p className="text-xs">• AirPods Pro</p>
                <p className="text-xs">• Magic Mouse</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Storage</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-medium">Storage Details</p>
                  <p className="text-xs">Total: 512 GB SSD</p>
                  <p className="text-xs">Used: 234 GB (46%)</p>
                  <p className="text-xs">Available: 278 GB</p>
                  <p className="text-xs">Largest files in Documents</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '46%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'System tooltips for UI elements like buttons, menu items, and controls, demonstrating system-level tooltips.',
      },
    },
  },
};

export const InteractiveTooltips: Story = {
  args: {},
  render: () => {
    const [favoriteCount, setFavoriteCount] = useState(42);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
      setIsFavorited(!isFavorited);
      setFavoriteCount((prev) => prev + (isFavorited ? -1 : 1));
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
          <CardDescription>Tooltips that update based on state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Amazing Article</h3>
              <p className="text-sm text-muted-foreground">
                A comprehensive guide to React development
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavorite}
                    className={isFavorited ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorited ? 'Remove from favorites' : 'Add to favorites'}</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-muted-foreground">{favoriteCount}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Quick Actions</Label>
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Add New Item</p>
                    <p className="text-xs text-muted-foreground">Shortcut: Ctrl+N</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Search Items</p>
                    <p className="text-xs text-muted-foreground">Shortcut: Ctrl+K</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Filter Results</p>
                    <p className="text-xs text-muted-foreground">Show advanced filters</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tooltips with clickable content and actions, demonstrating how to make tooltips interactive and functional.',
      },
    },
  },
};

export const DisabledElements: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Disabled Buttons with Tooltips</Label>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button disabled className="pointer-events-none">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editing is disabled. You don&apos;t have permission to edit this item.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button disabled className="pointer-events-none">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cannot delete. This item is being used by other resources.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button disabled className="pointer-events-none">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download unavailable. File is currently being processed.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Disabled Form Fields</Label>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="disabled-input">Email Address</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email cannot be changed after account verification</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input id="disabled-input" disabled value="user@example.com" className="opacity-50" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips on disabled elements, demonstrating how to show tooltips for disabled buttons and inputs to explain why they are disabled.',
      },
    },
  },
};
