import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';

function githubPages404() {
  return {
    name: 'github-pages-404',
    closeBundle() {
      copyFileSync(
        resolve(__dirname, 'dist/index.html'),
        resolve(__dirname, 'dist/404.html')
      );
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [vue(), tailwindcss(), githubPages404()],
    base: '/',
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'global': 'globalThis',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['gray-matter'],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
