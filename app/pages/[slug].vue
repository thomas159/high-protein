<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const { t, locale } = useI18n()

// Check if a recipe or collection exists matching this slug
const { data: match } = await useAsyncData(`redirect-check-${slug}-${locale.value}`, async () => {
  const recipePath = locale.value === 'en' ? `/recipes/${slug}` : `/recipes/${slug}.${locale.value}`
  const recipe = await queryCollection('recipes').path(recipePath).first()
  if (recipe) return { type: 'recipe' as const }

  let collBuilder = queryCollection('collections').where('slug', '=', slug)
  if (locale.value === 'en') {
    collBuilder = collBuilder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    collBuilder = collBuilder.where('path', 'LIKE', `%.${locale.value}`)
  }
  const col = await collBuilder.first()
  if (col) return { type: 'collection' as const }

  return null
})

if (match.value?.type === 'recipe') {
  await navigateTo(localePath(`/recipes/${slug}`), { redirectCode: 301 })
} else if (match.value?.type === 'collection') {
  await navigateTo(localePath(`/collections/${slug}`), { redirectCode: 301 })
} else {
  // If no recipe or collection matches, throw a standard 404 error
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}
</script>

<template>
  <div/>
</template>
