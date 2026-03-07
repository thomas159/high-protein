<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const categorySlug = computed(() => route.params.slug as string)
const isAllRecipes = computed(() => categorySlug.value === 'all-recipes')

const { data: recipes, refresh } = await useAsyncData(
  `recipes-${categorySlug.value}`, 
  () => {
    let query = queryCollection('recipes')
    
    // 2. Only apply the filter if it's NOT the "all-recipes" slug
    if (!isAllRecipes.value) {
      query = query.where('categories', 'LIKE', `%${categorySlug.value}%`)
    }
    
    return query.all()
  }
)

watch(categorySlug, () => refresh())

useHead({
  title: `${categorySlug.value.charAt(0).toUpperCase() + categorySlug.value.slice(1)} Recipes - ${appConfig.siteName}`,
  meta: [
    { name: 'description', content: `Browse our collection of delicious ${categorySlug.value} recipes.` }
  ]
})
</script>

<template>
  <div>   
    <div class="flex justify-center mx-auto py-4"><h1>{{ isAllRecipes ? 'All Recipes' : `${categorySlug.replace('-', ' ')} Meals` }}</h1></div>
    <div v-if="recipes && recipes.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-main">
      <div 
        v-for="recipe in recipes" 
        :key="recipe.path">
        <RecipeCard :recipe="recipe" class="h-full" />
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 italic">No recipes found for "{{ categorySlug }}".</p>
    </div>
  </div>
</template>