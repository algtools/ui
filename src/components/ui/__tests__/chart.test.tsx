import React from 'react';
import { vi, Mock } from 'vitest';
import { render } from '@testing-library/react';
import type { LegendProps } from 'recharts';
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from '../chart';

type TooltipPayloadItem = {
  name?: string;
  dataKey?: string;
  value?: number;
  payload?: Record<string, unknown>;
  color?: string;
};

// removed unused LegendPayloadItem type

// Mock only the parts of recharts needed by our tests to avoid layout errors
vi.mock('recharts', () => ({
  __esModule: true,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Tooltip: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="recharts-tooltip">{children}</div>
  ),
}));

describe('Chart', () => {
  it('renders ChartContainer with data attributes and injects styles based on config', () => {
    const config = {
      sales: { color: 'rgb(255, 0, 0)' },
      profit: { theme: { light: 'rgb(0, 255, 0)', dark: 'rgb(0, 200, 0)' } },
    };
    const { container } = render(
      <ChartContainer config={config}>
        {/* minimal recharts content */}
        <div data-testid="content">chart</div>
      </ChartContainer>
    );
    const root = container.querySelector('[data-slot="chart"]');
    expect(root).not.toBeNull();
    // style tag should exist under the container
    const style = root!.querySelector('style');
    expect(style).not.toBeNull();
    expect(style!.innerHTML).toContain('--color-sales: rgb(255, 0, 0)');
    expect(style!.innerHTML).toContain('--color-profit: rgb(0, 255, 0)');
  });

  it('ChartTooltipContent returns null when inactive or no payload', () => {
    const { container, rerender } = render(
      <ChartContainer config={{}}>
        <ChartTooltipContent active={false} payload={[]} />
      </ChartContainer>
    );
    expect(container.firstChild).toBeTruthy();
    // No tooltip content rendered when inactive
    expect(container.querySelector('[role="tooltip"]')).toBeNull();

    rerender(
      <ChartContainer config={{}}>
        <ChartTooltipContent active payload={[]} />
      </ChartContainer>
    );
    expect(container.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('ChartLegendContent renders items with color boxes from payload', () => {
    const payload = [
      { value: 'Sales', color: 'red', dataKey: 'sales' },
      { value: 'Profit', color: 'green', dataKey: 'profit' },
    ];
    const { container } = render(
      <ChartContainer config={{}}>
        <ChartLegendContent
          payload={payload as Array<{ value: string; color: string; dataKey: string }>}
        />
      </ChartContainer>
    );
    const boxes = container.querySelectorAll('div[style*="background-color"]');
    expect(boxes.length).toBeGreaterThanOrEqual(2);
  });

  it('ChartContainer does not inject style when no color/theme provided', () => {
    const { container } = render(
      <ChartContainer config={{ foo: { label: 'X' } }}>
        <div />
      </ChartContainer>
    );
    const root = container.querySelector('[data-slot="chart"]')!;
    expect(root.querySelector('style')).toBeNull();
  });

  it('ChartTooltipContent renders entries with labels from config and formatted values', () => {
    const config = {
      sales: { label: 'Sales Label' },
    } as const;

    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={[
            {
              name: 'Sales',
              dataKey: 'sales',
              value: 1234,
              payload: { fill: '#123456' },
              color: '#123456',
            } as TooltipPayloadItem,
          ]}
        />
      </ChartContainer>
    );

    // label from config and value formatted
    expect(container.textContent).toContain('Sales Label');
    expect(container.textContent).toContain('1,234');
  });

  it('ChartTooltipContent supports labelFormatter and nests label when indicator is not dot', () => {
    const config = { value: { label: 'Ignored via formatter' } } as const;
    const labelFormatter = vi.fn(() => 'Formatted Label');
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          indicator="line"
          label="value"
          labelFormatter={labelFormatter}
          color="#000"
          payload={[{ name: 'Price', value: 42, payload: {} } as TooltipPayloadItem]}
        />
      </ChartContainer>
    );
    expect(container.textContent).toContain('Formatted Label');
  });

  it('ChartTooltipContent renders dashed indicator with proper classes and hides when hideIndicator is true', () => {
    const config = { sales: { label: 'Sales' } } as const;
    const { container, rerender } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          indicator="dashed"
          payload={[
            { dataKey: 'sales', value: 10, payload: {}, color: 'red' } as TooltipPayloadItem,
          ]}
        />
      </ChartContainer>
    );
    const dashed = container.querySelector('[style*="--color-bg"]') as HTMLElement | null;
    expect(dashed).not.toBeNull();
    // Tailwind-like utility class expectations
    expect(dashed!.className).toMatch(/border-dashed/);

    // hide indicator
    rerender(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          indicator="dashed"
          hideIndicator
          payload={[
            { dataKey: 'sales', value: 10, payload: {}, color: 'red' } as TooltipPayloadItem,
          ]}
        />
      </ChartContainer>
    );
    const maybeIndicator = container.querySelector('[style*="--color-bg"]');
    expect(maybeIndicator).toBeNull();
  });

  it('ChartLegendContent respects nameKey mapping via payload.payload and shows icon unless hidden', () => {
    const DummyIcon = () => <svg data-testid="dummy-icon" />;
    const config = {
      profit: { label: 'Profit Label', icon: DummyIcon },
    } as const;

    // Use a key that is resolved from payload.payload
    const legendPayload: NonNullable<LegendProps['payload']> = [
      {
        value: 'profit',
        color: 'green',
        dataKey: 'ignored',
        payload: { strokeDasharray: '' },
      },
    ];

    const { container, rerender } = render(
      <ChartContainer config={config}>
        <ChartLegendContent payload={legendPayload} nameKey="value" />
      </ChartContainer>
    );

    // Shows icon and label from config
    expect(container.querySelector('[data-testid="dummy-icon"]')).not.toBeNull();
    expect(container.textContent).toContain('Profit Label');
    // default verticalAlign adds padding-top
    const root = container.querySelector(
      'div.flex.items-center.justify-center.gap-4'
    ) as HTMLElement;
    expect(root.className).toMatch(/pt-3/);

    // Hides icon and uses top alignment padding
    rerender(
      <ChartContainer config={config}>
        <ChartLegendContent payload={legendPayload} nameKey="value" hideIcon verticalAlign="top" />
      </ChartContainer>
    );
    expect(container.querySelector('[data-testid="dummy-icon"]')).toBeNull();
    const rootTop = container.querySelector(
      'div.flex.items-center.justify-center.gap-4'
    ) as HTMLElement;
    expect(rootTop.className).toMatch(/pb-3/);
  });

  it('throws when using ChartTooltipContent outside of ChartContainer', () => {
    const renderOutside = () =>
      render(
        <ChartTooltipContent active payload={[{ name: 'n', value: 1 } as TooltipPayloadItem]} />
      );
    expect(renderOutside).toThrow(/useChart must be used within a <ChartContainer/);
  });
});
