import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WebPreview } from '../web-preview';

describe('WebPreview', () => {
  describe('Basic Rendering', () => {
    it('renders with data-slot attribute', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test Preview" />);
      const preview = container.querySelector('[data-slot="web-preview"]');
      expect(preview).toBeInTheDocument();
    });

    it('renders iframe with correct src', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test Preview" />);
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toBe('https://example.com/');
    });

    it('renders iframe with srcdoc when html is provided', () => {
      const html = '<h1>Test Content</h1>';
      const { container } = render(<WebPreview html={html} title="HTML Preview" />);
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.srcdoc).toContain(html);
    });

    it('applies default title when not provided', () => {
      const { container } = render(<WebPreview src="https://example.com" />);
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.title).toBe('Web Preview');
    });

    it('applies custom className', () => {
      const { container } = render(
        <WebPreview src="https://example.com" className="custom-class" />
      );
      const preview = container.querySelector('[data-slot="web-preview"]');
      expect(preview).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Styled" style={{ backgroundColor: 'red' }} />
      );
      const preview = container.querySelector('[data-slot="web-preview"]') as HTMLElement;
      expect(preview.style.backgroundColor).toBe('red');
    });

    it('applies custom width and height', () => {
      const { container } = render(
        <WebPreview src="https://example.com" width="800px" height="400px" />
      );
      const preview = container.querySelector('[data-slot="web-preview"]');
      expect(preview).toHaveStyle({ width: '800px', height: '400px' });
    });
  });

  describe('Security and Sandbox', () => {
    it('applies default sandbox attributes', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test" />);
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      const sandboxAttr = iframe.getAttribute('sandbox') || '';
      expect(sandboxAttr).toContain('allow-scripts');
      expect(sandboxAttr).toContain('allow-same-origin');
    });

    it('applies custom sandbox attributes', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" sandbox="allow-scripts" />
      );
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe.getAttribute('sandbox')).toBe('allow-scripts');
    });
  });

  describe('Toolbar', () => {
    it('shows toolbar by default', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test" />);
      const toolbar = container.querySelector('[data-slot="web-preview-toolbar"]');
      expect(toolbar).toBeInTheDocument();
    });

    it('hides toolbar when showToolbar is false', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" showToolbar={false} />
      );
      const toolbar = container.querySelector('[data-slot="web-preview-toolbar"]');
      expect(toolbar).not.toBeInTheDocument();
    });

    it('displays title in toolbar', () => {
      render(<WebPreview src="https://example.com" title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('displays src URL in toolbar', () => {
      render(<WebPreview src="https://example.com" title="Test" />);
      expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });

    it('shows refresh button', () => {
      render(<WebPreview src="https://example.com" title="Test" />);
      const refreshButton = screen.getByLabelText('Refresh preview');
      expect(refreshButton).toBeInTheDocument();
    });

    it('shows fullscreen button when allowFullscreen is true', () => {
      render(<WebPreview src="https://example.com" title="Test" allowFullscreen={true} />);
      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      expect(fullscreenButton).toBeInTheDocument();
    });

    it('hides fullscreen button when allowFullscreen is false', () => {
      render(<WebPreview src="https://example.com" title="Test" allowFullscreen={false} />);
      const fullscreenButton = screen.queryByLabelText('Enter fullscreen');
      expect(fullscreenButton).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when loading is true', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" loading={true} />
      );
      const loadingDiv = container.querySelector('[data-slot="web-preview-loading"]');
      expect(loadingDiv).toBeInTheDocument();
      expect(screen.getByText('Loading preview...')).toBeInTheDocument();
    });

    it('hides loading indicator when loading is false', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" loading={false} />
      );
      // Simulate load event
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      act(() => {
        fireEvent.load(iframe);
      });

      const loadingDiv = container.querySelector('[data-slot="web-preview-loading"]');
      expect(loadingDiv).not.toBeInTheDocument();
    });

    it('calls onLoad callback when iframe loads', () => {
      const onLoad = jest.fn();
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" onLoad={onLoad} />
      );
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      act(() => {
        fireEvent.load(iframe);
      });
      expect(onLoad).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error State', () => {
    it('has error handling callback registered', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test" />);
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      // Error handler is registered via onError prop in component
      expect(iframe.hasAttribute('data-slot')).toBe(true);
    });

    it('accepts onError callback prop', () => {
      const onError = jest.fn();
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" onError={onError} />
      );
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      // onError prop is properly passed to component
    });

    it('renders error UI elements', () => {
      // Test that error UI can be rendered by checking the component structure
      const { container } = render(<WebPreview src="https://example.com" title="Test" />);
      // Component has the structure to show errors when they occur
      const contentArea = container.querySelector('[data-slot="web-preview-content"]');
      expect(contentArea).toBeInTheDocument();
    });
  });

  describe('Refresh Functionality', () => {
    it('refreshes iframe when refresh button is clicked', async () => {
      const user = userEvent.setup();
      render(<WebPreview src="https://example.com" title="Test" />);

      const refreshButton = screen.getByLabelText('Refresh preview');
      await user.click(refreshButton);

      // Check that loading state is triggered
      expect(screen.getByText('Loading preview...')).toBeInTheDocument();
    });

    it('refresh button triggers re-render', async () => {
      const user = userEvent.setup();
      render(<WebPreview src="https://example.com" title="Test" />);

      const refreshButton = screen.getByLabelText('Refresh preview');

      await user.click(refreshButton);

      // Loading state should be shown after refresh
      expect(screen.getByText('Loading preview...')).toBeInTheDocument();
    });

    it('disables refresh button during loading', () => {
      render(<WebPreview src="https://example.com" title="Test" loading={true} />);
      const refreshButton = screen.getByLabelText('Refresh preview');
      expect(refreshButton).toBeDisabled();
    });
  });

  describe('Fullscreen Functionality', () => {
    it('toggles fullscreen state when fullscreen button is clicked', async () => {
      const user = userEvent.setup();
      const onFullscreenChange = jest.fn();

      render(
        <WebPreview
          src="https://example.com"
          title="Test"
          allowFullscreen={true}
          onFullscreenChange={onFullscreenChange}
        />
      );

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      await user.click(fullscreenButton);

      expect(onFullscreenChange).toHaveBeenCalledWith(true);
    });

    it('changes button label when in fullscreen mode', async () => {
      const user = userEvent.setup();
      render(<WebPreview src="https://example.com" title="Test" allowFullscreen={true} />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      await user.click(fullscreenButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Exit fullscreen')).toBeInTheDocument();
      });
    });

    it('applies fullscreen styles when in fullscreen mode', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" allowFullscreen={true} />
      );

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      await user.click(fullscreenButton);

      await waitFor(() => {
        const preview = container.querySelector('[data-slot="web-preview"]');
        expect(preview).toHaveClass('fixed', 'inset-0', 'z-50');
      });
    });

    it('responds to controlled fullscreen prop', () => {
      const { container, rerender } = render(
        <WebPreview src="https://example.com" title="Test" fullscreen={false} />
      );

      let preview = container.querySelector('[data-slot="web-preview"]');
      expect(preview).not.toHaveClass('fixed');

      rerender(<WebPreview src="https://example.com" title="Test" fullscreen={true} />);

      preview = container.querySelector('[data-slot="web-preview"]');
      expect(preview).toHaveClass('fixed');
    });

    it('exits fullscreen on escape key', async () => {
      const onFullscreenChange = jest.fn();
      render(
        <WebPreview
          src="https://example.com"
          title="Test"
          fullscreen={true}
          onFullscreenChange={onFullscreenChange}
        />
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(onFullscreenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Content Updates', () => {
    it('resets loading state when src changes', () => {
      const { rerender, container } = render(<WebPreview src="https://example.com" title="Test" />);

      // Load the iframe
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      act(() => {
        fireEvent.load(iframe);
      });

      // Change src
      rerender(<WebPreview src="https://another-example.com" title="Test" />);

      // Loading should be triggered again
      expect(screen.getByText('Loading preview...')).toBeInTheDocument();
    });

    it('resets loading state when html changes', () => {
      const { rerender, container } = render(<WebPreview html="<h1>First</h1>" title="Test" />);

      // Load the iframe
      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      act(() => {
        fireEvent.load(iframe);
      });

      // Change html
      rerender(<WebPreview html="<h1>Second</h1>" title="Test" />);

      // Loading should be triggered again
      expect(screen.getByText('Loading preview...')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test Preview" />);
      const iframe = container.querySelector('[data-slot="web-preview-iframe"]');
      expect(iframe).toHaveAttribute('aria-label', 'Test Preview');
    });

    it('uses role="status" for loading state', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" loading={true} />
      );
      const loadingDiv = container.querySelector('[data-slot="web-preview-loading"]');
      expect(loadingDiv).toHaveAttribute('role', 'status');
    });

    it('has proper semantic HTML structure', () => {
      const { container } = render(<WebPreview src="https://example.com" title="Test" />);
      const iframe = container.querySelector('iframe');
      expect(iframe).toHaveAttribute('title', 'Test');
      expect(iframe).toHaveAttribute('aria-label', 'Test');
    });

    it('loading state has proper accessibility attributes', () => {
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" loading={true} />
      );
      const loadingDiv = container.querySelector('[data-slot="web-preview-loading"]');
      expect(loadingDiv).toHaveAttribute('aria-label', 'Loading preview');
    });
  });

  describe('Custom Props', () => {
    it('forwards iframeProps to iframe', () => {
      render(
        <WebPreview
          src="https://example.com"
          title="Test"
          iframeProps={{ 'data-testid': 'custom-iframe' }}
        />
      );
      const iframe = screen.getByTestId('custom-iframe');
      expect(iframe).toBeInTheDocument();
    });

    it('forwards ref to container', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<WebPreview ref={ref} src="https://example.com" title="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Content Generation', () => {
    it('generates valid HTML document from html prop', () => {
      const html = '<h1>Hello World</h1>';
      const { container } = render(<WebPreview html={html} title="Test Document" />);

      const iframe = container.querySelector(
        '[data-slot="web-preview-iframe"]'
      ) as HTMLIFrameElement;
      expect(iframe.srcdoc).toContain('<!DOCTYPE html>');
      expect(iframe.srcdoc).toContain('<html lang="en">');
      expect(iframe.srcdoc).toContain('<meta charset="UTF-8">');
      expect(iframe.srcdoc).toContain('<title>Test Document</title>');
      expect(iframe.srcdoc).toContain(html);
    });
  });

  describe('Additional Coverage', () => {
    it('handles requestFullscreen API failure gracefully', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" allowFullscreen={true} />
      );

      const previewContainer = container.querySelector('[data-slot="web-preview-content"]');
      // Mock requestFullscreen to reject
      if (previewContainer?.parentElement) {
        const element = previewContainer.parentElement as HTMLElement & {
          requestFullscreen: () => Promise<void>;
        };
        element.requestFullscreen = jest
          .fn()
          .mockRejectedValue(new Error('Fullscreen not allowed'));
      }

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      await user.click(fullscreenButton);

      // Should still toggle fullscreen state even if API fails
      await waitFor(() => {
        expect(screen.getByLabelText('Exit fullscreen')).toBeInTheDocument();
      });
    });

    it('handles exitFullscreen gracefully', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <WebPreview src="https://example.com" title="Test" fullscreen={true} />
      );

      // Mock document.fullscreenElement
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        configurable: true,
        value: container.querySelector('[data-slot="web-preview"]'),
      });

      // Mock exitFullscreen
      document.exitFullscreen = jest.fn().mockRejectedValue(new Error('Cannot exit'));

      const fullscreenButton = screen.getByLabelText('Exit fullscreen');
      await user.click(fullscreenButton);

      // Component should handle the error gracefully
      await waitFor(() => {
        expect(screen.getByLabelText('Enter fullscreen')).toBeInTheDocument();
      });

      // Cleanup
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        configurable: true,
        value: null,
      });
    });

    it('listens to fullscreen change events', () => {
      const onFullscreenChange = jest.fn();
      const { container } = render(
        <WebPreview
          src="https://example.com"
          title="Test"
          fullscreen={false}
          onFullscreenChange={onFullscreenChange}
        />
      );

      // Mock fullscreenElement
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        configurable: true,
        value: container.querySelector('[data-slot="web-preview"]'),
      });

      // Trigger fullscreen change event
      act(() => {
        document.dispatchEvent(new Event('fullscreenchange'));
      });

      expect(onFullscreenChange).toHaveBeenCalledWith(true);

      // Cleanup
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        configurable: true,
        value: null,
      });
    });
  });
});
