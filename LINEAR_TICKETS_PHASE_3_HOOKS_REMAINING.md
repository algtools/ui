# Linear Tickets - Phase 3: Remaining React Hooks

**Repository:** `algtools/ui`
**Branch:** `main`
**Phase:** 3 - Remaining Hooks (Medium Priority)
**Total Tickets:** 15

> **Note:** These are nice-to-have utilities. Implement based on project needs.

---

## Storage & Browser Hooks (3 tickets)

### BAA-104: Implement storage hooks (Session & Read)

**Title:** `[UI] Implement useSessionStorage and useReadLocalStorage hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `storage`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useSessionStorage (similar to useLocalStorage) and useReadLocalStorage (read-only variant).

### Definition of Ready (DoR)

- [ ] Phase 1 completed (useLocalStorage exists as reference)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-session-storage.ts` (similar to localStorage)
- [ ] Implement `use-read-local-storage.ts` (read-only, no setter)
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Both hooks implemented with TypeScript
- [ ] useSessionStorage persists to sessionStorage
- [ ] useReadLocalStorage reads localStorage without setter
- [ ] SSR-safe implementations
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion (BAA-76 - useLocalStorage as reference)

---

### BAA-105: Implement document & script hooks

**Title:** `[UI] Implement useDocumentTitle and useScript hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `browser`
**Priority:** Low
**Estimate:** 2 points

### Description

Implement useDocumentTitle for dynamic browser tab titles and useScript for dynamic script loading.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-document-title.ts`
- [ ] Implement `use-script.ts` with load/error states
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useDocumentTitle updates browser tab title
- [ ] useScript loads scripts dynamically with states
- [ ] SSR-safe implementations
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-106: Implement window & screen hooks

**Title:** `[UI] Implement useWindowSize and useScreen hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `browser`, `responsive`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useWindowSize for tracking window dimensions and useScreen for screen information.

### Definition of Ready (DoR)

- [ ] Phase 1 completed (use-mobile as reference)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-window-size.ts`
- [ ] Implement `use-screen.ts`
- [ ] Add debouncing for resize events
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useWindowSize tracks window dimensions
- [ ] useScreen provides screen info
- [ ] Resize events debounced properly
- [ ] SSR-safe implementations
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion
- **May use:** BAA-75 (useDebounceValue)

---

## Event Handling Hooks (3 tickets)

### BAA-107: Implement click detection hooks

**Title:** `[UI] Implement useClickAnyWhere hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `events`
**Priority:** Low
**Estimate:** 1 point

### Description

Implement useClickAnyWhere for global click detection (complements useOnClickOutside).

### Definition of Ready (DoR)

- [ ] Phase 1 completed (useOnClickOutside as reference)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-click-anywhere.ts`
- [ ] Handle mousedown and touchstart
- [ ] Create tests
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook detects global clicks
- [ ] Mouse and touch events handled
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion (BAA-78 - useOnClickOutside as reference)

---

### BAA-108: Implement event listener hooks

**Title:** `[UI] Implement useEventListener and useEventCallback hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `events`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useEventListener for DOM event listeners and useEventCallback for stable event callbacks.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-event-listener.ts`
- [ ] Implement `use-event-callback.ts`
- [ ] Support element refs or window/document
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useEventListener attaches/removes listeners correctly
- [ ] useEventCallback provides stable callback reference
- [ ] Cleanup on unmount works
- [ ] TypeScript types correct
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-109: Implement mouse tracking hook

**Title:** `[UI] Implement useMousePosition hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `events`
**Priority:** Low
**Estimate:** 1 point

### Description

Implement useMousePosition for tracking mouse cursor position.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-mouse-position.ts`
- [ ] Track x, y coordinates
- [ ] Add debouncing/throttling option
- [ ] Create tests
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook tracks mouse position
- [ ] Optional debouncing works
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

## Timing & Performance Hooks (3 tickets)

### BAA-110: Implement useDebounceCallback hook

**Title:** `[UI] Implement useDebounceCallback hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `performance`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useDebounceCallback for debouncing function calls (complements useDebounceValue).

### Definition of Ready (DoR)

- [ ] Phase 1 completed (useDebounceValue as reference)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-debounce-callback.ts`
- [ ] Support cancel/flush methods
- [ ] Create tests with timing
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook debounces callback correctly
- [ ] Cancel and flush work
- [ ] Cleanup on unmount works
- [ ] Unit tests with timing pass
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion (BAA-75 - useDebounceValue as reference)

