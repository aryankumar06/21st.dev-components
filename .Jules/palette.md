## 2024-05-24 - Accessibility and Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons must explicitly declare both `aria-label` (for screen readers) and `title` (for visual tooltips). In Shadcn/Lucide setups, icons don't inherently communicate their action to either assistive technologies or sighted users needing clarification. Missing these attributes is a common accessibility trap in dense UIs like habit trackers.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons as a standard procedure to ensure an inclusive and intuitive user experience.

## 2026-08-09 - Empty States for Filtered Views
**Learning:** When implementing empty states for data-heavy components triggered by active filters or search queries, always include an actionable 'Clear filters/search' button to speed up user recovery and prevent dead-ends.
**Action:** Always include a 'Clear filters/search' button when an empty state is caused by active filters or search.
## 2026-08-11 - Keyboard Accessibility for File Upload Wrappers
**Learning:** When hiding a default file input and using a wrapping `<label>` element as the visible dropzone/button, the element becomes completely inaccessible to keyboard users because `<label>` elements do not receive focus by default and native Enter/Space triggers don't work reliably across all browser/OS combinations for hidden inputs. Also, if there are nested interactive elements (like a delete button), event bubbling can cause unintended triggers.
**Action:** When hiding a file input, always ensure the wrapping `<label>` or container is keyboard accessible by adding `tabIndex={0}`, an `onKeyDown` handler to trigger the upload via Enter/Space keys (while blocking bubbling with `if (e.target !== e.currentTarget) return;`), and visible focus styling (e.g., using `onFocus` and `onBlur` to toggle `boxShadow`).
