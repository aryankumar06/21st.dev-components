## 2024-05-16 - Icon-Only Buttons Accessibility

**Learning:** When using icon-only buttons (like those found in toolbars), providing just `aria-label` is not enough for all users, as sighted users might need tooltips to understand the icon's purpose. Conversely, providing just `title` doesn't always translate well to all screen readers.

**Action:** Always include both `aria-label` (for screen readers) and `title` (for visual tooltips) on all icon-only buttons to ensure a consistently accessible and intuitive experience across all interaction modes.
## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.
