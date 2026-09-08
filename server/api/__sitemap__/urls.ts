// server/api/__sitemap__/urls.ts
import { defineEventHandler } from 'h3'
// @ts-ignore
import enLocales from '~~/i18n/locales/en.json'
// @ts-ignore
import esLocales from '~~/i18n/locales/es.json'
// @ts-ignore
import deLocales from '~~/i18n/locales/de.json'

export default defineEventHandler(async (event) => { 
  try {
    // 1. Fetch recipes from Nuxt Content
    const recipes = await queryCollection(event, 'recipes').all()
    
    // 2. Map recipes to localized sitemap URLs
    const recipeUrls = recipes.map(recipe => {
      const isSpanish = recipe.path.endsWith('.es')
      const isGerman = recipe.path.endsWith('.de')
      // Remove /recipes/ prefix and suffix if present
      const slug = recipe.path.replace('/recipes/', '').replace('.es', '').replace('.de', '')
      
      const loc = isSpanish ? `/es/recetas/${slug}` : isGerman ? `/de/rezepte/${slug}` : `/recipes/${slug}`
      
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
    const deCategorySlugs = deLocales.categorySlugs as Record<string, string>

    // Get all unique keys from both locale files
    const allCategoryKeys = new Set([
      ...Object.keys(enCategorySlugs),
      ...Object.keys(esCategorySlugs),
      ...Object.keys(deCategorySlugs)
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

      // German category URL
      const deSlug = deCategorySlugs[key]
      if (deSlug) {
        categoryUrls.push({ loc: `/de/kategorien/${deSlug}`, priority: 0.7 })
      }
    }


    // 4. Fetch and map collections to localized sitemap URLs
    const collections = await queryCollection(event, 'collections').all()
    const collectionUrls = collections.map(coll => {
      const isSpanish = coll.path.endsWith('.es')
      const isGerman = coll.path.endsWith('.de')
      // Remove /collections/ prefix and suffix if present
      const slug = coll.path.replace('/collections/', '').replace('.es', '').replace('.de', '')
      
      const loc = isSpanish ? `/es/colecciones/${slug}` : isGerman ? `/de/sammlungen/${slug}` : `/collections/${slug}`
      
      return {
        loc,
        lastmod: coll.updatedAt,
        priority: 0.6
      }
    })

    // 5. Hardcoded static pages (localized)
    const staticPages = [
      { en: '/', es: '/es', de: '/de', priority: 1.0 },
      { en: '/about', es: '/es/sobre-nosotros', de: '/de/ueber-uns', priority: 0.5 },
      { en: '/contact', es: '/es/contacto', de: '/de/kontakt', priority: 0.5 }
    ]
    
    const staticUrls: any[] = []
    for (const page of staticPages) {
       staticUrls.push({ loc: page.en, priority: page.priority })
       staticUrls.push({ loc: page.es, priority: page.priority })
       staticUrls.push({ loc: page.de, priority: page.priority })
    }

    // Merge and return all discoverable URLs
    return [...staticUrls, ...recipeUrls, ...categoryUrls, ...collectionUrls]

  } catch (e) {
    console.error('Sitemap handler error:', e)
    return []
  }
})