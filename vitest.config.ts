import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'css-mock',
      load(id) {
        if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.sass')) {
          return 'export default {}';
        }
      },
    },
  ],
  css: {
    postcss: {
      // Disable PostCSS processing in tests
      plugins: [],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/__tests__/**', 'src/**/index.ts', 'node_modules/**', 'dist/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
