import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Plus, X, RotateCcw, Trash2 } from 'lucide-react';

import { useMap } from '../hooks/use-map';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

/**
 * Demo component that uses the useMap hook
 */
function UseMapDemo() {
  const { value, set, remove, clear, reset, size } = useMap<string, number>([
    ['apples', 5],
    ['oranges', 3],
  ]);

  const [key, setKey] = React.useState('');
  const [val, setVal] = React.useState('');

  const handleAdd = () => {
    if (key && val) {
      set(key, parseInt(val) || 0);
      setKey('');
      setVal('');
    }
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useMap Hook Demo</h3>
          <Badge variant="default">Size: {size}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Value"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="flex-1"
            />
          </div>
          <Button onClick={handleAdd} className="w-full" disabled={!key || !val}>
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>

        <div className="rounded-lg border p-3 max-h-48 overflow-y-auto">
          {size === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No entries</p>
          ) : (
            <div className="space-y-2">
              {Array.from(value.entries()).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between p-2 rounded bg-secondary/50"
                >
                  <div className="flex-1">
                    <span className="font-medium text-sm">{k}:</span>{' '}
                    <span className="text-sm">{v}</span>
                  </div>
                  <Button onClick={() => remove(k)} variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={reset} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={clear} variant="outline" className="flex-1">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing shopping cart use case
 */
function ShoppingCartDemo() {
  interface Product {
    name: string;
    price: number;
  }

  const { value: cart, set, remove, clear, size } = useMap<string, Product>();

  const products = [
    { id: 'prod1', name: 'Laptop', price: 999 },
    { id: 'prod2', name: 'Mouse', price: 29 },
    { id: 'prod3', name: 'Keyboard', price: 79 },
    { id: 'prod4', name: 'Monitor', price: 299 },
  ];

  const total = Array.from(cart.values()).reduce((sum, item) => sum + item.price, 0);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <Badge variant="default">{size} items</Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Available Products:</p>
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-2 rounded border">
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{`$${product.price}`}</p>
              </div>
              <Button
                onClick={() => set(product.id, { name: product.name, price: product.price })}
                variant="outline"
                size="sm"
                disabled={cart.has(product.id)}
              >
                {cart.has(product.id) ? 'Added' : 'Add'}
              </Button>
            </div>
          ))}
        </div>

        {size > 0 && (
          <>
            <div className="rounded-lg border p-3 bg-primary/5">
              <p className="text-sm font-medium mb-2">Cart Items:</p>
              <div className="space-y-2">
                {Array.from(cart.entries()).map(([id, product]) => (
                  <div key={id} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{`$${product.price}`}</span>
                      <Button
                        onClick={() => remove(id)}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">{`$${total}`}</span>
            </div>

            <Button onClick={clear} variant="outline" className="w-full">
              Clear Cart
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing form state management
 */
function FormStateDemo() {
  const { value: formData, set, get, clear, size } = useMap<string, string>();

  const fields = [
    { key: 'name', label: 'Name', placeholder: 'John Doe' },
    { key: 'email', label: 'Email', placeholder: 'john@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '+1 234 567 8900' },
  ];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Form State Manager</h3>
          <Badge variant="outline">
            {size}/{fields.length} filled
          </Badge>
        </div>

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-sm font-medium">{field.label}</label>
              <Input
                placeholder={field.placeholder}
                value={get(field.key) || ''}
                onChange={(e) => set(field.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {size > 0 && (
          <div className="rounded-lg border p-3 bg-secondary/50">
            <p className="text-xs font-medium mb-2">Current Values:</p>
            <div className="space-y-1">
              {Array.from(formData.entries()).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => {
              fields.forEach((field) => set(field.key, field.placeholder));
            }}
            variant="outline"
            className="flex-1"
          >
            Fill Demo
          </Button>
          <Button onClick={clear} variant="outline" className="flex-1">
            Clear All
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing cache/memoization use case
 */
function CacheDemo() {
  const { value: cache, set, has, clear, size } = useMap<number, string>();
  const [input, setInput] = React.useState('');

  const handleCompute = () => {
    const num = parseInt(input);
    if (isNaN(num)) return;

    if (has(num)) {
      console.log('Cache hit!');
    } else {
      console.log('Cache miss - computing...');
      // Simulate expensive computation
      set(num, `Result for ${num}: ${num * num}`);
    }
    setInput('');
  };

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Computation Cache</h3>
          <Badge variant="default">{size} cached</Badge>
        </div>

        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Enter a number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCompute()}
          />
          <Button onClick={handleCompute} className="w-full" disabled={!input}>
            Compute (Check Console)
          </Button>
        </div>

        <div className="rounded-lg border p-3 max-h-48 overflow-y-auto">
          {size === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No cached results</p>
          ) : (
            <div className="space-y-2">
              {Array.from(cache.entries()).map(([key, value]) => (
                <div key={key} className="p-2 rounded bg-secondary/50">
                  <p className="text-xs font-medium">Input: {key}</p>
                  <p className="text-xs text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={clear} variant="outline" className="w-full">
          Clear Cache
        </Button>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseMapDemo> = {
  title: 'Hooks/useMap',
  component: UseMapDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing Map data structure state with convenient helper functions like set, get, remove, has, clear, reset, and setAll. Perfect for key-value storage, caching, and dynamic data management.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseMapDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useMap hook showing all available methods.',
      },
      source: {
        code: `import { useMap } from '@algtools/ui';
import { Button, Input } from '@algtools/ui';

function MyComponent() {
  const { value, set, remove, clear, reset, size } = useMap<string, number>([
    ['apples', 5],
    ['oranges', 3],
  ]);

  return (
    <>
      <p>Size: {size}</p>
      {Array.from(value.entries()).map(([key, val]) => (
        <div key={key}>
          {key}: {val}
          <Button onClick={() => remove(key)}>Remove</Button>
        </div>
      ))}
      <Button onClick={() => set('bananas', 2)}>Add Entry</Button>
      <Button onClick={clear}>Clear All</Button>
      <Button onClick={reset}>Reset</Button>
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
        story: 'Shopping cart implementation using useMap to manage cart items.',
      },
      source: {
        code: `import { useMap } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value: cart, set, remove, clear } = useMap<string, number>([
    ['item1', 2],
    ['item2', 1],
  ]);

  const total = Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      {Array.from(cart.entries()).map(([itemId, quantity]) => (
        <div key={itemId}>
          Item {itemId}: {quantity}
          <Button onClick={() => remove(itemId)}>Remove</Button>
        </div>
      ))}
      <p>Total items: {total}</p>
      <Button onClick={clear}>Clear Cart</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const FormState: Story = {
  render: () => <FormStateDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Managing form state with useMap for dynamic field values.',
      },
      source: {
        code: `import { useMap } from '@algtools/ui';
import { Input } from '@algtools/ui';

function MyComponent() {
  const { value: formData, set } = useMap<string, string>([
    ['name', ''],
    ['email', ''],
  ]);

  return (
    <>
      <Input
        value={formData.get('name') || ''}
        onChange={(e) => set('name', e.target.value)}
        placeholder="Name"
      />
      <Input
        value={formData.get('email') || ''}
        onChange={(e) => set('email', e.target.value)}
        placeholder="Email"
      />
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Cache: Story = {
  render: () => <CacheDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Using useMap as a computation cache/memoization layer. Check console for cache hits/misses.',
      },
      source: {
        code: `import { useMap } from '@algtools/ui';
import { useState } from 'react';
import { Input } from '@algtools/ui';

function MyComponent() {
  const [input, setInput] = useState('');
  const { value: cache, set, has } = useMap<string, number>();

  const expensiveCalculation = (value: string): number => {
    if (has(value)) {
      console.log('Cache hit!');
      return cache.get(value)!;
    }
    console.log('Cache miss - computing...');
    const result = value.length * 100; // Expensive operation
    set(value, result);
    return result;
  };

  const result = expensiveCalculation(input);

  return (
    <>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Result: {result}</p>
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
    <div className="flex flex-col gap-4">
      <UseMapDemo />
      <ShoppingCartDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useMap hook working together.',
      },
    },
  },
};
