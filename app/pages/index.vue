<script setup lang="ts">
const { t, locale } = useI18n()

// Query all recipes in your collection
const { data: homeData, error: recipesError } = await useAsyncData(`home-data-${locale.value}`, async () => {
  try {
    const all = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .all()
    const latest = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .limit(4).all()
    
    // Determine the category strings based on locale
    const trendingSlug = locale.value === 'es' ? 'tendencia' : 'trending'
    const airFryerSlug = locale.value === 'es' ? 'air-fryer' : 'air-fryer'

    const ninjaCreami = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('path', 'LIKE', '%ninja%')
      .limit(4).all()

    const trending = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', `%${trendingSlug}%`)
      .limit(4).all()

    const airFryer = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', `%${airFryerSlug}%`)
      .limit(4).all()

    const topCollections = await queryCollection('collections')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .all()

    return {
      total: all.length,
      recipes: latest,
      trendingRecipes: trending,
      airFryerRecipes: airFryer,
      ninjaCreamiRecipes: ninjaCreami,
      topCollections: topCollections
    }
  } catch (e) {
    console.error('Error fetching home data:', e)
    throw e
  }
}, {
  default: () => ({ total: 0, recipes: [], trendingRecipes: [], airFryerRecipes: [], ninjaCreamiRecipes: [], topCollections: [] }) 
})

const recipes = computed(() => homeData.value.recipes)
const trendingRecipes = computed(() => homeData.value.trendingRecipes)
const airFryerRecipes = computed(() => homeData.value.airFryerRecipes)
const ninjaCreamiRecipes = computed(() => homeData.value.ninjaCreamiRecipes)
const totalInDb = computed(() => homeData.value.total)

const collections = computed(() => {
  return homeData.value.topCollections.map(collection => ({
    ...collection,
    slug: collection.slug || collection.path?.split('/').pop()
  }))
});


const categories = computed(() => [
  { name: t('categories.highProtein'), img: 'high-protein_ozub93', link: `/categories/${t('categorySlugs.highprotein')}` },
  { name: t('categories.vegan'), img: 'vegan_byepar', link: `/categories/${t('categorySlugs.vegan')}` },
  { name: t('categories.dessert'), img: 'dessert_ciz4vp', link: `/categories/${t('categorySlugs.dessert')}` },
  { name: t('categories.dinner'), img: 'dinner_jltkrm' , link: `/categories/${t('categorySlugs.dinner')}`},
  { name: t('categories.15min'), img: '15-minute-meals_wkmurj', link: `/categories/${t('categorySlugs.15min')}` },
  { name: t('categories.airFryer'), img: 'air-fryer_too3q1', link: `/categories/${t('categorySlugs.airfryer')}` }
])

// SEO handled by app.vue and useSeoMeta below


useSeoMeta({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  ogTitle: t('seo.home.title'),
  ogDescription: t('seo.home.description'),
  ogImage: 'https://www.hotrecipes.co.uk/images/logo.avif',
  ogUrl: 'https://www.hotrecipes.co.uk',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.home.title'),
  twitterDescription: t('seo.home.description'),
  twitterImage: 'https://www.hotrecipes.co.uk/images/logo.avif'
})
const localePath = useLocalePath()
</script>

<template>
  <div class="min-h-screen">
    <div class="flex flex-col gap-4 mb-12">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
        {{ t('home.hero.title') }} <span class="text-green-500">{{ t('home.hero.highlight') }}</span>
      </h1>
      <p class="text-lg md:text-xl text-muted-foreground max-w-2xl">
        {{ t('home.hero.subtitle') }}
      </p>
      <div v-if="totalInDb > 0" class="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit border border-emerald-500/20 shadow-sm">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        {{ t('home.hero.stats', { count: totalInDb }) }}
      </div>
    </div>
    
    <!-- Latest Recipes Grid (Desktop) -->
    <section class="mb-12 hidden md:block">
      <h2 class="font-display text-3xl md:text-5xl font-bold mb-6">
        {{ t('recipes.latest') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RecipeCard 
          v-for="recipe in recipes" 
          :key="recipe.path" 
          :recipe="recipe" 
        />
      </div>
    </section>

    <!-- Latest Recipes Scroll (Mobile) -->
    <section class="mb-12 md:hidden">
      <MobileScroll 
        :recipes="recipes" 
        :title="t('recipes.latest')"
      />
    </section>

    <MobileScroll 
      v-if="ninjaCreamiRecipes.length > 0"
      :recipes="ninjaCreamiRecipes" 
      :title="t('recipes.ninjaCreami')"
      class="pt-6"
    />

    <!-- Categories -->
    <section class="border-y border-border py-6 my-12">
      <div class="container mx-auto flex flex-wrap justify-center gap-4 md:gap-16">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="localePath(cat.link)" class="flex flex-col items-center group">
          <div class="w-[150px] h-[100px]">
            <Img :src="cat.img" :alt="cat.name" class="rounded-full" />
          </div>
          <span class="text-sm font-bold mt-1 uppercase tracking-tighter text-muted-foreground group-hover:text-emerald-500">{{ cat.name }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Collections -->
    <MobileScroll 
      :collections="collections" 
      :title="t('recipes.collections')"
      class="pt-6"
    />

    <!-- Trending Spotlight -->
    <section class="mb-12 pt-6 md:hidden">
      <MobileScroll 
        :recipes="trendingRecipes" 
        :title="t('recipes.trending')"
      />
    </section>

    <section class="mb-12 pt-6 hidden md:block">
      <h2 class="font-display text-3xl md:text-5xl font-bold mb-6">
        {{ t('recipes.trending') }}
      </h2>
      <div class="grid grid-cols-3 gap-6">
        <RecipeCard 
          v-if="trendingRecipes[0]"
          :recipe="trendingRecipes[0]" 
          :high="true"
          class="col-span-1"
        />
        <div class="col-span-2 grid grid-cols-2 gap-6">
          <RecipeCard 
            v-for="recipe in trendingRecipes.slice(1, 4)" 
            :key="recipe.path" 
            :recipe="recipe" 
          />
        </div>
      </div>
    </section>
  
    <MobileScroll 
      :recipes="airFryerRecipes" 
      :title="t('recipes.airFryer')"
      class="pt-6"
    />

    <HomeAboutMe />

  </div>
</template>