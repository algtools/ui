import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

import { useCounter } from '../hooks/use-counter';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

/**
 * Demo component that uses the useCounter hook
 */
function UseCounterDemo() {
  const { value, increment, decrement, reset, setValue } = useCounter({
    initialValue: 0,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">useCounter Hook Demo</h3>
          <Badge variant="default">{value}</Badge>
        </div>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-5xl font-bold">{value}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => increment()} variant="default" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Increment
          </Button>
          <Button onClick={() => decrement()} variant="secondary" className="w-full">
            <Minus className="mr-2 h-4 w-4" />
            Decrement
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => increment(5)} variant="outline" className="w-full">
            +5
          </Button>
          <Button onClick={() => decrement(5)} variant="outline" className="w-full">
            -5
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setValue(0)} variant="outline" className="flex-1">
            Set to 0
          </Button>
          <Button onClick={reset} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo component showing counter with min/max boundaries
 */
function BoundedCounterDemo() {
  const { value, increment, decrement, reset } = useCounter({
    initialValue: 5,
    min: 0,
    max: 10,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Bounded Counter (0-10)</h3>
          <Badge variant={value === 10 ? 'destructive' : 'default'}>{value}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Min: 0</span>
            <span>Max: 10</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(value / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-5xl font-bold">{value}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => decrement()}
            variant="outline"
            disabled={value === 0}
            className="w-full"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => increment()}
            variant="outline"
            disabled={value === 10}
            className="w-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {value === 0 && (
          <p className="text-xs text-center text-muted-foreground">Minimum value reached</p>
        )}
        {value === 10 && (
          <p className="text-xs text-center text-muted-foreground">Maximum value reached</p>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing quantity selector use case
 */
function QuantitySelectorDemo() {
  const { value, increment, decrement, setValue } = useCounter({
    initialValue: 1,
    min: 1,
    max: 99,
  });

  const price = 29.99;
  const total = (price * value).toFixed(2);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Quantity Selector</h3>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary rounded-md flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Sample Product</p>
              <p className="text-sm text-muted-foreground">{`$${price}`} each</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => decrement()}
              variant="outline"
              size="icon"
              disabled={value === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 text-center">
              <input
                type="number"
                value={value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value) || 1;
                  setValue(newValue);
                }}
                className="w-full text-center border rounded px-2 py-1 bg-background"
                min={1}
                max={99}
              />
            </div>
            <Button
              onClick={() => increment()}
              variant="outline"
              size="icon"
              disabled={value === 99}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-primary/10 border border-primary p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold">{`$${total}`}</span>
          </div>
        </div>

        <Button className="w-full">Add to Cart</Button>
      </div>
    </Card>
  );
}

/**
 * Demo component showing rating selector use case
 */
function RatingDemo() {
  const { value, setValue } = useCounter({
    initialValue: 0,
    min: 0,
    max: 5,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rating Selector</h3>

        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setValue(star)}
                className="text-4xl transition-all hover:scale-110"
              >
                {star <= value ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          {value > 0 && (
            <p className="mt-4 text-lg font-semibold">
              {value === 1 && 'Poor'}
              {value === 2 && 'Fair'}
              {value === 3 && 'Good'}
              {value === 4 && 'Very Good'}
              {value === 5 && 'Excellent'}
            </p>
          )}
        </div>

        {value > 0 && (
          <Button onClick={() => setValue(0)} variant="outline" className="w-full">
            Clear Rating
          </Button>
        )}
      </div>
    </Card>
  );
}

/**
 * Demo component showing timer/stopwatch use case
 */
function TimerDemo() {
  const { value, increment, reset, setValue } = useCounter({
    initialValue: 0,
    min: 0,
  });

  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        increment();
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, increment]);

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Timer Demo</h3>

        <div className="rounded-lg border p-8 text-center bg-secondary/50">
          <p className="text-6xl font-bold font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? 'destructive' : 'default'}
            className="w-full"
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            onClick={() => {
              setIsRunning(false);
              reset();
            }}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={() => {
              setIsRunning(false);
              setValue(60);
            }}
            variant="outline"
            className="w-full"
          >
            +1 min
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">Total seconds: {value}</p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing step input use case
 */
function StepInputDemo() {
  const { value, increment, decrement, setValue } = useCounter({
    initialValue: 50,
    min: 0,
    max: 100,
  });

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Volume Control</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Volume</span>
            <Badge variant="outline">{value}%</Badge>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => decrement(10)} variant="outline" size="sm" disabled={value === 0}>
            -10
          </Button>
          <Button onClick={() => decrement(1)} variant="outline" size="sm" disabled={value === 0}>
            -1
          </Button>
          <Button onClick={() => increment(1)} variant="outline" size="sm" disabled={value === 100}>
            +1
          </Button>
          <Button
            onClick={() => increment(10)}
            variant="outline"
            size="sm"
            disabled={value === 100}
          >
            +10
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => setValue(0)} variant="outline" size="sm" className="text-xs">
            Mute
          </Button>
          <Button onClick={() => setValue(33)} variant="outline" size="sm" className="text-xs">
            Low
          </Button>
          <Button onClick={() => setValue(66)} variant="outline" size="sm" className="text-xs">
            Mid
          </Button>
          <Button onClick={() => setValue(100)} variant="outline" size="sm" className="text-xs">
            Max
          </Button>
        </div>

        <div className="text-center text-4xl">
          {value === 0 && '🔇'}
          {value > 0 && value < 33 && '🔈'}
          {value >= 33 && value < 66 && '🔉'}
          {value >= 66 && '🔊'}
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseCounterDemo> = {
  title: 'Hooks/useCounter',
  component: UseCounterDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook for managing counter state with increment, decrement, reset, and setValue functionality. Supports min/max boundaries and custom step values. Perfect for quantity selectors, ratings, timers, and more.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseCounterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useCounter hook showing all available methods including increment, decrement, reset, and setValue.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, increment, decrement, reset, setValue } = useCounter({
    initialValue: 0,
  });

  return (
    <>
      <p className="text-5xl font-bold">{value}</p>
      <Button onClick={() => increment()}>Increment</Button>
      <Button onClick={() => decrement()}>Decrement</Button>
      <Button onClick={() => increment(5)}>+5</Button>
      <Button onClick={() => decrement(5)}>-5</Button>
      <Button onClick={() => setValue(0)}>Set to 0</Button>
      <Button onClick={reset}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const BoundedCounter: Story = {
  render: () => <BoundedCounterDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Counter with min and max boundaries. The counter cannot go below 0 or above 10.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, increment, decrement, reset } = useCounter({
    initialValue: 5,
    min: 0,
    max: 10,
  });

  return (
    <>
      <p>Value: {value} (Min: 0, Max: 10)</p>
      <Button onClick={() => increment()} disabled={value >= 10}>
        Increment
      </Button>
      <Button onClick={() => decrement()} disabled={value <= 0}>
        Decrement
      </Button>
      <Button onClick={reset}>Reset</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const QuantitySelector: Story = {
  render: () => <QuantitySelectorDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A common use case: product quantity selector with price calculation.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, increment, decrement, setValue } = useCounter({
    initialValue: 1,
    min: 1,
    max: 99,
  });

  const price = 29.99;
  const total = (price * value).toFixed(2);

  return (
    <>
      <p>Product: {'$' + price} each</p>
      <div className="flex items-center gap-2">
        <Button onClick={() => decrement()} disabled={value === 1}>-</Button>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 1)}
          min={1}
          max={99}
        />
        <Button onClick={() => increment()} disabled={value === 99}>+</Button>
      </div>
      <p>Total: {'$' + total}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const RatingSelector: Story = {
  render: () => <RatingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Using useCounter to create a 5-star rating selector.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';

function MyComponent() {
  const { value, setValue } = useCounter({
    initialValue: 0,
    min: 0,
    max: 5,
  });

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setValue(star)}
        >
          {star <= value ? '⭐' : '☆'}
        </button>
      ))}
      {value > 0 && <p>Rating: {value} stars</p>}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const Timer: Story = {
  render: () => <TimerDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Creating a simple timer/stopwatch using useCounter with automatic increment.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';
import { useState, useEffect } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, increment, reset, setValue } = useCounter({
    initialValue: 0,
    min: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => increment(), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, increment]);

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return (
    <>
      <p className="text-6xl font-bold font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button onClick={() => { setIsRunning(false); reset(); }}>
        Reset
      </Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const StepInput: Story = {
  render: () => <StepInputDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Volume control example showing counter with range slider and preset values.',
      },
      source: {
        code: `import { useCounter } from '@algtools/ui';
import { Button } from '@algtools/ui';

function MyComponent() {
  const { value, increment, decrement, setValue } = useCounter({
    initialValue: 50,
    min: 0,
    max: 100,
  });

  return (
    <>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <p>Value: {value}</p>
      <Button onClick={() => decrement(10)}>-10</Button>
      <Button onClick={() => increment(10)}>+10</Button>
      <Button onClick={() => setValue(25)}>25%</Button>
      <Button onClick={() => setValue(50)}>50%</Button>
      <Button onClick={() => setValue(75)}>75%</Button>
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
      <BoundedCounterDemo />
      <QuantitySelectorDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent instances of the useCounter hook working together.',
      },
    },
  },
};