---

### BAA-111: Implement timer hooks

**Title:** `[UI] Implement useInterval and useTimeout hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `timing`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useInterval and useTimeout for managing setInterval and setTimeout with React.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-interval.ts`
- [ ] Implement `use-timeout.ts`
- [ ] Support pause/resume for interval
- [ ] Handle cleanup automatically
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useInterval manages setInterval correctly
- [ ] useTimeout manages setTimeout correctly
- [ ] Pause/resume works for interval
- [ ] Automatic cleanup on unmount
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-112: Implement useCountdown hook

**Title:** `[UI] Implement useCountdown hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `timing`
**Priority:** Low
**Estimate:** 2 points

### Description

Implement useCountdown timer with play/pause controls.

### Definition of Ready (DoR)

- [ ] Ticket 39 completed (useInterval as base)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-countdown.ts`
- [ ] Support start/pause/resume/reset
- [ ] Return time remaining
- [ ] Create tests
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook counts down correctly
- [ ] Play/pause/reset controls work
- [ ] Completion callback works
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-111 (useInterval)

---

## Lifecycle & Detection Hooks (3 tickets)

### BAA-113: Implement lifecycle hooks

**Title:** `[UI] Implement useIsMounted, useUnmount, and useIsClient hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `lifecycle`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement lifecycle detection hooks for mount state, unmount cleanup, and client-side detection.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-is-mounted.ts`
- [ ] Implement `use-unmount.ts`
- [ ] Implement `use-is-client.ts` (SSR detection)
- [ ] Create tests for all three hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useIsMounted tracks mount state correctly
- [ ] useUnmount runs cleanup on unmount
- [ ] useIsClient detects client-side correctly
- [ ] SSR-safe implementations
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-114: Implement useIsomorphicLayoutEffect hook

**Title:** `[UI] Implement useIsomorphicLayoutEffect hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `lifecycle`, `ssr`
**Priority:** Low
**Estimate:** 1 point

### Description

Implement useIsomorphicLayoutEffect for SSR-safe layout effects.

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-isomorphic-layout-effect.ts`
- [ ] Use useLayoutEffect on client, useEffect on server
- [ ] Create tests
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook switches between useLayoutEffect/useEffect correctly
- [ ] SSR-safe (no warnings)
- [ ] Works in Next.js 15
- [ ] Unit tests pass
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-115: Implement useScrollLock hook

**Title:** `[UI] Implement useScrollLock hook`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `ui`
**Priority:** Medium
**Estimate:** 2 points

### Description

Implement useScrollLock for preventing scrolling (useful for modals).

### Definition of Ready (DoR)

- [ ] Phase 1 completed
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-scroll-lock.ts`
- [ ] Lock/unlock body scroll
- [ ] Preserve scrollbar width
- [ ] Handle nested locks (counter)
- [ ] Create tests
- [ ] Update `ui/src/index.ts` export
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] Hook locks/unlocks scroll correctly
- [ ] Scrollbar width preserved (no layout shift)
- [ ] Nested locks work (multiple modals)
- [ ] Cleanup on unmount works
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

## State Management & Theme Hooks (3 tickets)

### BAA-116: Implement state management hooks

**Title:** `[UI] Implement useToggle, useMap, and useStep hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `state`
**Priority:** Low
**Estimate:** 2 points

### Description

Implement advanced state management hooks for toggle, Map data structure, and step navigation.

### Definition of Ready (DoR)

- [ ] Phase 1 completed (useBoolean, useCounter as reference)
- [ ] shadcn.io reference available

### Tasks

- [ ] Implement `use-toggle.ts` (advanced boolean with options)
- [ ] Implement `use-map.ts` (Map data structure management)
- [ ] Implement `use-step.ts` (wizard/stepper navigation)
- [ ] Create tests for all three hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useToggle provides advanced boolean state
- [ ] useMap manages Map data structure
- [ ] useStep handles step navigation (next/prev/goto)
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion

---

### BAA-117: Implement dark mode hooks

