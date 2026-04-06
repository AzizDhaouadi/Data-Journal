# Datajournal

A technical blog focused on analytics engineering, tracking implementation, and data tooling. Built with Astro and deployed on Vercel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 6](https://astro.build) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Content | MDX via `@astrojs/mdx` |
| Search | [Algolia](https://www.algolia.com) + `react-instantsearch` |
| Analytics | [Amplitude](https://amplitude.com) + [Vercel Analytics](https://vercel.com/analytics) |
| Recommendations | [Recombee](https://www.recombee.com) |
| Deployment | [Vercel](https://vercel.com) (static output) |
| Language | TypeScript |

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── components/          # Astro and React components
│   ├── content/
│   │   ├── posts/           # Blog posts (.md / .mdx)
│   │   └── authors/         # Author profiles (.md / .mdx)
│   ├── layouts/             # Page layout templates
│   ├── pages/               # File-based routes
│   │   ├── index.astro      # Home
│   │   ├── about.astro      # About
│   │   ├── search.astro     # Search
│   │   ├── data-stories.astro
│   │   ├── ga4-api-reference.astro
│   │   ├── [slug].astro     # Individual post pages
│   │   ├── authors/         # Author pages
│   │   └── api/             # API routes
│   ├── styles/              # Global styles
│   └── content.config.ts    # Content collection schemas
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```

Starts a local dev server at `http://localhost:4321`.

### Build

```sh
npm run build
```

Type-checks the project and builds the production site to `./dist/`.

### Preview

```sh
npm run preview
```

Previews the production build locally before deploying.

### Format

```sh
npm run format
```

Runs Prettier across the project.

## Content

### Writing a Post

Create a new `.md` or `.mdx` file in `src/content/posts/`. Each post requires the following frontmatter:

```yaml
---
author: Author Name
date: MM/DD/YYYY
title: "Post Title"
featured: true | false
description: "Optional short description"
---
```

### Adding an Author

Create a new `.md` or `.mdx` file in `src/content/authors/` with the following frontmatter:

```yaml
---
name: Author Name
image: ./path-to-image.jpg
---
```

## Deployment

The site deploys automatically to Vercel on push. Output mode is `static`. Vercel Web Analytics and Speed Insights are enabled via the Vercel adapter.