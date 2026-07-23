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
  viewAllLink?: string;
  viewAllText?: string;
}>();

const { formatText } = useFormatText()
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white">
        {{ title }}
      </h2>
      <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
        {{ viewAllText || 'View All' }} &rarr;
      </NuxtLink>
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
          <RecipeCard :recipe="recipe" class="h-full" />
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