import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Code,
  FileText,
  Folder,
  FolderOpen,
  Settings,
  Search,
  Mail,
  Star,
  Archive,
  Trash2,
  Send,
  Home,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Activity,
  TrendingUp,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const meta = {
  title: 'Layout/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A resizable panel component that allows users to adjust the size of different sections in a layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the panel group',
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div className="h-[400px] w-full">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic resizable panel layout with two equal-sized panels that can be resized by dragging the handle between them.',
      },
    },
  },
};

export const WithHandle: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Left Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right Panel</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A resizable panel with a visible handle indicator, making it clearer where users can drag to resize panels.',
      },
    },
  },
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="h-[500px] w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Top Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Bottom Panel</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A vertical resizable layout with panels stacked top to bottom, useful for header/content or editor/terminal splits.',
      },
    },
  },
};

export const ThreePanels: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Main Content</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Right Panel</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A three-panel horizontal layout with a sidebar, main content area, and right panel, all independently resizable.',
      },
    },
  },
};

export const NestedPanels: Story = {
  render: () => (
    <div className="h-[500px] w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="h-full p-4 bg-muted/50">
            <h3 className="font-semibold mb-4">Sidebar</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={40}>
              <div className="h-full p-4">
                <h3 className="font-semibold mb-4">Main Content</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>Overview of your application metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">1,234</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">5,678</div>
                        <div className="text-sm text-muted-foreground">Page Views</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full p-4 bg-muted/30">
                <h3 className="font-semibold mb-4">Activity Feed</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <Badge variant="secondary">Info</Badge>
                    <span className="ml-2">User logged in</span>
                  </div>
                  <div className="text-sm">
                    <Badge variant="outline">Warning</Badge>
                    <span className="ml-2">High memory usage</span>
                  </div>
                  <div className="text-sm">
                    <Badge variant="secondary">Info</Badge>
                    <span className="ml-2">New deployment</span>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested resizable panels creating a complex layout with horizontal and vertical splits, ideal for dashboard and editor interfaces.',
      },
    },
  },
};

