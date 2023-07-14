import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [sveltekit()],
		server: {
			port: 3000,
			hmr: {
				// External port (Docker host)
				clientPort: env.PUBLIC_TESTING === 'true' ? 3000 : 3001
			},
		}
	}
});
