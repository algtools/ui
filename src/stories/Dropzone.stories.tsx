import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';

const meta = {
  title: 'Forms/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="w-[480px] space-y-3">
        <Dropzone
          accept={{ 'image/*': [] }}
          maxFiles={1}
          onDrop={(accepted) => setFiles(accepted)}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {files.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Selected: {new Intl.ListFormat('en').format(files.map((f) => f.name))}
          </div>
        )}
      </div>
    );
  },
};

export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="w-[520px] space-y-3">
        <Dropzone
          accept={{ 'image/*': [], 'application/pdf': ['.pdf'] }}
          maxFiles={5}
          onDrop={(accepted) => setFiles(accepted)}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {files.length > 0 && (
          <ul className="text-sm text-muted-foreground list-disc pl-5">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="w-[520px] space-y-3">
        <Dropzone
          accept={{ 'image/png': ['.png'] }}
          minSize={10 * 1024}
          maxSize={2 * 1024 * 1024}
          onDrop={(accepted) => setFiles(accepted)}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {files.length > 0 && (
          <div className="text-sm text-muted-foreground">Uploaded {files.length} file(s)</div>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [files] = useState<File[]>([]);

    return (
      <div className="w-[480px]">
        <Dropzone accept={{ 'image/*': [] }} disabled src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
    );
  },
};

export const WithDiscard: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="w-[520px] space-y-3">
        <Dropzone
          accept={{ 'image/*': [] }}
          maxFiles={3}
          onDrop={(accepted) => setFiles(accepted)}
          onDiscard={() => setFiles([])}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {files.length > 0 && (
          <ul className="text-sm text-muted-foreground list-disc pl-5">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
};
