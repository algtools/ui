import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Heart,
  Share,
  MoreHorizontal,
  Code,
  FileText,
  Folder,
  Image as ImageIcon,
  Video,
  Music,
  Download,
  Star,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Search,
  Filter,
  SortAsc,
} from 'lucide-react';

const meta = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Augments native scroll functionality for custom, cross-browser styling while maintaining accessibility.',
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
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic scroll area component with custom styling, displaying a list of items that can be scrolled vertically.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[500px] rounded-md border p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Long Form Content</h2>
          <p className="text-muted-foreground mb-4">
            This is an example of a scroll area containing long form content. The scroll area
            provides custom styling while maintaining native scrolling behavior and accessibility.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Lorem Ipsum</h3>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">More Content</h3>
          <p className="mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Even More Content</h3>
          <p className="mb-4">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident.
          </p>
          <p className="mb-4">
            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
            fuga. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
        </div>
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A scroll area containing long-form text content with headings and paragraphs, demonstrating scrolling for article-style content.',
      },
    },
  },
};

export const HorizontalScroll: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Horizontal Scroll Area</h4>
      <ScrollArea className="w-[400px] whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <Card key={i} className="w-[200px] shrink-0">
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md mb-2"></div>
                <h5 className="font-semibold">Card {i + 1}</h5>
                <p className="text-sm text-muted-foreground">Description for card {i + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A horizontal scroll area displaying a row of cards that can be scrolled left and right, useful for galleries and carousels.',
      },
    },
  },
};

