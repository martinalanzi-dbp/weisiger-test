import { defineConfig } from 'astro/config';

// Static site. Output goes to dist/.
export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
