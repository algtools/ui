import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Settings,
  Shield,
  Bell,
  Palette,
  Globe,
  Activity,
  FileText,
  Users,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Video,
  Music,
  Download,
  Upload,
  Code,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A set of layered sections of content that are displayed one at a time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The controlled value of the tab',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when uncontrolled',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">
          <Activity className="mr-2 h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="mr-2 h-4 w-4" />
          Reports
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>View detailed analytics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm text-muted-foreground">3.2%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bounce Rate</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Page Load Time</span>
                  <span className="text-sm text-muted-foreground">1.2s</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and download reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Monthly Sales Report</h4>
                  <p className="text-sm text-muted-foreground">Sales data for the current month</p>
                </div>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">User Activity Report</h4>
                  <p className="text-sm text-muted-foreground">
                    User engagement and activity metrics
                  </p>
                </div>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Financial Summary</h4>
                  <p className="text-sm text-muted-foreground">Complete financial overview</p>
                </div>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email notifications</Label>
              <div className="flex items-center space-x-2">
                <Input id="email" placeholder="Enter your email" />
                <Button>Save</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select className="w-full p-2 border rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const UserProfile: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue="profile" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">
          <User className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="experience">
          <Briefcase className="mr-2 h-4 w-4" />
          Experience
        </TabsTrigger>
        <TabsTrigger value="education">
          <GraduationCap className="mr-2 h-4 w-4" />
          Education
        </TabsTrigger>
        <TabsTrigger value="skills">
          <Code className="mr-2 h-4 w-4" />
          Skills
        </TabsTrigger>
        <TabsTrigger value="contact">
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button>Change Avatar</Button>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Passionate developer with 5+ years of experience in building web applications."
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Your professional work history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Senior Developer</h3>
                  <Badge>Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Tech Corp • 2022 - Present</p>
                <p className="text-sm mt-2">
                  Leading a team of 5 developers, architecting scalable web applications using React
                  and Node.js.
                </p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">Full Stack Developer</h3>
                <p className="text-sm text-muted-foreground">StartupXYZ • 2020 - 2022</p>
                <p className="text-sm mt-2">
                  Developed and maintained multiple client projects using modern web technologies.
                </p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">Frontend Developer</h3>
                <p className="text-sm text-muted-foreground">WebAgency • 2019 - 2020</p>
                <p className="text-sm mt-2">
                  Created responsive websites and web applications for various clients.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="education" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your educational background and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold">Computer Science, B.S.</h3>
                <p className="text-sm text-muted-foreground">
                  University of Technology • 2015 - 2019
                </p>
                <p className="text-sm mt-2">
                  Graduated with honors. Specialized in software engineering and web development.
                </p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">AWS Certified Solutions Architect</h3>
                <p className="text-sm text-muted-foreground">Amazon Web Services • 2021</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">React Developer Certification</h3>
                <p className="text-sm text-muted-foreground">Meta • 2020</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Skills & Technologies</CardTitle>
            <CardDescription>Your technical skills and proficiency levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">JavaScript/TypeScript</span>
                  <span className="text-sm text-muted-foreground">Expert</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">React/Next.js</span>
                  <span className="text-sm text-muted-foreground">Expert</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Node.js</span>
                  <span className="text-sm text-muted-foreground">Advanced</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AWS/Cloud</span>
                  <span className="text-sm text-muted-foreground">Intermediate</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How others can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue="john.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input id="website" defaultValue="https://johndoe.dev" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const MediaLibrary: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue="images" className="w-[700px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="images">
          <ImageIcon className="mr-2 h-4 w-4" />
          Images
        </TabsTrigger>
        <TabsTrigger value="videos">
          <Video className="mr-2 h-4 w-4" />
          Videos
        </TabsTrigger>
        <TabsTrigger value="audio">
          <Music className="mr-2 h-4 w-4" />
          Audio
        </TabsTrigger>
        <TabsTrigger value="documents">
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </TabsTrigger>
      </TabsList>

      <TabsContent value="images" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Image Gallery</h3>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium">image-{i}.jpg</p>
                <p className="text-xs text-muted-foreground">2.4 MB</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="videos" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Video Library</h3>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Videos
          </Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded">
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">presentation-{i}.mp4</h4>
                    <p className="text-sm text-muted-foreground">45.2 MB • 5:30 duration</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="audio" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Audio Files</h3>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Audio
          </Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded">
                    <Music className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">track-{i}.mp3</h4>
                    <p className="text-sm text-muted-foreground">8.5 MB • 3:45 duration</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Documents</h3>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'contract.pdf', size: '1.2 MB', type: 'PDF' },
            { name: 'proposal.docx', size: '856 KB', type: 'Word' },
            { name: 'spreadsheet.xlsx', size: '2.1 MB', type: 'Excel' },
            { name: 'presentation.pptx', size: '15.3 MB', type: 'PowerPoint' },
          ].map((doc, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doc.size} • {doc.type}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ProjectManagement: Story = {
  args: {},
  render: () => {
    const [activeTab, setActiveTab] = useState('tasks');

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[900px]">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tasks">
            <CheckCircle className="mr-2 h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileText className="mr-2 h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <TrendingUp className="mr-2 h-4 w-4" />
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <Button>Add Task</Button>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Design user interface mockups',
                status: 'completed',
                priority: 'high',
                assignee: 'Alice',
              },
              {
                title: 'Implement authentication system',
                status: 'in-progress',
                priority: 'high',
                assignee: 'Bob',
              },
              {
                title: 'Set up database schema',
                status: 'in-progress',
                priority: 'medium',
                assignee: 'Charlie',
              },
              {
                title: 'Write API documentation',
                status: 'pending',
                priority: 'low',
                assignee: 'Diana',
              },
              {
                title: 'Conduct user testing',
                status: 'pending',
                priority: 'medium',
                assignee: 'Eve',
              },
            ].map((task, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : task.status === 'in-progress' ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant={
                            task.priority === 'high'
                              ? 'destructive'
                              : task.priority === 'medium'
                                ? 'default'
                                : 'secondary'
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Assigned to {task.assignee}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <h3 className="text-lg font-semibold">Project Timeline</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  <div className="space-y-6">
                    {[
                      { date: 'Jan 15', title: 'Project Kickoff', completed: true },
                      { date: 'Jan 22', title: 'Design Phase Complete', completed: true },
                      { date: 'Feb 5', title: 'Development Milestone 1', completed: false },
                      { date: 'Feb 20', title: 'Testing Phase', completed: false },
                      { date: 'Mar 1', title: 'Project Launch', completed: false },
                    ].map((milestone, i) => (
                      <div key={i} className="relative flex items-center space-x-4">
                        <div
                          className={`relative z-10 w-3 h-3 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                        ></div>
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Alice Johnson', role: 'Project Manager', avatar: 'AJ', status: 'online' },
              { name: 'Bob Smith', role: 'Frontend Developer', avatar: 'BS', status: 'online' },
              { name: 'Charlie Brown', role: 'Backend Developer', avatar: 'CB', status: 'away' },
              { name: 'Diana Prince', role: 'UX Designer', avatar: 'DP', status: 'offline' },
            ].map((member, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Badge
                      variant={
                        member.status === 'online'
                          ? 'default'
                          : member.status === 'away'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Files</h3>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'requirements.pdf', size: '2.3 MB', modified: '2 hours ago' },
              { name: 'wireframes.fig', size: '8.7 MB', modified: '1 day ago' },
              { name: 'database-schema.sql', size: '45 KB', modified: '3 days ago' },
              { name: 'api-specs.yaml', size: '123 KB', modified: '1 week ago' },
            ].map((file, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • Modified {file.modified}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <h3 className="text-lg font-semibold">Project Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed Tasks</span>
                    <span>12/20</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time Remaining</span>
                    <span>2 weeks</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Velocity</span>
                    <span>8.5 points/sprint</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Code Quality</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};

export const SettingsPanel: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue="general" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">
          <Settings className="mr-2 h-4 w-4" />
          General
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="mr-2 h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="appearance">
          <Palette className="mr-2 h-4 w-4" />
          Appearance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your general account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select className="w-full p-2 border rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full p-2 border rounded">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">Use an authenticator app</p>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <input type="checkbox" />
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Notification Types</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account updates</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security alerts</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing emails</span>
                  <input type="checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Product updates</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize how the interface looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 border rounded cursor-pointer hover:bg-muted">
                  <div className="w-full h-8 bg-background border rounded mb-2"></div>
                  <p className="text-sm text-center">Light</p>
                </div>
                <div className="p-3 border rounded cursor-pointer hover:bg-muted">
                  <div className="w-full h-8 bg-gray-900 rounded mb-2"></div>
                  <p className="text-sm text-center">Dark</p>
                </div>
                <div className="p-3 border rounded cursor-pointer hover:bg-muted">
                  <div className="w-full h-8 bg-gradient-to-r from-background to-gray-900 rounded mb-2"></div>
                  <p className="text-sm text-center">System</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Font Size</Label>
              <select className="w-full p-2 border rounded">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer"></div>
                <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded cursor-pointer"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Compact: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1" className="text-xs">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" className="text-xs">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" className="text-xs">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-2">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">
              This is the content for the first tab. It&apos;s compact and to the point.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2" className="mt-2">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">This is the content for the second tab. Also compact.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3" className="mt-2">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">This is the content for the third tab. Consistent sizing.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
