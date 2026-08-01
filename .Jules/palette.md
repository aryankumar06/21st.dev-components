## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Accessibility of Hover-Hidden Data Grid Actions
**Learning:** Components in data-heavy layouts (like tables or grids) often hide inline actions (e.g., column menus, row actions) using hover states (like `opacity-0 group-hover:opacity-100`) to reduce visual clutter. However, this pattern inherently creates a keyboard accessibility trap unless `focus-visible:opacity-100` (along with focus indicators like `focus-visible:ring-2`) is explicitly added, because keyboard users cannot trigger hover states.
**Action:** When implementing or reviewing UIs that conditionally hide interactive elements behind hover pseudoclasses, always ensure corresponding `focus-visible` states are present so the elements become visible when focused via keyboard navigation.
