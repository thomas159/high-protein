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
  rating?: number;
  reviews?: number;
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

const { formatText } = useFormatText()
const { t } = useI18n()

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

      <!-- Star rating display for visible schema alignment -->
      <div v-if="props.recipe.rating" class="flex items-center gap-2 mt-3 -mb-2">
        <div class="flex items-center text-amber-400">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-4 h-4 fill-current"
            :class="star <= Math.round(props.recipe.rating) ? 'text-amber-400' : 'text-muted-foreground/20'"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-sm font-bold text-foreground">{{ props.recipe.rating }}</span>
        <span v-if="props.recipe.reviews" class="text-xs text-muted-foreground">({{ props.recipe.reviews }})</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-foreground leading-tight mb-6 mt-4">
        {{ props.recipe.title }}
      </h1>

      <div class="flex justify-center lg:justify-start mb-6">
        <Button 
          @click="scrollToRecipe">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
          {{ t('recipes.jump') }}
        </Button>
      </div>

      <p class="whitespace-pre-line text-muted-foreground text-base md:text-lg leading-relaxed mb-6" v-html="formatText(props.recipe.description, false)"/>

      <div class="grid grid-cols-4 gap-3 md:gap-4 border-t border-b border-border py-6">

        <div class="bg-green-500/10 rounded-xl p-3 md:p-4 text-center border border-green-500/30">
          <div class="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{
            props.recipe.macros.protein }}g</div>
          <div
            class="text-[10px] md:text-xs font-semibold text-green-600/80 dark:text-green-400/80 tracking-wider uppercase">
            {{ t('recipes.protein') }}</div>
        </div>

        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.calories }}</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">{{ t('recipes.kcal') }}</div>
        </div>
        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.carbs }}g</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">{{ t('recipes.carbs') }}</div>
        </div>
        <div class="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
          <div class="text-2xl md:text-3xl font-bold text-foreground mb-1">{{ props.recipe.macros.fat }}g</div>
          <div class="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider uppercase">{{ t('recipes.fat') }}</div>
        </div>
      </div>
    </div>

    <div class="order-1 lg:order-2 lg:col-span-6 relative h-[300px] md:h-[400px] lg:h-[400px] -mx-5 md:mx-0 -mt-8 md:mt-0">
      <Img 
        :src="props.recipe.image"
        :alt="props.recipe.alt || props.recipe.title" class="w-full h-full object-cover rounded-b-3xl md:rounded-3xl shadow-none md:shadow-xl border-0 md:border border-border" 
        high
        />
    </div>
  </div>
</template>