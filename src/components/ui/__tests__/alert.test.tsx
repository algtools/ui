import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '../alert';

describe('Alert', () => {
  it('renders with role alert, data-slot and default variant classes; merges className', () => {
    render(
      <Alert className="extra">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>
    );
    const root = screen.getByRole('alert');
    expect(root).toHaveAttribute('data-slot', 'alert');
    expect(root).toHaveClass('rounded-lg');
    expect(root).toHaveClass('bg-card');
    expect(root).toHaveClass('extra');
  });

  it('applies destructive variant classes', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Bad things</AlertDescription>
      </Alert>
    );
    const root = screen.getByRole('alert');
    expect(root).toHaveClass('text-destructive');
  });

  it('renders title and description with data-slots and base classes', () => {
    render(
      <Alert>
        <AlertTitle className="ttl">Title</AlertTitle>
        <AlertDescription className="desc">Desc</AlertDescription>
      </Alert>
    );
    const title = screen.getByText('Title');
    expect(title).toHaveAttribute('data-slot', 'alert-title');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('ttl');

    const desc = screen.getByText('Desc');
    expect(desc).toHaveAttribute('data-slot', 'alert-description');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('desc');
  });
});
