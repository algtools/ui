import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Sources } from '@/components/ai/sources';
import type { Source } from '@/components/ai/ai-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const meta = {
  title: 'AI/Sources',
  component: Sources,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    sources: {
      control: 'object',
      description: 'Array of source objects to display',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the sources list is initially expanded',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    title: {
      control: 'text',
      description: 'Custom title for the sources section',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual variant of the component',
    },
    showIcons: {
      control: 'boolean',
      description: 'Whether to show source icons/favicons',
    },
    maxDisplayed: {
      control: 'number',
      description: 'Maximum number of sources to display before showing "show more"',
    },
  },
} satisfies Meta<typeof Sources>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock sources data
const mockSources: Source[] = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://react.dev',
    description: 'Official React documentation for building user interfaces with components',
    iconUrl: 'https://react.dev/favicon.ico',
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/',
    description: 'The official TypeScript documentation and language reference guide',
    iconUrl: 'https://www.typescriptlang.org/favicon.ico',
  },
  {
    id: '3',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Comprehensive web technology documentation including HTML, CSS, and JavaScript',
    iconUrl: 'https://developer.mozilla.org/favicon.ico',
  },
  {
    id: '4',
    title: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    description: 'Official Next.js documentation for React framework and server-side rendering',
    iconUrl: 'https://nextjs.org/favicon.ico',
  },
  {
    id: '5',
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com/docs',
    description: 'A utility-first CSS framework documentation and configuration guide',
    iconUrl: 'https://tailwindcss.com/favicon.ico',
  },
];

const shortSourceList: Source[] = [
  {
    id: '1',
    title: 'Stack Overflow Answer',
    url: 'https://stackoverflow.com/questions/123456',
    description: 'Solution for implementing React hooks with TypeScript',
    iconUrl: 'https://stackoverflow.com/favicon.ico',
  },
  {
    id: '2',
    title: 'GitHub Repository',
    url: 'https://github.com/vercel/next.js',
    description: 'Official Next.js repository on GitHub',
    iconUrl: 'https://github.com/favicon.ico',
  },
];

const sourcesWithoutIcons: Source[] = [
  {
    id: '1',
    title: 'Internal Document',
    url: 'https://internal.company.com/docs',
    description: 'Company internal documentation',
  },
  {
    id: '2',
    title: 'Research Paper',
    url: 'https://arxiv.org/abs/1234.5678',
    description: 'Academic research paper on machine learning',
  },
];

const sourcesWithoutUrls: Source[] = [
  {
    id: '1',
    title: 'Internal Knowledge Base',
    description: 'Information from company internal knowledge base',
  },
  {
    id: '2',
    title: 'Proprietary Documentation',
    description: 'Private documentation not available online',
  },
];

export const Default: Story = {
  args: {
    sources: mockSources,
    defaultOpen: false,
    showIcons: true,
    variant: 'default',
  },
};