export const ChatMessages: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Chat Messages</span>
        </CardTitle>
        <CardDescription>Recent conversation</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4">
          <div className="space-y-4">
            {[
              {
                id: 1,
                sender: 'Alice Johnson',
                avatar: '',
                message: "Hey everyone! How's the project coming along?",
                time: '2:30 PM',
                isOwn: false,
              },
              {
                id: 2,
                sender: 'You',
                avatar: '',
                message: "It's going great! We're ahead of schedule.",
                time: '2:32 PM',
                isOwn: true,
              },
              {
                id: 3,
                sender: 'Bob Smith',
                avatar: '',
                message: 'Agreed! The new features are looking really good.',
                time: '2:35 PM',
                isOwn: false,
              },
              {
                id: 4,
                sender: 'You',
                avatar: '',
                message: 'Should we schedule a demo for next week?',
                time: '2:36 PM',
                isOwn: true,
              },
              {
                id: 5,
                sender: 'Alice Johnson',
                avatar: '',
                message: 'That sounds perfect! I can send out calendar invites.',
                time: '2:38 PM',
                isOwn: false,
              },
              {
                id: 6,
                sender: 'Carol Davis',
                avatar: '',
                message: 'Great idea! Looking forward to seeing the progress.',
                time: '2:40 PM',
                isOwn: false,
              },
              {
                id: 7,
                sender: 'You',
                avatar: '',
                message: "Perfect! I'll prepare the presentation slides.",
                time: '2:42 PM',
                isOwn: true,
              },
              {
                id: 8,
                sender: 'Bob Smith',
                avatar: '',
                message: 'Let me know if you need any help with the technical details.',
                time: '2:45 PM',
                isOwn: false,
              },
            ].map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isOwn ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${message.isOwn ? 'text-right' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{message.sender}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <div
                    className={`mt-1 rounded-lg px-3 py-2 text-sm ${
                      message.isOwn ? 'bg-primary text-primary-foreground ml-8' : 'bg-muted mr-8'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chat interface with scrollable message history, displaying conversations with avatars, timestamps, and message bubbles.',
      },
    },
  },
};

export const FileExplorer: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5" />
            <span>Files</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <SortAsc className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-1">
            {[
              { name: 'Documents', type: 'folder', size: '—', modified: '2 days ago' },
              { name: 'Images', type: 'folder', size: '—', modified: '1 week ago' },
              { name: 'Videos', type: 'folder', size: '—', modified: '3 days ago' },
              {
                name: 'project-proposal.pdf',
                type: 'file',
                size: '2.4 MB',
                modified: '1 hour ago',
              },
              { name: 'meeting-notes.md', type: 'file', size: '12 KB', modified: '3 hours ago' },
              { name: 'screenshot.png', type: 'image', size: '1.8 MB', modified: '5 hours ago' },
              { name: 'presentation.pptx', type: 'file', size: '8.2 MB', modified: '1 day ago' },
              { name: 'data-analysis.xlsx', type: 'file', size: '945 KB', modified: '2 days ago' },
              { name: 'demo-video.mp4', type: 'video', size: '45.2 MB', modified: '3 days ago' },
              {
                name: 'background-music.mp3',
                type: 'audio',
                size: '4.1 MB',
                modified: '4 days ago',
              },
              { name: 'code-sample.js', type: 'code', size: '8 KB', modified: '5 days ago' },
              { name: 'readme.txt', type: 'file', size: '2 KB', modified: '1 week ago' },
              { name: 'budget-report.pdf', type: 'file', size: '3.1 MB', modified: '1 week ago' },
              { name: 'team-photo.jpg', type: 'image', size: '2.8 MB', modified: '2 weeks ago' },
              { name: 'old-backup.zip', type: 'archive', size: '125 MB', modified: '1 month ago' },
            ].map((file, index) => {
              const getIcon = (type: string) => {
                switch (type) {
                  case 'folder':
                    return <Folder className="h-4 w-4 text-blue-500" />;
                  case 'image':
                    return <ImageIcon className="h-4 w-4 text-green-500" />;
                  case 'video':
                    return <Video className="h-4 w-4 text-purple-500" />;
                  case 'audio':
                    return <Music className="h-4 w-4 text-orange-500" />;
                  case 'code':
                    return <Code className="h-4 w-4 text-red-500" />;
                  default:
                    return <FileText className="h-4 w-4 text-gray-500" />;
                }
              };

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-2 hover:bg-muted rounded-sm cursor-pointer"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getIcon(file.type)}
                    <span className="text-sm font-medium truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="w-16 text-right">{file.size}</span>
                    <span className="w-20 text-right">{file.modified}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A file explorer interface with scrollable file and folder listings, showing file types, sizes, and modification dates.',
      },
    },
  },
};

export const NotificationsFeed: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </div>
          <Badge variant="secondary">8 new</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px]">
          <div className="divide-y">
            {[
              {
                type: 'success',
                icon: CheckCircle,
                title: 'Deployment Successful',
                message: 'Your application has been deployed to production',
                time: '2 minutes ago',
                unread: true,
              },
              {
                type: 'warning',
                icon: AlertTriangle,
                title: 'High Memory Usage',
                message: 'Server memory usage is above 85%',
                time: '5 minutes ago',
                unread: true,
              },
              {
                type: 'info',
                icon: Info,
                title: 'New User Registration',
                message: 'John Doe has created a new account',
                time: '10 minutes ago',
                unread: true,
              },
              {
                type: 'success',
                icon: CheckCircle,
                title: 'Backup Completed',
                message: 'Daily backup has been completed successfully',
                time: '1 hour ago',
                unread: false,
              },
              {
                type: 'info',
                icon: User,
                title: 'Profile Updated',
                message: 'Sarah Johnson updated her profile information',
                time: '2 hours ago',
                unread: false,
              },
              {
                type: 'warning',
                icon: AlertTriangle,
                title: 'Payment Failed',
                message: 'Failed to process payment for user #1234',
                time: '3 hours ago',
                unread: false,
              },
              {
                type: 'info',
                icon: Mail,
                title: 'New Message',
                message: 'You have received a new message from support',
                time: '4 hours ago',
                unread: false,
              },
              {
                type: 'success',
                icon: Download,
                title: 'Report Generated',
                message: 'Monthly analytics report is ready for download',
                time: '5 hours ago',
                unread: false,
              },
            ].map((notification, index) => {
              const Icon = notification.icon;
              const getTypeColor = (type: string) => {
                switch (type) {
                  case 'success':
                    return 'text-green-500';
                  case 'warning':
                    return 'text-yellow-500';
                  case 'error':
                    return 'text-red-500';
                  default:
                    return 'text-blue-500';
                }
              };

              return (
                <div
                  key={index}
                  className={`p-4 hover:bg-muted/50 ${notification.unread ? 'bg-muted/30' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${getTypeColor(notification.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A notifications feed with scrollable list of system notifications, showing different types (success, warning, info) with icons and timestamps.',
      },
    },
  },
};

export const ContactsList: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Contacts</span>
        </CardTitle>
        <CardDescription>Your saved contacts</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-3">
            {[
              {
                name: 'Alice Johnson',
                email: 'alice.johnson@company.com',
                phone: '+1 (555) 123-4567',
                location: 'New York, NY',
                status: 'online',
                avatar: '',
              },
              {
                name: 'Bob Smith',
                email: 'bob.smith@company.com',
                phone: '+1 (555) 234-5678',
                location: 'Los Angeles, CA',
                status: 'away',
                avatar: '',
              },
              {
                name: 'Carol Davis',
                email: 'carol.davis@company.com',
                phone: '+1 (555) 345-6789',
                location: 'Chicago, IL',
                status: 'offline',
                avatar: '',
              },
              {
                name: 'David Wilson',
                email: 'david.wilson@company.com',
                phone: '+1 (555) 456-7890',
                location: 'Houston, TX',
                status: 'online',
                avatar: '',
              },
              {
                name: 'Emma Brown',
                email: 'emma.brown@company.com',
                phone: '+1 (555) 567-8901',
                location: 'Phoenix, AZ',
                status: 'busy',
                avatar: '',
              },
              {
                name: 'Frank Miller',
                email: 'frank.miller@company.com',
                phone: '+1 (555) 678-9012',
                location: 'Philadelphia, PA',
                status: 'online',
                avatar: '',
              },
              {
                name: 'Grace Lee',
                email: 'grace.lee@company.com',
                phone: '+1 (555) 789-0123',
                location: 'San Antonio, TX',
                status: 'offline',
                avatar: '',
              },
              {
                name: 'Henry Clark',
                email: 'henry.clark@company.com',
                phone: '+1 (555) 890-1234',
                location: 'San Diego, CA',
                status: 'away',
                avatar: '',
              },
            ].map((contact, index) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'online':
                    return 'bg-green-500';
                  case 'away':
                    return 'bg-yellow-500';
                  case 'busy':
                    return 'bg-red-500';
                  default:
                    return 'bg-gray-400';
                }
              };

              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(
                        contact.status
                      )} rounded-full border-2 border-background`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold">{contact.name}</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {contact.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {contact.location}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A contacts list with scrollable user profiles, displaying avatars, contact information, and online status indicators.',
      },
    },
  },
};

export const CodeBlock: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Code Example</span>
        </CardTitle>
        <CardDescription>React component with TypeScript</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] font-mono text-sm">
          <div className="p-4 bg-muted/30">
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
              <div className="h-4"></div>
              <div>
                <span className="text-blue-600">interface</span> ButtonProps {'{'}
              </div>
              <div className="ml-4">
                variant?: <span className="text-green-600">&apos;default&apos;</span> |{' '}
                <span className="text-green-600">&apos;destructive&apos;</span> |{' '}
                <span className="text-green-600">&apos;outline&apos;</span> |{' '}
                <span className="text-green-600">&apos;secondary&apos;</span> |{' '}
                <span className="text-green-600">&apos;ghost&apos;</span> |{' '}
                <span className="text-green-600">&apos;link&apos;</span>
              </div>
              <div className="ml-4">
                size?: <span className="text-green-600">&apos;default&apos;</span> |{' '}
                <span className="text-green-600">&apos;sm&apos;</span> |{' '}
                <span className="text-green-600">&apos;lg&apos;</span> |{' '}
                <span className="text-green-600">&apos;icon&apos;</span>
              </div>
              <div className="ml-4">
                asChild?: <span className="text-blue-600">boolean</span>
              </div>
              <div>{'}'}</div>
              <div className="h-4"></div>
              <div>
                <span className="text-blue-600">const</span> buttonVariants ={' '}
                <span className="text-purple-600">cva</span>(
              </div>
              <div className="ml-4">
                <span className="text-green-600">
                  &apos;inline-flex items-center justify-center rounded-md text-sm font-medium
                  transition-colors focus-visible:outline-none focus-visible:ring-2&apos;
                </span>
                ,
              </div>
              <div className="ml-4">{'{'}</div>
              <div className="ml-8">variants: {'{'}</div>
              <div className="ml-12">variant: {'{'}</div>
              <div className="ml-16">
                default:{' '}
                <span className="text-green-600">
                  &apos;bg-primary text-primary-foreground hover:bg-primary/90&apos;
                </span>
                ,
              </div>
              <div className="ml-16">
                destructive:{' '}
                <span className="text-green-600">
                  &apos;bg-destructive text-destructive-foreground hover:bg-destructive/90&apos;
                </span>
                ,
              </div>
              <div className="ml-16">
                outline:{' '}
                <span className="text-green-600">
                  &apos;border border-input bg-background hover:bg-accent
                  hover:text-accent-foreground&apos;
                </span>
                ,
              </div>
              <div className="ml-16">
                secondary:{' '}
                <span className="text-green-600">
                  &apos;bg-secondary text-secondary-foreground hover:bg-secondary/80&apos;
                </span>
                ,
              </div>
              <div className="ml-16">
                ghost:{' '}
                <span className="text-green-600">
                  &apos;hover:bg-accent hover:text-accent-foreground&apos;
                </span>
                ,
              </div>
              <div className="ml-16">
                link:{' '}
                <span className="text-green-600">
                  &apos;text-primary underline-offset-4 hover:underline&apos;
                </span>
                ,
              </div>
              <div className="ml-12">{'},'}</div>
              <div className="ml-12">size: {'{'}</div>
              <div className="ml-16">
                default: <span className="text-green-600">&apos;h-10 px-4 py-2&apos;</span>,
              </div>
              <div className="ml-16">
                sm: <span className="text-green-600">&apos;h-9 rounded-md px-3&apos;</span>,
              </div>
              <div className="ml-16">
                lg: <span className="text-green-600">&apos;h-11 rounded-md px-8&apos;</span>,
              </div>
              <div className="ml-16">
                icon: <span className="text-green-600">&apos;h-10 w-10&apos;</span>,
              </div>
              <div className="ml-12">{'},'}</div>
              <div className="ml-8">{'},'}</div>
              <div className="ml-8">defaultVariants: {'{'}</div>
              <div className="ml-12">
                variant: <span className="text-green-600">&apos;default&apos;</span>,
              </div>
              <div className="ml-12">
                size: <span className="text-green-600">&apos;default&apos;</span>,
              </div>
              <div className="ml-8">{'},'}</div>
              <div className="ml-4">{'}'}</div>
              <div>)</div>
              <div className="h-4"></div>
              <div>
                <span className="text-blue-600">const</span> Button ={' '}
                <span className="text-purple-600">React.forwardRef</span>&lt;
              </div>
              <div className="ml-4">HTMLButtonElement,</div>
              <div className="ml-4">ButtonProps</div>
              <div>
                &gt;(({'{ className, variant, size, asChild = false, ...props }'}, ref) =&gt; {'{'}
              </div>
              <div className="ml-4">
                <span className="text-blue-600">const</span> Comp = asChild ?{' '}
                <span className="text-purple-600">Slot</span> :{' '}
                <span className="text-green-600">&apos;button&apos;</span>
              </div>
              <div className="ml-4">
                <span className="text-blue-600">return</span> (
              </div>
              <div className="ml-8">&lt;Comp</div>
              <div className="ml-12">
                className={'{'}
                <span className="text-purple-600">cn</span>(
                <span className="text-purple-600">buttonVariants</span>({'{ variant, size }'}) ,
                className){'}'}
              </div>
              <div className="ml-12">ref={'{ref}'}</div>
              <div className="ml-12">{'{...props}'}</div>
              <div className="ml-8">/&gt;</div>
              <div className="ml-4">)</div>
              <div>{'})'}</div>
              <div>
                Button.displayName = <span className="text-green-600">&apos;Button&apos;</span>
              </div>
              <div className="h-4"></div>
              <div>
                <span className="text-blue-600">export</span> {'{ Button, buttonVariants }'}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A scrollable code block with syntax highlighting, displaying formatted source code with proper indentation and color coding.',
      },
    },
  },
};

export const SocialFeed: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Social Feed</CardTitle>
        <CardDescription>Latest posts from your network</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="divide-y">
            {[
              {
                id: 1,
                author: 'Sarah Johnson',
                avatar: '',
                time: '2 hours ago',
                content:
                  'Just finished an amazing workshop on React performance optimization! The insights on memoization and code splitting were game-changing. 🚀',
                likes: 24,
                comments: 5,
                shares: 3,
              },
              {
                id: 2,
                author: 'Mike Chen',
                avatar: '',
                time: '4 hours ago',
                content:
                  "Working on a new design system for our team. The component library is starting to take shape and I'm excited about the consistency it will bring to our products.",
                likes: 18,
                comments: 8,
                shares: 2,
              },
              {
                id: 3,
                author: 'Emily Rodriguez',
                avatar: '',
                time: '6 hours ago',
                content:
                  'Debugging session update: Found the issue! It was a race condition in our async data fetching. Sometimes the simplest solutions are the hardest to see. 🔍',
                likes: 31,
                comments: 12,
                shares: 5,
              },
              {
                id: 4,
                author: 'David Kim',
                avatar: '',
                time: '8 hours ago',
                content:
                  'Attending an incredible tech conference this week. The talks on AI and machine learning applications in web development are mind-blowing!',
                likes: 42,
                comments: 15,
                shares: 8,
              },
              {
                id: 5,
                author: 'Lisa Park',
                avatar: '',
                time: '10 hours ago',
                content:
                  'New blog post is live! I wrote about my experience transitioning from design to frontend development. Hope it helps others on a similar journey.',
                likes: 67,
                comments: 23,
                shares: 12,
              },
            ].map((post) => (
              <div key={post.id} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{post.author}</h4>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share className="h-4 w-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A social media feed with scrollable posts, displaying user avatars, content, engagement metrics (likes, comments, shares), and timestamps.',
      },
    },
  },
};
