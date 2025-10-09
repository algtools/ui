# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-10-09

### Added - Phase 3 Hooks ✅

This release adds 24 additional React hooks to the `@algtools/ui` package, completing Phase 3 of the shadcn.io integration roadmap. Combined with Phase 1, we now have **35 total hooks** covering all common React patterns and utilities.

#### State Management Hooks (3 new hooks)

- **useToggle** - Advanced boolean toggle with value options
  - Support for toggling between custom values (not just true/false)
  - Optional default value
  - Type-safe value toggling
- **useMap** - Map data structure state management
  - `set(key, value)` - Add or update entries
  - `remove(key)` - Remove entries
  - `clear()` - Clear all entries
  - `reset()` - Reset to initial state
  - Full Map API support with React state integration
- **useStep** - Step-by-step wizard navigation
  - `goToNextStep()` - Move to next step
  - `goToPrevStep()` - Move to previous step
  - `goToStep(index)` - Jump to specific step
  - `reset()` - Reset to first step
  - `canGoToNextStep` and `canGoToPrevStep` helpers
  - Perfect for multi-step forms and wizards

#### Browser & Storage Hooks (3 new hooks)

- **useSessionStorage** - Session storage management
  - Similar to useLocalStorage but for sessionStorage
  - Automatic serialization/deserialization
  - SSR-safe implementation
  - Cleared when browser/tab closes
- **useReadLocalStorage** - Read-only localStorage access
  - Listen to localStorage changes without setter
  - Perfect for reading shared state
  - Lower overhead than full useLocalStorage
  - SSR-safe implementation
- **useDocumentTitle** - Dynamic browser tab title
  - Update document.title declaratively
  - Optional preserve on unmount
  - SSR-safe implementation

#### Browser API Hooks (2 new hooks)

- **useScript** - Dynamic script loading
  - Load external scripts on demand
  - Status tracking (idle, loading, ready, error)
  - Automatic cleanup on unmount
  - Configurable script attributes
  - Perfect for third-party integrations
- **useWindowSize** - Window dimensions tracking
  - Track window width and height
  - Optional debouncing for performance
  - SSR-safe with configurable initial values
  - Automatic cleanup on unmount
- **useScreen** - Screen information tracking
  - Screen dimensions (width, height)
  - Orientation (portrait/landscape)
  - Color scheme preference
  - Pixel density (devicePixelRatio)
  - SSR-safe implementation

#### Event Handling Hooks (4 new hooks)

- **useClickAnyWhere** - Global click detection
  - Listen to clicks anywhere in the document
  - Supports both mouse and touch events
  - Automatic cleanup on unmount
  - Complements useOnClickOutside
- **useEventListener** - Declarative event listener management
  - Attach listeners to DOM elements, window, or document
  - Automatic cleanup on unmount
  - Type-safe event handling
  - Support for listener options (capture, passive, once)
- **useEventCallback** - Stable event callback references
  - Create stable callback references that don't change on re-renders
  - Always uses latest callback implementation
  - Perfect for event handlers passed to child components
  - Prevents unnecessary re-renders
- **useMousePosition** - Mouse cursor position tracking
  - Track mouse x and y coordinates
  - Optional debouncing for performance
  - Relative to viewport or specific element
  - Automatic cleanup on unmount

#### Performance & Timing Hooks (4 new hooks)

- **useDebounceCallback** - Debounce function calls
  - Debounce any function with configurable delay
  - `cancel()` method to cancel pending calls
  - `flush()` method to invoke immediately
  - Automatic cleanup on unmount
- **useInterval** - Managed setInterval with React
  - Declarative interval management
  - Pause and resume functionality
  - Automatic cleanup on unmount
  - Dynamic delay changes
- **useTimeout** - Managed setTimeout with React
  - Declarative timeout management
  - `clear()` method to cancel timeout
  - `reset()` method to restart timeout
  - Automatic cleanup on unmount
