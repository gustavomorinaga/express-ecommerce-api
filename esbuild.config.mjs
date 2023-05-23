import { build } from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';
import { compress } from 'esbuild-plugin-compress';

(async () => {
	console.log('📦 Building...');
	console.time('Build time');

	await build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		minify: true,
		write: false,
		platform: 'node',
		target: 'node18',
		outdir: 'dist',
		plugins: [
			esbuildPluginPino({
				transports: ['pino-pretty'],
			}),
			compress(),
		],
	});

	console.log('✅ Build complete');
	console.timeEnd('Build time');
})();
