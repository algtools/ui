import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Reasoning } from '@/components/ai/reasoning';
import type { ReasoningStep } from '@/components/ai/ai-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles, Zap, Target, AlertCircle } from 'lucide-react';

const meta = {
  title: 'AI/Reasoning',
  component: Reasoning,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Reasoning component displays AI thinking processes in collapsible blocks with visual indicators and step-by-step breakdowns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of reasoning steps to display',
      control: 'object',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the reasoning is initially expanded',
    },
    open: {
      control: 'boolean',
      description: 'Whether the reasoning is expanded (controlled)',
    },
    title: {
      control: 'text',
      description: 'Title to display in the header',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual variant of the component',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Whether to show step numbers',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the open state changes',
    },
  },
} satisfies Meta<typeof Reasoning>;

export default meta;
type Story = StoryObj<typeof Reasoning>;

const sampleSteps: ReasoningStep[] = [
  {
    id: '1',
    title: 'Problem Analysis',
    content:
      'First, I need to understand the core requirements and constraints of the problem. This involves breaking down the request into smaller components.',
    order: 1,
  },
  {
    id: '2',
    title: 'Solution Planning',
    content:
      'Next, I will formulate a strategy to address each component. This includes considering different approaches and selecting the most efficient one.',
    order: 2,
  },
  {
    id: '3',
    title: 'Implementation',
    content:
      'Finally, I will execute the chosen strategy, implementing the solution step by step while ensuring quality and correctness.',
    order: 3,
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    title: 'Reasoning',
    defaultOpen: false,
    variant: 'default',
    showStepNumbers: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default reasoning component collapsed by default, showing a collapsible block with step-by-step AI thinking process.',
      },
    },
  },
};

export const DefaultOpen: Story = {
  args: {
    steps: sampleSteps,
    title: 'AI Thinking Process',
    defaultOpen: true,
    variant: 'default',
    showStepNumbers: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component expanded by default, immediately showing the AI thinking process without requiring user interaction.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    steps: sampleSteps,
    title: 'Quick Reasoning',
    defaultOpen: true,
    variant: 'compact',
    showStepNumbers: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant of the reasoning component with reduced spacing, ideal for dense layouts or when space is limited.',
      },
    },
  },
};

export const WithoutStepNumbers: Story = {
  args: {
    steps: sampleSteps,
    title: 'Reasoning Steps',
    defaultOpen: true,
    showStepNumbers: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component without step numbers, providing a cleaner visual appearance when numbering is not needed.',
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    steps: sampleSteps,
    title: 'Deep Thinking',
    defaultOpen: true,
    icon: <Brain className="h-4 w-4 text-purple-500" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component with a custom icon, allowing for personalized branding or visual differentiation.',
      },
    },
  },
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Quick Analysis',
        content: 'This is a straightforward problem that requires a simple solution.',
        order: 1,
      },
    ],
    title: 'Reasoning',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component with a single step, demonstrating how it handles minimal reasoning processes.',
      },
    },
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Initial Assessment',
        content: 'Evaluating the problem scope and complexity.',
        order: 1,
      },
      {
        id: '2',
        title: 'Research Phase',
        content: 'Gathering relevant information and context.',
        order: 2,
      },
      {
        id: '3',
        title: 'Algorithm Selection',
        content: 'Choosing the most appropriate algorithm for the task.',
        order: 3,
      },
      {
        id: '4',
        title: 'Edge Case Analysis',
        content: 'Identifying potential edge cases and corner scenarios.',
        order: 4,
      },
      {
        id: '5',
        title: 'Performance Optimization',
        content: 'Optimizing for time and space complexity.',
        order: 5,
      },
      {
        id: '6',
        title: 'Validation',
        content: 'Verifying the solution meets all requirements.',
        order: 6,
      },
    ],
    title: 'Detailed Reasoning',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component with many steps (6+), demonstrating how it handles complex, multi-step reasoning processes.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    steps: [],
    title: 'No Reasoning Available',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component with empty steps array, demonstrating graceful handling when no reasoning steps are available.',
      },
    },
  },
};

export const StepsWithoutTitles: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: '',
        content: 'This step only has content without a title.',
        order: 1,
      },
      {
        id: '2',
        title: '',
        content: 'Another step showing how content appears when there is no title.',
        order: 2,
      },
    ],
    title: 'Simple Steps',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning steps without titles, showing how the component handles steps with only content and no title text.',
      },
    },
  },
};

export const ControlledState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[600px] space-y-4">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsOpen(!isOpen)} variant="outline">
            {isOpen ? 'Hide' : 'Show'} Reasoning
          </Button>
          <span className="text-sm text-muted-foreground">
            Status: {isOpen ? 'Expanded' : 'Collapsed'}
          </span>
        </div>

        <Reasoning
          steps={sampleSteps}
          title="Controlled Reasoning"
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component in controlled mode, where the open/closed state is managed externally through React state.',
      },
    },
  },
};