- **useCountdown** - Countdown timer with controls
  - Start, pause, resume, and reset controls
  - Configurable interval and end time
  - Completion callback
  - Returns remaining time
  - Perfect for timers and countdowns

#### Lifecycle & SSR Hooks (4 new hooks)

- **useIsMounted** - Component mount state detection
  - Returns current mounted state
  - Useful for preventing state updates after unmount
  - Prevents "Can't perform a React state update on an unmounted component" warnings
- **useIsClient** - Client-side detection
  - Returns true when running on client, false on server
  - SSR-safe for conditional client-only code
  - Perfect for Next.js and SSR applications
- **useUnmount** - Cleanup on component unmount
  - Run cleanup function when component unmounts
  - Alternative to useEffect cleanup
  - Guaranteed to run only once
- **useIsomorphicLayoutEffect** - SSR-safe useLayoutEffect
  - Uses useLayoutEffect on client
  - Uses useEffect on server (avoids SSR warnings)
  - Drop-in replacement for useLayoutEffect
  - Perfect for Next.js and SSR applications

#### UI & Layout Hooks (1 new hook)

- **useScrollLock** - Prevent body scrolling
  - Lock and unlock body scroll
  - Preserves scrollbar width (no layout shift)
  - Supports nested locks (multiple modals)
  - Automatic cleanup on unmount
  - Perfect for modals, drawers, and overlays

#### Theme & Dark Mode Hooks (2 new hooks)

- **useDarkMode** - Dark mode management (binary)
  - Toggle between light and dark modes
  - Sync with system preferences
  - Persist preference in localStorage
  - `isDarkMode`, `toggle()`, `enable()`, `disable()` API
- **useTernaryDarkMode** - Ternary dark mode (light/dark/system)
  - Three modes: light, dark, system
  - System mode follows OS preference
  - Persist preference in localStorage
  - `mode`, `setMode()`, `toggleMode()` API
  - More flexible than binary dark mode

### Implementation Details

- ✅ All 24 hooks are fully typed with TypeScript
- ✅ Comprehensive test coverage (>85% for all hooks)
- ✅ JSDoc documentation with usage examples
- ✅ SSR-safe implementations where applicable
- ✅ Exported from main package (`@algtools/ui`)
- ✅ Compatible with Next.js 15 and React 18+
- ✅ All hooks follow React best practices
- ✅ Automatic cleanup and memory management

### Complete Hook Collection (35 total hooks)

**Phase 1 Hooks (11 hooks):**

- useBoolean, useCounter
- useDebounceValue
- useLocalStorage
- useMediaQuery, useIntersectionObserver, useResizeObserver, useIsMobile
- useOnClickOutside, useHover
- useCopyToClipboard

**Phase 3 Hooks (24 hooks):**

- useToggle, useMap, useStep
- useSessionStorage, useReadLocalStorage, useDocumentTitle
- useScript, useWindowSize, useScreen
- useClickAnyWhere, useEventListener, useEventCallback, useMousePosition
- useDebounceCallback, useInterval, useTimeout, useCountdown
- useIsMounted, useIsClient, useUnmount, useIsomorphicLayoutEffect
- useScrollLock
- useDarkMode, useTernaryDarkMode

### Documentation

- Updated `SHADCN_COMPONENTS.md` with all 35 hooks organized by category
- Updated `MISSING_SHADCN_IO_COMPONENTS.md` to mark Phase 3 as complete
- Updated `ROADMAP_SHADCN_IO.md` to check off all Phase 3 items
- Added comprehensive hooks categorization guide
- Updated this `CHANGELOG.md`

### Breaking Changes

None - this is a minor version bump with backward-compatible additions.

### Migration Guide

No migration needed. Simply import and use the new hooks:

