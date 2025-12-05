import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Check, X } from 'lucide-react';

import { useBoolean } from '../hooks/use-boolean';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useBoolean hook
 */
function UseBooleanDemo() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useBoolean Hook Demo</h3>
          <Badge variant={value ? 'default' : 'secondary'}>
            {value ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                True
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" />
                False
              </>
            )}
          </Badge>
        </div>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-4xl font-bold">{value ? 'TRUE' : 'FALSE'}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={setTrue} variant="default" className="w-full">
            Set True
          </Button>
          <Button onClick={setFalse} variant="secondary" className="w-full">
            Set False
          </Button>
          <Button onClick={toggle} variant="outline" className="w-full">
            Toggle
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing visibility toggle use case
 */
function VisibilityToggleDemo() {
  const { value: isVisible, toggle } = useBoolean(true);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Visibility Toggle</h3>
          <Button onClick={toggle} variant="outline" size="sm">
            {isVisible ? 'Hide' : 'Show'}
          </Button>
        </div>

        {isVisible && (
          <div className="rounded-lg border border-primary p-4 bg-primary/5">
            <p className="text-sm">
              This content can be toggled on and off using the useBoolean hook!
            </p>
          </div>
        )}

        {!isVisible && (
          <div className="rounded-lg border border-dashed p-4 text-center text-muted-foreground">
            <p className="text-sm">Content is hidden</p>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing modal/dialog use case
 */
function ModalDemo() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Modal Control Demo</h3>

        <Button onClick={open} className="w-full">
          Open Modal
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="p-6 w-80 shadow-lg">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Modal Title</h4>
                <p className="text-sm text-muted-foreground">
                  This is a simple modal controlled by the useBoolean hook.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button onClick={close} variant="outline">
                    Close
                  </Button>
                  <Button onClick={close}>Confirm</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Modal is currently: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing loading state use case
 */
function LoadingStateDemo() {
  const { value: isLoading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(false);

  const handleClick = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading State Demo</h3>

        <Button onClick={handleClick} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Loading...
            </>
          ) : (
            'Simulate Loading'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Click the button to simulate a 2-second loading state
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseBooleanDemo> = {
  title: 'Hooks/useBoolean',
  component: UseBooleanDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing boolean state with convenient helper functions like setTrue, setFalse, and toggle. Perfect for handling flags, toggles, visibility states, and more.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseBooleanDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useBoolean hook showing all available methods.',
      },
      source: {
        code: `import { useBoolean } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <>
      <p>Value: {value ? 'True' : 'False'}</p>
      <Button onClick={setTrue}>Set True</Button>
      <Button onClick={setFalse}>Set False</Button>
      <Button onClick={toggle}>Toggle</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const VisibilityToggle: Story = {
  render: () => <VisibilityToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A common use case: toggling visibility of content.',
      },
      source: {
        code: `import { useBoolean } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value: isVisible, toggle } = useBoolean(true);

  return (
    <>
      <Button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'}
      </Button>
      {isVisible && <div>This content can be toggled!</div>}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ModalControl: Story = {
  render: () => <ModalDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Using useBoolean to control modal/dialog open/close state.',
      },
      source: {
        code: `import { useBoolean } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <div>
          <p>Modal content</p>
          <Button onClick={close}>Close</Button>
        </div>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <LoadingStateDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Managing loading states with useBoolean hook.',
      },
      source: {
        code: `import { useBoolean } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value: isLoading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(false);

  const handleClick = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Start Action'}
    </Button>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UseBooleanDemo />
      <VisibilityToggleDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useBoolean hook working together.',
      },
    },
  },
};
