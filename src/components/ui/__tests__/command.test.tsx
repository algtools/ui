import React from 'react';
import { render } from '@testing-library/react';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '../command';

describe('Command', () => {
  it('renders Command root with data-slot and merges className', () => {
    render(<Command className="extra" />);
    const root = document.querySelector('[data-slot="command"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root!).toHaveClass('flex');
    expect(root!).toHaveClass('extra');
  });

  it('renders CommandInput wrapper and input with icons and merges className', () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command" className="inp-x" />
      </Command>
    );
    const wrapper = document.querySelector(
      '[data-slot="command-input-wrapper"]'
    ) as HTMLElement | null;
    const input = document.querySelector('[data-slot="command-input"]') as HTMLElement | null;
    expect(wrapper).not.toBeNull();
    expect(input).not.toBeNull();
    // wrapper has an svg search icon
    expect(wrapper!.querySelector('svg')).not.toBeNull();
    expect(input!).toHaveClass('text-sm');
    expect(input!).toHaveClass('inp-x');
  });

  it('renders CommandList, CommandEmpty, CommandSeparator with data-slots and merges className', () => {
    render(
      <Command>
        <CommandList className="list-x" />
        <CommandEmpty>No results.</CommandEmpty>
        <CommandSeparator className="sep-x" />
      </Command>
    );
    const list = document.querySelector('[data-slot="command-list"]') as HTMLElement | null;
    const empty = document.querySelector('[data-slot="command-empty"]') as HTMLElement | null;
    const sep = document.querySelector('[data-slot="command-separator"]') as HTMLElement | null;
    expect(list).not.toBeNull();
    expect(empty).not.toBeNull();
    expect(sep).not.toBeNull();
    expect(list!).toHaveClass('overflow-y-auto');
    expect(empty!).toHaveClass('text-center');
    expect(sep!).toHaveClass('h-px');
    expect(sep!).toHaveClass('sep-x');
  });

  it('renders CommandGroup, CommandItem and CommandShortcut with expected classes', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="General" className="group-x">
            <CommandItem className="item-x">
              Item One <CommandShortcut className="sc-x">⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    const group = document.querySelector('[data-slot="command-group"]') as HTMLElement | null;
    const item = document.querySelector('[data-slot="command-item"]') as HTMLElement | null;
    const shortcut = document.querySelector('[data-slot="command-shortcut"]') as HTMLElement | null;
    expect(group).not.toBeNull();
    expect(item).not.toBeNull();
    expect(shortcut).not.toBeNull();
    expect(group!).toHaveClass('p-1');
    expect(group!).toHaveClass('group-x');
    expect(item!).toHaveClass('flex');
    expect(item!).toHaveClass('item-x');
    expect(shortcut!).toHaveClass('ml-auto');
    expect(shortcut!).toHaveClass('sc-x');
  });
});

describe('CommandDialog', () => {
  it('renders overlay/content when open and merges className', () => {
    render(
      <CommandDialog open className="dlg-x">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
          </CommandList>
        </Command>
      </CommandDialog>
    );
    const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement | null;
    const content = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
    expect(overlay).not.toBeNull();
    expect(content).not.toBeNull();
    expect(content!).toHaveClass('bg-background');
    expect(content!).toHaveClass('dlg-x');
  });

  it('shows close button by default and hides it when showCloseButton=false', async () => {
    const { rerender } = render(
      <CommandDialog open>
        <Command>
          <CommandList />
        </Command>
      </CommandDialog>
    );
    let close = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null;
    expect(close).not.toBeNull();

    rerender(
      <CommandDialog open showCloseButton={false}>
        <Command>
          <CommandList />
        </Command>
      </CommandDialog>
    );
    close = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null;
    expect(close).toBeNull();
  });
});
