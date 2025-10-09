# @algtools/ui Components Reference

This document lists all components currently available in `@algtools/ui`. These are primarily from **shadcn/ui** with custom additions.

> ✅ **Note**: This package includes base **shadcn/ui** components, custom additions, and **Phase 2 AI components** from **shadcn.io**. For additional available components (advanced hooks, animations) see `MISSING_SHADCN_IO_COMPONENTS.md`.

## ✅ Currently Available (70 components + 11 hooks + 12 AI components)

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

### AI Components (12 components) ✨

AI-specific components for building ChatGPT-like interfaces, conversational UIs, and AI-powered experiences:

#### Core Chat Components (6 components)

- **Message** - Chat message display with role-based styling (user/assistant/system) and avatar support
- **Conversation** - Message container with auto-scrolling during streaming and scroll-to-bottom functionality
- **Response** - Markdown renderer optimized for streaming AI responses with syntax highlighting
- **PromptInput** - ChatGPT-style input with auto-resize, submit handling, and keyboard shortcuts
- **CodeBlock** - Code blocks with syntax highlighting (powered by Shiki), language detection, and copy functionality
- **Loader** - Animated indicator for AI thinking/processing states

#### Supporting Components (6 components)

- **Sources** - Expandable citation list for displaying AI sources (like "Used 5 sources")
- **Actions** - Action button group for AI responses (regenerate, copy, feedback, etc.)
- **Tool** - Display AI function/tool calls with parameters and results (OpenAI tool usage pattern)
- **Task** - Task list component showing AI agent work progress with status indicators
- **Reasoning** - Collapsible blocks for displaying AI thinking process and reasoning steps
- **WebPreview** - Preview component for AI-generated websites with iframe support

#### Usage Example

```typescript
import {
  Message,
  Conversation,
  Response,
  PromptInput,
  CodeBlock,
  Loader,
  Sources,
  Actions,
  Tool,
  Task,
  Reasoning,
  WebPreview,
} from '@algtools/ui';
```

#### AI Component Types

All AI components come with comprehensive TypeScript types:

```typescript
import type {
  Role,
  Status,
  Message as MessageType,
  Source,
  Tool,
  Task,
  Suggestion,
  Branch,
  Citation,
  ReasoningStep,
  ModelConfig,
  StreamingState,
  AIComponentProps,
} from '@algtools/ui';
```

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

### AI & Chat Interfaces

- Message, Conversation, Response, PromptInput, CodeBlock, Loader, Sources, Actions, Tool, Task, Reasoning, WebPreview

## Complete Alphabetical List

Accordion, Actions (AI), AddressEditorMX, Alert, AlertDialog, AspectRatio, Avatar, AvatarEditor, Badge, Banner, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, CodeBlock (AI), Collapsible, Combobox, Command, ContextMenu, Conversation (AI), Dialog, Drawer, DropdownMenu, Dropzone, Form, HoverCard, Input, InputOTP, Label, Loader (AI), Logo, Menubar, Message (AI), NavigationMenu, Pagination, PhoneInput, Popover, Progress, PromptInput (AI), RadioGroup, Reasoning (AI), Resizable, Response (AI), ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Sources (AI), Spinner, Switch, Table, Tabs, Tags, Task (AI), Textarea, ThemeSwitcher, Toggle, ToggleGroup, Tool (AI), Tooltip, WebPreview (AI).

## Hooks

### ✅ Phase 1 Hooks (11 hooks - COMPLETE)

All Phase 1 essential hooks are now implemented and available:

#### State Management (2 hooks)

- **useBoolean** - Boolean state with toggle helpers (setTrue, setFalse, toggle)
- **useCounter** - Counter with increment/decrement/reset and min/max boundaries

#### Performance & Timing (1 hook)

- **useDebounceValue** - Debounce state values to prevent excessive updates

#### Browser & Storage (1 hook)

- **useLocalStorage** - Persistent state in localStorage with JSON serialization

#### UI & Layout (4 hooks)

- **useMediaQuery** - Responsive design media queries
- **useIntersectionObserver** - Element visibility detection for lazy loading
- **useResizeObserver** - Element size change detection
- **useIsMobile** - Mobile breakpoint detection (convenience hook using useMediaQuery)

#### Event Handling (2 hooks)

- **useOnClickOutside** - Detect clicks outside an element (for modals/dropdowns)
- **useHover** - Hover state detection with optional delay

