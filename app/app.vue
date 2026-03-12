<script setup lang="ts">
const { siteName, siteDescription } = useAppConfig()
// This loads GA4 only when the browser is idle to keep your site fast
useScriptGoogleAnalytics({
  id: 'G-YHZ3LGX35G'
})
useHead({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
  meta: [{ name: siteName, content: siteDescription }]
})
useSeoMeta({
  // The Title of your site as it appears in Google tabs
  title: 'Healthy Air Fryer Recipes & Bold Plant-Based Marinades',
  
  // The summary that appears under your link in search results (keep under 160 chars)
  description: 'Discover easy, high-protein air fryer recipes and vibrant tofu marinades. From Korean Kimchi Fries to Authentic Tikka Tofu, level up your healthy meal prep.',
  
  // Open Graph (Social Media)
  ogTitle: 'Flavor-First Healthy Recipes | YourSiteName',
  ogDescription: 'Upgrade your air fryer game with bold flavors and simple, plant-based ingredients.',
  ogImage: 'https://yourdomain.com/social-share-cover.png', // A high-quality wide image
  ogUrl: 'https://yourdomain.com',
  ogType: 'website',
  
  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: 'Healthy Air Fryer & Tofu Recipes',
  twitterDescription: 'Easy recipes that don\'t sacrifice flavor.',
  twitterImage: 'https://yourdomain.com/social-share-cover.png',
})
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>