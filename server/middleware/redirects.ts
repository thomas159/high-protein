import { defineEventHandler, sendRedirect } from 'h3'
import enLocales from '~~/i18n/locales/en.json'
import esLocales from '~~/i18n/locales/es.json'
import deLocales from '~~/i18n/locales/de.json'

declare const queryCollection: (event: any, collection: string) => any

interface ContentItem {
  path: string
  slug?: string
  title?: string
  image?: string
}

interface GroupEntry {
  en?: string
  es?: string
  de?: string
}

let cachedRecipeGroups: Map<string, GroupEntry> | null = null
let cachedRecipeSlugToGroup: Map<string, string> | null = null
let cachedCollectionGroups: Map<string, GroupEntry> | null = null
let cachedCollectionSlugToGroup: Map<string, string> | null = null
let lastLoaded = 0
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

async function loadContentCache(event: any) {
  const now = Date.now()
  if (cachedRecipeGroups && cachedCollectionGroups && now - lastLoaded < CACHE_TTL) {
    return
  }

  try {
    const recipes = (await queryCollection(event, 'recipes').all()) as unknown as ContentItem[]
    const rGroups = new Map<string, GroupEntry>()
    const rSlugToGroup = new Map<string, string>()

    for (const recipe of recipes) {
      const isSpanish = recipe.path.endsWith('.es')
      const isGerman = recipe.path.endsWith('.de')
      const lang: 'en' | 'es' | 'de' = isSpanish ? 'es' : isGerman ? 'de' : 'en'
      const slug = (recipe.slug || recipe.path.replace('/recipes/', '').replace(/\.(es|de)$/, '')).trim()
      const groupKey = recipe.image || slug

      if (!rGroups.has(groupKey)) {
        rGroups.set(groupKey, {})
      }
      rGroups.get(groupKey)![lang] = slug
      rSlugToGroup.set(slug, groupKey)
    }

    cachedRecipeGroups = rGroups
    cachedRecipeSlugToGroup = rSlugToGroup

    const collections = (await queryCollection(event, 'collections').all()) as unknown as ContentItem[]
    const cGroups = new Map<string, GroupEntry>()
    const cSlugToGroup = new Map<string, string>()

    for (const coll of collections) {
      const isSpanish = coll.path.endsWith('.es')
      const isGerman = coll.path.endsWith('.de')
      const lang: 'en' | 'es' | 'de' = isSpanish ? 'es' : isGerman ? 'de' : 'en'
      const slug = (coll.slug || coll.path.replace('/collections/', '').replace(/\.(es|de)$/, '')).trim()
      const groupKey = coll.image || slug

      if (!cGroups.has(groupKey)) {
        cGroups.set(groupKey, {})
      }
      cGroups.get(groupKey)![lang] = slug
      cSlugToGroup.set(slug, groupKey)
    }

    cachedCollectionGroups = cGroups
    cachedCollectionSlugToGroup = cSlugToGroup
    lastLoaded = now
  } catch (err) {
    console.error('[redirects middleware] Failed to load collections for redirect cache:', err)
  }
}

const enCategorySlugs = (enLocales.categorySlugs || {}) as Record<string, string>
const esCategorySlugs = (esLocales.categorySlugs || {}) as Record<string, string>
const deCategorySlugs = (deLocales.categorySlugs || {}) as Record<string, string>

function resolveCategoryKey(slug: string): string {
  const s = slug.toLowerCase().trim()
  if (s === 'high-protein' || s === 'vegan' || s === 'all-recipes' || s === 'todas-las-recetas') {
    return 'allrecipes'
  }
  for (const [key, val] of Object.entries(esCategorySlugs)) {
    if (val === s) return key
  }
  for (const [key, val] of Object.entries(enCategorySlugs)) {
    if (val === s) return key
  }
  for (const [key, val] of Object.entries(deCategorySlugs)) {
    if (val === s) return key
  }
  return 'allrecipes'
}

