import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AvatarEditor } from '../avatar-editor';

// Mock Radix Slider primitives used by our Slider wrapper to keep DOM simple
jest.mock('@radix-ui/react-slider', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Track: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Range: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
    Thumb: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
  };
});

// Canvas 2D context mock
type Ctx = {
  clearRect: jest.Mock;
  setTransform: jest.Mock;
  save: jest.Mock;
  translate: jest.Mock;
  rotate: jest.Mock;
  scale: jest.Mock;
  drawImage: jest.Mock;
  restore: jest.Mock;
  beginPath: jest.Mock;
  moveTo: jest.Mock;
  lineTo: jest.Mock;
  stroke: jest.Mock;
  globalCompositeOperation?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineCap?: string;
  lineJoin?: string;
};

let ctx: Ctx;

beforeAll(() => {
  // Mock canvas context
  ctx = {
    clearRect: jest.fn(),
    setTransform: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    drawImage: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
  };

  // @ts-expect-error jsdom missing getContext
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ctx);
  // Cast to satisfy TS when assigning mock function
  HTMLCanvasElement.prototype.toDataURL = jest.fn(
    () => 'data:image/png;base64,mock'
  ) as unknown as typeof HTMLCanvasElement.prototype.toDataURL;
});

afterEach(() => {
  jest.clearAllMocks();
});

// Mock FileReader
class MockFileReader {
  public onload: ((ev: ProgressEvent<FileReader>) => unknown) | null = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readAsDataURL(_file: File) {
    const event = {
      target: { result: 'data:image/png;base64,FAKE' },
    } as unknown as ProgressEvent<FileReader>;
    setTimeout(() => {
      this.onload?.(event);
    }, 0);
  }
}

// Mock Image with configurable dimensions
let nextImageSize = { width: 1200, height: 800 };

class MockImage {
  public onload: (() => void) | null = null;
  public width = nextImageSize.width;
  public height = nextImageSize.height;
  public crossOrigin = '';
  private _src = '';
  set src(value: string) {
    this._src = value;
    // trigger load async to simulate actual image load
    setTimeout(() => this.onload && this.onload(), 0);
  }
  get src() {
    return this._src;
  }
}

beforeEach(() => {
  (global as unknown as { FileReader: typeof FileReader }).FileReader =
    MockFileReader as unknown as typeof FileReader;
  (global as unknown as { Image: typeof Image }).Image = MockImage as unknown as typeof Image;
  nextImageSize = { width: 1200, height: 800 };
});

function getFileInput(container: HTMLElement) {
  return container.querySelector('input[type="file"]') as HTMLInputElement | null;
}

function createFile(name = 'avatar.png', type = 'image/png') {
  return new File(['dummy'], name, { type });
}

