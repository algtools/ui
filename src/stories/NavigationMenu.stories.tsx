/* eslint-disable @next/next/no-html-link-for-pages */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  Home,
  ShoppingCart,
  Users,
  HelpCircle,
  BookOpen,
  Code,
  Palette,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Building,
  User,
  Mail,
  Star,
  FileText,
  Video,
  Headphones,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collection of links for navigating websites, featuring hover and focus states with rich content areas.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Zap className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Introduction</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/installation"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Installation</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/typography"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Typography</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/alert-dialog"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Alert Dialog</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A modal dialog that interrupts the user with important content.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/hover-card"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Hover Card</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      For sighted users to preview content available behind a link.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/progress"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Progress</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Displays an indicator showing the completion progress.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/scroll-area"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Scroll-area</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Visually or semantically separates content.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/tabs"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Tabs</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A set of layered sections of content.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/primitives/tooltip"
                    className={cn(navigationMenuTriggerStyle(), 'h-auto justify-start')}
                  >
                    <div className="text-sm font-medium">Tooltip</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A popup that displays information related to an element.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A default navigation menu with "Getting started" and "Components" dropdowns, featuring rich content areas with descriptions and links.',
      },
    },
  },
};

export const SimpleNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/products" className={navigationMenuTriggerStyle()}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
            <Users className="mr-2 h-4 w-4" />
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A simple navigation menu with icon links to Home, Products, About, and Contact pages, demonstrating basic navigation without dropdowns.',
      },
    },
  },
};

export const ProductNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <div className="grid gap-3">
                <h4 className="text-sm font-medium leading-none">Web Development</h4>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/websites"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Globe className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Websites</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Modern, responsive websites built with the latest technologies.
                    </p>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/apps"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Smartphone className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Web Apps</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Interactive web applications with advanced functionality.
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-3">
                <h4 className="text-sm font-medium leading-none">Digital Services</h4>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/design"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Palette className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">UI/UX Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Beautiful, user-centered design solutions.
                    </p>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/consulting"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Users className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Consulting</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Expert guidance for your digital transformation.
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/solutions/enterprise"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Building className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Enterprise</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Scalable solutions for large organizations.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/solutions/startups"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Zap className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Startups</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Fast, cost-effective solutions for growing businesses.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/solutions/ecommerce"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <ShoppingCart className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">E-commerce</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Complete online store solutions.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/solutions/content"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <FileText className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Content Management</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Easy-to-use content management systems.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A product-focused navigation menu with "Products" and "Solutions" dropdowns, showcasing categorized offerings like web development and digital services.',
      },
    },
  },
};

export const WithoutViewport: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[300px]">
              <NavigationMenuLink asChild>
                <a
                  href="/web-design"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Web Design</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Custom website design and development
                  </p>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a
                  href="/branding"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Branding</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Logo design and brand identity
                  </p>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a
                  href="/marketing"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Digital Marketing</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    SEO, social media, and online advertising
                  </p>
                </a>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/portfolio" className={navigationMenuTriggerStyle()}>
            Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/blog" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A navigation menu with viewport disabled, demonstrating how the menu behaves without the automatic viewport positioning feature.',
      },
    },
  },
};

export const ResourcesNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Learning</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 no-underline outline-none focus:shadow-md"
                    href="/learn"
                  >
                    <BookOpen className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Learn & Grow</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive tutorials, guides, and resources to master web development.
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink asChild>
                <a
                  href="/tutorials"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <Video className="h-4 w-4 mb-1" />
                  <div className="text-sm font-medium leading-none">Video Tutorials</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Step-by-step video guides for all skill levels.
                  </p>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a
                  href="/documentation"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <FileText className="h-4 w-4 mb-1" />
                  <div className="text-sm font-medium leading-none">Documentation</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Detailed technical documentation and API references.
                  </p>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a
                  href="/examples"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <Code className="h-4 w-4 mb-1" />
                  <div className="text-sm font-medium leading-none">Code Examples</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Ready-to-use code snippets and examples.
                  </p>
                </a>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Community</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/forum"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Users className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Forum</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Connect with other developers and get help.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/discord"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Headphones className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Discord</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Join our Discord server for real-time chat.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/events"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Star className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Events</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Workshops, meetups, and online events.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/showcase"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <ImageIcon className="h-4 w-4 mb-2" />
                    <div className="text-sm font-medium leading-none">Showcase</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Projects built by our community members.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/newsletter" className={navigationMenuTriggerStyle()}>
            Newsletter
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/support" className={navigationMenuTriggerStyle()}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A resources-focused navigation menu with "Learning" and "Community" dropdowns, featuring educational content and community links with a highlighted call-to-action area.',
      },
    },
  },
};

export const CompactNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quick Links</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/dashboard"
                    className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Dashboard</div>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/profile"
                    className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Profile</div>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/settings"
                    className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Settings</div>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/logout"
                    className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Sign Out</div>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A compact navigation menu with a minimal "Quick Links" dropdown, showing a space-efficient menu design for dashboards and user interfaces.',
      },
    },
  },
};

export const ComplexNavigation: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-6 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[1fr_1fr]">
                <div>
                  <h4 className="text-sm font-medium leading-none mb-3">Development Tools</h4>
                  <div className="grid gap-3">
                    <NavigationMenuLink asChild>
                      <a
                        href="/ide"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <Code className="h-4 w-4 mb-2" />
                        <div className="text-sm font-medium leading-none">Cloud IDE</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Code, build, and deploy from anywhere
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        href="/databases"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <Monitor className="h-4 w-4 mb-2" />
                        <div className="text-sm font-medium leading-none">Databases</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Managed databases for your applications
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium leading-none mb-3">Infrastructure</h4>
                  <div className="grid gap-3">
                    <NavigationMenuLink asChild>
                      <a
                        href="/hosting"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <Globe className="h-4 w-4 mb-2" />
                        <div className="text-sm font-medium leading-none">Web Hosting</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Fast, reliable hosting worldwide
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        href="/cdn"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <Zap className="h-4 w-4 mb-2" />
                        <div className="text-sm font-medium leading-none">Edge Network</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Global CDN for optimal performance
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/ecommerce"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <ShoppingCart className="h-4 w-4 mb-2" />
                      <div className="text-sm font-medium leading-none">E-commerce</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Everything you need to sell online
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/saas"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <Building className="h-4 w-4 mb-2" />
                      <div className="text-sm font-medium leading-none">SaaS Apps</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Build and scale subscription services
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/marketplace"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <Users className="h-4 w-4 mb-2" />
                      <div className="text-sm font-medium leading-none">Marketplaces</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Connect buyers and sellers efficiently
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/portfolio"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <User className="h-4 w-4 mb-2" />
                      <div className="text-sm font-medium leading-none">Portfolios</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Showcase your work beautifully
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/blog" className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A complex navigation menu with "Platform" and "Solutions" dropdowns, featuring multi-column layouts with categorized links and descriptions for enterprise-level navigation.',
      },
    },
  },
};