function getCanonicalCategoryUrl(targetLang: 'en' | 'es' | 'de', categoryKey: string): string {
  if (targetLang === 'es') {
    const slug = esCategorySlugs[categoryKey] || 'todas-las-recetas'
    return `/es/categorias/${slug}`
  }
  if (targetLang === 'de') {
    const slug = deCategorySlugs[categoryKey] || 'all-recipes'
    return `/de/kategorien/${slug}`
  }
  const slug = enCategorySlugs[categoryKey] || 'all-recipes'
  return `/categories/${slug}`
}

function resolveRecipeTarget(targetLang: 'en' | 'es' | 'de', slug: string): string {
  const cleanSlug = slug.trim()
  const groupKey = cachedRecipeSlugToGroup?.get(cleanSlug)
  if (groupKey && cachedRecipeGroups?.has(groupKey)) {
    const group = cachedRecipeGroups.get(groupKey)!
    if (targetLang === 'es') {
      if (group.es) return `/es/recetas/${group.es}`
      if (group.en) return `/recipes/${group.en}`
    } else if (targetLang === 'de') {
      if (group.de) return `/de/rezepte/${group.de}`
      if (group.en) return `/recipes/${group.en}`
    } else {
      if (group.en) return `/recipes/${group.en}`
    }
  }

  if (targetLang === 'es') return `/es/recetas/${cleanSlug}`
  if (targetLang === 'de') return `/de/rezepte/${cleanSlug}`
  return `/recipes/${cleanSlug}`
}

function resolveCollectionTarget(targetLang: 'en' | 'es' | 'de', slug: string): string {
  const cleanSlug = slug.trim()
  const groupKey = cachedCollectionSlugToGroup?.get(cleanSlug)
  if (groupKey && cachedCollectionGroups?.has(groupKey)) {
    const group = cachedCollectionGroups.get(groupKey)!
    if (targetLang === 'es') {
      if (group.es) return `/es/colecciones/${group.es}`
      if (group.en) return `/collections/${group.en}`
    } else if (targetLang === 'de') {
      if (group.de) return `/de/sammlungen/${group.de}`
      if (group.en) return `/collections/${group.en}`
    } else {
      if (group.en) return `/collections/${group.en}`
    }
  }

  if (targetLang === 'es') return `/es/colecciones/${cleanSlug}`
  if (targetLang === 'de') return `/de/sammlungen/${cleanSlug}`
  return `/collections/${cleanSlug}`
}

