## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-07-06 - Keyboard Accessible Hover-Hidden Elements
**Learning:** Hiding elements via `opacity-0 group-hover:opacity-100` creates accessibility traps for keyboard users because elements remain invisible on focus.
**Action:** Always include `focus-visible:opacity-100` and a focus ring (`focus-visible:ring-2 focus-visible:outline-none`) alongside hover states to ensure keyboard accessibility.
