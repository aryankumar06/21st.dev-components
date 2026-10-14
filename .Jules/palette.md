## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2024-05-24 - Accessibility and Custom Inputs
**Learning:** When converting custom interactive `<div>` elements to semantic `<button>` tags (e.g., custom checkboxes or switches), explicitly reset native button styling (e.g., `padding: 0`, `background: "transparent"`) to prevent default browser artifacts from disrupting the layout. However, verify existing inline styles before blindly applying `border: "none"` so you do not overwrite structural borders required for the component's visual appearance.
**Action:** Always replace interactive `<div>` elements with `<button type="button">`, adding `role`, `aria-checked`, and `aria-label`, and verify existing inline styles to ensure a safe visual transition.

## 2024-05-24 - File Upload Accessibility
**Learning:** When implementing custom file upload zones by hiding the `<input type="file">` and styling its wrapper `<label>`, the label must be made keyboard-accessible by explicitly adding `tabIndex={0}`, an `onKeyDown` handler with `e.preventDefault()` to safely trigger clicks via Enter/Space, and visible focus styles (e.g., managing `outline` or `box-shadow` via `onFocus`/`onBlur`).
**Action:** When working with hidden file inputs wrapped in labels, ensure keyboard accessibility (`tabIndex`, `onKeyDown`) and visible focus states are implemented to support users navigating via keyboard.
