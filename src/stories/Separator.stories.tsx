import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Heart,
  MessageSquare,
  Share,
  Bookmark,
  Eye,
  MapPin,
  User,
  Mail,
  Users,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Package,
  CheckCircle,
  AlertCircle,
  Info,
  Home,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
} from 'lucide-react';

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Visually or semantically separates content. Used to separate content in lists, menus, and forms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative (non-semantic)',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => (
    <div className="w-[300px] space-y-4">
      <div>
        <h4 className="text-sm font-medium">Content Above</h4>
        <p className="text-sm text-muted-foreground">
          This is some content that appears above the separator.
        </p>
      </div>
      <Separator {...args} />
      <div>
        <h4 className="text-sm font-medium">Content Below</h4>
        <p className="text-sm text-muted-foreground">
          This is some content that appears below the separator.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic horizontal separator dividing content sections, commonly used to visually separate different parts of a layout.',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-center">
        <div className="text-sm font-medium">Section 1</div>
        <div className="text-xs text-muted-foreground">Content</div>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <div className="text-sm font-medium">Section 2</div>
        <div className="text-xs text-muted-foreground">Content</div>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <div className="text-sm font-medium">Section 3</div>
        <div className="text-xs text-muted-foreground">Content</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A vertical separator used to divide content horizontally in a row layout, useful for toolbars and navigation bars.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Account information and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">Personal Information</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">Contact Details</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm">john.doe@example.com</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm">San Francisco, CA</p>
            <p className="text-sm text-muted-foreground">United States</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used within a card to divide different sections of user profile information, creating clear visual separation.',
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Navigation Menu</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
        </div>

        <Separator className="my-2" />

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ImageIcon className="mr-2 h-4 w-4" />
            Media
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Package className="mr-2 h-4 w-4" />
            Projects
          </Button>
        </div>

        <Separator className="my-2" />

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in navigation menus to group related menu items, creating logical sections in the navigation structure.',
      },
    },
  },
};

export const SocialPost: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar>
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">Sarah Johnson</h4>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm mb-3">
            Just finished an amazing workshop on React performance optimization! The insights on
            memoization and code splitting were game-changing. 🚀
          </p>
          <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Workshop Photo</span>
          </div>
        </div>

        <Separator />

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Heart className="h-4 w-4 mr-1" />
                24
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MessageSquare className="h-4 w-4 mr-1" />5
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Share className="h-4 w-4 mr-1" />3
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-muted rounded-full px-4 py-2">
              <span className="text-sm text-muted-foreground">Write a comment...</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in social media posts to divide post content, engagement actions, and comment sections.',
      },
    },
  },
};

export const EcommerceCart: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Shopping Cart</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {[
            { name: 'Wireless Headphones', price: 99.99, quantity: 1 },
            { name: 'Smartphone Case', price: 24.99, quantity: 2 },
            { name: 'USB Cable', price: 12.99, quantity: 1 },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">${item.price}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {index < 2 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$137.97</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>$11.84</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$159.80</span>
        </div>

        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in e-commerce shopping carts to divide cart items, pricing breakdown, and checkout sections.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">12,543</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$45,210</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">1,235</p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                message: 'New user registration',
                time: '2 minutes ago',
                type: 'success',
              },
              {
                icon: AlertCircle,
                message: 'Server response time spike',
                time: '5 minutes ago',
                type: 'warning',
              },
              {
                icon: Info,
                message: 'System backup completed',
                time: '1 hour ago',
                type: 'info',
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index}>
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-5 w-5 ${
                        activity.type === 'success'
                          ? 'text-green-500'
                          : activity.type === 'warning'
                            ? 'text-yellow-500'
                            : 'text-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  {index < 2 && <Separator className="mt-4" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in dashboards to divide different sections like stats cards and activity feeds, creating clear visual hierarchy.',
      },
    },
  },
};

export const Toolbar: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Upload className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical separators used in toolbars to group related action buttons, organizing toolbar controls into logical sections.',
      },
    },
  },
};

export const MediaGrid: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Media Library</CardTitle>
        <CardDescription>Browse your uploaded media files</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <ImageIcon className="mr-2 h-4 w-4" />
            Images
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-md"></div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="aspect-video bg-muted rounded-md"></div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Music className="mr-2 h-4 w-4" />
            Audio Files
          </h4>
          <div className="space-y-2">
            {['Song 1.mp3', 'Podcast Episode.mp3', 'Voice Note.wav'].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{file}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in media libraries to divide different media types (images, videos, audio), organizing content by category.',
      },
    },
  },
};

export const StatusUpdate: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current status of all services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">API Gateway</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Database</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">CDN</span>
            </div>
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              Degraded
            </Badge>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold mb-2">Recent Incidents</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• CDN experiencing high latency - 2:30 PM</p>
            <p>• Database maintenance completed - 1:15 PM</p>
            <p>• All systems operational - 12:00 PM</p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Last Updated</span>
          <span className="text-sm text-muted-foreground">Just now</span>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Separators used in system status pages to divide service status information, recent incidents, and update timestamps.',
      },
    },
  },
};
