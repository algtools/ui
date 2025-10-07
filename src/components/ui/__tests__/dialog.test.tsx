import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../dialog';

describe('Dialog', () => {
  it('renders overlay/content with data-slots when open and merges className', () => {
    render(
      <Dialog open>
        <DialogContent className="extra-content">
          <DialogHeader>Header</DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement | null;
    const content = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
    const header = document.querySelector('[data-slot="dialog-header"]') as HTMLElement | null;
    const footer = document.querySelector('[data-slot="dialog-footer"]') as HTMLElement | null;
    const title = document.querySelector('[data-slot="dialog-title"]') as HTMLElement | null;
    const description = document.querySelector(
      '[data-slot="dialog-description"]'
    ) as HTMLElement | null;

    expect(overlay).not.toBeNull();
    expect(content).not.toBeNull();
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(title).not.toBeNull();
    expect(description).not.toBeNull();

    // A couple of key default classes + merged className on content
    expect(content!).toHaveClass('bg-background');
    expect(content!).toHaveClass('rounded-lg');
    expect(content!).toHaveClass('extra-content');
  });

  it('opens when trigger is clicked and closes when DialogClose is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>Confirm your action.</DialogDescription>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Initially closed
    expect(document.querySelector('[data-slot="dialog-content"]')).toBeNull();

    // Open via trigger
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(document.querySelector('[data-slot="dialog-content"]')).not.toBeNull();

    // Close via DialogClose (wait for exit animation/unmount)
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-content"]')).toBeNull();
    });
  });

  it('renders default close button by default and hides it when showCloseButton=false', () => {
    // Default (true)
    const { rerender } = render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          Content
        </DialogContent>
      </Dialog>
    );
    expect(document.querySelector('[data-slot="dialog-close"]')).not.toBeNull();

    // Rerender with showCloseButton=false
    rerender(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          Content
        </DialogContent>
      </Dialog>
    );
    expect(document.querySelector('[data-slot="dialog-close"]')).toBeNull();
  });
});
