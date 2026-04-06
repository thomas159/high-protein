<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

const minServings = computed(() => props.recipe?.servings || 1)
const currentServings = ref(minServings.value)

// Keep servings in sync if the recipe changes while navigating
watch(minServings, (newVal) => {
  currentServings.value = newVal
})

const increaseServings = () => {
  currentServings.value++
}

const decreaseServings = () => {
  if (currentServings.value > minServings.value) {
    currentServings.value--
  }
}

const adjustedIngredients = computed(() => {
  if (!props.recipe?.ingredients) return []

  const ratio = currentServings.value / minServings.value
  
  return props.recipe.ingredients.map(ing => {
    let adjustedAmount = ing.amount ? ing.amount * ratio : undefined
    if (adjustedAmount) {
      adjustedAmount = Number(adjustedAmount.toFixed(2)) // Clean up decimals
    }
    return { ...ing, adjustedAmount }
  })
})
</script>

<template>
<div class="lg:col-span-4">
    <div class="bg-card rounded-3xl p-6 md:p-8 border border-border sticky top-24 shadow-sm transition-colors duration-300">
      <div class="flex justify-between items-center">
        
        <h2 class="text-xl font-bold text-foreground">Ingredients for {{ props.recipe?.title }}</h2>
        
        </div>
        
      <!-- Servings Control -->
      <div class="flex items-center justify-between bg-background border border-border px-4 py-3 rounded-xl mb-6">
        <span class="text-sm font-semibold text-muted-foreground">Servings</span>
        <div class="flex items-center gap-4">
          <button 
            @click="decreaseServings"
            :disabled="currentServings <= minServings"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-card shadow-sm border border-border text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
          </button>
          <span class="font-bold text-foreground min-w-[1.5rem] text-center">{{ currentServings }}</span>
          <button 
            @click="increaseServings"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-card shadow-sm border border-border text-muted-foreground hover:bg-background transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>
      </div>

      <ul class="space-y-4">
        <li v-for="(item, index) in adjustedIngredients" :key="index" class="flex items-start gap-3 group">
          <div class="relative flex items-start pt-1">
            
            <input :id="'ingredient-'+index" type="checkbox" class="peer h-5 w-5 rounded border-border bg-background text-green-500 focus:ring-green-500 focus:ring-offset-background cursor-pointer transition-all" />
            
            <label :for="'ingredient-'+index" class="ml-3 text-base text-muted-foreground cursor-pointer peer-checked:text-muted-foreground/50 peer-checked:line-through peer-checked:decoration-4 transition-all select-none leading-tight pt-0.5">
              
              <span class="font-medium text-foreground peer-checked:text-muted-foreground/50 transition-colors">
                <span v-if="item.adjustedAmount" class="mr-[1px]">{{ item.adjustedAmount }}</span>{{ item.unit }} {{ item.item }} <span v-if="item.type" class="italic">({{ item.type }})</span>
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