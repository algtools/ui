import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Tool as AITool } from '@/components/ai/tool';
import type { Tool as ToolType } from '@/components/ai/ai-types';

const meta = {
  title: 'AI/Tool',
  component: AITool,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tool: {
      description: 'The tool data to display',
    },
    showParameters: {
      control: 'boolean',
      description: 'Whether to show parameters section',
    },
    showResult: {
      control: 'boolean',
      description: 'Whether to show result section',
    },
    defaultParametersExpanded: {
      control: 'boolean',
      description: 'Whether parameters section is initially expanded',
    },
    defaultResultExpanded: {
      control: 'boolean',
      description: 'Whether result section is initially expanded',
    },
    status: {
      control: 'select',
      options: ['pending', 'in-progress', 'complete', 'failed', 'cancelled'],
      description: 'Override the tool status',
    },
  },
} satisfies Meta<typeof Tool>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tool data
const sampleTool: ToolType = {
  name: 'search_database',
  description: 'Search for records in the database',
  status: 'pending',
};

export const Pending: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'pending',
    },
    showParameters: false,
    showResult: false,
  },
};

export const InProgress: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'in-progress',
      parameters: {
        query: 'users',
        filters: { status: 'active', role: 'admin' },
        limit: 10,
      },
    },
    showParameters: true,
    showResult: false,
    defaultParametersExpanded: true,
  },
};

export const Complete: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'complete',
      parameters: {
        query: 'users',
        limit: 10,
      },
      result: {
        count: 42,
        records: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
      },
    },
    showParameters: true,
    showResult: true,
    defaultParametersExpanded: false,
    defaultResultExpanded: true,
  },
};

export const Failed: Story = {
  args: {
    tool: {
      name: 'fetch_api_data',
      description: 'Fetch data from external API',
      status: 'failed',
      parameters: {
        endpoint: 'https://api.example.com/data',
        timeout: 5000,
      },
      result: 'Connection timeout: Unable to reach server after 5000ms',
    },
    showParameters: true,
    showResult: true,
    defaultParametersExpanded: true,
    defaultResultExpanded: true,
  },
};

export const Cancelled: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'cancelled',
      parameters: { query: 'test' },
    },
    showParameters: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    tool: {
      name: 'get_weather',
      status: 'complete',
      parameters: { location: 'New York' },
      result: { temperature: 72, conditions: 'Sunny' },
    },
    showParameters: true,
    showResult: true,
  },
};

export const SimpleStringResult: Story = {
  args: {
    tool: {
      name: 'generate_uuid',
      description: 'Generate a unique identifier',
      status: 'complete',
      result: '550e8400-e29b-41d4-a716-446655440000',
    },
    showResult: true,
  },
};

export const NumericResult: Story = {
  args: {
    tool: {
      name: 'calculate_sum',
      description: 'Calculate the sum of numbers',
      status: 'complete',
      parameters: { numbers: [1, 2, 3, 4, 5] },
      result: 15,
    },
    showParameters: true,
    showResult: true,
  },
};

export const BooleanResult: Story = {
  args: {
    tool: {
      name: 'check_file_exists',
      description: 'Check if a file exists in the system',
      status: 'complete',
      parameters: { path: '/home/user/document.txt' },
      result: true,
    },
    showParameters: true,
    showResult: true,
  },
};

export const ComplexParameters: Story = {
  args: {
    tool: {
      name: 'execute_query',
      description: 'Execute a complex database query',
      status: 'complete',
      parameters: {
        query: 'SELECT * FROM users',
        options: {
          pagination: { page: 1, pageSize: 20 },
          sorting: [{ field: 'createdAt', order: 'desc' }],
          filters: {
            status: 'active',
            roles: ['admin', 'moderator'],
            dateRange: { start: '2024-01-01', end: '2024-12-31' },
          },
        },
      },
      result: {
        totalCount: 156,
        page: 1,
        pageSize: 20,
        data: '[... 20 records ...]',
      },
    },
    showParameters: true,
    showResult: true,
    defaultParametersExpanded: true,
    defaultResultExpanded: true,
  },
};

export const AllStatuses = {
  render: () => (
    <div className="space-y-3 w-[700px]">
      <AITool
        tool={{
          name: 'pending_function',
          description: 'Waiting to execute',
          status: 'pending',
        }}
      />
      <AITool
        tool={{
          name: 'executing_function',
          description: 'Currently running',
          status: 'in-progress',
          parameters: { input: 'test' },
        }}
        showParameters
        defaultParametersExpanded
      />
      <AITool
        tool={{
          name: 'completed_function',
          description: 'Successfully finished',
          status: 'complete',
          parameters: { input: 'test' },
          result: { output: 'success', elapsed: '1.2s' },
        }}
        showParameters
        showResult
      />
      <AITool
        tool={{
          name: 'failed_function',
          description: 'Encountered an error',
          status: 'failed',
          parameters: { input: 'invalid' },
          result: 'Error: Invalid input parameter',
        }}
        showParameters
        showResult
        defaultResultExpanded
      />
      <AITool
        tool={{
          name: 'cancelled_function',
          description: 'User cancelled execution',
          status: 'cancelled',
        }}
      />
    </div>
  ),
};

