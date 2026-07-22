## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-25 - Focus Visibility on Hover-Hidden Elements
**Learning:** Hiding UI elements like action buttons using `opacity-0 group-hover:opacity-100` creates a keyboard accessibility trap. Screen reader and keyboard-only users navigating via 'Tab' cannot see the elements when they receive focus, leading to confusion about where the current focus lies.
**Action:** Always include `focus-visible:opacity-100` (along with focus indicators like `focus-visible:ring-2 focus-visible:outline-none`) when hiding interactive elements behind hover states, ensuring they become visible and distinct when receiving keyboard focus natively.
