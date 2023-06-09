import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { copy } from 'esbuild-plugin-copy';
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
			clean({ patterns: ['dist/**/*'] }),
			copy({ assets: [{ from: './public/**/*', to: './public' }] }),
			esbuildPluginPino({
				transports: ['pino-pretty', 'pino-mongodb'],
			}),
			compress(),
		],
	});

	console.log('✅ Build complete');
	console.timeEnd('Build time');
})();
