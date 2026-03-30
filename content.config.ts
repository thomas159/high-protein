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
        }).optional(),
        description: z.string().optional(),
        blurb: z.array(z.string()).default([]),
        works: z.array(z.string()).default([]),
        tipsTitle: z.string().optional(),
        tips: z.array(z.string()).default([]),
        use: z.array(z.string()).default([]),
        whyTitle: z.string().optional(),
        why: z.array(z.string()).default([]),
        muscleBuildingTip: z.string().optional(),
        dont: z.string().optional(),
        dontTitle: z.string().optional(),
        flavour: z.array(z.string()).default([]),
        image: z.string().optional(),
        alt: z.string().optional(),
        pintrest: z.string().optional(),
        categories: z.array(z.string()).default([]),
        variations: z.array(z.string()).default([]),
        servingSuggestions: z.string().optional(),
        storageInstructions: z.string().optional(),
        tags: z.array(z.string()).default([]),
        keywords: z.array(z.string()).default([]),
        rating: z.number().optional(),
        reviews: z.number().optional(),
        flavor_profile: z.string().optional(),
        shelf_life: z.string().optional(),
        cuisine: z.string().optional(),
        prepTimeMins: z.number().optional(),
        cookTimeMins: z.number().optional(),
        servings: z.number().optional(),
        
        macros: z.object({
          calories: z.number().optional(),
          carbs: z.number().optional(),
          protein: z.number().optional(),
          fat: z.number().optional()
        }).optional(),
        
        ingredients: z.array(
          z.object({
            item: z.string().optional(),
            amount: z.union([z.number(), z.string()]).optional(), 
            unit: z.string().optional(),
            type: z.string().optional()
          })
        ).default([]),
        
        steps: z.array(z.string()).default([]),
      })
    })
  }
})