```typescript
// State Management
import { useToggle, useMap, useStep } from '@algtools/ui';

// Browser & Storage
import { useSessionStorage, useReadLocalStorage, useDocumentTitle } from '@algtools/ui';

// Browser APIs
import { useScript, useWindowSize, useScreen } from '@algtools/ui';

// Event Handling
import {
  useClickAnyWhere,
  useEventListener,
  useEventCallback,
  useMousePosition,
} from '@algtools/ui';

// Performance & Timing
import { useDebounceCallback, useInterval, useTimeout, useCountdown } from '@algtools/ui';

// Lifecycle & SSR
import { useIsMounted, useIsClient, useUnmount, useIsomorphicLayoutEffect } from '@algtools/ui';

// UI & Layout
import { useScrollLock } from '@algtools/ui';

// Theme & Dark Mode
import { useDarkMode, useTernaryDarkMode } from '@algtools/ui';
```

### What's Next

- **Phase 4+**: Animation components and specialized button variants (optional)
- **v1.0.0**: First stable release with all core features

See [ROADMAP_SHADCN_IO.md](./ROADMAP_SHADCN_IO.md) for the complete roadmap.

---

## [0.3.0] - 2025-10-09

### Added - Phase 2 AI Components ✅

This release adds 12 AI-specific components to the `@algtools/ui` package, completing Phase 2 of the shadcn.io integration roadmap. These components enable building ChatGPT-like interfaces, conversational UIs, and AI-powered experiences.

#### Core Chat Components (6 components)

- **Message** - Chat message display with role-based styling
  - Support for user, assistant, and system roles
  - Avatar integration for visual distinction
  - Timestamp display
  - Metadata support
  - Accessible message structure

- **Conversation** - Message container with intelligent scrolling
  - Auto-scroll during streaming responses
  - Scroll-to-bottom button when not at bottom
  - Optimized for long conversation threads
  - Loading state handling
  - Accessible navigation

- **Response** - Markdown renderer optimized for AI
  - Real-time streaming support
  - Syntax highlighting with Shiki
  - GitHub Flavored Markdown (GFM) support
  - Code blocks with copy functionality
  - Responsive rendering

- **PromptInput** - ChatGPT-style input component
  - Auto-resize textarea
  - Keyboard shortcuts (Enter to submit, Shift+Enter for new line)
  - Character/token counting
  - Disabled state during loading
  - Accessible input with ARIA labels

- **CodeBlock** - Advanced code display
  - Syntax highlighting powered by Shiki
  - 100+ language support
  - Line numbers (optional)
  - Line highlighting
  - Copy to clipboard functionality
  - Theme-aware (light/dark mode)

- **Loader** - AI thinking indicator
  - Multiple animation variants
  - Customizable loading messages
  - Accessible loading announcements
  - Smooth animations

#### Supporting Components (6 components)

- **Sources** - Citation management
  - Expandable/collapsible source list
  - Source metadata display (title, URL, description)
  - Icon/favicon support
  - Click handlers for navigation
  - Accessible disclosure pattern

- **Actions** - Action button group
  - Common actions (copy, regenerate, feedback)
  - Icon support with Lucide icons
  - Flexible action configuration
  - Keyboard navigation
  - Accessible button group

- **Tool** - Function call visualization
  - Display AI tool/function calls
  - Parameter display with formatting
  - Result/output visualization
  - Status indicators (pending, running, complete, failed)
  - OpenAI tool usage pattern support

- **Task** - Agent task tracking
  - Task status visualization (pending, in-progress, complete, failed, cancelled)
  - Progress indicators
  - Error message display
  - Timestamp tracking
  - TaskList for multiple tasks

- **Reasoning** - AI thinking process
  - Collapsible reasoning steps
  - Step-by-step process visualization
  - Order/sequence display
  - Expandable content sections
  - Accessible disclosure

- **WebPreview** - Website preview
  - Iframe-based preview for AI-generated sites
  - Security-focused sandbox attributes
  - Loading states
  - Fullscreen mode (optional)
  - Accessible preview controls

#### AI Types System

Comprehensive TypeScript types for all AI components:

