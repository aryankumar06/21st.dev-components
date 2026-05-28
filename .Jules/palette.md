## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-06-25 - Disabled Button Tooltips
**Learning:** Disabled buttons without visual indicators and explanations cause user confusion.
**Action:** Always add visual indicators (`disabled:opacity-50 disabled:cursor-not-allowed`) and dynamic tooltips (`title` attribute) to disabled buttons to explain the required action.
