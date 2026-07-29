## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-05-24 - Actionable Empty States for Search/Filter Recovery
**Learning:** Providing a one-click 'Clear filters' action directly in the empty state of data-heavy components significantly speeds up user recovery when they filter or search too narrowly, turning a frustrating dead-end into a quick resolution.
**Action:** Always include a 'Clear filters/search' action button inside empty states triggered by active filters or search queries.
