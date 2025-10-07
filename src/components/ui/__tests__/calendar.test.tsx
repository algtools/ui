import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from '../calendar';

describe('Calendar', () => {
  it('renders root with data-slot and merges className', () => {
    render(<Calendar className="custom-root" />);
    const root = document.querySelector('[data-slot="calendar"]') as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root!).toHaveAttribute('data-slot', 'calendar');
    expect(root!).toHaveClass('custom-root');
  });

  it('renders navigation buttons (prev/next) and responds to clicks', async () => {
    const user = userEvent.setup();
    // Fix the visible month for deterministic assertions
    render(<Calendar month={new Date(2020, 0)} />);
    const prev = screen.getByRole('button', { name: /go to the previous month/i });
    const next = screen.getByRole('button', { name: /go to the next month/i });
    expect(prev).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    // Click navigation to ensure handlers are wired (no throw)
    await user.click(next);
    await user.click(prev);
  });

  it('applies buttonVariant to nav buttons', () => {
    render(<Calendar month={new Date(2020, 0)} buttonVariant="destructive" />);
    const next = document.querySelector('.rdp-button_next') as HTMLElement | null;
    expect(next).not.toBeNull();
    expect(next!).toHaveClass('bg-destructive');
  });

  it('renders single selected day with data-selected-single and data-day', () => {
    const selected = new Date(2020, 0, 15);
    render(<Calendar mode="single" month={new Date(2020, 0)} selected={selected} />);
    const expectedDataDay = selected.toLocaleDateString();
    const dayButton = document.querySelector(
      `[data-slot="button"][data-day="${expectedDataDay}"]`
    ) as HTMLElement | null;
    expect(dayButton).not.toBeNull();
    // selected single flag
    expect(dayButton!).toHaveAttribute('data-selected-single', 'true');
    // not part of range
    expect(dayButton!).not.toHaveAttribute('data-range-start');
    expect(dayButton!).not.toHaveAttribute('data-range-middle');
    expect(dayButton!).not.toHaveAttribute('data-range-end');
  });

  it('renders range selection flags for start, middle, and end days', () => {
    const from = new Date(2020, 0, 10);
    const middle = new Date(2020, 0, 11);
    const to = new Date(2020, 0, 12);
    render(<Calendar mode="range" month={new Date(2020, 0)} selected={{ from, to }} />);
    const getDayEl = (d: Date) =>
      document.querySelector(
        `[data-slot="button"][data-day="${d.toLocaleDateString()}"]`
      ) as HTMLElement | null;
    const startEl = getDayEl(from)!;
    const middleEl = getDayEl(middle)!;
    const endEl = getDayEl(to)!;
    expect(startEl).toHaveAttribute('data-range-start', 'true');
    expect(endEl).toHaveAttribute('data-range-end', 'true');
    expect(middleEl).toHaveAttribute('data-range-middle', 'true');
  });

  it('allows overriding internal components (e.g., WeekNumber) when showWeekNumber is enabled', () => {
    render(
      <Calendar
        month={new Date(2020, 0)}
        showWeekNumber
        components={{
          WeekNumber: (props: React.ComponentProps<'td'>) => (
            <td data-testid="custom-week" {...props} />
          ),
        }}
      />
    );
    const customWeek = screen.getAllByTestId('custom-week')[0];
    expect(customWeek).toBeInTheDocument();
  });
});

// No extra helpers; we use the built-in data-slot attribute for selection
