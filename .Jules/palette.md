## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When hiding standard `<input type="file">` elements (e.g., `display: none`) and replacing them with custom styled `<label>` elements for better UI, keyboard navigation is completely lost by default. The label doesn't naturally receive focus or respond to Enter/Space keys, creating a severe accessibility trap where keyboard users cannot upload files.
**Action:** When styling custom file inputs by wrapping them in labels, always make the wrapper keyboard focusable (`tabIndex={0}`), visually indicate focus (`onFocus`/`onBlur` with `box-shadow` or `outline`), and add an `onKeyDown` handler to programmatically trigger the underlying file input when Enter or Space is pressed.
