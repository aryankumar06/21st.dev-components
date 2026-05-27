## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
## 2026-05-27 - Disabled Button Tooltips
**Learning:** When disabling primary actions (like submitting a form), providing a standard disabled visual state (`opacity-50`, `cursor-not-allowed`) is crucial. However, purely visual cues do not explain *why* an action is blocked. Adding a dynamic tooltip (`title`) that specifically states the missing requirement (e.g., "Column name is required") bridges this gap, significantly improving clarity for all users.
**Action:** Always pair disabled button states with explanatory tooltips indicating exactly what the user must do to enable the button.
