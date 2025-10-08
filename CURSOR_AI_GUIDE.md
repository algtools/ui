# Guide: Using Linear Tickets with Cursor AI

This guide explains how to use the Linear tickets with Cursor AI agents for implementing shadcn.io components.

## 🤖 For Cursor AI Agents

### Quick Start

**Agent Prompt Template:**

```
I am working on ticket #[NUMBER] from LINEAR_TICKETS_PHASE_[N]_[NAME].md

Repository: algtools/ui
Branch: main
Ticket: #[NUMBER] - [TICKET_TITLE]

Please:
1. Read the ticket definition
2. Verify DoR (Definition of Ready) is met
3. Implement all tasks in the checklist
4. Ensure DoD (Definition of Done) is satisfied
5. Create a PR to main branch

Ticket file: [FILENAME]
Starting now...
```

### Example Usage

**For Ticket 1:**

```
I am working on ticket #1 from LINEAR_TICKETS_PHASE_1_HOOKS.md

Repository: algtools/ui
Branch: main
Ticket: #1 - Setup hooks infrastructure and implement useBoolean

Please:
1. Read the ticket definition
2. Verify DoR (Definition of Ready) is met
3. Implement all tasks in the checklist
4. Ensure DoD (Definition of Done) is satisfied
5. Create a PR to main branch

Ticket file: LINEAR_TICKETS_PHASE_1_HOOKS.md
Starting now...
```

---

## 📋 Workflow Steps

### Step 1: Choose Your Strategy

From `LINEAR_TICKETS_INDEX.md`, select:

- **Option A:** All-In (complete implementation)
- **Option B:** Pragmatic (skip AI if not needed)
- **Option C:** Minimal (essentials only)

### Step 2: Start with Phase 1, Ticket 1

1. Open `LINEAR_TICKETS_PHASE_1_HOOKS.md`
2. Find Ticket 1 (infrastructure setup)
3. Copy ticket details to Cursor
4. Let Cursor AI implement

### Step 3: Verify DoR (Definition of Ready)

Before starting, ensure:

- [ ] Previous dependencies are completed
- [ ] Reference documentation is available
- [ ] No blocking issues

### Step 4: Implementation

Cursor AI should:

1. Create necessary files/directories
2. Implement functionality with TypeScript
3. Write unit tests (>90% coverage)
4. Add JSDoc documentation
5. Export from index.ts

### Step 5: Verify DoD (Definition of Done)

Before merging, check:

- [ ] Code implemented with TypeScript types
- [ ] Unit tests pass with >90% coverage
- [ ] Exported from main index.ts
- [ ] JSDoc documentation added
- [ ] Works in Next.js 15
- [ ] No linter errors
- [ ] PR created and ready for review

### Step 6: Move to Next Ticket

After merging:

1. Mark ticket as complete
2. Check dependencies
3. Move to next ticket
4. Repeat process

---

## 🎯 Ticket Selection Guide

### Phase 1: Linear Execution

**Start Here:**

1. Ticket 1 (Infrastructure) - **MUST DO FIRST**

**Then Parallel:** 2. Tickets 2-10 (Hooks) - Can assign to multiple agents

**Finally Sequential:** 3. Ticket 11 (Documentation) - After tickets 2-10 4. Ticket 12 (Release) - After ticket 11

### Phase 2: Grouped Execution

**Infrastructure First:**

1. Ticket 13 (AI Infrastructure) - **MUST DO FIRST**

**Core Components (High Priority):** 2. Tickets 14-18 - Essential for AI chat

**Supporting Components (Medium Priority):** 3. Tickets 19-22 - Nice-to-have

**Advanced Components (Low Priority):** 4. Tickets 23-29 - Optional features

**Finalize:** 5. Ticket 30 (Documentation) 6. Ticket 31 (Release)

### Phase 3: Category-Based Execution

Execute by category (each can be parallel):

1. Storage & Browser (Tickets 32-34)
2. Event Handling (Tickets 35-37)
3. Timing & Performance (Tickets 38-40)
4. Lifecycle & Detection (Tickets 41-43)
5. State Management & Theme (Tickets 44-45)
6. Documentation (Ticket 46)
7. Release (Ticket 47)

---

## 💡 Tips for Success

### For AI Agents

1. **Read the entire ticket** before starting
2. **Check dependencies** in the ticket
3. **Follow the task checklist** exactly
4. **Don't skip DoD items** - they're all required
5. **Reference shadcn.io** for implementation patterns
6. **Test thoroughly** - >90% coverage is required
7. **Document well** - JSDoc is mandatory

### For Developers Reviewing AI Work

1. **Verify TypeScript types** are correct
2. **Check test coverage** meets >90%
3. **Test in Next.js 15** environment
4. **Verify SSR safety** (no window/document on server)
5. **Check exports** in index.ts
6. **Review documentation** completeness
7. **Test in Cloudflare Workers** if applicable

---

## 🔍 Ticket Anatomy

Each ticket contains:

### Header

- Title, Repository, Branch, Labels, Priority, Estimate

### Description

- What needs to be done and why

### Definition of Ready (DoR)

- Prerequisites that must be met before starting

### Tasks

- Detailed checklist of implementation steps

### Definition of Done (DoD)

- Criteria that must be met before marking complete

### Dependencies

- Other tickets that must be completed first

---

## 📁 File Locations

