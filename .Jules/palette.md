## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-05-25 - Focus Visibility on Hover-Only Actions
**Learning:** Hiding secondary table actions (like row or column menus) behind `opacity-0 group-hover:opacity-100` creates a critical accessibility trap where keyboard users navigating via Tab cannot see the element they have focused on.
**Action:** When using hover-driven visibility, always pair it with `focus-visible:opacity-100 focus-visible:ring-2` to ensure the element becomes fully visible and properly outlined when it receives keyboard focus natively.
