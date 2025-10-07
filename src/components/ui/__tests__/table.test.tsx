import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../table';

describe('Table', () => {
  it('renders container and table with data-slots and merges className', () => {
    render(
      <Table className="extra">
        <TableHeader>
          <TableRow>
            <TableHead className="extra-head">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
          <TableRow data-state="selected" className="extra-row">
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Foot</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption className="extra-cap">Cap</TableCaption>
      </Table>
    );

    const container = document.querySelector('[data-slot="table-container"]');
    const table = document.querySelector('[data-slot="table"]');
    expect(container).not.toBeNull();
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('overflow-x-auto');
    expect(table).not.toBeNull();
    expect(table).toHaveClass('w-full');
    expect(table).toHaveClass('caption-bottom');
    expect(table).toHaveClass('text-sm');
    expect(table).toHaveClass('extra');
  });

  it('renders header, body, footer, row, head, cell, and caption with base classes', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Val</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Sum</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Caption</TableCaption>
      </Table>
    );

    const header = document.querySelector('[data-slot="table-header"]');
    const body = document.querySelector('[data-slot="table-body"]');
    const footer = document.querySelector('[data-slot="table-footer"]');
    const row = document.querySelector('[data-slot="table-row"]');
    const head = document.querySelector('[data-slot="table-head"]');
    const cell = document.querySelector('[data-slot="table-cell"]');
    const caption = document.querySelector('[data-slot="table-caption"]');

    expect(header).not.toBeNull();
    expect(header).toHaveClass('[&_tr]:border-b');

    expect(body).not.toBeNull();
    expect(body).toHaveClass('[&_tr:last-child]:border-0');

    expect(footer).not.toBeNull();
    expect(footer).toHaveClass('bg-muted/50');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('font-medium');

    expect(row).not.toBeNull();
    expect(row).toHaveClass('border-b');

    expect(head).not.toBeNull();
    expect(head).toHaveClass('text-foreground');
    expect(head).toHaveClass('h-10');

    expect(cell).not.toBeNull();
    expect(cell).toHaveClass('p-2');

    expect(caption).not.toBeNull();
    expect(caption).toHaveClass('text-muted-foreground');
    expect(caption).toHaveClass('mt-4');
    expect(caption).toHaveClass('text-sm');
  });

  it('respects data-state and merges custom classes on row and head/caption', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected" className="custom-row">
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="custom-head">Head</TableHead>
          </TableRow>
        </TableHeader>
        <TableCaption className="custom-cap">Cap</TableCaption>
      </Table>
    );

    const selectedRow = screen.getByText('Row').closest('tr') as HTMLElement | null;
    const head = screen.getByText('Head');
    const cap = screen.getByText('Cap');

    expect(selectedRow).not.toBeNull();
    expect(selectedRow).toHaveAttribute('data-state', 'selected');
    expect(selectedRow).toHaveClass('custom-row');
    expect(head).toHaveClass('custom-head');
    expect(cap).toHaveClass('custom-cap');
  });
});
