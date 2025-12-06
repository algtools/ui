import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Trash2, Save, RotateCcw } from 'lucide-react';

import { useLocalStorage } from '../hooks/use-local-storage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Switch } from '../components/ui/switch';

/**
 * Demo component that uses the useLocalStorage hook for basic string storage
 */
function UseLocalStorageDemo() {
  const { value, setValue, removeValue, error } = useLocalStorage('demo-text', 'Hello, World!');

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useLocalStorage Hook Demo</h3>
          <Badge variant="outline">localStorage</Badge>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>Error: {error.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="demo-input">Stored Value</Label>
          <Input
            id="demo-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
          <p className="text-xs text-muted-foreground">
            Changes are automatically saved to localStorage
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm font-medium mb-2">Current Value:</p>
          <p className="text-sm font-mono break-all">{value}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={removeValue} variant="destructive" className="flex-1" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={() => setValue('Hello, World!')}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing counter with localStorage persistence
 */
function CounterDemo() {
  const { value: count, setValue: setCount } = useLocalStorage('counter', 0);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Persistent Counter</h3>
          <Badge variant="secondary">Survives Refresh</Badge>
        </div>

        <div className="rounded-lg border p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
          <p className="text-6xl font-bold tabular-nums">{count}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => setCount((c) => c - 1)} variant="outline">
            -1
          </Button>
          <Button onClick={() => setCount(0)} variant="secondary">
            Reset
          </Button>
          <Button onClick={() => setCount((c) => c + 1)} variant="default">
            +1
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Try refreshing the page - your count persists!
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing user preferences with localStorage
 */
function UserPreferencesDemo() {
  interface Preferences {
    notifications: boolean;
    autoSave: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  }

  const {
    value: prefs,
    setValue: setPrefs,
    removeValue,
  } = useLocalStorage<Preferences>('user-preferences', {
    notifications: true,
    autoSave: false,
    theme: 'system',
    language: 'en',
  });

  const updatePref = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">User Preferences</h3>
          <Button onClick={removeValue} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch
              id="notifications"
              checked={prefs.notifications}
              onCheckedChange={(checked) => updatePref('notifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave">Auto Save</Label>
            <Switch
              id="autoSave"
              checked={prefs.autoSave}
              onCheckedChange={(checked) => updatePref('autoSave', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              value={prefs.theme}
              onChange={(e) => updatePref('theme', e.target.value as Preferences['theme'])}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={prefs.language}
              onChange={(e) => updatePref('language', e.target.value)}
              placeholder="Language code"
            />
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <p className="text-xs font-medium mb-1">Stored Preferences:</p>
          <pre className="text-xs font-mono overflow-auto">{JSON.stringify(prefs, null, 2)}</pre>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing shopping cart with localStorage
 */
function ShoppingCartDemo() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  const {
    value: cart,
    setValue: setCart,
    removeValue,
  } = useLocalStorage<CartItem[]>('shopping-cart', []);

  const addItem = () => {
    const newItem: CartItem = {
      id: Date.now(),
      name: `Item ${cart.length + 1}`,
      price: Math.floor(Math.random() * 50) + 10,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <Badge variant="outline">{cart.length} items</Badge>
        </div>

        <div className="space-y-2 max-h-64 overflow-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 border rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{`$${item.price}`}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    -
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold">{`$${total.toFixed(2)}`}</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={addItem} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button onClick={removeValue} variant="outline" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Cart persists across page refreshes
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing form data persistence
 */
function FormPersistenceDemo() {
  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const {
    value: formData,
    setValue: setFormData,
    removeValue,
  } = useLocalStorage<FormData>('contact-form', {
    name: '',
    email: '',
    message: '',
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert('Form submitted! (In reality, this would send data to a server)');
    removeValue();
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Contact Form</h3>
          <Badge variant="secondary">Auto-saved</Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="Your message here..."
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="flex-1">
            Submit
          </Button>
          <Button onClick={removeValue} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            Your form data is automatically saved as you type. Try refreshing the page!
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

/**
 * Demo component showing error handling
 */
function ErrorHandlingDemo() {
  const [shouldError, setShouldError] = React.useState(false);
  const { value, setValue, error } = useLocalStorage('error-demo', 'normal value');

  React.useEffect(() => {
    if (shouldError) {
      // Attempt to set a value that would exceed quota (simulate)
      // In reality, we can't easily trigger this in a demo
      console.warn('Error simulation enabled');
    }
  }, [shouldError]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Error Handling</h3>
          <Badge variant={error ? 'destructive' : 'default'}>{error ? 'Error' : 'OK'}</Badge>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              <p className="font-medium">Storage Error</p>
              <p className="text-xs mt-1">{error.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="error-input">Value</Label>
          <Input
            id="error-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Simulate Error</span>
          <Switch checked={shouldError} onCheckedChange={setShouldError} />
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            The hook gracefully handles storage quota errors and other localStorage failures.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseLocalStorageDemo> = {
  title: 'Hooks/useLocalStorage',
  component: UseLocalStorageDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing state that persists to localStorage with automatic JSON serialization. Features SSR support, error handling, and cross-tab synchronization.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseLocalStorageDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useLocalStorage hook with string values.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';
import { Input } from '@algtools/ui';

function MyComponent() {
  const { value, setValue, removeValue, error } = useLocalStorage('demo-text', 'Hello, World!');

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Current Value: {value}</p>
      <Button onClick={removeValue}>Clear</Button>
      <Button onClick={() => setValue('Hello, World!')}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Counter: Story = {
  render: () => <CounterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A persistent counter that survives page refreshes. Demonstrates numeric value storage.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value: count, setValue: setCount } = useLocalStorage('counter', 0);

  return (
    <>
      <p className="text-6xl font-bold">{count}</p>
      <Button onClick={() => setCount((c) => c - 1)}>-1</Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const UserPreferences: Story = {
  render: () => <UserPreferencesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Complex object storage for user preferences. Shows how to work with typed interfaces.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';

interface Preferences {
  notifications: boolean;
  autoSave: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

function MyComponent() {
  const {
    value: prefs,
    setValue: setPrefs,
    removeValue,
  } = useLocalStorage<Preferences>('user-preferences', {
    notifications: true,
    autoSave: false,
    theme: 'system',
    language: 'en',
  });

  const updatePref = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Switch
        checked={prefs.notifications}
        onCheckedChange={(checked) => updatePref('notifications', checked)}
      />
      <select
        value={prefs.theme}
        onChange={(e) => updatePref('theme', e.target.value as Preferences['theme'])}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ShoppingCart: Story = {
  render: () => <ShoppingCartDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'A shopping cart that persists items across sessions. Demonstrates array storage and manipulation.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function MyComponent() {
  const {
    value: cart,
    setValue: setCart,
    removeValue,
  } = useLocalStorage<CartItem[]>('shopping-cart', []);

  const addItem = () => {
    const newItem: CartItem = {
      id: Date.now(),
      name: \`Item \${cart.length + 1}\`,
      price: Math.floor(Math.random() * 50) + 10,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name} - {`$${item.price}`} x {item.quantity}</p>
          <Button onClick={() => removeItem(item.id)}>Remove</Button>
        </div>
      ))}
      <Button onClick={addItem}>Add Item</Button>
      <p>Total: {`$${total.toFixed(2)}`}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const FormPersistence: Story = {
  render: () => <FormPersistenceDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Auto-saving form data to prevent loss on accidental page refresh or navigation.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';
import { Input } from '@algtools/ui';

function MyComponent() {
  const { value: formData, setValue: setFormData } = useLocalStorage('form-data', {
    name: '',
    email: '',
    message: '',
  });

  return (
    <>
      <Input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <Input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Message"
      />
      <p>Form data is automatically saved to localStorage</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ErrorHandling: Story = {
  render: () => <ErrorHandlingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of error handling for storage quota and other localStorage failures.',
      },
      source: {
        code: `import { useLocalStorage } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, setValue, error, removeValue } = useLocalStorage('data', 'initial');

  return (
    <>
      {error && (
        <div className="error">
          <p>Error: {error.message}</p>
          <p>Storage may be full or unavailable</p>
        </div>
      )}
      <Button onClick={() => setValue('test')}>Set Value</Button>
      <Button onClick={removeValue}>Clear</Button>
      <p>Current value: {value}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <UseLocalStorageDemo />
      <CounterDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of useLocalStorage working simultaneously.',
      },
    },
  },
};
