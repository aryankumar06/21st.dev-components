## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-03-24 - Accessible File Uploads
**Learning:** Wrapping a hidden `<input type="file">` in a clickable `<label>` creates a keyboard accessibility trap. The hidden input cannot receive focus, and the label is not inherently focusable or keyboard-interactive.
**Action:** When hiding a file input, always make the wrapper `<label>` focusable with `tabIndex={0}`, provide explicit visual focus states via `onFocus`/`onBlur`, and add an `onKeyDown` handler that safely forwards `Enter` and `Space` presses to the underlying input, taking care to prevent event bubbling from nested interactive elements.
