import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

import { useDebounceValue } from '../hooks/use-debounce-value';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

/**
 * Demo component that uses the useDebounceValue hook for search
 */
function SearchDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount((prev) => prev + 1);
    }
  }, [debouncedSearchTerm]);

  const mockResults = debouncedSearchTerm
    ? [
        `Result 1 for "${debouncedSearchTerm}"`,
        `Result 2 for "${debouncedSearchTerm}"`,
        `Result 3 for "${debouncedSearchTerm}"`,
      ]
    : [];

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Search with Debounce</h3>
          <Badge variant="secondary">500ms delay</Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Current Input:</p>
              <p className="font-mono font-semibold truncate">
                {searchTerm || '(empty)'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Debounced Value:</p>
              <p className="font-mono font-semibold truncate">
                {debouncedSearchTerm || '(empty)'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Search Results</p>
            <Badge variant="outline" className="text-xs">
              {searchCount} searches
            </Badge>
          </div>
          {mockResults.length > 0 ? (
            <ul className="space-y-1">
              {mockResults.map((result, index) => (
                <li
                  key={index}
                  className="text-sm p-2 rounded border bg-card hover:bg-accent"
                >
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded">
              Start typing to see results...
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          API calls are only made 500ms after you stop typing
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing price filter with debounce
 */
function PriceFilterDemo() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const debouncedMinPrice = useDebounceValue(minPrice, 300);
  const debouncedMaxPrice = useDebounceValue(maxPrice, 300);
  const [filterAppliedCount, setFilterAppliedCount] = useState(0);

  useEffect(() => {
    setFilterAppliedCount((prev) => prev + 1);
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const products = [
    { name: 'Budget Item', price: 50 },
    { name: 'Mid Range Product', price: 300 },
    { name: 'Premium Item', price: 700 },
    { name: 'Luxury Product', price: 1200 },
  ];

  const filteredProducts = products.filter(
    (p) => p.price >= debouncedMinPrice && p.price <= debouncedMaxPrice
  );

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Price Filter</h3>
          <Badge variant="secondary">300ms delay</Badge>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Min Price</Label>
              <Badge variant="outline" className="font-mono">
                ${minPrice}
              </Badge>
            </div>
            <Slider
              value={[minPrice]}
              onValueChange={(value) => setMinPrice(value[0])}
              max={1000}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Max Price</Label>
              <Badge variant="outline" className="font-mono">
                ${maxPrice}
              </Badge>
            </div>
            <Slider
              value={[maxPrice]}
              onValueChange={(value) => setMaxPrice(value[0])}
              max={1500}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Current Range:</p>
              <p className="font-mono font-semibold">
                ${minPrice} - ${maxPrice}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Applied Range:</p>
              <p className="font-mono font-semibold">
                ${debouncedMinPrice} - ${debouncedMaxPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Filtered Products</p>
            <Badge variant="outline" className="text-xs">
              {filterAppliedCount - 1} filter updates
            </Badge>
          </div>
          {filteredProducts.length > 0 ? (
            <ul className="space-y-1">
              {filteredProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm p-2 rounded border bg-card"
                >
                  <span>{product.name}</span>
                  <Badge variant="secondary" className="font-mono">
                    ${product.price}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded">
              No products in this price range
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Filters are applied 300ms after you stop adjusting the sliders
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing form input with live preview
 */
function LivePreviewDemo() {
  const [text, setText] = useState('');
  const debouncedText = useDebounceValue(text, 400);
  const [saveCount, setSaveCount] = useState(0);

  useEffect(() => {
    if (debouncedText) {
      setSaveCount((prev) => prev + 1);
    }
  }, [debouncedText]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Live Preview Editor</h3>
          <Badge variant="secondary">400ms delay</Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="editor">Type your message</Label>
          <textarea
            id="editor"
            placeholder="Start typing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <p className="text-xs text-muted-foreground">
            {text.length} characters (typing...)
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Auto-saved Preview</Label>
            <Badge variant="outline" className="text-xs">
              {saveCount} auto-saves
            </Badge>
          </div>
          <div className="rounded-lg border p-4 bg-muted/30 min-h-[100px]">
            {debouncedText ? (
              <p className="text-sm whitespace-pre-wrap">{debouncedText}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Preview will appear here after 400ms of inactivity...
              </p>
            )}
          </div>
          {debouncedText && (
            <p className="text-xs text-muted-foreground">
              {debouncedText.length} characters (saved)
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Changes are auto-saved 400ms after you stop typing
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing comparison with different delays
 */
function DelayComparisonDemo() {
  const [value, setValue] = useState('');
  const debounced100 = useDebounceValue(value, 100);
  const debounced500 = useDebounceValue(value, 500);
  const debounced1000 = useDebounceValue(value, 1000);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delay Comparison</h3>

        <div className="space-y-2">
          <Label htmlFor="input">Type here</Label>
          <Input
            id="input"
            placeholder="Type to see different delays..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border p-3 bg-muted/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  100ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {debounced100 || '(waiting...)'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  500ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {debounced500 || '(waiting...)'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  1000ms
                </Badge>
                <p className="text-xs font-mono truncate ml-2 flex-1 text-right">
                  {debounced1000 || '(waiting...)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Watch how different delay values affect when the debounced value updates
        </p>
      </div>
    </Card>
  );
}

/**
 * Demo component showing complex object debouncing
 */
function ComplexObjectDemo() {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: '',
  });
  const debouncedFilters = useDebounceValue(filters, 500);
  const [apiCallCount, setApiCallCount] = useState(0);

  useEffect(() => {
    if (
      debouncedFilters.category ||
      debouncedFilters.status ||
      debouncedFilters.priority
    ) {
      setApiCallCount((prev) => prev + 1);
    }
  }, [debouncedFilters]);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Complex Object Filters</h3>
          <Badge variant="secondary">500ms delay</Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Electronics"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              placeholder="e.g., Active"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              placeholder="e.g., High"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            />
          </div>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="space-y-2 text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Current Filters:</p>
              <pre className="font-mono bg-background p-2 rounded border text-[10px] overflow-x-auto">
                {JSON.stringify(filters, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Applied Filters:</p>
              <pre className="font-mono bg-background p-2 rounded border text-[10px] overflow-x-auto">
                {JSON.stringify(debouncedFilters, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            <Filter className="inline h-4 w-4 mr-1" />
            API Calls Made
          </p>
          <Badge variant="outline">{apiCallCount}</Badge>
        </div>

        <p className="text-xs text-muted-foreground">
          All filters are debounced together as a single object
        </p>
      </div>
    </Card>
  );
}

const meta: Meta<typeof SearchDebounceDemo> = {
  title: 'Hooks/useDebounceValue',
  component: SearchDebounceDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom hook that debounces a value by a specified delay. Perfect for preventing excessive updates when dealing with rapidly changing values like search inputs, form fields, or filter controls. Supports TypeScript generics for type-safe debouncing of any value type.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchInput: Story = {
  render: () => <SearchDebounceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce search input to prevent API calls on every keystroke. Only searches after the user stops typing for 500ms.',
      },
    },
  },
};

export const PriceFilter: Story = {
  render: () => <PriceFilterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce range slider inputs for filtering products. Multiple values are debounced independently to optimize filter updates.',
      },
    },
  },
};

export const LivePreview: Story = {
  render: () => <LivePreviewDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Auto-save text content with debouncing. Shows how to create a live preview that updates after a brief pause in typing.',
      },
    },
  },
};

export const DelayComparison: Story = {
  render: () => <DelayComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Compare different debounce delay values (100ms, 500ms, 1000ms) to see how they affect update timing.',
      },
    },
  },
};

export const ComplexObject: Story = {
  render: () => <ComplexObjectDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Debounce complex objects like filter configurations. All properties are debounced together to reduce API calls.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchDebounceDemo />
      <DelayComparisonDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple independent instances of the useDebounceValue hook working simultaneously with different values and delays.',
      },
    },
  },
};
