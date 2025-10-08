import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Response } from '../response';

// Mock the markdown libraries
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => (
    <div data-testid="react-markdown">{children}</div>
  ),
}));

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('rehype-highlight', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Response', () => {
  describe('Basic Rendering', () => {
    it('should render simple text content', () => {
      render(<Response content="Hello, world!" />);
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });

    it('should render markdown content', () => {
      const content = '# Heading\n\nThis is **bold** and *italic* text.';
      render(<Response content={content} />);

      // With mocked ReactMarkdown, content is rendered as-is
      expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Heading/);
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/This is/);
    });

    it('should render with custom className', () => {
      const { container } = render(<Response content="Test content" className="custom-class" />);
      const responseElement = container.querySelector('.ai-markdown-content');
      expect(responseElement).toHaveClass('custom-class');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Response ref={ref} content="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should apply ARIA attributes correctly', () => {
      const { container } = render(<Response content="Test" ariaLabel="Custom label" />);
      const responseElement = container.querySelector('.ai-markdown-content');

      expect(responseElement).toHaveAttribute('role', 'log');
      expect(responseElement).toHaveAttribute('aria-live', 'polite');
      expect(responseElement).toHaveAttribute('aria-label', 'Custom label');
      expect(responseElement).toHaveAttribute('aria-busy', 'false');
    });
  });

  describe('Streaming Support', () => {
    it('should show cursor when streaming is active', () => {
      const { container } = render(<Response content="Streaming text" isStreaming={true} />);

      expect(container.textContent).toContain('▋');
    });

    it('should not show cursor when streaming is inactive', () => {
      const { container } = render(<Response content="Complete text" isStreaming={false} />);

      expect(container.textContent).not.toContain('▋');
    });

    it('should use custom cursor character', () => {
      const { container } = render(<Response content="Text" isStreaming={true} cursor="|" />);

      expect(container.textContent).toContain('|');
    });

    it('should hide cursor when showCursor is false', () => {
      const { container } = render(
        <Response content="Text" isStreaming={true} showCursor={false} />
      );

      expect(container.textContent).not.toContain('▋');
    });

    it('should render custom cursor element', () => {
      render(
        <Response
          content="Text"
          isStreaming={true}
          cursor={<span data-testid="custom-cursor">●</span>}
        />
      );

      expect(screen.getByTestId('custom-cursor')).toBeInTheDocument();
    });

    it('should set aria-busy to true when streaming', () => {
      const { container } = render(<Response content="Streaming" isStreaming={true} />);
      const responseElement = container.querySelector('.ai-markdown-content');
      expect(responseElement).toHaveAttribute('aria-busy', 'true');
    });

    it('should render with streamingState prop', () => {
      const mockCancel = jest.fn();
      const { container } = render(<Response content="Text" isStreaming={true} />);

      // Component should render without errors
      expect(container.textContent).toContain('Text');
      expect(container.textContent).toContain('▋');
    });
  });

  describe('Content Rendering', () => {
    it('should pass markdown content to ReactMarkdown', () => {
      const content = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/H1/);
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/H6/);
    });

    it('should handle list markdown', () => {
      const content = '- Item 1\n- Item 2\n- Item 3';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Item 1/);
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Item 3/);
    });

    it('should handle code block markdown', () => {
      const content = '```javascript\nconst hello = "world";\n```';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/const hello/);
    });

    it('should handle empty content', () => {
      render(<Response content="" />);
      const { container } = render(<Response content="" />);
      expect(container.querySelector('.ai-markdown-content')).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      const content = '< > & " \'';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
    });
  });

  describe('Content Variations', () => {
    it('should handle code blocks', () => {
      const content = '```\ncode\n```';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/code/);
    });

    it('should handle multiple code blocks', () => {
      const content = '```javascript\nconst a = 1;\n```\n\n```python\nb = 2\n```';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/const a/);
    });

    it('should preserve complex formatting', () => {
      const content = '```javascript\nfunction test() {\n  return true;\n}\n```';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/function test/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long content', () => {
      const longContent = 'A '.repeat(1000) + 'test';
      render(<Response content={longContent} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/test/);
    });

    it('should handle content with line breaks', () => {
      const content = 'Line 1\n\nLine 2\n\nLine 3';
      render(<Response content={content} />);

      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Line 1/);
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Line 2/);
      expect(screen.getByTestId('react-markdown')).toHaveTextContent(/Line 3/);
    });

    it('should handle malformed markdown gracefully', () => {
      const content = '# Heading\n**unclosed bold\n[broken link](';
      render(<Response content={content} />);

      // Component should still render without crashing
      expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
    });

    it('should update content when prop changes', () => {
      const { rerender } = render(<Response content="Initial" />);
      expect(screen.getByText(/Initial/)).toBeInTheDocument();

      rerender(<Response content="Updated" />);
      expect(screen.getByText(/Updated/)).toBeInTheDocument();
    });

    it('should handle streaming state changes', () => {
      const { rerender, container } = render(<Response content="Text" isStreaming={true} />);
      expect(container.textContent).toMatch(/Text/);

      rerender(<Response content="Text" isStreaming={false} />);
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA role', () => {
      const { container } = render(<Response content="Test" />);
      expect(container.querySelector('[role="log"]')).toBeInTheDocument();
    });

    it('should have aria-live region for screen readers', () => {
      const { container } = render(<Response content="Test" />);
      expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
    });

    it('should support custom aria-label', () => {
      const { container } = render(<Response content="Test" ariaLabel="Custom response" />);
      expect(container.querySelector('[aria-label="Custom response"]')).toBeInTheDocument();
    });

    it('should indicate busy state during streaming', () => {
      const { container } = render(<Response content="Test" isStreaming={true} />);
      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should pass through custom HTML attributes', () => {
      const { container } = render(
        <Response content="Test" data-testid="custom-response" id="response-1" />
      );

      const element = container.querySelector('#response-1');
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-testid', 'custom-response');
    });

    it('should merge className correctly', () => {
      const { container } = render(
        <Response content="Test" className="extra-class another-class" />
      );

      const element = container.querySelector('.ai-markdown-content');
      expect(element).toHaveClass('ai-markdown-content');
      expect(element).toHaveClass('extra-class');
      expect(element).toHaveClass('another-class');
    });
  });
});
