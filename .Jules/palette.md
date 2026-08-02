## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-08-02 - Keyboard Accessibility Traps in Hidden Elements
**Learning:** Using `opacity-0 group-hover:opacity-100` without focus styles creates a keyboard accessibility trap. The element is hidden from sighted keyboard users until they focus on it, but without `focus-visible` styles, they can never see it.
**Action:** Always include `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` on elements hidden with `opacity-0` to ensure they become visible when receiving keyboard focus.
