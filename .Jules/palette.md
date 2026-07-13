## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-07-13 - Hidden File Input Accessibility
**Learning:** Hidden file inputs (`display: none`) wrapped in custom `<label>` elements are inaccessible to keyboard users because standard `<input type="file">` interactions are lost when hidden.
**Action:** When wrapping hidden file inputs in a `<label>`, always add `tabIndex={0}`, an `onKeyDown` handler to trigger the upload via `Enter`/`Space` (with `e.target !== e.currentTarget` return to handle event bubbling), and explicit `onFocus` and `onBlur` visual styling to restore keyboard accessibility.
