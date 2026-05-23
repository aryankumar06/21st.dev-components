## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-23 - Dynamic Tooltips for Disabled Buttons
**Learning:** Providing visual styling (like `disabled:opacity-50`) isn't enough when buttons are disabled. Users often don't know *why* an action isn't available. Adding dynamic `title` tooltips that explain the specific missing requirement (e.g., 'Column name is required') significantly reduces user frustration.
**Action:** Whenever implementing disabled states on forms or inputs, always pair them with an explanatory tooltip that dynamically informs the user what action is required to enable the button.
