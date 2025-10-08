# Linear Tickets - Phase 1: Essential React Hooks

**Repository:** `algtools/ui`
**Branch:** `main`
**Phase:** 1 - Essential Hooks (High Priority)
**Total Tickets:** 12

---

## BAA-73: Setup hooks infrastructure and use-boolean

**Title:** `[UI] Setup hooks directory structure and implement useBoolean`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `infrastructure`, `phase-1`
**Priority:** High
**Estimate:** 2 points

### Description

Setup the base infrastructure for React hooks in the ui package and implement the first utility hook (useBoolean).

### Definition of Ready (DoR)

- [ ] `ROADMAP_SHADCN_IO.md` has been reviewed
- [ ] Phase 1 hooks list is confirmed
- [ ] shadcn.io reference available for useBoolean implementation

### Tasks

- [ ] Create `ui/src/hooks/` directory structure
- [ ] Create `ui/src/hooks/__tests__/` for tests
- [ ] Implement `use-boolean.ts` with toggle, setTrue, setFalse helpers
- [ ] Create `use-boolean.test.ts` with comprehensive tests
- [ ] Update `ui/src/index.ts` to export the hook
- [ ] Add documentation comments (JSDoc)
- [ ] Create example in Storybook (optional but recommended)

### Definition of Done (DoD)

- [ ] Hook is implemented with TypeScript types
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from main index.ts
- [ ] JSDoc documentation added
- [ ] Works in Next.js 15 client components
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

None (first hook)

### Reference

- https://shadcn.io (check useBoolean implementation)
- https://usehooks.com/useboolean

---

## BAA-74: Implement useCounter hook

**Title:** `[UI] Implement useCounter hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`
**Priority:** High
**Estimate:** 1 point

### Description

Implement useCounter hook with increment, decrement, reset, and setValue functionality.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useCounter

### Tasks

- [ ] Implement `use-counter.ts` with full API
- [ ] Create `use-counter.test.ts`
- [ ] Add TypeScript types for options (initial value, min, max)
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook implemented with increment/decrement/reset/setValue
- [ ] Supports min/max boundaries
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-75: Implement useDebounceValue hook

**Title:** `[UI] Implement useDebounceValue hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `performance`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useDebounceValue hook for debouncing state values to prevent excessive updates.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useDebounceValue

### Tasks

- [ ] Implement `use-debounce-value.ts`
- [ ] Create `use-debounce-value.test.ts` with timing tests
- [ ] Add TypeScript generics for value type
- [ ] Support configurable delay
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation with examples

### Definition of Done (DoD)

- [ ] Hook debounces values correctly
- [ ] Configurable delay parameter works
- [ ] Unit tests with timing/async tests pass
- [ ] TypeScript generics work properly
- [ ] Exported from index.ts
- [ ] JSDoc with usage examples
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-76: Implement useLocalStorage hook

**Title:** `[UI] Implement useLocalStorage hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `storage`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useLocalStorage hook for persistent state in localStorage with serialization.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useLocalStorage

### Tasks

- [ ] Implement `use-local-storage.ts`
- [ ] Handle JSON serialization/deserialization
- [ ] Add error handling for storage quota
- [ ] Support SSR (check for window)
- [ ] Create `use-local-storage.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook persists state in localStorage
- [ ] JSON serialization works correctly
- [ ] SSR-safe (doesn't break on server)
- [ ] Error handling for storage failures
- [ ] Unit tests pass with >90% coverage
- [ ] TypeScript generics for value type
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-77: Implement useMediaQuery hook

**Title:** `[UI] Implement useMediaQuery hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `responsive`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useMediaQuery hook for responsive design queries.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useMediaQuery

### Tasks

- [ ] Implement `use-media-query.ts`
- [ ] Use window.matchMedia API
- [ ] Add event listeners for media query changes
- [ ] Support SSR (return false on server)
- [ ] Clean up listeners on unmount
- [ ] Create `use-media-query.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation with examples

### Definition of Done (DoD)

- [ ] Hook responds to media query changes
- [ ] SSR-safe implementation
- [ ] Cleanup on unmount works
- [ ] Unit tests pass (with mocked matchMedia)
- [ ] Common breakpoints documented in JSDoc
- [ ] Exported from index.ts
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-78: Implement useOnClickOutside hook

**Title:** `[UI] Implement useOnClickOutside hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `events`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useOnClickOutside hook for detecting clicks outside an element (useful for modals/dropdowns).

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useOnClickOutside

### Tasks

- [ ] Implement `use-on-click-outside.ts`
- [ ] Support ref or refs array
- [ ] Handle mousedown and touchstart events
- [ ] Clean up event listeners on unmount
- [ ] Create `use-on-click-outside.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook detects clicks outside ref element(s)
- [ ] Supports single ref or array of refs
- [ ] Handles mouse and touch events
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] TypeScript types are correct
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-79: Implement useCopyToClipboard hook

**Title:** `[UI] Implement useCopyToClipboard hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `clipboard`
**Priority:** High
**Estimate:** 1 point

### Description

Implement useCopyToClipboard hook for clipboard operations.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useCopyToClipboard

### Tasks

