## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-05-25 - Focus Visibility on Hover-Hidden Elements
**Learning:** When hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`), they create a keyboard accessibility trap if they lack focus-visible styles. Keyboard users tabbing through interactive elements will not see them, making it impossible to determine what is currently focused.
**Action:** Always include `focus-visible:opacity-100` and focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure the elements become visible when receiving keyboard focus.
