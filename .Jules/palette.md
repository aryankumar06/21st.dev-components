## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-10-02 - Improve Grid Checkbox Accessibility
**Learning:** Using generic `aria-label="Check"` on toggle buttons inside dense data grids (like a habit tracker) leaves screen reader users without crucial context (e.g., which habit and which day they are toggling). Furthermore, interactive elements often lack default focus rings in Tailwind without explicit `focus-visible` styles, making keyboard navigation difficult.
**Action:** Always provide context-rich `aria-label` attributes (e.g., "Check Workout for Monday") for grid-based toggles and ensure they include `focus-visible` outline styles for keyboard accessibility.
