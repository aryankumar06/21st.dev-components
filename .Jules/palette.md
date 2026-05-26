## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2024-05-26 - Explanatory Tooltips on Disabled Buttons
**Learning:** Disabled UI elements without explanation can cause user frustration as they try to figure out what step they missed. Just lowering opacity isn't enough; users need to know *why* an action is blocked.
**Action:** When creating a disabled button state, always ensure there is a visual indicator (`disabled:opacity-50`, `disabled:cursor-not-allowed`) AND provide a dynamic `title` tooltip that explains what the user needs to do to enable the button.
