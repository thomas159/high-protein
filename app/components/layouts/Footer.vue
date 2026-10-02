<script setup lang="ts">
import { RECIPE_CATEGORIES } from '~/utils/constants'
const appConfig = useAppConfig()
const { t } = useI18n()
const currentYear = new Date().getFullYear()

const localePath = useLocalePath()

const footerLinks = computed(() => ({
  content: [
    ...RECIPE_CATEGORIES.map(cat => {
      const translatedSlug = t(`categorySlugs.${cat.key}`)
      return {
        name: t(`categories.${cat.key}`),
        to: localePath({ name: 'categories-slug', params: { slug: translatedSlug } })
      }
    }),
    {
      name: t('recipes.collections'),
      to: localePath({ name: 'collections' })
    }
  ],
  company: [
    { name: t('footer.links.aboutMe'), to: localePath('/about') },
    { name: t('footer.links.contact'), to: localePath('/contact') }
  ],
  legal: [
    { name: t('footer.links.privacy'), to: localePath('/privacy-policy') },
    { name: t('footer.links.terms'), to: localePath('/terms-of-service') }
  ]
}))
</script>

<template>
  <footer class="bg-background border-t border-border mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div class="col-span-1 md:col-span-1">
          <NuxtLink :to="localePath('/')" class="text-xl font-bold text-foreground flex items-center gap-2" aria-label="Homepage">
            <span class="text-emerald-500 italic">{{ appConfig.siteName }}</span>
          </NuxtLink>
          <p class="mt-4 text-sm text-muted-foreground leading-relaxed">
            {{ $t('footer.description') }}
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">{{ $t('footer.sections.recipes') }}</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.content" :key="link.name">
              <NuxtLink :to="link.to" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">{{ $t('footer.sections.company') }}</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.company" :key="link.name">
              <NuxtLink :to="link.to" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">{{ $t('footer.sections.legal') }}</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <NuxtLink :to="link.to" class="text-muted-foreground hover:text-emerald-500 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-muted-foreground">
          © {{ currentYear }} {{ appConfig.siteName }}. {{ $t('footer.rights') }}
        </p>
        <div class="flex gap-6 grayscale opacity-60 hover:opacity-100 transition-opacity"/>
      </div>
    </div>
  </footer>
</template>