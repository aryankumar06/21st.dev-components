## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-12-04 - Keyboard Focus for Hover-Hidden Actions
**Learning:** When hiding action buttons with `opacity-0 group-hover:opacity-100` to declutter a UI, these interactive elements remain inaccessible to keyboard users because they cannot see them when navigating with `Tab`.
**Action:** Always pair `opacity-0 group-hover:opacity-100` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` and ensure icon-only buttons have an `aria-label` and `title` to maintain full accessibility.
