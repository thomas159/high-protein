<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
/**
 * APP CONFIG & ANALYTICS
 */
const { siteName, siteDescription } = useAppConfig()
// grantConsent is now pulled in to be used in the template
const { checkConsent, grantConsent, status } = useAnalytics()
// 1. Check if they already accepted in a previous session
onMounted(() => {
  checkConsent()
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

/**
 * HEAD & SCRIPTS
 */
useHead(() => ({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir
  },
  meta: [
    { name: 'p:domain_verify', content: 'e4bd68dbe0b0482e0504097aa8617742' },
    { name: 'google-adsense-account', content: 'ca-pub-9057939602568225' },
    ...(head.value.meta || [])
  ],

  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ...(head.value.link || [])
  ],

  script: [
    { src: 'https://cmp.gatekeeperconsent.com/min.js', 'data-cfasync': 'false', defer: true },
    { src: 'https://the.gatekeeperconsent.com/cmp.min.js', 'data-cfasync': 'false', defer: true },
    { src: 'https://www.ezojs.com/ezoic/sa.min.js', async: true, defer: true },
    { innerHTML: 'window.ezstandalone = window.ezstandalone || {};\n    ezstandalone.cmd = ezstandalone.cmd || [];' },
    { src: 'https://ezoicanalytics.com/analytics.js', async: true, defer: true }
  ]
}))

/**
 * SEO & SOCIAL MEDIA
 */
// Site-wide defaults only. Every page sets its own title, description and og:url
// (og:url / canonical are generated per-route by @nuxtjs/seo), so nothing page-specific lives here.
useSeoMeta({
  ogImage: 'https://www.hotrecipes.co.uk/cover.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://www.hotrecipes.co.uk/cover.png',
})

useSchemaOrg([
  // 1. Defines the site structure
  defineWebSite({
    name: 'Hot Recipes',
    description: 'Build Muscle, Not Dishes',
  }),
  // 2. Defines the WebPage as the default for all routes
  defineWebPage(),
  // 3. Author identity (E-E-A-T) is configured once as the site identity in nuxt.config (schemaOrg.identity)
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />

      <ClientOnly>
        <div 
          v-if="status === 'awaiting'" 
          class="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 rounded-lg max-w-sm"
        >
          <p class="text-sm mb-3">
            {{ $t('cookieBanner.appMessage') }}
          </p>
          <div class="flex gap-2">
            <UButton 
              :label="$t('cookieBanner.appAccept')" 
              color="primary" 
              size="sm" 
              @click="grantConsent" 
            />
            <UButton 
              :label="$t('cookieBanner.appDecline')" 
              variant="ghost" 
              size="sm" 
              @click="status = 'skipped'" 
            />
          </div>
        </div>
      </ClientOnly>
      <SpeedInsights />
    </NuxtLayout>
  </UApp>
</template>