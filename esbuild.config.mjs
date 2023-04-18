import { build } from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';

(async () => {
	await build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		minify: true,
		platform: 'node',
		target: 'node18',
		outdir: 'dist',
		plugins: [
			esbuildPluginPino({
				transports: ['pino-pretty'],
			}),
		],
	});
})();
