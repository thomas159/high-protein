import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/**',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        image: z.string().optional(), // Made optional so it doesn't break if a recipe lacks an image
        pintrest: z.string().optional(), // Made optional so it doesn't break if a recipe lacks an image
        categories: z.array(z.string()).default([]), // FIX: Added z.string()
        tags: z.array(z.string()).default([]),
        tips: z.string(),
        rating: z.number(),
        reviews: z.number(),
        prepTimeMins: z.number(),
        cookTimeMins: z.number(),
        servings: z.number(),
        
        // Grouped macro object
        macros: z.object({
          calories: z.number(),
          carbs: z.number(),
          protein: z.number(),
          fat: z.number()
        }),
        
        // Array of ingredient objects
        ingredients: z.array(
          z.object({
            item: z.string(),
            amount: z.number(),
            unit: z.string(),
            type: z.string()
          })
        )
      })
    })
  }
})