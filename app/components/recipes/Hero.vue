<script setup lang="ts">
import { computed } from 'vue'

export interface Recipe {
  title: string;
  description: string;
  image?: string; 
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  prepTimeMins: number;
  cookTimeMins: number;
  servings: number;
  macros: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  ingredients: {
    item: string;
    amount: number;
    unit: string;
  }[];
}

const props = defineProps<{
  recipe: Recipe;
}>();

// Automatically calculates the total time for the logistics tag!
const totalTime = computed(() => props.recipe.prepTimeMins + props.recipe.cookTimeMins)
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    
    <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center h-full">
        <nav class="text-sm text-muted-foreground mb-4 flex items-center gap-2">
          <a href="#" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">Recipes</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          <span class="text-foreground font-medium">{{ recipe.category }}</span>
        </nav>

        <div class="flex flex-wrap gap-2 mb-5">
          <span v-if="recipe.tags && recipe.tags.length > 0" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              {{ recipe.tags[0] }}
          </span>
          
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ totalTime }} mins
          </span>
          
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {{ recipe.category }}
          </span>
        </div>

        <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
          {{ recipe.title }}
        </h1>

        <p class="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
          {{ recipe.description }}
        </p>

        <div class="flex items-center gap-2 mb-8">
          <div class="flex text-amber-400">
              <svg v-for="i in Math.floor(recipe.rating)" :key="i" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg v-if="recipe.rating % 1 !== 0" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/><rect x="0" y="0" width="12" height="24" fill="currentColor" style="mix-blend-mode: color;"/></svg>
          </div>
          <span class="font-semibold text-foreground">{{ recipe.rating }}</span>
          <span class="text-sm text-muted-foreground underline decoration-border cursor-pointer hover:text-foreground transition-colors">({{ recipe.reviews }} reviews)</span>
        </div>

        <div class="grid grid-cols-4 gap-3 md:gap-4 border-t border-b border-border py-6">
          
          <div class="bg-green-500/10 rounded-xl p-3 md:p-4 text-center border border-green-500/30">
              <div class="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ recipe.macros.protein }}g</div>
              <div class="text-[10px] md:text-xs font-semibold text-green-600/80 dark:text-green-400/80 tracking-wider uppercase">Protein</div>
          </div>
          
          <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
              <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ recipe.macros.calories }}</div>
              <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Kcal</div>
          </div>
          <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
              <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ recipe.macros.carbs }}g</div>
              <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Carbs</div>
          </div>
          <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
              <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ recipe.macros.fat }}g</div>
              <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Fat</div>
          </div>
        </div>
    </div>

    <div class="order-1 lg:order-2 lg:col-span-5 relative h-[300px] md:h-[400px] lg:h-[500px]">
        <img 
    :src="recipe.image 
      ? `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${recipe.image}` 
      : 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000'" 
    :alt="recipe.title" 
    class="w-full h-full object-cover rounded-3xl shadow-xl border border-border" >
    </div>
    </div>
</template>