import { defineCollection, z } from 'astro:content';
// 1. Import glob loader dari astro/loaders
import { glob } from 'astro/loaders';

// 2. Skema untuk Portofolio Proyek
const projectsCollection = defineCollection({
  // Gunakan loader glob untuk mencari file markdown (.md atau .mdx)
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

// 3. Skema untuk Katalog Produk
const productsCollection = defineCollection({
  // Gunakan loader glob yang mengarah ke folder products
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    isAvailable: z.boolean().default(true),
  }),
});

// 4. Export seperti biasa
export const collections = {
  'projects': projectsCollection,
  'products': productsCollection,
};