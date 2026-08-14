## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-08-14 - Keyboard Accessibility Traps on Hidden Hover States
**Learning:** When hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`), they remain invisible when navigating via keyboard focus (e.g., Tab key), creating an accessibility trap where screen reader users or keyboard-only users cannot see the element they are currently focused on.
**Action:** Always include `focus-visible:opacity-100` and visible focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure hidden elements become visible and show focus indication when receiving keyboard focus.
