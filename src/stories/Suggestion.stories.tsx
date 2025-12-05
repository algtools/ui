import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Suggestion } from '@/components/ui/suggestion';
import {
  Sparkles,
  Lightbulb,
  MessageCircle,
  Search,
  TrendingUp,
  Zap,
  BookOpen,
  Code,
  Coffee,
  Rocket,
  ChevronRight,
  ArrowRight,
  Info,
  HelpCircle,
} from 'lucide-react';

const meta = {
  title: 'AI/Suggestion',
  component: Suggestion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A chip/pill component for displaying ChatGPT-style follow-up prompts. Supports click handlers, optional icons, and keyboard navigation for accessible AI interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the suggestion',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'primary'],
      description: 'The visual style variant of the suggestion chip',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the suggestion chip',
    },
    icon: {
      control: false,
      description: 'Optional icon element to display before the text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the suggestion is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Change the component to a Slot component for composition',
    },
  },
  args: {
    onClick: () => console.log('Suggestion clicked'),
  },
} satisfies Meta<typeof Suggestion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default suggestion chip with standard styling
 */
export const Default: Story = {
  args: {
    text: 'Tell me more about this',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default suggestion chip with standard styling, ready for use in AI chat interfaces as follow-up prompts.',
      },
    },
  },
};

/**
 * All available variant styles for suggestion chips
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Suggestion text="Default variant" variant="default" />
      <Suggestion text="Outline variant" variant="outline" />
      <Suggestion text="Ghost variant" variant="ghost" />
      <Suggestion text="Primary variant" variant="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for suggestion chips to match your design system.',
      },
    },
  },
};

/**
 * Different sizes for various use cases
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Suggestion text="Small suggestion" size="sm" />
      <Suggestion text="Default suggestion" size="default" />
      <Suggestion text="Large suggestion" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three size options to accommodate different UI contexts.',
      },
    },
  },
};

/**
 * Suggestions with icons for enhanced visual communication
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Suggestion text="Continue the conversation" icon={<MessageCircle />} />
      <Suggestion text="Generate ideas" icon={<Sparkles />} variant="primary" />
      <Suggestion text="Explain in detail" icon={<Lightbulb />} />
      <Suggestion text="Show me examples" icon={<BookOpen />} variant="outline" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Add icons to suggestions for better visual hierarchy and meaning.',
      },
    },
  },
};

/**
 * ChatGPT-style follow-up suggestions after a response
 */
export const ChatFollowUps: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">AI Response:</p>
        <p className="text-sm mb-4">
          React is a JavaScript library for building user interfaces. It was created by Facebook and
          is maintained by Meta and a community of developers.
        </p>
        <div className="flex flex-wrap gap-2">
          <Suggestion text="Tell me more about React hooks" icon={<ChevronRight />} size="sm" />
          <Suggestion text="Show me an example" icon={<Code />} size="sm" />
          <Suggestion text="Compare with Vue.js" icon={<TrendingUp />} size="sm" />
          <Suggestion text="Explain components" icon={<Info />} size="sm" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how suggestions appear in a chat interface as follow-up prompts.',
      },
    },
  },
};

/**
 * Onboarding or starter suggestions
 */
export const StarterPrompts: Story = {
  render: () => (
    <div className="max-w-3xl space-y-4">
      <h3 className="text-lg font-semibold mb-3">What can I help you with?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Suggestion
          text="Help me debug my code"
          icon={<Code />}
          variant="outline"
          className="justify-start"
        />
        <Suggestion
          text="Explain a concept"
          icon={<Lightbulb />}
          variant="outline"
          className="justify-start"
        />
        <Suggestion
          text="Generate ideas"
          icon={<Sparkles />}
          variant="outline"
          className="justify-start"
        />
        <Suggestion
          text="Search for information"
          icon={<Search />}
          variant="outline"
          className="justify-start"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Starter suggestions to help users begin their interaction with the AI.',
      },
    },
  },
};

