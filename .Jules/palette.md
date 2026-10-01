## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-10-01 - File Upload Label Keyboard Accessibility
**Learning:** When hiding `<input type="file">` and using a `<label>` as the dropzone/click target, it lacks native keyboard accessibility. Playwright `.focus()` natively handles the event, but visual focus requires manual state (e.g. `onFocus`/`onBlur`).
**Action:** Always add `tabIndex={0}`, an `onKeyDown` to trigger clicks on Enter/Space, and explicit `onFocus`/`onBlur` style updates (like `box-shadow`) to ensure the wrapper `<label>` is fully accessible for keyboard users.
