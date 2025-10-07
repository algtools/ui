import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from '../menubar';

describe('Menubar', () => {
  it('renders root with data-slot and merges className', () => {
    render(<Menubar className="extra-root" />);
    const root = document.querySelector('[data-slot="menubar"]');
    expect(root).not.toBeNull();
    expect(root).toHaveClass('rounded-md');
    expect(root).toHaveClass('extra-root');
  });

  it('opens content on trigger click and renders items/submenu with expected data-slots', async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="extra-item">New Tab</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarCheckboxItem checked>Show Bookmarks</MenubarCheckboxItem>
            <MenubarRadioGroup value="a">
              <MenubarRadioItem value="a">A</MenubarRadioItem>
              <MenubarRadioItem value="b">B</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    // Initially closed
    expect(document.querySelector('[data-slot="menubar-content"]')).toBeNull();

    // Open via trigger
    await user.click(screen.getByRole('menuitem', { name: /file/i }));
    const content = document.querySelector('[data-slot="menubar-content"]');
    expect(content).not.toBeNull();

    // Check item data-slot and className merge
    const item = screen.getByText('New Tab');
    expect(item).toHaveAttribute('data-slot', 'menubar-item');
    expect(item).toHaveClass('rounded-sm');
    expect(item).toHaveClass('extra-item');

    // Checkbox item is checked
    const checkbox = screen.getByRole('menuitemcheckbox', { name: /show bookmarks/i });
    expect(checkbox).toHaveAttribute('aria-checked', 'true');

    // Radio group value is respected
    const radioA = screen.getByRole('menuitemradio', { name: 'A' });
    const radioB = screen.getByRole('menuitemradio', { name: 'B' });
    expect(radioA).toHaveAttribute('aria-checked', 'true');
    expect(radioB).toHaveAttribute('aria-checked', 'false');

    // Open submenu
    await user.click(screen.getByRole('menuitem', { name: /share/i }));
    expect(document.querySelector('[data-slot="menubar-sub-content"]')).not.toBeNull();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
