## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-15 - Hidden Controls and Keyboard Accessibility
**Learning:** Using `opacity-0 group-hover:opacity-100` to hide secondary action buttons in tables or lists creates an accessibility trap for keyboard users. These elements receive focus as the user tabs through the interface, but remain invisible, causing confusion about where the current focus is.
**Action:** Always pair `opacity-0` hover reveals with `focus-visible:opacity-100` (and clear focus rings like `focus-visible:ring-2 outline-none`) so that keyboard navigation naturally reveals the hidden controls when they receive focus.
