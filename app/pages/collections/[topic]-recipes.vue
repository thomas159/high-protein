<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

// Get the dynamic topic from the URL (e.g., 'air-fryer' from '/collections/air-fryer-recipes')
// Made reactive so navigating between collections updates the page correctly
const topicParam = computed(() => (route.params.topic as string) || '')

// Format the topic for display: 'air-fryer' -> 'Air Fryer'
const topicName = computed(() => {
  if (!topicParam.value) return ''
  return topicParam.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Custom text mapping for different collections
const collectionData = computed(() => {
  // COLLECTION_DATA is auto-imported from ~/utils/collections.ts
  return COLLECTION_DATA[topicParam.value] || {
    description: `Dive into our favorite healthy ${topicName.value.toLowerCase()} recipes that you can whip up in no time to satisfy your cravings!`
  }
})

// SEO Metadata
useHead({
  title: `${collectionData.value.title || 'The Best Healthy ' + topicName.value + ' Recipes'} - ${appConfig.siteName || 'Our Blog'}`,
  meta: [
    { 
      name: 'description', 
      content: collectionData.value.description
    }
  ]
})

// Fetch all recipes from the Nuxt Content v3 collection
const { data: allRecipes } = await useAsyncData('all-recipes-for-topics', () => {
  return queryCollection('recipes').all()
})

// Filter the recipes to only include those related to the dynamic topic
const filteredRecipes = computed(() => {
  if (!allRecipes.value) return []
  
  const searchPhrase = topicName.value.toLowerCase() // e.g., 'air fryer'
  const searchSlug = topicParam.value.toLowerCase() // e.g., 'air-fryer'
  
  return allRecipes.value.filter(recipe => {
    const titleMatch = recipe.title?.toLowerCase().includes(searchPhrase)
    const slugMatch = recipe.slug?.toLowerCase().includes(searchSlug)
    const keywordMatch = recipe.keywords?.some(k => k.toLowerCase().includes(searchPhrase) || k.toLowerCase().includes(searchSlug))
    const categoryMatch = recipe.categories?.some(c => c.toLowerCase().includes(searchPhrase) || c.toLowerCase().includes(searchSlug))
    
    return titleMatch || slugMatch || keywordMatch || categoryMatch
  })
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <header class="text-center mb-16">
      <h1 v-if="collectionData.title" class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        {{ collectionData.title }}
      </h1>
      <h1 v-else class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        The Best <span class="text-emerald-500">{{ topicName }}</span> Recipes
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {{ collectionData.description }}
      </p>
    </header>

    <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="recipe in filteredRecipes" :key="recipe.path" class="flex flex-col h-full">
        <RecipeCard :recipe="recipe" class="h-full" />
      </div>
    </div>

    <div v-else class="text-center py-16 bg-muted rounded-2xl border border-border">
      <div class="text-4xl mb-4">🍽️</div>
      <h2 class="text-2xl font-semibold mb-2">No {{ topicName.toLowerCase() }} recipes found!</h2>
      <p class="text-muted-foreground">We are still cooking up our {{ topicName.toLowerCase() }} recipes. Check back soon!</p>
    </div>
  </div>
</template>