<script setup lang="ts">
const appConfig = useAppConfig()
useHead({
  link: [
    {
      rel: 'canonical',
      href: appConfig.meta.canonical,
    }
  ],
  meta: [
    {
      name: 'description',
      content: appConfig.meta.description,
    },
    {
      name: 'keywords',
      content: appConfig.meta.keywords,
    },
    {
      name: 'image',
      content: '/cover.png',
    },
    {
      name: 'author',
      content: appConfig.meta.author,
    },
    {
      name: 'publisher',
      content: appConfig.meta.publisher,
    },
    {
      name: 'og:title',
      content: appConfig.meta.title,
    },
    {
      name: 'og:description',
      content: appConfig.meta.description,
    },
    {
      name: 'og:image',
      content: '/cover.png',
    },
    {
      name: 'google-site-verification',
      content: process.env.GG_SEARCH_CONSOLE
    }
  ]
})
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>