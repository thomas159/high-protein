<script setup lang="ts">
const appConfig = useAppConfig()
// SEO Metadata
useHead({
  title: `About ${appConfig.siteName} - My Story & Mission`,
  meta: [
    { name: 'description', content: `Learn more about the passion behind ${appConfig.siteName } and how we create our recipes.` }
  ]
})

const stats = [
  { label: 'Recipes', value: '50+' },
  { label: 'Home Cooks', value: '10k+' },
  { label: 'Kitchen Tips', value: '100+' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <section class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        Code, Lift, and <span class="text-emerald-500">Cook</span>
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed">
        I'm a software developer with a serious passion for the gym, sports, and cooking. As a vegetarian, I know firsthand that getting enough protein to fuel an active lifestyle isn't always easy. I created {{ appConfig.siteName }} to solve that problem, sharing the absolute best high-protein vegetarian and vegan recipes I've crafted to hit my macros without sacrificing flavor.
      </p>
    </section>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div class="rounded-2xl overflow-hidden bg-muted aspect-square">
       <img 
          src="/images/tom-gym.avif" 
          alt="photo of Tom at the gym" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-foreground">Why I Built This Site</h2>
        <p class="text-muted-foreground">
          As a developer, I was fed up with browsing recipes on slow, clunky WordPress blogs that offered a terrible user experience and endless scrolling. I wanted a lightning-fast, seamless platform focused entirely on what matters: the food. So, I put my engineering skills to use and built the exact recipe site I wanted to use.
        </p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>High-protein vegetarian & vegan meals</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Lightning-fast, modern user experience</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Clear, macro-friendly recipes without the fluff</span>
          </li>
            <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All recipes are tested by me to ensure they are high quality</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- <section class="grid grid-cols-3 gap-4 py-10 border-y border-border mb-16">
      <div v-for="stat in stats" :key="stat.label" class="text-center">
        <div class="text-2xl md:text-3xl font-bold text-foreground">{{ stat.value }}</div>
        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </section> -->

    <section class="bg-muted rounded-3xl p-8 md:p-12 text-center">
      <h2 class="text-2xl font-bold mb-4">Ready to start cooking?</h2>
      <p class="text-muted-foreground mb-8">
        Dive into the latest collection of recipes from {{ appConfig.siteName }} and find your next favorite meal.
      </p>
      <NuxtLink 
        to="/categories/all-recipes" 
        class="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Browse All Recipes
      </NuxtLink>
    </section>
  </div>
</template>