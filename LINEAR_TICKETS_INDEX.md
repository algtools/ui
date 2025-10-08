# Linear Tickets Index - @algtools/ui Enhancement

Complete index of all Linear tickets for implementing missing shadcn.io components and hooks.

## 📋 Quick Overview

| Phase       | Description           | Tickets | Points | Priority        | Status     |
| ----------- | --------------------- | ------- | ------ | --------------- | ---------- |
| **Phase 1** | Essential React Hooks | 12      | 19     | **HIGH**        | 📝 Planned |
| **Phase 2** | AI Components         | 18      | 38     | **CONDITIONAL** | 📝 Planned |
| **Phase 3** | Remaining Hooks       | 15      | 26     | **MEDIUM**      | 📝 Planned |
| **TOTAL**   |                       | **45**  | **83** |                 |            |

## 🎯 Recommended Execution Order

### 1. **Start Here: Phase 1 (Essential Hooks)**

**Priority:** HIGH | **Impact:** Maximum ROI
**File:** [LINEAR_TICKETS_PHASE_1_HOOKS.md](./LINEAR_TICKETS_PHASE_1_HOOKS.md)

Universal utilities that benefit ALL projects:

- ✅ useBoolean, useCounter, useDebounceValue
- ✅ useLocalStorage, useMediaQuery
- ✅ useOnClickOutside, useCopyToClipboard
- ✅ useIntersectionObserver, useResizeObserver, useHover

**Deliverable:** v1.1.0 release with 10 essential hooks

---

### 2. **Conditional: Phase 2 (AI Components)**

**Priority:** CONDITIONAL (only if building AI features)
**File:** [LINEAR_TICKETS_PHASE_2_AI.md](./LINEAR_TICKETS_PHASE_2_AI.md)

AI-specific components for ChatGPT-like interfaces:

- Core: Message, Conversation, Response, PromptInput, CodeBlock
- Supporting: Loader, Sources, Suggestion, Tool
- Advanced: Reasoning, Task, Actions, Branch, InlineCitation, AI Image, WebPreview

**Decision Point:** Skip Phase 2 if not building AI features. Go directly to Phase 3.

**Deliverable:** v1.2.0 release with 16 AI components

---

### 3. **Nice-to-Have: Phase 3 (Remaining Hooks)**

**Priority:** MEDIUM
**File:** [LINEAR_TICKETS_PHASE_3_HOOKS_REMAINING.md](./LINEAR_TICKETS_PHASE_3_HOOKS_REMAINING.md)

Additional utility hooks:

- Storage: useSessionStorage, useReadLocalStorage
- Browser: useDocumentTitle, useScript, useWindowSize, useScreen
- Events: useClickAnyWhere, useEventListener, useMousePosition
- Timing: useDebounceCallback, useInterval, useTimeout, useCountdown
- Lifecycle: useIsMounted, useUnmount, useIsClient, useIsomorphicLayoutEffect, useScrollLock
- State: useToggle, useMap, useStep
- Theme: useDarkMode, useTernaryDarkMode

**Deliverable:** v1.3.0 release with 35+ total hooks

---

## 📁 Ticket Files

### Phase 1: Essential Hooks (HIGH Priority)

**File:** `LINEAR_TICKETS_PHASE_1_HOOKS.md`

| Ticket # | Linear ID | Title                                   | Priority | Points | Dependencies |
| -------- | --------- | --------------------------------------- | -------- | ------ | ------------ |
| 1        | BAA-73    | Setup hooks infrastructure + useBoolean | HIGH     | 2      | None         |
| 2        | BAA-74    | useCounter                              | HIGH     | 1      | #1           |
| 3        | BAA-75    | useDebounceValue                        | HIGH     | 2      | #1           |
| 4        | BAA-76    | useLocalStorage                         | HIGH     | 2      | #1           |
| 5        | BAA-77    | useMediaQuery                           | HIGH     | 2      | #1           |
| 6        | BAA-78    | useOnClickOutside                       | HIGH     | 2      | #1           |
| 7        | BAA-79    | useCopyToClipboard                      | HIGH     | 1      | #1           |
| 8        | BAA-80    | useIntersectionObserver                 | HIGH     | 2      | #1           |
| 9        | BAA-81    | useResizeObserver                       | HIGH     | 2      | #1           |
| 10       | BAA-82    | useHover                                | MEDIUM   | 1      | #1           |
| 11       | BAA-83    | Documentation update                    | MEDIUM   | 1      | #1-10        |
| 12       | BAA-84    | Version bump to v1.1.0                  | MEDIUM   | 1      | #1-11        |

**Total:** 12 tickets, 19 points

