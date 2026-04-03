<script setup lang="ts">
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

/**
 * HEAD & SCRIPTS
 */
useHead({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
  meta: [
    { name: 'p:domain_verify', content: 'e4bd68dbe0b0482e0504097aa8617742' },
    { name: 'description', content: siteDescription },
    { name: 'google-adsense-account', content: 'ca-pub-9057939602568225' }
  ],

  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

/**
 * SEO & SOCIAL MEDIA
 */
useSeoMeta({
  title: 'Build Muscle, Not Dishes | High-Protein Vegetarian and vegan Recipes',
  description: 'Quick, high-protein vegetarian and vegan meals for people who love to eat but hate to wait.',
  ogTitle: 'Build Muscle, Not Dishes | Plant-Based Fitness Recipes',
  ogDescription: 'Stop washing dishes and start hitting your macros with our 5-minute vegan recipes.',
  ogImage: 'https://www.hotrecipes.co.uk/social-share-cover.png',
  ogUrl: 'https://www.hotrecipes.co.uk',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
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
            We use cookies to see if our high-protein recipes are actually helping people gain muscle. Cool?
          </p>
          <div class="flex gap-2">
            <UButton 
              label="Accept & Cook" 
              color="primary" 
              size="sm" 
              @click="grantConsent" 
            />
            <UButton 
              label="No thanks" 
              variant="ghost" 
              size="sm" 
              @click="status = 'skipped'" 
            />
          </div>
        </div>
      </ClientOnly>

    </NuxtLayout>
  </UApp>
</template>