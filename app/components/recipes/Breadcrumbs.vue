<script setup lang="ts">
const route = useRoute()

const recipeSlug = computed(() => route.params.slug as string)

export interface Recipe {
  title: string;
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
<nav class="text-sm text-muted-foreground mb-4 flex items-center gap-2">
  <a href="#" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">Recipes</a>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  <span class="text-foreground font-medium">{{ recipeSlug }}</span>
</nav>
</template>