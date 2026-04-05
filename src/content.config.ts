import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
    schema: z.object({
        author: z.string(),
        date: z.string(),
        title: z.string(),
        featured: z.boolean(),
        description: z.string().optional(),
    }),
});

const authorsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            image: image(),
        }),
});

export const collections = {
    posts: postsCollection,
    authors: authorsCollection,
};