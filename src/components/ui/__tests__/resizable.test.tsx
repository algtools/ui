// Mock ESM-only dependency to avoid transform issues in Jest
vi.mock('react-resizable-panels', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const PanelGroup = ({ direction, children, ...props }: Record<string, unknown>) =>
    React.createElement('div', { 'data-panel-group-direction': direction, ...props }, children);
  const Panel = ({ children, ...props }: Record<string, unknown>) =>
    React.createElement('div', { ...props }, children);
  const PanelResizeHandle = ({ children, ...props }: Record<string, unknown>) =>
    React.createElement('div', { ...props }, children);
  return { __esModule: true, PanelGroup, Panel, PanelResizeHandle };
});
import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../resizable';

describe('Resizable', () => {
  it('renders group, panels, and handle with data-slots and merges className', () => {
    render(
      <ResizablePanelGroup direction="horizontal" className="extra-group">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle className="extra-handle" withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    );

    const group = document.querySelector('[data-slot="resizable-panel-group"]');
    const panels = document.querySelectorAll('[data-slot="resizable-panel"]');
    const handle = document.querySelector('[data-slot="resizable-handle"]');

    expect(group).not.toBeNull();
    expect(group).toHaveClass('flex');
    expect(group).toHaveClass('extra-group');
    expect(panels.length).toBe(2);
    expect(handle).not.toBeNull();
    expect(handle).toHaveClass('extra-handle');
  });

  it('renders optional inner grip when withHandle is true', () => {
    const { rerender } = render(
      <ResizablePanelGroup>
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    );

    let handle = document.querySelector('[data-slot="resizable-handle"]') as HTMLElement | null;
    expect(handle).not.toBeNull();
    expect(handle!.querySelector('svg')).not.toBeNull();

    rerender(
      <ResizablePanelGroup>
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    );
    handle = document.querySelector('[data-slot="resizable-handle"]') as HTMLElement | null;
    expect(handle).not.toBeNull();
    expect(handle!.querySelector('svg')).toBeNull();
  });

  it('supports vertical direction without crashing', () => {
    render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    );
    const group = document.querySelector('[data-slot="resizable-panel-group"]');
    expect(group).not.toBeNull();
  });
});
