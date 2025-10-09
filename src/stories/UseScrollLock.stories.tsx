import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Lock, Unlock } from 'lucide-react';

import { useScrollLock } from '../hooks/use-scroll-lock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useScrollLock hook
 */
function UseScrollLockDemo() {
  const { isLocked, lock, unlock, toggle } = useScrollLock();

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useScrollLock Hook Demo</h3>
          <Badge variant={isLocked ? 'destructive' : 'default'}>
            {isLocked ? (
              <>
                <Lock className="mr-1 h-3 w-3" />
                Locked
              </>
            ) : (
              <>
                <Unlock className="mr-1 h-3 w-3" />
                Unlocked
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-4xl mb-2">{isLocked ? '🔒' : '🔓'}</p>
          <p className="text-sm text-muted-foreground">
            Scroll is currently <strong>{isLocked ? 'locked' : 'unlocked'}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={lock} variant="default" className="w-full" disabled={isLocked}>
            Lock Scroll
          </Button>
          <Button onClick={unlock} variant="secondary" className="w-full" disabled={!isLocked}>
            Unlock Scroll
          </Button>
          <Button onClick={toggle} variant="outline" className="w-full">
            Toggle Scroll Lock
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Try scrolling the page when locked</p>
          <p>• Notice the scrollbar width is preserved</p>
          <p>• No layout shift occurs</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing modal use case
 */
function ModalDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLocked } = useScrollLock({ enabled: isOpen });

  return (
    <div>
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Modal with Scroll Lock</h3>

          <Button onClick={() => setIsOpen(true)} className="w-full">
            Open Modal
          </Button>

          <p className="text-xs text-muted-foreground">
            Scroll is currently: <strong>{isLocked ? 'Locked' : 'Unlocked'}</strong>
          </p>
        </div>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6 w-96 shadow-lg max-h-[80vh] overflow-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Modal Title</h4>
                <Badge variant="destructive">
                  <Lock className="mr-1 h-3 w-3" />
                  Scroll Locked
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  This modal uses the useScrollLock hook to prevent scrolling on the body element
                  while the modal is open.
                </p>
                <p>
                  Notice that the scrollbar width is preserved, so there&apos;s no layout shift when
                  the modal opens.
                </p>
                <p>You can still scroll within this modal if the content is longer.</p>

                {/* Add extra content to make modal scrollable */}
                <div className="mt-4 space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <p key={i} className="text-xs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button onClick={() => setIsOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/**
 * Demo component showing nested modals use case
 */
function NestedModalsDemo() {
  const [isFirstOpen, setIsFirstOpen] = React.useState(false);
  const [isSecondOpen, setIsSecondOpen] = React.useState(false);

  // Each modal has its own scroll lock
  useScrollLock({ enabled: isFirstOpen });
  useScrollLock({ enabled: isSecondOpen });

  return (
    <div>
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nested Modals Demo</h3>

          <Button onClick={() => setIsFirstOpen(true)} className="w-full">
            Open First Modal
          </Button>

          <p className="text-xs text-muted-foreground">
            This demo shows how the hook handles nested locks. When both modals are open, scroll
            remains locked. It only unlocks when all modals are closed.
          </p>
        </div>
      </Card>

      {/* First Modal */}
      {isFirstOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6 w-96 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">First Modal</h4>
                <Badge variant="destructive">Modal 1</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                This is the first modal. Open the second modal to see how nested locks work.
              </p>

              <Button onClick={() => setIsSecondOpen(true)} className="w-full" variant="outline">
                Open Second Modal
              </Button>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  onClick={() => {
                    setIsFirstOpen(false);
                    setIsSecondOpen(false);
                  }}
                  variant="outline"
                >
                  Close All
                </Button>
                <Button onClick={() => setIsFirstOpen(false)}>Close</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Second Modal */}
      {isSecondOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <Card className="p-6 w-80 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Second Modal</h4>
                <Badge variant="destructive">Modal 2</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                This is the second modal. Close this first, and notice the scroll remains locked
                because the first modal is still open.
              </p>

              <Button onClick={() => setIsSecondOpen(false)} className="w-full">
                Close Second Modal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/**
 * Demo component showing sidebar use case
 */
function SidebarDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  useScrollLock({ enabled: isOpen });

  return (
    <div>
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sidebar with Scroll Lock</h3>

          <Button onClick={() => setIsOpen(true)} className="w-full">
            Open Sidebar
          </Button>

          <p className="text-xs text-muted-foreground">
            A common use case for scroll locking is with sidebars and slide-out panels.
          </p>
        </div>
      </Card>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-background shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Sidebar Menu</h4>
            <Badge variant="destructive">
              <Lock className="mr-1 h-3 w-3" />
              Locked
            </Badge>
          </div>

          <div className="space-y-2">
            {['Home', 'Products', 'Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 rounded hover:bg-secondary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full">
            Close Sidebar
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Demo component showing fullscreen overlay use case
 */
function FullscreenOverlayDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLocked } = useScrollLock({ enabled: isOpen });

  return (
    <div>
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Fullscreen Overlay</h3>

          <Button onClick={() => setIsOpen(true)} className="w-full">
            Open Fullscreen View
          </Button>

          <p className="text-xs text-muted-foreground">
            Status: <strong>{isLocked ? 'Scroll Locked' : 'Scroll Active'}</strong>
          </p>
        </div>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-auto">
          <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Fullscreen Content</h2>
                <Button onClick={() => setIsOpen(false)} variant="outline">
                  Close
                </Button>
              </div>

              <Card className="p-6">
                <Badge variant="destructive" className="mb-4">
                  <Lock className="mr-1 h-3 w-3" />
                  Body Scroll Locked
                </Badge>
                <p className="text-muted-foreground mb-4">
                  The main page scroll is locked, but you can still scroll within this overlay. This
                  is useful for fullscreen galleries, presentations, or detailed views.
                </p>

                {/* Add scrollable content */}
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">Section {i + 1}</h3>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris.
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Demo component showing preserve scrollbar width option
 */
function ScrollbarWidthDemo() {
  const [withPreserve, setWithPreserve] = React.useState(false);
  const [withoutPreserve, setWithoutPreserve] = React.useState(false);

  const { isLocked: isLockedWith } = useScrollLock({
    enabled: withPreserve,
    preserveScrollbarWidth: true,
  });

  const { isLocked: isLockedWithout } = useScrollLock({
    enabled: withoutPreserve,
    preserveScrollbarWidth: false,
  });

  return (
    <div className="space-y-4">
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preserve Scrollbar Width</h3>

          <div className="space-y-2">
            <Button
              onClick={() => setWithPreserve(!withPreserve)}
              className="w-full"
              variant={isLockedWith ? 'destructive' : 'default'}
            >
              {isLockedWith ? 'Unlock' : 'Lock'} (With Preserve)
            </Button>
            <p className="text-xs text-muted-foreground">
              No layout shift - scrollbar width is preserved
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Without Preserve</h3>

          <div className="space-y-2">
            <Button
              onClick={() => setWithoutPreserve(!withoutPreserve)}
              className="w-full"
              variant={isLockedWithout ? 'destructive' : 'default'}
            >
              {isLockedWithout ? 'Unlock' : 'Lock'} (Without Preserve)
            </Button>
            <p className="text-xs text-muted-foreground">
              May cause layout shift when scrollbar disappears
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 w-96">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>With preserve (default):</strong> Adds padding-right equal to scrollbar width to
            prevent layout shift
          </p>
          <p>
            <strong>Without preserve:</strong> May cause content to shift when scrollbar is hidden
          </p>
        </div>
      </Card>
    </div>
  );
}

const meta: Meta<typeof UseScrollLockDemo> = {
  title: 'Hooks/useScrollLock',
  component: UseScrollLockDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for locking and unlocking body scroll. Useful for modals, sidebars, and overlays. Prevents scrolling on the body element while preserving scrollbar width to avoid layout shift. Handles nested locks through a counter mechanism.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseScrollLockDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useScrollLock hook showing all available methods: lock, unlock, and toggle.',
      },
    },
  },
};

export const ModalWithScrollLock: Story = {
  render: () => <ModalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A common use case: using scroll lock with modals. The enabled option automatically locks/unlocks based on modal state.',
      },
    },
  },
};

export const NestedModals: Story = {
  render: () => <NestedModalsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates nested scroll locks. Multiple modals can be open, and scroll only unlocks when all are closed.',
      },
    },
  },
};

export const SidebarPanel: Story = {
  render: () => <SidebarDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Using scroll lock with a slide-out sidebar or drawer component.',
      },
    },
  },
};

export const FullscreenOverlay: Story = {
  render: () => <FullscreenOverlayDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Fullscreen overlay with scroll lock. Body scroll is locked while overlay content remains scrollable.',
      },
    },
  },
};

export const PreserveScrollbarWidth: Story = {
  render: () => <ScrollbarWidthDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Comparison showing the effect of preserving scrollbar width vs. not preserving it. The preserveScrollbarWidth option prevents layout shift.',
      },
    },
  },
};
