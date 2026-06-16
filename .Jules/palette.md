## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2025-02-28 - Keyboard Traps in Hover-Hidden Elements
**Learning:** Hiding UI elements like menus or actions behind `opacity-0 group-hover:opacity-100` without focus styling prevents keyboard users from discovering and accessing these elements.
**Action:** Always include `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` (or similar focus-visible states) alongside hover states for elements that only appear on hover, and ensure they have appropriate `aria-label`/`title` attributes.
