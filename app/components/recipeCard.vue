<script setup lang="ts">
import Img from '@/components/Img.vue'

export interface Recipe {
  title: string;
  slug: string;
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
</script>

<template>
  <NuxtLink :to="`/recipes/${props.recipe.slug}`" class="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1">
    
    <div class="h-56 bg-slate-200 w-full group-hover:bg-slate-300 transition-colors flex items-center justify-center text-slate-400">
      <Img :src="props.recipe.image" />
    </div>
    
    <div class="p-6 flex-grow flex flex-col">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold text-orange-500 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">Dinner</span>
        <span class="text-sm font-semibold text-slate-600">⭐ {{ props.recipe.rating }}</span>
      </div>
      
      <h2 class="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
        {{ props.recipe.title }}
      </h2>
      
      <div class="mt-auto pt-4 flex items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100">
        <span>⏱️ {{ props.recipe.prepTime || '15 mins' }}</span>
        <span>🍽️ {{ props.recipe.yield || '4 Servings' }}</span>
      </div>
    </div>
  </NuxtLink>
</template>