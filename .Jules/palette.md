## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-03-01 - Keyboard accessibility for hidden file inputs wrapped in labels
**Learning:** Custom UI wrappers for `<input type="file" style={{ display: "none" }}>` (e.g., using a `<label>` block) break keyboard accessibility because the hidden input cannot receive focus, and `<label>` elements are not natively focusable or clickable via keyboard.
**Action:** When hiding file inputs, always ensure the wrapping element has `tabIndex={0}`, an `onKeyDown` handler that explicitly calls `.click()` on the input when Enter or Space is pressed, and visible focus styles (e.g., using `onFocus`/`onBlur` or CSS `:focus` states). Additionally, ensure event bubbling is handled in the `onKeyDown` if there are nested interactive elements.
