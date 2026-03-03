<script setup lang="ts">
import Breadcrumbs from '@/components/recipes/Breadcrumbs.vue';
import Tags from '@/components/recipes/Tags.vue';

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
    
    <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start h-full">
        <div class="flex flex-row justify-between">
       <Breadcrumbs :recipe="recipe" />

       <Tags :recipe="recipe" />
    </div>
        <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
          {{ recipe.title }}
        </h1>

        <p class="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
          {{ recipe.description }}
        </p>

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

    <div class="order-1 lg:order-2 lg:col-span-5 relative h-[300px] md:h-[400px] lg:h-[400px]">
        <img 
    :src="recipe.image 
      ? `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${recipe.image}` 
      : 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000'" 
    :alt="recipe.title" 
    class="w-full h-full object-cover rounded-3xl shadow-xl border border-border" >
    </div>
    </div>
</template>