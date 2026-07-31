## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-08-01 - Keyboard Accessibility on Hidden File Inputs
**Learning:** Custom file upload areas that use a `<label>` wrapping a hidden `<input type="file">` are often completely inaccessible to keyboard users because they lack a `tabIndex` and an explicit keyboard event listener.
**Action:** When hiding a file input, always add `tabIndex={0}`, handle `onKeyDown` to simulate a click via "Enter" or "Space" (verifying `e.target === e.currentTarget` to avoid bubbling), and provide clear focus styling via `onFocus` and `onBlur`.
