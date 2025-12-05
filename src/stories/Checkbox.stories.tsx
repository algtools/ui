import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    onCheckedChange: {
      action: 'onCheckedChange',
      description: 'Callback fired when the checked state changes',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="default" />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default checkbox in unchecked state, typically used with a label for user input.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="checked" />
      <Label htmlFor="checked">Receive notifications</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in checked state, showing the selected appearance.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="disabled" />
      <Label htmlFor="disabled" className="text-muted-foreground">
        Unavailable option
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox in unchecked state, showing how unavailable options are displayed.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="disabled-checked" />
      <Label htmlFor="disabled-checked" className="text-muted-foreground">
        Required feature (cannot be changed)
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox in checked state, useful for showing required features that cannot be toggled.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Marketing emails</Label>
      </div>
      <p className="text-sm text-muted-foreground ml-6">
        Receive emails about new products, features, and more.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with a descriptive text below the label, providing additional context for the option.',
      },
    },
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      item1: false,
      item2: true,
      item3: false,
      item4: true,
    });

    const handleCheckedChange = (itemId: string, checked: boolean) => {
      setCheckedItems((prev) => ({ ...prev, [itemId]: checked }));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select features</h3>
        <div className="grid gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature1"
              checked={checkedItems.item1}
              onCheckedChange={(checked) => handleCheckedChange('item1', checked as boolean)}
            />
            <Label htmlFor="feature1">Dark mode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature2"
              checked={checkedItems.item2}
              onCheckedChange={(checked) => handleCheckedChange('item2', checked as boolean)}
            />
            <Label htmlFor="feature2">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature3"
              checked={checkedItems.item3}
              onCheckedChange={(checked) => handleCheckedChange('item3', checked as boolean)}
            />
            <Label htmlFor="feature3">Auto-save</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature4"
              checked={checkedItems.item4}
              onCheckedChange={(checked) => handleCheckedChange('item4', checked as boolean)}
            />
            <Label htmlFor="feature4">Analytics tracking</Label>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Group of checkboxes with independent state management, allowing users to select multiple options from a list.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      updates: true,
      marketing: false,
      terms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    };

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>Choose how you&apos;d like to hear from us.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, newsletter: checked as boolean }))
                  }
                />
                <Label htmlFor="newsletter">Weekly newsletter</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.updates}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, updates: checked as boolean }))
                  }
                />
                <Label htmlFor="updates">Product updates</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={formData.marketing}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, marketing: checked as boolean }))
                  }
                />
                <Label htmlFor="marketing">Marketing offers</Label>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, terms: checked as boolean }))
                    }
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="terms">I agree to the terms and conditions</Label>
                    <p className="text-xs text-muted-foreground">
                      You must accept our terms to continue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!formData.terms}>
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes integrated into a complete form with validation, demonstrating real-world usage in preference settings.',
      },
    },
  },
};

export const SelectAllExample: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', name: 'Invoice #001', checked: false },
      { id: '2', name: 'Invoice #002', checked: true },
      { id: '3', name: 'Invoice #003', checked: false },
      { id: '4', name: 'Invoice #004', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);

    const handleSelectAll = (checked: boolean) => {
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleItemCheck = (id: string, checked: boolean) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)));
    };

    return (
      <div className="space-y-4 w-64">
        <div className="flex items-center space-x-2 border-b pb-2">
          <Checkbox
            id="select-all"
            checked={allChecked}
            // Note: Radix UI doesn't support indeterminate directly in props
            // but it can be set via ref if needed
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            {allChecked ? 'Deselect all' : 'Select all'}
          </Label>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
              />
              <Label htmlFor={item.id}>{item.name}</Label>
            </div>
          ))}
        </div>

        {someChecked && (
          <p className="text-sm text-muted-foreground">
            {items.filter((item) => item.checked).length} of {items.length} selected
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox list with a "select all" master checkbox that toggles all items, commonly used in data tables and bulk actions.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="custom1" className="border-blue-500 data-[state=checked]:bg-blue-500" />
        <Label htmlFor="custom1">Custom blue checkbox</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="custom2"
          className="border-green-500 data-[state=checked]:bg-green-500 rounded-full"
        />
        <Label htmlFor="custom2">Custom green rounded checkbox</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="custom3"
          className="size-5 border-purple-500 data-[state=checked]:bg-purple-500"
        />
        <Label htmlFor="custom3">Larger purple checkbox</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes with custom styling including different colors, shapes (rounded), and sizes, demonstrating full styling flexibility.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="valid" defaultChecked />
          <Label htmlFor="valid">Valid selection</Label>
        </div>
        <p className="text-sm text-green-600 ml-6">✓ Great choice!</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="invalid" aria-invalid />
          <Label htmlFor="invalid" className="text-destructive">
            Required field
          </Label>
        </div>
        <p className="text-sm text-destructive ml-6">This field is required to continue.</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="warning" />
          <Label htmlFor="warning" className="text-amber-600">
            Optional but recommended
          </Label>
        </div>
        <p className="text-sm text-amber-600 ml-6">
          We recommend enabling this feature for better security.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes with validation states (valid, invalid, warning) and associated feedback messages, demonstrating form validation patterns.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Accessibility Features</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="a11y1" />
            <Label htmlFor="a11y1">Screen reader support</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="a11y2" />
            <Label htmlFor="a11y2">Keyboard navigation</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="a11y3" />
            <Label htmlFor="a11y3">High contrast mode</Label>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>• Use Tab to navigate between checkboxes</p>
        <p>• Use Space to toggle checked state</p>
        <p>• Screen readers will announce the label and state</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility demonstration showing keyboard navigation, screen reader support, and proper label associations for inclusive design.',
      },
    },
  },
};
