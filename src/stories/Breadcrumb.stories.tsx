import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, Slash, Dot, ArrowRight, Folder, File, Settings, User, Package } from 'lucide-react';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays the path to the current resource using a hierarchy of links. Helps users understand their location in the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the breadcrumb navigation',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic breadcrumb navigation showing the current page location within the site hierarchy.',
      },
    },
  },
};

export const WithHomeIcon: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Laptop</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A breadcrumb with a home icon for the root navigation item, providing a visual indicator for the home page.',
      },
    },
  },
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components/ui">UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A breadcrumb with an ellipsis indicator to collapse intermediate navigation levels, useful for long navigation paths.',
      },
    },
  },
};

export const CustomSeparators: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs with custom separator styles including slashes, dots, arrows, and text separators for different design aesthetics.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Slash Separator</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Getting Started</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Dot Separator</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Dot />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Dot />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Latest Posts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Arrow Separator</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/analytics">Analytics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Text Separator</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Store</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <span className="text-muted-foreground">in</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/category">Electronics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <span className="text-muted-foreground">→</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Smartphones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const FileSystemNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A breadcrumb navigation for file system paths, displaying folders and files with appropriate icons for each level.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">
            <Folder className="size-4" />
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects/website">
            <Folder className="size-4" />
            website
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects/website/src">
            <Folder className="size-4" />
            src
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <File className="size-4" />
            index.tsx
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const EcommerceBreadcrumb: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'E-commerce breadcrumbs for product categories, including responsive ellipsis for mobile views to handle long category paths.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Product Category</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="size-4" />
                Store
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/men">Men</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/men/clothing">Clothing</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/men/clothing/shirts">Shirts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Casual Button-Down Shirt</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With Ellipsis for Mobile</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Store</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/women">Women</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="md:hidden">
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="md:hidden" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/women/accessories">Accessories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Designer Handbag</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const AdminDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Admin dashboard breadcrumbs with icons for different sections like user management and content management, using ellipsis for deep navigation.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">User Management</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">
                <Settings className="size-4" />
                Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/users">
                <User className="size-4" />
                Users
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Content Management</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/content">Content</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/content/articles">Articles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Article #1234</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const SimpleBreadcrumbs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Simple breadcrumb examples with minimal navigation levels, including two-level and single-page breadcrumbs.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Two Levels</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Single Page</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const ComplexNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A complex breadcrumb navigation with multiple levels, icons, and ellipsis, demonstrating deep hierarchical navigation paths.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace/projects">
            <Package className="size-4" />
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace/projects/ui-library/components">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb Documentation</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const InteractiveBreadcrumb: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'An interactive breadcrumb using buttons instead of links, allowing custom click handlers for navigation actions.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button onClick={() => alert('Navigating to Home')}>
              <Home className="size-4" />
              Home
            </button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button onClick={() => alert('Navigating to Products')}>Products</button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button onClick={() => alert('Navigating to Category')}>Electronics</button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
