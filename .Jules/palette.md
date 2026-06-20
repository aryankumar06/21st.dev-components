## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2024-06-20 - Accessible file upload label
**Learning:** Hiding the native `<input type="file">` visually (`display: none`) makes it inaccessible via keyboard navigation. The wrapper label needs to be focusable with `tabIndex={0}`, handle Enter/Space keys to trigger the upload, and show visible focus indicators.
**Action:** Always verify that hidden inputs triggered by wrappers have proper keyboard focus and interaction support on the wrapper element.
