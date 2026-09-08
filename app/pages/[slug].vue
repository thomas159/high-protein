<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const { t, locale } = useI18n()

// Handle top-level alias slugs (e.g. /recetas, /rezepte, /colecciones, /sammlungen, etc.)
if (slug === 'recipes' || slug === 'recetas' || slug === 'rezepte') {
  if (slug === 'recetas' && locale.value === 'en') {
    await navigateTo('/es/categorias/todas-las-recetas', { redirectCode: 301 })
  } else if (slug === 'rezepte' && locale.value === 'en') {
    await navigateTo('/de/kategorien/all-recipes', { redirectCode: 301 })
  } else {
    await navigateTo(localePath(`/categories/${t('categorySlugs.allrecipes')}`), { redirectCode: 301 })
  }
} else if (slug === 'collections' || slug === 'colecciones' || slug === 'sammlungen') {
  if (slug === 'colecciones' && locale.value === 'en') {
    await navigateTo('/es/colecciones', { redirectCode: 301 })
  } else if (slug === 'sammlungen' && locale.value === 'en') {
    await navigateTo('/de/sammlungen', { redirectCode: 301 })
  } else {
    await navigateTo(localePath('/collections'), { redirectCode: 301 })
  }
} else if (slug === 'categories' || slug === 'categorias' || slug === 'kategorien') {
  if (slug === 'categorias' && locale.value === 'en') {
    await navigateTo('/es/categorias/todas-las-recetas', { redirectCode: 301 })
  } else if (slug === 'kategorien' && locale.value === 'en') {
    await navigateTo('/de/kategorien/all-recipes', { redirectCode: 301 })
  } else {
    await navigateTo(localePath(`/categories/${t('categorySlugs.allrecipes')}`), { redirectCode: 301 })
  }
}

// Check if a recipe or collection exists matching this slug
const { data: match } = await useAsyncData(`redirect-check-${slug}-${locale.value}`, async () => {
  const recipePath = locale.value === 'en' ? `/recipes/${slug}` : `/recipes/${slug}.${locale.value}`
  const recipe = await queryCollection('recipes').path(recipePath).first()
  if (recipe) return { type: 'recipe' as const, targetLocale: locale.value, slug }

  // Check if it's a recipe in another locale
  const anyRecipe = await queryCollection('recipes').where('slug', '=', slug).first()
  if (anyRecipe) {
    const isEs = anyRecipe.path.endsWith('.es')
    const isDe = anyRecipe.path.endsWith('.de')
    const targetLoc = isEs ? 'es' : isDe ? 'de' : 'en'
    return { type: 'recipe' as const, targetLocale: targetLoc, slug }
  }

  let collBuilder = queryCollection('collections').where('slug', '=', slug)
  if (locale.value === 'en') {
    collBuilder = collBuilder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    collBuilder = collBuilder.where('path', 'LIKE', `%.${locale.value}`)
  }
  const col = await collBuilder.first()
  if (col) return { type: 'collection' as const, targetLocale: locale.value, slug }

  const anyCol = await queryCollection('collections').where('slug', '=', slug).first()
  if (anyCol) {
    const isEs = anyCol.path.endsWith('.es')
    const isDe = anyCol.path.endsWith('.de')
    const targetLoc = isEs ? 'es' : isDe ? 'de' : 'en'
    return { type: 'collection' as const, targetLocale: targetLoc, slug }
  }

  return null
})

if (match.value?.type === 'recipe') {
  const prefix = match.value.targetLocale === 'en' ? '/recipes' : match.value.targetLocale === 'es' ? '/es/recetas' : '/de/rezepte'
  await navigateTo(`${prefix}/${match.value.slug}`, { redirectCode: 301 })
} else if (match.value?.type === 'collection') {
  const prefix = match.value.targetLocale === 'en' ? '/collections' : match.value.targetLocale === 'es' ? '/es/colecciones' : '/de/sammlungen'
  await navigateTo(`${prefix}/${match.value.slug}`, { redirectCode: 301 })
} else {
  // If no recipe or collection matches, throw a standard 404 error
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}
</script>

<template>
  <div/>
</template>