```typescript
- Role: 'user' | 'assistant' | 'system'
- Status: 'pending' | 'in-progress' | 'complete' | 'failed' | 'cancelled'
- Message: { id, role, content, timestamp, metadata }
- Source: { id, title, url, description, iconUrl }
- Tool: { name, description, parameters, result, status }
- Task: { id, title, status, progress, error, timestamps }
- Suggestion: { id, text, icon, onClick }
- Branch: { id, title, content, timestamp }
- Citation: { id, number, source, excerpt }
- ReasoningStep: { id, title, content, order }
- ModelConfig: { id, name, description, maxTokens, supportsStreaming }
- StreamingState: { isStreaming, canCancel, onCancel }
- AIComponentProps: { className, style }
```

### Implementation Details

- ✅ All 12 components fully typed with TypeScript
- ✅ Comprehensive test coverage (>85% for all components)
- ✅ JSDoc documentation with usage examples
- ✅ Storybook stories for all components
- ✅ Exported from main package (`@algtools/ui`)
- ✅ Full accessibility support (WCAG 2.1 AA)
- ✅ Compatible with Next.js 15 and React 18+
- ✅ Streaming response support
- ✅ Theme-aware (light/dark mode)

### Dependencies Added

- `react-markdown` (v10.1.0) - Markdown rendering
- `remark-gfm` (v4.0.1) - GitHub Flavored Markdown support
- `rehype-highlight` (v7.0.2) - Syntax highlighting
- `rehype-raw` (v7.0.0) - Raw HTML support in markdown
- `shiki` (v3.13.0) - Advanced syntax highlighting

### Documentation

- Created `AI_COMPONENTS_GUIDE.md` - Comprehensive usage guide with examples
- Updated `SHADCN_COMPONENTS.md` - Added AI components section
- Updated `MISSING_SHADCN_IO_COMPONENTS.md` - Marked Phase 2 as complete
- Updated `ROADMAP_SHADCN_IO.md` - Checked off Phase 2 items
- Updated `/src/components/ai/README.md` - AI components conventions
- Updated `CHANGELOG.md` - This file

### Use Cases Enabled

✅ **ChatGPT-like Interfaces** - Build conversational AI applications
✅ **AI Agent Dashboards** - Visualize AI agent work and progress
✅ **Streaming Response UIs** - Handle real-time AI streaming
✅ **Code Generation Tools** - Display and manage generated code
✅ **AI Research Tools** - Show AI reasoning and citations

### Breaking Changes

None - this is a minor version bump with backward-compatible additions.

### Migration Guide

No migration needed. Simply import and use the new AI components:

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

