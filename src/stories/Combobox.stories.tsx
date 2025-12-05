import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxCreateNew,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/ui/combobox';

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
];

export const Default: Story = {
  args: { data: fruits, type: 'fruit' },
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[280px]">
        <Combobox data={fruits} type="fruit" value={value} onValueChange={setValue}>
          <ComboboxTrigger />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxList>
              <ComboboxEmpty />
              <ComboboxGroup heading="Fruits">
                {fruits.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-2 text-sm text-muted-foreground">Value: {value || '—'}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Default combobox component with searchable input and dropdown list, allowing users to search and select from a list of options.',
      },
    },
  },
};

export const WithGroupsAndSeparator: Story = {
  args: { data: [], type: 'item' },
  render: () => {
    const [value, setValue] = useState('');

    const items = {
      Fruits: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
      Vegetables: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Broccoli', value: 'broccoli' },
      ],
    } as const;

    const data = [...items.Fruits, ...items.Vegetables];

    return (
      <div className="w-[320px]">
        <Combobox data={data} type="item" value={value} onValueChange={setValue}>
          <ComboboxTrigger />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxList>
              <ComboboxEmpty />
              <ComboboxGroup heading="Fruits">
                {items.Fruits.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup heading="Vegetables">
                {items.Vegetables.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-2 text-sm text-muted-foreground">Value: {value || '—'}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox with grouped items and separators, organizing options into categories (Fruits, Vegetables) for better navigation and organization.',
      },
    },
  },
};

export const CreateNew: Story = {
  args: { data: [], type: 'tag' },
  render: () => {
    const [data, setData] = useState([
      { label: 'Work', value: 'work' },
      { label: 'Personal', value: 'personal' },
      { label: 'Urgent', value: 'urgent' },
    ]);
    const [value, setValue] = useState('');

    return (
      <div className="w-[320px]">
        <Combobox data={data} type="tag" value={value} onValueChange={setValue}>
          <ComboboxTrigger />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxList>
              <ComboboxEmpty />
              <ComboboxGroup heading="Tags">
                {data.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxCreateNew
                onCreateNew={(newValue) =>
                  setData((prev) =>
                    prev.some((i) => i.value === newValue)
                      ? prev
                      : [...prev, { label: newValue, value: newValue }]
                  )
                }
              />
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-2 text-sm text-muted-foreground">Value: {value || '—'}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox with create-new functionality, allowing users to add new options dynamically when the searched value does not exist in the list.',
      },
    },
  },
};
