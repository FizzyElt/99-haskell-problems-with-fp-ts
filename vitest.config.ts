import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@module/test': path.join(__dirname, 'test'),
      '@module': path.join(__dirname, 'src'),
    },
  },
});
