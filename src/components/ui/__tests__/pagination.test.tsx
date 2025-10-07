import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '../pagination';

describe('Pagination', () => {
  it('renders root, content, items, and controls with data-slots and aria attributes', () => {
    render(
      <Pagination className="root-extra">
        <PaginationContent className="content-extra">
          <PaginationItem>
            <PaginationPrevious href="#prev" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const root = document.querySelector('[data-slot="pagination"]') as HTMLElement | null;
    const content = document.querySelector(
      '[data-slot="pagination-content"]'
    ) as HTMLElement | null;
    const items = document.querySelectorAll('[data-slot="pagination-item"]');
    const links = document.querySelectorAll('[data-slot="pagination-link"]');
    const prev = screen.getByLabelText(/go to previous page/i);
    const next = screen.getByLabelText(/go to next page/i);
    const ellipsis = document.querySelector('[data-slot="pagination-ellipsis"]');

    expect(root).not.toBeNull();
    expect(root).toHaveAttribute('aria-label', 'pagination');
    expect(root).toHaveClass('root-extra');

    expect(content).not.toBeNull();
    expect(content).toHaveClass('content-extra');
    expect(items.length).toBeGreaterThan(0);
    expect(links.length).toBeGreaterThan(0);
    expect(prev).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(ellipsis).not.toBeNull();

    // Previous and Next visible text nodes are present in DOM
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('marks the active link with aria-current and data-active', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const active = screen.getByRole('link', { name: '2' });
    const inactive = screen.getByRole('link', { name: '1' });

    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveAttribute('data-active', 'true');
    expect(inactive).not.toHaveAttribute('aria-current');
    expect(inactive).not.toHaveAttribute('data-active');
  });
});
