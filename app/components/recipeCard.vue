<script setup lang="ts">
import Img from '@/components/Img.vue'

export interface Recipe {
  title: string;
  slug: string;
  description: string;
  image?: string; 
  categories: string;
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
  <NuxtLink 
    :to="`/recipes/${props.recipe.slug}`" 
    class="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-2"
  >
    <div class="h-52 w-full overflow-hidden relative">
      <Img 
        :src="props.recipe.image" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div class="absolute top-3 left-3">
        <span class="font-body text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/20 shadow-sm">
          {{ props.recipe.categories }}
        </span>
      </div>
    </div>
    
    <div class="p-5 flex-grow flex flex-col">
      
      <h2 class="font-display text-lg font-extrabold text-foreground mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
        {{ props.recipe.title }}
      </h2>
      
      <p class="font-body text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
        {{ props.recipe.description }}
      </p>
      
      <div class="mt-auto pt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-t border-border/50">
        <div class="flex items-center gap-1.5">
          <span class="opacity-70">⏱</span>
          <span>{{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }} MINS</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="opacity-70">🔥</span>
          <span>{{ props.recipe.macros.calories }} KCAL</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>