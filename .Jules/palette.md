## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-06-22 - File Upload Label Keyboard Accessibility
**Learning:** Hidden file inputs (`display: none`) make the wrapping `<label>` inaccessible to keyboard users, preventing them from triggering the upload dialog.
**Action:** Always add `tabIndex={0}`, an `onKeyDown` handler (for Enter/Space), and visible focus styling (`onFocus`/`onBlur`) to the wrapping `<label>` when hiding the input.
