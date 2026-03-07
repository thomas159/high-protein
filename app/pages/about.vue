<script setup lang="ts">
// SEO Metadata
useHead({
  title: 'About Flavor Feast - Our Story & Mission',
  meta: [
    { name: 'description', content: 'Learn more about the passion behind Flavor Feast and how we create our recipes.' }
  ]
})

const stats = [
  { label: 'Recipes', value: '500+' },
  { label: 'Home Cooks', value: '10k+' },
  { label: 'Kitchen Tips', value: '100+' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <section class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        Cooking Should Be <span class="text-emerald-500">Simple</span> & Joyful
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed">
        Flavor Feast started in a tiny kitchen with one goal: to make high-quality, 
        chef-inspired recipes accessible to everyone, regardless of their skill level 
        or dietary preferences.
      </p>
    </section>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div class="rounded-2xl overflow-hidden bg-muted aspect-square">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
          alt="Chef cooking" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-foreground">Our Philosophy</h2>
        <p class="text-muted-foreground">
          We believe that food is more than just fuel—it's a way to connect with 
          culture, family, and yourself. That's why every recipe on this site is 
          tested multiple times to ensure it works in <strong>your</strong> kitchen.
        </p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Focus on whole, seasonal ingredients</span>
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

    <section class="grid grid-cols-3 gap-4 py-10 border-y border-border mb-16">
      <div v-for="stat in stats" :key="stat.label" class="text-center">
        <div class="text-2xl md:text-3xl font-bold text-foreground">{{ stat.value }}</div>
        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </section>

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