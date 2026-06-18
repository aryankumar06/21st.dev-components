## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-18 - Keyboard Accessibility Trap with Hover-Only Visibility
**Learning:** Hiding interactive UI elements behind hover states (e.g., `opacity-0 group-hover:opacity-100`) completely hides them from keyboard users who navigate via the Tab key, creating an accessibility trap where features become mouse-exclusive.
**Action:** Always include `focus-visible:opacity-100` and clear focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) when using hover-based visibility classes, ensuring keyboard users can both discover and interact with the elements.
