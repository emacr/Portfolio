/**
 * src/utils/i18n.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Sistema de internacionalización para etiquetas de UI estáticas.
 * Regla: NUNCA hardcodear texto en los componentes; siempre usar este módulo.
 */

export type Lang = 'es' | 'en';

export const DEFAULT_LANG: Lang = 'es';
export const SUPPORTED_LANGS: Lang[] = ['es', 'en'];

// ─── Catálogo de traducciones ─────────────────────────────────────────────────
const translations = {
  es: {
    // Nav
    'nav.home':       'Inicio',
    'nav.projects':   'Proyectos',
    'nav.contact':    'Contacto',
    'nav.download_cv':'Descargar CV',
    'nav.toggle_dark':'Cambiar tema',

    // Hero
    'hero.greeting':  'Hola, soy',
    'hero.cta_projects': 'Ver Proyectos',
    'hero.cta_contact':  'Contactar',
    'hero.available': 'Disponible para proyectos',

    // Skills
    'skills.title': 'Stack Tecnológico',
    'skills.subtitle': 'Herramientas con las que construyo soluciones robustas',

    // Projects
    'projects.title':    'Proyectos',
    'projects.subtitle': 'Selección de trabajos que evidencian proceso de ingeniería',
    'projects.featured': 'Destacado',
    'projects.view_case':'Ver Case Study →',
    'projects.demo':     'Demo',
    'projects.code':     'Código',
    'projects.back':     '← Volver a Proyectos',
    'projects.stack':    'Stack',
    'projects.architecture': 'Diagrama de Arquitectura',
    'projects.nfr':          'Requerimientos No Funcionales',
    'projects.adrs':         'Decisiones de Arquitectura (ADRs)',
    'projects.adr_context':  'Contexto',
    'projects.adr_decision': 'Decisión',
    'projects.adr_consequences': 'Consecuencias',

    // Contact
    'contact.title':       'Hablemos',
    'contact.subtitle':    'Estoy abierto a nuevas oportunidades y colaboraciones',
    'contact.name':        'Nombre',
    'contact.email':       'Correo electrónico',
    'contact.message':     'Mensaje',
    'contact.send':        'Enviar mensaje',
    'contact.sending':     'Enviando...',
    'contact.success':     '¡Mensaje enviado! Te respondo pronto.',
    'contact.error':       'Error al enviar. Inténtalo de nuevo.',
    'contact.placeholder_name':    'Tu nombre',
    'contact.placeholder_email':   'tu@email.com',
    'contact.placeholder_message': '¿En qué puedo ayudarte?',

    // Footer
    'footer.built_with': 'Construido con',
    'footer.rights':     'Todos los derechos reservados.',

    // Meta
    'meta.title_suffix': '| Portfolio',
    'meta.og_site_name': 'Portfolio de Emacr',

    // Language selector
    'lang.switch': 'Switch to English',
    'lang.current': 'ES',
  },
  en: {
    // Nav
    'nav.home':       'Home',
    'nav.projects':   'Projects',
    'nav.contact':    'Contact',
    'nav.download_cv':'Download CV',
    'nav.toggle_dark':'Toggle theme',

    // Hero
    'hero.greeting':  'Hi, I\'m',
    'hero.cta_projects': 'View Projects',
    'hero.cta_contact':  'Get in touch',
    'hero.available': 'Available for projects',

    // Skills
    'skills.title': 'Tech Stack',
    'skills.subtitle': 'Tools I use to build robust solutions',

    // Projects
    'projects.title':    'Projects',
    'projects.subtitle': 'A selection of work evidencing engineering process',
    'projects.featured': 'Featured',
    'projects.view_case':'View Case Study →',
    'projects.demo':     'Demo',
    'projects.code':     'Code',
    'projects.back':     '← Back to Projects',
    'projects.stack':    'Stack',
    'projects.architecture': 'Architecture Diagram',
    'projects.nfr':          'Non-Functional Requirements',
    'projects.adrs':         'Architecture Decisions (ADRs)',
    'projects.adr_context':  'Context',
    'projects.adr_decision': 'Decision',
    'projects.adr_consequences': 'Consequences',

    // Contact
    'contact.title':       'Let\'s Talk',
    'contact.subtitle':    'Open to new opportunities and collaborations',
    'contact.name':        'Name',
    'contact.email':       'Email address',
    'contact.message':     'Message',
    'contact.send':        'Send message',
    'contact.sending':     'Sending...',
    'contact.success':     'Message sent! I\'ll get back to you soon.',
    'contact.error':       'Send failed. Please try again.',
    'contact.placeholder_name':    'Your name',
    'contact.placeholder_email':   'you@email.com',
    'contact.placeholder_message': 'How can I help you?',

    // Footer
    'footer.built_with': 'Built with',
    'footer.rights':     'All rights reserved.',

    // Meta
    'meta.title_suffix': '| Portfolio',
    'meta.og_site_name': 'Emacr\'s Portfolio',

    // Language selector
    'lang.switch': 'Cambiar a Español',
    'lang.current': 'EN',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

/**
 * Retorna la función t() con las traducciones del idioma dado.
 * Uso: const t = useTranslations('es'); t('nav.home')
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations[DEFAULT_LANG][key] ?? key;
  };
}

const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

/**
 * Extrae el idioma de la URL.
 * Ejemplo: '/es/projects/mi-proyecto' → 'es'
 */
export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname.startsWith(BASE_URL) 
    ? url.pathname.slice(BASE_URL.length) 
    : url.pathname.replace(/^\//, '');

  const [lang] = path.split('/').filter(Boolean);
  if (SUPPORTED_LANGS.includes(lang as Lang)) {
    return lang as Lang;
  }
  return DEFAULT_LANG;
}

/**
 * Devuelve la ruta equivalente en el otro idioma.
 * Ejemplo: '/es/projects/slug' → '/en/projects/slug'
 */
export function getAlternateUrl(url: URL, targetLang: Lang): string {
  const path = url.pathname.startsWith(BASE_URL) 
    ? url.pathname.slice(BASE_URL.length) 
    : url.pathname.replace(/^\//, '');
  
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && SUPPORTED_LANGS.includes(parts[0] as Lang)) {
    parts[0] = targetLang;
    return `${BASE_URL}${parts.join('/')}`;
  }
  return `${BASE_URL}${targetLang}/${path}`;
}
