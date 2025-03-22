import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from '@astrojs/vercel';

import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind(), react()],
  base: "/",
  trailingSlash: "always",
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});