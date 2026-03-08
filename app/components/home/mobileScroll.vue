<script setup lang="ts">
// Define what a single recipe looks like
export interface Recipe {
  id: string | number;
  slug: string;
  title: string;
  image?: string;
  cookingTime?: string;
  // Add other fields your RecipeCard uses
}

// Accept an array of these recipes as a prop
const props = defineProps<{
  recipes: Recipe[];
  title?: string; // Optional custom title
  description?: string; // Optional custom description
}>();

console.log('recipes',props.recipes)
</script>

<template>
  <section>
    <div class="text-center md:text-left flex flex-col md:flex-row justify-between items-start">
      <div>
        <h2 class="font-display text-3xl md:text-5xl font-bold">
          {{ title || 'Trending Recipes' }}
        </h2>
        <p v-if="description" class="text-slate-500 text-lg">
          {{ description }}
        </p>
      </div>
    </div>

    <div 
      class="grid gap-6 items-stretch overflow-x-auto no-scrollbar snap-x snap-mandatory
             grid-flow-col auto-cols-[40%] pb-6 -mx-4 px-4
             md:mx-0 md:px-0 md:pb-0 md:grid-flow-row md:grid-cols-2 lg:grid-cols-4"
    >
      <div 
        v-for="recipe in recipes" 
        :key="recipe.slug" 
        class="flex flex-col snap-center"
      >
        <RecipeCard :recipe="recipe" class="h-full" />
      </div>
    </div>
  </section>
</template>