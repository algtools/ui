import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from '../navigation-menu';

// Mock Radix navigation-menu primitives to simple elements
vi.mock('@radix-ui/react-navigation-menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    List: ({ children, ...props }: React.ComponentProps<'ul'>) => <ul {...props}>{children}</ul>,
    Item: ({ children, ...props }: React.ComponentProps<'li'>) => <li {...props}>{children}</li>,
    Trigger: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Content: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Link: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>,
    Indicator: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    Viewport: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('NavigationMenu', () => {
  it('renders core slots and optional viewport', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Item</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
      </NavigationMenu>
    );

    expect(document.querySelector('[data-slot="navigation-menu"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-list"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-item"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-link"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-indicator"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="navigation-menu-viewport"]')).not.toBeNull();
  });

  it('does not render viewport when disabled', () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList />
      </NavigationMenu>
    );
    expect(document.querySelector('[data-slot="navigation-menu-viewport"]')).toBeNull();
  });
});
