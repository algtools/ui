import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/tags';

const meta = {
  title: 'Forms/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for selecting and managing multiple tags. Supports search, filtering, and removal of selected tags.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialTags = [
  { id: 'design', label: 'Design' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'research', label: 'Research' },
  { id: 'priority-high', label: 'High Priority' },
  { id: 'bug', label: 'Bug' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['frontend', 'bug']);

    return (
      <div className="w-[420px]">
        <Tags>
          <TagsTrigger>
            {selected.map((id) => (
              <TagsValue key={id} onRemove={() => setSelected(selected.filter((v) => v !== id))}>
                {initialTags.find((t) => t.id === id)?.label}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput placeholder="Search tags..." />
            <TagsList>
              <TagsEmpty>No tags found.</TagsEmpty>
              <TagsGroup heading="Available">
                {initialTags.map((tag) => (
                  <TagsItem
                    key={tag.id}
                    onSelect={() => {
                      setSelected((prev) =>
                        prev.includes(tag.id) ? prev.filter((v) => v !== tag.id) : [...prev, tag.id]
                      );
                    }}
                  >
                    <span>{tag.label}</span>
                    {selected.includes(tag.id) && (
                      <span className="text-muted-foreground text-xs">Selected</span>
                    )}
                  </TagsItem>
                ))}
              </TagsGroup>
            </TagsList>
          </TagsContent>
        </Tags>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default tags component with searchable tag selection, allowing users to select multiple tags and remove them individually from the trigger.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const categories = [
      { id: 'frontend', label: 'Frontend', group: 'Development' },
      { id: 'backend', label: 'Backend', group: 'Development' },
      { id: 'ux', label: 'UX', group: 'Design' },
      { id: 'ui', label: 'UI', group: 'Design' },
      { id: 'research', label: 'Research', group: 'Product' },
      { id: 'priority-high', label: 'High Priority', group: 'Priority' },
    ];

    const byGroup = categories.reduce<Record<string, typeof categories>>((acc, item) => {
      (acc[item.group] ||= [] as unknown as typeof categories).push(item);
      return acc;
    }, {});

    return (
      <div className="w-[420px]">
        <Tags>
          <TagsTrigger>
            {selected.length === 0 && <span>No tags selected</span>}
            {selected.map((id) => (
              <TagsValue key={id} onRemove={() => setSelected(selected.filter((v) => v !== id))}>
                {categories.find((t) => t.id === id)?.label}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput placeholder="Filter tags..." />
            <TagsList>
              <TagsEmpty>No tags found.</TagsEmpty>
              {Object.entries(byGroup).map(([group, items]) => (
                <TagsGroup key={group} heading={group}>
                  {items.map((tag) => (
                    <TagsItem
                      key={tag.id}
                      onSelect={() => {
                        setSelected((prev) =>
                          prev.includes(tag.id)
                            ? prev.filter((v) => v !== tag.id)
                            : [...prev, tag.id]
                        );
                      }}
                    >
                      <span>{tag.label}</span>
                      {selected.includes(tag.id) && (
                        <span className="text-muted-foreground text-xs">Selected</span>
                      )}
                    </TagsItem>
                  ))}
                </TagsGroup>
              ))}
            </TagsList>
          </TagsContent>
        </Tags>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tags component with grouped options (Development, Design, Product, Priority), demonstrating organized tag selection with category headings.',
      },
    },
  },
};

export const DisabledItems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['priority-high']);

    const options = [
      { id: 'frontend', label: 'Frontend', disabled: false },
      { id: 'backend', label: 'Backend', disabled: true },
      { id: 'priority-high', label: 'High Priority', disabled: false },
    ];

    return (
      <div className="w-[420px]">
        <Tags>
          <TagsTrigger>
            {selected.map((id) => (
              <TagsValue key={id} onRemove={() => setSelected(selected.filter((v) => v !== id))}>
                {options.find((t) => t.id === id)?.label}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput placeholder="Search tags..." />
            <TagsList>
              <TagsGroup heading="Options">
                {options.map((tag) => (
                  <TagsItem
                    key={tag.id}
                    disabled={tag.disabled}
                    onSelect={() => {
                      setSelected((prev) =>
                        prev.includes(tag.id) ? prev.filter((v) => v !== tag.id) : [...prev, tag.id]
                      );
                    }}
                  >
                    <span>{tag.label}</span>
                    {tag.disabled && (
                      <span className="text-muted-foreground text-xs">Disabled</span>
                    )}
                  </TagsItem>
                ))}
              </TagsGroup>
            </TagsList>
          </TagsContent>
        </Tags>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tags component with disabled items, showing how certain tags can be made unavailable for selection while still displaying them in the list.',
      },
    },
  },
};
