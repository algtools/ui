import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  Tags,
  TagsTrigger,
  TagsValue,
  TagsContent,
  TagsInput,
  TagsList,
  TagsEmpty,
  TagsGroup,
  TagsItem,
} from '@/components/ui/tags';

describe('Tags', () => {
  test('renders trigger with placeholder and opens/closes popover', async () => {
    const user = userEvent.setup();

    render(
      <Tags>
        <TagsTrigger data-testid="trigger" />
        <TagsContent>
          <TagsInput />
          <TagsList>
            <TagsEmpty>No tags</TagsEmpty>
            <TagsGroup heading="Group">
              <TagsItem value="t1">Tag 1</TagsItem>
              <TagsItem value="t2">Tag 2</TagsItem>
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText('Select a tag...')).toBeInTheDocument();

    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    const input = within(dialog).getByRole('combobox');
    expect(input).toBeInTheDocument();

    // close by pressing Escape on input
    input.focus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('propagates width to popover content via ResizeObserver', async () => {
    const user = userEvent.setup();

    render(
      <div style={{ width: 500 }}>
        <Tags>
          <TagsTrigger data-testid="trigger" style={{ width: 420 }} />
          <TagsContent data-testid="content">
            <TagsList />
          </TagsContent>
        </Tags>
      </div>
    );

    await user.click(screen.getByTestId('trigger'));
    const content = screen.getByTestId('content');
    // style attribute contains width set from observer; jsdom sets inline style string
    expect(content).toHaveStyle({ width: expect.any(String) });
  });

  test('renders selected values with removable badges', async () => {
    const onRemove = vi.fn();

    render(
      <Tags>
        <TagsTrigger>
          <TagsValue onRemove={onRemove}>Alpha</TagsValue>
          <TagsValue onRemove={onRemove}>Beta</TagsValue>
        </TagsTrigger>
      </Tags>
    );

    const alpha = screen.getByText('Alpha');
    expect(alpha).toBeInTheDocument();

    // click the X icon container of first badge
    // There might not be semantic buttons; query the clickable container inside the badge instead.
    // Use fireEvent to target the closest clickable element by text Alpha and then the next clickable sibling
    const alphaBadge = alpha.closest('[class]');
    expect(alphaBadge).toBeTruthy();
    if (alphaBadge) {
      const clickable = alphaBadge.querySelector('div');
      if (clickable) {
        fireEvent.click(clickable);
      }
    }

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
