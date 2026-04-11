<script setup lang="ts">

// Query all recipes in your collection
const { data: recipes } = await useAsyncData('home-recipes', () => {
  return queryCollection('recipes').
  limit(4).all()
}, {
  // This ensures 'recipes' is [] initially and if the promise returns null/undefined
  default: () => [] 
})

const { data: trendingRecipes } = await useAsyncData('trending', () => {
  return queryCollection('recipes').where('categories', 'LIKE', '%trending%').all()
}, { default: () => [] });

const { data: airFryerRecipes } = await useAsyncData('airFryer', () => {
  return queryCollection('recipes').where('categories', 'LIKE', '%air-fryer%').limit(4).all()
}, { default: () => [] });

const { data: topCollections } = await useAsyncData('top-collections', () => {
  return queryCollection('collections').all()
}, { default: () => [] });

const collections = computed(() => {
  return topCollections.value.map(collection => ({
    ...collection,
    slug: collection.slug || collection.path?.split('/').pop()
  }))
});

const categories = [
  { name: 'High Protein', img: 'high-protein_ozub93', link: '/categories/high-protein' },
  { name: 'Vegan', img: 'vegan_byepar', link: '/categories/vegan' },
  { name: 'Dessert', img: 'dessert_ciz4vp', link: '/categories/dessert' },
  { name: 'Dinner', img: 'dinner_jltkrm' , link: '/categories/dinner'},
  { name: '15 Minute meals', img: '15-minute-meals_wkmurj', link: '/categories/15-minute-meals' },
  { name: 'Air fryer', img: 'air-fryer_too3q1', link: '/categories/air-fryer' }
]

useSeoMeta({
  title: 'Build Muscle, Not Dishes | High-Protein Vegetarian and Vegan Recipes',
  description: 'Quick, high-protein vegetarian and vegan meals for people who love to eat but hate to wait.',
  ogTitle: 'Build Muscle, Not Dishes | High-Protein Vegetarian and Vegan Recipes',
  ogDescription: 'Stop washing dishes and start hitting your macros with our high protein vegetarian recipes.',
  ogImage: 'https://www.hotrecipes.co.uk/images/logo.avif',
  ogUrl: 'https://www.hotrecipes.co.uk',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Build Muscle, Not Dishes | High-Protein Vegetarian and Vegan Recipes',
  twitterDescription: 'Stop washing dishes and start hitting your macros with our high protein vegetarian recipes.',
  twitterImage: 'https://www.hotrecipes.co.uk/images/logo.avif'
})
</script>

<template>
  <div class="min-h-screen">
    <main class="">

      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
      Build Muscle, <span class="text-green-500">Not Dishes.</span>
    </h1>
    
    <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
      Quick, high-protein vegetarian and vegan meals for people who love to eat but hate to wait.
    </p>
    <HomeMobileScroll 
      :recipes="recipes" 
      title="Latest Recipes"
    />

      <section class="border-y border-border py-6 my-12">
      <div class="container mx-auto flex flex-wrap justify-center gap-4 md:gap-16">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="cat.link" class="flex flex-col items-center group">
          <!-- <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ cat.icon }}</span> -->
          <div class="w-[150px] h-[100px]">
            <Img :src="cat.img" class="rounded-full" />
          </div>
          <span class="text-[12px] font-bold mt-1 uppercase tracking-tighter text-muted-foreground group-hover:text-emerald-500">{{ cat.name }}</span>
        </NuxtLink>
      </div>

    </section>
    <!-- top 5 collections -->
    <HomeMobileScroll 
      :collections="collections" 
      title="Recipe Collections"
      class="pt-6"
    />

   <HomeMobileScroll 
      :recipes="trendingRecipes" 
      title="Trending This Week"
      class="pt-6"
    />
  
    <HomeMobileScroll 
      :recipes="airFryerRecipes" 
      title="Air fryer Recipes"
      class="pt-6"
    />

    <HomeAboutMe />
    </main>
  </div>
</template>