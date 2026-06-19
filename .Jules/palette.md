## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-06-19 - Keyboard Accessibility for Hover-Revealed Elements
**Learning:** Elements hidden by default using `opacity-0 group-hover:opacity-100` remain invisible to keyboard users who tab to them, creating invisible tab stops and accessibility traps.
**Action:** When hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`), always include `focus-visible:opacity-100` and focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure the elements become visible when receiving keyboard focus.
