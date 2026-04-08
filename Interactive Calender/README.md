# Interactive Calendar

A premium, production-quality interactive calendar component built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Features clean architecture, accessibility, and modern React patterns.

## ✨ Features

- **Premium Design**: Modern glass-morphism effects, sophisticated color palette, and elegant typography
- **Clean Architecture**: Separation of concerns with custom hooks, context, and proper component structure
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Performance**: Memoized components, optimized re-renders, and efficient state management
- **Error Handling**: Comprehensive error boundaries and graceful error states
- **TypeScript**: Fully typed with comprehensive type definitions
- **Wall Calendar Layout**: Hero image section with gradient overlays and refined spacing
- **Interactive Calendar**:
  - Smooth month navigation with enhanced button styling
  - Gradient-based date highlighting with multiple visual states
  - Today indicator with distinctive styling
  - Date range selection with emerald start/end markers and blue range highlighting
- **Notes System**: Premium-styled notes panel with backdrop blur effects and gradient buttons
- **Smooth Animations**: Framer Motion animations with refined easing and timing
- **Responsive Design**: Optimized for desktop and mobile with improved touch interactions

## 🏗️ Architecture

### **Clean Architecture Principles**
- **Separation of Concerns**: Business logic separated from UI components
- **Single Responsibility**: Each component/hook has a clear, single purpose
- **Dependency Injection**: Context provides dependencies to components
- **SOLID Principles**: Interface segregation and dependency inversion

### **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with custom scrollbar
│   ├── layout.tsx         # Root layout with error boundary
│   └── page.tsx           # Main page with context providers
├── components/            # UI Components (dumb components)
│   ├── Calendar.tsx       # Main calendar component
│   ├── DayCell.tsx        # Individual date cell
│   ├── Header.tsx         # Month navigation header
│   ├── NotesPanel.tsx     # Notes management panel
│   └── ErrorBoundary.tsx  # Error boundary component
├── context/               # React Context (state management)
│   └── CalendarContext.tsx # Global calendar state
├── hooks/                 # Custom Hooks (business logic)
│   ├── useCalendar.ts     # Calendar state and actions
│   └── useNotes.ts        # Notes state and actions
├── constants/             # Application constants
│   └── index.ts           # Centralized constants
└── lib/                   # Utilities and types
    ├── types.ts           # TypeScript type definitions
    └── utils.ts           # Utility functions
```

### **State Management**
- **Context + Hooks**: React Context for global state, custom hooks for business logic
- **Local State**: Component-level state for UI concerns
- **Persistent State**: localStorage for notes with error handling

### **Performance Optimizations**
- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Stable function references
- **useMemo**: Expensive computations cached
- **Code Splitting**: Automatic with Next.js

### **Accessibility Features**
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators and management
- **Semantic HTML**: Proper roles and landmarks

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📁 Project Structure & .gitignore

This project follows a clean, organized structure optimized for readability and maintainability. The `.gitignore` file excludes the following to keep the repository lean and secure:

- **node_modules/**: Dependencies installed via npm (recreated with `npm install`)
- **.next/**: Next.js build output (generated with `npm run build`)
- **.env* files**: Environment variables (never commit sensitive data)
- **OS files**: `.DS_Store`, `Thumbs.db`, etc.
- **Logs**: `*.log` files and debug outputs
- **IDE files**: `.vscode/`, `.idea/` (personal preferences)

Only essential source files are tracked, making the repository lightweight and easy to clone.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **State Management**: React Context + Custom Hooks
- **Error Handling**: React Error Boundaries

## 📱 Usage

1. **Navigation**: Use arrow buttons or keyboard arrows to navigate months
2. **Date Selection**: Click dates to select start/end ranges
3. **Notes**: Add notes for selected date ranges (auto-saved)
4. **Keyboard**: Full keyboard navigation support (Tab, Enter, Space, Arrow keys)

## 🎨 Design Highlights

- **Color Palette**: Sophisticated slate and blue gradients with emerald accents
- **Typography**: Inter font with proper weight hierarchy and tracking
- **Shadows**: Layered shadow system with color-matched shadows
- **Spacing**: Generous padding and margins for premium feel
- **Interactive States**: Hover effects with scale, translation, and shadow changes
- **Glass Morphism**: Backdrop blur effects on cards and panels
- **Custom Scrollbar**: Styled scrollbar matching the design theme

## 🔧 Development

### **Code Quality**
- **ESLint**: Configured for React/Next.js best practices
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (recommended)

### **Testing Structure**
```typescript
// Component testing
describe('Calendar', () => {
  it('renders calendar grid', () => { ... })
  it('handles date selection', () => { ... })
})

// Hook testing
describe('useCalendar', () => {
  it('manages calendar state', () => { ... })
  it('navigates months correctly', () => { ... })
})

// Integration testing
describe('Calendar Flow', () => {
  it('selects date range and saves notes', () => { ... })
})
```

### **Performance Monitoring**
- **React DevTools**: Profiler for performance analysis
- **Lighthouse**: Performance, accessibility, and SEO audits
- **Bundle Analyzer**: `npm run build && npm run analyze`

## 🤝 Contributing

1. Follow the established architecture patterns
2. Use TypeScript for all new code
3. Add proper error handling
4. Include accessibility features
5. Write comprehensive tests
6. Update documentation

## 📄 License

This project is licensed under the MIT License.