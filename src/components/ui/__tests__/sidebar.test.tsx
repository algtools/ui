/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '../sidebar';

// Mocks for external UI primitives used by sidebar
jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn(() => false),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: React.ComponentProps<'button'>) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: React.ComponentProps<'input'>) => <input {...props} />,
}));

jest.mock('@/components/ui/separator', () => ({
  Separator: ({ ...props }: React.ComponentProps<'hr'>) => <hr {...props} />,
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({
    children,
    open: _open,
    onOpenChange: _onOpenChange,
    ...props
  }: React.ComponentProps<'div'> & { open?: boolean; onOpenChange?: (open: boolean) => void }) => (
    <div data-slot="sheet" {...props}>
      {children}
    </div>
  ),
  SheetContent: ({
    children,
    open: _open,
    onOpenChange: _onOpenChange,
    side: _side,
    ...props
  }: React.ComponentProps<'div'> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: 'left' | 'right';
  }) => (
    <div data-slot="sheet-content" {...props}>
      {children}
    </div>
  ),
  SheetHeader: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-slot="sheet-header" {...props}>
      {children}
    </div>
  ),
  SheetTitle: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-slot="sheet-title" {...props}>
      {children}
    </div>
  ),
  SheetDescription: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-slot="sheet-description" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ ...props }: React.ComponentProps<'div'>) => <div {...props} />,
}));

jest.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-slot="tooltip-provider">{children}</div>
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-slot="tooltip">{children}</div>
  ),
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-slot="tooltip-trigger">{children}</div>
  ),
  TooltipContent: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-slot="tooltip-content" {...props}>
      {children}
    </div>
  ),
}));

describe('Sidebar - desktop interactions', () => {
  it('toggles via trigger and rail, updates data-state and writes cookie', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarTrigger>Toggle</SidebarTrigger>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
    );

    const root = container.querySelector('[data-slot="sidebar"]') as HTMLElement;
    expect(root).toHaveAttribute('data-state', 'expanded');

    // Click the trigger specifically (there are two buttons named "Toggle Sidebar": trigger and rail)
    await user.click(container.querySelector('[data-slot="sidebar-trigger"]') as HTMLElement);
    expect(root).toHaveAttribute('data-state', 'collapsed');
    expect(document.cookie).toContain('sidebar_state=false');

    // Click the rail to expand back
    const rail = container.querySelector('[data-slot="sidebar-rail"]') as HTMLElement;
    await user.click(rail);
    expect(root).toHaveAttribute('data-state', 'expanded');
    expect(document.cookie).toContain('sidebar_state=true');
  });

  it('responds to keyboard shortcut ctrl+b to toggle', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    const root = container.querySelector('[data-slot="sidebar"]') as HTMLElement;
    expect(root).toHaveAttribute('data-state', 'expanded');
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true }));
    });
    expect(root).toHaveAttribute('data-state', 'collapsed');
  });
});

describe('Sidebar - mobile rendering', () => {
  it('renders inside Sheet when mobile', () => {
    const { useIsMobile } = jest.requireMock('@/hooks/use-mobile') as { useIsMobile: jest.Mock };
    useIsMobile.mockReturnValue(true);

    const { container } = render(
      <SidebarProvider>
        <Sidebar side="right" />
      </SidebarProvider>
    );

    const sheetContent = container.querySelector('[data-mobile="true"]') as HTMLElement | null;
    expect(sheetContent).not.toBeNull();
    // On mobile, SheetContent is used but the component sets data-slot="sidebar" on it
    expect(sheetContent!).toHaveAttribute('data-slot', 'sidebar');
  });
});

