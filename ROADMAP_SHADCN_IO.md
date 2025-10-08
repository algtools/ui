# shadcn.io Integration Roadmap

This document outlines the plan to add missing shadcn.io components to `@algtools/ui`.

## Current Status

✅ **58 shadcn/ui components** - Complete
✅ **Phase 1 Hooks (11 hooks)** - Complete
⏳ **Phase 2-3 Hooks (25+ hooks)** - Pending
❌ **16 AI components** - Missing
❌ **15+ animated buttons** - Missing
❌ **6+ animation components** - Missing
❌ **6+ specialized UI** - Missing

## Phase 1: Essential Hooks ✅ COMPLETE

**Priority:** HIGH ✅
**Effort:** Medium
**Impact:** Maximum ROI - benefits ALL projects
**Status:** ✅ All 11 hooks implemented and tested

### Hooks Implemented (11/11) ✅

1. ✅ **useIsMobile** - Mobile breakpoint detection
2. ✅ **useDebounceValue** - Debounce state values
3. ✅ **useLocalStorage** - Persistent state in localStorage
4. ✅ **useMediaQuery** - Responsive design queries
5. ✅ **useOnClickOutside** - Click outside element detection
6. ✅ **useCopyToClipboard** - Clipboard operations
7. ✅ **useIntersectionObserver** - Element visibility detection
8. ✅ **useResizeObserver** - Element size change detection
9. ✅ **useHover** - Hover state detection
10. ✅ **useBoolean** - Boolean state with toggle helpers
11. ✅ **useCounter** - Counter with increment/decrement

### ✅ Implementation Complete

All Phase 1 hooks have been:

- ✅ Implemented with TypeScript types
- ✅ Exported from `ui/src/index.ts`
- ✅ Comprehensive test coverage (>85%)
- ✅ JSDoc documentation with examples
- ✅ SSR-safe implementations

### File Structure

```
ui/src/hooks/
├── use-boolean.ts ✅
├── use-counter.ts ✅
├── use-debounce-value.ts ✅
├── use-local-storage.ts ✅
├── use-media-query.ts ✅
├── use-intersection-observer.ts ✅
├── use-resize-observer.ts ✅
├── use-mobile.ts ✅
├── use-on-click-outside.ts ✅
├── use-hover.ts ✅
├── use-copy-to-clipboard.ts ✅
└── __tests__/
    ├── use-boolean.test.ts ✅
    ├── use-counter.test.ts ✅
    ├── use-debounce-value.test.ts ✅
    ├── use-local-storage.test.ts ✅
    ├── use-media-query.test.ts ✅
    ├── use-intersection-observer.test.ts ✅
    ├── use-resize-observer.test.tsx ✅
    ├── use-mobile.test.ts ✅
    ├── use-on-click-outside.test.ts ✅
    ├── use-hover.test.ts ✅
    └── use-copy-to-clipboard.test.ts ✅
```

---

## Phase 2: AI Components (If Building AI Features)

**Priority:** HIGH (for AI projects) / LOW (otherwise)
**Effort:** High
**Impact:** Enables ChatGPT-like interfaces

### Core AI Components (Priority Order)

1. ⬜ **Message** - Chat message with avatar
2. ⬜ **Conversation** - Chat container with auto-scroll
3. ⬜ **Response** - Markdown renderer for AI responses
4. ⬜ **Prompt Input** - ChatGPT-style input
5. ⬜ **Code Block** - Code with syntax highlighting
6. ⬜ **Loader** - AI loading indicator
7. ⬜ **Sources** - Source citations
8. ⬜ **Suggestion** - Suggestion chips
9. ⬜ **Tool** - Function call display
10. ⬜ **Reasoning** - AI thinking process display

### Optional AI Components

11. ⬜ **Actions** - Interactive action buttons
12. ⬜ **Branch** - Multiple response variations
13. ⬜ **Image** (AI) - AI-generated image display
14. ⬜ **Inline Citation** - Hover citation previews
15. ⬜ **Task** - Task progress lists
16. ⬜ **Web Preview** - Website preview

### Implementation Steps

```bash
# Create AI components directory
mkdir -p ui/src/components/ai

# Add component files
touch ui/src/components/ai/message.tsx
touch ui/src/components/ai/conversation.tsx
# ... etc
```

Update `ui/src/index.ts`:

```typescript
// AI Components
export * from './components/ai/message';
export * from './components/ai/conversation';
// ... etc
```

---

## Phase 3: Remaining Hooks

**Priority:** MEDIUM
**Effort:** Medium
**Impact:** Nice-to-have utilities

### Browser & Storage (6 hooks)

- ⬜ useSessionStorage
- ⬜ useReadLocalStorage
- ⬜ useDocumentTitle
- ⬜ useScript
- ⬜ useScreen
- ⬜ useWindowSize

### Event Handling (7 hooks)

- ⬜ useClickAnyWhere
- ⬜ useEventListener
- ⬜ useEventCallback
- ⬜ useMousePosition

### Performance & Timing (5 hooks)

- ⬜ useDebounceCallback
- ⬜ useInterval
- ⬜ useTimeout
- ⬜ useCountdown

### Lifecycle (4 hooks)

- ⬜ useIsMounted
- ⬜ useIsClient
- ⬜ useUnmount
- ⬜ useIsomorphicLayoutEffect

