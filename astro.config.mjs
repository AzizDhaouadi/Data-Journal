import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from '@astrojs/vercel';

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [tailwind(), react(), mdx()],
  base: "/",
  trailingSlash: "always",
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});