---

### Phase 2: AI Components (CONDITIONAL Priority)

**File:** `LINEAR_TICKETS_PHASE_2_AI.md`

| Ticket # | Linear ID | Title                    | Priority | Points | Dependencies |
| -------- | --------- | ------------------------ | -------- | ------ | ------------ |
| 13       | BAA-85    | Setup AI infrastructure  | HIGH     | 2      | Phase 1      |
| 14       | BAA-86    | Message component        | HIGH     | 3      | #13          |
| 15       | BAA-87    | Conversation component   | HIGH     | 3      | #14          |
| 16       | BAA-88    | Response component       | HIGH     | 3      | #13          |
| 17       | BAA-89    | PromptInput component    | HIGH     | 3      | #13          |
| 18       | BAA-90    | CodeBlock component      | HIGH     | 3      | #13          |
| 19       | BAA-91    | Loader component         | MEDIUM   | 1      | #13          |
| 20       | BAA-92    | Sources component        | MEDIUM   | 2      | #13          |
| 21       | BAA-93    | Suggestion component     | MEDIUM   | 2      | #13          |
| 22       | BAA-94    | Tool component           | MEDIUM   | 2      | #13          |
| 23       | BAA-95    | Reasoning component      | LOW      | 2      | #13          |
| 24       | BAA-96    | Task component           | LOW      | 2      | #13          |
| 25       | BAA-97    | Actions component        | LOW      | 2      | #13          |
| 26       | BAA-98    | Branch component         | LOW      | 2      | #13          |
| 27       | BAA-99    | InlineCitation component | LOW      | 2      | #13          |
| 28       | BAA-100   | AI Image component       | LOW      | 2      | #13          |
| 29       | BAA-101   | WebPreview component     | LOW      | 2      | #13          |
| 30       | BAA-102   | Documentation update     | MEDIUM   | 2      | #13-29       |
| 31       | BAA-103   | Version bump to v1.2.0   | MEDIUM   | 1      | #13-30       |

**Total:** 18 tickets, 38 points

**Dependencies to Install:**

- `react-markdown` or similar (Ticket 16)
- `prism-react-renderer` or `shiki` (Ticket 18)

---

### Phase 3: Remaining Hooks (MEDIUM Priority)

**File:** `LINEAR_TICKETS_PHASE_3_HOOKS_REMAINING.md`

| Ticket # | Linear ID | Title                                   | Priority | Points | Dependencies |
| -------- | --------- | --------------------------------------- | -------- | ------ | ------------ |
| 32       | BAA-104   | useSessionStorage + useReadLocalStorage | MEDIUM   | 2      | Phase 1      |
| 33       | BAA-105   | useDocumentTitle + useScript            | LOW      | 2      | Phase 1      |
| 34       | BAA-106   | useWindowSize + useScreen               | MEDIUM   | 2      | Phase 1      |
| 35       | BAA-107   | useClickAnyWhere                        | LOW      | 1      | Phase 1      |
| 36       | BAA-108   | useEventListener + useEventCallback     | MEDIUM   | 2      | Phase 1      |
| 37       | BAA-109   | useMousePosition                        | LOW      | 1      | Phase 1      |
| 38       | BAA-110   | useDebounceCallback                     | MEDIUM   | 2      | Phase 1      |
| 39       | BAA-111   | useInterval + useTimeout                | MEDIUM   | 2      | Phase 1      |
| 40       | BAA-112   | useCountdown                            | LOW      | 2      | #39          |
| 41       | BAA-113   | useIsMounted + useUnmount + useIsClient | MEDIUM   | 2      | Phase 1      |
| 42       | BAA-114   | useIsomorphicLayoutEffect               | LOW      | 1      | Phase 1      |
| 43       | BAA-115   | useScrollLock                           | MEDIUM   | 2      | Phase 1      |
| 44       | BAA-116   | useToggle + useMap + useStep            | LOW      | 2      | Phase 1      |
| 45       | BAA-117   | useDarkMode + useTernaryDarkMode        | LOW      | 2      | Phase 1      |
| 46       | BAA-118   | Documentation update                    | MEDIUM   | 1      | #32-45       |
| 47       | BAA-119   | Version bump to v1.3.0                  | MEDIUM   | 1      | #32-46       |

**Total:** 15 tickets, 26 points

---

## 🎯 Execution Strategy

### Option A: All-In (Complete Implementation)

**Timeline:** ~8-12 weeks
**Effort:** 83 points
**Deliverables:** v1.1.0 → v1.2.0 → v1.3.0

