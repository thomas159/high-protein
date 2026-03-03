<script setup lang="ts">
export interface Recipe {
  title: string;
  description: string;
  image?: string; // Optional, matching our Zod schema
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
<div class="lg:col-span-4">
    <div class="bg-slate-900/60 rounded-3xl p-6 md:p-8 border border-slate-800 sticky top-24 shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-white">Ingredients</h2>
        
        <!-- Scale Controls -->
        <!-- <div class="flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 shadow-inner">
          <button @click="servings = Math.max(1, servings - 1)" class="text-slate-400 hover:text-emerald-400 font-medium w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors">-</button>
          <span class="text-sm font-semibold text-white w-16 text-center">{{ servings }} {{ servings === 1 ? 'serving' : 'servings' }}</span>
          <button @click="servings++" class="text-slate-400 hover:text-emerald-400 font-medium w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors">+</button>
        </div> -->
      </div>

      <ul class="space-y-4 mb-8">
        <li v-for="(item, index) in props.recipe.ingredients" :key="index" class="flex items-start gap-3 group">
          <div class="relative flex items-start pt-1">
            <input :id="'ingredient-'+index" type="checkbox" class="peer h-5 w-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 cursor-pointer transition-all" />
            <label :for="'ingredient-'+index" class="ml-3 text-base text-slate-300 cursor-pointer peer-checked:text-slate-600 peer-checked:line-through transition-all select-none leading-tight pt-0.5">
              <span class="font-medium text-white peer-checked:text-slate-600">{{ item.amount }} {{ item.unit }} {{ item.item }}</span>
            </label>
          </div>
        </li>
      </ul>

      <button class="w-full bg-transparent text-emerald-400 font-semibold py-3.5 px-4 rounded-xl border-2 border-emerald-800/60 hover:bg-emerald-900/20 hover:border-emerald-700/60 transition-all flex items-center justify-center gap-2 shadow-sm">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Add to Shopping List
      </button>
    </div>
  </div>
</template>