/**
 * src/content.config.ts  (Astro 5+)
 * ─────────────────────────────────────────────────────────────────────────────
 * Define los esquemas Zod para las Content Collections de Astro 5.
 * En Astro 5 se requiere un `loader` explícito en cada colección.
 * Cada campo está validado en build-time; errores se reportan antes de deploy.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Esquema ADR (Architecture Decision Record) ──────────────────────────────
const adrSchema = z.object({
  title:        z.string().min(1),
  context:      z.string().min(1),  // Situación que motivó la decisión
  decision:     z.string().min(1),  // Qué se decidió hacer
  consequences: z.string().min(1),  // Consecuencias positivas y trade-offs
});

// ─── Esquema de Proyectos ─────────────────────────────────────────────────────
const projectsCollection = defineCollection({
  // glob loader: carga todos los MDX en src/content/projects/{es,en}/*.mdx
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title:       z.string().min(1),
      description: z.string().min(1).max(500),
      date:        z.coerce.date(),
      // image() de Astro garantiza que el asset existe y se optimizará a WebP
      image:       image(),
      // images: galería adicional para el carrusel (opcional)
      images:      z.array(image()).optional(),
      stack:       z.array(z.string()).min(1),
      links: z.object({
        demo:           z.string().url().optional(),
        github:         z.string().url().optional(),
        githubFrontend: z.string().url().optional(),
        githubBackend:  z.string().url().optional(),
      }),
      featured: z.boolean().default(false),
      // Campos opcionales para Case Study
      nfr: z
        .array(z.string())
        .optional()
        .describe('Non-Functional Requirements'),
      adrs: z
        .array(adrSchema)
        .optional()
        .describe('Architecture Decision Records'),
      architectureDiagram: z
        .string()
        .optional()
        .describe('Ruta relativa a src/assets/ de la imagen del diagrama'),
    }),
});

// ─── Esquema de Bio ───────────────────────────────────────────────────────────
const bioCollection = defineCollection({
  // glob loader: carga es.mdx y en.mdx
  loader: glob({ pattern: '*.mdx', base: './src/content/bio' }),
  schema: ({ image }) =>
    z.object({
      name:    z.string().min(1),
      role:    z.string().min(1),
      summary: z.string().min(1),
      avatar:  image().optional(),
      skills:  z.array(z.string()).min(1),
      socials: z.object({
        github:   z.string().url(),
        linkedin: z.string().url(),
        twitter:  z.string().url().optional(),
      }),
      cvUrl: z.string(),  // Ruta pública del PDF (ej: /cv-emacr.pdf)
    }),
});

// ─── Registro de colecciones ──────────────────────────────────────────────────
export const collections = {
  projects: projectsCollection,
  bio:      bioCollection,
};
