<script setup lang="ts">
export interface Recipe {
  title: string;
  description: string;
  image?: string; // Optional, matching our Zod schema
  categories?: Array<string>;
  tags?: string[];
  rating?: number;
  reviews?: number;
  prepTimeMins: number;
  cookTimeMins: number;
  servings?: number;
  macros?: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  ingredients?: {
    item: string;
    amount: number;
    unit: string;
    type: string;
  }[];
}

const props = defineProps<{
  recipe: Recipe | null | undefined
}>();
</script>

<template>
<div class="lg:col-span-4">
    <div class="bg-card rounded-3xl p-6 md:p-8 border border-border sticky top-24 shadow-sm transition-colors duration-300">
      <div class="flex justify-between items-center mb-6">
        
        <h2 class="text-xl font-bold text-foreground">Ingredients for {{ props.recipe?.title }}</h2>
        
        </div>

      <ul class="space-y-4 mb-8">
        <li v-for="(item, index) in props.recipe.ingredients" :key="index" class="flex items-start gap-3 group">
          <div class="relative flex items-start pt-1">
            
            <input :id="'ingredient-'+index" type="checkbox" class="peer h-5 w-5 rounded border-border bg-background text-green-500 focus:ring-green-500 focus:ring-offset-background cursor-pointer transition-all" />
            
            <label :for="'ingredient-'+index" class="ml-3 text-base text-muted-foreground cursor-pointer peer-checked:text-muted-foreground/50 peer-checked:line-through peer-checked:decoration-4 transition-all select-none leading-tight pt-0.5">
              
              <span class="font-medium text-foreground peer-checked:text-muted-foreground/50 transition-colors">
                <span class="mr-[1px]">{{ item.amount }}</span>{{ item.unit }} {{ item.item }} <span v-if="item.type" class="italic">({{ item.type }})</span>
              </span>
            </label>
          </div>
        </li>
      </ul>

      <!-- <button class="w-full bg-transparent text-green-600 dark:text-green-400 font-semibold py-3.5 px-4 rounded-xl border-2 border-green-600/30 dark:border-green-500/30 hover:bg-green-500/10 hover:border-green-600/50 dark:hover:border-green-400/50 transition-all flex items-center justify-center gap-2 shadow-sm">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Add to Shopping List
      </button> -->
    </div>
  </div>
</template>