import type {
  Role,
  Status,
  Message as MessageType,
  Source,
  Tool,
  Task,
  ReasoningStep,
  StreamingState,
} from '@algtools/ui';
```

### Complete Example

See `AI_COMPONENTS_GUIDE.md` for a complete ChatGPT-like interface example using multiple AI components together.

### What's Next

- **Phase 3**: Additional React Hooks (25+ utility hooks)
- **Phase 4+**: Animation components and enhanced charts

See [ROADMAP_SHADCN_IO.md](./ROADMAP_SHADCN_IO.md) for the complete roadmap.

---

## [0.2.0] - 2025-10-08

### Added - Phase 1 Essential Hooks ✅

This release adds 11 essential React hooks to the `@algtools/ui` package, completing Phase 1 of the shadcn.io integration roadmap.

#### State Management Hooks

- **useBoolean** - Boolean state management with convenient helper functions
  - `value` - Current boolean value
  - `setTrue()` - Set value to true
  - `setFalse()` - Set value to false
  - `toggle()` - Toggle the current value
  - `setValue(boolean)` - Set a specific value

- **useCounter** - Counter state with increment/decrement/reset functionality
  - Supports min/max boundaries
  - Configurable initial value
  - Increment/decrement by custom delta
  - Reset to initial value

#### Performance & Timing Hooks

- **useDebounceValue** - Debounce state values to prevent excessive updates
  - Configurable delay
  - Generic type support
  - Perfect for search inputs and API calls

#### Browser & Storage Hooks

- **useLocalStorage** - Persistent state in localStorage with JSON serialization
  - SSR-safe implementation
  - Automatic serialization/deserialization
  - Error handling for storage quota
  - Generic type support

#### UI & Layout Hooks

- **useMediaQuery** - Responsive design media queries
  - Uses window.matchMedia API
  - SSR-safe (returns false on server)
  - Automatic cleanup on unmount
  - Responds to media query changes in real-time

- **useIntersectionObserver** - Element visibility detection for lazy loading
  - Configurable threshold and rootMargin
  - Returns IntersectionObserver entry data
  - Perfect for lazy loading images and infinite scroll
  - Automatic cleanup on unmount

- **useResizeObserver** - Element size change detection
  - Returns current width and height
  - Optional custom callback
  - Uses ResizeObserver API
  - Automatic cleanup on unmount

- **useIsMobile** - Mobile breakpoint detection
  - Convenience hook using useMediaQuery
  - Default breakpoint: 768px
  - Customizable breakpoint

#### Event Handling Hooks

- **useOnClickOutside** - Detect clicks outside an element
  - Supports single ref or array of refs
  - Handles both mouse and touch events
  - Perfect for modals, dropdowns, and popovers
  - Automatic cleanup on unmount

- **useHover** - Hover state detection
  - Optional hover delay
  - Tracks mouseenter/mouseleave events
  - Automatic cleanup on unmount

#### Clipboard Hooks

- **useCopyToClipboard** - Clipboard operations with success/error states
  - Uses modern Clipboard API
  - Returns copied text and error state
  - Fallback for older browsers

### Implementation Details

- ✅ All hooks are fully typed with TypeScript
- ✅ Comprehensive test coverage (>85%)
- ✅ JSDoc documentation with usage examples
- ✅ SSR-safe implementations where applicable
- ✅ Exported from main package (`@algtools/ui`)
- ✅ Compatible with Next.js 15 and React 18+

### Documentation

- Updated `SHADCN_COMPONENTS.md` with complete hooks documentation and examples
- Updated `MISSING_SHADCN_IO_COMPONENTS.md` to mark Phase 1 as complete
- Updated `ROADMAP_SHADCN_IO.md` to reflect Phase 1 completion
- Updated `README.md` with Phase 1 status
- Created this `CHANGELOG.md` for tracking releases

### Breaking Changes

None - this is a minor version bump with backward-compatible additions.

### Migration Guide

No migration needed. Simply import and use the new hooks:

```typescript
import {
  useBoolean,
  useCounter,
  useDebounceValue,
  useLocalStorage,
  useMediaQuery,
  useIntersectionObserver,
  useResizeObserver,
  useIsMobile,
  useOnClickOutside,
  useHover,
  useCopyToClipboard,
} from '@algtools/ui';
```

### What's Next

- **Phase 2**: AI Components (Conditional - if building AI features)
- **Phase 3**: Remaining hooks (25+ additional utility hooks)

See [ROADMAP_SHADCN_IO.md](./ROADMAP_SHADCN_IO.md) for the complete roadmap.

---

## [0.1.1] - 2025-09-XX

### Added

- Initial release with 58 shadcn/ui components
- Custom components: AvatarEditor, AddressEditorMX, PhoneInput, Tags, Dropzone, Banner, Logo
- Theme system with ThemeSwitcher
- Font management with FontProvider
- Utilities: `cn` function for class merging
- Initial hook: `useIsMobile`

### Features

- Next.js 15 compatibility
- Tailwind CSS v4 support
- TypeScript support
- Storybook documentation
- Comprehensive test coverage
- GitHub Pages deployment for Storybook

[0.4.0]: https://github.com/algtools/ui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/algtools/ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/algtools/ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/algtools/ui/releases/tag/v0.1.1
