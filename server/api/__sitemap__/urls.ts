// server/api/__sitemap__/urls.ts
import { defineSitemapEventHandler } from '#imports'
import { RECIPE_CATEGORIES } from '~/utils/constants'
// @ts-ignore
import enLocales from '~~/i18n/locales/en.json'
// @ts-ignore
import esLocales from '~~/i18n/locales/es.json'

export default defineSitemapEventHandler(async (event) => { 
  try {
    // 1. Fetch recipes from Nuxt Content
    const recipes = await queryCollection(event, 'recipes').all()
    
    // 2. Map recipes to localized sitemap URLs
    const recipeUrls = recipes.map(recipe => {
      const isSpanish = recipe.path.endsWith('.es')
      // Remove /recipes/ prefix and .es suffix if present
      const slug = recipe.path.replace('/recipes/', '').replace('.es', '')
      
      const loc = isSpanish ? `/es/recetas/${slug}` : `/recipes/${slug}`
      
      return {
        loc,
        lastmod: recipe.updatedAt,
        priority: 0.8
      }
    })

    // 3. Map categories to localized sitemap URLs
    const categoryUrls: any[] = []
    const enCategorySlugs = enLocales.categorySlugs as Record<string, string>
    const esCategorySlugs = esLocales.categorySlugs as Record<string, string>

    // Get all unique keys from both locale files
    const allCategoryKeys = new Set([
      ...Object.keys(enCategorySlugs),
      ...Object.keys(esCategorySlugs)
    ])

    for (const key of allCategoryKeys) {
      // English category URL
      const enSlug = enCategorySlugs[key]
      if (enSlug) {
        categoryUrls.push({ loc: `/categories/${enSlug}`, priority: 0.7 })
      }
      
      // Spanish category URL
      const esSlug = esCategorySlugs[key]
      if (esSlug) {
        categoryUrls.push({ loc: `/es/categorias/${esSlug}`, priority: 0.7 })
      }
    }


    // 4. Fetch and map collections to localized sitemap URLs
    const collections = await queryCollection(event, 'collections').all()
    const collectionUrls = collections.map(coll => {
      const isSpanish = coll.path.endsWith('.es')
      // Remove /collections/ prefix and .es suffix if present
      const slug = coll.path.replace('/collections/', '').replace('.es', '')
      
      const loc = isSpanish ? `/es/colecciones/${slug}` : `/collections/${slug}`
      
      return {
        loc,
        lastmod: coll.updatedAt,
        priority: 0.6
      }
    })

    // 5. Hardcoded static pages (localized)
    const staticPages = [
      { en: '/', es: '/es', priority: 1.0 },
      { en: '/about', es: '/es/sobre-nosotros', priority: 0.5 },
      { en: '/contact', es: '/es/contacto', priority: 0.5 },
      { en: '/privacy-policy', es: '/es/politica-de-privacidad', priority: 0.3 },
      { en: '/terms-of-service', es: '/es/terminos-de-servicio', priority: 0.3 }
    ]
    
    const staticUrls: any[] = []
    for (const page of staticPages) {
       staticUrls.push({ loc: page.en, priority: page.priority })
       staticUrls.push({ loc: page.es, priority: page.priority })
    }

    // Merge and return all discoverable URLs
    return [...staticUrls, ...recipeUrls, ...categoryUrls, ...collectionUrls]

  } catch (e) {
    console.error('Sitemap handler error:', e)
    return []
  }
})