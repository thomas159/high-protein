// server/api/__sitemap__/urls.ts
import { defineEventHandler } from 'h3'
import enLocales from '~~/i18n/locales/en.json'
import esLocales from '~~/i18n/locales/es.json'
import deLocales from '~~/i18n/locales/de.json'

interface ContentItem {
  path: string
  slug?: string
  title?: string
  image?: string
  updatedAt?: string | Date
}

interface SitemapAlternative {
  hreflang: string
  href: string
}

interface SitemapImage {
  loc: string
  title?: string
}

interface SitemapUrlEntry {
  loc: string
  lastmod?: string | Date
  priority?: number
  alternatives?: SitemapAlternative[]
  images?: SitemapImage[]
}

export default defineEventHandler(async (event) => { 
  try {
    const baseImg = 'https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto'

    // 1. Fetch recipes from Nuxt Content
    const recipes = (await queryCollection(event, 'recipes').all()) as unknown as ContentItem[]
    
    // Helper to extract clean slug, language, and localized path for recipes
    const getRecipeMeta = (recipe: ContentItem) => {
      const isSpanish = recipe.path.endsWith('.es')
      const isGerman = recipe.path.endsWith('.de')
      const lang = isSpanish ? 'es' : isGerman ? 'de' : 'en'
      const slug = (recipe.slug || recipe.path.replace('/recipes/', '').replace(/\.(es|de)$/, '')).trim()
      const loc = isSpanish ? `/es/recetas/${slug}` : isGerman ? `/de/rezepte/${slug}` : `/recipes/${slug}`
      return { lang, slug, loc }
    }

    // Build multilingual groups mapped by recipe image (or slug fallback)
    const recipeGroups = new Map<string, { en?: { loc: string; slug: string }; es?: { loc: string; slug: string }; de?: { loc: string; slug: string } }>()
    for (const recipe of recipes) {
      const meta = getRecipeMeta(recipe)
      const groupKey = recipe.image || meta.slug
      if (!recipeGroups.has(groupKey)) {
        recipeGroups.set(groupKey, {})
      }
      recipeGroups.get(groupKey)![meta.lang as 'en' | 'es' | 'de'] = { loc: meta.loc, slug: meta.slug }
    }

    // 2. Map recipes to localized sitemap URLs with alternatives & image metadata
    const recipeUrls: SitemapUrlEntry[] = recipes.map(recipe => {
      const meta = getRecipeMeta(recipe)
      const groupKey = recipe.image || meta.slug
      const group = recipeGroups.get(groupKey)

      const alternatives = group ? [
        group.en ? { hreflang: 'en', href: group.en.loc } : null,
        group.es ? { hreflang: 'es', href: group.es.loc } : null,
        group.de ? { hreflang: 'de', href: group.de.loc } : null,
        group.en ? { hreflang: 'x-default', href: group.en.loc } : null,
      ].filter(Boolean) as SitemapAlternative[] : []

      const imageLoc = recipe.image
        ? (recipe.image.startsWith('http') ? recipe.image : `${baseImg}/${recipe.image}.jpg`)
        : undefined

      return {
        loc: meta.loc,
        lastmod: recipe.updatedAt,
        priority: 0.8,
        alternatives: alternatives.length > 1 ? alternatives : undefined,
        images: imageLoc ? [{
          loc: imageLoc,
          title: recipe.title || undefined,
        }] : undefined,
      }
    })

    // 3. Map categories to localized sitemap URLs with alternatives
    const categoryUrls: SitemapUrlEntry[] = []
    const enCategorySlugs = enLocales.categorySlugs as Record<string, string>
    const esCategorySlugs = esLocales.categorySlugs as Record<string, string>
    const deCategorySlugs = deLocales.categorySlugs as Record<string, string>

    const allCategoryKeys = new Set([
      ...Object.keys(enCategorySlugs),
      ...Object.keys(esCategorySlugs),
      ...Object.keys(deCategorySlugs)
    ])

    for (const key of allCategoryKeys) {
      const enSlug = enCategorySlugs[key]
      const esSlug = esCategorySlugs[key]
      const deSlug = deCategorySlugs[key]

      const enLoc = enSlug ? `/categories/${enSlug}` : null
      const esLoc = esSlug ? `/es/categorias/${esSlug}` : null
      const deLoc = deSlug ? `/de/kategorien/${deSlug}` : null

      const alternatives = [
        enLoc ? { hreflang: 'en', href: enLoc } : null,
        esLoc ? { hreflang: 'es', href: esLoc } : null,
        deLoc ? { hreflang: 'de', href: deLoc } : null,
        enLoc ? { hreflang: 'x-default', href: enLoc } : null,
      ].filter(Boolean) as SitemapAlternative[]

      if (enLoc) categoryUrls.push({ loc: enLoc, priority: 0.7, alternatives: alternatives.length > 1 ? alternatives : undefined })
      if (esLoc) categoryUrls.push({ loc: esLoc, priority: 0.7, alternatives: alternatives.length > 1 ? alternatives : undefined })
      if (deLoc) categoryUrls.push({ loc: deLoc, priority: 0.7, alternatives: alternatives.length > 1 ? alternatives : undefined })
    }

    // 4. Fetch and map collections to localized sitemap URLs with alternatives & images
    const collections = (await queryCollection(event, 'collections').all()) as unknown as ContentItem[]

    const getCollectionMeta = (coll: ContentItem) => {
      const isSpanish = coll.path.endsWith('.es')
      const isGerman = coll.path.endsWith('.de')
      const lang = isSpanish ? 'es' : isGerman ? 'de' : 'en'
      const slug = (coll.slug || coll.path.replace('/collections/', '').replace(/\.(es|de)$/, '')).trim()
      const loc = isSpanish ? `/es/colecciones/${slug}` : isGerman ? `/de/sammlungen/${slug}` : `/collections/${slug}`
      return { lang, slug, loc }
    }

    const collectionGroups = new Map<string, { en?: { loc: string; slug: string }; es?: { loc: string; slug: string }; de?: { loc: string; slug: string } }>()
    for (const coll of collections) {
      const meta = getCollectionMeta(coll)
      const groupKey = coll.image || meta.slug
      if (!collectionGroups.has(groupKey)) {
        collectionGroups.set(groupKey, {})
      }
      collectionGroups.get(groupKey)![meta.lang as 'en' | 'es' | 'de'] = { loc: meta.loc, slug: meta.slug }
    }

    const collectionUrls: SitemapUrlEntry[] = collections.map(coll => {
      const meta = getCollectionMeta(coll)
      const groupKey = coll.image || meta.slug
      const group = collectionGroups.get(groupKey)

      const alternatives = group ? [
        group.en ? { hreflang: 'en', href: group.en.loc } : null,
        group.es ? { hreflang: 'es', href: group.es.loc } : null,
        group.de ? { hreflang: 'de', href: group.de.loc } : null,
        group.en ? { hreflang: 'x-default', href: group.en.loc } : null,
      ].filter(Boolean) as SitemapAlternative[] : []

      const imageLoc = coll.image
        ? (coll.image.startsWith('http') ? coll.image : `${baseImg}/${coll.image}.jpg`)
        : undefined

      return {
        loc: meta.loc,
        lastmod: coll.updatedAt,
        priority: 0.6,
        alternatives: alternatives.length > 1 ? alternatives : undefined,
        images: imageLoc ? [{
          loc: imageLoc,
          title: coll.title || undefined,
        }] : undefined,
      }
    })

    // 5. Hardcoded static pages (localized with alternatives)
    const staticPages = [
      { en: '/', es: '/es', de: '/de', priority: 1.0 },
      { en: '/collections', es: '/es/colecciones', de: '/de/sammlungen', priority: 0.8 },
      { en: '/about', es: '/es/sobre-nosotros', de: '/de/ueber-uns', priority: 0.5 },
      { en: '/contact', es: '/es/contacto', de: '/de/kontakt', priority: 0.5 }
    ]
    
    const staticUrls: SitemapUrlEntry[] = []
    for (const page of staticPages) {
      const alternatives = [
        { hreflang: 'en', href: page.en },
        { hreflang: 'es', href: page.es },
        { hreflang: 'de', href: page.de },
        { hreflang: 'x-default', href: page.en },
      ]
      staticUrls.push({ loc: page.en, priority: page.priority, alternatives })
      staticUrls.push({ loc: page.es, priority: page.priority, alternatives })
      staticUrls.push({ loc: page.de, priority: page.priority, alternatives })
    }

    // Merge and return all discoverable URLs
    return [...staticUrls, ...recipeUrls, ...categoryUrls, ...collectionUrls]

  } catch (e: unknown) {
    console.error('Sitemap handler error:', e)
    return []
  }
})