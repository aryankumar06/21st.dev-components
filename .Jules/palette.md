## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-30 - Informative Disabled States
**Learning:** Disabling buttons without explanation (e.g., opacity or tooltip) leads to user confusion as they don't know why an action is blocked. This pattern was observed on submit buttons across form modals in the application trackers.
**Action:** Always provide a clear visual cue (like `opacity-50` and `cursor-not-allowed`) along with a dynamic `title` tooltip that explains exactly what is required to enable the button.
