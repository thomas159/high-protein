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

export interface Collection {
  title: string;
  slug: string;
  description: string;
  image?: string;
}

// Accept an array of these recipes as a prop
const props = defineProps<{
  recipes?: Recipe[];
  collections?: Collection[];
  title?: string; // Optional custom title
  description?: string; // Optional custom description
}>();
</script>

<template>
  <section>
    <div class="text-center md:text-left flex flex-col md:flex-row justify-between items-start">
      <div>
        <h2 class="font-display text-3xl md:text-5xl font-bold">
          {{ title }}
        </h2>
        <p v-if="description" class="text-slate-500 text-lg">
          {{ description }}
        </p>
      </div>
    </div>

    <div 
      class="grid gap-6 items-stretch overflow-x-auto no-scrollbar snap-x snap-mandatory
             grid-flow-col auto-cols-[80%] pb-6 -mx-4 px-4
             md:mx-0 md:px-0 md:pb-0 md:grid-flow-row md:grid-cols-2"
      :class="collections ? 'lg:grid-cols-2' : 'lg:grid-cols-4'"
    >
      <template v-if="recipes">
        <div 
          v-for="(recipe, index) in recipes" 
          :key="recipe.slug" 
          class="flex flex-col snap-center h-full">
          <RecipeCard :recipe="recipe" :high="index === 0" class="h-full" />
        </div>
      </template>

      <template v-if="collections">
        <div 
          v-for="collection in collections" 
          :key="collection.slug" 
          class="flex flex-col snap-center h-full">
          <CollectionCard :collection="collection" class="h-full" />
        </div>
      </template>
    </div>
  </section>
</template>