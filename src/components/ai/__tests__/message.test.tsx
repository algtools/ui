/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock Radix Avatar primitives to avoid image loading behavior in tests
vi.mock('@radix-ui/react-avatar', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Image: ({ ...props }: React.ComponentProps<'img'>) => <img {...props} />,
    Fallback: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Bot: ({ className }: { className?: string }) => (
    <svg data-testid="bot-icon" className={className} />
  ),
  User: ({ className }: { className?: string }) => (
    <svg data-testid="user-icon" className={className} />
  ),
}));

import { Message } from '../message';

describe('Message', () => {
  describe('Basic Rendering', () => {
    it('renders user message with content', () => {
      render(<Message role="user" content="Hello, world!" />);
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'You message');
    });

    it('renders assistant message with content', () => {
      render(<Message role="assistant" content="Hi there!" />);
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'Assistant message');
    });

    it('renders system message with content', () => {
      render(<Message role="system" content="Connection established" />);
      expect(screen.getByText('Connection established')).toBeInTheDocument();
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'System message');
    });

    it('applies custom className', () => {
      render(<Message role="user" content="Test" className="custom-class" />);
      expect(screen.getByRole('article')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Message ref={ref} role="user" content="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Avatar Display', () => {
    it('shows avatar by default for user messages', () => {
      render(<Message role="user" content="Test" />);
      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('shows avatar by default for assistant messages', () => {
      render(<Message role="assistant" content="Test" />);
      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('does not show avatar for system messages', () => {
      render(<Message role="system" content="Test" />);
      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).not.toBeInTheDocument();
    });

    it('hides avatar when showAvatar is false', () => {
      render(<Message role="user" content="Test" showAvatar={false} />);
      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).not.toBeInTheDocument();
    });

    it('renders avatar with custom URL', () => {
      render(<Message role="user" content="Test" avatarUrl="/avatar.png" />);
      const img = document.querySelector('[data-slot="avatar-image"]');
      expect(img).toHaveAttribute('src', '/avatar.png');
    });

    it('renders avatar with custom fallback text', () => {
      render(<Message role="user" content="Test" avatarFallback="JD" avatarUrl="/test.png" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('uses default fallback for user without avatarUrl', () => {
      render(<Message role="user" content="Test" />);
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('uses default fallback for assistant without avatarUrl', () => {
      render(<Message role="assistant" content="Test" />);
      expect(screen.getByTestId('bot-icon')).toBeInTheDocument();
    });
  });

  describe('Timestamp Display', () => {
    it('shows timestamp by default when provided', () => {
      const timestamp = new Date('2024-01-01T12:00:00Z');
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      const timeElement = screen.getByRole('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveAttribute('datetime', timestamp.toISOString());
    });

    it('hides timestamp when showTimestamp is false', () => {
      const timestamp = new Date('2024-01-01T12:00:00Z');
      render(<Message role="user" content="Test" timestamp={timestamp} showTimestamp={false} />);
      expect(screen.queryByRole('time')).not.toBeInTheDocument();
    });

    it('does not render timestamp when not provided', () => {
      render(<Message role="user" content="Test" />);
      expect(screen.queryByRole('time')).not.toBeInTheDocument();
    });

    it('accepts timestamp as string', () => {
      const timestamp = '2024-01-01T12:00:00Z';
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByRole('time')).toHaveAttribute('datetime', timestamp);
    });

    it('formats recent timestamp as "just now"', () => {
      const timestamp = new Date(Date.now() - 30 * 1000); // 30 seconds ago
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByText('just now')).toBeInTheDocument();
    });

    it('formats timestamp in minutes', () => {
      const timestamp = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByText('5m ago')).toBeInTheDocument();
    });

    it('formats timestamp in hours', () => {
      const timestamp = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByText('3h ago')).toBeInTheDocument();
    });

    it('formats timestamp in days', () => {
      const timestamp = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByText('2d ago')).toBeInTheDocument();
    });

    it('formats old timestamp as date', () => {
      const timestamp = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      const timeElement = screen.getByRole('time');
      expect(timeElement.textContent).toMatch(/[A-Za-z]+ \d+/); // e.g., "Jan 1"
    });

    it('handles invalid timestamp gracefully', () => {
      const timestamp = 'invalid-date';
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      // Should still render but with empty or no timestamp display
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Sender Name Display', () => {
    it('does not show sender name by default', () => {
      render(<Message role="user" content="Test" />);
      expect(screen.queryByLabelText('Sender name')).not.toBeInTheDocument();
    });

    it('shows sender name when showSenderName is true', () => {
      render(<Message role="user" content="Test" showSenderName />);
      expect(screen.getByText('You')).toBeInTheDocument();
      expect(screen.getByLabelText('Sender name')).toBeInTheDocument();
    });

    it('shows custom sender name', () => {
      render(<Message role="assistant" content="Test" showSenderName senderName="ChatGPT" />);
      expect(screen.getByText('ChatGPT')).toBeInTheDocument();
    });

    it('uses default sender name for assistant', () => {
      render(<Message role="assistant" content="Test" showSenderName />);
      expect(screen.getByText('Assistant')).toBeInTheDocument();
    });

    it('uses default sender name for system in aria-label', () => {
      render(<Message role="system" content="Test" showSenderName />);
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'System message');
    });

    it('does not show sender name for system messages even when enabled', () => {
      render(<Message role="system" content="Test" showSenderName />);
      expect(screen.queryByLabelText('Sender name')).not.toBeInTheDocument();
    });
  });

  describe('Role-Specific Styling', () => {
    it('applies user-specific classes', () => {
      render(<Message role="user" content="Test" />);
      const article = screen.getByRole('article');
      expect(article).toHaveClass('flex-row-reverse');
    });

    it('applies assistant-specific classes', () => {
      render(<Message role="assistant" content="Test" />);
      const article = screen.getByRole('article');
      expect(article).not.toHaveClass('flex-row-reverse');
    });

    it('applies system-specific classes', () => {
      render(<Message role="system" content="Test" />);
      const article = screen.getByRole('article');
      // System messages should have centered styling
      const messageContent = screen.getByText('Test').parentElement;
      expect(messageContent).toHaveClass('text-center');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<Message role="user" content="Test" />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('has proper ARIA label for user messages', () => {
      render(<Message role="user" content="Test" />);
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'You message');
    });

    it('has proper ARIA label for assistant messages', () => {
      render(<Message role="assistant" content="Test" />);
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'Assistant message');
    });

    it('has proper ARIA label with custom sender name', () => {
      render(<Message role="assistant" content="Test" senderName="GPT-4" />);
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'GPT-4 message');
    });

    it('timestamp has proper datetime attribute', () => {
      const timestamp = new Date('2024-01-01T12:00:00Z');
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByRole('time')).toHaveAttribute('datetime', '2024-01-01T12:00:00.000Z');
    });

    it('timestamp has aria-label', () => {
      const timestamp = new Date();
      render(<Message role="user" content="Test" timestamp={timestamp} />);
      expect(screen.getByRole('time')).toHaveAttribute('aria-label', 'Message timestamp');
    });

    it('avatar has alt text when URL is provided', () => {
      render(<Message role="user" content="Test" avatarUrl="/avatar.png" />);
      const img = document.querySelector('[data-slot="avatar-image"]');
      expect(img).toHaveAttribute('alt', 'You');
    });

    it('avatar has alt text with custom sender name', () => {
      render(<Message role="assistant" content="Test" avatarUrl="/ai.png" senderName="Claude" />);
      const img = document.querySelector('[data-slot="avatar-image"]');
      expect(img).toHaveAttribute('alt', 'Claude');
    });
  });

  describe('Content Formatting', () => {
    it('preserves whitespace in content', () => {
      render(<Message role="user" content="Line 1\nLine 2\nLine 3" />);
      const paragraph = screen.getByText(/Line 1/);
      expect(paragraph).toHaveClass('whitespace-pre-wrap');
    });

    it('handles long content with word breaking', () => {
      const longContent = 'a'.repeat(200);
      render(<Message role="user" content={longContent} />);
      const bubble = screen.getByText(longContent).parentElement;
      expect(bubble).toHaveClass('break-words');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      render(<Message role="user" content="" />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      const content = '<script>alert("xss")</script>';
      render(<Message role="user" content={content} />);
      expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('passes through additional HTML attributes', () => {
      render(<Message role="user" content="Test" data-testid="custom-message" />);
      expect(screen.getByTestId('custom-message')).toBeInTheDocument();
    });
  });
});
