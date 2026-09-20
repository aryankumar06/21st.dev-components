import esbuild from 'esbuild';

async function verify() {
  try {
    await esbuild.build({
      entryPoints: ['habit_tracker_component.tsx'],
      bundle: false,
      outfile: 'out.js',
      format: 'esm',
      loader: { '.tsx': 'tsx', '.ts': 'ts' },
    });
    console.log("Syntax is valid!");
  } catch (err) {
    console.error("Syntax error:", err);
  }
}
verify();
