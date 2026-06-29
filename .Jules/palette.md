## 2024-10-24 - [Keyboard Accessibility for Hover-Hidden Actions]
**Learning:** Icon-only action buttons hidden behind `group-hover:opacity-100` create keyboard accessibility traps because users relying on keyboards cannot see the elements when they receive focus.
**Action:** Always include `focus-visible:opacity-100` along with focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) and clear `aria-label`/`title` attributes for these types of hidden interactive elements to ensure they are accessible.

## 2024-10-24 - [Keyboard Accessibility for Hover-Hidden Actions]
**Learning:** Icon-only action buttons hidden behind `group-hover:opacity-100` create keyboard accessibility traps because users relying on keyboards cannot see the elements when they receive focus.
**Action:** Always include `focus-visible:opacity-100` along with focus rings (e.g., `focus-visible:ring-2 focus-visible:outline-none`) and clear `aria-label`/`title` attributes for these types of hidden interactive elements to ensure they are accessible.
