import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Task, TaskList } from '@/components/ai/task';
import type { Task as TaskType } from '@/components/ai/ai-types';

const meta = {
  title: 'AI/Task',
  component: Task,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for displaying AI task execution status. Shows task progress, status indicators, timestamps, and optional progress bars for long-running operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    task: {
      description: 'The task data to display',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show the progress bar',
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Whether to show timestamps',
    },
    status: {
      control: 'select',
      options: ['pending', 'in-progress', 'complete', 'failed', 'cancelled'],
      description: 'Override the task status',
    },
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample task data
const sampleTask: TaskType = {
  id: '1',
  title: 'Analyze codebase structure',
  status: 'pending',
};

export const Pending: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'pending',
    },
    showProgress: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task in pending state, waiting to be started, displayed without a progress bar.',
      },
    },
  },
};

export const InProgress: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'in-progress',
      progress: 45,
    },
    showProgress: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task in progress with a progress bar showing 45% completion, indicating active work.',
      },
    },
  },
};

export const Complete: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'complete',
      progress: 100,
    },
    showProgress: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task completed successfully with progress bar at 100%, showing a finished state.',
      },
    },
  },
};

export const Failed: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'failed',
      error: 'Unable to access file system',
    },
    showProgress: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task that has failed with an error message displayed, showing what went wrong.',
      },
    },
  },
};

export const Cancelled: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'cancelled',
    },
    showProgress: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task that has been cancelled, typically by user action, displayed without progress.',
      },
    },
  },
};

export const WithTimestamp: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'in-progress',
      progress: 67,
      createdAt: new Date('2024-10-08T10:30:00'),
      updatedAt: new Date('2024-10-08T10:35:00'),
    },
    showProgress: true,
    showTimestamp: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task with timestamps displayed, showing when the task was created and last updated, useful for tracking task history.',
      },
    },
  },
};

export const AllStatuses = {
  render: () => (
    <div className="space-y-3 w-[600px]">
      <Task
        task={{
          id: '1',
          title: 'Waiting to start analysis',
          status: 'pending',
        }}
      />
      <Task
        task={{
          id: '2',
          title: 'Analyzing code dependencies',
          status: 'in-progress',
          progress: 35,
        }}
        showProgress
      />
      <Task
        task={{
          id: '3',
          title: 'Generated documentation',
          status: 'complete',
          progress: 100,
        }}
        showProgress
      />
      <Task
        task={{
          id: '4',
          title: 'Failed to compile project',
          status: 'failed',
          error: 'TypeScript compilation error in src/index.ts',
        }}
      />
      <Task
        task={{
          id: '5',
          title: 'Cancelled by user',
          status: 'cancelled',
        }}
      />
    </div>
  ),
};

export const ProgressVariations = {
  render: () => (
    <div className="space-y-3 w-[600px]">
      <Task
        task={{
          id: '1',
          title: 'Just started',
          status: 'in-progress',
          progress: 5,
        }}
        showProgress
      />
      <Task
        task={{
          id: '2',
          title: 'Quarter done',
          status: 'in-progress',
          progress: 25,
        }}
        showProgress
      />
      <Task
        task={{
          id: '3',
          title: 'Halfway there',
          status: 'in-progress',
          progress: 50,
        }}
        showProgress
      />
      <Task
        task={{
          id: '4',
          title: 'Almost complete',
          status: 'in-progress',
          progress: 90,
        }}
        showProgress
      />
      <Task
        task={{
          id: '5',
          title: 'Finished',
          status: 'complete',
          progress: 100,
        }}
        showProgress
      />
    </div>
  ),
};

export const TaskListExample = {
  render: () => (
    <TaskList
      tasks={[
        {
          id: '1',
          title: 'Initialize project structure',
          status: 'complete',
          progress: 100,
          createdAt: new Date('2024-10-08T10:00:00'),
        },
        {
          id: '2',
          title: 'Install dependencies',
          status: 'complete',
          progress: 100,
          createdAt: new Date('2024-10-08T10:05:00'),
        },
        {
          id: '3',
          title: 'Configure build tools',
          status: 'in-progress',
          progress: 70,
          createdAt: new Date('2024-10-08T10:10:00'),
        },
        {
          id: '4',
          title: 'Setup testing environment',
          status: 'pending',
          createdAt: new Date('2024-10-08T10:15:00'),
        },
        {
          id: '5',
          title: 'Deploy to production',
          status: 'pending',
          createdAt: new Date('2024-10-08T10:20:00'),
        },
      ]}
      showProgress
      showTimestamp
    />
  ),
  parameters: {
    layout: 'padded',
  },
};

