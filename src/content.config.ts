import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

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

const dataStories = defineCollection({
    loader: file("public/data/stories.json"),
    schema: z.object({
        question: z.string(),
        answer: z.string(),
        category: z.string(),
        links: z.array(z.object({
            label: z.string(),
            href: z.string()
        })).optional()
    })
})

export const collections = {
    posts: postsCollection,
    authors: authorsCollection,
    stories: dataStories
};