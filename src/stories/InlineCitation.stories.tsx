import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { InlineCitation, InlineCitationList } from '@/components/ui/inline-citation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Citation } from '@/components/ai/ai-types';
import { Book, FileText, Globe, Newspaper } from 'lucide-react';

const meta = {
  title: 'AI/InlineCitation',
  component: InlineCitation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An inline citation component that displays numbered references with hover previews. Useful for showing sources in AI-generated content, academic writing, or any content that requires citations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    citation: {
      description: 'The citation data to display',
      control: 'object',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'numbered'],
      description: 'Visual variant of the citation',
    },
    showPreview: {
      control: 'boolean',
      description: 'Whether to show preview on hover',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the citation is expanded',
    },
    onExpand: {
      action: 'onExpand',
      description: 'Callback when citation is clicked',
    },
  },
} satisfies Meta<typeof InlineCitation>;

export default meta;
type Story = StoryObj<typeof InlineCitation>;

// Sample citations for stories
const sampleCitation: Citation = {
  id: '1',
  number: 1,
  source: {
    id: 'source-1',
    title: 'Understanding React Components',
    url: 'https://react.dev/learn',
    description:
      'A comprehensive guide to building user interfaces with React, covering components, props, state, and hooks.',
    iconUrl: 'https://react.dev/favicon.ico',
  },
  excerpt: 'Components are the building blocks of React applications.',
};

const academicCitation: Citation = {
  id: '2',
  number: 2,
  source: {
    id: 'source-2',
    title: 'Machine Learning: A Probabilistic Perspective',
    url: 'https://mitpress.mit.edu',
    description:
      'A comprehensive introduction to machine learning that uses probabilistic models and inference as a unifying approach.',
    metadata: {
      author: 'Kevin P. Murphy',
      year: '2012',
      publisher: 'MIT Press',
      pages: '1104',
    },
  },
  excerpt:
    'Machine learning is a subfield of artificial intelligence that gives computers the ability to learn without being explicitly programmed.',
};

const newsCitation: Citation = {
  id: '3',
  number: 3,
  source: {
    id: 'source-3',
    title: 'Advances in AI Technology Transform Industries',
    url: 'https://example.com/news/ai-advances',
    description:
      'Recent breakthroughs in artificial intelligence are revolutionizing healthcare, finance, and manufacturing sectors worldwide.',
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=news',
    metadata: {
      publication: 'Tech News Daily',
      date: '2024-10-08',
      category: 'Technology',
    },
  },
  excerpt:
    'AI systems are now capable of performing complex tasks that once required human expertise.',
};

const minimalCitation: Citation = {
  id: '4',
  number: 4,
  source: {
    id: 'source-4',
    title: 'Internal Documentation',
  },
};

export const Default: Story = {
  args: {
    citation: sampleCitation,
    variant: 'default',
    showPreview: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default inline citation with hover preview, displaying source information when hovering over the citation marker.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default Variant</h3>
        <p className="text-sm text-muted-foreground">
          React components are reusable pieces of code
          <InlineCitation citation={sampleCitation} variant="default" /> that make building
          interfaces easier.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Compact Variant</h3>
        <p className="text-sm text-muted-foreground">
          Machine learning algorithms
          <InlineCitation citation={academicCitation} variant="compact" /> can identify patterns in
          large datasets.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Numbered Variant (Superscript)</h3>
        <p className="text-sm text-muted-foreground">
          AI technology is transforming healthcare
          <InlineCitation citation={newsCitation} variant="numbered" /> across the globe.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All three citation variants: default (bracketed), compact (smaller), and numbered (superscript), demonstrating different visual styles for inline citations.',
      },
    },
  },
};

export const WithoutPreview: Story = {
  args: {
    citation: sampleCitation,
    showPreview: false,
  },
  render: (args) => (
    <div className="p-8">
      <p className="text-sm text-muted-foreground">
        This citation has no hover preview
        <InlineCitation {...args} /> but still displays inline.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Citation without hover preview functionality, displaying only the inline marker without additional information on hover.',
      },
    },
  },
};

export const ExpandedState: Story = {
  args: {
    citation: sampleCitation,
    expanded: true,
  },
  render: (args) => (
    <div className="p-8">
      <p className="text-sm text-muted-foreground">
        This citation appears expanded
        <InlineCitation {...args} /> with highlighted styling.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Citation in expanded state with highlighted styling, useful for indicating active or selected citations.',
      },
    },
  },
};

