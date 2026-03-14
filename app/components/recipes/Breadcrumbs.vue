<script setup lang="ts">
import { RECIPE_CATEGORIES } from '~/utils/constants'

// Define the interface locally or import it
export interface Recipe {
  title: string;
  path: string;
  categories: string[];
  // ... other props
}

const props = defineProps<{
  recipe: Recipe;
}>();

const router = useRouter()

// 1. Get the previous path from router state
// router.options.history.state.back gives us the previous URL string
const previousPath = computed(() => {
  const back = router.options.history.state.back
  return typeof back === 'string' ? back : null
})

// 2. Determine the "Back" Label and Link
const backLink = computed(() => {
  const path = previousPath.value

  // If coming from a specific category page
  if (path && path.startsWith('/categories/')) {
    const slug = path.split('/').pop()
    const matched = RECIPE_CATEGORIES.find(c => c.slug === slug)
    return {
      label: matched ? matched.name : 'Back to Category',
      to: path
    }
  }

  // Fallback: If no history or history wasn't a category, 
  // use the recipe's first primary category
  if (props.recipe?.categories?.length) {
    const primarySlug = props.recipe.categories[0]
    const matched = RECIPE_CATEGORIES.find(c => c.slug === primarySlug)
    return {
      label: matched ? matched.name : 'Recipes',
      to: `/categories/${primarySlug}`
    }
  }

  // Final Fallback
  return { label: 'All Recipes', to: '/categories/all-recipes' }
})

const recipeName = computed(() => props.recipe?.title || 'Recipe')
</script>

<template> 
  <nav class="text-sm text-muted-foreground mb-4 flex items-center gap-2">
    <NuxtLink 
      :to="backLink.to" 
      class="hover:text-green-600 dark:hover:text-green-400 transition-colors"
    >
      {{ backLink.label }}
    </NuxtLink>

    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>

    <span class="text-foreground font-medium">{{ recipeName }}</span>
  </nav>
</template>