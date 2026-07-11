## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-03 - Keyboard Focus Traps on Hover-Hidden UI Elements
**Learning:** Hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`) creates a keyboard accessibility trap. Screen reader and keyboard-only users will focus these elements, but without explicit focus styles, they remain invisible, leaving users disoriented about their current location on the page.
**Action:** When using hover-hidden elements, always include `focus-visible:opacity-100` and focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure the elements become visible and clearly highlighted when receiving keyboard focus.
