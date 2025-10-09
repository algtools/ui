import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Task, TaskList } from '../task';
import { type Task as TaskType } from '../ai-types';

describe('Task', () => {
  const mockTask: TaskType = {
    id: '1',
    title: 'Test Task',
    status: 'pending',
  };

  it('renders task with title and status icon', () => {
    render(<Task task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByLabelText(/task: test task, status: pending/i)).toBeInTheDocument();
  });

  it('applies correct classes for pending status', () => {
    render(<Task task={mockTask} />);
    const taskElement = screen.getByLabelText(/task: test task/i);
    expect(taskElement).toHaveClass('border-border', 'bg-muted/30');
  });

  it('applies correct classes for in-progress status', () => {
    const task: TaskType = { ...mockTask, status: 'in-progress' };
    render(<Task task={task} />);
    const taskElement = screen.getByLabelText(/status: in-progress/i);
    expect(taskElement).toHaveClass('border-blue-200', 'bg-blue-50');
  });

  it('applies correct classes for complete status', () => {
    const task: TaskType = { ...mockTask, status: 'complete' };
    render(<Task task={task} />);
    const taskElement = screen.getByLabelText(/status: complete/i);
    expect(taskElement).toHaveClass('border-green-200', 'bg-green-50');
  });

  it('applies correct classes for failed status', () => {
    const task: TaskType = { ...mockTask, status: 'failed' };
    render(<Task task={task} />);
    const taskElement = screen.getByLabelText(/status: failed/i);
    expect(taskElement).toHaveClass('border-red-200', 'bg-red-50');
  });

  it('applies correct classes for cancelled status', () => {
    const task: TaskType = { ...mockTask, status: 'cancelled' };
    render(<Task task={task} />);
    const taskElement = screen.getByLabelText(/status: cancelled/i);
    expect(taskElement).toHaveClass('opacity-60');
  });

  it('shows progress bar when showProgress is true and progress is defined', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'in-progress',
      progress: 45,
    };
    render(<Task task={task} showProgress />);
    expect(screen.getByLabelText('Progress: 45%')).toBeInTheDocument();
    expect(screen.getByText('45% complete')).toBeInTheDocument();
  });

  it('does not show progress bar when showProgress is false', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'in-progress',
      progress: 45,
    };
    render(<Task task={task} showProgress={false} />);
    expect(screen.queryByLabelText(/progress:/i)).not.toBeInTheDocument();
  });

  it('does not show progress bar when progress is undefined', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'in-progress',
    };
    render(<Task task={task} showProgress />);
    expect(screen.queryByLabelText(/progress:/i)).not.toBeInTheDocument();
  });

  it('shows error message for failed tasks', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'failed',
      error: 'Something went wrong',
    };
    render(<Task task={task} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not show error message for non-failed tasks even if error is present', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'complete',
      error: 'This should not show',
    };
    render(<Task task={task} />);
    expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
  });

  it('shows timestamp when showTimestamp is true and createdAt is defined', () => {
    const task: TaskType = {
      ...mockTask,
      createdAt: new Date('2024-01-15T10:30:00'),
    };
    render(<Task task={task} showTimestamp />);
    expect(screen.getByRole('time')).toBeInTheDocument();
  });

  it('shows updatedAt timestamp over createdAt when both are present', () => {
    const task: TaskType = {
      ...mockTask,
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T11:45:00'),
    };
    render(<Task task={task} showTimestamp />);
    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    // The updatedAt time should be shown
    expect(timeElement).toHaveAttribute('datetime');
  });

  it('does not show timestamp when showTimestamp is false', () => {
    const task: TaskType = {
      ...mockTask,
      createdAt: new Date('2024-01-15T10:30:00'),
    };
    render(<Task task={task} showTimestamp={false} />);
    expect(screen.queryByRole('time')).not.toBeInTheDocument();
  });

  it('handles string timestamps correctly', () => {
    const task: TaskType = {
      ...mockTask,
      createdAt: '2024-01-15T10:30:00Z',
    };
    render(<Task task={task} showTimestamp />);
    expect(screen.getByRole('time')).toBeInTheDocument();
  });

  it('calls onClick handler when task is clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Task task={mockTask} onClick={onClick} />);

    await user.click(screen.getByLabelText(/task: test task/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events (Enter) when onClick is provided', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Task task={mockTask} onClick={onClick} />);

    const taskElement = screen.getByLabelText(/task: test task/i);
    taskElement.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events (Space) when onClick is provided', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Task task={mockTask} onClick={onClick} />);

    const taskElement = screen.getByLabelText(/task: test task/i);
    taskElement.focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not clickable when onClick is not provided', () => {
    render(<Task task={mockTask} />);
    const taskElement = screen.getByLabelText(/task: test task/i);
    expect(taskElement).not.toHaveAttribute('role', 'button');
    expect(taskElement).not.toHaveClass('cursor-pointer');
  });

  it('merges custom className', () => {
    render(<Task task={mockTask} className="custom-class" />);
    expect(screen.getByLabelText(/task: test task/i)).toHaveClass('custom-class');
  });

  it('allows status override via props', () => {
    const task: TaskType = { ...mockTask, status: 'pending' };
    render(<Task task={task} status="complete" />);
    expect(screen.getByLabelText(/status: complete/i)).toBeInTheDocument();
  });

  it('shows 100% complete text for completed tasks with 100% progress', () => {
    const task: TaskType = {
      ...mockTask,
      status: 'complete',
      progress: 100,
    };
    render(<Task task={task} showProgress />);
    expect(screen.getByText('100% complete')).toBeInTheDocument();
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Task task={mockTask} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('TaskList', () => {
  const mockTasks: TaskType[] = [
    { id: '1', title: 'Task 1', status: 'complete' },
    { id: '2', title: 'Task 2', status: 'in-progress', progress: 50 },
    { id: '3', title: 'Task 3', status: 'pending' },
  ];

  it('renders all tasks in the list', () => {
    render(<TaskList tasks={mockTasks} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('renders with role="log" and aria-live="polite"', () => {
    render(<TaskList tasks={mockTasks} />);
    const list = screen.getByRole('log');
    expect(list).toHaveAttribute('aria-live', 'polite');
    expect(list).toHaveAttribute('aria-label', 'Task list');
  });

  it('shows empty message when tasks array is empty', () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText('No tasks')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(<TaskList tasks={[]} emptyMessage="No tasks available" />);
    expect(screen.getByText('No tasks available')).toBeInTheDocument();
  });

  it('passes showProgress to all tasks', () => {
    render(<TaskList tasks={mockTasks} showProgress />);
    expect(screen.getByText('50% complete')).toBeInTheDocument();
  });

  it('passes showTimestamp to all tasks', () => {
    const tasksWithTimestamp: TaskType[] = [
      { id: '1', title: 'Task 1', status: 'complete', createdAt: new Date() },
    ];
    render(<TaskList tasks={tasksWithTimestamp} showTimestamp />);
    expect(screen.getByRole('time')).toBeInTheDocument();
  });

  it('calls onTaskClick when a task is clicked', async () => {
    const user = userEvent.setup();
    const onTaskClick = jest.fn();
    render(<TaskList tasks={mockTasks} onTaskClick={onTaskClick} />);

    await user.click(screen.getByLabelText(/task: task 1/i));
    expect(onTaskClick).toHaveBeenCalledTimes(1);
    expect(onTaskClick).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('merges custom className', () => {
    render(<TaskList tasks={mockTasks} className="custom-list-class" />);
    expect(screen.getByRole('log')).toHaveClass('custom-list-class');
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TaskList tasks={mockTasks} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders tasks with unique keys', () => {
    const { container } = render(<TaskList tasks={mockTasks} />);
    const tasks = container.querySelectorAll('[aria-label^="Task:"]');
    expect(tasks).toHaveLength(3);
  });
});
