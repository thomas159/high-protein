<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// 301 Redirect to the canonical all-recipes category page for the current locale
await navigateTo(localePath(`/categories/${t('categorySlugs.allrecipes')}`), { redirectCode: 301 })
</script>

<template>
  <div />
</template>
