import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDays,
  Github,
  MapPin,
  Building,
  Users,
  Star,
  GitFork,
  Clock,
  Package,
  ExternalLink,
  Heart,
  MessageCircle,
  Info,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Globe,
  BookOpen,
  Award,
  Briefcase,
} from 'lucide-react';

const meta = {
  title: 'Feedback/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    openDelay: {
      control: { type: 'number', min: 0, max: 2000 },
      description: 'Delay before opening the hover card (in ms)',
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000 },
      description: 'Delay before closing the hover card (in ms)',
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    openDelay: 600,
    closeDelay: 300,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">@username</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@vercel</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default hover card that appears on hover, displaying user information with avatar, username, and join date.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-base">
          @shadcn
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <div>
              <h4 className="text-sm font-semibold">shadcn</h4>
              <p className="text-sm text-muted-foreground">Building @shadcn/ui</p>
            </div>
            <p className="text-sm">UI components that you can copy and paste into your apps.</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                <span>London, UK</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-3 w-3" />
                <span>Joined Mar 2020</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Users className="mr-1 h-3 w-3" />
                1.2k followers
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Github className="mr-1 h-3 w-3" />
                Open Source
              </Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A user profile hover card with detailed user information, demonstrating comprehensive profile previews.',
      },
    },
  },
};

export const RepositoryPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-blue-600">
          shadcn/ui
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-blue-600">shadcn/ui</h4>
              <p className="text-xs text-muted-foreground">Public repository</p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Package className="mr-1 h-3 w-3" />
              TypeScript
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Beautifully designed components that you can copy and paste into your apps. Accessible.
            Customizable. Open Source.
          </p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3" />
              <span>65.2k</span>
            </div>
            <div className="flex items-center">
              <GitFork className="mr-1 h-3 w-3" />
              <span>3.8k</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>Updated 2 hours ago</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              React
            </Badge>
            <Badge variant="secondary" className="text-xs">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Tailwind
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Radix
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A repository preview hover card showing repository information like stars, forks, and description.',
      },
    },
  },
};

export const ProductPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer rounded-lg border p-4 hover:bg-accent transition-colors">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="font-medium">Next.js Pro</span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div>
              <h4 className="font-semibold">Next.js Pro</h4>
              <p className="text-sm text-muted-foreground">
                Premium Next.js course with advanced patterns
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">$99</span>
              <span className="text-sm text-muted-foreground line-through">$149</span>
              <Badge variant="destructive" className="text-xs">
                33% OFF
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>4.9 (1,247 reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>12 hours of video content</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>Source code included</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>Lifetime access</span>
            </div>
          </div>

          <Button className="w-full">Enroll Now</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A product preview hover card displaying product information, price, and details, demonstrating e-commerce use cases.',
      },
    },
  },
};

export const HelpTooltip: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <span>API Key</span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <HelpCircle className="h-3 w-3" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-blue-500" />
              <h4 className="font-semibold text-sm">About API Keys</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              API keys are used to authenticate your requests. Keep them secure and never share them
              publicly. You can regenerate your API key at any time.
            </p>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Security Warning
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Never expose your API key in client-side code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A help tooltip hover card providing contextual help and information, demonstrating help content display.',
      },
    },
  },
};

export const TeamMember: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-accent transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/octocat.png" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
          <span className="font-medium">Sarah Chen</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/octocat.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-semibold">Sarah Chen</h4>
              <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Building className="mr-1 h-3 w-3" />
                <span>Design Systems Team</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>sarah.chen@company.com</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-sm">
              <Briefcase className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>5 years experience</span>
            </div>
          </div>

          <div className="flex space-x-1">
            <Badge variant="secondary" className="text-xs">
              React
            </Badge>
            <Badge variant="secondary" className="text-xs">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Design Systems
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A team member hover card displaying team member information, role, and contact details.',
      },
    },
  },
};

export const ArticlePreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-left">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground hover:underline">
              Building Scalable Design Systems with React and TypeScript
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Learn how to create maintainable component libraries...
            </p>
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-3">
          <div className="aspect-video rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">
              Building Scalable Design Systems with React and TypeScript
            </h4>
            <p className="text-sm text-muted-foreground">
              A comprehensive guide to creating maintainable and scalable component libraries. Learn
              best practices, tooling, and patterns used by top design teams.
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                <span>John Doe</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>8 min read</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Heart className="mr-1 h-3 w-3" />
                <span>234</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-1 h-3 w-3" />
                <span>42</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Badge variant="outline" className="text-xs">
                React
              </Badge>
              <Badge variant="outline" className="text-xs">
                TypeScript
              </Badge>
              <Badge variant="outline" className="text-xs">
                Design
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <BookOpen className="mr-1 h-3 w-3" />
              Read Article
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An article preview hover card showing article title, excerpt, and metadata, demonstrating content previews.',
      },
    },
  },
};

export const CompanyInfo: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-gradient-to-r from-green-500 to-blue-600"></div>
          <span>Acme Corp</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold">Acme Corp</h4>
              <p className="text-sm text-muted-foreground">Enterprise Software Solutions</p>
            </div>
          </div>

          <p className="text-sm">
            Leading provider of cloud-based enterprise solutions for modern businesses. Trusted by
            over 10,000 companies worldwide.
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Building className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>Founded in 2010</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>1,000+ employees</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-sm">
              <Globe className="mr-2 h-3 w-3 text-muted-foreground" />
              <span>acme-corp.com</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Badge variant="secondary" className="text-xs">
              <Award className="mr-1 h-3 w-3" />
              Fortune 500
            </Badge>
            <Badge variant="outline" className="text-xs">
              B2B
            </Badge>
            <Badge variant="outline" className="text-xs">
              SaaS
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A company info hover card displaying company details, location, and contact information.',
      },
    },
  },
};

export const MultipleHoverCards: Story = {
  render: () => (
    <div className="space-y-4">
      <p>Hover over different elements to see their information:</p>
      <div className="flex flex-wrap gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">User Profile</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex space-x-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Repository</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="font-semibold">my-awesome-project</h4>
              <p className="text-sm text-muted-foreground">A cool project with lots of features</p>
              <div className="flex space-x-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Help</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <h4 className="font-semibold">Need Help?</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Contact our support team for assistance with your account.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple hover cards displayed together, demonstrating how to manage multiple hover card instances on the same page.',
      },
    },
  },
};
