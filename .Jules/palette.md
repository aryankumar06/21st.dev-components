## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Keyboard Accessibility Traps with opacity-0
**Learning:** Hiding interactive elements using `opacity-0 group-hover:opacity-100` creates a keyboard accessibility trap. These elements remain in the tab order but are invisible when they receive keyboard focus, meaning visually impaired users relying on keyboards cannot see what they are interacting with.
**Action:** When hiding UI elements with hover states, always include `focus-visible:opacity-100` and clear focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure the elements become visible when receiving keyboard focus.
