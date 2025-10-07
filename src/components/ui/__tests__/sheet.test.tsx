import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../sheet';

describe('Sheet', () => {
  it('renders overlay/content with data-slots when open and merges className', () => {
    render(
      <Sheet open>
        <SheetContent className="extra-content">
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const overlay = document.querySelector('[data-slot="sheet-overlay"]') as HTMLElement | null;
    const content = document.querySelector('[data-slot="sheet-content"]') as HTMLElement | null;
    const header = document.querySelector('[data-slot="sheet-header"]') as HTMLElement | null;
    const footer = document.querySelector('[data-slot="sheet-footer"]') as HTMLElement | null;
    const title = document.querySelector('[data-slot="sheet-title"]') as HTMLElement | null;
    const description = document.querySelector(
      '[data-slot="sheet-description"]'
    ) as HTMLElement | null;

    expect(overlay).not.toBeNull();
    expect(content).not.toBeNull();
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(title).not.toBeNull();
    expect(description).not.toBeNull();

    // Key default classes + merged className on content
    expect(content!).toHaveClass('bg-background');
    expect(content!).toHaveClass('extra-content');
  });

  it('opens when trigger is clicked and closes when SheetClose is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetFooter>
            <SheetClose>Cancel</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    // Initially closed
    expect(document.querySelector('[data-slot="sheet-content"]')).toBeNull();

    // Open via trigger
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(document.querySelector('[data-slot="sheet-content"]')).not.toBeNull();

    // Close via SheetClose (wait for exit animation/unmount)
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(document.querySelector('[data-slot="sheet-content"]')).toBeNull();
    });
  });

  it('applies correct side classes based on side prop', () => {
    const { rerender } = render(
      <Sheet open>
        <SheetContent side="right" />
      </Sheet>
    );

    let content = document.querySelector('[data-slot="sheet-content"]') as HTMLElement | null;
    expect(content).not.toBeNull();
    expect(content!.className).toContain('right-0');
    expect(content!.className).toContain('border-l');

    rerender(
      <Sheet open>
        <SheetContent side="left" />
      </Sheet>
    );
    content = document.querySelector('[data-slot="sheet-content"]') as HTMLElement | null;
    expect(content!.className).toContain('left-0');
    expect(content!.className).toContain('border-r');

    rerender(
      <Sheet open>
        <SheetContent side="top" />
      </Sheet>
    );
    content = document.querySelector('[data-slot="sheet-content"]') as HTMLElement | null;
    expect(content!.className).toContain('top-0');
    expect(content!.className).toContain('border-b');

    rerender(
      <Sheet open>
        <SheetContent side="bottom" />
      </Sheet>
    );
    content = document.querySelector('[data-slot="sheet-content"]') as HTMLElement | null;
    expect(content!.className).toContain('bottom-0');
    expect(content!.className).toContain('border-t');
  });
});
