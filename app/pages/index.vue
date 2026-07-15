<script setup lang="ts">
const { t, locale } = useI18n()

// Query all recipes in your collection
const { data: recipes } = await useAsyncData(`home-recipes-${locale.value}`, () => {
  return queryCollection('recipes')
    .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    .limit(4).all()
}, {
  // This ensures 'recipes' is [] initially and if the promise returns null/undefined
  default: () => [] 
})

const { data: trendingRecipes } = await useAsyncData(`trending-${locale.value}`, () => {
  return queryCollection('recipes')
    .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    .where('categories', 'LIKE', '%trending%').all()
}, { default: () => [] });

const { data: airFryerRecipes } = await useAsyncData(`airFryer-${locale.value}`, () => {
  return queryCollection('recipes')
    .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    .where('categories', 'LIKE', '%air-fryer%').limit(4).all()
}, { default: () => [] });

const { data: topCollections } = await useAsyncData(`top-collections-${locale.value}`, () => {
  return queryCollection('collections')
    .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    .all()
}, { default: () => [] });

const collections = computed(() => {
  return topCollections.value.map(collection => ({
    ...collection,
    slug: collection.slug || collection.path?.split('/').pop()
  }))
});


const categories = computed(() => [
  { name: t('categories.highProtein'), img: 'high-protein_ozub93', link: '/categories/high-protein' },
  { name: t('categories.vegan'), img: 'vegan_byepar', link: '/categories/vegan' },
  { name: t('categories.dessert'), img: 'dessert_ciz4vp', link: '/categories/dessert' },
  { name: t('categories.dinner'), img: 'dinner_jltkrm' , link: '/categories/dinner'},
  { name: t('categories.15min'), img: '15-minute-meals_wkmurj', link: '/categories/15-minute-meals' },
  { name: t('categories.airFryer'), img: 'air-fryer_too3q1', link: '/categories/air-fryer' }
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
    <main class="">

      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
      {{ t('home.hero.title') }} <span class="text-green-500">{{ t('home.hero.highlight') }}</span>
    </h1>
    
    <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
      {{ t('home.hero.subtitle') }}
    </p>
    <MobileScroll 
      :recipes="recipes" 
      :title="t('recipes.latest')"
    />

      <section class="border-y border-border py-6 my-12">
      <div class="container mx-auto flex flex-wrap justify-center gap-4 md:gap-16">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="localePath(cat.link)" class="flex flex-col items-center group">
          <!-- <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ cat.icon }}</span> -->
          <div class="w-[150px] h-[100px]">
            <Img :src="cat.img" :alt="cat.name" class="rounded-full" />
          </div>
          <span class="text-[12px] font-bold mt-1 uppercase tracking-tighter text-muted-foreground group-hover:text-emerald-500">{{ cat.name }}</span>
        </NuxtLink>
      </div>

    </section>
    <!-- top 5 collections -->
    <MobileScroll 
      :collections="collections" 
      :title="t('recipes.collections')"
      class="pt-6"
    />

   <MobileScroll 
      :recipes="trendingRecipes" 
      :title="t('recipes.trending')"
      class="pt-6"
    />
  
    <MobileScroll 
      :recipes="airFryerRecipes" 
      :title="t('recipes.airFryer')"
      class="pt-6"
    />

    <HomeAboutMe />
    </main>
  </div>
</template>