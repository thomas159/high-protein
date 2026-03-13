import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/**',
      schema: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        meta: z.object({
          seoMetaDescription: z.string().optional(),
        }),
        description: z.string().optional(),
        blurb: z.string().optional(),
        works: z.string().optional(),
        tips: z.string().optional(),
        use: z.string().optional(),
        whyTitle: z.string().optional(),
        why: z.string().optional(),
        muscleBuildingTip: z.string().optional(),
        dont: z.string().optional(),
        dontTitle: z.string().optional(),
        flavour: z.string().optional(),
        image: z.string().optional(), // Made optional so it doesn't break if a recipe lacks an image
        pintrest: z.string().optional(), // Made optional so it doesn't break if a recipe lacks an image
        categories: z.array(z.string()).default([]), // FIX: Added z.string()
        tags: z.array(z.string()).default([]),
        rating: z.number().optional(),
        reviews: z.number().optional(),
        flavor_profile: z.string().optional(),
        shelf_life: z.string().optional(),
        prepTimeMins: z.number().optional(),
        cookTimeMins: z.number().optional(),
        servings: z.number().optional(),
        
        // Grouped macro object
        macros: z.object({
          calories: z.number().optional(),
          carbs: z.number().optional(),
          protein: z.number().optional(),
          fat: z.number().optional()
        }),
        
        // Array of ingredient objects
        ingredients: z.array(
          z.object({
            item: z.string().optional(),
            amount: z.number().optional(),
            unit: z.string().optional(),
            type: z.string().optional()
          })
        ),
        steps: z.array(z.string()).default([]),
      })
    })
  }
})