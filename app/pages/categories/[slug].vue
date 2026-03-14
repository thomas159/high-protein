<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

// 1. Ensure the slug is reactive and never undefined for the query
const categorySlug = computed(() => (route.params.slug as string) || '')
const isAllRecipes = computed(() => categorySlug.value === 'all-recipes')

const { data: recipes, refresh, status } = await useAsyncData(
  `recipes-${categorySlug.value}`, 
  async () => {
    // Safety check: Don't query if the slug is missing (unless it's 'all-recipes')
    if (!categorySlug.value && !isAllRecipes.value) return []

    let query = queryCollection('recipes')
    
    if (!isAllRecipes.value && categorySlug.value) {
      // Use the precise array filter if using Nuxt Content v3
      query = query.where('categories', 'LIKE', `%${categorySlug.value}%`)
    }
    
    return await query.all()
  },
  {
    // Re-run whenever the slug changes
    watch: [categorySlug],
    default: () => []
  }
)

// Re-calculate the title safely
const displayTitle = computed(() => {
  if (!categorySlug.value) return 'Loading...'
  if (isAllRecipes.value) return 'All Recipes'
  return categorySlug.value.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Recipes'
})
</script>

<template>
  <div>   
    <div class="flex justify-center mx-auto">
      <h1>{{ displayTitle }}</h1>
    </div>

    <div v-if="status === 'pending'" class="text-center py-20">
      <p>Loading your muscle-building meals...</p>
    </div>

    <!-- <div v-else-if="recipes && recipes.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-main"> -->
   
    <div v-else-if="recipes && recipes.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-main -mx-4">
      <div v-for="recipe in recipes" :key="recipe.path">
        <RecipeCard :recipe="recipe" class="h-full" />
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 italic">No recipes found for "{{ categorySlug }}".</p>
    </div>
  </div>
</template>