<script setup lang="ts">
import { RECIPE_CATEGORIES } from '@/utils/constants'

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
    

    const ninjaCreami = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', '%ninjacreami%')
      .limit(4).all()

    const trending = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', '%trending%')
      .limit(4).all()

    const airFryer = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', '%airfryer%')
      .limit(4).all()

    const fifteenMin = await queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      .where('categories', 'LIKE', '%15minutemeals%')
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
      fifteenMinRecipes: fifteenMin,
      topCollections: topCollections
    }
  } catch (e) {
    console.error('Error fetching home data:', e)
    throw e
  }
}, {
  default: () => ({ total: 0, recipes: [], trendingRecipes: [], airFryerRecipes: [], ninjaCreamiRecipes: [], fifteenMinRecipes: [], topCollections: [] }) 
})

const recipes = computed(() => homeData.value.recipes)
const trendingRecipes = computed(() => homeData.value.trendingRecipes)
const airFryerRecipes = computed(() => homeData.value.airFryerRecipes)
const ninjaCreamiRecipes = computed(() => homeData.value.ninjaCreamiRecipes)
const fifteenMinRecipes = computed(() => homeData.value.fifteenMinRecipes)
const totalInDb = computed(() => homeData.value.total)

const collections = computed(() => {
  return homeData.value.topCollections.map(collection => ({
    ...collection,
    slug: collection.slug || collection.path?.split('/').pop()
  }))
});


const categories = computed(() => RECIPE_CATEGORIES.map(cat => ({
  ...cat,
  name: t(`categories.${cat.key}`),
  link: `/categories/${t(`categorySlugs.${cat.key}`)}`
})))


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
  <div class="min-h-screen pt-8">
    <div class="flex flex-col gap-4 mb-16">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
        {{ t('home.hero.title') }} <span class="text-emerald-500">{{ t('home.hero.highlight') }}</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
        {{ t('home.hero.subtitle') }}
      </p>
      <div v-if="totalInDb > 0" class="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest w-fit border border-emerald-500/20 shadow-xl">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        {{ t('home.hero.stats', { count: totalInDb }) }}
      </div>
    </div>
    
    <!-- Categories Circle Nav -->
    <section class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-0">{{ t('nav.categories') }}</h2>
        <NuxtLink :to="localePath('/categories/all-recipes')" class="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
          {{ t('recipes.all') }} &rarr;
        </NuxtLink>
      </div>
      
      <div class="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <NuxtLink 
          v-for="cat in categories" 
          :key="cat.key"
          :to="localePath(cat.link)"
          class="flex flex-col items-center gap-3 shrink-0 group"
        >
          <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-emerald-500 transition-all duration-300 shadow-2xl">
            <Img 
              :src="cat.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
            {{ cat.name }}
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- Latest Recipes Grid (Desktop) -->
    <section class="mb-16 hidden md:block">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-0">
          {{ t('recipes.latest') }}
        </h2>
        <NuxtLink :to="localePath('/categories/all-recipes')" class="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
          {{ t('recipes.all') }} &rarr;
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <RecipeCard 
          v-for="recipe in recipes" 
          :key="recipe.path" 
          :recipe="recipe" 
        />
      </div>
    </section>

    <!-- Latest Recipes Scroll (Mobile) -->
    <section class="mb-16 md:hidden">
      <MobileScroll 
        :recipes="recipes" 
        :title="t('recipes.latest')"
        :view-all-link="localePath('/categories/all-recipes')"
        :view-all-text="t('recipes.all')"
      />
    </section>

    <!-- Trending Recipes Grid (Desktop) -->
    <section class="mb-16 hidden md:block">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-0">
          {{ t('recipes.trending') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <RecipeCard 
          v-for="recipe in trendingRecipes" 
          :key="recipe.path" 
          :recipe="recipe" 
        />
      </div>
    </section>

    <!-- Mobile Trending -->
    <section class="mb-16 md:hidden">
      <MobileScroll 
        v-if="trendingRecipes.length > 0"
        :recipes="trendingRecipes" 
        :title="t('recipes.trending')"
      />
    </section>

    <!-- Specialty Scrollers -->
    <div class="space-y-16">
      <MobileScroll 
        v-if="fifteenMinRecipes.length > 0"
        :recipes="fifteenMinRecipes" 
        :title="t('recipes.15minutemeals')"
        :view-all-link="localePath(`/categories/${t('categorySlugs.15minutemeals')}`)"
        :view-all-text="t('recipes.all')"
      />

      <MobileScroll 
        v-if="airFryerRecipes.length > 0"
        :recipes="airFryerRecipes" 
        :title="t('recipes.airFryer')"
        :view-all-link="localePath(`/categories/${t('categorySlugs.airfryer')}`)"
        :view-all-text="t('recipes.all')"
      />

      <MobileScroll 
        v-if="ninjaCreamiRecipes.length > 0"
        :recipes="ninjaCreamiRecipes" 
        :title="t('recipes.ninjaCreami')"
        :view-all-link="localePath(`/categories/${t('categorySlugs.ninjacreami')}`)"
        :view-all-text="t('recipes.all')"
      />
    </div>

    <!-- Collections -->
    <MobileScroll 
      v-if="collections.length > 0"
      :collections="collections" 
      :title="t('recipes.collections')"
      class="mt-16"
    />

    <HomeAboutMe class="mt-20" />
  </div>
</template>