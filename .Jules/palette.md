## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-07-26 - Keyboard Accessibility for Hover-Hidden Elements
**Learning:** Elements hidden with `opacity-0` that rely on `group-hover:opacity-100` to become visible create a trap for keyboard users because the element never becomes visible on focus. This is a common issue in data tables or dense lists with action buttons (like column or row menus in a habit tracker).
**Action:** Always include `focus-visible:opacity-100` and focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) alongside hover states to ensure hidden interactive elements become visible and clearly indicate focus when navigated via keyboard.
