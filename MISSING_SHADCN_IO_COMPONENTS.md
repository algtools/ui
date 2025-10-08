# Missing shadcn.io Components Analysis

This document identifies components from **shadcn.io** (not shadcn/ui) that are currently missing from `@algtools/ui`.

## Understanding the Difference

- **shadcn/ui** (ui.shadcn.com) - Base UI components built on Radix UI
- **shadcn.io** - Extended collection including AI components, hooks, animations, and specialized components

## ✅ What We Already Have (58 components + 1 hook)

### Current Components

All base shadcn/ui components are implemented. See `SHADCN_COMPONENTS.md` for the full list.

### Current Hooks

- `use-mobile` - Mobile breakpoint detection

### Current Utilities

- `cn` - Tailwind class merger
- `FontProvider` / `useFonts` - Font management

---

## ❌ Missing from shadcn.io

### 🤖 AI Components (16 components)

These are specialized components for AI chat interfaces and streaming responses:

1. **Actions** - Interactive action buttons for AI chat interfaces
2. **Branch** - Explore multiple variations of AI responses
3. **Code Block** - Code blocks with syntax highlighting and copy buttons
4. **Conversation** - Chat container with auto-scrolling during streaming
5. **Image** (AI) - Display AI-generated images with loading states
6. **Inline Citation** - In-line citations with hover previews
7. **Loader** - Animated indicator for AI responses in progress
8. **Message** - Chat messages with avatars (user vs AI)
9. **Prompt Input** - ChatGPT-style input with auto-resize and model picker
10. **Reasoning** - Show AI thinking process with collapsible blocks
11. **Response** - Markdown renderer optimized for streaming AI responses
12. **Sources** - Expandable source citations (like "Used 5 sources")
13. **Suggestion** - Suggestion chips like ChatGPT follow-up prompts
14. **Task** - Task lists showing AI agent work progress
15. **Tool** - Display AI function calls (like OpenAI tool usage)
16. **Web Preview** - Preview AI-generated websites

**Use Cases:**

- Building ChatGPT-like interfaces
- AI agent dashboards
- Streaming response UIs
- Code generation interfaces

---

### 🪝 React Hooks (35+ hooks)

Advanced React hooks for common patterns:

#### State Management

1. **useBoolean** - Boolean state with toggle helpers
2. **useCounter** - Counter with increment/decrement/reset
3. **useToggle** - Boolean toggle with advanced options
4. **useMap** - Map data structure state management
5. **useStep** - Step-by-step wizard navigation

#### Browser APIs

6. **useLocalStorage** - Persistent state in localStorage
7. **useSessionStorage** - Session storage management
8. **useReadLocalStorage** - Read-only localStorage access
9. **useCopyToClipboard** - Clipboard operations
10. **useDocumentTitle** - Dynamic browser tab titles
11. **useScript** - Dynamic script loading
12. **useMediaQuery** - Responsive design queries
13. **useScreen** - Screen dimension tracking
14. **useWindowSize** - Window size tracking

#### Event Handling

15. **useClickAnyWhere** - Global click detection
16. **useOnClickOutside** - Click outside element detection
17. **useEventListener** - DOM event listeners
18. **useEventCallback** - Stable event callbacks
19. **useHover** - Hover state detection
20. **useMousePosition** - Mouse position tracking

#### Performance & Timing

21. **useDebounceCallback** - Debounce function calls
22. **useDebounceValue** - Debounce state values
23. **useInterval** - setInterval management
24. **useTimeout** - setTimeout management
25. **useCountdown** - Countdown timer with play/pause

#### Lifecycle & Detection

26. **useIsMounted** - Component mount state detection
27. **useIsClient** - Client-side detection (SSR-safe)
28. **useUnmount** - Cleanup on component unmount
29. **useIsomorphicLayoutEffect** - SSR-safe layout effect

#### UI & Layout

30. **useIntersectionObserver** - Element visibility detection
31. **useResizeObserver** - Element size change detection
32. **useScrollLock** - Prevent scrolling (for modals)

#### Theme

33. **useDarkMode** - Dark mode management with system sync
34. **useTernaryDarkMode** - Ternary dark mode (light/dark/system)

**Current Status:** Only `use-mobile` is implemented (1/35+)

---

### 🎨 Animated/Special Button Components (15+ variants)

Enhanced button components with advanced animations:

1. **Animated Modal Button** - Button with 3D perspective and backdrop blur
2. **Copy Button** - One-click copy with visual feedback
3. **Corner Accent Button** - Corner accents with sliding background
4. **Counter Button** - Animated number display with increment/decrement
5. **Flip Button** - 3D flip animations revealing hidden messages
6. **GitHub Stars Button** - Live GitHub star count with particle effects
7. **Icon Button** - Particle burst and glow effects on activation
8. **Input Button** - Transforms into input field with smooth transitions
9. **Liquid Button** - Fluid fill animations with gradient effects
10. **Magnetic Button** - Magnetic particle attraction on hover
11. **Rating Button** - Interactive star rating with hover effects
12. **Ripple Button** - Material Design ripple effect
13. **Text Reveal Button** - Animated text reveal on hover

