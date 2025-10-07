import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Heart,
  Star,
  MoreHorizontal,
  Share,
  Bookmark,
  MessageCircle,
  Eye,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  CreditCard,
  Download,
  Play,
  Settings,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">New message from John</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Project updated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm">Reminder: Meeting at 3 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Getting Started with React</CardTitle>
        <CardDescription>Learn the fundamentals of React development</CardDescription>
        <CardAction>
          <Badge variant="secondary">Tutorial</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
          <Play className="size-12 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          React is a popular JavaScript library for building user interfaces. In this tutorial,
          we&apos;ll cover the basics and help you get started.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="size-4" />
            1.2k
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-4" />
            89
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4" />
            23
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Share className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="p-0">
        <div className="aspect-square bg-muted rounded-t-xl relative">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
              <Heart className="size-4" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-red-500 text-white">Sale</Badge>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>Wireless Headphones</CardTitle>
        <CardDescription>Premium noise-cancelling headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(128 reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">$129.99</span>
          <span className="text-sm text-muted-foreground line-through">$179.99</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>Sarah Wilson</CardTitle>
            <CardDescription>Product Designer</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Passionate about creating beautiful and functional user experiences. Love coffee, design,
          and hiking.
        </p>
        <div className="flex justify-between text-center">
          <div>
            <div className="text-xl font-bold">1.2k</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="text-xl font-bold">543</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div>
            <div className="text-xl font-bold">89</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">$45,231.89</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="size-3" />
                +20.1%
              </span>
              from last month
            </p>
          </div>
          <DollarSign className="size-6 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subscriptions</p>
            <p className="text-2xl font-bold">+2,350</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="size-3" />
                +180.1%
              </span>
              from last month
            </p>
          </div>
          <Users className="size-6 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Sales</p>
            <p className="text-2xl font-bold">+12,234</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="size-3" />
                +19%
              </span>
              from last month
            </p>
          </div>
          <CreditCard className="size-6 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Now</p>
            <p className="text-2xl font-bold">+573</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <TrendingDown className="size-3" />
                -2%
              </span>
              from last month
            </p>
          </div>
          <Activity className="size-6 text-muted-foreground" />
        </div>
      </Card>
    </div>
  ),
};

export const EventCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Design Conference 2024</CardTitle>
        <CardDescription>Join us for a day of inspiring talks and workshops</CardDescription>
        <CardAction>
          <Badge variant="default">Featured</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            March 15, 2024
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            9:00 AM - 6:00 PM
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            San Francisco, CA
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">$299</span>
          <span className="text-sm text-muted-foreground">Early bird pricing</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Register Now</Button>
        <Button variant="ghost" size="icon">
          <Bookmark className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Website Redesign</CardTitle>
        <CardDescription>Complete overhaul of the company website</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Team:</span>
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <Avatar key={i} className="size-6 border-2 border-background">
                  <AvatarFallback className="text-xs">{String.fromCharCode(65 + i)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-sm text-muted-foreground">Due in 5 days</div>
        <Button variant="outline" size="sm">
          View Details
          <ExternalLink className="size-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const DownloadCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>App Download</CardTitle>
        <CardDescription>Get our mobile app for the best experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="size-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h3 className="font-semibold">MyApp</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">4.8</span>
            </div>
            <p className="text-xs text-muted-foreground">Free • 50MB</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Access all your favorite features on the go with our mobile app.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Download className="size-4 mr-2" />
          Download Now
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>View your website analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,345</div>
          <p className="text-xs text-muted-foreground">Total page views</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Details
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            Create
          </Button>
          <Button variant="outline" size="sm">
            Import
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">John</span> updated the project
            </div>
            <div className="text-sm">
              <span className="font-medium">Sarah</span> added new files
            </div>
            <div className="text-sm">
              <span className="font-medium">Mike</span> completed a task
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
