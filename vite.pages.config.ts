import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/apc-site-prototype/',
  root: path.join(rootDir, 'spa'),
  publicDir: path.join(rootDir, 'public'),
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: {
    alias: { '@': rootDir },
  },
  build: {
    outDir: path.join(rootDir, 'dist-pages'),
    emptyOutDir: true,
  },
});
