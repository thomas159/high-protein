<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

// Fetch the specific markdown document for this collection
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('collections').path(route.path).first()
})

// Fetch all recipes that match the slugs listed in the collection's frontmatter
const { data: recipes } = await useAsyncData(`${route.path}-recipes`, async () => {
  if (!page.value?.recipes?.length) return []
  const slugs = page.value.recipes.map((r: any) => r.slug)
  return queryCollection('recipes').where('slug', 'IN', slugs).all()
})

// Merge the custom text from the collection with the actual recipe data
const collectionItems = computed(() => {
  if (!page.value?.recipes || !recipes.value) return []
  return page.value.recipes.map((collectionItem: any, index: number) => {
    const recipeData = recipes.value?.find((r: any) => r.slug === collectionItem.slug)
    return { ...collectionItem, recipe: recipeData, index: index + 1 }
  }).filter((item: any) => item.recipe) // ensure the recipe was found
})

// SEO Metadata
useSeoMeta({
  title: page.value?.title ? `${page.value.title} - ${appConfig.siteName}` : appConfig.siteName,
  description: page.value?.description
})
</script>

<template>
  <div v-if="page" class="max-w-5xl mx-auto px-4 py-12">
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        {{ page.description }}
      </p>
    </header>

    <!-- Standard Vue native grid replacing ContentRenderer -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
      <div v-for="item in collectionItems" :key="item.slug" class="flex flex-col gap-4 h-full">
        
        <!-- Render the visual Recipe Card -->
        <div class="w-full shrink-0">
          <RecipeCard :recipe="item.recipe" />
        </div>
        
        <!-- Custom paragraph from the collection frontmatter -->
        <div class="flex-1 w-full mt-2">
          <h3 class="text-2xl font-bold mb-2 text-foreground">
            {{ item.index }}. {{ item.recipe.title }}
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-16">
    <h2 class="text-2xl font-semibold mb-2">Collection not found</h2>
    <NuxtLink to="/" class="text-emerald-500 hover:underline">Return home</NuxtLink>
  </div>
</template>