<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

// Fetch the specific markdown document for this collection
const { data: page } = await useAsyncData(route.path, async () => {
  const slugParam = route.params.slug as string
  // First, check if there's a collection matching the custom frontmatter slug
  const bySlug = await queryCollection('collections').where('slug', '=', slugParam).first()
  if (bySlug) return bySlug
  
  // Fallback to checking the file path directly
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

    <!-- Listicle layout for rich content -->
    <div class="space-y-12">
      <div v-for="item in collectionItems" :key="item.slug" class="relative flex flex-col md:flex-row gap-6 md:gap-8 bg-card rounded-3xl border border-border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
        
        <!-- Number Badge -->
        <div class="absolute -top-4 -left-4 md:-top-5 md:-left-5 z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-500 text-white font-black text-xl md:text-2xl shadow-sm border-4 border-background">
          {{ item.index }}
        </div>

        <!-- Image -->
        <NuxtLink :to="`/recipes/${item.recipe.slug}`" :aria-label="item.recipe.title" class="w-full md:w-2/5 shrink-0 h-64 md:h-auto rounded-2xl overflow-hidden relative block">
          <Img :src="item.recipe.image" :alt="item.recipe.alt" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        </NuxtLink>

        <!-- Content -->
        <div class="flex flex-col justify-center flex-1 py-2 pr-2">
          <h2 class="text-2xl md:text-3xl font-bold font-display mb-3 leading-tight group">
            <NuxtLink :to="`/recipes/${item.recipe.slug}`" class="hover:text-emerald-500 transition-colors">
              {{ item.recipe.title }}
            </NuxtLink>
          </h2>
          
          <p class="text-muted-foreground text-lg mb-6 leading-relaxed">
            {{ item.recipe.description }}
          </p>
          
          <div class="flex flex-wrap gap-4 items-center text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 border-y border-border/50 py-3">
            <div class="flex items-center gap-1.5" v-if="item.recipe.prepTimeMins !== undefined"><span class="opacity-70">⏱</span> {{ item.recipe.prepTimeMins + item.recipe.cookTimeMins }} MINS</div>
            <div class="flex items-center gap-1.5" v-if="item.recipe.macros?.calories"><span class="opacity-70">🔥</span> {{ item.recipe.macros?.calories }} KCAL</div>
            <div class="flex items-center gap-1.5" v-if="item.recipe.macros?.protein"><span class="opacity-70">💪</span> {{ item.recipe.macros?.protein }}G Protein</div>
          </div>

          <NuxtLink :to="`/recipes/${item.recipe.slug}`" class="mt-auto inline-flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-6 py-3 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors w-full md:w-fit">
            Get Recipe &rarr;
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-16">
    <h2 class="text-2xl font-semibold mb-2">Collection not found</h2>
    <NuxtLink to="/" class="text-emerald-500 hover:underline">Return home</NuxtLink>
  </div>
</template>