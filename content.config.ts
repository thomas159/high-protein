import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/**',
      // Define the schema here
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string() // This "unlocks" the image field in your queries
      })
    })
  }
})