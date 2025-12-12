import * as React from 'react';
import { vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useTheme } from 'next-themes';

import { CodeBlock } from '../code-block';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

// Mock shiki
vi.mock('shiki', () => ({
  codeToHtml: vi.fn((code: string) => {
    return Promise.resolve(`<pre><code>${code}</code></pre>`);
  }),
}));

import { codeToHtml } from 'shiki';

// Mock the useCopyToClipboard hook
const mockCopy = vi.fn();
const mockReset = vi.fn();

vi.mock('../../../hooks/use-copy-to-clipboard', () => ({
  useCopyToClipboard: vi.fn(() => ({
    copiedText: null,
    isCopied: false,
    error: null,
    copy: mockCopy,
    reset: mockReset,
  })),
}));

import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';

describe('CodeBlock', () => {
  const mockUseTheme = useTheme as MockedFunction<typeof useTheme>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
    });
    mockCopy.mockResolvedValue(undefined);
  });

  describe('Basic Rendering', () => {
    it('renders code content', async () => {
      render(<CodeBlock code="const greeting = 'Hello';" language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText(/const greeting = 'Hello';/)).toBeInTheDocument();
      });
    });

    it('renders with custom className', async () => {
      const { container } = render(
        <CodeBlock code="test" language="javascript" className="custom-class" />
      );

      await waitFor(() => {
        const codeBlock = container.querySelector('.ai-code-block');
        expect(codeBlock).toHaveClass('custom-class');
      });
    });

    it('displays loading state initially', () => {
      render(<CodeBlock code="test" language="javascript" />);

      // Check for loading skeleton
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    it('renders without header when no filename or language display', async () => {
      render(
        <CodeBlock code="test" language="javascript" showLanguage={false} showCopyButton={false} />
      );

      await waitFor(() => {
        expect(screen.queryByText('javascript')).not.toBeInTheDocument();
      });
    });
  });

  describe('Language Display', () => {
    it('displays language label when showLanguage is true', async () => {
      render(<CodeBlock code="test" language="typescript" showLanguage={true} />);

      await waitFor(() => {
        // Language is uppercased in the component
        expect(screen.getByText(/typescript/i)).toBeInTheDocument();
      });
    });

    it('hides language label when showLanguage is false', async () => {
      render(<CodeBlock code="test" language="typescript" showLanguage={false} />);

      await waitFor(() => {
        expect(screen.queryByText('TYPESCRIPT')).not.toBeInTheDocument();
      });
    });

    it('displays filename when provided', async () => {
      render(<CodeBlock code="test" language="javascript" filename="test.js" />);

      await waitFor(() => {
        expect(screen.getByText('test.js')).toBeInTheDocument();
      });
    });

    it('does not display language when filename is present', async () => {
      render(
        <CodeBlock code="test" language="javascript" filename="test.js" showLanguage={true} />
      );

      await waitFor(() => {
        expect(screen.getByText('test.js')).toBeInTheDocument();
        expect(screen.queryByText('JAVASCRIPT')).not.toBeInTheDocument();
      });
    });
  });

  describe('Copy Functionality', () => {
    it('renders copy button when showCopyButton is true', async () => {
      render(<CodeBlock code="test code" language="javascript" showCopyButton={true} />);

      await waitFor(() => {
        const copyButton = screen.getAllByLabelText('Copy code to clipboard')[0];
        expect(copyButton).toBeInTheDocument();
      });
    });

    it('hides copy button when showCopyButton is false', async () => {
      render(<CodeBlock code="test code" language="javascript" showCopyButton={false} />);

      await waitFor(() => {
        expect(screen.queryByLabelText('Copy code to clipboard')).not.toBeInTheDocument();
      });
    });

    it('copies code to clipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      const testCode = 'const test = "hello";';

      render(<CodeBlock code={testCode} language="javascript" showCopyButton={true} />);

      await waitFor(() => {
        expect(screen.getByText(/const test/)).toBeInTheDocument();
      });

      const copyButton = screen.getAllByLabelText('Copy code to clipboard')[0];
      await user.click(copyButton);

      expect(mockCopy).toHaveBeenCalledWith(testCode);
    });

    it('calls onCopy callback when copy is successful', async () => {
      const user = userEvent.setup();
      const onCopy = vi.fn();

      render(<CodeBlock code="test" language="javascript" onCopy={onCopy} />);

      await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
      });

      const copyButton = screen.getAllByLabelText('Copy code to clipboard')[0];
      await user.click(copyButton);

      expect(onCopy).toHaveBeenCalled();
    });

    it('shows check icon when code is copied', async () => {
      // Mock isCopied state
      vi.mocked(useCopyToClipboard).mockReturnValue({
        copiedText: 'test',
        isCopied: true,
        error: null,
        copy: mockCopy,
        reset: mockReset,
      });

      const { rerender } = render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
      });

      rerender(<CodeBlock code="test" language="javascript" />);

      const copiedLabel = screen.getAllByLabelText('Copied to clipboard')[0];
      expect(copiedLabel).toBeInTheDocument();
    });
  });

  describe('Keyboard Support', () => {
    it('supports copy via Ctrl+C when focused', async () => {
      const user = userEvent.setup();
      const testCode = 'console.log("test");';

      render(<CodeBlock code={testCode} language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText(/console.log/)).toBeInTheDocument();
      });

      const codeRegion = screen.getByRole('region');
      codeRegion.focus();

      await user.keyboard('{Control>}c{/Control}');

      expect(mockCopy).toHaveBeenCalledWith(testCode);
    });

    it('supports copy via Cmd+C (Mac) when focused', async () => {
      const user = userEvent.setup();
      const testCode = 'console.log("test");';

      render(<CodeBlock code={testCode} language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText(/console.log/)).toBeInTheDocument();
      });

      const codeRegion = screen.getByRole('region');
      codeRegion.focus();

      await user.keyboard('{Meta>}c{/Meta}');

      expect(mockCopy).toHaveBeenCalledWith(testCode);
    });
  });

  describe('Theme Support', () => {
    it('uses light theme when resolvedTheme is light', async () => {

      render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'github-light',
          })
        );
      });
    });

    it('uses dark theme when resolvedTheme is dark', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: vi.fn(),
        resolvedTheme: 'dark',
        systemTheme: 'dark',
        themes: ['light', 'dark'],
      });


      render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'github-dark',
          })
        );
      });
    });

    it('uses custom light theme when provided', async () => {

      render(<CodeBlock code="test" language="javascript" lightTheme="nord" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'nord',
          })
        );
      });
    });

    it('uses custom dark theme when provided', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: vi.fn(),
        resolvedTheme: 'dark',
        systemTheme: 'dark',
        themes: ['light', 'dark'],
      });

      render(<CodeBlock code="test" language="javascript" darkTheme="dracula" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'dracula',
          })
        );
      });
    });
  });

  describe('Line Numbers', () => {
    it('applies line numbers class when showLineNumbers is true', async () => {
      const { container } = render(
        <CodeBlock code="line 1\nline 2" language="javascript" showLineNumbers={true} />
      );

      await waitFor(() => {
        const codeContainer = container.querySelector('.code-with-line-numbers');
        expect(codeContainer).toBeInTheDocument();
      });
    });

    it('does not apply line numbers class when showLineNumbers is false', async () => {
      const { container } = render(
        <CodeBlock code="line 1\nline 2" language="javascript" showLineNumbers={false} />
      );

      await waitFor(() => {
        const codeContainer = container.querySelector('.code-with-line-numbers');
        expect(codeContainer).not.toBeInTheDocument();
      });
    });
  });

  describe('Line Highlighting', () => {
    it('passes highlight decorations to shiki', async () => {
      const code = 'line 1\nline 2\nline 3';
      const highlightLines = [1, 3];

      render(<CodeBlock code={code} language="javascript" highlightLines={highlightLines} />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          code,
          expect.objectContaining({
            decorations: expect.arrayContaining([
              expect.objectContaining({
                start: { line: 0, character: 0 },
                end: { line: 0, character: 6 },
                properties: { class: 'highlighted-line' },
              }),
              expect.objectContaining({
                start: { line: 2, character: 0 },
                end: { line: 2, character: 6 },
                properties: { class: 'highlighted-line' },
              }),
            ]),
          })
        );
      });
    });

    it('handles empty highlightLines array', async () => {

      render(<CodeBlock code="test" language="javascript" highlightLines={[]} />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            decorations: [],
          })
        );
      });
    });
  });

  describe('Max Height', () => {
    it('applies maxHeight style when provided', async () => {
      const { container } = render(
        <CodeBlock code="test" language="javascript" maxHeight="200px" />
      );

      await waitFor(() => {
        const codeContainer = container.querySelector('[role="region"]');
        expect(codeContainer).toHaveStyle({ maxHeight: '200px' });
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', async () => {
      render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        const region = screen.getByRole('region');
        expect(region).toHaveAttribute('aria-label', 'Code block in javascript');
      });
    });

    it('has proper ARIA labels without language', async () => {
      render(<CodeBlock code="test" />);

      await waitFor(() => {
        const region = screen.getByRole('region');
        // Default language is 'plaintext' so it will be included
        expect(region).toHaveAttribute('aria-label', 'Code block in plaintext');
      });
    });

    it('is keyboard focusable', async () => {
      render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        const region = screen.getByRole('region');
        expect(region).toHaveAttribute('tabIndex', '0');
      });
    });

    it('has proper ARIA label for copy button', async () => {
      // Reset mock to initial state
      vi.mocked(useCopyToClipboard).mockReturnValue({
        copiedText: null,
        isCopied: false,
        error: null,
        copy: mockCopy,
        reset: mockReset,
      });

      render(<CodeBlock code="test" language="javascript" showCopyButton={true} />);

      await waitFor(() => {
        const copyButtons = screen.queryAllByLabelText(/copy|copied/i);
        expect(copyButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('falls back to plain text when highlighting fails', async () => {
      vi.mocked(codeToHtml).mockRejectedValueOnce(new Error('Highlighting failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      const testCode = '<div>Test</div>';

      render(<CodeBlock code={testCode} language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText(/Test/)).toBeInTheDocument();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to highlight code:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('escapes HTML in fallback mode', async () => {
      vi.mocked(codeToHtml).mockRejectedValueOnce(new Error('Highlighting failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      const testCode = '<script>alert("xss")</script>';

      const { container } = render(<CodeBlock code={testCode} language="javascript" />);

      await waitFor(() => {
        const html = container.innerHTML;
        expect(html).toContain('&lt;script&gt;');
        expect(html).not.toContain('<script>');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Component Lifecycle', () => {
    it('cleans up on unmount', async () => {
      const { unmount } = render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
      });

      unmount();
      // No errors should occur
    });

    it('updates when code changes', async () => {
      const { rerender } = render(<CodeBlock code="first" language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText('first')).toBeInTheDocument();
      });

      rerender(<CodeBlock code="second" language="javascript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'second',
          expect.objectContaining({
            lang: 'javascript',
          })
        );
      });
    });

    it('updates when language changes', async () => {
      const { rerender } = render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
      });

      rerender(<CodeBlock code="test" language="typescript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            lang: 'typescript',
          })
        );
      });
    });

    it('updates when theme changes', async () => {

      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        resolvedTheme: 'light',
        systemTheme: 'light',
        themes: ['light', 'dark'],
      });

      const { rerender } = render(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'github-light',
          })
        );
      });

      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: vi.fn(),
        resolvedTheme: 'dark',
        systemTheme: 'dark',
        themes: ['light', 'dark'],
      });

      rerender(<CodeBlock code="test" language="javascript" />);

      await waitFor(() => {
        expect(codeToHtml).toHaveBeenCalledWith(
          'test',
          expect.objectContaining({
            theme: 'github-dark',
          })
        );
      });
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to container div', async () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<CodeBlock ref={ref} code="test" language="javascript" />);

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass('ai-code-block');
      });
    });
  });
});
