## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-25 - Hidden File Inputs and Keyboard Navigation
**Learning:** When hiding native `<input type="file" />` elements (`display: none`) and substituting them with custom styled `<label>` wrappers, keyboard accessibility is completely lost. Screen reader and keyboard-only users cannot focus or trigger the upload dialog.
**Action:** Ensure custom wrapper `<label>` components around hidden file inputs have `tabIndex={0}`, an `onKeyDown` handler to trigger click via "Enter" and "Space" keys, and visible focus styles (e.g., via `onFocus` and `onBlur`).
