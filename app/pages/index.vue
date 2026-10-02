<script setup lang="ts">
import { RECIPE_CATEGORIES } from '@/utils/constants'

const { t, locale } = useI18n()

// Query all recipes in your collection
const { data: homeData } = await useAsyncData(`home-data-${locale.value}`, async () => {
  try {
    const getQueryBuilder = (collectionVal: 'recipes' | 'collections') => {
      let b = queryCollection(collectionVal)
      if (locale.value === 'en') {
        b = b.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
      } else {
        b = b.where('path', 'LIKE', `%.${locale.value}`)
      }
      return b
    }

    const all = await getQueryBuilder('recipes').all()
    const latest = await getQueryBuilder('recipes').limit(4).all()
    
    const ninjaCreami = await getQueryBuilder('recipes')
      .where('categories', 'LIKE', '%ninjacreami%')
      .limit(4).all()

    const trending = await getQueryBuilder('recipes')
      .where('categories', 'LIKE', '%trending%')
      .limit(4).all()

    const airFryer = await getQueryBuilder('recipes')
      .where('categories', 'LIKE', '%airfryer%')
      .limit(4).all()

    const fifteenMin = await getQueryBuilder('recipes')
      .where('categories', 'LIKE', '%15minutemeals%')
      .limit(4).all()

    const topCollections = await getQueryBuilder('collections').all()

    const spotlight = trending.find(r => r.image) || latest[0] || null
    const editorial = all.find(r => r.image && r.slug !== spotlight?.slug && ((r.macros?.protein && r.macros.protein >= 25) || r.rating >= 4.7)) || latest[1] || null
    const photoStrip = all.filter(r => r.image).slice(0, 6)

    return {
      total: all.length,
      spotlightRecipe: spotlight,
      editorialRecipe: editorial,
      recipes: latest,
      trendingRecipes: trending,
      airFryerRecipes: airFryer,
      ninjaCreamiRecipes: ninjaCreami,
      fifteenMinRecipes: fifteenMin,
      topCollections: topCollections,
      photoStripRecipes: photoStrip
    }
  } catch (e) {
    console.error('Error fetching home data:', e)
    throw e
  }
}, {
  default: () => ({ total: 0, spotlightRecipe: null, editorialRecipe: null, recipes: [], trendingRecipes: [], airFryerRecipes: [], ninjaCreamiRecipes: [], fifteenMinRecipes: [], topCollections: [], photoStripRecipes: [] }) 
})

const spotlightRecipe = computed(() => homeData.value.spotlightRecipe)
const editorialRecipe = computed(() => homeData.value.editorialRecipe)
const recipes = computed(() => homeData.value.recipes)
const trendingRecipes = computed(() => homeData.value.trendingRecipes)
const airFryerRecipes = computed(() => homeData.value.airFryerRecipes)
const ninjaCreamiRecipes = computed(() => homeData.value.ninjaCreamiRecipes)
const fifteenMinRecipes = computed(() => homeData.value.fifteenMinRecipes)
const photoStripRecipes = computed(() => homeData.value.photoStripRecipes)
const totalInDb = computed(() => homeData.value.total)

const collections = computed(() => {
  return homeData.value.topCollections.map(collection => ({
    ...collection,
    slug: collection.slug || collection.path?.split('/').pop()
  }))
});


const localePath = useLocalePath()

const categories = computed(() => RECIPE_CATEGORIES.map(cat => ({
  ...cat,
  name: t(`categories.${cat.key}`),
  to: localePath({ name: 'categories-slug', params: { slug: t(`categorySlugs.${cat.key}`) } })
})))

const siteUrl = 'https://www.hotrecipes.co.uk'
const pageUrl = computed(() => {
  const path = localePath('/')
  return `${siteUrl}${path === '/' ? '' : path}`
})

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.ogTitle') || t('seo.home.title'),
  ogDescription: () => t('seo.home.ogDescription') || t('seo.home.description'),
  ogImage: 'https://www.hotrecipes.co.uk/cover.png',
  ogUrl: () => pageUrl.value || siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.ogTitle') || t('seo.home.title'),
  twitterDescription: () => t('seo.home.ogDescription') || t('seo.home.description'),
  twitterImage: 'https://www.hotrecipes.co.uk/cover.png'
})
</script>

