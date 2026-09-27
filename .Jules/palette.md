## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-05-15 - Custom File Upload Keyboard Accessibility
**Learning:** When styling hidden file inputs using wrapper `<label>` elements for custom UX zones, the wrappers inherently lose keyboard navigation access and visual focus indicators, causing severe accessibility regressions for keyboard users.
**Action:** Always ensure the wrapper `<label>` has `tabIndex={0}`, an explicit `onKeyDown` handler to trigger `click()` on Enter/Space, and visible focus styles managed via `onFocus`/`onBlur` properties (e.g., updating `boxShadow` and `borderColor`).
