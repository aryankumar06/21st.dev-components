## 2026-05-12 - Added ARIA labels to Icon Buttons
**Learning:** Found multiple instances where icon-only buttons lacked accessible labels in `habit_tracker_component.tsx` and `job_tracker_component.tsx`. This makes UI interactions difficult for screen readers.
**Action:** Always verify that interactive elements without text content have `aria-label`s or visually-hidden text. Adding `aria-label` improves a11y without affecting the visual design.
