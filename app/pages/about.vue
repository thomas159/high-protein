<script setup lang="ts">
const appConfig = useAppConfig()
// SEO Metadata
useHead({
  link: [{ rel: 'canonical', href: 'https://www.hotrecipes.co.uk/about' }]
})

useSeoMeta({
  title: `About ${appConfig.siteName} - My Story & Mission`,
  description: `Learn more about the passion behind ${appConfig.siteName} and how we create our recipes.`,
  ogTitle: `About ${appConfig.siteName} - My Story & Mission`,
  ogDescription: `Learn more about the passion behind ${appConfig.siteName} and how we create our recipes.`,
  twitterTitle: `About ${appConfig.siteName} - My Story & Mission`,
  twitterDescription: `Learn more about the passion behind ${appConfig.siteName} and how we create our recipes.`,
  twitterCard: 'summary_large_image'
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

    <div class="grid md:grid-cols-2 gap-12 items-start mb-16">
      <div class="space-y-6">
        <div class="rounded-2xl overflow-hidden bg-muted aspect-square">
         <img 
            src="/images/tom-gym.avif" 
            alt="Tom, creator of Hot Recipes, at the gym" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Social Media Links -->
        <div class="flex justify-center gap-6 pt-2">
          <a href="https://www.pinterest.com/hotRecipesUk" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-emerald-500 transition-colors" aria-label="Pinterest">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.625 0 12.017 0z"/></svg>
          </a>
        </div>
      </div>
      
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-foreground">The Story Behind {{ appConfig.siteName }}</h2>
        <p class="text-muted-foreground">
          My journey started in the gym. I was lifting heavy and trying to build muscle, but as a vegetarian, I was constantly struggling to hit my daily protein goals. Chicken and rice wasn't an option, and I was tired of relying on protein shakes. I needed real, delicious food that actually fueled my workouts.
        </p>
        <p class="text-muted-foreground">
          I started experimenting in the kitchen, turning classic comfort foods into macro-friendly, high-protein meals. Friends at the gym started asking for my recipes, and I realized there was a huge gap for plant-based athletes.
        </p>
        <p class="text-muted-foreground">
          But as a software developer, I was frustrated by the recipe sites out there. They were slow, bloated with ads, and forced you to scroll past a life story just to find the ingredients. I wanted a lightning-fast, seamless platform focused entirely on what matters: the food.
        </p>
        <p class="text-muted-foreground font-medium">
          So, I put my engineering skills to use and built the exact recipe site I wanted to use. Here's what you can expect from {{ appConfig.siteName }}:
        </p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>High-protein vegetarian & vegan meals that actually taste good</span>
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
            <span>All recipes are personally tested by me in my own kitchen</span>
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