**Title:** `[UI] Implement useDarkMode and useTernaryDarkMode hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `hooks`, `phase-3`, `theme`
**Priority:** Low
**Estimate:** 2 points

### Description

Implement dark mode management hooks with system preference sync.

### Definition of Ready (DoR)

- [ ] Phase 1 completed (useLocalStorage, useMediaQuery as base)
- [ ] shadcn.io reference available
- [ ] ThemeSwitcher component exists as reference

### Tasks

- [ ] Implement `use-dark-mode.ts` (binary light/dark)
- [ ] Implement `use-ternary-dark-mode.ts` (light/dark/system)
- [ ] Sync with system preferences
- [ ] Persist preference in localStorage
- [ ] Create tests for both hooks
- [ ] Update `ui/src/index.ts` exports
- [ ] Add JSDoc documentation

### Definition of Done (DoD)

- [ ] useDarkMode manages light/dark mode
- [ ] useTernaryDarkMode adds system option
- [ ] System preference sync works
- [ ] Preference persists in localStorage
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

### Dependencies

- **Requires:** Phase 1 completion (BAA-76, BAA-77)

---

### BAA-118: Update documentation for Phase 3 hooks

**Title:** `[UI] Update documentation with Phase 3 remaining hooks`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `documentation`, `phase-3`
**Priority:** Medium
**Estimate:** 1 point

### Description

Update all documentation files to reflect Phase 3 hooks completion.

### Definition of Ready (DoR)

- [ ] Tickets 32-45 are completed
- [ ] All Phase 3 hooks are implemented and tested

### Tasks

- [ ] Update `SHADCN_COMPONENTS.md` hooks section
- [ ] Update `MISSING_SHADCN_IO_COMPONENTS.md` (mark Phase 3 as complete)
- [ ] Update `ROADMAP_SHADCN_IO.md` (check off Phase 3 items)
- [ ] Add hooks categorization guide
- [ ] Update `CHANGELOG.md`

### Definition of Done (DoD)

- [ ] All documentation files updated
- [ ] Phase 3 marked as complete in roadmap
- [ ] Hooks guide created
- [ ] No broken links in documentation
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-104 to BAA-117 (all Phase 3 hooks)

---

### BAA-119: Bump version to v1.3.0 for Phase 3 completion

**Title:** `[UI] Version bump to v1.3.0 - Phase 3 hooks release`

**Repository:** algtools/ui
**Branch:** main
**Labels:** `release`, `phase-3`
**Priority:** Medium
**Estimate:** 1 point

### Description

Bump package version to v1.3.0 to reflect Phase 3 hooks completion.

### Definition of Ready (DoR)

- [ ] Tickets 32-46 are completed
- [ ] All Phase 3 hooks are tested and documented
- [ ] No open bugs for Phase 3 features

### Tasks

- [ ] Update `package.json` version to 1.3.0
- [ ] Update `CHANGELOG.md` with Phase 3 changes
- [ ] Tag release in git
- [ ] Build and test package
- [ ] Publish to npm/GitHub packages if applicable
- [ ] Notify team of new release

### Definition of Done (DoD)

- [ ] Version bumped to 1.3.0 in package.json
- [ ] CHANGELOG updated with all Phase 3 hooks
- [ ] Git tag created (v1.3.0)
- [ ] Package builds successfully
- [ ] Published (if applicable)
- [ ] Release notes created
- [ ] PR merged to main

### Dependencies

- **Requires:** BAA-104 to BAA-118 (all Phase 3 work)

---

## Summary

**Phase 3 Total:** 15 tickets
**Estimated Points:** 26 points
**High Priority:** 0 tickets
**Medium Priority:** 8 tickets
**Low Priority:** 7 tickets

**Execution Order:**

- Storage & Browser hooks (Tickets 32-34) - Can be done in parallel
- Event Handling hooks (Tickets 35-37) - Can be done in parallel
- Timing & Performance hooks (Tickets 38-40) - Sequential for Ticket 40
- Lifecycle & Detection hooks (Tickets 41-43) - Can be done in parallel
- State Management & Theme hooks (Tickets 44-45) - Can be done in parallel
- Documentation (Ticket 46) after all implementations
- Release (Ticket 47) after documentation

**Benefits After Completion:**

- 35+ total React hooks (10 from Phase 1 + 25+ from Phase 3)
- Complete utility hook library
- Ready for any project scenario
