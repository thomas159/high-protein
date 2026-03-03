<script setup>
import Hero from '@/components/recipes/Hero.vue'
import Ingredients from '@/components/recipes/Ingredients.vue'
const route = useRoute()

// We fetch the recipe just like before. This object now contains the Markdown body!
const { data: recipe } = await useAsyncData(route.path, () => {
  return queryCollection('recipes').path(route.path).first()
})

useHead({
  title: 'Apple Crumble - KitchenPal',
  meta: [
    { name: 'description', content: 'A 15-minute vegan dinner with big ginger and soy flavors.' }
  ]
})
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      <Hero :recipe="recipe" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 md:mt-16">
        
        <Ingredients :recipe="recipe" />

        <div class="lg:col-span-8 lg:pl-6 relative">
          
          <div class="absolute top-0 right-0 flex gap-2">
            <button class="p-2 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Print Recipe">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            </button>
            <button class="p-2 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Share Recipe">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
          </div>

          <div class="markdown-recipe-body">
            <ContentRenderer v-if="recipe" :value="recipe" />
          </div>
          
          <div class="mt-12 bg-muted rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
             <div>
                <h3 class="font-bold text-foreground text-lg mb-1">30 High-Protein Veg Recipes</h3>
                <p class="text-muted-foreground text-sm">Download our free PDF guide instantly.</p>
             </div>
             <button class="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                Download Guide
             </button>
          </div>
        </div>
      </div>
    </main>
</template>

<style scoped>
/* 1. Style the Markdown ## Method (H2) */
.markdown-recipe-body :deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

/* 2. Reset the CSS counter for the ordered list */
.markdown-recipe-body :deep(ol) {
  padding-left: 0;
  list-style: none;
  counter-reset: recipe-step;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* 3. Style the list item container */
.markdown-recipe-body :deep(li) {
  display: flex;
  gap: 1.5rem;
  color: var(--color-foreground);
  opacity: 0.9;
  line-height: 1.7;
  font-size: 1.125rem;
  counter-increment: recipe-step;
}

/* 4. Magic! Recreate your custom numbered circle */
.markdown-recipe-body :deep(li::before) {
  content: counter(recipe-step);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  font-weight: 700;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease-in-out;
  margin-top: 0.125rem;
}

/* 5. Hover state for the circle */
.markdown-recipe-body :deep(li:hover::before) {
  /* rgba versions of your green-500 for a nice subtle background */
  background-color: rgba(66, 185, 131, 0.1); 
  color: var(--color-green-600);
  border-color: rgba(66, 185, 131, 0.3);
}

/* 6. Dark mode hover tweak */
html[data-theme="dark"] .markdown-recipe-body :deep(li:hover::before) {
  color: var(--color-green-400);
}

/* 7. Make strong tags pop nicely */
.markdown-recipe-body :deep(strong) {
  font-weight: 700;
  color: var(--color-foreground);
}
</style>