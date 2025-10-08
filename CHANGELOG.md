# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.2.0]: https://github.com/algtools/ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/algtools/ui/releases/tag/v0.1.1
