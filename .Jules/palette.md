## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-10-24 - Semantic Button Replacements for Custom Interactive Elements
**Learning:** In custom React components, non-semantic interactive elements like `<div>` functioning as checkboxes or switches often lack native keyboard navigability, semantic ARIA roles, and accurate screen reader announcements. Using semantic `<button>` elements and proper ARIA states ensures greater accessibility for all users.
**Action:** When implementing custom visual switches or checkboxes, replace empty interaction `<div>` wrappers with native `<button type="button">` tags. Include `role="checkbox"` or `role="switch"`, an `aria-label`, and the dynamic `aria-checked` state. Remember to reset native button styling (e.g., `padding: 0, border: "none"`) if applying custom visuals.