### UI & Layout (3 hooks)

- ⬜ useScrollLock

### Theme (2 hooks)

- ⬜ useDarkMode
- ⬜ useTernaryDarkMode

### State Management (3 hooks)

- ⬜ useToggle
- ⬜ useMap
- ⬜ useStep

---

## Phase 4: Animated Buttons

**Priority:** LOW
**Effort:** High
**Impact:** Visual polish for marketing

### Button Variants to Add

1. ⬜ Animated Modal Button
2. ⬜ Copy Button
3. ⬜ Corner Accent Button
4. ⬜ Counter Button
5. ⬜ Flip Button
6. ⬜ GitHub Stars Button
7. ⬜ Icon Button
8. ⬜ Input Button
9. ⬜ Liquid Button
10. ⬜ Magnetic Button
11. ⬜ Rating Button
12. ⬜ Ripple Button
13. ⬜ Text Reveal Button

### Implementation Approach

Option A: Separate components

```
ui/src/components/ui/button-animated-modal.tsx
ui/src/components/ui/button-copy.tsx
```

Option B: Variants of Button component

```typescript
<Button variant="animated-modal">...</Button>
<Button variant="liquid">...</Button>
```

---

## Phase 5: Animation & Specialized Components

**Priority:** LOW
**Effort:** Medium-High
**Impact:** Nice-to-have effects

### Animation Components

- ⬜ Magnetic Effect
- ⬜ Animated Cursor
- ⬜ Apple Hello Effect
- ⬜ Rolling Text
- ⬜ Shiny Text

### Specialized UI

- ⬜ Terminal
- ⬜ QR Code
- ⬜ Color Picker
- ⬜ Image Zoom
- ⬜ Credit Card (3D)
- ⬜ Ethical Ad

---

## Phase 6: Enhanced Charts

**Priority:** LOW-MEDIUM (depends on data viz needs)
**Effort:** Medium
**Impact:** Better data visualization

Currently have generic `Chart`, add specific types:

1. ⬜ Bar Chart (specialized)
2. ⬜ Line Chart (specialized)
3. ⬜ Pie Chart
4. ⬜ Area Chart
5. ⬜ Radar Chart
6. ⬜ Mixed Chart

---

## Testing Strategy

### For Each New Component/Hook

1. **Unit Tests**
   - Component rendering
   - Props validation
   - Interaction testing
   - Edge cases

2. **Storybook Stories**
   - All variants
   - Interactive examples
   - Documentation

3. **Integration Tests**
   - Works in Next.js 15
   - SSR compatibility
   - Cloudflare Workers compatibility

---

## Version Bumping Strategy

Following semantic versioning:

- **Patch (0.0.x)**: Bug fixes
- **Minor (0.x.0)**: New hooks/components (backward compatible)
- **Major (x.0.0)**: Breaking changes

Release history and roadmap:

- ✅ **v0.2.0** - Phase 1 complete (11 essential hooks) - COMPLETE
- ⏳ **v0.3.0** - Phase 2 complete (AI components) - Pending
- ⏳ **v0.4.0** - Phase 3 complete (remaining hooks) - Pending
- ⏳ **v1.0.0** - All phases complete (first stable release) - Future

---

## Dependencies to Add

Some shadcn.io components may require:

```json
{
  "dependencies": {
    "react-syntax-highlighter": "^15.5.0", // For Code Block
    "qrcode": "^1.5.3", // For QR Code
    "react-color": "^2.19.3", // For Color Picker
    "framer-motion": "^10.0.0" // For animations (maybe)
  }
}
```

Check each component's requirements before implementing.

---

## Resources for Implementation

- **shadcn.io Source**: https://github.com/shadcnio/react-shadcn-components
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Radix UI**: https://www.radix-ui.com
- **React Hooks Patterns**: https://usehooks.com

---

## Decision: What to Implement?

### ✅ Completed

✅ **Phase 1: Essential Hooks** - All 11 hooks implemented and tested

### Should Have (Do Soon)

- Phase 2: AI Components - If building AI features
- Phase 3: Remaining Hooks - High-value utilities

### Could Have (Do Later)

- Phase 4: Animated Buttons - Polish
- Phase 5: Animation Components - Marketing
- Phase 6: Enhanced Charts - Data viz projects

### Won't Have (Skip)

- Components that don't fit your use cases
- Novelty components with limited utility

---

## Getting Started

1. **Review** `MISSING_SHADCN_IO_COMPONENTS.md` for detailed component descriptions
2. **Decide** which phases are relevant to your projects
3. **Start** with Phase 1 (essential hooks) - everyone benefits
4. **Test** thoroughly in Next.js 15 and Cloudflare Workers environments
5. **Document** as you go - update `SHADCN_COMPONENTS.md`
6. **Version** bump with each phase completion

---

## Questions to Answer

Before starting implementation:

1. **Do we need AI components?** (Phase 2 decision)
2. **Which hooks are most valuable?** (Prioritize Phase 1)
3. **Do we need animated variants?** (Phase 4 decision)
4. **What's our timeline?** (Pace of implementation)
5. **Who will maintain?** (Ownership and responsibility)

---

**Next Action:** Review this roadmap and decide on Phase 1 implementation timeline.
