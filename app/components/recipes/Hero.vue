<script setup lang="ts">
import Button from '../common/Button.vue'
import Img from '../Img.vue'

export interface Recipe {
  title: string;
  slug: string;
  description: string;
  image: string;
  alt?: string;
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

const scrollToRecipe = () => {
  const element = document.getElementById('howToMake')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">

    <div class="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-start h-full">
      <div class="flex flex-row justify-between">
        <RecipesBreadcrumbs :recipe="props.recipe" />
      </div>
       <RecipesTags :recipe="props.recipe" />
      <h1 class="mb-">
        {{ props.recipe.title }}
      </h1>

      <div class="flex justify-center lg:justify-start mb-6">
        <Button 
          @click="scrollToRecipe">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          Jump to Recipe
        </Button>
      </div>

      <p class="whitespace-pre-line text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
        {{ props.recipe.description }}
      </p>

      <div class="grid grid-cols-4 gap-3 md:gap-4 border-t border-b border-border py-6">

        <div class="bg-green-500/10 rounded-xl p-3 md:p-4 text-center border border-green-500/30">
          <div class="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{
            props.recipe.macros.protein }}g</div>
          <div
            class="text-[10px] md:text-xs font-semibold text-green-600/80 dark:text-green-400/80 tracking-wider uppercase">
            Protein</div>
        </div>

        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.calories }}</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Kcal</div>
        </div>
        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.carbs }}g</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Carbs</div>
        </div>
        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.fat }}g</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">Fat</div>
        </div>
      </div>
    </div>

    <div class="order-1 lg:order-2 lg:col-span-6 relative h-[300px] md:h-[400px] lg:h-[400px] -mx-5 md:mx-0 -mt-8 md:mt-0">
      <Img 
        :src="props.recipe.image"
        :alt="props.recipe.alt" class="w-full h-full object-cover rounded-b-3xl md:rounded-3xl shadow-none md:shadow-xl border-0 md:border border-border" 
        high
        />
    </div>
  </div>
</template>