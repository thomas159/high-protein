<script setup lang="ts">
const appConfig = useAppConfig()
const currentYear = new Date().getFullYear()

const footerLinks = {
  content: [
    { name: 'All Recipes', path: '/categories/all-recipes' },
    { name: 'High Protein', path: '/categories/high-protein' },
    { name: 'Vegan', path: '/categories/vegan' }
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' }
  ]
}
</script>

<template>
  <footer class="bg-background border-t border-border mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div class="col-span-1 md:col-span-1">
          <NuxtLink to="/" class="text-xl font-bold text-foreground flex items-center gap-2">
            <span class="text-emerald-500 italic">{{ appConfig.siteName }}</span>
          </NuxtLink>
          <p class="mt-4 text-sm text-muted-foreground leading-relaxed">
            Making high-quality, chef-inspired recipes accessible to home cooks everywhere.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">Recipes</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.content" :key="link.path">
              <NuxtLink :to="link.path" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">Company</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.company" :key="link.path">
              <NuxtLink :to="link.path" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">Legal</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.legal" :key="link.path">
              <NuxtLink :to="link.path" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-muted-foreground">
          © {{ currentYear }} {{ appConfig.siteName }}. All rights reserved.
        </p>
        <div class="flex gap-6 grayscale opacity-60 hover:opacity-100 transition-opacity">
          </div>
      </div>
    </div>
  </footer>
</template>