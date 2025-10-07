import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '../breadcrumb';

describe('Breadcrumb', () => {
  it('renders structure with data-slots, classes, and aria attributes; merges className', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList className="listx">
          <BreadcrumbItem className="itemx">
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="pagex">Library</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const nav = screen.getByLabelText(/breadcrumb/i);
    expect(nav).toHaveAttribute('data-slot', 'breadcrumb');

    const list = document.querySelector('[data-slot="breadcrumb-list"]') as HTMLElement;
    expect(list).toBeTruthy();
    expect(list).toHaveClass('text-muted-foreground');
    expect(list).toHaveClass('listx');

    const item = document.querySelector('[data-slot="breadcrumb-item"]') as HTMLElement;
    expect(item).toBeTruthy();
    expect(item).toHaveClass('inline-flex');
    expect(item).toHaveClass('itemx');

    const link = document.querySelector('[data-slot="breadcrumb-link"]') as HTMLElement;
    expect(link).toBeTruthy();
    expect(link).toHaveClass('transition-colors');

    const page = document.querySelector('[data-slot="breadcrumb-page"]') as HTMLElement;
    expect(page).toBeTruthy();
    expect(page).toHaveAttribute('role', 'link');
    expect(page).toHaveAttribute('aria-current', 'page');
    expect(page).toHaveAttribute('aria-disabled', 'true');
    expect(page).toHaveClass('text-foreground');
    expect(page).toHaveClass('pagex');
  });

  it('BreadcrumbLink renders as child and passes attributes/classes', () => {
    render(
      <BreadcrumbLink asChild className="extra">
        <a href="#" data-testid="child-link">
          Child
        </a>
      </BreadcrumbLink>
    );
    const anchor = screen.getByTestId('child-link');
    expect(anchor.tagName).toBe('A');
    expect(anchor).toHaveAttribute('href', '#');
    expect(anchor).toHaveAttribute('data-slot', 'breadcrumb-link');
    expect(anchor).toHaveClass('transition-colors');
    expect(anchor).toHaveClass('extra');
  });

  it('BreadcrumbSeparator defaults to chevron icon and proper aria', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    );
    const sep = document.querySelector('[data-slot="breadcrumb-separator"]') as HTMLElement;
    expect(sep).toBeTruthy();
    expect(sep).toHaveAttribute('role', 'presentation');
    expect(sep).toHaveAttribute('aria-hidden', 'true');
    // contains an svg icon
    expect(sep.querySelector('svg')).not.toBeNull();
  });

  it('BreadcrumbSeparator renders custom children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator>|</BreadcrumbSeparator>
        </BreadcrumbList>
      </Breadcrumb>
    );
    const sep = document.querySelector('[data-slot="breadcrumb-separator"]') as HTMLElement;
    expect(sep.textContent).toContain('|');
  });

  it('BreadcrumbEllipsis renders with sr-only More text and merges className', () => {
    render(<BreadcrumbEllipsis className="extra" />);
    const ell = document.querySelector('[data-slot="breadcrumb-ellipsis"]') as HTMLElement;
    expect(ell).toBeTruthy();
    expect(ell).toHaveAttribute('role', 'presentation');
    expect(ell).toHaveAttribute('aria-hidden', 'true');
    expect(ell).toHaveClass('flex');
    expect(ell).toHaveClass('extra');
    const sr = ell.querySelector('.sr-only') as HTMLElement | null;
    expect(sr).not.toBeNull();
    expect(sr!.textContent).toMatch(/more/i);
  });
});
