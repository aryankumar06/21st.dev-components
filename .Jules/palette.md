## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-11-20 - Keyboard Focus on Group-Hover Elements
**Learning:** Hiding UI elements like context menus or action buttons using `opacity-0 group-hover:opacity-100` creates a keyboard accessibility trap. Screen reader users and keyboard navigators cannot see these elements when they tab to them.
**Action:** Always add `focus-visible:opacity-100`, `focus-visible:ring-2`, and `focus-visible:outline-none` alongside `group-hover` opacity changes to ensure interactive elements become visible and clearly outlined when they receive keyboard focus.
