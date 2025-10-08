/**
 * Shared TypeScript types for AI components
 * @module ai-types
 */

/**
 * Role types for AI chat messages
 */
export type Role = 'user' | 'assistant' | 'system';

/**
 * Status types for AI operations and tasks
 */
export type Status = 'pending' | 'in-progress' | 'complete' | 'failed' | 'cancelled';

/**
 * Message interface for AI chat messages
 */
export interface Message {
  /** Unique identifier for the message */
  id: string;
  /** Role of the message sender */
  role: Role;
  /** Content of the message */
  content: string;
  /** Timestamp when the message was created */
  timestamp?: Date | string;
  /** Optional metadata for the message */
  metadata?: Record<string, unknown>;
}

/**
 * Source interface for AI citations
 */
export interface Source {
  /** Unique identifier for the source */
  id: string;
  /** Title of the source */
  title: string;
  /** URL of the source */
  url?: string;
  /** Description or excerpt from the source */
  description?: string;
  /** Optional favicon or icon URL */
  iconUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Tool interface for AI function calls
 */
export interface Tool {
  /** Name of the tool/function */
  name: string;
  /** Description of what the tool does */
  description?: string;
  /** Parameters passed to the tool */
  parameters?: Record<string, unknown>;
  /** Result returned by the tool */
  result?: unknown;
  /** Status of the tool execution */
  status?: Status;
}

/**
 * Task interface for AI agent work progress
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  /** Title or description of the task */
  title: string;
  /** Current status of the task */
  status: Status;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Optional error message if task failed */
  error?: string;
  /** Timestamp when the task was created */
  createdAt?: Date | string;
  /** Timestamp when the task was updated */
  updatedAt?: Date | string;
}

/**
 * Suggestion interface for follow-up prompts
 */
export interface Suggestion {
  /** Unique identifier for the suggestion */
  id: string;
  /** Text content of the suggestion */
  text: string;
  /** Optional icon name or component */
  icon?: string;
  /** Handler function when suggestion is clicked */
  onClick?: () => void;
}

/**
 * Branch interface for response variations
 */
export interface Branch {
  /** Unique identifier for the branch */
  id: string;
  /** Title or label for the branch */
  title?: string;
  /** Content of this branch variation */
  content: string;
  /** Timestamp when the branch was created */
  timestamp?: Date | string;
}

/**
 * Citation interface for inline citations
 */
export interface Citation {
  /** Unique identifier for the citation */
  id: string;
  /** Citation number or label */
  number: number;
  /** Source being cited */
  source: Source;
  /** Optional excerpt or quote */
  excerpt?: string;
}

/**
 * Reasoning step interface for AI thinking process
 */
export interface ReasoningStep {
  /** Unique identifier for the reasoning step */
  id: string;
  /** Title or summary of the step */
  title: string;
  /** Detailed content of the reasoning */
  content: string;
  /** Order/sequence number */
  order?: number;
}

/**
 * Model configuration interface
 */
export interface ModelConfig {
  /** Model identifier (e.g., 'gpt-4', 'claude-3') */
  id: string;
  /** Display name of the model */
  name: string;
  /** Optional description */
  description?: string;
  /** Maximum token limit */
  maxTokens?: number;
  /** Whether the model supports streaming */
  supportsStreaming?: boolean;
}

/**
 * Streaming state interface
 */
export interface StreamingState {
  /** Whether streaming is currently active */
  isStreaming: boolean;
  /** Whether streaming can be cancelled */
  canCancel?: boolean;
  /** Function to cancel streaming */
  onCancel?: () => void;
}

/**
 * Common props for AI components
 */
export interface AIComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}
