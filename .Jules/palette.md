## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Hover States and Keyboard Focus Traps
**Learning:** UI elements hidden visually via hover states (e.g., `opacity-0 group-hover:opacity-100`) become inaccessible to keyboard users unless explicitly styled for focus. These keyboard traps prevent users from discovering or interacting with actions.
**Action:** Always pair `opacity-0 group-hover:opacity-100` with `focus-visible:opacity-100` and clear focus rings (like `focus-visible:ring-2 focus-visible:outline-none`) to ensure keyboard navigability.
