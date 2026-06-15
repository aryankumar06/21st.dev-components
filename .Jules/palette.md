## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-05-18 - Hover-only buttons trap keyboard users
**Learning:** Using `opacity-0 group-hover:opacity-100` makes buttons completely invisible to keyboard users who tab through the interface, creating a significant accessibility barrier.
**Action:** Always pair `group-hover:opacity-100` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` so elements become visible and show a clear ring when they receive keyboard focus.

## 2024-05-18 - Disabled states need explanation
**Learning:** A visually disabled button (`opacity-50 cursor-not-allowed`) alone doesn't tell the user *why* it's disabled or what they need to do to enable it.
**Action:** Add dynamic `title` attributes to disabled buttons (e.g., `title={!input ? "Please enter a value" : undefined}`) to provide explanatory tooltips on hover/focus.
