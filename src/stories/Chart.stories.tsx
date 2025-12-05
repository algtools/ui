import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const meta = {
  title: 'Data Display/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      description: 'Chart configuration object defining colors and labels for data series',
      control: 'object',
    },
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof ChartContainer>;

// Sample data
const monthlyData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { month: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { month: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { month: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
];

const browserData = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'Other', visitors: 90, fill: 'var(--color-other)' },
];

const radialData = [
  { name: 'Desktop', value: 75, fill: 'var(--color-desktop)' },
  { name: 'Mobile', value: 60, fill: 'var(--color-mobile)' },
  { name: 'Tablet', value: 45, fill: 'var(--color-tablet)' },
];

// Chart configurations
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--color-chart-2)',
  },
} satisfies ChartConfig;

const revenueChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--color-chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--color-chart-2)',
  },
  profit: {
    label: 'Profit',
    color: 'var(--color-chart-3)',
  },
} satisfies ChartConfig;

const browserChartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'var(--color-chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--color-chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--color-chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--color-chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig;

const radialChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--color-chart-2)',
  },
  tablet: {
    label: 'Tablet',
    color: 'var(--color-chart-3)',
  },
} satisfies ChartConfig;

export const Default: Story = {
  args: {
    config: chartConfig,
  },
  render: (args) => (
    <div className="w-96">
      <ChartContainer {...args}>
        <BarChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default bar chart displaying monthly data for desktop and mobile, demonstrating basic chart functionality.',
      },
    },
  },
};

export const LineChartExample: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <LineChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-desktop)',
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-mobile)',
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A line chart displaying trends over time, demonstrating how to visualize data with line charts.',
      },
    },
  },
};

export const AreaChartExample: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <AreaChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="mobile"
            type="natural"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An area chart with filled areas showing data trends, demonstrating area chart visualization.',
      },
    },
  },
};

export const PieChartExample: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={browserChartConfig}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
          <Pie
            data={browserData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            {browserData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pie chart displaying data distribution, demonstrating how to show proportional data.',
      },
    },
  },
};

export const RadialBarChartExample: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={radialChartConfig}>
        <RadialBarChart data={radialData} innerRadius={30} outerRadius={110}>
          <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
          <RadialBar dataKey="value" cornerRadius={10} fill="var(--color-desktop)" />
        </RadialBarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A radial bar chart displaying data in a circular format, demonstrating radial chart visualization.',
      },
    },
  },
};

export const WithLegend: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <BarChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chart with a legend showing data series labels, demonstrating how to add legends to charts.',
      },
    },
  },
};

export const RevenueAnalysis: Story = {
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={revenueChartConfig}>
        <BarChart data={revenueData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A revenue analysis chart displaying financial data and trends, demonstrating business analytics use cases.',
      },
    },
  },
};

export const StackedAreaChart: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <AreaChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktopStacked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobileStacked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#fillDesktopStacked)"
            fillOpacity={1}
            stroke="var(--color-desktop)"
            stackId="1"
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill="url(#fillMobileStacked)"
            fillOpacity={1}
            stroke="var(--color-mobile)"
            stackId="1"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A stacked area chart showing multiple data series stacked on top of each other, demonstrating stacked visualizations.',
      },
    },
  },
};

export const MultipleCharts: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[800px]">
      <div>
        <h3 className="text-lg font-semibold mb-2">Visitors</h3>
        <ChartContainer config={chartConfig}>
          <LineChart data={monthlyData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-desktop)' }}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-mobile)' }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Browser Share</h3>
        <ChartContainer config={browserChartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
            <Pie
              data={browserData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={40}
              strokeWidth={5}
            >
              {browserData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple charts displayed together, demonstrating how to show different chart types on the same page.',
      },
    },
  },
};

export const CustomTooltip: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <BarChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                }}
              />
            }
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chart with custom tooltip content, demonstrating how to customize tooltip appearance and information.',
      },
    },
  },
};

// Extended data with all 5 chart colors
const extendedData = [
  { month: 'Jan', series1: 186, series2: 80, series3: 120, series4: 90, series5: 150 },
  { month: 'Feb', series1: 305, series2: 200, series3: 180, series4: 120, series5: 220 },
  { month: 'Mar', series1: 237, series2: 120, series3: 160, series4: 140, series5: 180 },
  { month: 'Apr', series1: 173, series2: 190, series3: 140, series4: 160, series5: 160 },
  { month: 'May', series1: 209, series2: 130, series3: 170, series4: 110, series5: 190 },
  { month: 'Jun', series1: 214, series2: 140, series3: 150, series4: 130, series5: 200 },
];

const allColorsChartConfig = {
  series1: {
    label: 'Series 1',
    color: 'var(--color-chart-1)',
  },
  series2: {
    label: 'Series 2',
    color: 'var(--color-chart-2)',
  },
  series3: {
    label: 'Series 3',
    color: 'var(--color-chart-3)',
  },
  series4: {
    label: 'Series 4',
    color: 'var(--color-chart-4)',
  },
  series5: {
    label: 'Series 5',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig;

export const AllChartColors: Story = {
  render: () => (
    <div className="w-[700px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">All Chart Theme Colors</h3>
        <p className="text-sm text-muted-foreground">
          Showcasing all 5 chart colors: chart-1 through chart-5
        </p>
      </div>
      <ChartContainer config={allColorsChartConfig}>
        <BarChart data={extendedData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="series1" fill="var(--color-series1)" radius={2} />
          <Bar dataKey="series2" fill="var(--color-series2)" radius={2} />
          <Bar dataKey="series3" fill="var(--color-series3)" radius={2} />
          <Bar dataKey="series4" fill="var(--color-series4)" radius={2} />
          <Bar dataKey="series5" fill="var(--color-series5)" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chart displaying all 5 chart theme colors (chart-1 through chart-5) in a single bar chart, demonstrating the full color palette.',
      },
    },
  },
};

export const ChartColorPalette: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Chart Color Palette</h3>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                style={{ backgroundColor: `var(--color-chart-${num})` }}
              />
              <p className="text-sm font-medium">Chart {num}</p>
              <p className="text-xs text-muted-foreground">--chart-{num}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Line Chart Example */}
        <div>
          <h4 className="font-medium mb-2">Line Chart</h4>
          <ChartContainer config={allColorsChartConfig}>
            <LineChart data={extendedData.slice(0, 4)} height={200}>
              <XAxis dataKey="month" hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="series1"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                dataKey="series2"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                dataKey="series3"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        {/* Pie Chart Example */}
        <div>
          <h4 className="font-medium mb-2">Pie Chart</h4>
          <ChartContainer config={allColorsChartConfig}>
            <PieChart height={200}>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={[
                  { name: 'Series 1', value: 30, fill: 'var(--color-chart-1)' },
                  { name: 'Series 2', value: 25, fill: 'var(--color-chart-2)' },
                  { name: 'Series 3', value: 20, fill: 'var(--color-chart-3)' },
                  { name: 'Series 4', value: 15, fill: 'var(--color-chart-4)' },
                  { name: 'Series 5', value: 10, fill: 'var(--color-chart-5)' },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A chart color palette showcase displaying all available chart colors with examples of line and pie charts using the color system.',
      },
    },
  },
};