export default defineEventHandler(async (event) => {
  const rawUrl = event.node.req.url || '/'
  const pathnameAndHash = rawUrl.split('?')[0] || '/'
  const queryString = rawUrl.split('?')[1]
  const pathname = pathnameAndHash.split('#')[0] || '/'
  const query = queryString ? `?${queryString}` : ''

  // Fast bail out for assets, APIs, and Nuxt internals
  if (
    pathname.startsWith('/_nuxt') ||
    pathname.startsWith('/__') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|json|xml|txt|map)$/i.test(pathname)
  ) {
    return
  }

  // Remove trailing slashes (except root '/')
  const cleanPath: string = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  // Quick check: Does this path possibly require redirection?
  const needsCheck =
    /^\/(es|de)\/(recipes|categories|collections)(\/.*)?$/.test(cleanPath) ||
    /^\/(recetas|rezepte|categorias|kategorien|colecciones|sammlungen)(\/.*)?$/.test(cleanPath) ||
    /^\/categories\/(high-protein|vegan)(\/.*)?$/.test(cleanPath) ||
    /^\/(es|de)\/categorias\/(high-protein|vegan)(\/.*)?$/.test(cleanPath) ||
    /^\/(es|de)\/kategorien\/(high-protein|vegan)(\/.*)?$/.test(cleanPath) ||
    /^\/(high-protein|vegan)$/.test(cleanPath) ||
    /^\/(es|de)\/(high-protein|vegan)$/.test(cleanPath) ||
    /^\/(es|de)\/(recetas|rezepte|categorias|kategorien|colecciones|sammlungen)\/.+$/.test(cleanPath) ||
    /^\/(recipes|categories|collections)\/.+$/.test(cleanPath)

  if (!needsCheck) {
    return
  }

  // Ensure content mapping cache is loaded
  await loadContentCache(event)

  let targetUrl: string | null = null

  // 1. Spanish legacy prefixes: /es/recipes, /es/categories, /es/collections
  if (cleanPath === '/es/recipes') {
    targetUrl = '/es/categorias/todas-las-recetas'
  } else if (cleanPath.startsWith('/es/recipes/')) {
    const slug = cleanPath.slice('/es/recipes/'.length)
    targetUrl = resolveRecipeTarget('es', slug)
  } else if (cleanPath === '/es/categories') {
    targetUrl = '/es/categorias/todas-las-recetas'
  } else if (cleanPath.startsWith('/es/categories/')) {
    const slug = cleanPath.slice('/es/categories/'.length)
    targetUrl = getCanonicalCategoryUrl('es', resolveCategoryKey(slug))
  } else if (cleanPath === '/es/collections') {
    targetUrl = '/es/colecciones'
  } else if (cleanPath.startsWith('/es/collections/')) {
    const slug = cleanPath.slice('/es/collections/'.length)
    targetUrl = resolveCollectionTarget('es', slug)
  }

  // 2. German legacy prefixes: /de/recipes, /de/categories, /de/collections
  else if (cleanPath === '/de/recipes') {
    targetUrl = '/de/kategorien/all-recipes'
  } else if (cleanPath.startsWith('/de/recipes/')) {
    const slug = cleanPath.slice('/de/recipes/'.length)
    targetUrl = resolveRecipeTarget('de', slug)
  } else if (cleanPath === '/de/categories') {
    targetUrl = '/de/kategorien/all-recipes'
  } else if (cleanPath.startsWith('/de/categories/')) {
    const slug = cleanPath.slice('/de/categories/'.length)
    targetUrl = getCanonicalCategoryUrl('de', resolveCategoryKey(slug))
  } else if (cleanPath === '/de/collections') {
    targetUrl = '/de/sammlungen'
  } else if (cleanPath.startsWith('/de/collections/')) {
    const slug = cleanPath.slice('/de/collections/'.length)
    targetUrl = resolveCollectionTarget('de', slug)
  }

  // 3. Unprefixed Spanish routes (/recetas, /categorias, /colecciones)
  else if (cleanPath === '/recetas') {
    targetUrl = '/es/categorias/todas-las-recetas'
  } else if (cleanPath.startsWith('/recetas/')) {
    const slug = cleanPath.slice('/recetas/'.length)
    targetUrl = resolveRecipeTarget('es', slug)
  } else if (cleanPath === '/categorias') {
    targetUrl = '/es/categorias/todas-las-recetas'
  } else if (cleanPath.startsWith('/categorias/')) {
    const slug = cleanPath.slice('/categorias/'.length)
    targetUrl = getCanonicalCategoryUrl('es', resolveCategoryKey(slug))
  } else if (cleanPath === '/colecciones') {
    targetUrl = '/es/colecciones'
  } else if (cleanPath.startsWith('/colecciones/')) {
    const slug = cleanPath.slice('/colecciones/'.length)
    targetUrl = resolveCollectionTarget('es', slug)
  }

  // 4. Unprefixed German routes (/rezepte, /kategorien, /sammlungen)
  else if (cleanPath === '/rezepte') {
    targetUrl = '/de/kategorien/all-recipes'
  } else if (cleanPath.startsWith('/rezepte/')) {
    const slug = cleanPath.slice('/rezepte/'.length)
    targetUrl = resolveRecipeTarget('de', slug)
  } else if (cleanPath === '/kategorien') {
    targetUrl = '/de/kategorien/all-recipes'
  } else if (cleanPath.startsWith('/kategorien/')) {
    const slug = cleanPath.slice('/kategorien/'.length)
    targetUrl = getCanonicalCategoryUrl('de', resolveCategoryKey(slug))
  } else if (cleanPath === '/sammlungen') {
    targetUrl = '/de/sammlungen'
  } else if (cleanPath.startsWith('/sammlungen/')) {
    const slug = cleanPath.slice('/sammlungen/'.length)
    targetUrl = resolveCollectionTarget('de', slug)
  }

  // 5. Deprecated / top-level aliases: high-protein & vegan
  else if (cleanPath === '/high-protein' || cleanPath === '/vegan' || cleanPath === '/categories/high-protein' || cleanPath === '/categories/vegan') {
    targetUrl = '/categories/all-recipes'
  } else if (cleanPath === '/es/high-protein' || cleanPath === '/es/vegan' || cleanPath === '/es/categorias/high-protein' || cleanPath === '/es/categorias/vegan') {
    targetUrl = '/es/categorias/todas-las-recetas'
  } else if (cleanPath === '/de/high-protein' || cleanPath === '/de/vegan' || cleanPath === '/de/kategorien/high-protein' || cleanPath === '/de/kategorien/vegan') {
    targetUrl = '/de/kategorien/all-recipes'
  }

  // 6. Cross-language slugs under valid prefixes:
  // Spanish recipes
  else if (cleanPath.startsWith('/es/recetas/')) {
    const slug = cleanPath.slice('/es/recetas/'.length)
    const expected = resolveRecipeTarget('es', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // German recipes
  else if (cleanPath.startsWith('/de/rezepte/')) {
    const slug = cleanPath.slice('/de/rezepte/'.length)
    const expected = resolveRecipeTarget('de', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // English recipes
  else if (cleanPath.startsWith('/recipes/')) {
    const slug = cleanPath.slice('/recipes/'.length)
    const expected = resolveRecipeTarget('en', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // Spanish categories (e.g. /es/categorias/15-minute-meals or /es/categorias/dinner)
  else if (cleanPath.startsWith('/es/categorias/')) {
    const slug = cleanPath.slice('/es/categorias/'.length)
    const catKey = resolveCategoryKey(slug)
    const expected = getCanonicalCategoryUrl('es', catKey)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // German categories (e.g. /de/kategorien/cena)
  else if (cleanPath.startsWith('/de/kategorien/')) {
    const slug = cleanPath.slice('/de/kategorien/'.length)
    const catKey = resolveCategoryKey(slug)
    const expected = getCanonicalCategoryUrl('de', catKey)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // English categories
  else if (cleanPath.startsWith('/categories/')) {
    const slug = cleanPath.slice('/categories/'.length)
    const catKey = resolveCategoryKey(slug)
    const expected = getCanonicalCategoryUrl('en', catKey)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // Spanish collections
  else if (cleanPath.startsWith('/es/colecciones/')) {
    const slug = cleanPath.slice('/es/colecciones/'.length)
    const expected = resolveCollectionTarget('es', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // German collections
  else if (cleanPath.startsWith('/de/sammlungen/')) {
    const slug = cleanPath.slice('/de/sammlungen/'.length)
    const expected = resolveCollectionTarget('de', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }
  // English collections
  else if (cleanPath.startsWith('/collections/')) {
    const slug = cleanPath.slice('/collections/'.length)
    const expected = resolveCollectionTarget('en', slug)
    if (expected !== cleanPath) {
      targetUrl = expected
    }
  }

  // Execute 301 redirect if target differs from current path
  if (targetUrl && targetUrl !== cleanPath) {
    return sendRedirect(event, `${targetUrl}${query}`, 301)
  }
})
