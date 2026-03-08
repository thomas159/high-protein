<script setup lang="ts">
export interface Recipe {
  title: string;
  slug: string;
  description: string;
  image: string;
  categories: string[];
  tags: string[];
  rating: number;
  reviews: number;
  prepTimeMins: number;
  cookTimeMins: number;
  servings: number;
  // Nested object for macros
  macros: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  // Array of objects for ingredients
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
 <div class="flex flex-wrap gap-2 mb-5">
    <!-- <span v-if="props.recipe.tags && props.recipe.tags.length > 0" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        {{ props.recipe.tags }}
    </span> -->
    
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rxounded-full text-xs font-medium bg-secondary text-foreground border border-border">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {{ props.recipe.cookTimeMins }} mins
    </span>
    
    <!-- <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
        {{ props.recipe.categories }}
    </span> -->
  </div>
</template>