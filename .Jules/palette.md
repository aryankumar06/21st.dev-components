## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-05-24 - Focus Visibility for Hover-Hidden Elements
**Learning:** Hiding interactive elements using `opacity-0 group-hover:opacity-100` creates a major accessibility trap for keyboard users, as the elements remain invisible even when they receive focus via the Tab key.
**Action:** Always include `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` alongside hover-based opacity changes to ensure buttons become visible and clearly outlined when navigated to via keyboard.
