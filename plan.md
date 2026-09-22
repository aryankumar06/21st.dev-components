1.  **Update Job Tracker Search Empty State:**
    -   In `job_tracker_component.tsx`, I will modify the empty state that appears when no applications match the search query (lines 787-791).
    -   I will replace the existing block:
        ```tsx
        {filteredApps.length === 0 && (
          <div style={{ padding: "24px 16px", textAlign: "center", color: t.muted, fontSize: 14 }}>
            No applications match your search
          </div>
        )}
        ```
    -   With this new block that adds a "Clear filters/search" button:
        ```tsx
        {filteredApps.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: t.muted }}>No applications match your search or filter.</span>
            {(searchQuery || filterStage !== "all") && (
              <button
                onClick={() => { setSearchQuery(""); setFilterStage("all"); }}
                style={{ padding: "9px 16px", background: t.surfaceAlt, color: t.muted, border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s, background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                Clear filters/search
              </button>
            )}
          </div>
        )}
        ```

2.  **Create mock utility file:**
    -   Create `mock_utils.ts` with:
        ```typescript
        export function cn(...classes: (string | undefined | null | false)[]) {
          return classes.filter(Boolean).join(' ');
        }
        export const Component = () => null; // Mock component if needed
        ```

3.  **Prepare temporary file for Esbuild:**
    -   Run `tail -n +2 job_tracker_component.tsx > temp.tsx` to strip the `npx shadcn` comment on line 1.

4.  **Verify syntax using Esbuild:**
    -   Run `pnpm dlx esbuild temp.tsx --bundle --format=esm --external:react --external:react-dom/client --external:react/jsx-runtime --external:lucide-react --alias:@/lib/utils=./mock_utils.ts --alias:@/components/ui/job-application-tracker-notion-style=./mock_utils.ts --loader:.js=jsx --loader:.tsx=tsx --jsx=automatic --outdir=dist` to verify syntax and bundle for testing.

5.  **Create standalone HTML wrapper:**
    -   Create `test.html` to import the bundled component from `dist/temp.js` and set up the `importmap` for `react`, `react-dom/client`, `react/jsx-runtime`, and `lucide-react`. I will use Tailwind CDN just in case it is needed by the Shadcn library.

6.  **Start a local Python server:**
    -   Start `python3 -u -m http.server 0 > server.log 2>&1 &` to host the HTML wrapper.

7.  **Write and execute Python Playwright script:**
    -   Write `verify.py` that navigates to the server.
    -   Switch to the "☰ All applications" tab.
    -   Search for a non-matching string like "zzzzz".
    -   Verify the empty state appears with the "Clear filters/search" button.
    -   Click the button.
    -   Verify the apps list resets.
    -   Save screenshots to `/home/jules/verification/screenshots/job_tracker_empty_state.png`.
    -   Save video to `/home/jules/verification/videos`.
    -   Call `frontend_verification_complete`.

8.  **Complete Pre-commit Steps:**
    -   Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

9.  **Submit with PR Format:**
    -   Commit changes following the PR format: Title: "🎨 Palette: Add clear search button to empty states", with What, Why, Before/After, and Accessibility sections.
