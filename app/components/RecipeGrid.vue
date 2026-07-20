<script setup>
const props = defineProps(['category', 'tags'])
const { locale } = useI18n()
const { data: recipes } = await useAsyncData(`fries-list-${locale.value}`, () => 
  queryCollection('recipes')
    .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    .where('tags', 'contains', props.tags)
    .all()
)

const { formatText } = useFormatText()
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
        <Img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg text-gray-900">{{ recipe.title }}</h3>
        <p class="text-sm text-gray-500 line-clamp-2" v-html="formatText(recipe.description)"></p>
      </div>
    </NuxtLink>
  </div>
</template>