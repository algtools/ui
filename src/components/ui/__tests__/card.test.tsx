import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '../card';

describe('Card', () => {
  it('renders Card with data-slot and merges className', () => {
    render(<Card className="custom-card">Root</Card>);
    const root = screen.getByText('Root');
    expect(root).toHaveAttribute('data-slot', 'card');
    expect(root).toHaveClass('bg-card');
    expect(root).toHaveClass('rounded-xl');
    expect(root).toHaveClass('custom-card');
  });

  it('renders CardHeader with data-slot and merges className', () => {
    render(<CardHeader className="hdr">Header</CardHeader>);
    const el = screen.getByText('Header');
    expect(el).toHaveAttribute('data-slot', 'card-header');
    expect(el).toHaveClass('px-6');
    expect(el).toHaveClass('hdr');
  });

  it('renders CardTitle with data-slot and merges className', () => {
    render(<CardTitle className="ttl">Title</CardTitle>);
    const el = screen.getByText('Title');
    expect(el).toHaveAttribute('data-slot', 'card-title');
    expect(el).toHaveClass('font-semibold');
    expect(el).toHaveClass('ttl');
  });

  it('renders CardDescription with data-slot and merges className', () => {
    render(<CardDescription className="desc">Desc</CardDescription>);
    const el = screen.getByText('Desc');
    expect(el).toHaveAttribute('data-slot', 'card-description');
    expect(el).toHaveClass('text-muted-foreground');
    expect(el).toHaveClass('text-sm');
    expect(el).toHaveClass('desc');
  });

  it('renders CardAction with data-slot and merges className', () => {
    render(<CardAction className="act">Act</CardAction>);
    const el = screen.getByText('Act');
    expect(el).toHaveAttribute('data-slot', 'card-action');
    expect(el).toHaveClass('justify-self-end');
    expect(el).toHaveClass('act');
  });

  it('renders CardContent with data-slot and merges className', () => {
    render(<CardContent className="cnt">Content</CardContent>);
    const el = screen.getByText('Content');
    expect(el).toHaveAttribute('data-slot', 'card-content');
    expect(el).toHaveClass('px-6');
    expect(el).toHaveClass('cnt');
  });

  it('renders CardFooter with data-slot and merges className', () => {
    render(<CardFooter className="ftr">Footer</CardFooter>);
    const el = screen.getByText('Footer');
    expect(el).toHaveAttribute('data-slot', 'card-footer');
    expect(el).toHaveClass('items-center');
    expect(el).toHaveClass('px-6');
    expect(el).toHaveClass('ftr');
  });
});
