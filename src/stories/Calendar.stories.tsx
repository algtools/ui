import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange as DayPickerDateRange } from 'react-day-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'Forms/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from previous/next months',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown'],
      description: 'Layout for the month/year caption',
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Variant for navigation buttons',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of months to display',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showOutsideDays: true,
    captionLayout: 'label',
    buttonVariant: 'ghost',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
        captionLayout={args.captionLayout}
        buttonVariant={args.buttonVariant}
        numberOfMonths={args.numberOfMonths}
      />
    );
  },
};

export const WithDropdownCaption: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        showOutsideDays={true}
      />
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DayPickerDateRange | undefined>({
      from: new Date(),
      to: undefined,
    });

    return (
      <div className="space-y-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          showOutsideDays={true}
        />
        <div className="text-sm text-muted-foreground">
          {dateRange?.from && (
            <p>
              Selected range: {dateRange.from.toDateString()}
              {dateRange?.to && ` - ${dateRange.to.toDateString()}`}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    return (
      <div className="space-y-4">
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          showOutsideDays={true}
          required
        />
        <div className="text-sm text-muted-foreground">
          Selected dates: {selectedDates.length} day(s)
          {selectedDates.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedDates.map((date, index) => (
                <Badge key={index} variant="secondary">
                  {date.toLocaleDateString()}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    const disabledDays = [
      { from: new Date(2024, 11, 20), to: new Date(2024, 11, 25) }, // Holiday period
      new Date(2024, 11, 31), // New Year's Eve
      { dayOfWeek: [0, 6] }, // Weekends
    ];

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          showOutsideDays={true}
        />
        <div className="text-sm text-muted-foreground">Weekends and holidays are disabled</div>
      </div>
    );
  },
};

export const DatePicker: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="justify-start text-left font-normal"
        >
          {date ? date.toDateString() : 'Pick a date'}
        </Button>

        {isOpen && (
          <Card className="w-fit">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsOpen(false);
                }}
                showOutsideDays={true}
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  },
};

export const EventCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const eventDates = [
      new Date(2024, 11, 5), // Meeting
      new Date(2024, 11, 12), // Conference
      new Date(2024, 11, 18), // Deadline
      new Date(2024, 11, 24), // Holiday
    ];

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays={true}
          modifiers={{
            event: eventDates,
          }}
          modifiersClassNames={{
            event:
              'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full',
          }}
        />
        <div className="text-sm text-muted-foreground">Events are marked with dots</div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Upcoming Events:</p>
          {eventDates.map((eventDate, index) => (
            <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {eventDate.toDateString()}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const BookingCalendar: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const bookedDates = [new Date(2024, 11, 8), new Date(2024, 11, 15), new Date(2024, 11, 22)];

    const availableDates = [new Date(2024, 11, 10), new Date(2024, 11, 17), new Date(2024, 11, 24)];

    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Select an available date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={[
              { before: new Date() }, // Past dates
              ...bookedDates, // Already booked
              { dayOfWeek: [0, 6] }, // Weekends
            ]}
            modifiers={{
              available: availableDates,
              booked: bookedDates,
            }}
            modifiersClassNames={{
              available: 'bg-green-100 text-green-800 hover:bg-green-200',
              booked: 'bg-red-100 text-red-800',
            }}
            showOutsideDays={false}
          />
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted border rounded"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const CompactCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="w-[250px]"
        classNames={{
          month: 'space-y-2',
          table: 'w-full border-collapse space-y-1',
          weekday: 'text-xs',
        }}
      />
    );
  },
};

export const ThreeMonthView: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="max-w-4xl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={3}
          showOutsideDays={true}
          captionLayout="dropdown"
        />
      </div>
    );
  },
};

export const WeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={true}
        showWeekNumber
        weekStartsOn={1} // Monday
      />
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Card className="w-fit border-purple-200">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays={true}
            className="rounded-lg"
            classNames={{
              day: 'hover:bg-purple-100',
              today: 'bg-purple-100 text-purple-900',
            }}
            buttonVariant="outline"
          />
        </CardContent>
      </Card>
    );
  },
};
