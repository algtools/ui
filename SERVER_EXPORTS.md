# Server Exports

This package provides server-side exports that can be used in Next.js server components, including `loading.tsx` files.

## Usage

Import server-safe components from the server export:

```tsx
// In loading.tsx or other server components
import { Skeleton, Spinner, Card, cn } from '@algtools/ui/server';

export default function Loading() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </Card>

      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
```

## Available Components

The following components are exported from `@algtools/ui/server` and are safe for server-side rendering:

### Layout & Structure

- `Skeleton` - Content placeholder
- `Spinner` - Loading spinner
- `Card` - Container component with various variants
- `Separator` - Visual divider
- `AspectRatio` - Maintains aspect ratio
- `Resizable` - Resizable panels
- `ScrollArea` - Scrollable container

### Form Elements (Static)

- `Input` - Text input field
- `Label` - Form label
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `RadioGroup` - Radio button group
- `Switch` - Toggle switch
- `Slider` - Range slider
- `Progress` - Progress indicator

### Data Display

- `Table` - Data table
- `Tabs` - Tabbed interface
- `Accordion` - Collapsible sections
- `Collapsible` - Expandable content
- `Pagination` - Page navigation
- `Badge` - Status badge
- `Avatar` - User avatar

### Navigation

- `NavigationMenu` - Main navigation
- `Menubar` - Application menu
- `Breadcrumb` - Navigation breadcrumbs

### Overlays & Modals

- `Dialog` - Modal dialog
- `Drawer` - Slide-out drawer
- `Sheet` - Bottom sheet
- `Popover` - Floating content
- `Tooltip` - Hover tooltip
- `HoverCard` - Hover content card
- `Alert` - Alert message
- `AlertDialog` - Confirmation dialog

### Interactive Components

- `Toggle` - Toggle button
- `ContextMenu` - Right-click menu
- `DropdownMenu` - Dropdown menu
- `Command` - Command palette

### Utilities

- `cn` - Class name utility function

## Components NOT Available in Server Export

The following components are **NOT** exported from the server path because they use hooks, client-side state, or browser APIs:

- `Form` - Uses React Hook Form hooks
- `ThemeSwitcher` - Uses next-themes and complex client logic
- `Logo` - Uses next-themes for theme detection
- `Sonner` - Toast notification system with next-themes
- `AvatarEditor` - Complex state management and canvas manipulation
- `Carousel` - State management and event handlers
- `Sidebar` - State management and window event listeners
- `Chart` - Uses React context and complex client logic
- `Calendar` - Uses refs and effects
- `ToggleGroup` - Uses React context
- `InputOTP` - Uses React context

These components should be imported from the main export (`@algtools/ui`) and used only in client components.

## Benefits

- **Server-Side Rendering**: These components can be rendered on the server
- **Loading States**: Perfect for `loading.tsx` files in Next.js 13+
- **SEO Friendly**: Server-rendered content is better for search engines
- **Performance**: Reduces client-side JavaScript bundle
- **Accessibility**: Server-rendered components maintain accessibility features

## Example: Loading Page

```tsx
// app/dashboard/loading.tsx
import { Skeleton, Card, Spinner } from '@algtools/ui/server';

export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-8 w-[80px]" />
          </Card>
        ))}
      </div>

      {/* Table skeleton */}
      <Card className="p-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
      </Card>

      {/* Loading spinner */}
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
```

## Notes

- All server-exported components maintain their full functionality
- Interactive features work normally on the client
- Components are optimized for both server and client rendering
- Use in combination with client components as needed
- The main export (`@algtools/ui`) still contains all components for client-side usage