<template>
  <div class="min-h-screen pt-4 sm:pt-8">
    <!-- Split Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
      <!-- Left Column: Copy & Quick Action Filters -->
      <div class="lg:col-span-7 flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/20 shadow-sm">
            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {{ t('home.hero.badge') }}
          </span>
          <div v-if="totalInDb > 0" class="text-xs font-bold text-muted-foreground">
            {{ t('home.hero.stats', { count: totalInDb }) }}
          </div>
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05]">
          {{ t('home.hero.title') }} <span class="text-emerald-500">{{ t('home.hero.highlight') }}</span>
        </h1>

        <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {{ t('home.hero.subtitle') }}
        </p>

        <!-- Quick Fuel Filter Pills -->
        <div class="flex flex-col gap-2.5 pt-2">
          <span class="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
            {{ t('home.hero.quickFilterLabel') }}
          </span>
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
            <NuxtLink
              :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.15minutemeals') } })"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-card hover:bg-emerald-500/10 hover:text-emerald-500 border border-border hover:border-emerald-500/30 shadow-sm shrink-0 transition-all"
            >
              <span>⚡</span>
              <span>&lt; 15 Mins</span>
            </NuxtLink>
            <NuxtLink
              :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.airfryer') } })"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-card hover:bg-amber-500/10 hover:text-amber-500 border border-border hover:border-amber-500/30 shadow-sm shrink-0 transition-all"
            >
              <span>💨</span>
              <span>Air Fryer</span>
            </NuxtLink>
            <NuxtLink
              :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.ninjacreami') } })"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-card hover:bg-teal-500/10 hover:text-teal-400 border border-border hover:border-teal-500/30 shadow-sm shrink-0 transition-all"
            >
              <span>🍨</span>
              <span>Ninja Creami</span>
            </NuxtLink>
            <NuxtLink
              :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.dinner') } })"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-card hover:bg-emerald-500/10 hover:text-emerald-500 border border-border hover:border-emerald-500/30 shadow-sm shrink-0 transition-all"
            >
              <span>🥘</span>
              <span>Dinners</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Right Column: Spotlight Recipe Card -->
      <div class="lg:col-span-5">
        <HomeHeroSpotlight :recipe="spotlightRecipe" />
      </div>
    </section>

    <!-- Core Standards Trust Banner -->
    <HomeValueBanner class="mb-16" />
    
    <!-- Categories Circle Nav -->
    <section class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-0">{{ t('nav.categories') }}</h2>
        <NuxtLink :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.allrecipes') } })" class="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
          {{ t('recipes.all') }} &rarr;
        </NuxtLink>
      </div>
      
      <div class="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <NuxtLink 
          v-for="cat in categories" 
          :key="cat.key"
          :to="cat.to"
          class="flex flex-col items-center gap-3 shrink-0 group"
        >
          <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-emerald-500 transition-all duration-300 shadow-2xl">
            <Img 
              :src="cat.image" 
              :alt="cat.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"/>
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
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-0">
          {{ t('recipes.latest') }}
        </h2>
        <NuxtLink :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.allrecipes') } })" class="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
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
        :view-all-link="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.allrecipes') } })"
        :view-all-text="t('recipes.all')"
      />
    </section>

    <!-- Editorial Feature Spotlight (Full-width 50/50 Recipe of the Week) -->
    <HomeEditorialFeature :recipe="editorialRecipe" />

    <!-- Appliance Bento Hub (Desktop: Editorial Bento Showcase) -->
    <div class="hidden md:block mb-16">
      <HomeApplianceBento
        v-if="airFryerRecipes.length > 0 || ninjaCreamiRecipes.length > 0"
        :air-fryer-recipes="airFryerRecipes"
        :ninja-creami-recipes="ninjaCreamiRecipes"
      />
    </div>

    <!-- Appliance Scrollers (Mobile: Wolt-Style Horizontal Rails) -->
    <div class="md:hidden space-y-16 mb-16">
      <MobileScroll 
        v-if="airFryerRecipes.length > 0"
        :recipes="airFryerRecipes" 
        :title="t('recipes.airFryer')"
        :view-all-link="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.airfryer') } })"
        :view-all-text="t('recipes.all')"
      />

      <MobileScroll 
        v-if="ninjaCreamiRecipes.length > 0"
        :recipes="ninjaCreamiRecipes" 
        :title="t('recipes.ninjaCreami')"
        :view-all-link="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.ninjacreami') } })"
        :view-all-text="t('recipes.all')"
      />
    </div>

    <!-- Trending Recipes Grid (Desktop) -->
    <section class="mb-16 hidden md:block">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-0">
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

    <!-- 15-Minute Meals Scroller -->
    <div v-if="fifteenMinRecipes.length > 0" class="mb-16">
      <MobileScroll 
        :recipes="fifteenMinRecipes" 
        :title="t('recipes.15minutemeals')"
        :view-all-link="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.15minutemeals') } })"
        :view-all-text="t('recipes.all')"
      />
    </div>

    <!-- Collections -->
    <MobileScroll 
      v-if="collections.length > 0"
      :collections="collections" 
      :title="t('recipes.collections')"
      :view-all-link="localePath({ name: 'collections' })"
      :view-all-text="t('recipes.allCollections')"
      class="mt-16"
    />

    <!-- Fresh from the Kitchen Flat-Lay Gallery -->
    <HomeInstagramStrip :recipes="photoStripRecipes" />

    <HomeAboutMe class="mt-20" />
  </div>
</template>