export const CodeEditor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A code editor layout with file explorer, code editor, terminal, and properties panel, demonstrating a real-world IDE interface.',
      },
    },
  },
  render: () => (
    <div className="h-[600px] w-full border rounded-lg overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full bg-muted/50">
            <div className="p-3 border-b">
              <h4 className="font-semibold text-sm">Explorer</h4>
            </div>
            <div className="p-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 px-2 py-1 hover:bg-muted rounded">
                  <FolderOpen className="h-4 w-4" />
                  <span className="text-sm">src</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-1 hover:bg-muted rounded">
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">components</span>
                </div>
                <div className="flex items-center space-x-2 px-6 py-1 hover:bg-muted rounded bg-muted">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Button.tsx</span>
                </div>
                <div className="flex items-center space-x-2 px-6 py-1 hover:bg-muted rounded">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Card.tsx</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-1 hover:bg-muted rounded">
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">hooks</span>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 hover:bg-muted rounded">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">package.json</span>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={40}>
              <div className="h-full">
                <div className="border-b p-3">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4" />
                    <span className="text-sm font-medium">Button.tsx</span>
                    <Badge variant="outline" className="text-xs">
                      Modified
                    </Badge>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="space-y-1">
                    <div>
                      <span className="text-blue-600">import</span> *{' '}
                      <span className="text-blue-600">as</span> React{' '}
                      <span className="text-blue-600">from</span>{' '}
                      <span className="text-green-600">&apos;react&apos;</span>
                    </div>
                    <div>
                      <span className="text-blue-600">import</span> {'{ cn }'}{' '}
                      <span className="text-blue-600">from</span>{' '}
                      <span className="text-green-600">&apos;@/lib/utils&apos;</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-blue-600">interface</span> ButtonProps {'{'}
                    </div>
                    <div className="ml-4">
                      variant?: <span className="text-green-600">&apos;default&apos;</span> |{' '}
                      <span className="text-green-600">&apos;outline&apos;</span>
                    </div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full">
                <div className="border-b p-3">
                  <h4 className="text-sm font-medium">Terminal</h4>
                </div>
                <div className="p-4 bg-black text-green-400 font-mono text-sm">
                  <div>$ npm run dev</div>
                  <div className="text-gray-400">✓ Local: http://localhost:3000</div>
                  <div className="text-gray-400">✓ Ready in 1.2s</div>
                  <div className="flex items-center">
                    <span>$</span>
                    <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full bg-muted/30">
            <div className="p-3 border-b">
              <h4 className="font-semibold text-sm">Properties</h4>
            </div>
            <div className="p-2 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Component</label>
                <div className="text-sm">Button</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Props</label>
                <div className="text-sm space-y-1">
                  <div>variant: &quot;default&quot;</div>
                  <div>size: &quot;md&quot;</div>
                  <div>disabled: false</div>
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-medium text-muted-foreground">CSS Classes</label>
                <div className="text-xs text-muted-foreground mt-1">
                  &apos;.btn-primary .rounded-md .px-4 .py-2&apos;
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const EmailClient: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An email client interface with folders, message list, and email preview panels, showcasing a three-panel email application layout.',
      },
    },
  },
  render: () => (
    <div className="h-[600px] w-full border rounded-lg overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full">
            <div className="p-4 border-b">
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Compose
              </Button>
            </div>
            <ScrollArea className="h-full">
              <div className="p-2">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Inbox
                    <Badge variant="secondary" className="ml-auto">
                      12
                    </Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="mr-2 h-4 w-4" />
                    Starred
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Send className="mr-2 h-4 w-4" />
                    Sent
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Trash
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={30}>
          <div className="h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Inbox</h3>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-full">
              <div className="p-2">
                <div className="space-y-2">
                  {[
                    {
                      from: 'Sarah Johnson',
                      subject: 'Project Update - Q4 Planning',
                      preview:
                        'Hi team, I wanted to share the latest updates on our Q4 planning...',
                      time: '2:30 PM',
                      unread: true,
                    },
                    {
                      from: 'GitHub',
                      subject: 'Pull Request Review Required',
                      preview:
                        'Your review is requested on pull request #234: Add new component...',
                      time: '1:15 PM',
                      unread: true,
                    },
                    {
                      from: 'Marketing Team',
                      subject: 'Campaign Performance Report',
                      preview: 'The latest campaign metrics are available for review...',
                      time: '11:45 AM',
                      unread: false,
                    },
                    {
                      from: 'John Doe',
                      subject: 'Meeting Notes - Design Review',
                      preview:
                        'Thanks for the productive meeting today. Here are the key points...',
                      time: '10:30 AM',
                      unread: false,
                    },
                  ].map((email, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded border hover:bg-muted/50 cursor-pointer ${
                        index === 0 ? 'bg-muted/30 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'}`}
                        >
                          {email.from}
                        </span>
                        <span className="text-xs text-muted-foreground">{email.time}</span>
                      </div>
                      <div className={`text-sm mb-1 ${email.unread ? 'font-medium' : ''}`}>
                        {email.subject}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {email.preview}
                      </div>
                      {email.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="h-full">
            <div className="p-4 border-b">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">2:30 PM</span>
                </div>
                <h2 className="text-lg font-semibold">Project Update - Q4 Planning</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>From: Sarah Johnson</span>
                  <span>•</span>
                  <span>To: team@company.com</span>
                </div>
              </div>
            </div>
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="prose prose-sm max-w-none">
                  <p>Hi team,</p>
                  <p>
                    I wanted to share the latest updates on our Q4 planning initiative. We&apos;ve
                    made significant progress over the past few weeks and I&apos;m excited about the
                    direction we&apos;re heading.
                  </p>
                  <p>Key highlights:</p>
                  <ul>
                    <li>Completed user research phase with 50+ interviews</li>
                    <li>Finalized technical architecture decisions</li>
                    <li>Secured additional budget for Q4 initiatives</li>
                    <li>Aligned on timeline and resource allocation</li>
                  </ul>
                  <p>
                    I&apos;ve attached the detailed project roadmap and would love to get
                    everyone&apos;s feedback before our next team meeting on Friday.
                  </p>
                  <p>Please review and let me know if you have any questions or concerns.</p>
                  <p>
                    Best regards,
                    <br />
                    Sarah
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive analytics dashboard with stats cards, charts, and activity feed, using nested resizable panels for flexible layouts.',
      },
    },
  },
  render: () => (
    <div className="h-[600px] w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Analytics Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">12,543</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12.5%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">$45,210</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8.2%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                      <p className="text-2xl font-bold">98.5K</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+15.3%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion</p>
                      <p className="text-2xl font-bold">3.2%</p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70}>
              <div className="h-full p-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border border-dashed rounded">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                        <p>Chart visualization would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={25}>
              <div className="h-full p-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-3">
                        {[
                          {
                            icon: CheckCircle,
                            message: 'New user registration',
                            time: '2 minutes ago',
                            type: 'success',
                          },
                          {
                            icon: AlertTriangle,
                            message: 'Server response time spike',
                            time: '5 minutes ago',
                            type: 'warning',
                          },
                          {
                            icon: Users,
                            message: '10 new signups today',
                            time: '1 hour ago',
                            type: 'info',
                          },
                          {
                            icon: MessageSquare,
                            message: 'New support ticket',
                            time: '2 hours ago',
                            type: 'info',
                          },
                          {
                            icon: Calendar,
                            message: 'Scheduled maintenance',
                            time: '3 hours ago',
                            type: 'info',
                          },
                        ].map((activity, index) => {
                          const Icon = activity.icon;
                          return (
                            <div key={index} className="flex items-start space-x-3">
                              <Icon
                                className={`h-5 w-5 mt-0.5 ${
                                  activity.type === 'success'
                                    ? 'text-green-500'
                                    : activity.type === 'warning'
                                      ? 'text-yellow-500'
                                      : 'text-blue-500'
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{activity.message}</p>
                                <p className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
