## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-05-29 - Adding explanatory tooltips to disabled buttons
**Learning:** Disabling buttons without explanation causes user confusion and frustration, as users don't know what action is required to enable them.
**Action:** Always provide explicit visual feedback (like reduced opacity and 'not-allowed' cursor) and dynamic 'title' tooltips indicating exactly why the button is disabled.