describe('Sidebar menu components', () => {
  it('renders SidebarMenuButton without tooltip and sets data attributes', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarMenuButton isActive size="lg" />
      </SidebarProvider>
    );
    const btn = container.querySelector('[data-slot="sidebar-menu-button"]') as HTMLElement;
    expect(btn).toHaveAttribute('data-active', 'true');
    expect(btn).toHaveAttribute('data-size', 'lg');
  });

  it('shows TooltipContent only when collapsed and not mobile', () => {
    const { useIsMobile } = jest.requireMock('@/hooks/use-mobile') as { useIsMobile: jest.Mock };
    useIsMobile.mockReturnValue(false);

    // collapsed state
    const { container, rerender } = render(
      <SidebarProvider defaultOpen={false}>
        <SidebarMenuButton tooltip="Tip" />
      </SidebarProvider>
    );
    let content = container.querySelector('[data-slot="tooltip-content"]') as HTMLElement;
    expect(content).not.toBeNull();
    expect(content.hasAttribute('hidden')).toBe(false);

    // expanded state hides tooltip (use controlled open to update state)
    rerender(
      <SidebarProvider open>
        <SidebarMenuButton tooltip="Tip" />
      </SidebarProvider>
    );
    content = container.querySelector('[data-slot="tooltip-content"]') as HTMLElement;
    expect(content).not.toBeNull();
    expect(content.hasAttribute('hidden')).toBe(true);

    // mobile also hides tooltip
    useIsMobile.mockReturnValue(true);
    rerender(
      <SidebarProvider defaultOpen={false}>
        <SidebarMenuButton tooltip="Tip" />
      </SidebarProvider>
    );
    content = container.querySelector('[data-slot="tooltip-content"]') as HTMLElement;
    expect(content).not.toBeNull();
    expect(content.hasAttribute('hidden')).toBe(true);
  });

  it('SidebarMenuAction applies hover visibility classes when showOnHover=true', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarMenuAction showOnHover />
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-menu-action"]') as HTMLElement;
    expect(el.className).toContain('md:opacity-0');
  });

  it('SidebarMenuBadge renders with expected static classes', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarMenuBadge />
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-menu-badge"]') as HTMLElement;
    expect(el.className).toContain('pointer-events-none');
  });

  it('SidebarSeparator renders with data-slot and merges className', () => {
    const { container } = render(
      <SidebarProvider>
        <div>
          {/* Use the exported Separator wrapper */}
          {}
          {React.createElement(require('../sidebar').SidebarSeparator, { className: 'extra' })}
        </div>
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-separator"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('mx-2');
    expect(el).toHaveClass('extra');
  });

  it('SidebarContent renders with data-slot and merges className', () => {
    const { container } = render(
      <SidebarProvider>
        {}
        {React.createElement(require('../sidebar').SidebarContent, { className: 'extra' })}
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-content"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('extra');
  });

  it('SidebarGroup renders with data-slot and merges className', () => {
    const { container } = render(
      <SidebarProvider>
        {}
        {React.createElement(require('../sidebar').SidebarGroup, { className: 'extra' })}
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-group"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('extra');
  });

  it('SidebarGroupLabel renders normally and with asChild forwarding', () => {
    const { container, rerender } = render(
      <SidebarProvider>
        {}
        {React.createElement(require('../sidebar').SidebarGroupLabel, { className: 'lbl' })}
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-group-label"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('text-xs');
    expect(el).toHaveClass('lbl');

    // asChild forwards props to child element
    rerender(
      <SidebarProvider>
        {React.createElement(
          require('../sidebar').SidebarGroupLabel,
          { asChild: true, className: 'lbl' },
          <span data-testid="child" />
        )}
      </SidebarProvider>
    );
    const child = screen.getByTestId('child');
    expect(child).toHaveAttribute('data-slot', 'sidebar-group-label');
    expect(child).toHaveClass('lbl');
  });

  it('SidebarGroupAction renders and supports asChild forwarding', () => {
    const { container, rerender } = render(
      <SidebarProvider>
        {}
        {React.createElement(require('../sidebar').SidebarGroupAction, { className: 'act' })}
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-group-action"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('w-5');
    expect(el).toHaveClass('act');

    rerender(
      <SidebarProvider>
        {React.createElement(
          require('../sidebar').SidebarGroupAction,
          { asChild: true, className: 'act' },
          <button data-testid="grp-act" />
        )}
      </SidebarProvider>
    );
    const child = screen.getByTestId('grp-act');
    expect(child).toHaveAttribute('data-slot', 'sidebar-group-action');
    expect(child).toHaveClass('act');
  });

  it('SidebarGroupContent renders with data-slot and merges className', () => {
    const { container } = render(
      <SidebarProvider>
        {}
        {React.createElement(require('../sidebar').SidebarGroupContent, { className: 'extra' })}
      </SidebarProvider>
    );
    const el = container.querySelector('[data-slot="sidebar-group-content"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass('w-full');
    expect(el).toHaveClass('extra');
  });

  it('SidebarMenu and SidebarMenuItem render with data-slot and merge className', () => {
    const { container } = render(
      <SidebarProvider>
        {React.createElement(
          require('../sidebar').SidebarMenu,
          { className: 'm-extra' },
          React.createElement(require('../sidebar').SidebarMenuItem, { className: 'i-extra' })
        )}
      </SidebarProvider>
    );
    const menu = container.querySelector('[data-slot="sidebar-menu"]') as HTMLElement;
    const item = container.querySelector('[data-slot="sidebar-menu-item"]') as HTMLElement;
    expect(menu).not.toBeNull();
    expect(menu).toHaveClass('flex');
    expect(menu).toHaveClass('m-extra');
    expect(item).not.toBeNull();
    expect(item).toHaveClass('group/menu-item');
    expect(item).toHaveClass('i-extra');
  });

  it('SidebarMenuSkeleton sets CSS variable width using memoized random', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.75); // => 80%
    const { container } = render(
      <SidebarProvider>
        <SidebarMenuSkeleton showIcon />
      </SidebarProvider>
    );
    const text = container.querySelector('[data-sidebar="menu-skeleton-text"]') as HTMLElement;
    expect(text.getAttribute('style') || '').toContain('80%');
    randomSpy.mockRestore();
  });

  it('SidebarMenuSub, SubItem and SubButton expose proper data attributes', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton size="sm" isActive href="#">
              Item
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarProvider>
    );
    const sub = container.querySelector('[data-slot="sidebar-menu-sub"]');
    const item = container.querySelector('[data-slot="sidebar-menu-sub-item"]');
    const btn = container.querySelector('[data-slot="sidebar-menu-sub-button"]') as HTMLElement;
    expect(sub).not.toBeNull();
    expect(item).not.toBeNull();
    expect(btn).toHaveAttribute('data-size', 'sm');
    expect(btn).toHaveAttribute('data-active', 'true');
  });
});
