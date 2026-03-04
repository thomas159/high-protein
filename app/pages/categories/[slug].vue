<script setup lang="ts">
// Components are auto-imported in Nuxt, but explicit imports are fine
import Hero from '@/components/recipes/Hero.vue'
import Ingredients from '@/components/recipes/Ingredients.vue'

const route = useRoute()

// We use a computed property for the slug to ensure reactivity
const categorySlug = computed(() => route.params.slug as string)

const { data: recipes, refresh } = await useAsyncData(
  `${categorySlug.value}`, 
  () => queryCollection('recipes')
    // Use 'LIKE' with % wildcards to find the slug within the array string
    .where('categories', 'LIKE', `%${categorySlug.value}%`) 
    .all()
)

// Watch the slug to refresh data if the user clicks a different category link
watch(categorySlug, () => refresh())

useHead({
  title: `${categorySlug.value.charAt(0).toUpperCase() + categorySlug.value.slice(1)} Recipes - Flavor Feast`,
  meta: [
    { name: 'description', content: `Browse our collection of delicious ${categorySlug.value} recipes.` }
  ]
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <div v-if="recipes && recipes.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        v-for="recipe in recipes" 
        :key="recipe.path" 
        class="group border border-gray-100 p-4 rounded-sm bg-white"
      >
        <div class="aspect-square overflow-hidden mb-3">
          <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover">
        </div>
        <span class="text-[10px] text-[#8CB369] font-bold uppercase tracking-tighter">
          {{ recipe.category }}
        </span>
        <h4 class="font-bold text-[#3E4A2E] text-lg">{{ recipe.title }}</h4>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 italic">No recipes found for "{{ categorySlug }}".</p>
    </div>
  </div>
</template>