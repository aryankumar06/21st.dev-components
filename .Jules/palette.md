## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Hover-triggered Opacity Traps for Action Menus
**Learning:** Using `opacity-0 group-hover:opacity-100` to hide secondary action menus (like row actions or check-all functions) creates a severe accessibility trap. Keyboard-only users and screen readers cannot discover these elements if they only appear on mouse hover.
**Action:** When hiding UI elements using hover states, always pair them with `focus-visible:opacity-100` and focus indicators (e.g., `focus-visible:ring-2`) to ensure they become visible and clearly outlined when receiving keyboard focus.
