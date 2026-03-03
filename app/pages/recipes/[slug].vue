<script setup>
import Hero from '@/components/recipes/Hero.vue'
const route = useRoute()

const { data: recipe } = await useAsyncData(route.path, () => {
  return queryCollection('recipes').path(route.path).first()
})
  useHead({
  title: 'Vegetarian Protein Burger - KitchenPal',
  meta: [
    { name: 'description', content: 'A hearty, high-protein veggie burger packed with a spicy chickpea patty.' }
  ]
})
</script>

<template>
  <!-- Main Content -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      <!-- Top Section: Hero -->
      <Hero :recipe="recipe"/>

      <!-- Bottom Section: Recipe Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 md:mt-16">
        
        <!-- Ingredients Sidebar -->
     

        <!-- Instructions Main Content -->
        <div class="lg:col-span-8 lg:pl-6">
          <div class="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h2 class="text-2xl font-bold text-white">How to make it</h2>
            
            <!-- Utility Actions Contextually Placed -->
            <div class="flex gap-2">
              <button class="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-colors" title="Print Recipe">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              </button>
              <button class="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-colors" title="Share Recipe">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              </button>
            </div>
          </div>

          <div class="space-y-10">
            <div v-for="(step, index) in instructions" :key="index" class="flex gap-6 group">
              <div class="flex-shrink-0">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 group-hover:bg-emerald-900/40 group-hover:text-emerald-400 group-hover:border-emerald-700 transition-colors">
                  {{ index + 1 }}
                </span>
              </div>
              <p class="text-slate-300 leading-[1.7] text-lg pt-0.5">
                <span v-html="step"></span>
              </p>
            </div>
          </div>
          
          <!-- Promo block within instructions flow -->
          <div class="mt-12 bg-gradient-to-br from-emerald-950/40 to-green-900/20 rounded-2xl p-6 border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
             <div>
                <h3 class="font-bold text-white text-lg mb-1">30 High-Protein Veg Recipes</h3>
                <p class="text-slate-400 text-sm">Download our free PDF guide instantly.</p>
             </div>
             <button class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                Download Guide
             </button>
          </div>
        </div>
      </div>
    </main>
</template>