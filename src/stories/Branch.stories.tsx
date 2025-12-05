import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Branch, BranchIndicator } from '@/components/ui/branch';
import type { Branch as BranchType } from '@/components/ai/ai-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
  Code,
  FileText,
  Lightbulb,
} from 'lucide-react';

const meta = {
  title: 'AI/Branch',
  component: Branch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A component for displaying and navigating between multiple AI response variations. Perfect for exploring different AI outputs and selecting the best response.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    branches: {
      control: 'object',
      description: 'Array of branch variations to display',
    },
    defaultValue: {
      control: 'text',
      description: 'The default active branch ID',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Whether to show branch indicators',
    },
    onBranchChange: {
      action: 'branch changed',
      description: 'Callback when active branch changes',
    },
  },
} satisfies Meta<typeof Branch>;

export default meta;
type Story = StoryObj<typeof Branch>;

const simpleBranches: BranchType[] = [
  {
    id: '1',
    title: 'Response A',
    content:
      'This is the first variation of the AI response. It provides a concise and direct answer to the question.',
  },
  {
    id: '2',
    title: 'Response B',
    content:
      'This is the second variation of the AI response. It offers more detailed information and additional context.',
  },
  {
    id: '3',
    title: 'Response C',
    content:
      'This is the third variation of the AI response. It takes a different approach and emphasizes practical examples.',
  },
];

export const Default: Story = {
  args: {
    branches: simpleBranches,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default Branch component displaying multiple AI response variations with branch indicators.',
      },
    },
  },
};

export const WithoutIndicators: Story = {
  args: {
    branches: simpleBranches,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component without visual indicators, providing a cleaner interface for branch navigation.',
      },
    },
  },
};

export const TwoBranches: Story = {
  args: {
    branches: simpleBranches.slice(0, 2),
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component with two response variations, demonstrating the simplest use case.',
      },
    },
  },
};

export const ManyBranches: Story = {
  args: {
    branches: [
      { id: '1', title: 'Brief', content: 'A short, concise answer.' },
      { id: '2', title: 'Detailed', content: 'A comprehensive, detailed response with examples.' },
      { id: '3', title: 'Technical', content: 'A technical explanation with code snippets.' },
      { id: '4', title: 'Simple', content: 'An easy-to-understand explanation for beginners.' },
      { id: '5', title: 'Advanced', content: 'An advanced explanation for experts.' },
    ],
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component handling multiple response variations, showing how it scales with many options.',
      },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    branches: simpleBranches,
    renderLabel: (branch: BranchType, index: number) => (
      <span className="flex items-center gap-2">
        <Badge variant="secondary">{index + 1}</Badge>
        {branch.title}
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component with custom label rendering, allowing for numbered badges and custom styling.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    branches: simpleBranches,
    renderContent: (content: string, branch: BranchType) => (
      <Card>
        <CardHeader>
          <CardTitle>{branch.title}</CardTitle>
          <CardDescription>
            Generated at {branch.timestamp ? new Date(branch.timestamp).toLocaleString() : 'now'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{content}</p>
        </CardContent>
      </Card>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component with custom content rendering using Card components, showing metadata and structured layout.',
      },
    },
  },
};

export const CodeComparison: Story = {
  render: () => {
    const codeBranches: BranchType[] = [
      {
        id: '1',
        title: 'Functional',
        content: `function calculateSum(a: number, b: number): number {
  return a + b;
}

// Usage
const result = calculateSum(5, 3);
console.log(result); // 8`,
      },
      {
        id: '2',
        title: 'Object-Oriented',
        content: `class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// Usage
const calc = new Calculator();
const result = calc.add(5, 3);
console.log(result); // 8`,
      },
      {
        id: '3',
        title: 'Arrow Function',
        content: `const calculateSum = (a: number, b: number): number => a + b;

// Usage
const result = calculateSum(5, 3);
console.log(result); // 8`,
      },
    ];

    return (
      <div className="w-[700px]">
        <Branch
          branches={codeBranches}
          renderContent={(content) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{content}</code>
            </pre>
          )}
          renderLabel={(branch) => (
            <span className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              {branch.title}
            </span>
          )}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component used for comparing different code implementations, with syntax-highlighted code blocks and custom labels.',
      },
    },
  },
};

