## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-07-28 - Keyboard Accessibility on Hover-Hidden UI Elements
**Learning:** When hiding elements using `opacity-0 group-hover:opacity-100` (common for contextual actions like row/column menus), they become inaccessible to keyboard users unless explicitly handled. Playwright tests showed that tabbing to these elements leaves them invisible without focus styling.
**Action:** When implementing hover-hidden elements, always couple `opacity-0 group-hover:opacity-100` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` to ensure they reveal themselves and present clear focus rings when receiving keyboard focus.