export const DefaultOpen: Story = {
  args: {
    sources: mockSources,
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const CompactVariant: Story = {
  args: {
    sources: shortSourceList,
    defaultOpen: true,
    variant: 'compact',
    showIcons: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    sources: mockSources,
    defaultOpen: true,
    showIcons: false,
    variant: 'default',
  },
};

export const WithCustomTitle: Story = {
  args: {
    sources: shortSourceList,
    defaultOpen: false,
    title: 'Referenced 2 articles',
    showIcons: true,
    variant: 'default',
  },
};

export const WithCustomIcon: Story = {
  args: {
    sources: shortSourceList,
    defaultOpen: true,
    icon: <BookOpen className="h-4 w-4 text-purple-500" />,
    title: 'Research Sources',
    showIcons: true,
    variant: 'default',
  },
};

export const WithMaxDisplayed: Story = {
  args: {
    sources: mockSources,
    defaultOpen: true,
    maxDisplayed: 3,
    showIcons: true,
    variant: 'default',
  },
};

export const SingleSource: Story = {
  args: {
    sources: [mockSources[0]],
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const SourcesWithoutUrls: Story = {
  args: {
    sources: sourcesWithoutUrls,
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const SourcesWithoutIconUrls: Story = {
  args: {
    sources: sourcesWithoutIcons,
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const LargeSourceList: Story = {
  args: {
    sources: [
      ...mockSources,
      {
        id: '6',
        title: 'Vue.js Documentation',
        url: 'https://vuejs.org/guide/',
        description: 'The progressive JavaScript framework documentation',
        iconUrl: 'https://vuejs.org/favicon.ico',
      },
      {
        id: '7',
        title: 'Angular Documentation',
        url: 'https://angular.io/docs',
        description: 'Official Angular framework documentation and guides',
        iconUrl: 'https://angular.io/favicon.ico',
      },
      {
        id: '8',
        title: 'Svelte Tutorial',
        url: 'https://svelte.dev/tutorial',
        description: 'Interactive Svelte framework tutorial',
        iconUrl: 'https://svelte.dev/favicon.ico',
      },
    ],
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const WithCallback: Story = {
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Sources</CardTitle>
            <CardDescription>Click on a source to see the callback in action</CardDescription>
          </CardHeader>
          <CardContent>
            {clicked && (
              <div className="mb-4 rounded-md bg-green-50 dark:bg-green-950 p-3 text-sm">
                <p className="font-medium text-green-800 dark:text-green-200">Clicked: {clicked}</p>
              </div>
            )}
            <Sources
              sources={mockSources.slice(0, 3)}
              defaultOpen={true}
              onSourceClick={(source) => setClicked(source.title)}
            />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Controlled Sources</CardTitle>
            <CardDescription>Control the open state with external buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setOpen(true)} variant="outline" size="sm">
                Expand Sources
              </Button>
              <Button onClick={() => setOpen(false)} variant="outline" size="sm">
                Collapse Sources
              </Button>
              <Button onClick={() => setOpen(!open)} variant="outline" size="sm">
                Toggle Sources
              </Button>
            </div>
            <Sources
              sources={mockSources.slice(0, 3)}
              open={open}
              onOpenChange={setOpen}
              showIcons={true}
            />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const AIResponseExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>AI Response with Sources</CardTitle>
          <CardDescription>Example of how sources appear in an AI conversation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>
              React is a JavaScript library for building user interfaces. It was developed by
              Facebook and is maintained by Meta and a community of individual developers and
              companies.
            </p>
            <p>
              React uses a declarative programming paradigm and a component-based architecture,
              which makes it easy to build complex UIs from small, isolated pieces of code called
              components.
            </p>
          </div>

          <Sources
            sources={[mockSources[0], mockSources[2], mockSources[3]]}
            defaultOpen={false}
            showIcons={true}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const MultipleSourcesSections: Story = {
  render: () => (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Multiple Source Sections</CardTitle>
          <CardDescription>
            Example showing different source collections in one view
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Framework Documentation</h3>
            <Sources
              sources={[mockSources[0], mockSources[3]]}
              title="Used 2 framework sources"
              defaultOpen={true}
              variant="default"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Language References</h3>
            <Sources
              sources={[mockSources[1], mockSources[2]]}
              title="Used 2 language sources"
              defaultOpen={false}
              variant="default"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Styling Resources</h3>
            <Sources sources={[mockSources[4]]} defaultOpen={false} variant="compact" />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const EmptySources: Story = {
  render: () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Empty Sources</CardTitle>
          <CardDescription>
            When no sources are provided, the component doesn&apos;t render
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            The component below has an empty sources array:
          </div>
          <Sources sources={[]} />
          <div className="text-sm text-muted-foreground mt-4">
            (Nothing should appear above this text)
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const MixedContentTypes: Story = {
  args: {
    sources: [
      {
        id: '1',
        title: 'Article with everything',
        url: 'https://example.com/article',
        description: 'This source has a title, URL, description, and icon',
        iconUrl: 'https://example.com/favicon.ico',
      },
      {
        id: '2',
        title: 'Article without description',
        url: 'https://example.com/simple',
        iconUrl: 'https://example.com/favicon.ico',
      },
      {
        id: '3',
        title: 'Article without icon',
        url: 'https://example.com/no-icon',
        description: 'This source has no icon URL',
      },
      {
        id: '4',
        title: 'Internal source without URL',
        description: 'This source has no external URL',
      },
    ],
    defaultOpen: true,
    showIcons: true,
    variant: 'default',
  },
};

export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Responsive Behavior</CardTitle>
          <CardDescription>Sources adapt to different screen sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Default Variant</h4>
              <Sources sources={mockSources.slice(0, 3)} defaultOpen={true} variant="default" />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Compact Variant</h4>
              <Sources sources={mockSources.slice(0, 3)} defaultOpen={true} variant="compact" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
