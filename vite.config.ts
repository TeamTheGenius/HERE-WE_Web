import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['axios'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  cacheDir: '.vite',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
