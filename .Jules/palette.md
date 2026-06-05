## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-05 - Disabled State Tooltips
**Learning:** Adding `title` attributes along with visual disabled indicators (`disabled:opacity-50 disabled:cursor-not-allowed`) significantly improves usability when form submission buttons are disabled due to missing inputs.
**Action:** Consistently apply both visual and explanatory disabled states to all critical submission actions across the design system.
