## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-05-24 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When hiding a file input element (`display: none`) for styling purposes and wrapping it in a `<label>`, the input becomes inaccessible to keyboard users (cannot be tabbed to or activated with Enter/Space).
**Action:** Always make the wrapping `<label>` keyboard accessible by adding `tabIndex={0}`, an `onKeyDown` handler to trigger the upload via Enter/Space keys (while preventing event bubbling from child buttons), and visible focus styling via `onFocus`/`onBlur`.
