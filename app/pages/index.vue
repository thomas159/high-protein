<script setup>
import Slider from '@/components/home/slider.vue'
import MainContent from '@/components/home/mainContent.vue';
import RecipeCard from '~/components/RecipeCard.vue';
// Query all recipes in your collection
const { data: recipes } = await useAsyncData('home-recipes', () => {
  return queryCollection('recipes').all()
})
</script>

<template>
  <div class="min-h-screen">

    <main class="">
      <Slider />
      <MainContent />
      <div class="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-3">Trending This Week</h1>
          <p class="text-slate-500 text-lg">Discover our most popular, mouth-watering recipes.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.slug" 
          class="flex flex-col"
        >
          <RecipeCard :recipe="recipe" class="h-full" />
        </div>
      </div>
      
    </main>
  </div>
</template>