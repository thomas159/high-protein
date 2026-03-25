<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Check if a recipe exists matching this slug
const { data: recipe } = await useAsyncData(`redirect-check-${slug}`, () => {
  return queryCollection('recipes').path(`/recipes/${slug}`).first()
})

if (recipe.value) {
  // If a recipe is found, perform a 301 Permanent Redirect to the proper URL
  await navigateTo(`/recipes/${slug}`, { redirectCode: 301 })
} else {
  // If no recipe matches, throw a standard 404 error
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}
</script>

<template>
  <div></div>
</template>
