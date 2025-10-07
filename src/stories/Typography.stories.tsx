import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Typography showcases the Inter font family and text styles used throughout the UI library.

The library uses:
- **Sans-serif**: Inter with system font fallbacks
- **Monospace**: JetBrains Mono with system font fallbacks

All text styles are built using Tailwind CSS classes and CSS custom properties for consistent typography across components.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Heading 1 - Inter Bold</h1>
      <h2 className="text-3xl font-semibold tracking-tight">Heading 2 - Inter Semibold</h2>
      <h3 className="text-2xl font-semibold">Heading 3 - Inter Semibold</h3>
      <h4 className="text-xl font-medium">Heading 4 - Inter Medium</h4>
      <h5 className="text-lg font-medium">Heading 5 - Inter Medium</h5>
      <h6 className="text-base font-medium">Heading 6 - Inter Medium</h6>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-lg">
        Large body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-base">
        Regular body text - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-sm">
        Small body text - Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
      <p className="text-xs">
        Extra small text - Used for captions, labels, and secondary information.
      </p>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-base font-thin">Thin (100) - The quick brown fox</p>
      <p className="text-base font-extralight">Extra Light (200) - The quick brown fox</p>
      <p className="text-base font-light">Light (300) - The quick brown fox</p>
      <p className="text-base font-normal">Normal (400) - The quick brown fox</p>
      <p className="text-base font-medium">Medium (500) - The quick brown fox</p>
      <p className="text-base font-semibold">Semibold (600) - The quick brown fox</p>
      <p className="text-base font-bold">Bold (700) - The quick brown fox</p>
      <p className="text-base font-extrabold">Extra Bold (800) - The quick brown fox</p>
      <p className="text-base font-black">Black (900) - The quick brown fox</p>
    </div>
  ),
};

export const MonospaceCode: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Inline Code</h3>
        <p>
          Here&apos;s some inline code:{' '}
          <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">
            npm install @algtools/ui
          </code>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code Block</h3>
        <pre className="font-mono bg-muted p-4 rounded-lg text-sm overflow-x-auto">
          {`import { Button } from '@algtools/ui';

export default function Example() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}`}
        </pre>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">JetBrains Mono Weights</h3>
        <div className="space-y-2 font-mono">
          <p className="font-thin">{`Thin (100) - const arrow = () => { return true; }`}</p>
          <p className="font-extralight">{`Extra Light (200) - if (x !== y && x >= y) return;`}</p>
          <p className="font-light">{`Light (300) - const result = a <= b ? 'yes' : 'no';`}</p>
          <p className="font-normal">{`Normal (400) - // This shows => != >= <= ligatures`}</p>
          <p className="font-medium">{`Medium (500) - function test() { return x === y; }`}</p>
          <p className="font-semibold">{`Semibold (600) - const obj = { key: 'value' };`}</p>
          <p className="font-bold">{`Bold (700) - if (condition) /* comment */`}</p>
          <p className="font-extrabold">{`Extra Bold (800) - x => y !== z && a >= b`}</p>
        </div>
      </div>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-foreground">Foreground - Primary text color</p>
      <p className="text-muted-foreground">Muted Foreground - Secondary text color</p>
      <p className="text-primary">Primary - Brand color text</p>
      <p className="text-secondary-foreground">Secondary - Secondary brand text</p>
      <p className="text-destructive">Destructive - Error or danger text</p>
      <p className="text-accent-foreground">Accent - Accent color text</p>
      <div className="bg-card p-3 rounded border">
        <p className="text-card-foreground">Card Foreground - Text on card backgrounds</p>
      </div>
    </div>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-xs">text-xs (12px) - Extra small text</p>
      <p className="text-sm">text-sm (14px) - Small text</p>
      <p className="text-base">text-base (16px) - Base text size</p>
      <p className="text-lg">text-lg (18px) - Large text</p>
      <p className="text-xl">text-xl (20px) - Extra large text</p>
      <p className="text-2xl">text-2xl (24px) - 2x large text</p>
      <p className="text-3xl">text-3xl (30px) - 3x large text</p>
      <p className="text-4xl">text-4xl (36px) - 4x large text</p>
      <p className="text-5xl">text-5xl (48px) - 5x large text</p>
    </div>
  ),
};

export const LineHeight: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Tight Leading (leading-tight)</h3>
        <p className="leading-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Normal Leading (leading-normal)</h3>
        <p className="leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Relaxed Leading (leading-relaxed)</h3>
        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </p>
      </div>
    </div>
  ),
};

