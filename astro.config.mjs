// @ts-check
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://journaler.dev',
  trailingSlash: 'always',

  server: {
    port: 3000
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**']
      }
    }
  },

  integrations: [icon(), vue()]
});
