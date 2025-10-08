/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from './skeleton';
import { Download, Maximize2, X, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent, DialogTitle } from './dialog';

/**
 * Props for the AIImage component
 */
export interface AIImageProps extends React.ComponentProps<'div'> {
  /** The image source URL */
  src: string;
  /** Alternative text for the image */
  alt: string;
  /** Optional aspect ratio (e.g., '16/9', '1/1', '4/3') */
  aspectRatio?: string;
  /** Whether the image is currently loading */
  isLoading?: boolean;
  /** Error message if image failed to load */
  error?: string | null;
  /** Fallback content when image fails to load */
  fallback?: React.ReactNode;
  /** Whether to show the zoom/preview button */
  showZoom?: boolean;
  /** Whether to show the download button */
  showDownload?: boolean;
  /** Custom filename for downloads */
  downloadFilename?: string;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onImageError?: (error: Error) => void;
  /** Optional caption for the image */
  caption?: string;
  /** Whether to show image controls on hover */
  showControlsOnHover?: boolean;
}

/**
 * AIImage - AI-specific Image component with loading states and error handling
 *
 * @example
 * ```tsx
 * <AIImage
 *   src="https://example.com/ai-generated.jpg"
 *   alt="AI generated artwork"
 *   isLoading={false}
 *   showZoom
 *   showDownload
 *   caption="Generated with DALL-E"
 * />
 * ```
 */
export const AIImage = React.forwardRef<HTMLDivElement, AIImageProps>(
  (
    {
      src,
      alt,
      aspectRatio,
      isLoading = false,
      error = null,
      fallback,
      showZoom = false,
      showDownload = false,
      downloadFilename,
      onLoad,
      onImageError,
      caption,
      showControlsOnHover = true,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState<string | null>(error);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [isZoomOpen, setIsZoomOpen] = React.useState(false);
    const [showControls, setShowControls] = React.useState(!showControlsOnHover);

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(error);
      setImageLoaded(false);
    }, [src, error]);

    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageError(null);
      onLoad?.();
    };

    const handleImageError = () => {
      const errorObj = new Error(`Failed to load image: ${src}`);
      setImageError(errorObj.message);
      onImageError?.(errorObj);
    };

    const handleDownload = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadFilename || `ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Failed to download image:', err);
      }
    };

    const containerStyle = aspectRatio ? { aspectRatio } : undefined;

    // Show loading skeleton
    if (isLoading) {
      return (
        <div
          ref={ref}
          data-slot="ai-image-container"
          className={cn('relative overflow-hidden rounded-lg', className)}
          style={containerStyle}
          {...props}
        >
          <Skeleton className="size-full" />
        </div>
      );
    }

    // Show error state
    if (imageError && !isLoading) {
      return (
        <div
          ref={ref}
          data-slot="ai-image-container"
          className={cn(
            'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-8',
            className
          )}
          style={containerStyle}
          role="img"
          aria-label={alt}
          {...props}
        >
          {fallback || (
            <>
              <AlertCircle className="size-12 text-muted-foreground/50 mb-4" aria-hidden="true" />
              <p className="text-sm font-medium text-muted-foreground mb-1">Failed to load image</p>
              <p className="text-xs text-muted-foreground/75">{imageError}</p>
            </>
          )}
        </div>
      );
    }

    return (
      <>
        <div
          ref={ref}
          data-slot="ai-image-container"
          className={cn('relative overflow-hidden rounded-lg group', className)}
          style={containerStyle}
          onMouseEnter={() => showControlsOnHover && setShowControls(true)}
          onMouseLeave={() => showControlsOnHover && setShowControls(false)}
          {...props}
        >
          {/* Main Image */}
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={cn(
              'size-full object-cover transition-opacity duration-300',
              !imageLoaded && 'opacity-0'
            )}
            data-slot="ai-image"
          />

          {/* Loading state overlay */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0">
              <Skeleton className="size-full" />
            </div>
          )}

          {/* Controls Overlay */}
          {(showZoom || showDownload) && imageLoaded && (
            <div
              className={cn(
                'absolute top-2 right-2 flex gap-2 transition-opacity duration-200',
                showControls ? 'opacity-100' : 'opacity-0'
              )}
              data-slot="ai-image-controls"
            >
              {showZoom && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setIsZoomOpen(true)}
                  aria-label="Zoom image"
                >
                  <Maximize2 className="size-4" />
                </Button>
              )}
              {showDownload && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={handleDownload}
                  aria-label="Download image"
                >
                  <Download className="size-4" />
                </Button>
              )}
            </div>
          )}

          {/* Caption */}
          {caption && imageLoaded && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8"
              data-slot="ai-image-caption"
            >
              <p className="text-sm text-white">{caption}</p>
            </div>
          )}
        </div>

        {/* Zoom Dialog */}
        {showZoom && (
          <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
            <DialogContent
              className="max-w-[95vw] max-h-[95vh] p-0"
              aria-describedby={caption ? 'ai-image-preview-description' : undefined}
            >
              <DialogTitle className="sr-only">Image Preview</DialogTitle>
              <div className="relative size-full flex items-center justify-center bg-background p-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 z-10 rounded-full"
                  onClick={() => setIsZoomOpen(false)}
                  aria-label="Close preview"
                >
                  <X className="size-4" />
                </Button>
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-[90vh] object-contain"
                  data-slot="ai-image-preview"
                />
                {caption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm" id="ai-image-preview-description">
                      {caption}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }
);

AIImage.displayName = 'AIImage';
