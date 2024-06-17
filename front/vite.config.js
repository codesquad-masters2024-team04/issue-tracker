// vite.config.js
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
	plugins: [react()],
	server: {
		// host: 'localhost',
		port: 5173,
		open: true,
	},
	sourcemap: true,
	build: {
		outDir: 'build',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
				},
			},
		},
	},
	terserOptions: {
		compress: {
			drop_console: true, // 콘솔 로그 제거
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
	},
	optimizeDeps: {
		exclude: ['.vite/deps/*'],
	},
});
