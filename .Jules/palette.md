## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-07-15 - Accessibility for Hidden File Inputs
**Learning:** Hiding file inputs (e.g., `display: none`) and replacing them with styled wrappers like a `<label>` breaks keyboard accessibility by default, because hidden inputs cannot receive focus.
**Action:** When a styled `<label>` acts as a file upload button, make the wrapper keyboard accessible by adding `tabIndex={0}`, an `onKeyDown` handler that triggers the nested input on 'Enter' or 'Space' while preventing bubbling (`if (e.target !== e.currentTarget) return;`), and `onFocus`/`onBlur` styles to provide a visible focus indicator for keyboard users.
