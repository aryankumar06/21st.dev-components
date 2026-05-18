## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons (Job Tracker)
**Learning:** We observed missing `aria-label` and `title` attributes on many icon-only buttons across `job_tracker_component.tsx` (e.g., clear search, close modals, remove resume). Consistent with previous findings, icon-only buttons must always explicitly declare both attributes to provide both screen reader accessibility and visual tooltips for users.
**Action:** Consistently enforce the addition of both `aria-label` and `title` attributes on all newly created or modified icon-only buttons to ensure an inclusive and intuitive user experience.