export const InteractiveCitation: Story = {
  render: () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleExpand = (citation: Citation) => {
      setExpandedId(expandedId === citation.id ? null : citation.id);
      console.log('Citation clicked:', citation);
    };

    return (
      <div className="p-8 space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold">Interactive Citations</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          React
          <InlineCitation
            citation={sampleCitation}
            expanded={expandedId === sampleCitation.id}
            onExpand={handleExpand}
          />{' '}
          is a popular JavaScript library for building user interfaces. Machine learning
          <InlineCitation
            citation={academicCitation}
            expanded={expandedId === academicCitation.id}
            onExpand={handleExpand}
          />{' '}
          has become increasingly important in modern software development. Recent advances in AI
          <InlineCitation
            citation={newsCitation}
            expanded={expandedId === newsCitation.id}
            onExpand={handleExpand}
          />{' '}
          are transforming multiple industries worldwide.
        </p>
        {expandedId && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-xs font-medium">Currently expanded citation: {expandedId}</p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive citations with click handlers, allowing users to expand and collapse citations to view details.',
      },
    },
  },
};

export const RichPreviewContent: Story = {
  args: {
    citation: academicCitation,
  },
  render: (args) => (
    <div className="p-8">
      <p className="text-sm text-muted-foreground">
        Hover over this citation
        <InlineCitation {...args} /> to see rich metadata including author, year, and publisher.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Citation with rich preview content showing detailed metadata like author, year, publisher, and other academic information.',
      },
    },
  },
};

export const MinimalCitation: Story = {
  args: {
    citation: minimalCitation,
  },
  render: (args) => (
    <div className="p-8">
      <p className="text-sm text-muted-foreground">
        This citation
        <InlineCitation {...args} /> has minimal information with only a title.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Citation with minimal information, demonstrating how the component handles citations with only basic title data.',
      },
    },
  },
};

export const InTextUsage: Story = {
  render: () => {
    const citations: Citation[] = [sampleCitation, academicCitation, newsCitation, minimalCitation];

    return (
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>The Impact of AI on Modern Development</CardTitle>
          <CardDescription>A research article with inline citations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Artificial intelligence has revolutionized software development practices
            <InlineCitation citation={citations[0]} variant="numbered" />. Recent studies show that
            machine learning algorithms can significantly improve code quality and developer
            productivity
            <InlineCitation citation={citations[1]} variant="numbered" />.
          </p>

          <p className="text-sm leading-relaxed">
            According to industry reports
            <InlineCitation citation={citations[2]} variant="numbered" />, AI-powered tools are now
            essential in modern development workflows. Organizations implementing these technologies
            report substantial improvements in efficiency
            <InlineCitation citation={citations[3]} variant="numbered" />.
          </p>

          <Separator className="my-4" />

          <div>
            <h4 className="text-sm font-semibold mb-2">References</h4>
            <InlineCitationList citations={citations} />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage example showing inline citations embedded in article text with a complete reference list at the bottom.',
      },
    },
  },
};

export const CitationListDemo: Story = {
  render: () => {
    const citations: Citation[] = [
      sampleCitation,
      academicCitation,
      newsCitation,
      {
        id: '5',
        number: 5,
        source: {
          id: 'source-5',
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/handbook',
          description: 'A comprehensive guide to TypeScript language features and best practices.',
        },
        excerpt: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      },
      {
        id: '6',
        number: 6,
        source: {
          id: 'source-6',
          title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          metadata: {
            authors: 'Gang of Four',
            year: '1994',
            isbn: '978-0201633610',
          },
        },
      },
    ];

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Research Paper</CardTitle>
          <CardDescription>With full citation list</CardDescription>
        </CardHeader>
        <CardContent>
          <InlineCitationList citations={citations} title="References" />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete citation list component displaying all references in a formatted list, typically shown at the end of articles or papers.',
      },
    },
  },
};

export const CustomTitleList: Story = {
  render: () => {
    const citations: Citation[] = [sampleCitation, academicCitation, newsCitation];

    return (
      <div className="space-y-6 p-8">
        <Card className="w-[500px]">
          <CardContent className="pt-6">
            <InlineCitationList citations={citations} title="Sources" />
          </CardContent>
        </Card>

        <Card className="w-[500px]">
          <CardContent className="pt-6">
            <InlineCitationList citations={citations} title="Bibliography" />
          </CardContent>
        </Card>

        <Card className="w-[500px]">
          <CardContent className="pt-6">
            <InlineCitationList citations={citations} title="Further Reading" />
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Citation lists with custom titles, demonstrating how to customize the section heading for different use cases (Sources, Bibliography, Further Reading).',
      },
    },
  },
};

