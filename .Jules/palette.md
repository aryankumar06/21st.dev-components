## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-05-24 - Hover-Revealed Actions and Keyboard Focus
**Learning:** Elements styled with `opacity-0` and `group-hover:opacity-100` are invisible to keyboard users who navigate via Tab. While screen readers might still interact with them, sighted keyboard users won't know they are focused or exist.
**Action:** Always pair `group-hover:opacity-100` with `focus-visible:opacity-100` (or similar focus visibility classes) to ensure actions are revealed during keyboard navigation.
