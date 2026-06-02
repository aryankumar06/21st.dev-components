## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-03-24 - Hidden File Input Accessibility
**Learning:** Hidden file inputs (`<input type="file" style="display: none">`) cannot be focused, breaking keyboard navigation for file uploads wrapped in custom styled `<label>` elements.
**Action:** When hiding a file input, ensure the wrapping `<label>` is keyboard accessible by adding `tabIndex={0}`, an `onKeyDown` handler to trigger the click on Enter/Space, and visible focus styling (e.g., via `onFocus` and `onBlur`).
