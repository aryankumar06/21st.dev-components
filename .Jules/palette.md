## 2024-05-16 - Icon-Only Buttons Accessibility

**Learning:** When using icon-only buttons (like those found in toolbars), providing just `aria-label` is not enough for all users, as sighted users might need tooltips to understand the icon's purpose. Conversely, providing just `title` doesn't always translate well to all screen readers.

**Action:** Always include both `aria-label` (for screen readers) and `title` (for visual tooltips) on all icon-only buttons to ensure a consistently accessible and intuitive experience across all interaction modes.