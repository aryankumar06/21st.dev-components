## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-11-20 - Keyboard Accessibility for Hidden File Inputs
**Learning:** When native file `<input type="file">` elements are hidden (`display: none`) and wrapped in a `<label>` for custom styling, the file upload action loses keyboard accessibility by default.
**Action:** Always make the `<label>` focusable (`tabIndex={0}`), manage visual focus state manually (e.g., via `onFocus`/`onBlur` and `box-shadow`), and add an `onKeyDown` handler to trigger `e.currentTarget.click()` on Enter or Space, being careful to check `e.target === e.currentTarget` to prevent event bubbling issues from nested buttons.
