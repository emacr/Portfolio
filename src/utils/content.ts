/**
 * src/utils/content.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Helpers para consultar las Content Collections filtradas por idioma.
 * Compatible con Astro 5 glob loader (IDs: "es/slug" o "en/slug").
 */
import { getCollection, render, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Project = CollectionEntry<'projects'>;
export type Bio     = CollectionEntry<'bio'>;

/**
 * Devuelve todos los proyectos del idioma indicado, ordenados por fecha desc.
 * Con glob loader, el ID tiene formato "es/slug" o "en/slug".
 */
export async function getProjectsByLang(lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', ({ id }) => {
    return id.startsWith(`${lang}/`);
  });
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Devuelve solo los proyectos marcados como featured.
 */
export async function getFeaturedProjects(lang: Lang): Promise<Project[]> {
  const all = await getProjectsByLang(lang);
  return all.filter((p) => p.data.featured);
}

/**
 * Devuelve la bio del idioma indicado.
 * El ID con glob loader es simplemente "es" o "en" (sin extensión).
 */
export async function getBio(lang: Lang): Promise<Bio> {
  const all = await getCollection('bio', ({ id }) => id === lang);
  if (!all[0]) throw new Error(`Bio not found for lang: ${lang}`);
  return all[0];
}

/**
 * Extrae el slug limpio de un proyecto (sin el prefijo de idioma).
 * Ejemplo: 'es/mi-sistema-distribuido' → 'mi-sistema-distribuido'
 */
export function getProjectSlug(entry: Project): string {
  return entry.id.replace(/^(es|en)\//, '');
}

/**
 * Renderiza el contenido MDX de un proyecto.
 * Wrapper de la función render() de Astro 5.
 */
export async function renderProject(entry: Project) {
  return render(entry);
}
