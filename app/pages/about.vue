<script setup lang="ts">
const appConfig = useAppConfig()
// SEO Metadata
useHead({
  title: `About ${appConfig.siteName} - Our Story & Mission`,
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
        Cooking Should Be <span class="text-emerald-500">Efficient</span> & Powerful
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed">
        {{ appConfig.siteName }} started with a simple mission: to prove that high-protein, plant-based eating doesn't require hours in the kitchen or a background in culinary school. We create fast, macro-friendly vegetarian and vegan meals designed to fuel your life without the wait, making healthy living the easiest part of your day.
      </p>
    </section>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div class="rounded-2xl overflow-hidden bg-muted aspect-square">
       <Img 
          src="about_unqxs9" 
          alt="Chef cooking" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-foreground">Our Philosophy</h2>
        <p class="text-muted-foreground">
          We believe that high-protein eating shouldn't be a second job—it's the fuel that powers your best self. That's why every recipe on this site is engineered for speed and tested multiple times to ensure you get a perfect, macro-balanced meal in your kitchen, every single time.
        </p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Focus on quick, easy to cook meals</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Clear, step-by-step instructions</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Options for Vegan, High-Protein, and more</span>
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
        Dive into our latest collection and find your next favorite meal.
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