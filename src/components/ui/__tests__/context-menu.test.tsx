import React from 'react';
import { render } from '@testing-library/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '../context-menu';

// Mock Radix primitives to simple host elements to avoid portal/focus logic
jest.mock('@radix-ui/react-context-menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const Host = (Tag: React.ElementType) => {
    const Component = ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <Tag {...(props as Record<string, unknown>)}>{children}</Tag>
    );
    Component.displayName = `Host(${typeof Tag === 'string' ? Tag : 'Component'})`;
    return Component;
  };
  return {
    __esModule: true,
    Root: Host('div'),
    Trigger: Host('button'),
    Group: Host('div'),
    Portal: Host('div'),
    Sub: Host('div'),
    RadioGroup: Host('div'),
    SubTrigger: Host('div'),
    SubContent: Host('div'),
    Content: Host('div'),
    Item: Host('div'),
    CheckboxItem: Host('div'),
    RadioItem: Host('div'),
    ItemIndicator: Host('span'),
    Label: Host('div'),
    Separator: Host('div'),
  };
});

describe('ContextMenu', () => {
  it('renders root, trigger, content, and item with data-slots; merges className', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Open</ContextMenuTrigger>
        <ContextMenuContent className="content-x">
          <ContextMenuItem className="item-x">Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const root = document.querySelector('[data-slot="context-menu"]') as HTMLElement | null;
    const trigger = document.querySelector(
      '[data-slot="context-menu-trigger"]'
    ) as HTMLElement | null;
    const content = document.querySelector(
      '[data-slot="context-menu-content"]'
    ) as HTMLElement | null;
    const item = document.querySelector('[data-slot="context-menu-item"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(content).not.toBeNull();
    expect(item).not.toBeNull();
    expect(content!).toHaveClass('bg-popover');
    expect(content!).toHaveClass('content-x');
    expect(item!).toHaveClass('relative');
    expect(item!).toHaveClass('item-x');
  });

  it('renders submenu trigger with chevron icon, supports inset and class merging', () => {
    render(
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset className="subtrig-x">
              More
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="subcontent-x">Sub Body</ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
    const subTrigger = document.querySelector(
      '[data-slot="context-menu-sub-trigger"]'
    ) as HTMLElement | null;
    const subContent = document.querySelector(
      '[data-slot="context-menu-sub-content"]'
    ) as HTMLElement | null;
    expect(subTrigger).not.toBeNull();
    expect(subContent).not.toBeNull();
    expect(subTrigger!).toHaveAttribute('data-inset', 'true');
    expect(subTrigger!).toHaveClass('flex');
    expect(subTrigger!).toHaveClass('subtrig-x');
    // ChevronRightIcon should be rendered within the sub trigger
    expect(subTrigger!.querySelector('svg')).not.toBeNull();
    expect(subContent!).toHaveClass('bg-popover');
    expect(subContent!).toHaveClass('subcontent-x');
  });

  it('renders checkbox and radio items with item indicators (icons)', () => {
    render(
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Check me</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup>
            <ContextMenuRadioItem value="a">Option A</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
    const checkbox = document.querySelector(
      '[data-slot="context-menu-checkbox-item"]'
    ) as HTMLElement | null;
    const radio = document.querySelector(
      '[data-slot="context-menu-radio-item"]'
    ) as HTMLElement | null;
    expect(checkbox).not.toBeNull();
    expect(radio).not.toBeNull();
    // ItemIndicator renders an icon inside each
    expect(checkbox!.querySelector('svg')).not.toBeNull();
    expect(radio!.querySelector('svg')).not.toBeNull();
  });

  it('supports variant and inset via data attributes; renders label, separator, and shortcut', () => {
    render(
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuLabel inset className="lbl-x">
            Label
          </ContextMenuLabel>
          <ContextMenuSeparator className="sep-x" />
          <ContextMenuItem inset variant="destructive" className="it-x">
            Delete <ContextMenuShortcut className="sc-x">⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const label = document.querySelector('[data-slot="context-menu-label"]') as HTMLElement | null;
    const sep = document.querySelector(
      '[data-slot="context-menu-separator"]'
    ) as HTMLElement | null;
    const item = document.querySelector('[data-slot="context-menu-item"]') as HTMLElement | null;
    const sc = document.querySelector('[data-slot="context-menu-shortcut"]') as HTMLElement | null;
    expect(label).not.toBeNull();
    expect(sep).not.toBeNull();
    expect(item).not.toBeNull();
    expect(sc).not.toBeNull();
    expect(label!).toHaveAttribute('data-inset', 'true');
    expect(label!).toHaveClass('font-medium');
    expect(label!).toHaveClass('lbl-x');
    expect(sep!).toHaveClass('h-px');
    expect(sep!).toHaveClass('sep-x');
    expect(item!).toHaveAttribute('data-inset', 'true');
    expect(item!).toHaveAttribute('data-variant', 'destructive');
    expect(item!).toHaveClass('relative');
    expect(item!).toHaveClass('it-x');
    expect(sc!).toHaveClass('ml-auto');
    expect(sc!).toHaveClass('sc-x');
  });
});
