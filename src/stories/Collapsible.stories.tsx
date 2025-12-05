import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
} from 'lucide-react';

const meta = {
  title: 'Layout/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive component which expands/collapses a section of content. Built with Radix UI for accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the collapsible content is open',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the open state changes',
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    defaultOpen: false,
    disabled: false,
  },
  render: (args) => (
    <Collapsible className="w-80" {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-4">
          <span>Can I use this in my project?</span>
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-4 pb-4">
        <p className="text-sm text-muted-foreground">
          Yes! This component is built with Radix UI and Tailwind CSS. You can copy and paste the
          code into your project and customize it to your needs.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic collapsible component with a trigger button and expandable content, commonly used for FAQs and accordions.',
      },
    },
  },
};

export const WithCard: Story = {
  render: () => (
    <Card className="w-96">
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Configure your project preferences</CardDescription>
              </div>
              <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-save</label>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark mode</label>
              <Badge variant="outline">Auto</Badge>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Notifications</label>
              <Badge variant="destructive">Disabled</Badge>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A collapsible integrated within a card component, using the card header as the trigger for settings panels.',
      },
    },
  },
};

export const ControlledState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsOpen(!isOpen)} variant="outline">
            {isOpen ? 'Close' : 'Open'} Details
          </Button>
          <span className="text-sm text-muted-foreground">
            Status: {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Advanced Options</span>
              <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 p-4 border border-border rounded-md">
            <div>
              <h4 className="text-sm font-medium">Cache Settings</h4>
              <p className="text-xs text-muted-foreground">Configure caching behavior</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">API Configuration</h4>
              <p className="text-xs text-muted-foreground">Set up API endpoints and keys</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Security Options</h4>
              <p className="text-xs text-muted-foreground">Manage security preferences</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled collapsible where the open state is managed externally, allowing programmatic control and status display.',
      },
    },
  },
};

export const NestedCollapsibles: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <h3 className="text-lg font-semibold">System Preferences</h3>

      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account Settings</span>
            </div>
            <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span>Profile Information</span>
                <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 py-2 space-y-1">
              <p className="text-sm text-muted-foreground">• Name and email</p>
              <p className="text-sm text-muted-foreground">• Profile picture</p>
              <p className="text-sm text-muted-foreground">• Bio and social links</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span>Privacy Settings</span>
                <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 py-2 space-y-1">
              <p className="text-sm text-muted-foreground">• Data visibility</p>
              <p className="text-sm text-muted-foreground">• Contact preferences</p>
              <p className="text-sm text-muted-foreground">• Activity tracking</p>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm">Email notifications</span>
            <Badge variant="secondary">On</Badge>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm">Push notifications</span>
            <Badge variant="outline">Off</Badge>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm">SMS notifications</span>
            <Badge variant="outline">Off</Badge>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested collapsibles creating a hierarchical menu structure, useful for settings panels and navigation menus.',
      },
    },
  },
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      {
        question: 'What is a design system?',
        answer:
          'A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.',
      },
      {
        question: 'How do I get started?',
        answer:
          'You can start by installing the components using npm or by copying the source code directly into your project. Make sure you have Tailwind CSS configured.',
      },
      {
        question: 'Is this compatible with Next.js?',
        answer:
          'Yes! This component library works great with Next.js. All components are built with React and are fully compatible with Next.js applications.',
      },
      {
        question: 'Can I customize the styling?',
        answer:
          'Absolutely! All components are built with Tailwind CSS classes and can be easily customized by modifying the className prop or extending the base styles.',
      },
    ];

    return (
      <div className="w-[600px] space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <Collapsible key={index} defaultOpen={index === 0}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-4 h-auto text-left">
                  <span className="text-sm font-medium">{faq.question}</span>
                  <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CollapsibleContent>
              {index < faqs.length - 1 && <Separator />}
            </Collapsible>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A FAQ section built with collapsibles, where each question expands to reveal its answer, with separators between items.',
      },
    },
  },
};

export const MenuNavigation: Story = {
  render: () => {
    const menuItems = [
      {
        icon: Settings,
        title: 'General',
        items: ['Profile', 'Account', 'Appearance', 'Language'],
      },
      {
        icon: Shield,
        title: 'Security',
        items: ['Password', 'Two-factor', 'Sessions', 'API Keys'],
      },
      {
        icon: CreditCard,
        title: 'Billing',
        items: ['Subscription', 'Payment methods', 'Invoices', 'Usage'],
      },
      {
        icon: Globe,
        title: 'Integration',
        items: ['Webhooks', 'API', 'Extensions', 'Third-party'],
      },
    ];

    return (
      <div className="w-80 border border-border rounded-lg p-2">
        <div className="space-y-1">
          {menuItems.map((section, index) => (
            <Collapsible key={index} defaultOpen={index === 0}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2">
                  <div className="flex items-center gap-2">
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A navigation menu using collapsibles to organize menu sections with icons and expandable sub-items.',
      },
    },
  },
};

export const WithAnimation: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Smooth Animation Example</span>
            <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="p-4 space-y-4 border border-border rounded-md mt-2">
            <div>
              <h4 className="text-sm font-semibold">Animation Details</h4>
              <p className="text-sm text-muted-foreground">
                This collapsible uses CSS animations for smooth open/close transitions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Performance</h4>
              <p className="text-sm text-muted-foreground">
                The animation is optimized for performance using CSS transforms.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Accessibility</h4>
              <p className="text-sm text-muted-foreground">
                Animations respect the user&apos;s motion preferences.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A collapsible with enhanced animations using CSS transitions and keyframe animations for smooth expand/collapse effects.',
      },
    },
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Collapsible disabled>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between" disabled>
            <span>Disabled Collapsible</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <p className="text-sm text-muted-foreground">
            This content cannot be accessed as the collapsible is disabled.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <div className="text-sm text-muted-foreground">
        Note: When disabled, the trigger button becomes non-interactive and the content remains
        hidden.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A disabled collapsible that cannot be interacted with, useful for conditional UI states where content should not be accessible.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <div className="group cursor-pointer rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100 data-[state=open]:border-blue-300 data-[state=open]:bg-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-blue-900">Custom Blue Theme</h3>
                <p className="text-xs text-blue-700">Click to expand custom styled content</p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-blue-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 rounded-lg border border-blue-200 bg-white p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-blue-900">Custom styled content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-blue-800">Coordinated color scheme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                <span className="text-sm text-blue-700">Consistent theming</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A collapsible with custom styling demonstrating how to theme the component with a coordinated color scheme and custom design.',
      },
    },
  },
};
