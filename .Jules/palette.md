## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-20 - Icon-Only Button Accessibility
**Learning:** In the job application tracker, many icon-only buttons relied solely on `title` attributes for tooltips, omitting `aria-label`, rendering them invisible to screen readers. Furthermore, some custom interactive elements (like checkmarks) were using generic `<div>` tags instead of semantic `<button>` elements.
**Action:** Always ensure icon-only buttons include both an `aria-label` for screen reader accessibility and a `title` for mouse user tooltips. Consistently use semantic interactive tags (like `<button>`) for clickable UI components.
