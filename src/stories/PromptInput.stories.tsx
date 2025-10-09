import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { PromptInput } from '@/components/ai/prompt-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

const meta = {
  title: 'AI/PromptInput',
  component: PromptInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A ChatGPT-style input component with auto-resize, submit handling, character count, and attachment support. Perfect for AI chat interfaces and conversational UIs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is in loading state',
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    maxLength: {
      control: { type: 'number', min: 0 },
      description: 'Maximum character limit',
    },
    showAttachmentButton: {
      control: 'boolean',
      description: 'Whether to show attachment button',
    },
    minHeight: {
      control: { type: 'number', min: 40, max: 200 },
      description: 'Minimum height in pixels',
    },
    maxHeight: {
      control: { type: 'number', min: 100, max: 500 },
      description: 'Maximum height in pixels',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto focus on mount',
    },
  },
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Ask me anything...',
    showCharacterCount: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
    </div>
  ),
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Type your message (max 280 characters)...',
    showCharacterCount: true,
    maxLength: 280,
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
      <p className="mt-2 text-sm text-muted-foreground">
        Try typing more than 280 characters to see the limit warning
      </p>
    </div>
  ),
};

export const WithAttachments: Story = {
  args: {
    placeholder: 'Send a message or attach a file...',
    showAttachmentButton: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} onAttachmentClick={() => alert('Attachment button clicked!')} />
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    placeholder: 'Type your message here...',
    loading: true,
    value: 'Processing your request...',
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
      <p className="mt-2 text-sm text-muted-foreground">The input is disabled while loading</p>
    </div>
  ),
};

export const DisabledState: Story = {
  args: {
    placeholder: 'This input is disabled...',
    disabled: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
    </div>
  ),
};

export const CustomHeight: Story = {
  args: {
    placeholder: 'This input has custom height constraints...',
    minHeight: 100,
    maxHeight: 400,
  },
  render: (args) => (
    <div className="w-[600px]">
      <PromptInput {...args} />
      <p className="mt-2 text-sm text-muted-foreground">Min height: 100px, Max height: 400px</p>
    </div>
  ),
};

export const Interactive: Story = {
  args: {},
  render: () => {
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
      { role: 'assistant', content: 'Hello! How can I help you today?' },
    ]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (value: string) => {
      // Add user message
      setMessages((prev) => [...prev, { role: 'user', content: value }]);
      setPrompt('');

      // Simulate AI response
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I received your message: "${value}". This is a simulated response!`,
          },
        ]);
        setLoading(false);
      }, 1500);
    };

    return (
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Chat Demo
          </CardTitle>
          <CardDescription>Try sending messages and see the auto-resize in action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-3 rounded-lg border p-4 h-[300px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                  <p className="text-sm text-muted-foreground">Typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            loading={loading}
            showCharacterCount
            maxLength={500}
            showAttachmentButton
            onAttachmentClick={() => alert('Attachment clicked!')}
          />
        </CardContent>
      </Card>
    );
  },
};

export const WithAllFeatures: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState<string[]>([]);

    const handleSubmit = (val: string) => {
      setSubmitted((prev) => [...prev, val]);
      setValue('');
    };

    return (
      <div className="w-[700px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Full Featured Input
            </CardTitle>
            <CardDescription>
              All features enabled: character count, attachments, auto-resize
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {submitted.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Submitted Messages:</h4>
                <div className="space-y-2">
                  {submitted.map((msg, index) => (
                    <div key={index} className="rounded-lg border bg-muted p-3">
                      <p className="text-sm">{msg}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Message #{index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PromptInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              placeholder="Try typing a multi-line message..."
              showCharacterCount
              maxLength={500}
              showAttachmentButton
              onAttachmentClick={() => alert('Attachment feature clicked!')}
              minHeight={60}
              maxHeight={300}
            />

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">✅ Auto-resize</Badge>
              <Badge variant="outline">✅ Character count</Badge>
              <Badge variant="outline">✅ Max length: 500</Badge>
              <Badge variant="outline">✅ Attachments</Badge>
              <Badge variant="outline">✅ Enter to submit</Badge>
              <Badge variant="outline">✅ Shift+Enter for new line</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Press <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs">Enter</kbd> to
              submit
            </p>
            <p>
              • Press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs">Shift+Enter</kbd> for a
              new line
            </p>
            <p>• The textarea automatically grows as you type</p>
            <p>• Character count turns red when limit is exceeded</p>
            <p>• Submit button is disabled for empty/whitespace-only messages</p>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const MultipleInputs: Story = {
  args: {},
  render: () => {
    return (
      <div className="w-[700px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Short Input</CardTitle>
            <CardDescription>For quick questions or commands</CardDescription>
          </CardHeader>
          <CardContent>
            <PromptInput
              placeholder="Quick question..."
              showCharacterCount
              maxLength={100}
              minHeight={50}
              maxHeight={100}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medium Input</CardTitle>
            <CardDescription>For regular conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <PromptInput placeholder="Type your message..." showCharacterCount maxLength={500} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Large Input</CardTitle>
            <CardDescription>For detailed prompts or instructions</CardDescription>
          </CardHeader>
          <CardContent>
            <PromptInput
              placeholder="Provide detailed instructions..."
              showCharacterCount
              maxLength={2000}
              minHeight={80}
              maxHeight={400}
              showAttachmentButton
              onAttachmentClick={() => alert('Attach files')}
            />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState(
      'This message is way too long and exceeds the character limit!'
    );

    return (
      <div className="w-[600px] space-y-4">
        <PromptInput
          value={value}
          onChange={setValue}
          placeholder="Type your message..."
          showCharacterCount
          maxLength={50}
          onSubmit={(val) => alert(`Submitted: ${val}`)}
        />
        <p className="text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Your message exceeds the maximum length of 50 characters
        </p>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  args: {},
  render: () => {
    return (
      <div className="w-[600px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>
              This component includes comprehensive accessibility features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PromptInput
              placeholder="Try using keyboard navigation..."
              aria-label="Accessible prompt input"
              showCharacterCount
              maxLength={200}
              showAttachmentButton
              id="accessible-input"
              required
            />

            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Accessibility Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>ARIA labels for screen readers</li>
                <li>Keyboard navigation (Tab, Enter, Shift+Enter)</li>
                <li>Live region for character count updates</li>
                <li>Clear focus indicators</li>
                <li>Proper button labels and roles</li>
                <li>Disabled state handling</li>
                <li>Required field support</li>
                <li>ARIA-invalid for over-limit states</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};
