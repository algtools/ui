import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A navigation component for splitting content across multiple pages with previous/next controls and page indicators.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default pagination component with previous/next buttons and page numbers, showing the current active page.',
      },
    },
  },
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component using ellipsis to indicate skipped pages when there are many pages, showing a compact navigation pattern.',
      },
    },
  },
};

export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component on the first page, with the previous button disabled and ellipsis indicating more pages ahead.',
      },
    },
  },
};

export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="pointer-events-none opacity-50" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component on the last page, with the next button disabled and ellipsis indicating previous pages.',
      },
    },
  },
};

export const MiddlePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">15</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component in the middle of a page range, with ellipsis on both sides to indicate pages before and after.',
      },
    },
  },
};

export const SinglePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="pointer-events-none opacity-50" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component for a single page, with both previous and next buttons disabled since there is only one page.',
      },
    },
  },
};

export const FewPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const ControlledPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const renderPaginationItems = () => {
      const items = [];
      const showEllipsis = totalPages > 7;

      // Previous button
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      );

      if (showEllipsis) {
        // First page
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              isActive={currentPage === 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        // Left ellipsis
        if (currentPage > 4) {
          items.push(
            <PaginationItem key="ellipsis-left">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Pages around current
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let page = start; page <= end; page++) {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        }

        // Right ellipsis
        if (currentPage < totalPages - 3) {
          items.push(
            <PaginationItem key="ellipsis-right">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Last page
        if (totalPages > 1) {
          items.push(
            <PaginationItem key={totalPages}>
              <PaginationLink
                href="#"
                isActive={currentPage === totalPages}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Show all pages when total is 7 or less
        for (let page = 1; page <= totalPages; page++) {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Next button
      items.push(
        <PaginationItem key="next">
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      );

      return items;
    };

    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} (Click to navigate)
        </div>
        <Pagination>
          <PaginationContent>{renderPaginationItems()}</PaginationContent>
        </Pagination>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A fully controlled pagination component with state management, dynamically rendering page numbers and ellipsis based on the current page and total pages.',
      },
    },
  },
};

export const SearchResults: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <p className="text-sm text-muted-foreground">
          Showing 1-10 of 247 results for &quot;pagination&quot;
        </p>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h4 className="font-medium text-blue-600">Result {i + 1}: Pagination Component</h4>
            <p className="text-sm text-muted-foreground mt-1">
              A comprehensive pagination component with navigation controls and page indicators for
              handling large datasets efficiently...
            </p>
            <span className="text-xs text-green-600">example.com/components/pagination</span>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">25</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component integrated into a search results page, showing how pagination works with content listings and search result counts.',
      },
    },
  },
};

export const DataTable: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <div className="rounded-md border">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="p-4">User {i + 1}</td>
                  <td className="p-4">user{i + 1}@example.com</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Admin
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing 1-10 of 156 users</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">16</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component integrated into a data table, showing how pagination works with tabular data and record counts.',
      },
    },
  },
};

export const BlogPosts: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        <p className="text-muted-foreground">Insights, tutorials, and updates from our team</p>
      </div>
      <div className="grid gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="flex gap-4 p-6 border rounded-lg">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Blog Post {i + 1}: Building Better User Interfaces
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about the latest trends in UI design and how to implement them in your
                projects. This comprehensive guide covers everything from design principles to
                practical implementation...
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>March {15 + i}, 2024</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>Design</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A pagination component integrated into a blog post listing, showing how pagination works with article grids and content listings.',
      },
    },
  },
};

export const CompactMobile: Story = {
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Mobile Gallery</h3>
        <p className="text-sm text-muted-foreground">Photo 5 of 28</p>
      </div>
      <div className="aspect-square bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
        Photo 5
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">6</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A compact pagination component optimized for mobile devices, showing a minimal number of page buttons suitable for smaller screens.',
      },
    },
  },
};
