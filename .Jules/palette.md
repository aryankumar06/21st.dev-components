## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-25 - Accessibility of Hidden File Inputs
**Learning:** When hiding a file input (`display: none`) and replacing it with a styled wrapper (like a `<label>`), the interactive element becomes inaccessible to keyboard users because the hidden input cannot receive focus.
**Action:** Always add `tabIndex={0}` to the wrapper, implement keyboard event handling (`onKeyDown` for Enter/Space) to trigger the input, and provide visible focus indicators (e.g., `onFocus` styles) to ensure full keyboard navigation support.
