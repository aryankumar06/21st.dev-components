## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-05-25 - Dynamic Tooltips for Disabled Form States
**Learning:** When using standard HTML `disabled` attributes on form submission buttons, screen readers announce them as "disabled" but sighted users rely on visual cues (opacity, cursor) which alone don't explain *why*. Adding dynamic `title` attributes that explain the condition (e.g., "Enter an action item to add" vs "Add action item") provides crucial context and prevents user frustration when trying to interact with seemingly unresponsive UI elements.
**Action:** Always provide explicit visual disabled states (`opacity: 0.5, cursor: not-allowed`) alongside dynamic `title` attributes for buttons that depend on input field validation to enhance overall accessibility and usability.
