## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Keyboard Accessibility for Hover-Hidden Elements
**Learning:** Hiding UI elements like action buttons behind hover states (e.g., `opacity-0 group-hover:opacity-100`) creates a trap for keyboard users because tabbing into them doesn't reveal them visually, leaving users confused about focus state.
**Action:** Always pair `opacity-0` hover hiding with `focus-visible:opacity-100` and clear focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to guarantee that these elements become visible and clearly styled when they receive keyboard focus.
