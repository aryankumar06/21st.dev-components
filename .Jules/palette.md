## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-06 - [Add clear filters button to empty states]
**Learning:** [When users trigger empty states via active filters or search queries, they need an immediate action to recover. Without a clear action, it can feel like a dead-end.]
**Action:** [Always include an actionable 'Clear filters/search' button in empty states triggered by active filters to speed up user recovery.]
