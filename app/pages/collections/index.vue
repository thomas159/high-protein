<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

// Query all collections for the active locale
const { data: collections } = await useAsyncData(`collections-index-${locale.value}`, async () => {
  let b = queryCollection('collections')
  if (locale.value === 'en') {
    b = b.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    b = b.where('path', 'LIKE', `%.${locale.value}`)
  }
  const all = await b.all()
  return all.map((col: any) => ({
    ...col,
    slug: col.slug || col.path?.split('/').pop()?.replace(/\.(es|de)$/, '')
  }))
})

// SEO Meta
const ogImg = 'https://www.hotrecipes.co.uk/cover.png'

useSeoMeta({
  title: () => t('seo.collections.title'),
  description: () => t('seo.collections.description'),
  ogTitle: () => t('seo.collections.ogTitle'),
  ogDescription: () => t('seo.collections.ogDescription'),
  ogUrl: `https://www.hotrecipes.co.uk${route.path}`,
  ogImage: ogImg,
  twitterTitle: () => t('seo.collections.ogTitle'),
  twitterDescription: () => t('seo.collections.ogDescription'),
  twitterImage: ogImg,
  twitterCard: 'summary_large_image'
})

const toAbsoluteUrl = (pathStr: string) => `https://www.hotrecipes.co.uk${pathStr.startsWith('/') ? pathStr : `/${pathStr}`}`

// Schema.org Structured Data
if (import.meta.server) {
  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: () => t('nav.home'), item: toAbsoluteUrl(localePath('/')) },
        { name: () => t('recipes.collections'), item: toAbsoluteUrl(localePath('/collections')) }
      ]
    }),
    defineItemList({
      name: () => t('collectionsPage.title'),
      description: () => t('collectionsPage.subtitle'),
      itemListElement: computed(() => collections.value?.map((col: any, idx: number) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://www.hotrecipes.co.uk${localePath(`/collections/${col.slug}`)}`,
        name: col.title,
        image: col.image ? (col.image.startsWith('http') ? col.image : `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${col.image}`) : undefined,
      })) || [])
    })
  ])
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 md:py-12">
    <!-- Breadcrumb -->
    <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8">
      <NuxtLink :to="localePath('/')" class="hover:text-foreground transition-colors flex items-center gap-1">
        <Icon name="ph:house-duotone" class="w-4 h-4 text-emerald-500" />
        {{ t('nav.home') }}
      </NuxtLink>
      <span class="text-border">/</span>
      <span class="text-foreground">{{ t('recipes.collections') }}</span>
    </nav>

    <!-- Header Banner -->
    <header class="bg-gradient-to-br from-card/80 to-card/40 border border-border/60 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden mb-12 shadow-sm">
      <div class="absolute -right-10 -bottom-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div class="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest w-fit border border-emerald-500/20 mb-4">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        {{ t('collectionsPage.badge') }}
      </div>

      <h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic text-foreground mb-4">
        {{ t('collectionsPage.title') }}
      </h1>

      <p class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
        {{ t('collectionsPage.subtitle') }}
      </p>

      <div v-if="collections?.length" class="mt-6 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <span class="inline-flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border border-border/60">
          <span>📚</span> {{ t('collectionsPage.count', { count: collections.length }) }}
        </span>
      </div>
    </header>

    <!-- Collections Grid -->
    <div v-if="collections?.length" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <CollectionCard 
        v-for="collection in collections" 
        :key="collection.slug" 
        :collection="collection" 
        class="h-full"
      />
    </div>

    <!-- Empty State Fallback -->
    <div v-else class="text-center py-20 bg-card rounded-3xl border border-border p-8">
      <p class="text-lg text-muted-foreground mb-4">{{ t('collectionsPage.empty') }}</p>
      <NuxtLink :to="localePath('/')" class="text-emerald-500 hover:underline font-bold">
        &larr; {{ t('nav.home') }}
      </NuxtLink>
    </div>
  </div>
</template>
