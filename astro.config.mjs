import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://publicvalues.ciiic.nl',
  server: { port: 4321 },
  vite: {
    ssr: {
      noExternal: ['pdfmake'],
    },
  },
});
