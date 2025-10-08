import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useRef, useState } from 'react';
import { ChevronDown, Info, Menu, Settings, User, X } from 'lucide-react';

import { useOnClickOutside } from '../hooks/use-on-click-outside';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component showing basic dropdown usage
 */
function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dropdown Menu</h3>
        <p className="text-sm text-muted-foreground">Click outside the dropdown to close it</p>

        <div className="relative" ref={dropdownRef}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="w-full justify-between"
          >
            Select an option
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 rounded-md border bg-popover shadow-lg">
              <div className="p-1">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-sm flex items-center"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-sm flex items-center"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-sm flex items-center text-destructive"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Dropdown is:{' '}
          <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Open' : 'Closed'}</Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing modal usage with click outside to close
 */
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Modal with Click Outside</h3>
        <p className="text-sm text-muted-foreground">Click outside the modal to close it</p>

        <Button onClick={() => setIsOpen(true)} className="w-full">
          Open Modal
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card ref={modalRef} className="p-6 w-80 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Modal Title</h4>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click outside this modal or press the close button to dismiss it. The
                  useOnClickOutside hook handles the outside click detection.
                </p>
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Confirm
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing multiple refs usage (button + menu)
 */
function MultipleRefsDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Pass both refs - clicking either won't close the menu
  useOnClickOutside([buttonRef, menuRef] as React.RefObject<HTMLElement>[], () => {
    setIsOpen(false);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Multiple Refs</h3>
        <p className="text-sm text-muted-foreground">
          The hook monitors both the button and menu. Clicking either won&apos;t close it.
        </p>

        <div className="flex items-start gap-4">
          <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>

          {isOpen && (
            <div ref={menuRef} className="flex-1 rounded-md border bg-card p-4 shadow-sm">
              <p className="text-sm font-medium mb-2">Quick Actions</p>
              <div className="space-y-2">
                <button className="w-full text-left text-sm px-2 py-1 hover:bg-accent rounded">
                  New Document
                </button>
                <button className="w-full text-left text-sm px-2 py-1 hover:bg-accent rounded">
                  Open Recent
                </button>
                <button className="w-full text-left text-sm px-2 py-1 hover:bg-accent rounded">
                  Save All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Menu is:{' '}
          <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Open' : 'Closed'}</Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing popover/tooltip usage
 */
function PopoverDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popoverRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Info Popover</h3>
        <p className="text-sm text-muted-foreground">Click the info icon to show details</p>

        <div className="flex items-center gap-4">
          <p className="text-sm">Need help with this feature?</p>
          <div className="relative" ref={popoverRef}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Info className="h-4 w-4" />
            </Button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border bg-popover p-4 shadow-lg z-10">
                <h5 className="font-semibold text-sm mb-2">Feature Information</h5>
                <p className="text-xs text-muted-foreground">
                  This is a helpful popover that provides additional context. It automatically
                  closes when you click outside of it, thanks to the useOnClickOutside hook!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Popover is:{' '}
          <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Open' : 'Closed'}</Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing the enabled parameter
 */
function ConditionalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    dropdownRef as React.RefObject<HTMLDivElement>,
    () => {
      setIsOpen(false);
    },
    isEnabled // Only close on outside click when enabled
  );

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conditional Click Outside</h3>
        <p className="text-sm text-muted-foreground">
          Toggle to enable/disable outside click behavior
        </p>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm font-medium">Enable Outside Click</span>
          <Button
            onClick={() => setIsEnabled(!isEnabled)}
            variant={isEnabled ? 'default' : 'outline'}
            size="sm"
          >
            {isEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="w-full">
            {isOpen ? 'Close Menu' : 'Open Menu'}
          </Button>

          {isOpen && (
            <div className="mt-2 rounded-md border bg-card p-4">
              <p className="text-sm">
                {isEnabled
                  ? 'Click outside to close this menu'
                  : 'Outside clicks are disabled - use the button to close'}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 text-xs text-muted-foreground">
          <div>
            Hook:{' '}
            <Badge variant={isEnabled ? 'default' : 'secondary'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div>
            Menu:{' '}
            <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Open' : 'Closed'}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing nested elements (clicks on children don't close)
 */
function NestedElementsDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nested Elements</h3>
        <p className="text-sm text-muted-foreground">
          Clicks on nested children don&apos;t trigger outside click
        </p>

        <Button onClick={() => setIsOpen(true)} className="w-full">
          Open Panel
        </Button>

        {isOpen && (
          <div ref={containerRef} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Settings Panel</p>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm hover:bg-accent rounded">
                Click me - I&apos;m inside, so panel stays open
              </button>
              <div className="p-2 border rounded">
                <p className="text-xs text-muted-foreground">
                  Even deeply nested elements like this text won&apos;t close the panel
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Another nested button
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Panel is:{' '}
          <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Open' : 'Closed'}</Badge>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof DropdownDemo> = {
  title: 'Hooks/useOnClickOutside',
  component: DropdownDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that detects clicks outside of specified element(s). Perfect for implementing dropdowns, modals, popovers, and any UI that should close when clicking outside. Supports single or multiple refs, mouse and touch events, and conditional behavior.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
  render: () => <DropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic dropdown menu that closes when clicking outside. The most common use case for this hook.',
      },
    },
  },
};

export const Modal: Story = {
  render: () => <ModalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Modal/dialog that can be dismissed by clicking outside. Great for non-critical dialogs that should be easy to dismiss.',
      },
    },
  },
};

export const MultipleRefs: Story = {
  render: () => <MultipleRefsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Example using multiple refs. The hook monitors both the button and menu - clicking either one will not trigger the outside click handler.',
      },
    },
  },
};

export const Popover: Story = {
  render: () => <PopoverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Info popover that closes when clicking outside. Useful for contextual help and tooltips.',
      },
    },
  },
};

export const ConditionalBehavior: Story = {
  render: () => <ConditionalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the optional `enabled` parameter. When disabled, outside clicks are ignored. Useful for locking UI or preventing accidental dismissal.',
      },
    },
  },
};

export const NestedElements: Story = {
  render: () => <NestedElementsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows that clicks on nested child elements are correctly identified as "inside" clicks and won\'t trigger the handler. The hook uses element.contains() to check the entire subtree.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DropdownDemo />
      <PopoverDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useOnClickOutside hook working simultaneously without interference.',
      },
    },
  },
};