**Note:** We have a basic `Button` component, but not these specialized variants.

---

### 🎭 Animation Components

Advanced animation effects:

1. **Magnetic Effect** - Magnetic scroll effect following cursor
2. **Animated Cursor** - Custom cursor with interactive effects
3. **Apple Hello Effect** - Recreates Apple's iconic "hello" animation
4. **Liquid Button Animation** - Fluid liquid animation on hover
5. **Rolling Text** - Text that rolls with smooth animation
6. **Shiny Text** - Text with animated shine effect

---

### 🧩 Additional UI Components

1. **Terminal** - Interactive terminal with typing animations
2. **Ethical Ad** - Ethical advertising display for sustainable monetization
3. **Credit Card** - Interactive 3D credit card with flip animation
4. **Image Zoom** - Zoomable image with smooth transitions in modal
5. **QR Code** - QR code generator with customizable styles
6. **Color Picker** - Advanced color selection with multiple formats

---

### 📊 Chart Components (Enhanced)

While we have a basic `Chart` component, shadcn.io offers specialized variants:

1. **Bar Chart** - Clean bar chart for data comparison
2. **Line Chart** - Smooth line chart for trends
3. **Pie Chart** - Pie chart for proportional data
4. **Area Chart** - Stacked area chart for volume over time
5. **Radar Chart** - Multi-axis chart for comparing multiple variables
6. **Mixed Chart** - Combined bar and line chart visualization

**Current Status:** We have generic `Chart`, but not these specific implementations.

---

## 📈 Impact Analysis

### High Priority (Recommended to Add)

1. **React Hooks** - Universal utilities that benefit any project
   - `useDebounceValue`, `useLocalStorage`, `useMediaQuery`
   - `useOnClickOutside`, `useClickAnyWhere`
   - `useIntersectionObserver`, `useResizeObserver`
   - `useCopyToClipboard`

2. **AI Components** (if building AI features)
   - Essential for any ChatGPT-like interface
   - Growing demand for AI UIs

### Medium Priority

1. **Enhanced Charts** - For data visualization projects
2. **Animation Components** - For marketing/landing pages
3. **Specialized Inputs** - Terminal, QR Code, Color Picker

### Low Priority

1. **Specialized Button Variants** - Nice-to-have effects
2. **Novelty Components** - Ethical Ad, Credit Card animation

---

## 🎯 Recommendations

### Phase 1: Essential Hooks (High ROI)

Add the most commonly used hooks first:

```
useDebounceValue
useLocalStorage
useMediaQuery
useOnClickOutside
useCopyToClipboard
useIntersectionObserver
useResizeObserver
useHover
useCounter
useBoolean
```

### Phase 2: AI Components (If Relevant)

If building AI features, add the complete AI component suite:

```
Message
Conversation
Response
Prompt Input
Code Block
Loader
Sources
```

### Phase 3: Advanced Features

Based on project needs:

- Enhanced chart components
- Animation components
- Specialized button variants

---

## 📝 Implementation Notes

1. **Hooks Folder Structure**

   ```
   ui/src/hooks/
   ├── use-boolean.ts
   ├── use-counter.ts
   ├── use-debounce-value.ts
   ├── use-local-storage.ts
   └── ... (30+ more)
   ```

2. **AI Components Folder**

   ```
   ui/src/components/ai/
   ├── message.tsx
   ├── conversation.tsx
   ├── response.tsx
   ├── prompt-input.tsx
   └── ... (16 components)
   ```

3. **Export Strategy**
   Update `ui/src/index.ts` to include:

   ```typescript
   // Hooks
   export * from './hooks/use-boolean';
   export * from './hooks/use-counter';
   // ... etc

   // AI Components
   export * from './components/ai/message';
   export * from './components/ai/conversation';
   // ... etc
   ```

---

## 🔗 Resources

- [shadcn.io Official Site](https://shadcn.io) - Browse all components
- [shadcn.io GitHub](https://github.com/shadcnio/react-shadcn-components) - Source code
- [shadcn/ui Docs](https://ui.shadcn.com) - Base UI components (already have these)

---

## Next Steps

1. **Prioritize**: Decide which missing components are needed for your projects
2. **Plan**: Create implementation phases (Phase 1: Hooks, Phase 2: AI, etc.)
3. **Implement**: Add components one category at a time
4. **Test**: Ensure all new components work in your architecture
5. **Document**: Update `SHADCN_COMPONENTS.md` as components are added
6. **Version**: Bump package version with each major addition