export const OpenAIToolExample = {
  render: () => (
    <div className="space-y-3 w-[700px]">
      <AITool
        tool={{
          name: 'get_current_weather',
          description: 'Get the current weather in a given location',
          status: 'complete',
          parameters: {
            location: 'San Francisco, CA',
            unit: 'celsius',
          },
          result: {
            location: 'San Francisco, CA',
            temperature: 15,
            unit: 'celsius',
            forecast: ['sunny', 'windy'],
          },
        }}
        showParameters
        showResult
      />
      <AITool
        tool={{
          name: 'search_wikipedia',
          description: 'Search Wikipedia for information',
          status: 'complete',
          parameters: {
            query: 'artificial intelligence',
            limit: 3,
          },
          result: {
            results: [
              {
                title: 'Artificial intelligence',
                snippet: 'AI is intelligence demonstrated by machines...',
              },
              {
                title: 'History of artificial intelligence',
                snippet: 'The history of AI began in antiquity...',
              },
            ],
          },
        }}
        showParameters
        showResult
        defaultResultExpanded
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const FunctionCallWorkflow = {
  render: () => {
    const [selectedTool, setSelectedTool] = React.useState<ToolType | null>(null);

    const tools: ToolType[] = [
      {
        name: 'read_file',
        description: 'Read contents of a file',
        status: 'complete',
        parameters: { path: '/src/index.ts' },
        result: '// File contents...\nexport const app = ...;',
      },
      {
        name: 'analyze_code',
        description: 'Analyze code for patterns',
        status: 'complete',
        parameters: { code: '...' },
        result: {
          patterns: ['async/await', 'error handling'],
          complexity: 'medium',
        },
      },
      {
        name: 'generate_tests',
        description: 'Generate unit tests',
        status: 'in-progress',
        parameters: { file: '/src/index.ts' },
      },
    ];

    return (
      <div className="space-y-4 w-[700px]">
        <h3 className="text-lg font-semibold">AI Agent Function Calls</h3>
        <div className="space-y-3">
          {tools.map((tool, index) => (
            <AITool
              key={index}
              tool={tool}
              showParameters
              showResult
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </div>
        {selectedTool && (
          <div className="p-4 border rounded-lg bg-muted">
            <h4 className="font-medium mb-2">Selected Tool:</h4>
            <pre className="text-xs bg-background p-2 rounded overflow-auto">
              {JSON.stringify(selectedTool, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const LongToolName = {
  render: () => (
    <div className="w-[600px]">
      <AITool
        tool={{
          name: 'execute_very_long_function_name_that_demonstrates_text_wrapping_behavior',
          description: 'This tool has an extremely long name to test wrapping',
          status: 'complete',
          result: 'Successfully handled long name',
        }}
        showResult
      />
    </div>
  ),
};

export const ErrorHandling = {
  render: () => (
    <div className="space-y-3 w-[700px]">
      <AITool
        tool={{
          name: 'network_request',
          description: 'Make HTTP request',
          status: 'failed',
          parameters: {
            url: 'https://api.example.com/data',
            method: 'GET',
            timeout: 5000,
          },
          result: {
            error: 'ETIMEDOUT',
            message: 'Connection timeout after 5000ms',
            code: 'NETWORK_ERROR',
          },
        }}
        showParameters
        showResult
        defaultParametersExpanded
        defaultResultExpanded
      />
      <AITool
        tool={{
          name: 'file_operation',
          description: 'Read protected file',
          status: 'failed',
          parameters: { path: '/root/secret.txt' },
          result: 'PermissionError: [Errno 13] Permission denied',
        }}
        showParameters
        showResult
        defaultResultExpanded
      />
    </div>
  ),
};

export const DarkMode = {
  render: () => (
    <div className="dark bg-background p-6 rounded-lg space-y-3 w-[700px]">
      <AITool
        tool={{
          name: 'pending_in_dark',
          description: 'Pending status in dark mode',
          status: 'pending',
        }}
      />
      <AITool
        tool={{
          name: 'in_progress_in_dark',
          description: 'In progress in dark mode',
          status: 'in-progress',
          parameters: { test: true },
        }}
        showParameters
      />
      <AITool
        tool={{
          name: 'complete_in_dark',
          description: 'Completed in dark mode',
          status: 'complete',
          result: { success: true },
        }}
        showResult
      />
      <AITool
        tool={{
          name: 'failed_in_dark',
          description: 'Failed in dark mode',
          status: 'failed',
          result: 'Error occurred',
        }}
        showResult
        defaultResultExpanded
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
