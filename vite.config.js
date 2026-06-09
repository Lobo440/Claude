import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// `base` is set to the repo name for GitHub Pages project-site hosting
// (served from https://<user>.github.io/Claude/). Dev runs from root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Claude/' : '/',
}));
