'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Role } from './ai-types';
import { Bot, User as UserIcon } from 'lucide-react';

/**
 * Props for the Message component
 */
export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The role of the message sender
   * - `user`: Message from the user
   * - `assistant`: Message from the AI assistant
   * - `system`: System message or notification
   */
  role: Role;

  /**
   * The content of the message
   */
  content: string;

  /**
   * Optional timestamp for when the message was created
   */
  timestamp?: Date | string;

  /**
   * Optional avatar URL for the message sender
   */
  avatarUrl?: string;

  /**
   * Optional avatar fallback text (e.g., initials)
   * Defaults to first letter of role
   */
  avatarFallback?: string;

  /**
   * Whether to show the avatar
   * @default true
   */
  showAvatar?: boolean;

  /**
   * Whether to show the timestamp
   * @default true
   */
  showTimestamp?: boolean;

  /**
   * Custom name to display for the message sender
   */
  senderName?: string;

  /**
   * Whether to show the sender name
   * @default false
   */
  showSenderName?: boolean;
}

/**
 * Formats a timestamp for display
 * @param timestamp - The timestamp to format
 * @returns Formatted time string
 */
function formatTimestamp(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  if (isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
}

/**
 * Message component for displaying chat messages with avatars and timestamps
 *
 * @example
 * ```tsx
 * <Message
 *   role="user"
 *   content="Hello, how can you help me?"
 *   timestamp={new Date()}
 * />
 *
 * <Message
 *   role="assistant"
 *   content="I'd be happy to help! What do you need?"
 *   timestamp={new Date()}
 *   avatarUrl="/ai-avatar.png"
 * />
 * ```
 */
export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      role,
      content,
      timestamp,
      avatarUrl,
      avatarFallback,
      showAvatar = true,
      showTimestamp = true,
      senderName,
      showSenderName = false,
      className,
      ...props
    },
    ref
  ) => {
    const isUser = role === 'user';
    const isAssistant = role === 'assistant';
    const isSystem = role === 'system';

    // Determine default fallback based on role
    const defaultFallback = avatarFallback || (isUser ? 'U' : isAssistant ? 'AI' : 'S');

    // Determine default sender name based on role
    const defaultSenderName = senderName || (isUser ? 'You' : isAssistant ? 'Assistant' : 'System');

    // Get avatar icon based on role
    const AvatarIcon = isUser ? UserIcon : Bot;

    return (
      <div
        ref={ref}
        role="article"
        aria-label={`${defaultSenderName} message`}
        className={cn('flex gap-3', isUser && 'flex-row-reverse', className)}
        {...props}
      >
        {/* Avatar */}
        {showAvatar && !isSystem && (
          <Avatar
            className={cn('size-8 shrink-0', isUser && 'bg-primary', isAssistant && 'bg-muted')}
          >
            {avatarUrl && <AvatarImage src={avatarUrl} alt={defaultSenderName} />}
            <AvatarFallback
              className={cn(
                isUser && 'bg-primary text-primary-foreground',
                isAssistant && 'bg-muted text-muted-foreground'
              )}
            >
              {avatarUrl ? defaultFallback : <AvatarIcon className="size-4" />}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Message Content */}
        <div
          className={cn(
            'flex flex-col gap-1 max-w-[85%]',
            isUser && 'items-end',
            isSystem && 'items-center w-full max-w-full'
          )}
        >
          {/* Sender Name */}
          {showSenderName && !isSystem && (
            <span
              className="text-xs font-medium text-muted-foreground px-1"
              aria-label="Sender name"
            >
              {defaultSenderName}
            </span>
          )}

          {/* Message Bubble */}
          <div
            className={cn(
              'rounded-lg px-4 py-2.5 break-words',
              isUser && 'bg-primary text-primary-foreground',
              isAssistant && 'bg-muted text-foreground',
              isSystem && 'bg-accent/50 text-accent-foreground text-sm text-center italic'
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          </div>

          {/* Timestamp */}
          {showTimestamp && timestamp && (
            <time
              className={cn('text-xs text-muted-foreground px-1', isSystem && 'text-center w-full')}
              dateTime={typeof timestamp === 'string' ? timestamp : timestamp.toISOString()}
              aria-label="Message timestamp"
            >
              {formatTimestamp(timestamp)}
            </time>
          )}
        </div>
      </div>
    );
  }
);

Message.displayName = 'Message';
