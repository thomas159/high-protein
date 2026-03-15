<script setup lang="ts">
const { siteName, siteDescription } = useAppConfig()

// This loads GA4 only when the browser is idle to keep your site fast
useScriptGoogleAnalytics({
  id: 'G-YHZ3LGX35G',
  onBeforeGtagStart(gtag) {
    gtag('config', 'G-YHZ3LGX35G', {
      cookie_domain: 'none'
    })
  }
})

useHead({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
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