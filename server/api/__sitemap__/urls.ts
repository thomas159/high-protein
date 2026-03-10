// server/api/sitemap-urls.ts
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => { // <--- Added 'event' here
  const categories = [
    { name: 'High Protein', link: '/categories/high-protein' },
    { name: 'Vegan', link: '/categories/vegan' },
    { name: 'Dessert', link: '/categories/dessert' },
    { name: 'Dinner', link: '/categories/dinner'},
    { name: '15 Minute meals', link: '/categories/15-minute-meals' },
    { name: 'Air fryer', link: '/categories/air-fryer' }
  ]

  try {
    // 1. Fetch recipes from Nuxt Content
    const recipes = await queryCollection(event, 'recipes').all()
    
    // 2. Map recipes to sitemap format
    const recipeUrls = recipes.map(recipe => ({
      loc: recipe.path,
      lastmod: recipe.updatedAt,
      priority: 0.8
    }))

    // 3. Map categories to sitemap format
    const categoryUrls = categories.map(cat => ({
      loc: cat.link,
      priority: 0.6, // Slightly lower priority than main recipes
      changefreq: 'weekly'
    }))

    // 4. Merge and return both
    return [...recipeUrls, ...categoryUrls]

  } catch (e) {
    console.error('Sitemap handler error:', e)
    return []
  }
})