<script setup lang="ts">

// Query all recipes in your collection
const { data: recipes } = await useAsyncData('home-recipes', () => {
  return queryCollection('recipes').limit(4).all()
}, {
  // This ensures 'recipes' is [] initially and if the promise returns null/undefined
  default: () => [] 
})

const { data: trendingRecipes } = await useAsyncData('trending', () => {
  return queryCollection('recipes').where('categories', 'LIKE', '%trending%').all()
}, { default: () => [] });

const { data: breakfastRecipes } = await useAsyncData('breakfast', () => {
  return queryCollection('recipes').where('categories', 'LIKE', '%breakfast%').all()
}, { default: () => [] });

const categories = [
  { name: 'High Protein', img: 'high-protein_ozub93', link: '/categories/high-protein' },
  { name: 'Vegan', img: 'vegan_byepar', link: '/categories/vegan' },
  { name: 'Desserts', img: 'dessert_ciz4vp', link: '/categories/desserts' },
  { name: 'Dinner', img: 'dinner_jltkrm' , link: '/categories/dinner'},
  { name: '15 Minute meals', img: '15-minute-meals_wkmurj', link: '/categories/15-minute-meals' },
  { name: 'Air fryer', img: 'air-fryer_too3q1', link: '/categories/air-fryer' }
]

console.log('trendingRecipes',trendingRecipes.value)
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
      <h2>Latest Recipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.slug" 
          class="flex flex-col"
        >
          <RecipeCard :recipe="recipe" class="h-full" />
        </div>
      </div>

          <section class="border-y border-border py-6 my-12">
      <div class="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="cat.link" class="flex flex-col items-center group">
          <!-- <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ cat.icon }}</span> -->
          <div class="w-[150px] h-[100px]">
            <Img :src="cat.img" class="rounded-full" />
          </div>
          <span class="text-[12px] font-bold mt-1 uppercase tracking-tighter text-muted-foreground group-hover:text-emerald-500">{{ cat.name }}</span>
        </NuxtLink>
      </div>

    </section>

    

   <HomeMobileScroll 
      :recipes="trendingRecipes" 
      title="Trending This Week"
    />
  
    <HomeMobileScroll 
      :recipes="breakfastRecipes" 
      title="Breakfast Favorites"
      class="pt-6"
    />
        <!-- <HomeAboutMe /> -->
    </main>
  </div>
</template>