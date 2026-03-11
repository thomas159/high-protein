<script setup>
const props = defineProps(['category', 'tags'])
const { data: recipes } = await useAsyncData(`fries-list`, () => 
  queryCollection('recipes')
    .where('tags', 'contains', props.tags)
    .all()
)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
    <NuxtLink 
      v-for="recipe in recipes" 
      :key="recipe.path" 
      :to="recipe.path"
      class="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <div class="h-48 bg-gray-200 overflow-hidden">
        <img :src="recipe.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg text-gray-900">{{ recipe.title }}</h3>
        <p class="text-sm text-gray-500 line-clamp-2">{{ recipe.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>