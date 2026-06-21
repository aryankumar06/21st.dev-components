## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Keyboard Accessibility Traps with opacity-0 Hover States
**Learning:** Elements hidden with `opacity-0 group-hover:opacity-100` create keyboard accessibility traps because they are not visually focusable by keyboard users using standard tabbing. Even if they are technically in the DOM, visual users navigating via keyboard cannot see them to interact with them.
**Action:** When hiding elements using hover state opacity (e.g., `opacity-0 group-hover:opacity-100`), always include `focus-visible:opacity-100` and focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to ensure the elements become visible and clearly focused when receiving keyboard focus.
