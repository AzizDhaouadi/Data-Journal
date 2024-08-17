import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  base: "/",
  trailingSlash: "always",
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
  }),
});
