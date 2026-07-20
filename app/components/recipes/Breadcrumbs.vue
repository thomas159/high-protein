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

const { t } = useI18n()
const localePath = useLocalePath()

// 2. Determine the "Back" Label and Link
const backLink = computed(() => {
  const path = previousPath.value
  const categorySlugs = t('categorySlugs', { returnObjects: true })

  // If coming from a specific category page
  if (path && path.includes('/categories/') || (path && path.includes('/categorias/'))) {
    const slug = path.split('/').pop()
    const key = Object.keys(categorySlugs).find(k => categorySlugs[k] === slug)
    const matched = key ? RECIPE_CATEGORIES.find(c => c.key === key) : null

    return {
      label: matched ? t(`categories.${matched.key}`) : t('recipes.all'),
      to: path
    }
  }

  // Fallback: If no history or history wasn't a category, 
  // use the recipe's first primary category
  if (props.recipe?.categories?.length) {
    const primarySlug = props.recipe.categories[0] // This is usually the key or English slug
    const matched = RECIPE_CATEGORIES.find(c => c.key === primarySlug || c.slug === primarySlug)
    const key = matched?.key || 'allrecipes'
    const translatedSlug = t(`categorySlugs.${key}`)

    return {
      label: matched ? t(`categories.${matched.key}`) : t('recipes.all'),
      to: localePath(`/categories/${translatedSlug}`)
    }
  }

  // Final Fallback
  return { label: t('recipes.all'), to: localePath('/categories/all-recipes') }
})

const recipeName = computed(() => props.recipe?.title || 'Recipe')

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('nav.home'), item: localePath('/') },
      { name: backLink.value.label, item: backLink.value.to },
      { name: recipeName.value }
    ]
  })
])
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