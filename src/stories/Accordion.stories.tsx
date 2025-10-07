import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether only one or multiple items can be open at the same time',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is single, allows the item to be collapsed',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the accordion',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion className="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion className="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Single Type?</AccordionTrigger>
        <AccordionContent>
          Single type allows only one accordion item to be open at a time. When you open a new item,
          the previously opened item will automatically close.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I close the open item?</AccordionTrigger>
        <AccordionContent>
          Yes, when collapsible is set to true, you can close the currently open item by clicking on
          its trigger again.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What happens if collapsible is false?</AccordionTrigger>
        <AccordionContent>
          When collapsible is false, there will always be one item open and you cannot close all
          items.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion className="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Multiple Type?</AccordionTrigger>
        <AccordionContent>
          Multiple type allows multiple accordion items to be open simultaneously. Users can expand
          and collapse items independently.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can multiple items be open?</AccordionTrigger>
        <AccordionContent>
          Yes! You can have multiple items expanded at the same time. Try opening this item while
          the first one is still open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is there a limit?</AccordionTrigger>
        <AccordionContent>
          No, there&apos;s no limit to how many items can be open at once when using the multiple
          type.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithRichContent: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion className="w-full max-w-lg" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Welcome to our component library! Here&apos;s how to get started:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Install the required dependencies</li>
              <li>Import the components you need</li>
              <li>Use them in your React application</li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Advanced Features</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Our accordion supports many advanced features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Keyboard navigation</li>
              <li>Screen reader support</li>
              <li>Smooth animations</li>
              <li>Customizable styling</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              All features follow WAI-ARIA guidelines for accessibility.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Code Example</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Here&apos;s a basic example:</p>
            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
              {`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      Question
    </AccordionTrigger>
    <AccordionContent>
      Answer
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  args: {
    type: 'single',
    collapsible: true,
    disabled: true,
  },
  render: (args) => (
    <Accordion className="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>This accordion is disabled</AccordionTrigger>
        <AccordionContent>
          You won&apos;t be able to interact with this content because the entire accordion is
          disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>All items are non-interactive</AccordionTrigger>
        <AccordionContent>
          When the accordion is disabled, none of the items can be expanded or collapsed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion className="w-full max-w-2xl" {...args}>
      <AccordionItem value="faq-1">
        <AccordionTrigger>How do I install this component?</AccordionTrigger>
        <AccordionContent>
          You can install the component using npm or yarn. Make sure you have the required peer
          dependencies installed, including React and the Radix UI accordion primitive.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>Is it compatible with my existing design system?</AccordionTrigger>
        <AccordionContent>
          Yes! The component is built with CSS classes that can be easily customized. You can
          override the default styles or use CSS-in-JS solutions to match your design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>What about accessibility?</AccordionTrigger>
        <AccordionContent>
          The accordion is built on top of Radix UI primitives, which means it comes with full
          keyboard navigation, screen reader support, and follows WAI-ARIA guidelines out of the
          box.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>Can I customize the animations?</AccordionTrigger>
        <AccordionContent>
          Absolutely! The component uses CSS animations that can be customized through your CSS or
          by modifying the component&apos;s classes. You can adjust timing, easing, and even disable
          animations entirely.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
