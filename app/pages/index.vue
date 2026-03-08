<script setup>
// Query all recipes in your collection
const { data: recipes } = await useAsyncData('home-recipes', () => {
  return queryCollection('recipes').all()
})

const categories = [
  { name: 'Breakfast', icon: '🍳' },
  { name: 'High Protein', icon: '🥗' },
  { name: 'Vegan', icon: '🌿' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Dinner', icon: '🍰' },
  { name: '30 Minute meals', icon: '🍰' },
]
</script>

<template>
  <div class="min-h-screen">

    <main class="">

       <div class="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 class="font-display text-4xl md:text-5xl font-bold mb-3">Latest Recipes</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.slug" 
          class="flex flex-col"
        >
          <RecipeCard :recipe="recipe" class="h-full" />
        </div>
      </div>

          <section class="border-y border-border py-6 my-12">
      <div class="container mx-auto px-4 flex justify-center gap-8 md:gap-16">
        <NuxtLink v-for="cat in categories" :key="cat.name" to="/" class="flex flex-col items-center group">
          <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ cat.icon }}</span>
          <span class="text-[11px] font-bold uppercase tracking-tighter text-muted-foreground group-hover:text-emerald-500">{{ cat.name }}</span>
        </NuxtLink>
      </div>

    </section>

      <HomeMainContent />

      <div class="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 class="font-display text-4xl md:text-5xl font-bold mb-3">Trending This Week</h1>
          <p class="text-slate-500 text-lg">Discover our most popular, mouth-watering recipes.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
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