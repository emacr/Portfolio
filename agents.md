# Especificaciones Técnicas: Portfolio Arquitecto Senior

## Propósito de la Aplicación
Exhibir una trayectoria profesional senior mediante un sitio estático (SSG) que destaque no solo el resultado final, sino el proceso de ingeniería y toma de decisiones técnicas.

## Stack y Versiones Recomendadas
- **Astro:** ^4.x (Modo Estático)
- **Tailwind CSS:** ^3.x
- **TypeScript:** v5.x (Strict Mode)
- **Zod:** v3.x (Para Content Collections)

## Estructura del Proyecto
[cite_start]Debe respetarse estrictamente la siguiente jerarquía para mantener la "Clean Architecture"[cite: 10, 12]:

src/
├── assets/          # Imágenes de proyectos (webp), logos y CVs (PDF).
├── components/
│   ├── layout/      # Navbar.astro, Footer.astro, BaseHead.astro.
│   ├── ui/          # Botones, Toggles de tema, Badges (Atomic Design).
│   ├── projects/    # ProjectCard.astro, CaseStudyDetail.astro.
│   └── shared/      # Hero.astro, SkillsGrid.astro, ContactForm.astro.
[cite_start]├── content/         # Base de datos estática.
│   ├── config.ts    # Definición de esquemas Zod (Proyectos y Bio).
│   ├── projects/    # Subcarpetas /es/ y /en/ con archivos .mdx.
│   └── bio/         # Archivos .mdx para información personal por idioma.
├── layouts/         # MainLayout.astro (Estructura base HTML5).
├── pages/           # Rutas dinámicas: [lang]/index.astro y [lang]/projects/[slug].astro.
├── utils/           # Lógica de traducción e i18n helpers.
└── styles/          # global.css (Tailwind Directives).

## Convenciones de Código
- **Componentes:** Usar componentes de Astro (.astro) por defecto. Solo usar componentes de Frameworks (React/Vue) si hay interactividad compleja.
- **i18n:** No hardcodear textos. Usar un objeto de constantes para etiquetas de UI estáticas en `src/utils/`.
- **Tipado:** Definir Interfaces para cada componente que reciba Props.

## Reglas de Arquitectura
1. [cite_start]**Validación:** Cada entrada de proyecto en Markdown DEBE ser validada contra el esquema Zod (title, description, image, stack, links) [cite: 24-32].
2. **Imágenes:** Usar el componente `<Image />` de Astro para garantizar la generación de diferentes tamaños y formatos optimizados.
3. **Temas:** Aplicar la clase `.dark` al elemento `html`. El script de detección debe estar en el `<head>` para evitar el FOUC (Flash of Unstyled Content).

## Buenas Prácticas UI/UX
- **Minimalismo:** Espaciado generoso (whitespace), tipografía legible y paleta de colores sobria.
- **Feedback:** El formulario de contacto debe mostrar estados de "Enviando...", "Éxito" o "Error" de forma clara.

## Comandos y CI/CD
- Desarrollo: `npm run dev`
- Build: `npm run build` (Debe ejecutar `astro check` antes de finalizar).
- Deploy: Configurar GitHub Action para disparar el build en cada push a `main` y desplegar en la rama `gh-pages`.

## Decisiones Críticas
- **No Domain:** El agente debe configurar el `site` en `astro.config.mjs` usando la URL base de GitHub Pages.
- **Static Content:** Toda la información del usuario debe extraerse de `src/content/`, facilitando la actualización sin tocar código.