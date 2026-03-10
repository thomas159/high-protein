// server/api/sitemap-urls.ts
import { defineSitemapEventHandler } from '#imports'
import { RECIPE_CATEGORIES } from '~/utils/constants'
export default defineSitemapEventHandler(async (event) => { 
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
   const categoryUrls = RECIPE_CATEGORIES.map(cat => ({ loc: cat.link }))

    // 4. Merge and return both
    return [...recipeUrls, ...categoryUrls]

  } catch (e) {
    console.error('Sitemap handler error:', e)
    return []
  }
})