export const Ligatures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Inter Font Ligatures</h3>
        <div className="space-y-3 text-lg">
          <p>Common ligatures: fi fl ff ffi ffl</p>
          <p>Typography with fine attention to detail</p>
          <p>Professional office building efficiently</p>
          <p className="text-sm text-muted-foreground">
            Note: Inter has subtle ligatures that improve readability
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">JetBrains Mono Code Ligatures</h3>
        <div className="space-y-3 font-mono text-base">
          <p>{`Arrow functions: => -> <- <-> <=> >=>`}</p>
          <p>{`Comparisons: == === != !== >= <= <=> <=>`}</p>
          <p>{`Logic operators: && || ?? !! ~~ ?: ?.`}</p>
          <p>{`Math symbols: += -= *= /= %= ^= |= &=`}</p>
          <p>{`Comments: // /* */ /// /** */`}</p>
          <p>{`Other symbols: :: .. ... .= := =: =>`}</p>
          <p>{`Brackets: [] {} () <> << >> >>> <<<`}</p>
        </div>
        <div className="mt-4 bg-muted p-4 rounded-lg">
          <pre className="font-mono text-sm">
            {`// Ligatures in action:
const isValid = (x, y) => {
  return x !== null && y >= 0 ? true : false;
};

// Arrow functions with comparisons
const filter = arr => arr.filter(item => item.value <= max);

// TypeScript annotations
interface User {
  name: string;
  age?: number;
}

// More examples
const result = a === b ? 'equal' : 'not equal';
if (condition1 && condition2 || fallback) {
  console.log('Success!');
}`}
          </pre>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ligature Comparison</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">With Ligatures (Default)</h4>
            <code className="font-mono bg-muted p-3 rounded block text-sm">
              {`const fn = () => x !== y && a >= b;`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">Without Ligatures</h4>
            <code
              className="font-mono bg-muted p-3 rounded block text-sm"
              style={{ fontFeatureSettings: '"liga" 0, "calt" 0' }}
            >
              {`const fn = () => x !== y && a >= b;`}
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LetterSpacing: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="tracking-tighter">Tighter Tracking - The quick brown fox</p>
      <p className="tracking-tight">Tight Tracking - The quick brown fox</p>
      <p className="tracking-normal">Normal Tracking - The quick brown fox</p>
      <p className="tracking-wide">Wide Tracking - The quick brown fox</p>
      <p className="tracking-wider">Wider Tracking - The quick brown fox</p>
      <p className="tracking-widest">Widest Tracking - The quick brown fox</p>
    </div>
  ),
};

export const Lists: Story = {
  render: () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Unordered List</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>First item with some text content</li>
          <li>Second item with more details</li>
          <li>
            Third item
            <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
              <li>Nested item one</li>
              <li>Nested item two</li>
            </ul>
          </li>
          <li>Fourth item to complete the list</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Ordered List</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li>First numbered item</li>
          <li>Second numbered item</li>
          <li>
            Third numbered item
            <ol className="mt-2 ml-6 space-y-1 list-decimal list-inside">
              <li>Nested numbered item</li>
              <li>Another nested item</li>
            </ol>
          </li>
          <li>Fourth numbered item</li>
        </ol>
      </div>
    </div>
  ),
};

export const Blockquote: Story = {
  render: () => (
    <div className="space-y-6">
      <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
        &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
        <footer className="mt-2 text-sm text-muted-foreground not-italic">— Steve Jobs</footer>
      </blockquote>

      <blockquote className="bg-muted p-6 rounded-lg border-l-4 border-accent">
        <p className="text-base mb-2">
          &quot;The details are not the details. They make the design.&quot;
        </p>
        <footer className="text-sm text-muted-foreground">— Charles Eames</footer>
      </blockquote>
    </div>
  ),
};

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl">
      {/* Headings */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Headings</h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
          <h3 className="text-2xl font-semibold">Heading 3</h3>
          <h4 className="text-xl font-medium">Heading 4</h4>
          <h5 className="text-lg font-medium">Heading 5</h5>
          <h6 className="text-base font-medium">Heading 6</h6>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Body Text</h2>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Large paragraph text with relaxed line height. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-base">
            Regular paragraph text. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore.
          </p>
          <p className="text-sm text-muted-foreground">
            Small text for captions and secondary information. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim.
          </p>
        </div>
      </section>

      {/* Code */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Code</h2>
        <div className="space-y-4">
          <p>
            Here&apos;s some inline code:{' '}
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">
              {`const greeting = "Hello, World!";`}
            </code>
          </p>
          <pre className="font-mono bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            {`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`}
          </pre>
        </div>
      </section>

      {/* Lists */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Lists</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Modern React components</li>
              <li>TypeScript support</li>
              <li>Tailwind CSS styling</li>
              <li>Dark mode compatible</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Setup Steps</h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Install the package</li>
              <li>Import styles</li>
              <li>Add components</li>
              <li>Customize as needed</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Blockquote</h2>
        <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
          &quot;Typography is the voice of the written word. It can whisper or shout, be formal or
          casual, serious or playful.&quot;
          <footer className="mt-2 text-sm text-muted-foreground not-italic">
            — Typography principles
          </footer>
        </blockquote>
      </section>
    </div>
  ),
};
