## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-10-24 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When hiding a `<input type="file">` element (using `display: none`) and replacing it with a custom `<label>` for styling, the input loses its default keyboard actionability (focus via Tab and selection via Enter/Space). Sighted keyboard users and screen reader users cannot interact with the upload area.
**Action:** Always make the wrapper `<label>` keyboard accessible by adding `tabIndex={0}`, visible focus styles (e.g., via `onFocus`/`onBlur` modifying an outline or box-shadow), and an `onKeyDown` handler to trigger the click event on Enter or Space keys, ensuring you handle event bubbling properly.
