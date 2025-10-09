'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Message } from './message';
import { Loader } from './loader';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { ArrowDown } from 'lucide-react';
import type { Message as MessageType } from './ai-types';

/**
 * Props for the Conversation component
 */
export interface ConversationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of messages to display in the conversation
   */
  messages: MessageType[];

  /**
   * Whether the conversation is currently streaming/loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether to auto-scroll to bottom during streaming
   * @default true
   */
  autoScroll?: boolean;

  /**
   * Custom loading component to show when isLoading is true
   */
  loadingComponent?: React.ReactNode;

  /**
   * Custom empty state component when no messages exist
   */
  emptyState?: React.ReactNode;

  /**
   * Whether to show avatars in messages
   * @default true
   */
  showAvatars?: boolean;

  /**
   * Whether to show timestamps in messages
   * @default true
   */
  showTimestamps?: boolean;

  /**
   * Whether to show sender names in messages
   * @default false
   */
  showSenderNames?: boolean;

  /**
   * Custom avatar URLs for user messages
   */
  userAvatarUrl?: string;

  /**
   * Custom avatar URLs for assistant messages
   */
  assistantAvatarUrl?: string;

  /**
   * Custom height for the conversation container
   * @default '600px'
   */
  height?: string | number;

  /**
   * Threshold in pixels from bottom to hide scroll-to-bottom button
   * @default 100
   */
  scrollThreshold?: number;

  /**
   * Callback when user scrolls the conversation
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Conversation component for displaying a chat interface with auto-scroll functionality
 *
 * @example
 * ```tsx
 * const messages = [
 *   { id: '1', role: 'user', content: 'Hello!', timestamp: new Date() },
 *   { id: '2', role: 'assistant', content: 'Hi there!', timestamp: new Date() }
 * ];
 *
 * <Conversation
 *   messages={messages}
 *   isLoading={false}
 *   height="500px"
 * />
 * ```
 */
export const Conversation = React.forwardRef<HTMLDivElement, ConversationProps>(
  (
    {
      messages,
      isLoading = false,
      autoScroll = true,
      loadingComponent,
      emptyState,
      showAvatars = true,
      showTimestamps = true,
      showSenderNames = false,
      userAvatarUrl,
      assistantAvatarUrl,
      height = '600px',
      scrollThreshold = 100,
      onScroll,
      className,
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = React.useState(false);
    const [isUserScrolling, setIsUserScrolling] = React.useState(false);
    const lastMessageCountRef = React.useRef(messages.length);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();

    /**
     * Scrolls to the bottom of the conversation
     */
    const scrollToBottom = React.useCallback((behavior: ScrollBehavior = 'smooth') => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior, block: 'end' });
      }
    }, []);

    /**
     * Handles scroll events to determine if scroll-to-bottom button should be visible
     */
    const handleScroll = React.useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        // Show button if user is scrolled up beyond threshold
        const shouldShowButton = distanceFromBottom > scrollThreshold;
        setShowScrollButton(shouldShowButton);

        // Mark that user is scrolling
        setIsUserScrolling(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // After user stops scrolling for 150ms, reset the flag
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false);
        }, 150);

        // Call custom onScroll handler
        if (onScroll) {
          onScroll(event);
        }
      },
      [scrollThreshold, onScroll]
    );

    /**
     * Auto-scroll when new messages arrive or during streaming
     */
    React.useEffect(() => {
      // Only auto-scroll if:
      // 1. autoScroll is enabled
      // 2. User is not actively scrolling
      // 3. Either loading or new messages arrived
      const hasNewMessages = messages.length > lastMessageCountRef.current;
      const shouldAutoScroll = autoScroll && !isUserScrolling && (isLoading || hasNewMessages);

      if (shouldAutoScroll) {
        // Use instant scroll for initial load, smooth for updates
        const behavior = messages.length === 1 ? 'instant' : 'smooth';
        scrollToBottom(behavior as ScrollBehavior);
      }

      lastMessageCountRef.current = messages.length;
    }, [messages, isLoading, autoScroll, isUserScrolling, scrollToBottom]);

    /**
     * Initial scroll to bottom on mount
     */
    React.useEffect(() => {
      if (messages.length > 0) {
        scrollToBottom('instant');
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Cleanup timeout on unmount
     */
    React.useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    /**
     * Handle scroll button click
     */
    const handleScrollButtonClick = React.useCallback(() => {
      setIsUserScrolling(false);
      scrollToBottom('smooth');
    }, [scrollToBottom]);

    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col', className)}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        {...props}
      >
        <ScrollArea className="flex-1">
          <div
            ref={viewportRef}
            className="px-4 py-6"
            onScroll={handleScroll}
            role="log"
            aria-live="polite"
            aria-label="Conversation messages"
          >
            {/* Empty state */}
            {messages.length === 0 && !isLoading && (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                {emptyState || (
                  <p className="text-muted-foreground text-sm">
                    No messages yet. Start a conversation!
                  </p>
                )}
              </div>
            )}

            {/* Messages */}
            <div className="space-y-6">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  showAvatar={showAvatars}
                  showTimestamp={showTimestamps}
                  showSenderName={showSenderNames}
                  avatarUrl={
                    message.role === 'user'
                      ? userAvatarUrl
                      : message.role === 'assistant'
                        ? assistantAvatarUrl
                        : undefined
                  }
                />
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3" aria-label="Assistant is typing">
                  {showAvatars && (
                    <div className="size-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
                      <div className="size-4 text-muted-foreground">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8V12L15 15" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    {loadingComponent || <Loader size="sm" />}
                  </div>
                </div>
              )}
            </div>

            {/* Scroll anchor */}
            <div ref={messagesEndRef} className="h-px" aria-hidden="true" />
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={handleScrollButtonClick}
              className="rounded-full shadow-lg bg-background hover:bg-accent"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Conversation.displayName = 'Conversation';