- [ ] Implement `use-copy-to-clipboard.ts`
- [ ] Use Clipboard API with fallback
- [ ] Return copied state and error state
- [ ] Create `use-copy-to-clipboard.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook copies text to clipboard
- [ ] Returns success/error state
- [ ] Has fallback for older browsers
- [ ] Unit tests pass with mocked clipboard API
- [ ] TypeScript types correct
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-80: Implement useIntersectionObserver hook

**Title:** `[UI] Implement useIntersectionObserver hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `performance`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useIntersectionObserver hook for element visibility detection (lazy loading, scroll animations).

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useIntersectionObserver

### Tasks

- [ ] Implement `use-intersection-observer.ts`
- [ ] Support IntersectionObserver options (threshold, rootMargin)
- [ ] Return entry state (isIntersecting, etc.)
- [ ] Clean up observer on unmount
- [ ] Create `use-intersection-observer.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation with examples

### Definition of Done (DoD)

- [ ] Hook detects element visibility
- [ ] Configurable options (threshold, rootMargin, root)
- [ ] Returns intersection entry data
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with mocked IntersectionObserver
- [ ] TypeScript types correct
- [ ] Exported from index.ts
- [ ] JSDoc with lazy loading example
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-81: Implement useResizeObserver hook

**Title:** `[UI] Implement useResizeObserver hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `layout`
**Priority:** High
**Estimate:** 2 points

### Description

Implement useResizeObserver hook for detecting element size changes.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useResizeObserver

### Tasks

- [ ] Implement `use-resize-observer.ts`
- [ ] Use ResizeObserver API
- [ ] Return size dimensions (width, height)
- [ ] Support custom callback
- [ ] Clean up observer on unmount
- [ ] Create `use-resize-observer.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook detects element size changes
- [ ] Returns current dimensions
- [ ] Optional callback supported
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with mocked ResizeObserver
- [ ] TypeScript types correct
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-82: Implement useHover hook

**Title:** `[UI] Implement useHover hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-1`, `events`
**Priority:** Medium
**Estimate:** 1 point

### Description

Implement useHover hook for detecting hover state on elements.

### Definition of Ready (DoR)

- [ ] Ticket 1 (hooks infrastructure) is completed
- [ ] shadcn.io reference available for useHover

### Tasks

- [ ] Implement `use-hover.ts`
- [ ] Track mouseenter/mouseleave events
- [ ] Support optional delay
- [ ] Create `use-hover.test.ts`
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook tracks hover state correctly
- [ ] Optional delay parameter works
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] TypeScript types correct
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 (hooks infrastructure)

---

## BAA-83: Update documentation for Phase 1 hooks

**Title:** `[UI] Update documentation with Phase 1 hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `documentation`, `phase-1`
**Priority:** Medium
**Estimate:** 1 point

### Description

Update all documentation files to reflect the newly added Phase 1 hooks.

### Definition of Ready (DoR)

- [ ] Tickets 1-10 are completed
- [ ] All Phase 1 hooks are implemented and tested

### Tasks

- [ ] Update `SHADCN_COMPONENTS.md` hooks section
- [ ] Update `MISSING_SHADCN_IO_COMPONENTS.md` (mark Phase 1 as complete)
- [ ] Update `ROADMAP_SHADCN_IO.md` (check off Phase 1 items)
- [ ] Update `README.md` if needed
- [ ] Create usage examples for each hook
- [ ] Update `CHANGELOG.md` or create one

### Definition of Done (DoD)

- [ ] All documentation files updated
- [ ] Phase 1 marked as complete in roadmap
- [ ] Hook examples added
- [ ] No broken links in documentation
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-73 to BAA-82 (all Phase 1 hooks)

---

## BAA-84: Bump version to v1.1.0 for Phase 1 completion

**Title:** `[UI] Version bump to v1.1.0 - Phase 1 hooks release`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `release`, `phase-1`
**Priority:** Medium
**Estimate:** 1 point

### Description

Bump package version to v1.1.0 to reflect the addition of Phase 1 essential hooks.

### Definition of Ready (DoR)

- [ ] Tickets 1-11 are completed
- [ ] All Phase 1 hooks are tested and documented
- [ ] No open bugs for Phase 1 features

### Tasks

- [ ] Update `package.json` version to 1.1.0
- [ ] Create/update `CHANGELOG.md` with Phase 1 changes
- [ ] Tag release in git
- [ ] Build and test package
- [ ] Publish to npm/GitHub packages if applicable
- [ ] Notify team of new release

### Definition of Done (DoD)

- [ ] Version bumped to 1.1.0 in package.json
- [ ] CHANGELOG updated with all Phase 1 hooks
- [ ] Git tag created (v1.1.0)
- [ ] Package builds successfully
- [ ] Published (if applicable)
- [ ] Release notes created
- [ ] PR merged to main

### Dependencies

- **Requires:** Tickets 1-11 (all Phase 1 work)

---

## Summary

**Phase 1 Total:** 12 tickets
**Estimated Points:** 19 points
**High Priority:** 10 tickets
**Medium Priority:** 2 tickets

**Execution Order:**

1. Start with Ticket 1 (infrastructure)
2. Tickets 2-10 can be done in parallel after Ticket 1
3. Ticket 11 (docs) after tickets 2-10
4. Ticket 12 (release) after everything else

**Benefits After Completion:**

- 10 new essential React hooks
- Universal utilities for all projects
- Strong foundation for Phase 2
