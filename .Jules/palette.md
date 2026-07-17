## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-07-17 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When hiding `<input type="file">` elements using `display: none` for custom styling via a wrapper `<label>`, the entire upload functionality becomes inaccessible to keyboard users because the hidden input is removed from the focus order. Standard browser handling via Space/Enter keys on the `<label>` only works if it receives focus.
**Action:** Always add `tabIndex={0}` to the wrapper `<label>` containing a hidden file input, and implement an `onKeyDown` handler to trigger `e.currentTarget.click()` upon Enter/Space keystrokes. It's also crucial to add `if (e.target !== e.currentTarget) return;` to prevent nested buttons (like "remove file" icons) from inadvertently triggering the file dialog via event bubbling.
