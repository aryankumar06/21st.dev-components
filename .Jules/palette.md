## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-25 - Hidden File Inputs Keyboard Accessibility
**Learning:** Hiding file inputs (`display: none`) and replacing them visually with a wrapping `<label>` creates a keyboard accessibility trap. Screen readers might miss it, and keyboard users cannot focus or interact with it since the native `input` is completely hidden and labels aren't natively focusable.
**Action:** When hiding file inputs, explicitly make the visible `<label>` wrapper focusable (`tabIndex={0}`) and add keyboard event handlers (like `onKeyDown` for "Enter" and "Space") to trigger the click on the underlying hidden input. Also provide visible focus states.
