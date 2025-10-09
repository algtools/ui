# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.3.0]: https://github.com/algtools/ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/algtools/ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/algtools/ui/releases/tag/v0.1.1
