## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-10-24 - Focus Visibility on Hover-Hidden Elements
**Learning:** Hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`) creates keyboard accessibility traps, as users navigating via the keyboard cannot see the elements when they receive focus.
**Action:** Always include `focus-visible:opacity-100` along with visual focus indicators like `focus-visible:ring-2 focus-visible:outline-none` when applying hover-based visibility patterns.
