# @algtools/ui Components Reference

This document lists all components currently available in `@algtools/ui`. These are primarily from **shadcn/ui** with custom additions.

> ⚠️ **Note**: This package currently includes base **shadcn/ui** components plus custom additions. For components from **shadcn.io** (AI components, advanced hooks, animations) see `MISSING_SHADCN_IO_COMPONENTS.md`.

## ✅ Currently Available (58 components + 1 hook)

### Layout & Structure (8 components)

- **Accordion** - Vertically stacked set of interactive headings that each reveal a section of content
- **Card** - Container for grouping related content and actions (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Collapsible** - Interactive component which expands/collapses a panel
- **ScrollArea** - Custom styled scrollable area
- **Separator** - Visually or semantically separates content
- **Sheet** - Side panel that slides in from the edge of the screen
- **Sidebar** - Collapsible sidebar navigation component
- **Resizable** - Resizable panel groups for creating flexible layouts

### Navigation (8 components)

- **Breadcrumb** - Navigation aid showing the current page's location within a site hierarchy
- **Command** - Fast, composable command menu (Command Palette / ⌘K menu)
- **ContextMenu** - Right-click menu displaying a list of actions
- **DropdownMenu** - Menu that displays a list of actions or selections
- **Menubar** - Horizontal menu bar (like in desktop applications)
- **NavigationMenu** - Collection of links for navigating websites
- **Pagination** - Navigate between multiple pages
- **Tabs** - Set of layered sections of content (tab panels) displayed one at a time

### Forms & Inputs (16 components)

- **Button** - Clickable button element
- **Calendar** - Date picker component
- **Checkbox** - Control that allows selection of multiple options from a set
- **Combobox** - Combination of input and select dropdown
- **Form** - Form wrapper with validation (using react-hook-form and zod)
- **Input** - Text input field
- **InputOTP** - One-time password input component
- **Label** - Label for form controls
- **PhoneInput** - Phone number input with country code selector
- **RadioGroup** - Set of checkable buttons where only one can be checked at a time
- **Select** - Dropdown selection control
- **Slider** - Input for selecting a value from a range
- **Switch** - Toggle control (on/off)
- **Textarea** - Multi-line text input
- **Toggle** - Two-state button (pressed/not pressed)
- **ToggleGroup** - Group of toggle buttons

### Data Display (10 components)

- **Avatar** - Graphical representation of a user or entity
- **AvatarEditor** - Interactive avatar upload and cropping component
- **Badge** - Small status descriptor
- **Banner** - Prominent message banner for announcements
- **Chart** - Data visualization components
- **HoverCard** - Popover that displays content when hovering over an element
- **Logo** - Company/brand logo component
- **Progress** - Visual indicator showing the completion progress
- **Skeleton** - Placeholder preview of content before it loads
- **Table** - Semantic table component (Table, TableHeader, TableBody, TableRow, TableCell, etc.)

### Feedback & Overlays (8 components)

- **Alert** - Callout message to attract user attention
- **AlertDialog** - Modal dialog that interrupts the user with important content
- **Dialog** - Window overlaid on primary window or another dialog
- **Drawer** - Panel that slides in from the edge of the screen
- **Popover** - Floating content that displays rich content in a portal
- **Sonner** - Toast notification system (elegant toast component)
- **Spinner** - Loading spinner indicator
- **Tooltip** - Popup that displays information related to an element

### Media & File Upload (3 components)

- **AspectRatio** - Maintains consistent aspect ratio for content (useful for images/videos)
- **Carousel** - Slideshow component for cycling through elements
- **Dropzone** - Drag and drop file upload area

### Specialized Components (5 components)

- **AddressEditorMX** - Mexican address input and editor
- **Tags** - Tag input and management component
- **ThemeSwitcher** - Theme toggle with light/dark/system modes

## Component Import Examples

### Basic Import

```typescript
import { Button } from '@algtools/ui';
```

### Multiple Components

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@algtools/ui';
```

### Complex Layouts

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@algtools/ui';
```

## Component Categories by Use Case

### Building Forms

- Form, Label, Input, InputOTP, Textarea, Select, Combobox, Checkbox, RadioGroup, Switch, Button, Calendar, Slider, Toggle, ToggleGroup, PhoneInput

### Creating Modals & Overlays

- Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip

### Navigation & Menus

- NavigationMenu, Menubar, DropdownMenu, ContextMenu, Command, Breadcrumb, Tabs, Pagination, Sidebar

### Displaying Data

- Table, Card, Badge, Avatar, AvatarEditor, Progress, Skeleton, Chart, Banner, Logo

### User Feedback & Loading States

- Alert, Sonner, Tooltip, Spinner, Progress

### Layout & Structure

- Accordion, Collapsible, Separator, ScrollArea, Card, Carousel, Resizable, AspectRatio, Sidebar

### File & Media Management

- Dropzone, AspectRatio, Carousel, AvatarEditor

### Specialized Inputs

- PhoneInput, AddressEditorMX, InputOTP, Tags, Combobox

### Theming

- ThemeSwitcher

## Complete Alphabetical List

Accordion, AddressEditorMX, Alert, AlertDialog, AspectRatio, Avatar, AvatarEditor, Badge, Banner, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Dropzone, Form, HoverCard, Input, InputOTP, Label, Logo, Menubar, NavigationMenu, Pagination, PhoneInput, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Tags, Textarea, ThemeSwitcher, Toggle, ToggleGroup, Tooltip.

## Hooks

Currently available hooks:

- **use-mobile** - Mobile breakpoint detection

```typescript
import { useMobile } from '@algtools/ui/hooks/use-mobile';
```

> 📝 **See `MISSING_SHADCN_IO_COMPONENTS.md`** for 35+ additional hooks available in shadcn.io

## Utility Exports

In addition to components, `@algtools/ui` exports useful utilities:

- **cn** - Utility function for merging Tailwind CSS classes
- **FontProvider** - Provider component for font management
- **useFonts** - React hook for accessing font configuration

```typescript
import { cn, FontProvider, useFonts } from '@algtools/ui';
```

## What's Missing?

See **`MISSING_SHADCN_IO_COMPONENTS.md`** for a comprehensive analysis of shadcn.io components not yet in this package:

- 🤖 **16 AI Components** (Message, Conversation, Response, etc.)
- 🪝 **35+ React Hooks** (useDebounce, useLocalStorage, etc.)
- 🎨 **15+ Animated Button Variants**
- 🎭 **Animation Components**
- 📊 **Enhanced Chart Variants**
- 🧩 **Specialized UI Components**

## Notes

1. **Import Policy**: All components must be imported from `@algtools/ui`
2. **Radix Primitives**: Most components are built on Radix UI for accessibility
3. **Theming**: Components respect the global theme configuration
4. **Composition**: Many components have sub-components (e.g., Card → CardHeader, CardTitle, CardContent, CardFooter)
5. **shadcn/ui vs shadcn.io**: This package currently has shadcn/ui base + custom additions. shadcn.io has additional AI/animation/hook components

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com) - Base UI components documentation
- [shadcn.io](https://shadcn.io) - Extended component collection (AI, hooks, animations)
- [Radix UI Documentation](https://www.radix-ui.com) - Underlying primitives
- `MISSING_SHADCN_IO_COMPONENTS.md` - Detailed analysis of what's missing from shadcn.io