export const EmptyTaskList = {
  render: () => <TaskList tasks={[]} />,
  parameters: {
    layout: 'padded',
  },
};

export const CustomEmptyMessage = {
  render: () => <TaskList tasks={[]} emptyMessage="No tasks found. Start a new session." />,
  parameters: {
    layout: 'padded',
  },
};

export const InteractiveTaskList = {
  render: () => {
    const [selectedTask, setSelectedTask] = React.useState<TaskType | null>(null);

    return (
      <div className="space-y-4">
        <TaskList
          tasks={[
            {
              id: '1',
              title: 'Click me to see details',
              status: 'complete',
            },
            {
              id: '2',
              title: 'Or click this one',
              status: 'in-progress',
              progress: 60,
            },
            {
              id: '3',
              title: 'This one too',
              status: 'pending',
            },
          ]}
          showProgress
          onTaskClick={setSelectedTask}
        />
        {selectedTask && (
          <div className="p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Selected Task:</h3>
            <pre className="text-xs bg-background p-2 rounded overflow-auto">
              {JSON.stringify(selectedTask, null, 2)}
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

export const LongTaskTitle = {
  render: () => (
    <div className="w-[600px]">
      <Task
        task={{
          id: '1',
          title:
            'This is a very long task title that demonstrates how the component handles text wrapping and maintains a clean layout even with lengthy descriptions',
          status: 'in-progress',
          progress: 42,
        }}
        showProgress
      />
    </div>
  ),
};

export const AIAgentWorkflow = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-3">AI Code Analysis Agent</h3>
        <TaskList
          tasks={[
            {
              id: '1',
              title: 'Read project files',
              status: 'complete',
              progress: 100,
              createdAt: new Date('2024-10-08T10:00:00'),
              updatedAt: new Date('2024-10-08T10:00:30'),
            },
            {
              id: '2',
              title: 'Parse TypeScript AST',
              status: 'complete',
              progress: 100,
              createdAt: new Date('2024-10-08T10:00:30'),
              updatedAt: new Date('2024-10-08T10:01:15'),
            },
            {
              id: '3',
              title: 'Analyze dependencies',
              status: 'complete',
              progress: 100,
              createdAt: new Date('2024-10-08T10:01:15'),
              updatedAt: new Date('2024-10-08T10:02:00'),
            },
            {
              id: '4',
              title: 'Identify code patterns',
              status: 'in-progress',
              progress: 65,
              createdAt: new Date('2024-10-08T10:02:00'),
            },
            {
              id: '5',
              title: 'Generate recommendations',
              status: 'pending',
              createdAt: new Date('2024-10-08T10:02:30'),
            },
            {
              id: '6',
              title: 'Create report',
              status: 'pending',
              createdAt: new Date('2024-10-08T10:03:00'),
            },
          ]}
          showProgress
          showTimestamp
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ErrorHandling = {
  render: () => (
    <div className="space-y-3 w-[600px]">
      <Task
        task={{
          id: '1',
          title: 'Network request failed',
          status: 'failed',
          error: 'Connection timeout after 30 seconds',
        }}
      />
      <Task
        task={{
          id: '2',
          title: 'Invalid configuration',
          status: 'failed',
          error: 'Missing required environment variable: API_KEY',
        }}
      />
      <Task
        task={{
          id: '3',
          title: 'Permission denied',
          status: 'failed',
          error: 'Insufficient permissions to access /protected/directory',
        }}
      />
    </div>
  ),
};

export const DarkMode = {
  render: () => (
    <div className="dark bg-background p-6 rounded-lg space-y-3">
      <Task
        task={{
          id: '1',
          title: 'Pending task in dark mode',
          status: 'pending',
        }}
      />
      <Task
        task={{
          id: '2',
          title: 'In progress task in dark mode',
          status: 'in-progress',
          progress: 55,
        }}
        showProgress
      />
      <Task
        task={{
          id: '3',
          title: 'Completed task in dark mode',
          status: 'complete',
          progress: 100,
        }}
        showProgress
      />
      <Task
        task={{
          id: '4',
          title: 'Failed task in dark mode',
          status: 'failed',
          error: 'Something went wrong',
        }}
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Import React for the interactive story
import * as React from 'react';