export const DifferentContentTypes: Story = {
  render: () => {
    const citations: Citation[] = [
      {
        id: 'book',
        number: 1,
        source: {
          id: 'source-book',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
          description: 'A guide to writing readable, maintainable code.',
          metadata: {
            type: 'Book',
            author: 'Robert C. Martin',
            year: '2008',
          },
        },
      },
      {
        id: 'article',
        number: 2,
        source: {
          id: 'source-article',
          title: 'The Evolution of JavaScript',
          url: 'https://example.com/articles/js-evolution',
          description: 'An in-depth look at how JavaScript has evolved over the years.',
          metadata: {
            type: 'Article',
            publication: 'Web Dev Weekly',
            date: '2024-09-15',
          },
        },
      },
      {
        id: 'video',
        number: 3,
        source: {
          id: 'source-video',
          title: 'Introduction to React Hooks',
          url: 'https://youtube.com/watch?v=example',
          description: 'A comprehensive video tutorial on React Hooks.',
          metadata: {
            type: 'Video',
            duration: '45:32',
            platform: 'YouTube',
          },
        },
      },
      {
        id: 'documentation',
        number: 4,
        source: {
          id: 'source-docs',
          title: 'MDN Web Docs: Fetch API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
          description: 'Official documentation for the Fetch API.',
          metadata: {
            type: 'Documentation',
            organization: 'Mozilla',
          },
        },
      },
    ];

    return (
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>Mixed Content Types</CardTitle>
          <CardDescription>Citations from various sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">
              <Book className="w-3 h-3 mr-1" />
              Books
            </Badge>
            <Badge variant="secondary">
              <FileText className="w-3 h-3 mr-1" />
              Articles
            </Badge>
            <Badge variant="secondary">
              <Globe className="w-3 h-3 mr-1" />
              Web
            </Badge>
            <Badge variant="secondary">
              <Newspaper className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Writing clean code
            <InlineCitation citation={citations[0]} variant="numbered" /> requires understanding
            modern JavaScript features
            <InlineCitation citation={citations[1]} variant="numbered" />. React Hooks
            <InlineCitation citation={citations[2]} variant="numbered" /> provide a powerful way to
            manage state, and the Fetch API
            <InlineCitation citation={citations[3]} variant="numbered" /> simplifies data fetching.
          </p>

          <Separator />

          <InlineCitationList citations={citations} />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Citations from different content types (books, articles, videos, documentation), showing how the component handles varied source metadata.',
      },
    },
  },
};

export const LongContentWithManyCitations: Story = {
  render: () => {
    const citations: Citation[] = Array.from({ length: 12 }, (_, i) => ({
      id: `citation-${i + 1}`,
      number: i + 1,
      source: {
        id: `source-${i + 1}`,
        title: `Research Paper ${i + 1}: Important Findings`,
        url: `https://example.com/paper/${i + 1}`,
        description: `This paper discusses significant findings in the field of study ${i + 1}.`,
        metadata: {
          author: `Author ${i + 1}`,
          year: `${2020 + (i % 5)}`,
          journal: `Journal of Science ${(i % 3) + 1}`,
        },
      },
      excerpt: `Key finding from paper ${i + 1} that contributes to our understanding.`,
    }));

    return (
      <Card className="w-[800px] max-h-[600px] overflow-auto">
        <CardHeader className="sticky top-0 bg-background z-10 border-b">
          <CardTitle>Comprehensive Research Article</CardTitle>
          <CardDescription>With extensive citations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-sm leading-relaxed">
            Recent advances in technology
            <InlineCitation citation={citations[0]} variant="numbered" /> have led to significant
            improvements in various fields
            <InlineCitation citation={citations[1]} variant="numbered" />
            <InlineCitation citation={citations[2]} variant="numbered" />. Researchers have
            identified
            <InlineCitation citation={citations[3]} variant="numbered" /> multiple factors
            <InlineCitation citation={citations[4]} variant="numbered" /> contributing to these
            developments
            <InlineCitation citation={citations[5]} variant="numbered" />.
          </p>

          <p className="text-sm leading-relaxed">
            Studies show
            <InlineCitation citation={citations[6]} variant="numbered" />
            <InlineCitation citation={citations[7]} variant="numbered" /> that interdisciplinary
            approaches
            <InlineCitation citation={citations[8]} variant="numbered" /> yield better results
            <InlineCitation citation={citations[9]} variant="numbered" />. Furthermore, recent
            meta-analyses
            <InlineCitation citation={citations[10]} variant="numbered" />
            <InlineCitation citation={citations[11]} variant="numbered" /> confirm these findings.
          </p>

          <Separator className="my-6" />

          <InlineCitationList citations={citations} title="Complete Bibliography" />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long-form content with many citations (12+), demonstrating how the component handles extensive citation lists in academic or research contexts.',
      },
    },
  },
};

export const EmptyCitationList: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Article Without Citations</CardTitle>
        <CardDescription>Empty citation list renders nothing</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">This article has no citations yet.</p>
        <InlineCitationList citations={[]} />
        <p className="text-sm text-muted-foreground mt-4">
          The citation list component renders nothing when empty.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty citation list demonstrating graceful handling when no citations are provided, rendering nothing instead of showing an empty list.',
      },
    },
  },
};
