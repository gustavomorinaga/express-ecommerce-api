import { build } from 'esbuild';

await build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	platform: 'node',
	target: 'node18',
	outdir: 'dist',
});
