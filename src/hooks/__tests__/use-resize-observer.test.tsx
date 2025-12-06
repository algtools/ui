import { render, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';
import * as React from 'react';

import { useResizeObserver } from '@/hooks/use-resize-observer';

// Mock ResizeObserver
class MockResizeObserver {
  private callback: ResizeObserverCallback;
  private elements: Element[] = [];
  public static instances: MockResizeObserver[] = [];

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.elements.push(target);
  }

  unobserve(target: Element): void {
    this.elements = this.elements.filter((el) => el !== target);
  }

  disconnect(): void {
    this.elements = [];
  }

  // Helper method to trigger resize
  trigger(entries: ResizeObserverEntry[]): void {
    this.callback(entries, this);
  }

  static reset(): void {
    MockResizeObserver.instances = [];
  }
}

describe('useResizeObserver', () => {
  beforeEach(() => {
    MockResizeObserver.reset();

    // Mock ResizeObserver globally
    global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
    MockResizeObserver.reset();
  });

  describe('initialization', () => {
    test('should return a ref and initial size of {width: 0, height: 0}', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div data-testid="container">
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
            <span data-testid="height">{size.height}</span>
          </div>
        );
      };

      render(<TestComponent />);

      expect(screen.getByTestId('width').textContent).toBe('0');
      expect(screen.getByTestId('height').textContent).toBe('0');
    });

    test('should create ResizeObserver when element is attached', () => {
      const TestComponent = () => {
        const [ref] = useResizeObserver<HTMLDivElement>();
        return <div ref={ref} data-testid="observed" />;
      };

      render(<TestComponent />);

      expect(MockResizeObserver.instances).toHaveLength(1);
    });

    test('should observe the element', () => {
      const TestComponent = () => {
        const [ref] = useResizeObserver<HTMLDivElement>();
        return <div ref={ref} data-testid="observed" />;
      };

      render(<TestComponent />);

      // Element should have been observed
      expect(MockResizeObserver.instances).toHaveLength(1);
    });
  });

  describe('size updates', () => {
    test('should update size when ResizeObserver triggers with borderBoxSize', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div>
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
            <span data-testid="height">{size.height}</span>
          </div>
        );
      };

      const { rerender } = render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      // Trigger resize
      const mockEntry: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        contentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry]);
      rerender(<TestComponent />);

      expect(screen.getByTestId('width').textContent).toBe('100');
      expect(screen.getByTestId('height').textContent).toBe('200');
    });

    test('should update size when ResizeObserver triggers with contentRect fallback', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div>
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
            <span data-testid="height">{size.height}</span>
          </div>
        );
      };

      const { rerender } = render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      const mockEntry: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 300,
          height: 400,
          x: 0,
          y: 0,
          top: 0,
          right: 300,
          bottom: 400,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: undefined as unknown as ReadonlyArray<ResizeObserverSize>,
        contentBoxSize: [
          {
            inlineSize: 300,
            blockSize: 400,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 300,
            blockSize: 400,
          },
        ],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry]);
      rerender(<TestComponent />);

      expect(screen.getByTestId('width').textContent).toBe('300');
      expect(screen.getByTestId('height').textContent).toBe('400');
    });

    test('should handle borderBoxSize as a single object (not array)', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div>
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
            <span data-testid="height">{size.height}</span>
          </div>
        );
      };

      const { rerender } = render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      const mockEntry = {
        target: element,
        contentRect: {
          width: 150,
          height: 250,
          x: 0,
          y: 0,
          top: 0,
          right: 150,
          bottom: 250,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: {
          inlineSize: 150,
          blockSize: 250,
        },
        contentBoxSize: [
          {
            inlineSize: 150,
            blockSize: 250,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 150,
            blockSize: 250,
          },
        ],
      } as unknown as ResizeObserverEntry;

      observer.trigger([mockEntry]);
      rerender(<TestComponent />);

      expect(screen.getByTestId('width').textContent).toBe('150');
      expect(screen.getByTestId('height').textContent).toBe('250');
    });
  });

  describe('callback support', () => {
    test('should call onResize callback when size changes', () => {
      const onResize = vi.fn();

      const TestComponent = () => {
        const [ref] = useResizeObserver<HTMLDivElement>({ onResize });
        return <div ref={ref} data-testid="observed" />;
      };

      render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      const mockEntry: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        contentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry]);

      expect(onResize).toHaveBeenCalledWith({ width: 100, height: 200 });
    });

    test('should not throw when callback is not provided', () => {
      const TestComponent = () => {
        const [ref] = useResizeObserver<HTMLDivElement>();
        return <div ref={ref} data-testid="observed" />;
      };

      render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      const mockEntry: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        contentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
      } as ResizeObserverEntry;

      expect(() => observer.trigger([mockEntry])).not.toThrow();
    });

    test('should use updated callback', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const TestComponent = ({
        onResize,
      }: {
        onResize: (size: { width: number; height: number }) => void;
      }) => {
        const [ref] = useResizeObserver<HTMLDivElement>({ onResize });
        return <div ref={ref} data-testid="observed" />;
      };

      const { rerender } = render(<TestComponent onResize={callback1} />);

      // Change the callback
      rerender(<TestComponent onResize={callback2} />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      const mockEntry: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        contentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
        devicePixelContentBoxSize: [
          {
            inlineSize: 100,
            blockSize: 200,
          },
        ],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry]);

      // Should call the new callback, not the old one
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith({ width: 100, height: 200 });
    });
  });

  describe('cleanup', () => {
    test('should disconnect observer on unmount', () => {
      const TestComponent = () => {
        const [ref] = useResizeObserver<HTMLDivElement>();
        return <div ref={ref} data-testid="observed" />;
      };

      const { unmount } = render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const disconnectSpy = vi.spyOn(observer, 'disconnect');

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    test('should handle unmount when ref is null', () => {
      const TestComponent = () => {
        const [, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div>
            <span data-testid="width">{size.width}</span>
          </div>
        );
      };

      const { unmount } = render(<TestComponent />);

      // Should not throw an error
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('should handle empty entries array', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();
        return (
          <div>
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
          </div>
        );
      };

      render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];

      // Should not throw an error
      expect(() => observer.trigger([])).not.toThrow();
      expect(screen.getByTestId('width').textContent).toBe('0');
    });

    test('should return proper TypeScript types', () => {
      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>();

        // Type checks - these will fail at compile time if types are wrong
        const _width: number = size.width;
        const _height: number = size.height;

        return (
          <div ref={ref} data-testid="observed">
            {_width} {_height}
          </div>
        );
      };

      render(<TestComponent />);
      expect(screen.getByTestId('observed')).toBeInTheDocument();
    });
  });

  describe('integration', () => {
    test('should work with multiple resize events', () => {
      const onResize = vi.fn();

      const TestComponent = () => {
        const [ref, size] = useResizeObserver<HTMLDivElement>({ onResize });
        return (
          <div>
            <div ref={ref} data-testid="observed" />
            <span data-testid="width">{size.width}</span>
            <span data-testid="height">{size.height}</span>
          </div>
        );
      };

      const { rerender } = render(<TestComponent />);

      const observer = MockResizeObserver.instances[0];
      const element = screen.getByTestId('observed');

      // First resize
      const mockEntry1: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [{ inlineSize: 100, blockSize: 200 }],
        contentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
        devicePixelContentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry1]);
      rerender(<TestComponent />);

      expect(onResize).toHaveBeenCalledWith({ width: 100, height: 200 });
      expect(screen.getByTestId('width').textContent).toBe('100');

      // Second resize
      const mockEntry2: ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: 300,
          height: 400,
          x: 0,
          y: 0,
          top: 0,
          right: 300,
          bottom: 400,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [{ inlineSize: 300, blockSize: 400 }],
        contentBoxSize: [{ inlineSize: 300, blockSize: 400 }],
        devicePixelContentBoxSize: [{ inlineSize: 300, blockSize: 400 }],
      } as ResizeObserverEntry;

      observer.trigger([mockEntry2]);
      rerender(<TestComponent />);

      expect(onResize).toHaveBeenCalledWith({ width: 300, height: 400 });
      expect(onResize).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId('width').textContent).toBe('300');
    });

    test('should work with multiple instances independently', () => {
      const onResize1 = vi.fn();
      const onResize2 = vi.fn();

      const TestComponent = () => {
        const [ref1, size1] = useResizeObserver<HTMLDivElement>({ onResize: onResize1 });
        const [ref2, size2] = useResizeObserver<HTMLDivElement>({ onResize: onResize2 });
        return (
          <div>
            <div ref={ref1} data-testid="observed1" />
            <div ref={ref2} data-testid="observed2" />
            <span data-testid="width1">{size1.width}</span>
            <span data-testid="width2">{size2.width}</span>
          </div>
        );
      };

      const { rerender } = render(<TestComponent />);

      expect(MockResizeObserver.instances).toHaveLength(2);

      const observer1 = MockResizeObserver.instances[0];
      const observer2 = MockResizeObserver.instances[1];
      const element1 = screen.getByTestId('observed1');
      const element2 = screen.getByTestId('observed2');

      // Trigger first observer
      const mockEntry1: ResizeObserverEntry = {
        target: element1,
        contentRect: {
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          top: 0,
          right: 100,
          bottom: 200,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [{ inlineSize: 100, blockSize: 200 }],
        contentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
        devicePixelContentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
      } as ResizeObserverEntry;

      observer1.trigger([mockEntry1]);
      rerender(<TestComponent />);

      expect(onResize1).toHaveBeenCalledWith({ width: 100, height: 200 });
      expect(onResize2).not.toHaveBeenCalled();
      expect(screen.getByTestId('width1').textContent).toBe('100');
      expect(screen.getByTestId('width2').textContent).toBe('0');

      // Trigger second observer
      const mockEntry2: ResizeObserverEntry = {
        target: element2,
        contentRect: {
          width: 300,
          height: 400,
          x: 0,
          y: 0,
          top: 0,
          right: 300,
          bottom: 400,
          left: 0,
          toJSON: () => ({}),
        },
        borderBoxSize: [{ inlineSize: 300, blockSize: 400 }],
        contentBoxSize: [{ inlineSize: 300, blockSize: 400 }],
        devicePixelContentBoxSize: [{ inlineSize: 300, blockSize: 400 }],
      } as ResizeObserverEntry;

      observer2.trigger([mockEntry2]);
      rerender(<TestComponent />);

      expect(onResize2).toHaveBeenCalledWith({ width: 300, height: 400 });
      expect(screen.getByTestId('width1').textContent).toBe('100');
      expect(screen.getByTestId('width2').textContent).toBe('300');
    });
  });
});
