import { CATEGORY_SLUGS } from '~/utils/constants'

const enCategorySlugs = CATEGORY_SLUGS.en
const esCategorySlugs = CATEGORY_SLUGS.es
const deCategorySlugs = CATEGORY_SLUGS.de

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

export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path.length > 1 && to.path.endsWith('/') ? to.path.slice(0, -1) : to.path

  // Legacy category routes
  if (path === '/es/categories') {
    return navigateTo({ path: '/es/categorias/todas-las-recetas', query: to.query }, { redirectCode: 301 })
  }
  if (path.startsWith('/es/categories/')) {
    const slug = path.slice('/es/categories/'.length)
    const catKey = resolveCategoryKey(slug)
    return navigateTo({ path: getCanonicalCategoryUrl('es', catKey), query: to.query }, { redirectCode: 301 })
  }

  if (path === '/de/categories') {
    return navigateTo({ path: '/de/kategorien/all-recipes', query: to.query }, { redirectCode: 301 })
  }
  if (path.startsWith('/de/categories/')) {
    const slug = path.slice('/de/categories/'.length)
    const catKey = resolveCategoryKey(slug)
    return navigateTo({ path: getCanonicalCategoryUrl('de', catKey), query: to.query }, { redirectCode: 301 })
  }

  // Deprecated categories
  if (path === '/categories/high-protein' || path === '/categories/vegan' || path === '/high-protein' || path === '/vegan') {
    return navigateTo({ path: '/categories/all-recipes', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/es/categorias/high-protein' || path === '/es/categorias/vegan' || path === '/es/high-protein' || path === '/es/vegan') {
    return navigateTo({ path: '/es/categorias/todas-las-recetas', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/de/kategorien/high-protein' || path === '/de/kategorien/vegan' || path === '/de/high-protein' || path === '/de/vegan') {
    return navigateTo({ path: '/de/kategorien/all-recipes', query: to.query }, { redirectCode: 301 })
  }

  // Legacy recipe index routes
  if (path === '/es/recipes') {
    return navigateTo({ path: '/es/categorias/todas-las-recetas', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/de/recipes') {
    return navigateTo({ path: '/de/kategorien/all-recipes', query: to.query }, { redirectCode: 301 })
  }

  // Legacy collections index routes
  if (path === '/es/collections') {
    return navigateTo({ path: '/es/colecciones', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/de/collections') {
    return navigateTo({ path: '/de/sammlungen', query: to.query }, { redirectCode: 301 })
  }

  // Unprefixed routes
  if (path === '/recetas') {
    return navigateTo({ path: '/es/categorias/todas-las-recetas', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/rezepte') {
    return navigateTo({ path: '/de/kategorien/all-recipes', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/categorias') {
    return navigateTo({ path: '/es/categorias/todas-las-recetas', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/kategorien') {
    return navigateTo({ path: '/de/kategorien/all-recipes', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/colecciones') {
    return navigateTo({ path: '/es/colecciones', query: to.query }, { redirectCode: 301 })
  }
  if (path === '/sammlungen') {
    return navigateTo({ path: '/de/sammlungen', query: to.query }, { redirectCode: 301 })
  }

  // Legacy /es/recipes/:slug -> redirect to /es/recetas/:slug
  if (path.startsWith('/es/recipes/')) {
    const slug = path.slice('/es/recipes/'.length)
    try {
      const otherLocaleRecipe = await queryCollection('recipes').where('slug', '=', slug).first()
      if (otherLocaleRecipe?.image) {
        const allMatching = await queryCollection('recipes').where('image', '=', otherLocaleRecipe.image).all()
        const targetSibling = allMatching.find((s: any) => s.path.endsWith('.es'))
        if (targetSibling?.slug) {
          return navigateTo({ path: `/es/recetas/${targetSibling.slug}`, query: to.query }, { redirectCode: 301 })
        }
      }
    } catch (_) {}
    return navigateTo({ path: `/es/recetas/${slug}`, query: to.query }, { redirectCode: 301 })
  }

  // Legacy /de/recipes/:slug -> redirect to /de/rezepte/:slug
  if (path.startsWith('/de/recipes/')) {
    const slug = path.slice('/de/recipes/'.length)
    try {
      const otherLocaleRecipe = await queryCollection('recipes').where('slug', '=', slug).first()
      if (otherLocaleRecipe?.image) {
        const allMatching = await queryCollection('recipes').where('image', '=', otherLocaleRecipe.image).all()
        const targetSibling = allMatching.find((s: any) => s.path.endsWith('.de'))
        if (targetSibling?.slug) {
          return navigateTo({ path: `/de/rezepte/${targetSibling.slug}`, query: to.query }, { redirectCode: 301 })
        }
      }
    } catch (_) {}
    return navigateTo({ path: `/de/rezepte/${slug}`, query: to.query }, { redirectCode: 301 })
  }

  // Legacy /es/collections/:slug -> redirect to /es/colecciones/:slug
  if (path.startsWith('/es/collections/')) {
    const slug = path.slice('/es/collections/'.length)
    try {
      const otherLocaleCol = await queryCollection('collections').where('slug', '=', slug).first()
      if (otherLocaleCol?.image) {
        const allMatching = await queryCollection('collections').where('image', '=', otherLocaleCol.image).all()
        const targetSibling = allMatching.find((s: any) => s.path.endsWith('.es'))
        if (targetSibling?.slug) {
          return navigateTo({ path: `/es/colecciones/${targetSibling.slug}`, query: to.query }, { redirectCode: 301 })
        }
      }
    } catch (_) {}
    return navigateTo({ path: `/es/colecciones/${slug}`, query: to.query }, { redirectCode: 301 })
  }

  // Legacy /de/collections/:slug -> redirect to /de/sammlungen/:slug
  if (path.startsWith('/de/collections/')) {
    const slug = path.slice('/de/collections/'.length)
    try {
      const otherLocaleCol = await queryCollection('collections').where('slug', '=', slug).first()
      if (otherLocaleCol?.image) {
        const allMatching = await queryCollection('collections').where('image', '=', otherLocaleCol.image).all()
        const targetSibling = allMatching.find((s: any) => s.path.endsWith('.de'))
        if (targetSibling?.slug) {
          return navigateTo({ path: `/de/sammlungen/${targetSibling.slug}`, query: to.query }, { redirectCode: 301 })
        }
      }
    } catch (_) {}
    return navigateTo({ path: `/de/sammlungen/${slug}`, query: to.query }, { redirectCode: 301 })
  }
})
