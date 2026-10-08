## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-05-24 - [A11y/UX] Ensure Dual Labels for Icon-Only Buttons
**Learning:** Discovered multiple icon-only interactive elements in `habit_tracker_component.tsx` that lacked `aria-label` and `title` attributes. Without them, keyboard/screen-reader users miss context, and mouse users miss visual tooltips.
**Action:** Systematically added both `aria-label` and `title` to standalone icon buttons across modals, inline clear buttons, and table actions, improving both accessibility and discoverability.
