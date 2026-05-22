## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-25 - Explanatory Tooltips and Visual Styling for Disabled States
**Learning:** Setting the `disabled` property on a button inherently prevents users from clicking it, but without appropriate visual indicators (opacity, not-allowed cursor) and explanatory context (tooltips explaining *why* it's disabled), users can be left feeling confused or stuck, especially when form validation prevents submission.
**Action:** Whenever a button is dynamically disabled due to missing input or validation states, ensure the button's design communicates it's disabled via styling (`opacity-50`, `cursor-not-allowed`) and add a dynamically assigned `title` attribute to explain what the user needs to do to enable it.