### Hooks Go Here:

```
ui/src/hooks/
├── use-boolean.ts
├── use-counter.ts
├── use-debounce-value.ts
└── __tests__/
    ├── use-boolean.test.ts
    ├── use-counter.test.ts
    └── use-debounce-value.test.ts
```

### AI Components Go Here:

```
ui/src/components/ai/
├── message.tsx
├── conversation.tsx
├── response.tsx
└── __tests__/
    ├── message.test.tsx
    ├── conversation.test.tsx
    └── response.test.tsx
```

### Exports Go In:

```
ui/src/index.ts
```

---

## ✅ Checklist for Each Ticket

### Before Starting

- [ ] Read ticket completely
- [ ] Verify DoR is satisfied
- [ ] Check dependencies are complete
- [ ] Have reference documentation ready

### During Implementation

- [ ] Create files in correct locations
- [ ] Implement with TypeScript
- [ ] Write unit tests as you go
- [ ] Add JSDoc comments
- [ ] Follow existing code patterns

### Before Submitting PR

- [ ] All tests pass
- [ ] Coverage >90%
- [ ] No linter errors
- [ ] Exported from index.ts
- [ ] Documentation complete
- [ ] Verify DoD is satisfied

### After PR Merged

- [ ] Mark ticket as complete
- [ ] Check if next tickets are unblocked
- [ ] Update roadmap if needed

---

## 🚨 Common Issues & Solutions

### Issue: "DoR not satisfied"

**Solution:** Complete dependency tickets first

### Issue: "Tests failing"

**Solution:**

- Check TypeScript types
- Verify mocks are set up correctly
- Test SSR safety (use `typeof window !== 'undefined'`)

### Issue: "Linter errors"

**Solution:**

- Run `pnpm lint --fix`
- Follow existing code style
- Check for unused imports

### Issue: "Coverage below 90%"

**Solution:**

- Add tests for edge cases
- Test error handling
- Test cleanup on unmount

### Issue: "Component not exported"

**Solution:**

- Add export to `ui/src/index.ts`
- Follow existing export patterns

---

## 📊 Progress Tracking

### Phase 1 Progress

```
Total: 12 tickets, 19 points
Completed: [ ] / 12
Points Done: [ ] / 19
Status: [ ] Planning / [ ] In Progress / [ ] Complete
```

### Phase 2 Progress

```
Total: 18 tickets, 38 points
Completed: [ ] / 18
Points Done: [ ] / 38
Status: [ ] Planning / [ ] In Progress / [ ] Complete / [ ] Skipped
```

### Phase 3 Progress

```
Total: 15 tickets, 26 points
Completed: [ ] / 15
Points Done: [ ] / 26
Status: [ ] Planning / [ ] In Progress / [ ] Complete
```

---

## 🎓 Learning Resources

### For Implementation Reference

- [shadcn.io](https://shadcn.io) - Official shadcn.io components
- [shadcn/ui](https://ui.shadcn.com) - Base UI components
- [usehooks.com](https://usehooks.com) - React hooks patterns

### For Testing

- [React Testing Library](https://testing-library.com/react)
- [Jest](https://jestjs.io)
- [Testing React Hooks](https://react-hooks-testing-library.com)

### For TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

---

## 🎉 Completion Milestones

### After Phase 1 Complete

🎊 **Celebrate!** You've added 10 essential hooks that benefit ALL projects!

**Next Steps:**

- Release v1.1.0
- Decide: Do Phase 2 or skip to Phase 3?

### After Phase 2 Complete

🎊 **Amazing!** You've built a complete AI chat interface capability!

**Next Steps:**

- Release v1.2.0
- Build demo AI application
- Continue to Phase 3 for remaining hooks

### After Phase 3 Complete

🎊 **Incredible!** You've achieved feature parity with shadcn.io hooks!

**Next Steps:**

- Release v1.3.0
- Update all documentation
- Share with community

---

## 💬 Sample Prompts for Cursor AI

### Starting a Ticket

```
Please implement ticket #[N] from [FILE].md

Follow all DoR requirements, implement all tasks,
and ensure DoD is satisfied before completion.

Create a PR to main branch when done.
```

### After Implementation

```
I've completed the implementation.
Please verify the DoD checklist:
1. TypeScript types are correct
2. Tests pass with >90% coverage
3. Exported from index.ts
4. JSDoc added
5. No linter errors

Then create a PR.
```

### For Review

```
Please review the implementation for ticket #[N]:
1. Verify all DoD items are met
2. Check code quality
3. Verify tests are comprehensive
4. Check documentation completeness

Provide feedback if any issues found.
```

---

## 📝 Notes for Team

### Branch Strategy

- **Branch:** Always `main` for this repo (not `dev`)
- **PR:** Create PR to `main` after each ticket
- **Review:** Require review before merge

### Communication

- **Ticket Status:** Update in Linear after each PR merge
- **Blockers:** Communicate immediately if DoR can't be met
- **Questions:** Reference ticket number in discussions

### Quality Standards

- **Tests:** >90% coverage is mandatory, not optional
- **Types:** All TypeScript types must be explicit
- **Docs:** JSDoc is required for all public APIs
- **Linting:** Zero linter errors before PR

---

**Ready to Start?** Begin with `LINEAR_TICKETS_INDEX.md` to choose your strategy! 🚀
