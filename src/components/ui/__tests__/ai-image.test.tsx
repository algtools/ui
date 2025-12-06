import React from 'react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIImage } from '../ai-image';

// Mock fetch for download functionality
global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('AIImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<AIImage src="/test-image.jpg" alt="Test image" />);
      const container = screen.getByRole('img', { hidden: true });
      expect(container).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AIImage src="/test.jpg" alt="Test" className="custom-class" />);
      const container = document.querySelector('[data-slot="ai-image-container"]');
      expect(container).toHaveClass('custom-class');
    });

    it('applies aspect ratio style', () => {
      render(<AIImage src="/test.jpg" alt="Test" aspectRatio="16/9" />);
      const container = document.querySelector('[data-slot="ai-image-container"]');
      expect(container).toHaveStyle({ aspectRatio: '16/9' });
    });

    it('renders image with correct src and alt', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test image" />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;
      expect(img).toHaveAttribute('src', '/test.jpg');
      expect(img).toHaveAttribute('alt', 'Test image');
    });
  });

  describe('Loading State', () => {
    it('shows skeleton when isLoading is true', () => {
      render(<AIImage src="/test.jpg" alt="Test" isLoading={true} />);
      const skeleton = document.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('does not show image when loading', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" isLoading={true} />);
      const img = container.querySelector('[data-slot="ai-image"]');
      expect(img).not.toBeInTheDocument();
    });

    it('shows skeleton overlay before image loads', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" />);
      // Before image loads, skeleton overlay should be present
      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error state when error prop is provided', () => {
      render(<AIImage src="/test.jpg" alt="Test" error="Failed to load" />);
      expect(screen.getByText(/Failed to load image/i)).toBeInTheDocument();
    });

    it('shows custom fallback content on error', () => {
      const fallback = <div data-testid="custom-fallback">Custom error</div>;
      render(<AIImage src="/test.jpg" alt="Test" error="Error" fallback={fallback} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });

    it('calls onImageError callback when image fails to load', () => {
      const onImageError = vi.fn();
      const { container } = render(
        <AIImage src="/invalid.jpg" alt="Test" onImageError={onImageError} />
      );
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.error(img);

      expect(onImageError).toHaveBeenCalledWith(expect.any(Error));
    });

    it('displays error message in error state', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.error(img);

      const errorTexts = screen.getAllByText(/Failed to load image/i);
      expect(errorTexts.length).toBeGreaterThan(0);
    });
  });

  describe('Image Loading', () => {
    it('calls onLoad callback when image loads successfully', () => {
      const onLoad = vi.fn();
      const { container } = render(<AIImage src="/test.jpg" alt="Test" onLoad={onLoad} />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      expect(onLoad).toHaveBeenCalled();
    });

    it('removes opacity when image loads', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      expect(img).toHaveClass('opacity-0');

      fireEvent.load(img);

      expect(img).not.toHaveClass('opacity-0');
    });
  });

  describe('Caption', () => {
    it('displays caption when provided and image is loaded', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" caption="Test caption" />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      // Caption should not be visible before image loads
      expect(screen.queryByText('Test caption')).not.toBeInTheDocument();

      fireEvent.load(img);

      // Caption should be visible after image loads
      expect(screen.getByText('Test caption')).toBeInTheDocument();
    });

    it('does not display caption when not provided', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const caption = document.querySelector('[data-slot="ai-image-caption"]');
      expect(caption).not.toBeInTheDocument();
    });
  });

  describe('Zoom Functionality', () => {
    it('shows zoom button when showZoom is true and image is loaded', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showZoom />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const zoomButton = screen.getByLabelText('Zoom image');
      expect(zoomButton).toBeInTheDocument();
    });

    it('does not show zoom button when showZoom is false', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showZoom={false} />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const zoomButton = screen.queryByLabelText('Zoom image');
      expect(zoomButton).not.toBeInTheDocument();
    });

    it('opens zoom dialog when zoom button is clicked', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showZoom />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const zoomButton = screen.getByLabelText('Zoom image');
      fireEvent.click(zoomButton);

      const previewImage = document.querySelector('[data-slot="ai-image-preview"]');
      expect(previewImage).toBeInTheDocument();
    });
  });

  describe('Download Functionality', () => {
    it('shows download button when showDownload is true and image is loaded', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showDownload />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.getByLabelText('Download image');
      expect(downloadButton).toBeInTheDocument();
    });

    it('does not show download button when showDownload is false', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showDownload={false} />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.queryByLabelText('Download image');
      expect(downloadButton).not.toBeInTheDocument();
    });

    it('triggers download when download button is clicked', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/png' });
      (global.fetch as Mock).mockResolvedValue({
        blob: () => Promise.resolve(mockBlob),
      });

      const { container } = render(
        <AIImage src="/test.jpg" alt="Test" showDownload downloadFilename="custom-name.png" />
      );
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.getByLabelText('Download image');
      fireEvent.click(downloadButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/test.jpg');
      });
    });

    it('uses default filename when downloadFilename is not provided', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/png' });
      (global.fetch as Mock).mockResolvedValue({
        blob: () => Promise.resolve(mockBlob),
      });

      // Mock document.createElement and appendChild
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
        remove: vi.fn(),
      } as unknown as HTMLAnchorElement;

      const originalCreateElement = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockLink;
        return originalCreateElement(tag);
      });

      const originalAppendChild = document.body.appendChild.bind(document.body);
      const originalRemoveChild = document.body.removeChild.bind(document.body);
      vi.spyOn(document.body, 'appendChild').mockImplementation((node) => {
        if ((node as HTMLElement).tagName === 'A') return node as unknown as Node;
        return originalAppendChild(node);
      });
      vi.spyOn(document.body, 'removeChild').mockImplementation((node) => {
        if ((node as HTMLElement).tagName === 'A') return node as unknown as Node;
        return originalRemoveChild(node);
      });

      const { container } = render(<AIImage src="/test.jpg" alt="Test" showDownload />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.getByLabelText('Download image');
      fireEvent.click(downloadButton);

      await waitFor(() => {
        expect(mockLink.download).toMatch(/^ai-image-\d+\.png$/);
      });

      // Cleanup
      vi.restoreAllMocks();
    });

    it('handles download errors gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (global.fetch as Mock).mockRejectedValue(new Error('Network error'));

      const { container } = render(<AIImage src="/test.jpg" alt="Test" showDownload />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.getByLabelText('Download image');
      fireEvent.click(downloadButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to download image:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Controls Visibility', () => {
    it('shows controls immediately when showControlsOnHover is false', () => {
      const { container } = render(
        <AIImage src="/test.jpg" alt="Test" showZoom showControlsOnHover={false} />
      );
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const controls = document.querySelector('[data-slot="ai-image-controls"]');
      expect(controls).toHaveClass('opacity-100');
    });

    it('shows controls on hover when showControlsOnHover is true', () => {
      const { container } = render(
        <AIImage src="/test.jpg" alt="Test" showZoom showControlsOnHover={true} />
      );
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const imageContainer = document.querySelector('[data-slot="ai-image-container"]');
      const controls = document.querySelector('[data-slot="ai-image-controls"]');

      // Initially hidden
      expect(controls).toHaveClass('opacity-0');

      // Show on mouse enter
      fireEvent.mouseEnter(imageContainer!);
      expect(controls).toHaveClass('opacity-100');

      // Hide on mouse leave
      fireEvent.mouseLeave(imageContainer!);
      expect(controls).toHaveClass('opacity-0');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<AIImage src="/test.jpg" alt="Accessible image" />);
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('alt', 'Accessible image');
    });

    it('has proper ARIA attributes in error state', () => {
      render(<AIImage src="/test.jpg" alt="Test image" error="Error" />);
      const errorContainer = screen.getByRole('img');
      expect(errorContainer).toHaveAttribute('aria-label', 'Test image');
    });

    it('has aria-label on zoom button', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showZoom />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const zoomButton = screen.getByLabelText('Zoom image');
      expect(zoomButton).toHaveAttribute('aria-label', 'Zoom image');
    });

    it('has aria-label on download button', () => {
      const { container } = render(<AIImage src="/test.jpg" alt="Test" showDownload />);
      const img = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img);

      const downloadButton = screen.getByLabelText('Download image');
      expect(downloadButton).toHaveAttribute('aria-label', 'Download image');
    });
  });

  describe('State Management', () => {
    it('resets error state when src changes', () => {
      const { rerender, container } = render(
        <AIImage src="/test1.jpg" alt="Test" error="Initial error" />
      );

      expect(screen.getByText(/Failed to load image/i)).toBeInTheDocument();

      rerender(<AIImage src="/test2.jpg" alt="Test" error={null} />);

      const img = container.querySelector('[data-slot="ai-image"]');
      expect(img).toBeInTheDocument();
    });

    it('resets loaded state when src changes', () => {
      const { rerender, container } = render(<AIImage src="/test1.jpg" alt="Test" />);
      const img1 = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      fireEvent.load(img1);
      expect(img1).not.toHaveClass('opacity-0');

      rerender(<AIImage src="/test2.jpg" alt="Test" />);
      const img2 = container.querySelector('[data-slot="ai-image"]') as HTMLImageElement;

      // New image should start with opacity-0
      expect(img2).toHaveClass('opacity-0');
    });
  });
});
