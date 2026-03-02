<script setup>
// Query all recipes in your collection
const { data: recipes } = await useAsyncData('home-recipes', () => {
  return queryCollection('recipes').all()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800">
    
    <header class="bg-white border-b border-slate-200 py-6 px-4 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="font-serif text-2xl font-bold text-slate-900 tracking-tight">
          HotRecipes<span class="text-orange-500">.</span>
        </NuxtLink>
        <div class="hidden md:block w-72">
          <input 
            type="text" 
            placeholder="Search recipes..." 
            class="w-full bg-slate-100 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
          >
        </div>
        <button class="md:hidden text-2xl">☰</button>
      </div>
    </header>

    <main class="max-w-6xl mx-auto py-12 px-4">
      
      <div class="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-3">Trending This Week</h1>
          <p class="text-slate-500 text-lg">Discover our most popular, mouth-watering recipes.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <template v-for="(recipe, index) in recipes" :key="recipe.path">
          
          <NuxtLink :to="recipe.path" class="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1">
            
            <div class="h-56 bg-slate-200 w-full group-hover:bg-slate-300 transition-colors flex items-center justify-center text-slate-400">
              [ Image: {{ recipe.title }} ]
            </div>
            
            <div class="p-6 flex-grow flex flex-col">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-orange-500 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">Dinner</span>
                <span class="text-sm font-semibold text-slate-600">⭐ {{ recipe.rating }}</span>
              </div>
              
              <h2 class="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                {{ recipe.title }}
              </h2>
              
              <div class="mt-auto pt-4 flex items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100">
                <span>⏱️ {{ recipe.prepTime || '15 mins' }}</span>
                <span>🍽️ {{ recipe.yield || '4 Servings' }}</span>
              </div>
            </div>
          </NuxtLink>

          <div v-if="index === 1" class="bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-center text-slate-500 min-h-[350px]">
            <span class="text-[10px] font-bold tracking-widest uppercase mb-2 text-slate-400">Advertisement</span>
            <div class="w-full h-full bg-slate-200/50 flex flex-col items-center justify-center rounded">
              <span class="font-bold mb-1">[ Native In-Feed Ad ]</span>
              <span class="text-xs">Highly clickable block.</span>
            </div>
          </div>

        </template>

      </div>
    </main>
  </div>
</template>