<script setup lang="ts">
const { siteName, siteDescription } = useAppConfig()
const { checkConsent, scriptsEnabled } = useAnalytics()

onMounted(() => {
  // This will fire scripts immediately if 'accepted' is in localStorage
  checkConsent()
})
useHead({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
  noscript: computed(() => {
    if (!scriptsEnabled.value) return []
    return [
      {
        children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WHMK6XD7" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        body: true // This forces it to the top of the body
      }
    ]
  }),
  meta: [
    // Pinterest Domain Verification
    { name: 'p:domain_verify', content: 'e4bd68dbe0b0482e0504097aa8617742' },
    
    // Standard Description
    { name: 'description', content: siteDescription }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

useSeoMeta({
  title: 'Build Muscle, Not Dishes | High-Protein Vegetarian Recipes',
  description: 'Quick, high-protein vegetarian and vegan meals for people who love to eat but hate to wait. Discover 15-minute tofu marinades and one-pan gains.',
  
  // Open Graph (Social Media)
  ogTitle: 'Build Muscle, Not Dishes | Plant-Based Fitness Recipes',
  ogDescription: 'Stop washing dishes and start hitting your macros with our 5-minute vegan recipes.',
  ogImage: `https://www.hotrecipes.co.uk/social-share-cover.png`, 
  ogUrl: 'https://www.hotrecipes.co.uk',
  ogType: 'website',
  
  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: 'Build Muscle, Not Dishes',
  twitterDescription: 'Easy recipes that don\'t sacrifice flavor or protein.',
  twitterImage: `https://www.hotrecipes.co.uk/social-share-cover.png`,
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>