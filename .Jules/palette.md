## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Accessible Hidden File Inputs
**Learning:** When styling file inputs by hiding the actual `<input type="file">` and using a `<label>` as the clickable area, keyboard accessibility is lost by default because labels are not naturally focusable or actionable via keyboard.
**Action:** Always add `tabIndex={0}` and an `onKeyDown` handler (listening for Enter/Space and ignoring bubbled events with `e.target === e.currentTarget`) to the `<label>` wrapper, along with visible focus styling, to ensure keyboard users can trigger the file dialog.
