import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';

function createFile(name: string, size = 1000, type = 'text/plain'): File {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
}

describe('Dropzone', () => {
  test('renders empty state with captions', () => {
    render(
      <Dropzone
        accept={{ 'image/*': ['.png', '.jpg'] }}
        minSize={1024}
        maxSize={5 * 1024}
        maxFiles={2}
      >
        <DropzoneEmptyState />
      </Dropzone>
    );

    expect(screen.getByText('Sube archivos')).toBeInTheDocument();
    expect(screen.getByText('Arrastra y suelta o haz clic para subir')).toBeInTheDocument();
    // Caption includes accept and size range
    expect(screen.getByText(/Acepta image\/\*/)).toBeInTheDocument();
    expect(screen.getByText(/entre/i)).toBeInTheDocument();
  });

  test('renders content with selected files', () => {
    const files = [
      createFile('a.png'),
      createFile('b.jpg'),
      createFile('c.webp'),
      createFile('d.gif'),
    ];

    render(
      <Dropzone src={files}>
        <DropzoneContent />
      </Dropzone>
    );

    // Shows list of first three; be tolerant to Oxford comma formatting
    expect(screen.getByText(/a\.png,\s*b\.jpg,?\s*y c\.webp/)).toBeInTheDocument();
    expect(screen.getByText(/y 1 más/)).toBeInTheDocument();
    expect(screen.getByText('Arrastra y suelta o haz clic para reemplazar')).toBeInTheDocument();
  });

  test('invokes onDrop when user selects files; calls onError for rejections', async () => {
    const user = userEvent.setup();
    const onDrop = vi.fn();
    const onError = vi.fn();

    render(
      <Dropzone onDrop={onDrop} onError={onError} maxFiles={1} accept={{ 'text/plain': ['.txt'] }}>
        <DropzoneEmptyState />
      </Dropzone>
    );

    // react-dropzone renders an invisible input[type=file]
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeTruthy();

    // First, upload a valid file
    const validFile = createFile('readme.txt', 2000, 'text/plain');
    await user.upload(fileInput, validFile);
    expect(onDrop).toHaveBeenCalled();

    // Next, trigger a rejection by exceeding maxFiles in a single upload
    const anotherFile = createFile('again.txt', 2000, 'text/plain');
    const extraFile = createFile('more.txt', 2000, 'text/plain');
    await user.upload(fileInput, [anotherFile, extraFile]);
    expect(onError).toHaveBeenCalled();
  });

  test('shows discard button when files are selected and calls onDiscard on click', async () => {
    const user = userEvent.setup();
    const onDiscard = vi.fn();
    const onDrop = vi.fn();

    const files = [createFile('a.png', 1000, 'image/png')];

    render(
      <Dropzone src={files} onDiscard={onDiscard} onDrop={onDrop}>
        <DropzoneContent />
      </Dropzone>
    );

    const discardBtn = screen.getByRole('button', { name: /eliminar archivos/i });
    expect(discardBtn).toBeInTheDocument();

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(fileInput, 'click');

    await user.click(discardBtn);

    expect(onDiscard).toHaveBeenCalledTimes(1);
    expect(clickSpy).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
  });

  test('does not render discard button when disabled', () => {
    const files = [createFile('a.png', 1000, 'image/png')];

    render(
      <Dropzone src={files} onDiscard={vi.fn()} disabled>
        <DropzoneContent />
      </Dropzone>
    );

    expect(screen.queryByRole('button', { name: /eliminar archivos/i })).toBeNull();
  });
});
