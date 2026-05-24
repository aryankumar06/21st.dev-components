## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Visual Indicators and Explanatory Tooltips for Disabled States
**Learning:** Simply setting a button to `disabled` is often insufficient for a good user experience. Users need clear visual feedback (like reduced opacity or a `not-allowed` cursor) to quickly identify non-interactive elements. Furthermore, explaining *why* a button is disabled via dynamic tooltips (e.g., `title={!isValid ? "Reason" : undefined}`) significantly reduces user frustration and confusion when completing forms or adding new items.
**Action:** When implementing disabled states, consistently add clear visual indicators (e.g., `disabled:opacity-50 disabled:cursor-not-allowed`) and provide context-specific explanatory tooltips using conditional `title` attributes.