#### Clipboard (1 hook)

- **useCopyToClipboard** - Clipboard operations with success/error states

### Import Examples

```typescript
// State management
import { useBoolean, useCounter } from '@algtools/ui';

// Performance
import { useDebounceValue } from '@algtools/ui';

// Storage
import { useLocalStorage } from '@algtools/ui';

// Layout & UI
import {
  useMediaQuery,
  useIntersectionObserver,
  useResizeObserver,
  useIsMobile,
} from '@algtools/ui';

// Events
import { useOnClickOutside, useHover } from '@algtools/ui';

// Clipboard
import { useCopyToClipboard } from '@algtools/ui';
```

### Usage Examples

#### useBoolean

```typescript
function MyComponent() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <div>
      <p>Value: {value ? 'ON' : 'OFF'}</p>
      <Button onClick={toggle}>Toggle</Button>
    </div>
  );
}
```

#### useCounter

```typescript
function Counter() {
  const { value, increment, decrement, reset } = useCounter({
    initialValue: 0,
    min: 0,
    max: 10
  });

  return (
    <div>
      <p>Count: {value}</p>
      <Button onClick={() => increment()}>+1</Button>
      <Button onClick={() => decrement()}>-1</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
```

#### useDebounceValue

```typescript
function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounceValue(search, 500);

  useEffect(() => {
    // API call only triggers after 500ms of no typing
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

#### useLocalStorage

```typescript
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </Button>
  );
}
```

#### useMediaQuery

```typescript
function ResponsiveComponent() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>{isDesktop ? <DesktopView /> : <MobileView />}</div>
  );
}
```

#### useIntersectionObserver

```typescript
function LazyImage({ src }: { src: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '100px'
  });

  const isVisible = entry?.isIntersecting;

  return (
    <img
      ref={ref}
      src={isVisible ? src : '/placeholder.png'}
      alt="Lazy loaded"
    />
  );
}
```

#### useResizeObserver

```typescript
function ResizableBox() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useResizeObserver(ref);

  return (
    <div ref={ref}>
      Size: {size?.width}x{size?.height}
    </div>
  );
}
```

#### useOnClickOutside

```typescript
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref}>
      {isOpen && <DropdownMenu />}
    </div>
  );
}
```

#### useHover

```typescript
function HoverCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);

  return (
    <div ref={ref} style={{ opacity: isHovered ? 1 : 0.5 }}>
      Hover me!
    </div>
  );
}
```

#### useCopyToClipboard

```typescript
function CopyButton({ text }: { text: string }) {
  const { copiedText, copy, error } = useCopyToClipboard();

  return (
    <Button onClick={() => copy(text)}>
      {copiedText ? 'Copied!' : 'Copy'}
    </Button>
  );
}
```

> 📝 **See `MISSING_SHADCN_IO_COMPONENTS.md`** for 25+ additional hooks available in shadcn.io (Phases 2-3)

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

- ✅ ~~**12 AI Components**~~ - **COMPLETE!** (Phase 2)
- 🪝 **25+ Additional React Hooks** (Phase 3 - remaining hooks)
- 🎨 **15+ Animated Button Variants**
- 🎭 **Animation Components**
- 📊 **Enhanced Chart Variants**
- 🧩 **Additional Specialized UI Components**

## Notes

1. **Import Policy**: All components must be imported from `@algtools/ui`
2. **Radix Primitives**: Most components are built on Radix UI for accessibility
3. **Theming**: Components respect the global theme configuration
4. **Composition**: Many components have sub-components (e.g., Card → CardHeader, CardTitle, CardContent, CardFooter)
5. **shadcn/ui vs shadcn.io**: This package has shadcn/ui base + custom additions + Phase 2 AI components from shadcn.io. Phase 3+ hooks and animation components are pending

## Resources

- [AI Components Guide](./AI_COMPONENTS_GUIDE.md) - Comprehensive guide for using AI components
- [shadcn/ui Documentation](https://ui.shadcn.com) - Base UI components documentation
- [shadcn.io](https://shadcn.io) - Extended component collection (AI, hooks, animations)
- [Radix UI Documentation](https://www.radix-ui.com) - Underlying primitives
- `MISSING_SHADCN_IO_COMPONENTS.md` - Detailed analysis of what's missing from shadcn.io
