## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-30 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When using `<label>` wrappers with hidden file inputs (`display: none`) to create custom upload areas, the control loses keyboard accessibility because standard hidden inputs cannot receive focus.
**Action:** Always add `tabIndex={0}`, keyboard event handlers (`onKeyDown` for Enter/Space), and explicit focus state styling (`onFocus`/`onBlur`) to the wrapping `<label>` element to restore full keyboard interactivity.
