import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/property-access-performance-test/' : '/',
});
