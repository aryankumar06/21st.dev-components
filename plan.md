1. **Update `job_tracker_component.tsx` to explicitly declare `aria-label` on buttons missing them.**
   - In `job_tracker_component.tsx`, lines 408, 452, 509, 534, 830, 837, 887, update the icon-only buttons to explicitly have `aria-label` matching their `title`.
   - Also, line 520 `title={isExpanded ? "Collapse" : "Expand"}` needs `aria-label={isExpanded ? "Collapse" : "Expand"}`.

2. **Add visual disable state to form buttons**
   - At line 741, there is a button: `<button onClick={() => addApp(stage.key)} style={{ flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Add</button>`. Modify this to include `disabled={!newAppName.trim()}`, a `title` ("Enter a company name to add"), and update the style `opacity: newAppName.trim() ? 1 : 0.5, cursor: newAppName.trim() ? "pointer" : "not-allowed"`.
   - At line 903, there is a button: `<button onClick={addAction} style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontFamily: "inherit", fontWeight: 600, cursor: "pointer" }}>Add</button>`. Modify this to include `disabled={!newActionText.trim()}`, a `title` ("Enter an action item to add"), and update the style `opacity: newActionText.trim() ? 1 : 0.5, cursor: newActionText.trim() ? "pointer" : "not-allowed"`.

3. **Verify syntax with esbuild and perform frontend verification**
   - Run `tail -n +2 job_tracker_component.tsx > temp.tsx` (to strip the shadcn command).
   - Run `pnpm dlx esbuild temp.tsx --bundle --format=esm --external:react --external:react-dom/client --external:react/jsx-runtime --external:lucide-react --loader:.js=jsx --loader:.tsx=tsx --jsx=automatic --outfile=out.js --alias:@/components/ui/job-application-tracker-notion-style=./temp.tsx --alias:@/lib/utils=./mock_utils.ts`
   - Create an HTML file using the importmap that includes `react/jsx-runtime` to load the compiled `out.js` component.
   - Start Python HTTP server on port 0 with unbuffered output `python3 -u -m http.server 0 > server.log 2>&1 &`
   - Create and run Playwright script to verify accessibility on the newly added aria-label and the disabled buttons.
   - Run the frontend verification step using Playwright script to take a screenshot to `~/verification/screenshots/`.
   - Complete frontend verification by calling `frontend_verification_complete`.

4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Call the `pre_commit_instructions` tool.

5. **Submit the PR.**
   - Include UX improvement summary as described in Palette's guidelines.
