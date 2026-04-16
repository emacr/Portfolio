// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ─── Site URL ────────────────────────────────────────────────────────────────
// Configurado para GitHub Pages Project Page (/Portfolio/)
const SITE_URL = 'https://emacr.github.io/Portfolio';

export default defineConfig({
  output: 'static',
  site: SITE_URL,
  base: '/Portfolio',

  // ─── i18n nativo de Astro ──────────────────────────────────────────────────
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true, // /es/ y /en/ siempre presentes
    },
  },

  // ─── Integraciones ────────────────────────────────────────────────────────
  integrations: [
    mdx(),
    sitemap({
      // El sitemap incluirá todas las rutas estáticas generadas
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-MX',
          en: 'en-US',
        },
      },
    }),
  ],

  // ─── Vite ─────────────────────────────────────────────────────────────────
  vite: {
    plugins: [tailwindcss()],
  },
});