## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2025-02-18 - Keyboard Accessibility Trap with Hover States
**Learning:** Hiding interactive elements using `opacity-0 group-hover:opacity-100` without focus styles creates a keyboard accessibility trap. Keyboard users can focus these elements but won't see them, leading to confusion.
**Action:** Always pair hover visibility classes with focus visibility classes (e.g., `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none`) to ensure elements become visible when receiving keyboard focus.
