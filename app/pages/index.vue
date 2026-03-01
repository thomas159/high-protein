<script setup lang="ts">
// 1. Switch to queryCollection and .all()
const { data: recipes } = await useAsyncData('recipes', () => 
  queryCollection('recipes').all()
)

const searchQuery = ref('')

const filteredRecipes = computed(() => {
  // Use optional chaining (?.) because data might be null initially
  if (!recipes.value) return []
  const query = searchQuery.value.toLowerCase().trim()
  
  return recipes.value.filter(recipe => {
    // 2. Add safety checks for title/description
    const title = recipe.title?.toLowerCase() || ''
    const description = recipe.description?.toLowerCase() || ''
    return title.includes(query) || description.includes(query)
  })
})

console.log('recipes',recipes)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <NuxtLink 
      v-for="recipe in recipes" 
      :key="recipe.path" 
      :to="recipe.path"
      class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <img :src="recipe.image" class="h-56 w-full object-cover" />
      <div class="p-6">
        <h3 class="text-xl font-bold font-serif">{{ recipe.title }}</h3>
        <p class="text-stone-500 text-sm mt-2">{{ recipe.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>