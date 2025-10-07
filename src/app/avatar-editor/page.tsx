'use client';

import * as React from 'react';

import { AvatarEditor } from '@/components/ui/avatar-editor';

export default function AvatarEditorDemoPage() {
  const [editedPreview, setEditedPreview] = React.useState<string | null>(null);
  const [savedPreview, setSavedPreview] = React.useState<string | null>(null);

  const handleSave = async (dataUrl: string): Promise<void> => {
    // Simulate an async save
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSavedPreview(dataUrl);
  };

  const handleDiscard = () => {
    setEditedPreview(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Avatar Editor Demo</h1>
        <p className="text-sm text-muted-foreground">
          This demo showcases the onChange callback updating a live preview as you edit, and onSave storing the final
          result below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <AvatarEditor
            currentAvatar="/file.svg"
            onSave={handleSave}
            onDiscard={handleDiscard}
            onChange={(dataUrl) => setEditedPreview(dataUrl)}
            size={320}
            borderRadius={50}
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium">Live change preview (onChange)</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Updates in real-time as you move, zoom, or rotate the image.
            </p>
            <div className="border rounded-md p-4 bg-muted/20 flex items-center justify-center min-h-40">
              {editedPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editedPreview} alt="Live avatar preview" className="max-w-full rounded-full w-40 h-40" />
              ) : (
                <span className="text-sm text-muted-foreground">No changes yet</span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium">Saved preview (onSave)</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Displays the image returned after you click save in the editor.
            </p>
            <div className="border rounded-md p-4 bg-muted/20 flex items-center justify-center min-h-40">
              {savedPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={savedPreview} alt="Saved avatar preview" className="max-w-full rounded-full w-40 h-40" />
              ) : (
                <span className="text-sm text-muted-foreground">Nothing saved yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


