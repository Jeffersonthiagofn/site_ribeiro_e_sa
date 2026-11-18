import fs from 'node:fs';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ribeiroesaarquitetura.com.br',
  integrations: [
    {
      name: 'clean-dist',
      hooks: {
        'astro:build:start': () => {
          fs.rmSync(new URL('./dist', import.meta.url), {
            recursive: true,
            force: true,
          });
        },
      },
    },
  ],
});
