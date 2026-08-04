## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-04 - Keyboard Accessibility on Hover-Hidden Elements
**Learning:** When hiding UI elements using hover states (e.g., `opacity-0 group-hover:opacity-100`), they remain invisible to keyboard users who navigate via Tab. This creates an accessibility trap where interactive elements receive focus but are invisible.
**Action:** Always include `focus-visible:opacity-100` along with focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) on elements hidden by default opacity states to ensure they appear when receiving keyboard focus.
