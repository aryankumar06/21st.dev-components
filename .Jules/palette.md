## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-07-27 - Icon-Only Button Accessibility in Interactive Dashboards
**Learning:** In complex interactive components like the Job Tracker (similar to the Habit Tracker), there's a strong pattern of neglecting `aria-label` and `title` attributes on icon-only buttons (like those for filtering, sorting, expanding views, editing, or deleting items). This occurs because the visual icon inherently suggests the action to sighted users, but fails to provide context for screen readers or clarifying tooltips.
**Action:** When working on dense interactive components or dashboards, proactively audit and add both `aria-label` (for screen readers) and `title` (for tooltips) to all icon-only interactive elements to guarantee usability and accessibility.
