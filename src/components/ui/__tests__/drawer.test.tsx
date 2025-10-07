import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '../drawer';

// Mock vaul's Drawer primitives to simple elements for testing
jest.mock('vaul', () => ({
  __esModule: true,
  Drawer: {
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Portal: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Close: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Overlay: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Title: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Description: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('Drawer', () => {
  it('renders core slots and subcomponents', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    expect(document.querySelector('[data-slot="drawer"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-portal"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-overlay"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-title"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-description"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-footer"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-close"]')).not.toBeNull();
  });

  it('merges classes on overlay and content', () => {
    render(
      <Drawer>
        <DrawerContent className="extra-content" />
      </Drawer>
    );
    const overlay = document.querySelector('[data-slot="drawer-overlay"]') as HTMLElement;
    const content = document.querySelector('[data-slot="drawer-content"]') as HTMLElement;
    expect(overlay).toHaveClass('fixed');
    expect(overlay).toHaveClass('inset-0');
    expect(overlay.className).toContain('bg-black/50');
    expect(content).toHaveClass('bg-background');
    expect(content).toHaveClass('extra-content');
  });

  it('toggles content visibility by controlling open state via trigger and close', async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [open, setOpen] = React.useState(false);
      return (
        <Drawer open={open}>
          <DrawerTrigger onClick={() => setOpen((v) => !v)}>Open</DrawerTrigger>
          {open && (
            <DrawerContent>
              <DrawerFooter>
                <DrawerClose onClick={() => setOpen(false)}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>
      );
    }

    render(<Wrapper />);
    expect(document.querySelector('[data-slot="drawer-content"]')).toBeNull();
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(document.querySelector('[data-slot="drawer-content"]')).not.toBeNull();
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(document.querySelector('[data-slot="drawer-content"]')).toBeNull();
  });
});
