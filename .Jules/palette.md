## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.

## 2024-05-24 - Hiding File Inputs Accessibly
**Learning:** Hiding `<input type="file">` elements with `display: none` for custom styling breaks keyboard navigation unless carefully handled. Wrapping them in a `<label>` provides pointer accessibility but doesn't natively forward keyboard interactions. Screen reader users can still access the hidden input if it retains focusability or semantic meaning via ARIA, but keyboard-only sighted users rely on the visual wrapper receiving focus and responding to standard interaction keys (`Enter` / `Space`).
**Action:** When hiding a file input, explicitly make its visual wrapping `<label>` keyboard accessible. Add `tabIndex={0}`, visible focus styles via `onFocus`/`onBlur`, and an `onKeyDown` handler to programmatically trigger the nested input via `ref.current?.click()` on `Enter`/`Space`. Ensure `onKeyDown` checks `e.target === e.currentTarget` to prevent nested interactive elements (like a "Remove file" button) from inadvertently opening the file dialog.
