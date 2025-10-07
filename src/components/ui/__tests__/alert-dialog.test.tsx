import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../alert-dialog';

describe('AlertDialog', () => {
  it('renders overlay/content with data-slots when open and merges className', () => {
    render(
      <AlertDialog open>
        <AlertDialogContent className="extra-content">
          <AlertDialogHeader>Header</AlertDialogHeader>
          <AlertDialogTitle>Delete item?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>Footer</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const overlay = document.querySelector(
      '[data-slot="alert-dialog-overlay"]'
    ) as HTMLElement | null;
    const content = document.querySelector(
      '[data-slot="alert-dialog-content"]'
    ) as HTMLElement | null;
    const header = document.querySelector(
      '[data-slot="alert-dialog-header"]'
    ) as HTMLElement | null;
    const footer = document.querySelector(
      '[data-slot="alert-dialog-footer"]'
    ) as HTMLElement | null;
    const title = document.querySelector('[data-slot="alert-dialog-title"]') as HTMLElement | null;
    const description = document.querySelector(
      '[data-slot="alert-dialog-description"]'
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

  it('opens when trigger is clicked and closes when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>Confirm your action.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Initially closed
    expect(document.querySelector('[data-slot="alert-dialog-content"]')).toBeNull();

    // Open via trigger
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(document.querySelector('[data-slot="alert-dialog-content"]')).not.toBeNull();

    // Close via cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(document.querySelector('[data-slot="alert-dialog-content"]')).toBeNull();
  });

  it('applies button variants to Action (default) and Cancel (outline)', () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const action = screen.getByRole('button', { name: /continue/i });
    const cancel = screen.getByRole('button', { name: /cancel/i });

    // Base button classes
    expect(action).toHaveClass('inline-flex');
    expect(cancel).toHaveClass('inline-flex');

    // Variant-specific classes
    expect(action).toHaveClass('bg-primary');
    expect(cancel).toHaveClass('border');
  });
});