export const MultipleReasoningBlocks: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      <h2 className="text-2xl font-bold">AI Analysis Results</h2>

      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Data Validation',
            content: 'Checking input data for completeness and correctness.',
            order: 1,
          },
          {
            id: '2',
            title: 'Format Analysis',
            content: 'Ensuring data format matches expected schema.',
            order: 2,
          },
        ]}
        title="Input Processing"
        icon={<Zap className="h-4 w-4 text-blue-500" />}
        defaultOpen={true}
      />

      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Pattern Recognition',
            content: 'Identifying patterns in the data using ML algorithms.',
            order: 1,
          },
          {
            id: '2',
            title: 'Anomaly Detection',
            content: 'Detecting outliers and unusual patterns.',
            order: 2,
          },
          {
            id: '3',
            title: 'Classification',
            content: 'Categorizing data points based on learned patterns.',
            order: 3,
          },
        ]}
        title="ML Processing"
        icon={<Brain className="h-4 w-4 text-purple-500" />}
        defaultOpen={false}
      />

      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Result Compilation',
            content: 'Aggregating processed results into final output.',
            order: 1,
          },
          {
            id: '2',
            title: 'Quality Check',
            content: 'Verifying output quality and accuracy.',
            order: 2,
          },
        ]}
        title="Output Generation"
        icon={<Target className="h-4 w-4 text-green-500" />}
        defaultOpen={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple reasoning blocks displayed together, each with different icons and states, showing how reasoning can be broken into separate logical phases.',
      },
    },
  },
};

export const InChatContext: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">AI Assistant</CardTitle>
              <CardDescription className="text-xs">Just now</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Reasoning
            steps={[
              {
                id: '1',
                title: 'Understanding Context',
                content: 'Analyzing the conversation history and user intent.',
                order: 1,
              },
              {
                id: '2',
                title: 'Knowledge Retrieval',
                content: 'Searching relevant information from knowledge base.',
                order: 2,
              },
              {
                id: '3',
                title: 'Response Generation',
                content: 'Crafting a helpful and accurate response.',
                order: 3,
              },
            ]}
            title="How I arrived at this answer"
            variant="compact"
            defaultOpen={false}
          />
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm leading-relaxed">
              Based on my analysis, I recommend implementing a caching strategy to improve
              performance. This will reduce database queries and speed up response times
              significantly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component integrated into a chat message context, showing how it appears alongside AI responses in conversational interfaces.',
      },
    },
  },
};

export const ErrorScenario: Story = {
  render: () => (
    <div className="w-[600px]">
      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Initial Processing',
            content: 'Started processing the request with provided parameters.',
            order: 1,
          },
          {
            id: '2',
            title: 'Error Detected',
            content:
              'Encountered an issue during processing. The input format does not match the expected schema.',
            order: 2,
          },
          {
            id: '3',
            title: 'Fallback Strategy',
            content: 'Attempting alternative approach with relaxed validation rules.',
            order: 3,
          },
        ]}
        title="Error Analysis"
        icon={<AlertCircle className="h-4 w-4 text-red-500" />}
        defaultOpen={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Reasoning component used for error analysis, showing how AI systems explain error detection and recovery strategies.',
      },
    },
  },
};

export const ComplexReasoning: Story = {
  render: () => (
    <div className="w-[700px]">
      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Requirements Analysis',
            content:
              'The user is asking for a comprehensive explanation of quantum computing principles. This requires breaking down complex concepts into digestible parts while maintaining technical accuracy.',
            order: 1,
          },
          {
            id: '2',
            title: 'Knowledge Assessment',
            content:
              "Based on the user's question phrasing, they appear to have intermediate technical knowledge. I should use appropriate analogies while not oversimplifying.",
            order: 2,
          },
          {
            id: '3',
            title: 'Content Structure',
            content:
              'I will organize the explanation into: (1) Basic principles, (2) Key differences from classical computing, (3) Practical applications, and (4) Future implications.',
            order: 3,
          },
          {
            id: '4',
            title: 'Verification',
            content:
              'Cross-referencing quantum computing concepts against established scientific literature to ensure accuracy.',
            order: 4,
          },
          {
            id: '5',
            title: 'Response Synthesis',
            content:
              'Combining all elements into a coherent, well-structured response that addresses the query comprehensively.',
            order: 5,
          },
        ]}
        title="Deep Reasoning Process"
        icon={<Brain className="h-4 w-4 text-indigo-500" />}
        defaultOpen={true}
        className="shadow-lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex reasoning process with detailed, multi-step analysis showing how AI systems break down complex problems into manageable reasoning steps.',
      },
    },
  },
};

export const DifferentIconsPerStep: Story = {
  render: () => (
    <div className="w-[600px] space-y-3">
      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Fast Processing',
            content: 'Quickly analyzing the input data.',
            order: 1,
          },
        ]}
        title="Quick Analysis"
        icon={<Zap className="h-4 w-4 text-yellow-500" />}
        defaultOpen={true}
      />

      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Creative Solution',
            content: 'Thinking outside the box for innovative approaches.',
            order: 1,
          },
        ]}
        title="Creative Thinking"
        icon={<Sparkles className="h-4 w-4 text-pink-500" />}
        defaultOpen={true}
      />

      <Reasoning
        steps={[
          {
            id: '1',
            title: 'Focused Approach',
            content: 'Targeting the core issue with precision.',
            order: 1,
          },
        ]}
        title="Targeted Analysis"
        icon={<Target className="h-4 w-4 text-green-500" />}
        defaultOpen={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple reasoning blocks with different custom icons and colors, demonstrating visual differentiation between different types of reasoning processes.',
      },
    },
  },
};

export const UnorderedSteps: Story = {
  args: {
    steps: [
      {
        id: '3',
        title: 'Third Step (order: 3)',
        content: 'This should appear third.',
        order: 3,
      },
      {
        id: '1',
        title: 'First Step (order: 1)',
        content: 'This should appear first even though it is defined second.',
        order: 1,
      },
      {
        id: '2',
        title: 'Second Step (order: 2)',
        content: 'This should appear second.',
        order: 2,
      },
    ],
    title: 'Automatically Ordered Steps',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reasoning steps automatically sorted by their order property, even when provided in a different sequence, ensuring correct step ordering.',
      },
    },
  },
};
