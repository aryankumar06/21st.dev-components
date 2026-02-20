# Weekly Habit Tracker

A fully interactive, Notion-inspired habit tracking component built with React, Tailwind CSS, and Lucide icons. Features a responsive table layout, light/dark mode, and a complete set of functional toolbar actions.

---

## Preview

| Dark Mode | Light Mode |
|---|---|
| Full table with checkboxes, progress bar, per-column totals | Same layout with light theme toggled via Sun/Moon button |

---

## Features

### Core
- **Weekly habit grid** — 7 rows (Mon–Sun) × N habit columns with toggle checkboxes
- **Live progress bar** — shows % of all habits completed for the week
- **Per-column mini progress bars** in the footer row
- **Running totals** — `X/7` count per column, `TOTAL X/35` overall

### Toolbar Buttons (all functional)

| Button | Action |
|---|---|
| **Filter** | Dropdown to filter rows to only days where a specific habit is checked |
| **Sort** | Sort rows by name (A→Z / Z→A) or by completion count (most/least) |
| **⚡ Zap** | Bulk toggle — checks all habits if any are unchecked, unchecks all if all are checked |
| **Search** | Reveals an inline search bar to filter rows by day name |
| **Settings** | Modal to show/hide columns, delete columns, add new columns, or reset all |
| **☀/🌙 Theme** | Toggles between dark and light mode |
| **New** | Opens a modal to add a custom row with any label |

### Row Actions (`···` menu on hover)
- Check all habits for that day
- Clear all habits for that day
- Duplicate the row
- Move row up / Move row down
- Delete row

### Column Header Actions (hover → chevron)
- Sort ascending / descending
- Hide column
- Delete column

### `+` Column Button
Opens a modal with a text input for the column name and an icon picker (8 options: Dumbbell, Brain, Moon, Pen, Book, Heart, Activity, Zap).

### Quick Check (hover on row)
A check icon appears in the `+` cell on row hover — clicking it marks all visible habits for that day in one click.

### Footer Actions
- **Reset** — clears all checkboxes across the entire week
- **Add habit** — shortcut to open the Add Column modal

---

## Tech Stack

- **React** — `useState`, `useRef`, `useEffect`
- **Tailwind CSS** — all styling via utility classes (no separate CSS file)
- **Lucide React** — icons throughout (`lucide-react@0.263.1`)
- No other runtime dependencies

---

## Installation

```bash
# If using npm
npm install lucide-react

# Tailwind CSS must be configured in your project
# https://tailwindcss.com/docs/installation
```

Then drop `HabitTracker.jsx` into your components folder and import:

```jsx
import { Component } from "./HabitTracker";

export default function App() {
  return <Component />;
}
```

> **Note:** The component uses a named export `Component` (not a default export) to match platform conventions.

---

## File Structure

```
HabitTracker.jsx
├── useClickOutside()       — hook: closes dropdowns when clicking outside
├── DropdownMenu            — reusable context/dropdown menu
├── NotionCheckbox          — styled checkbox with checked/unchecked states
├── Modal                   — generic modal wrapper with title + close button
└── Component               — main exported component
    ├── State
    │   ├── habits[]        — array of day rows with boolean per habit key
    │   ├── columns[]       — array of column definitions (key, label, icon, visible)
    │   ├── sortConfig      — { key, dir } or null
    │   ├── filterConfig    — { key } or null
    │   └── UI flags        — showSearch, showFilterMenu, modals, rowMenu, etc.
    ├── Computed
    │   ├── visibleCols     — columns filtered by visible: true
    │   ├── displayedHabits — habits after search + filter + sort applied
    │   ├── pct             — weekly completion percentage
    │   └── totals          — per-column and overall checked counts
    └── Handlers
        ├── toggleHabit()
        ├── handleAddColumn / handleDeleteColumn / handleToggleColumnVis()
        ├── handleAddRow / handleDeleteRow / handleDuplicateRow / handleClearRow()
        ├── handleMoveRow() — swaps rows up/down
        ├── handleCheckAllForDay()
        ├── handleToggleAll() — bulk check/uncheck
        ├── handleResetAll()
        └── applySort()
```

---

## Customization

### Change default habits
Edit the `DEFAULT_COLUMNS` array at the top of the file:

```js
const DEFAULT_COLUMNS = [
  { key: "workout", label: "Workout", icon: Dumbbell, visible: true },
  { key: "water",   label: "Hydration", icon: Zap,      visible: true },
  // add more...
];
```

### Change default days
Edit the `DAYS` array:

```js
const DAYS = ["Monday", "Tuesday", ..., "Sunday"];
// or use custom labels:
const DAYS = ["Day 1", "Day 2", ..., "Day 7"];
```

### Change default theme
Set `useState(false)` to start in light mode:

```js
const [dark, setDark] = useState(false);
```

### Add more icon options
Extend `ICON_OPTIONS` with any Lucide icon:

```js
import { Flame } from "lucide-react";

const ICON_OPTIONS = [
  ...existing,
  { label: "Flame", icon: Flame },
];
```

---

## Accessibility

- All checkboxes have `aria-label` attributes
- Theme toggle has `aria-label="Toggle theme"`
- Keyboard support: `Enter` submits both Add Column and Add Row modals
- Click-outside closes all dropdowns and context menus

---

## License

MIT
