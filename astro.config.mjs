// @ts-check
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://davidglassman.github.io',
  base: '/journaler-landing-page',

  server: {
    port: 3000
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon()]
});
