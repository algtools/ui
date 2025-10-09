'use client';

import * as React from 'react';

/**
 * Interface representing comprehensive screen information
 */
export interface ScreenInfo {
  /** The width of the screen in pixels */
  width: number;
  /** The height of the screen in pixels */
  height: number;
  /** The available width of the screen (excluding OS taskbars) in pixels */
  availWidth: number;
  /** The available height of the screen (excluding OS taskbars) in pixels */
  availHeight: number;
  /** The color depth of the screen in bits */
  colorDepth: number;
  /** The pixel depth of the screen in bits */
  pixelDepth: number;
  /** The device pixel ratio (pixel density) */
  pixelRatio: number;
  /** The current orientation of the screen */
  orientation: 'portrait' | 'landscape' | 'square';
  /** Whether the screen is in portrait mode */
  isPortrait: boolean;
  /** Whether the screen is in landscape mode */
  isLandscape: boolean;
  /** Whether the device has touch support */
  isTouch: boolean;
}

/**
 * Options for configuring the useScreen hook
 */
export interface UseScreenOptions {
  /**
   * Whether to listen for orientation changes
   * @default true
   */
  listenForChanges?: boolean;
}

/**
 * A custom hook that provides comprehensive screen information including dimensions,
 * color depth, pixel ratio, orientation, and touch support.
 *
 * @param options - Configuration options for the hook
 * @returns Comprehensive screen information
 *
 * @example
 * Basic usage:
 * ```tsx
 * function MyComponent() {
 *   const screen = useScreen();
 *
 *   return (
 *     <div>
 *       <p>Screen: {screen.width} x {screen.height}</p>
 *       <p>Available: {screen.availWidth} x {screen.availHeight}</p>
 *       <p>Pixel Ratio: {screen.pixelRatio}x</p>
 *       <p>Color Depth: {screen.colorDepth} bits</p>
 *       <p>Orientation: {screen.orientation}</p>
 *       <p>Touch Support: {screen.isTouch ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Orientation-based rendering:
 * ```tsx
 * function OrientationAwareComponent() {
 *   const { isPortrait, isLandscape } = useScreen();
 *
 *   return (
 *     <div>
 *       {isPortrait && <PortraitLayout />}
 *       {isLandscape && <LandscapeLayout />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * High DPI detection:
 * ```tsx
 * function ImageComponent() {
 *   const { pixelRatio } = useScreen();
 *
 *   // Use 2x images for high DPI displays
 *   const imageSrc = pixelRatio >= 2 ? 'image@2x.png' : 'image.png';
 *
 *   return <img src={imageSrc} alt="Responsive image" />;
 * }
 * ```
 *
 * @example
 * Touch vs non-touch interfaces:
 * ```tsx
 * function InteractiveComponent() {
 *   const { isTouch } = useScreen();
 *
 *   return (
 *     <button className={isTouch ? 'touch-friendly' : 'mouse-friendly'}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * Without listening for changes:
 * ```tsx
 * function StaticScreenInfo() {
 *   // Get screen info once, don't update on changes
 *   const screen = useScreen({ listenForChanges: false });
 *
 *   return (
 *     <div>
 *       <p>Initial screen size: {screen.width} x {screen.height}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - This hook is SSR-safe and returns default values on the server
 * - The hook listens for orientation changes by default
 * - Event listeners are automatically cleaned up on unmount
 * - Touch support is detected once on mount (doesn't change during runtime)
 * - Pixel ratio changes (zoom) are tracked if listenForChanges is enabled
 */
export function useScreen(options: UseScreenOptions = {}): ScreenInfo {
  const { listenForChanges = true } = options;

  // Helper function to get current screen info
  const getScreenInfo = React.useCallback((): ScreenInfo => {
    // SSR support: return default values on server
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        availWidth: 0,
        availHeight: 0,
        colorDepth: 24,
        pixelDepth: 24,
        pixelRatio: 1,
        orientation: 'landscape',
        isPortrait: false,
        isLandscape: true,
        isTouch: false,
      };
    }

    const { screen } = window;
    const width = screen.width;
    const height = screen.height;
    const pixelRatio = window.devicePixelRatio || 1;

    // Determine orientation
    let orientation: 'portrait' | 'landscape' | 'square';
    if (width > height) {
      orientation = 'landscape';
    } else if (width < height) {
      orientation = 'portrait';
    } else {
      orientation = 'square';
    }

    // Detect touch support
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).msMaxTouchPoints > 0;

    return {
      width,
      height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      pixelRatio,
      orientation,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
      isTouch,
    };
  }, []);

  const [screenInfo, setScreenInfo] = React.useState<ScreenInfo>(getScreenInfo);

  React.useEffect(() => {
    // SSR support: do nothing on server
    if (typeof window === 'undefined' || !listenForChanges) {
      return;
    }

    // Handler for orientation and resize changes
    const handleChange = () => {
      setScreenInfo(getScreenInfo());
    };

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleChange);
    // Also listen for resize as a fallback (some browsers don't support orientationchange)
    window.addEventListener('resize', handleChange);

    // Set initial value (in case it changed between mount and effect)
    setScreenInfo(getScreenInfo());

    // Cleanup: remove event listeners on unmount
    return () => {
      window.removeEventListener('orientationchange', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, [getScreenInfo, listenForChanges]);

  return screenInfo;
}
