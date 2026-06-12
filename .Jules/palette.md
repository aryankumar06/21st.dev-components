## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-06-12 - Keyboard accessibility for hover-hidden elements
**Learning:** Hiding interactive elements using `opacity-0 group-hover:opacity-100` creates a keyboard accessibility trap. Screen reader and keyboard-only users cannot focus or interact with these elements because they remain invisible during tab navigation.
**Action:** Whenever using `opacity-0 group-hover:opacity-100` on an interactive element, always combine it with `focus-visible:opacity-100` and provide a clear focus indicator like `focus-visible:ring-2 focus-visible:outline-none`.
