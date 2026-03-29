import { defineConfig } from "astro/config";

import vercel from '@astrojs/vercel';

import react from "@astrojs/react";

import tailwind from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [react(), mdx()],
  base: "/",
  trailingSlash: "always",
  output: "static",
  vite: {
    plugins: [tailwind()]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});