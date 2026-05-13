
## 2024-05-18 - Missing ARIA Labels on Icon Buttons
**Learning:** Icon-only buttons frequently lack `aria-label` attributes in these component patterns, which degrades the experience for screen reader users and fails accessibility standards. Furthermore, lacking `title` attributes deprives sighted users of helpful tooltips.
**Action:** When working with new components from this library, immediately inspect and add `aria-label` and `title` to all icon-only buttons as a standard procedure.