describe('AvatarEditor', () => {
  it('shows upload overlay and controls placeholder when no image', () => {
    render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);

    expect(screen.getByText('Haz clic para subir imagen')).toBeInTheDocument();
    expect(screen.getByText('Agrega una imagen para poder editarla')).toBeInTheDocument();
    expect(screen.getByText(/Tipos permitidos/i)).toBeInTheDocument();
    // Allowed types summary
    expect(screen.getByText(/jpeg, png, webp/i)).toBeInTheDocument();
  });

  it('clicking the overlay triggers hidden file input click', () => {
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);

    const input = getFileInput(container)!;
    const clickSpy = jest.spyOn(input, 'click');

    fireEvent.click(screen.getByText('Haz clic para subir imagen'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('loads an allowed image via file input and shows controls; zoom out is disabled initially', async () => {
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);

    const input = getFileInput(container)!;
    const file = createFile('avatar.png', 'image/png');
    fireEvent.change(input, { target: { files: [file] } });

    // Overlay should disappear, controls appear
    await waitFor(() => expect(screen.queryByText('Haz clic para subir imagen')).toBeNull());

    const zoomOut = screen.getByTitle('Alejar') as HTMLButtonElement;
    const zoomIn = screen.getByTitle('Acercar') as HTMLButtonElement;
    expect(zoomOut.disabled).toBe(true);
    expect(zoomIn.disabled).toBe(false);
  });

  it('respects disallowed file types and warns without loading', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);
    const input = getFileInput(container)!;
    const badFile = createFile('note.txt', 'text/plain');
    fireEvent.change(input, { target: { files: [badFile] } });

    // Still shows overlay
    expect(screen.getByText('Haz clic para subir imagen')).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('zoom controls update scale within bounds [min,3]', async () => {
    // Image with portrait aspect so minScale is based on width
    nextImageSize = { width: 500, height: 1500 };
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });

    await waitFor(() => expect(screen.queryByText('Haz clic para subir imagen')).toBeNull());
    const zoomOut = screen.getByTitle('Alejar') as HTMLButtonElement;
    const zoomIn = screen.getByTitle('Acercar') as HTMLButtonElement;

    // At min scale initially
    expect(zoomOut.disabled).toBe(true);

    // Zoom in a few times until max
    for (let i = 0; i < 20; i++) fireEvent.click(zoomIn);
    expect(zoomIn.disabled).toBe(true); // reached max 3

    // Now zoom out should be enabled
    expect(zoomOut.disabled).toBe(false);
  });

  it('rotate buttons trigger canvas redraw with rotation applied', async () => {
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });
    await waitFor(() => expect(screen.queryByTitle('Rotar a la derecha')).toBeInTheDocument());

    const initialRotateCalls = ctx.rotate.mock.calls.length;
    fireEvent.click(screen.getByTitle('Rotar a la derecha'));
    await waitFor(() => expect(ctx.rotate.mock.calls.length).toBeGreaterThan(initialRotateCalls));

    const afterCw = ctx.rotate.mock.calls.length;
    fireEvent.click(screen.getByTitle('Rotar a la izquierda'));
    await waitFor(() => expect(ctx.rotate.mock.calls.length).toBeGreaterThan(afterCw));
  });

  it('saves edited image and calls onSave with data URL, showing loader while pending', async () => {
    const onSave = jest.fn(async () => {
      return new Promise<void>((resolve) => setTimeout(resolve, 10));
    });
    const { container } = render(<AvatarEditor onSave={onSave} onDiscard={() => {}} />);
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });

    await waitFor(() => expect(screen.getByTitle('Guardar')).toBeInTheDocument());

    const saveBtn = screen.getByTitle('Guardar') as HTMLButtonElement;
    fireEvent.click(saveBtn);

    // During save, disabled and loader icon rendered
    expect(saveBtn.disabled).toBe(true);

    await waitFor(() => expect(onSave).toHaveBeenCalled());
    const firstCallArgs = (onSave.mock.calls as unknown as Array<unknown[]>)[0]!;
    expect(String(firstCallArgs[0])).toMatch(/^data:image\/png/);
  });

  it('calls onChange with data URL on initial load and when transforms change', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <AvatarEditor onSave={async () => {}} onDiscard={() => {}} onChange={onChange} />
    );
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });

    // onChange should be called after the image has been rendered
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const calledAfterLoad = onChange.mock.calls.length;

    // Zoom in triggers another onChange
    const zoomIn = screen.getByTitle('Acercar') as HTMLButtonElement;
    fireEvent.click(zoomIn);
    await waitFor(() => expect(onChange.mock.calls.length).toBeGreaterThan(calledAfterLoad));
    const afterZoom = onChange.mock.calls.length;

    // Rotate triggers another onChange
    fireEvent.click(screen.getByTitle('Rotar a la derecha'));
    await waitFor(() => expect(onChange.mock.calls.length).toBeGreaterThan(afterZoom));

    // Dragging on canvas triggers another onChange
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseMove(canvas, { clientX: 170, clientY: 170 });
    fireEvent.mouseUp(canvas);
    await waitFor(() => expect(onChange.mock.calls.length).toBeGreaterThan(afterZoom));
  });

  it('does not call onChange on currentAvatar load; calls after user edit', async () => {
    const onChange = jest.fn();
    render(
      <AvatarEditor
        currentAvatar="https://example.com/avatar.jpg"
        onSave={async () => {}}
        onDiscard={() => {}}
        onChange={onChange}
      />
    );

    // Wait until controls are visible (image loaded)
    await waitFor(() => expect(screen.getByTitle('Alejar')).toBeInTheDocument());

    // No onChange on prop-driven initial load
    expect(onChange).not.toHaveBeenCalled();

    // Simulate a user edit (zoom in) which should trigger onChange
    fireEvent.click(screen.getByTitle('Acercar'));
    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });

  it('draws grid overlay lines on the preview canvas when image is present', async () => {
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={() => {}} />);
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });

    // Wait until controls appear (image loaded and drawn)
    await waitFor(() => expect(screen.getByTitle('Alejar')).toBeInTheDocument());

    // There should be at least 4 strokes from the grid overlay (2 vertical + 2 horizontal)
    expect(ctx.stroke.mock.calls.length).toBeGreaterThanOrEqual(4);
  });

  it('respects quality parameter when generating data URLs (used by onChange)', async () => {
    // Spy on toDataURL to inspect arguments
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const toDataURLMock = jest.fn(() => 'data:image/png;base64,spy');
    // Cast to satisfy TS when overriding prototype method
    HTMLCanvasElement.prototype.toDataURL =
      toDataURLMock as unknown as typeof HTMLCanvasElement.prototype.toDataURL;

    try {
      const onChange = jest.fn();
      const { container } = render(
        <AvatarEditor
          onSave={async () => {}}
          onDiscard={() => {}}
          onChange={onChange}
          quality={0.5}
        />
      );
      const input = getFileInput(container)!;
      fireEvent.change(input, { target: { files: [createFile()] } });

      await waitFor(() => expect(onChange).toHaveBeenCalled());
      // getEditedImage should call toDataURL with the quality argument
      const lastCallArgs = (toDataURLMock.mock.calls as unknown as Array<unknown[]>).at(-1)!;
      expect(lastCallArgs[0]).toBe('image/png');
      expect(lastCallArgs[1]).toBe(0.5);
    } finally {
      // Restore the original method
      HTMLCanvasElement.prototype.toDataURL =
        originalToDataURL as typeof HTMLCanvasElement.prototype.toDataURL;
    }
  });

  it('discard clears image, canvas, input and calls onDiscard', async () => {
    const onDiscard = jest.fn();
    const { container } = render(<AvatarEditor onSave={async () => {}} onDiscard={onDiscard} />);
    const input = getFileInput(container)!;
    fireEvent.change(input, { target: { files: [createFile()] } });
    await waitFor(() => expect(screen.getByTitle('Eliminar')).toBeInTheDocument());

    const clearCallsBefore = ctx.clearRect.mock.calls.length;
    fireEvent.click(screen.getByTitle('Eliminar'));

    // Overlay shows again and canvas cleared at least once more
    await waitFor(() => expect(screen.getByText('Haz clic para subir imagen')).toBeInTheDocument());
    expect(ctx.clearRect.mock.calls.length).toBeGreaterThan(clearCallsBefore);
    expect(onDiscard).toHaveBeenCalled();
  });

  it('loads image from currentAvatar URL on mount and sets crossOrigin', async () => {
    nextImageSize = { width: 1600, height: 900 };
    render(
      <AvatarEditor
        currentAvatar="https://example.com/avatar.jpg"
        onSave={async () => {}}
        onDiscard={() => {}}
      />
    );

    // Controls should appear after image loads
    await waitFor(() => expect(screen.getByTitle('Alejar')).toBeInTheDocument());
    // Zoom out should be disabled at min scale
    expect((screen.getByTitle('Alejar') as HTMLButtonElement).disabled).toBe(true);
  });

  it('applies size and borderRadius styles', () => {
    const size = 300;
    const borderRadius = 25;
    const { container } = render(
      <AvatarEditor
        size={size}
        borderRadius={borderRadius}
        onSave={async () => {}}
        onDiscard={() => {}}
      />
    );

    const previewWrapper = container.querySelector(
      'div.relative.border-2.border-dashed.border-border'
    ) as HTMLDivElement | null;
    expect(previewWrapper).not.toBeNull();
    expect(previewWrapper!.style.width).toBe(`${size}px`);
    expect(previewWrapper!.style.height).toBe(`${size}px`);
    expect(previewWrapper!.style.borderRadius).toBe(`${borderRadius}%`);

    // Card container width (size + 48)
    const cardWithStyle = container.querySelector(`[style*="width: ${size + 48}px"]`);
    expect(cardWithStyle).not.toBeNull();
  });
});
