## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-25 - Disabled Button Feedback
**Learning:** Users lack context when action buttons (like Add Row/Column) are disabled without visual cues or explanation.
**Action:** Add `disabled:opacity-50 disabled:cursor-not-allowed` to button classes and dynamic `title` tooltips to explain the disabled state.
