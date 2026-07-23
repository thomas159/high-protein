<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSetI18nParams } from '#imports'
import Button from '@/components/common/Button.vue'
import enLocales from '../../../i18n/locales/en.json'
import esLocales from '../../../i18n/locales/es.json'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const setI18nParams = useSetI18nParams()

const categorySlug = computed(() => route.params.slug as string)

// Explicitly resolve the static slugs so we can pair English <-> Spanish
const enSlugs = enLocales.categorySlugs as Record<string, string>
const esSlugs = esLocales.categorySlugs as Record<string, string>

// Map the provided slug back to the internal key (e.g. "cena" -> "dinner", or "dinner" -> "dinner")
const getStaticValue = (val: any): string => {
  if (typeof val === 'string') return val
  if (val && typeof val === 'object') {
    if ('static' in val) return val.static
    if ('s' in val) return val.s
    if (val.b && typeof val.b === 'object' && 's' in val.b) return val.b.s // Support unplugin-vue-i18n AST
    if (val.body && typeof val.body === 'object' && 'static' in val.body) return val.body.static
  }
  return String(val || '')
}

const resolveKey = computed(() => {
  const currentSlug = categorySlug.value
  const findKey = (slugs: Record<string, any>) => 
    Object.keys(slugs).find(k => getStaticValue(slugs[k]) === currentSlug)

  if (locale.value === 'es') {
    return findKey(esSlugs) || findKey(enSlugs) || currentSlug
  } else {
    return findKey(enSlugs) || findKey(esSlugs) || currentSlug
  }
})

const categoryKey = resolveKey

// 1. Tell the Nuxt i18n router what the counterparts are for this dynamically generated page
// Now the language switch button will link to /es/categorias/cena when on /categories/dinner
watch([resolveKey, locale], () => {
  setI18nParams({
    en: { slug: getStaticValue(enSlugs[resolveKey.value]) || resolveKey.value },
    es: { slug: getStaticValue(esSlugs[resolveKey.value]) || resolveKey.value }
  })
}, { immediate: true })

// 2. Identify the accurate slug for the CURRENT language's database query 
const resolvedDbSlug = computed(() => {
  const val = locale.value === 'es' ? (esSlugs[resolveKey.value] || resolveKey.value) : (enSlugs[resolveKey.value] || resolveKey.value)
  return getStaticValue(val)
})

const showFilters = ref(false)

const getCategoryName = (key: string) => {
  if (!key) return ''
  const translated = t(`categories.${key}`)
  if (translated === `categories.${key}`) {
    return key.replace(/-/g, ' ')
  }
  return translated
}

const categoryName = computed(() => getCategoryName(categoryKey.value))

const titleText = computed(() => {
  return resolveKey.value === 'allrecipes'
    ? t('categoryPage.allRecipesTitle')
    : t('categoryPage.categoryTitle', { category: categoryName.value })
})

const descText = computed(() => {
  return resolveKey.value === 'allrecipes'
    ? t('categoryPage.allRecipesDesc')
    : t('categoryPage.categoryDesc', { category: categoryName.value })
})

useHead({
  link: [{ rel: 'canonical', href: `https://www.hotrecipes.co.uk${route.path}` }]
})

useSeoMeta({
  title: () => titleText.value,
  description: () => descText.value,
  ogTitle: () => titleText.value,
  ogDescription: () => descText.value,
  ogUrl: `https://www.hotrecipes.co.uk${route.path}`,
  twitterTitle: () => titleText.value,
  twitterDescription: () => descText.value,
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineWebPage({
    name: titleText.value,
    description: descText.value
  })
])

// 1. Fetch recipes for this specific category
const { data: recipes, refresh: refreshRecipes, status } = await useAsyncData(
  () => `category-${resolveKey.value}-${locale.value}`, 
  async () => {
    let query = queryCollection('recipes')
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
    
    if (resolveKey.value !== 'allrecipes') {
      // Use a more relaxed LIKE query to avoid JSON quote issues
      // instead of %"postre"% we use %postre% which is safer for various SQLite JSON formats
      query = query.where('categories', 'LIKE', `%${resolveKey.value}%`)
    }
    
    const result = await query.all()
    return result
  },
  {
    watch: [() => route.params.slug, locale]
  }
)