export const AIResponseVariations: Story = {
  render: () => {
    const [selectedBranch, setSelectedBranch] = useState('1');

    const aiBranches: BranchType[] = [
      {
        id: '1',
        title: 'Concise',
        content:
          'React is a JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering.',
        timestamp: new Date(Date.now() - 5000),
      },
      {
        id: '2',
        title: 'Detailed',
        content:
          'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It was developed by Facebook and is maintained by Meta and a community of developers. React allows developers to create large web applications that can update and render efficiently in response to data changes. The main concept behind React is to build components - reusable UI elements that manage their own state.',
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: '3',
        title: 'With Examples',
        content: `React is a JavaScript library for building UIs. Here's a simple example:

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />

Key features include:
• Component-based architecture
• Virtual DOM for performance
• Unidirectional data flow
• Rich ecosystem with tools like Next.js`,
        timestamp: new Date(Date.now() - 1000),
      },
    ];

    return (
      <div className="w-[800px] space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Response Variations
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore different variations of the AI response
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BranchIndicator active label={`Branch ${selectedBranch}`} />
            <Badge variant="outline" className="gap-1">
              <Lightbulb className="h-3 w-3" />
              {aiBranches.length} variations
            </Badge>
          </div>
        </div>

        <Branch
          branches={aiBranches}
          value={selectedBranch}
          onBranchChange={setSelectedBranch}
          renderContent={(content, branch) => (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Generated{' '}
                    {branch.timestamp
                      ? new Date(branch.timestamp).toLocaleTimeString()
                      : 'just now'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-4 mx-1" />
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm whitespace-pre-wrap leading-relaxed">{content}</div>

              <Separator />

              <div className="flex items-center gap-2">
                <Badge variant="secondary">AI Generated</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete AI response variations interface with timestamps, action buttons, and badges, demonstrating a full-featured branch selection experience.',
      },
    },
  },
};

export const DocumentVersions: Story = {
  render: () => {
    const documentBranches: BranchType[] = [
      {
        id: '1',
        title: 'Draft',
        content:
          'This is the initial draft of the document. It contains the basic structure and key points that need to be covered.',
        timestamp: new Date('2024-01-15T10:00:00'),
      },
      {
        id: '2',
        title: 'Revised',
        content:
          'This is the revised version with improvements to clarity and structure. Additional examples and explanations have been added based on feedback.',
        timestamp: new Date('2024-01-16T14:30:00'),
      },
      {
        id: '3',
        title: 'Final',
        content:
          'This is the final version ready for publication. All feedback has been incorporated, grammar has been checked, and the document has been formatted according to style guidelines.',
        timestamp: new Date('2024-01-17T09:15:00'),
      },
    ];

    return (
      <div className="w-[700px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Versions
            </CardTitle>
            <CardDescription>View and compare different versions of the document</CardDescription>
          </CardHeader>
          <CardContent>
            <Branch
              branches={documentBranches}
              renderContent={(content, branch) => (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Last modified:{' '}
                      {branch.timestamp
                        ? new Date(branch.timestamp).toLocaleDateString()
                        : 'Unknown'}
                    </span>
                    <Badge variant="outline">{branch.title}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{content}</p>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component used for document version control, displaying different document versions with modification dates and status badges.',
      },
    },
  },
};

export const ControlledMode: Story = {
  render: () => {
    const [activeBranch, setActiveBranch] = useState('1');

    return (
      <div className="w-[600px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Controlled Branch Selection</CardTitle>
            <CardDescription>
              The active branch is controlled externally. Current: {activeBranch}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {simpleBranches.map((branch) => (
                <Button
                  key={branch.id}
                  variant={activeBranch === branch.id ? 'default' : 'outline'}
                  onClick={() => setActiveBranch(branch.id)}
                  size="sm"
                >
                  {branch.title}
                </Button>
              ))}
            </div>
            <Separator />
            <Branch
              branches={simpleBranches}
              value={activeBranch}
              onValueChange={setActiveBranch}
            />
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component in controlled mode, where the active branch is managed externally through state, allowing for custom selection controls.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => {
    const emptyBranches: BranchType[] = [];

    return (
      <div className="w-[600px]">
        <Card>
          <CardHeader>
            <CardTitle>No Branches Available</CardTitle>
            <CardDescription>
              When there are no branches, the component returns null
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Branch branches={emptyBranches} />
            <p className="text-sm text-muted-foreground mt-4">
              No branches to display. The component handles this gracefully by rendering nothing.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component with an empty branches array, demonstrating graceful handling when no branches are available.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => {
    const longBranches: BranchType[] = [
      {
        id: '1',
        title: 'Summary',
        content:
          'This is a brief summary of the topic. It covers the essential points in a concise manner.',
      },
      {
        id: '2',
        title: 'Full Article',
        content: `This is a comprehensive article that goes into great detail about the topic.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Key Points:
• Point one with detailed explanation
• Point two with additional context
• Point three with examples
• Point four with references

Conclusion:
The topic is complex but can be understood with careful study and practice. Remember to apply these principles in real-world scenarios for best results.`,
      },
      {
        id: '3',
        title: 'Technical Deep Dive',
        content: `This branch contains a technical deep dive into the implementation details.

Architecture Overview:
The system is built using a microservices architecture with the following components:

1. Frontend Service
   - React application with TypeScript
   - Redux for state management
   - Styled with TailwindCSS

2. Backend Services
   - API Gateway (Node.js + Express)
   - Authentication Service (OAuth 2.0)
   - Database Service (PostgreSQL)
   - Cache Layer (Redis)

3. Infrastructure
   - Kubernetes for orchestration
   - Docker containers
   - CI/CD with GitHub Actions
   - Monitoring with Prometheus

Performance Considerations:
- Response time: < 100ms for 95th percentile
- Throughput: 10,000 requests/second
- Availability: 99.9% uptime SLA`,
      },
    ];

    return (
      <div className="w-[800px]">
        <Branch branches={longBranches} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Branch component handling long-form content, from brief summaries to comprehensive articles and technical deep dives.',
      },
    },
  },
};
