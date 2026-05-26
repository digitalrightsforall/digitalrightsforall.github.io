import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function githubPages404() {
  return {
    name: 'github-pages-deploy',
    closeBundle() {
      copyFileSync(
        resolve(__dirname, 'dist/index.html'),
        resolve(__dirname, 'dist/404.html')
      );

      if (existsSync(resolve(__dirname, '.nojekyll'))) {
        copyFileSync(
          resolve(__dirname, '.nojekyll'),
          resolve(__dirname, 'dist/.nojekyll')
        );
      }

      if (existsSync(resolve(__dirname, 'CNAME'))) {
        copyFileSync(
          resolve(__dirname, 'CNAME'),
          resolve(__dirname, 'dist/CNAME')
        );
      }
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