// 2. Extract unique tags from the fetched recipes
const availableTags = computed(() => {
  if (!recipes.value) return []
  
  const tags = new Set<string>()
  recipes.value.forEach(recipe => {
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach((tag: any) => {
        if (tag) {
          tags.add(String(tag).toLowerCase())
        }
      })
    }
  })
  return Array.from(tags).sort()
})

// 3. Track selected tags (Initialize from URL query parameters!)
const getTagsFromQuery = () => {
  const tags = route.query.tags
  if (!tags) return []
  return typeof tags === 'string' ? tags.split(',') : (tags as string[])
}
const selectedTags = ref<string[]>(getTagsFromQuery())

// 4. Toggle tag selection and update the URL silently
const updateUrl = () => {
  router.replace({
    query: {
      ...route.query,
      tags: selectedTags.value.length ? selectedTags.value.join(',') : undefined
    }
  })
}

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  updateUrl()
}

const clearFilters = () => {
  selectedTags.value = []
  updateUrl()
}

// Listen for browser back/forward buttons to sync URL state back to the UI
watch(() => route.query.tags, () => {
  selectedTags.value = getTagsFromQuery()
})

// 5. Filter recipes based on selected tags
const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  if (selectedTags.value.length === 0) return recipes.value

  return recipes.value.filter(recipe => {
    if (!recipe.tags || !Array.isArray(recipe.tags)) return false
    
    const lowerRecipeTags = recipe.tags.map((t: any) => String(t || '').toLowerCase())
    // AND logic: recipe must have every selected tag
    return selectedTags.value.every(tag => lowerRecipeTags.includes(tag))
  })
})
</script>

<template>
  <div class="container mx-auto py-12 px-4">
    <div class="text-center mb-12">
      <div v-if="recipes?.length" class="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/20">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        {{ recipes.length }} {{ t('recipes.latest') }}
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white mb-6">
        {{ titleText }}
      </h1>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8">
        {{ descText }}
      </p>

      <!-- Horizontal Tag Filters -->
      <div v-if="availableTags.length > 0" class="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mask-fade-edges">
        <button 
          v-for="tag in availableTags" 
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            selectedTags.includes(tag) 
              ? 'bg-emerald-500 text-white border-emerald-400' 
              : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700',
            'px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all active:scale-95 cursor-pointer capitalize'
          ]"
        >
          {{ t('tags.' + tag) }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>

    <!-- Recipe Grid -->
    <div 
      v-else-if="filteredRecipes.length > 0" 
      class="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes" 
        :key="recipe.path" 
        :recipe="recipe"
        class="h-full"
      />
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 shadow-inner">
      <div class="text-5xl mb-6">🥣</div>
      <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-2">{{ t('categoryPage.empty') }}</h3>
      <p class="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed mb-8">
        We couldn't find any recipes for "{{ categoryName }}" that match your fitness goals right now. 
      </p>
      <Button v-if="selectedTags.length > 0" @click="clearFilters" variant="outline" class="rounded-full px-8">Clear All Filters</Button>
      <NuxtLink v-else :to="localePath('/')" class="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-sm transition-colors">
        <span>&larr;</span> Back to Home
      </NuxtLink>
    </div>
  </div>
</template>


<style scoped>
/* Vue TransitionGroup Animations */
.list-move,
.list-enter-active,
.list-leave-active {
  /* Target specific properties to prevent the browser from blurring text */
  transition: transform 0.1s ease, opacity 0.1s ease !important;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.list-enter-from,
.list-leave-to {
  opacity: 0 !important;
  transform: translateY(15px) scale(0.98) !important;
}

/* Ensure elements are taken out of flow when leaving so others slide smoothly */
.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>