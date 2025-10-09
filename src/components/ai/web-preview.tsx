'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { AIComponentProps } from './ai-types';

/**
 * Props for the WebPreview component
 */
export interface WebPreviewProps extends AIComponentProps {
  /** The URL or HTML content to display in the preview */
  src?: string;
  /** HTML content to display (alternative to src) */
  html?: string;
  /** Title for accessibility */
  title?: string;
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether to enable fullscreen mode */
  fullscreen?: boolean;
  /** Callback when fullscreen state changes */
  onFullscreenChange?: (fullscreen: boolean) => void;
  /** Whether to show the toolbar with controls */
  showToolbar?: boolean;
  /** Callback when the iframe loads */
  onLoad?: () => void;
  /** Callback when the iframe fails to load */
  onError?: () => void;
  /** Custom sandbox attributes (defaults to secure settings) */
  sandbox?: string;
  /** Height of the preview (CSS value) */
  height?: string;
  /** Width of the preview (CSS value) */
  width?: string;
  /** Whether to allow fullscreen */
  allowFullscreen?: boolean;
  /** Additional iframe attributes */
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

/**
 * WebPreview component for displaying AI-generated web content
 *
 * This component provides a secure iframe-based preview of web content with
 * loading states, fullscreen support, and proper security sandboxing.
 *
 * @example
 * ```tsx
 * <WebPreview
 *   src="https://example.com"
 *   title="Preview"
 *   loading={false}
 *   showToolbar={true}
 *   allowFullscreen={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <WebPreview
 *   html="<h1>Hello World</h1>"
 *   title="HTML Preview"
 * />
 * ```
 */
export const WebPreview = React.forwardRef<HTMLDivElement, WebPreviewProps>(
  (
    {
      src,
      html,
      title = 'Web Preview',
      loading = false,
      fullscreen: controlledFullscreen,
      onFullscreenChange,
      showToolbar = true,
      onLoad,
      onError,
      sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation',
      height = '600px',
      width = '100%',
      allowFullscreen = true,
      iframeProps,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(loading);
    const [isFullscreen, setIsFullscreen] = React.useState(controlledFullscreen ?? false);
    const [hasError, setHasError] = React.useState(false);
    const [key, setKey] = React.useState(0);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Sync controlled fullscreen state
    React.useEffect(() => {
      if (controlledFullscreen !== undefined) {
        setIsFullscreen(controlledFullscreen);
      }
    }, [controlledFullscreen]);

    // Reset loading state when src or html changes
    React.useEffect(() => {
      setIsLoading(true);
      setHasError(false);
    }, [src, html]);

    const handleLoad = React.useCallback(() => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    }, [onLoad]);

    const handleError = React.useCallback(() => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    }, [onError]);

    const toggleFullscreen = React.useCallback(() => {
      const newFullscreen = !isFullscreen;
      setIsFullscreen(newFullscreen);
      onFullscreenChange?.(newFullscreen);

      if (newFullscreen && containerRef.current) {
        // Request fullscreen API if available
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {
            // Fallback to CSS fullscreen if API fails
          });
        }
      } else if (!newFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {
          // Handle error silently
        });
      }
    }, [isFullscreen, onFullscreenChange]);

    const handleRefresh = React.useCallback(() => {
      setIsLoading(true);
      setHasError(false);
      setKey((prev) => prev + 1);
    }, []);

    // Handle escape key to exit fullscreen
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isFullscreen) {
          setIsFullscreen(false);
          onFullscreenChange?.(false);
        }
      };

      if (isFullscreen) {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }
    }, [isFullscreen, onFullscreenChange]);

    // Listen for fullscreen changes
    React.useEffect(() => {
      const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = !!document.fullscreenElement;
        if (isCurrentlyFullscreen !== isFullscreen) {
          setIsFullscreen(isCurrentlyFullscreen);
          onFullscreenChange?.(isCurrentlyFullscreen);
        }
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isFullscreen, onFullscreenChange]);

    // Generate srcdoc content if html is provided
    const srcdoc = React.useMemo(() => {
      if (!html) return undefined;
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  ${html}
</body>
</html>`;
    }, [html, title]);

    return (
      <div
        ref={ref}
        data-slot="web-preview"
        className={cn(
          'relative flex flex-col rounded-lg border bg-background overflow-hidden',
          isFullscreen && 'fixed inset-0 z-50 rounded-none w-screen h-screen',
          className
        )}
        style={{
          ...style,
          ...(isFullscreen ? {} : { width, height }),
        }}
        {...props}
      >
        {showToolbar && (
          <div
            data-slot="web-preview-toolbar"
            className="flex items-center justify-between gap-2 border-b bg-muted/50 px-3 py-2"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" title={title}>
                {title}
              </p>
              {src && (
                <p className="text-xs text-muted-foreground truncate" title={src}>
                  {src}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                aria-label="Refresh preview"
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
              </Button>
              {allowFullscreen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="h-8 w-8 p-0"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          data-slot="web-preview-content"
          className="relative flex-1 bg-background"
        >
          {isLoading && (
            <div
              data-slot="web-preview-loading"
              className="absolute inset-0 z-10 flex items-center justify-center bg-background"
              role="status"
              aria-label="Loading preview"
            >
              <div className="flex flex-col items-center gap-3">
                <Spinner className="h-8 w-8" />
                <p className="text-sm text-muted-foreground">Loading preview...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div
              data-slot="web-preview-error"
              className="absolute inset-0 z-10 flex items-center justify-center bg-background"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex flex-col items-center gap-3 text-center p-6">
                <div className="rounded-full bg-destructive/10 p-3">
                  <svg
                    className="h-6 w-6 text-destructive"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Failed to load preview</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    The content could not be displayed
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          <iframe
            key={key}
            ref={iframeRef}
            src={srcdoc ? undefined : src}
            srcDoc={srcdoc}
            title={title}
            sandbox={sandbox}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full border-0"
            data-slot="web-preview-iframe"
            aria-label={title}
            {...iframeProps}
          />
        </div>
      </div>
    );
  }
);

WebPreview.displayName = 'WebPreview';
