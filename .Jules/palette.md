## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Keyboard Accessibility for Hover-Revealed Elements
**Learning:** Hiding UI elements like buttons purely with hover state (`opacity-0 group-hover:opacity-100`) creates a keyboard accessibility trap. Screen readers and keyboard navigators cannot trigger the hover state, effectively hiding these elements from them visually and making navigation confusing.
**Action:** Always pair hover visibility toggles with explicit `focus-visible` styles and focus rings (e.g., `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none`) to ensure keyboard users can discover and interact with the elements.
