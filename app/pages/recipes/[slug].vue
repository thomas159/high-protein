<script setup>
const route = useRoute()

const { data: recipe } = await useAsyncData(route.path, () => {
  return queryCollection('recipes').path(route.path).first()
})
</script>

<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
    
    <template v-if="recipe">
      
      <div class="max-w-6xl mx-auto lg:mt-8 lg:px-4">
        <div class="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] lg:rounded-2xl overflow-hidden bg-slate-200 relative shadow-sm">
          <img 
            v-if="recipe.image" 
            :src="recipe.image" 
            :alt="recipe.title" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 mt-8 lg:mt-12">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16">
          
          <article class="lg:col-span-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            
            <header class="mb-8 border-b border-slate-100 pb-8">
              <div class="flex items-center gap-3 text-xs font-bold text-orange-500 uppercase tracking-wider mb-4">
                <span class="bg-orange-50 px-3 py-1.5 rounded-full">Dinner</span>
                <span class="flex items-center gap-1 text-slate-500">
                  <span class="text-orange-500">★</span> {{ recipe.rating }} ({{ recipe.reviews }} Reviews)
                </span>
              </div>
              
              <h1 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] mb-6">
                {{ recipe.title }}
              </h1>

              <div class="flex flex-wrap gap-3">
                <button class="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                  ↓ Jump to Recipe
                </button>
                <button class="bg-orange-100 text-orange-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-200 transition-colors">
                  🖨️ Print
                </button>
              </div>
            </header>

            <div class="grid grid-cols-3 gap-4 bg-slate-50 rounded-xl p-5 mb-10 border border-slate-100 divide-x divide-slate-200">
              <div class="text-center">
                <span class="block text-xs text-slate-500 uppercase font-semibold mb-1">Prep</span>
                <span class="font-bold text-slate-900">{{ recipe.prepTime || '15 mins' }}</span>
              </div>
              <div class="text-center">
                <span class="block text-xs text-slate-500 uppercase font-semibold mb-1">Cook</span>
                <span class="font-bold text-slate-900">{{ recipe.cookTime || '20 mins' }}</span>
              </div>
              <div class="text-center">
                <span class="block text-xs text-slate-500 uppercase font-semibold mb-1">Yields</span>
                <span class="font-bold text-slate-900">{{ recipe.yield || '4 Servings' }}</span>
              </div>
            </div>

            <div class="prose prose-slate prose-orange max-w-none 
                        prose-headings:font-serif prose-headings:text-slate-900
                        prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3 prose-h2:mt-12 prose-h2:mb-6
                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                        prose-ul:list-none prose-ul:pl-0 prose-ul:mb-8
                        prose-li:flex prose-li:items-start prose-li:border-b prose-li:border-slate-50 prose-li:py-3 prose-li:text-slate-700
                        prose-input:mr-4 prose-input:mt-1 prose-input:w-5 prose-input:h-5 prose-input:accent-orange-500 prose-input:cursor-pointer
                        prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-orange-500 prose-ol:marker:font-bold">
              <ContentRenderer :value="recipe" />
            </div>

          </article>

          <aside class="hidden lg:block lg:col-span-4 relative">
            <div class="sticky top-28 flex flex-col gap-8">
              
              <div class="bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-center h-[600px] w-full">
                <span class="text-[10px] font-bold tracking-widest uppercase mb-2 text-slate-400">Advertisement</span>
                <div class="w-full h-full bg-slate-200/50 flex flex-col items-center justify-center rounded">
                  <span class="font-bold mb-1 text-slate-500">[ Sticky Sidebar Ad ]</span>
                  <span class="text-xs text-slate-400">300x600 Half Page Unit</span>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                <h3 class="font-serif font-bold text-xl mb-2 text-slate-900">Never miss a recipe!</h3>
                <p class="text-sm text-slate-500 mb-4">Get our top weekly meals sent straight to your inbox.</p>
                <input type="email" placeholder="Your email address" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <button class="w-full bg-orange-500 text-white font-bold py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors">Subscribe</button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center py-32">
        <h1 class="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <NuxtLink to="/" class="text-orange-500 font-semibold hover:underline">← Back to Homepage</NuxtLink>
      </div>
    </template>
  </main>
</template>