/**
 * Contextual suggestions based on user activity
 */
export const ContextualSuggestions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <Suggestion text="Continue writing" icon={<ArrowRight />} size="sm" variant="primary" />
          <Suggestion text="Make it shorter" icon={<Zap />} size="sm" />
          <Suggestion text="Add more details" icon={<Info />} size="sm" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Related Topics</h4>
        <div className="flex flex-wrap gap-2">
          <Suggestion text="TypeScript best practices" icon={<BookOpen />} size="sm" />
          <Suggestion text="Performance optimization" icon={<Rocket />} size="sm" />
          <Suggestion text="Testing strategies" icon={<Code />} size="sm" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Suggestions that adapt to the current context and user needs.',
      },
    },
  },
};

/**
 * Interactive states: normal, hover, focus, and disabled
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Normal</p>
        <Suggestion text="Click me" icon={<Sparkles />} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Hover (hover over me)</p>
        <Suggestion text="Hover to see effect" icon={<MessageCircle />} variant="primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Focus (tab to focus)</p>
        <Suggestion text="Press Tab to focus" icon={<HelpCircle />} variant="outline" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Disabled</p>
        <Suggestion text="Cannot click" icon={<Coffee />} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All interactive states including hover, focus, and disabled.',
      },
    },
  },
};

/**
 * Responsive grid layout with multiple suggestions
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold mb-4">Explore topics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Suggestion text="JavaScript" icon={<Code />} size="sm" />
        <Suggestion text="React" icon={<Sparkles />} size="sm" />
        <Suggestion text="TypeScript" icon={<Zap />} size="sm" />
        <Suggestion text="Node.js" icon={<Rocket />} size="sm" />
        <Suggestion text="CSS" icon={<BookOpen />} size="sm" />
        <Suggestion text="Testing" icon={<Search />} size="sm" />
        <Suggestion text="Performance" icon={<TrendingUp />} size="sm" />
        <Suggestion text="Best Practices" icon={<Lightbulb />} size="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid layout showing how suggestions adapt to different screen sizes.',
      },
    },
  },
};

/**
 * Mixed sizes and variants in a single layout
 */
export const MixedStyles: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-wrap gap-2">
        <Suggestion text="Featured" icon={<Sparkles />} variant="primary" size="lg" />
        <Suggestion text="Popular" icon={<TrendingUp />} variant="default" />
        <Suggestion text="New" icon={<Zap />} variant="outline" size="sm" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Suggestion text="Getting Started" icon={<Rocket />} size="default" />
        <Suggestion text="Advanced Topics" icon={<BookOpen />} size="default" />
        <Suggestion text="Quick Tips" icon={<Lightbulb />} size="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combining different sizes and variants for visual hierarchy.',
      },
    },
  },
};

/**
 * Using asChild prop to render as a link
 */
export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Suggestion text="" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <BookOpen />
          View documentation
        </a>
      </Suggestion>
      <Suggestion text="" variant="outline" asChild>
        <a href="/examples">
          <Code />
          Go to examples
        </a>
      </Suggestion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Using the asChild prop to render suggestion styling on anchor elements. When using asChild, provide content as children instead of using text and icon props.',
      },
    },
  },
};

/**
 * Accessibility features demonstration
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <h4 className="text-sm font-semibold">Keyboard Navigation</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Use Tab to navigate between suggestions. Press Enter or Space to activate.
        </p>
        <div className="flex flex-wrap gap-2">
          <Suggestion
            text="First suggestion"
            icon={<Sparkles />}
            aria-label="First suggestion: Continue conversation"
          />
          <Suggestion
            text="Second suggestion"
            icon={<MessageCircle />}
            aria-label="Second suggestion: Ask a question"
          />
          <Suggestion
            text="Third suggestion"
            icon={<Search />}
            aria-label="Third suggestion: Search for information"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including keyboard navigation and ARIA labels.',
      },
    },
  },
};
