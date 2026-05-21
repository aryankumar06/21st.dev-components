## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-21 - Dual Accessibility Attributes for Icon-Only Buttons
**Learning:** Found that many interactive icon-only buttons lacked both `aria-label` and `title` attributes, severely impacting both screen reader users and sighted users needing tooltips. This is a common pattern in components utilizing Lucide icons where visual context is assumed to be sufficient.
**Action:** Always proactively add both `aria-label` and `title` to icon-only buttons to ensure full accessibility and a better UX.
