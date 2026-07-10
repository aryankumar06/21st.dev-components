## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-25 - Custom Styled File Input Accessibility
**Learning:** When styling file inputs by wrapping them in a `<label>` and hiding the actual `<input type="file">`, the label itself must be explicitly made keyboard-accessible. Hiding the input removes it from the natural tab order. A visually appealing file upload area is completely inaccessible to keyboard and screen reader users if they cannot tab to it or activate it with Enter/Space.
**Action:** Always add `tabIndex={0}`, an `onKeyDown` handler to trigger the click on Enter/Space, and visible focus styles (`onFocus`/`onBlur` with an outline) to any custom element acting as a proxy for a hidden input.