1. ✅ Phase 1: Essential Hooks (weeks 1-3)
2. ✅ Phase 2: AI Components (weeks 4-8)
3. ✅ Phase 3: Remaining Hooks (weeks 9-12)

**Best for:** Teams building AI products or wanting complete shadcn.io parity

---

### Option B: Pragmatic (High-Value First)

**Timeline:** ~4-6 weeks
**Effort:** 45 points
**Deliverables:** v1.1.0 → v1.3.0 (skip v1.2.0)

1. ✅ Phase 1: Essential Hooks (weeks 1-3)
2. ❌ Phase 2: SKIP (not building AI features)
3. ✅ Phase 3: Remaining Hooks (weeks 4-6)

**Best for:** General-purpose projects not focused on AI

---

### Option C: Minimal (Essentials Only)

**Timeline:** ~2-3 weeks
**Effort:** 19 points
**Deliverable:** v1.1.0 only

1. ✅ Phase 1: Essential Hooks only
2. ❌ Phase 2: SKIP
3. ❌ Phase 3: SKIP (add later as needed)

**Best for:** Quick wins, immediate high-value improvements

---

## 📊 Ticket Template Structure

Each ticket follows this structure:

### Definition of Ready (DoR)

- [ ] Prerequisites completed
- [ ] References available
- [ ] Dependencies resolved

### Tasks

- [ ] Implementation checklist
- [ ] Testing requirements
- [ ] Documentation needs

### Definition of Done (DoD)

- [ ] Code implemented with TypeScript
- [ ] Unit tests pass (>90% coverage)
- [ ] Exported from index.ts
- [ ] JSDoc documentation added
- [ ] No linter errors
- [ ] PR merged to main

---

## 🔄 Dependency Graph

```
Phase 1 (Essential Hooks)
├─ Ticket 1 (Infrastructure) ◄─── START HERE
│  ├─ Tickets 2-10 (Hooks) ◄───── Can be parallel
│  └─ Ticket 11 (Docs)
│     └─ Ticket 12 (Release v1.1.0)
│
Phase 2 (AI Components - Optional)
├─ Ticket 13 (AI Infrastructure) ◄─── Requires Phase 1
│  ├─ Tickets 14-29 (Components) ◄───── Some parallel
│  └─ Ticket 30 (Docs)
│     └─ Ticket 31 (Release v1.2.0)
│
Phase 3 (Remaining Hooks)
├─ Tickets 32-45 (More Hooks) ◄───── Requires Phase 1
│  └─ Ticket 46 (Docs)
│     └─ Ticket 47 (Release v1.3.0)
```

---

## 🚀 Getting Started

### For Cursor AI Agent:

1. **Choose your strategy** (A, B, or C above)
2. **Start with Phase 1, Ticket 1**
   - Read `LINEAR_TICKETS_PHASE_1_HOOKS.md`
   - Find "Ticket 1: Setup hooks infrastructure"
   - Follow DoR → Tasks → DoD
3. **After Ticket 1, parallelize Tickets 2-10**
4. **Proceed to next phase** based on chosen strategy

### For Linear Import:

Each ticket file can be:

- Imported directly into Linear
- Converted to CSV for bulk import
- Used as templates for manual ticket creation

---

## 📝 Notes

### Repository Info

- **Repo:** `algtools/ui`
- **Branch:** `main` (NOT `dev`)
- **Labels:** Use provided labels for filtering

### Testing Requirements

- Unit tests: >90% coverage
- Integration: Works in Next.js 15
- SSR: Safe for server-side rendering
- Cloudflare Workers: Compatible if applicable

### Documentation Standards

- JSDoc comments required
- Usage examples preferred
- Storybook stories recommended
- Update CHANGELOG.md with each release

---

## 🎉 Success Metrics

### After Phase 1:

- ✅ 10 new essential hooks
- ✅ Universal utilities for all projects
- ✅ Strong foundation for future phases

### After Phase 2 (if applicable):

- ✅ 16 AI components
- ✅ Complete ChatGPT-like interface capability
- ✅ Streaming support for real-time AI

### After Phase 3:

- ✅ 35+ total React hooks
- ✅ Complete utility hook library
- ✅ Feature parity with shadcn.io hooks

---

## 📞 Questions?

Refer to these documents for more details:

- `SHADCN_COMPONENTS.md` - What's currently available
- `MISSING_SHADCN_IO_COMPONENTS.md` - Detailed analysis of what's missing
- `ROADMAP_SHADCN_IO.md` - Strategic roadmap and recommendations

---

**Last Updated:** 2025-01-08
**Status:** All tickets planned and documented
**Next Action:** Choose execution strategy and begin Phase 1, Ticket 1
