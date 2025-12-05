import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';

const meta = {
  title: 'Forms/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A drag-and-drop file upload component that allows users to upload files by dragging them into a designated area or clicking to browse.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Default dropzone component for single image file upload, supporting drag-and-drop and click-to-upload interactions.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Dropzone configured for multiple file uploads (up to 5 files) with support for both images and PDF files.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Dropzone with file validation, restricting uploads to PNG files only with minimum (10KB) and maximum (2MB) size constraints.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropzone component, showing the inactive state when file uploads are not currently allowed.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Dropzone with discard functionality, allowing users to remove all selected files and reset the upload state.',
      },
    },
  },
};
