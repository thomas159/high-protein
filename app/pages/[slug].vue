<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const { locale } = useI18n()

// Check if a recipe exists matching this slug
const { data: recipe } = await useAsyncData(`redirect-check-${slug}-${locale.value}`, () => {
  const contentPath = locale.value === 'es' ? `/recipes/${slug}.es` : `/recipes/${slug}`
  return queryCollection('recipes').path(contentPath).first()
})

if (recipe.value) {
  // If a recipe is found, perform a 301 Permanent Redirect to the proper URL
  await navigateTo(localePath(`/recipes/${slug}`), { redirectCode: 301 })
} else {
  // If no recipe matches, throw a standard 404 error
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}
</script>

<template>
  <div></div>
</template>
