<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useMagicKeys } from '@vueuse/core'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const searchInput = ref<HTMLInputElement | null>(null)
const query = ref('')
const results = ref<any[]>([])
const isSearching = ref(false)
const { locale, t } = useI18n()
const localePath = useLocalePath()

watch(() => props.isOpen, (open) => {
  if (open) {
    setTimeout(() => searchInput.value?.focus(), 100)
  } else {
    query.value = ''
    results.value = []
  }
})

watch(query, async (newQuery) => {
  if (newQuery.length < 2) {
    results.value = []
    return
  }

  isSearching.value = true
  try {
    // Search in multiple fields: title, description, and keywords
    // Language filtering: explicit conditions for languages
    let searchBuilder = queryCollection('recipes')
    if (locale.value === 'en') {
      searchBuilder = searchBuilder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
    } else {
      searchBuilder = searchBuilder.where('path', 'LIKE', `%.${locale.value}`)
    }

    // Main search logic
    const rawResults = await searchBuilder
      .where('title', 'LIKE', `%${newQuery}%`)
      .limit(6)
      .all()
    
    // If no title matches, try searching keywords (simplified for this iteration)
    if (rawResults.length === 0) {
       let kwBuilder = queryCollection('recipes')
       if (locale.value === 'en') {
          kwBuilder = kwBuilder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
       } else {
          kwBuilder = kwBuilder.where('path', 'LIKE', `%.${locale.value}`)
       }
       const keywordResults = await kwBuilder
        .where('keywords', 'LIKE', `%${newQuery}%`)
        .limit(6)
        .all()
       results.value = keywordResults
    } else {
      results.value = rawResults
    }
    
  } catch (e) {
    console.error('Search failed', e)
  } finally {
    isSearching.value = false
  }
})

const handleClose = () => {
  emit('close')
}

// Close on Escape
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') handleClose()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-sm" @click.self="handleClose">
      <div 
        class="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- Search Input -->
        <div class="p-4 border-b border-border flex items-center gap-4">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            ref="searchInput"
            v-model="query"
            type="text" 
            :placeholder="t('search.placeholder')"
            class="flex-grow bg-transparent border-none text-foreground focus:ring-0 text-lg placeholder:text-muted-foreground outline-none"
          >
          <div class="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase bg-muted px-2 py-1 rounded">
            <span>{{ t('search.shortcut') }}</span>
          </div>
        </div>

        <!-- Results Tray -->
        <div class="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <div v-if="isSearching" class="p-8 text-center text-muted-foreground italic text-sm">
            {{ t('search.searching') }}
          </div>
          
          <div v-else-if="results.length > 0" class="flex flex-col gap-1">
            <NuxtLink 
              v-for="recipe in results" 
              :key="recipe.path"
              :to="localePath(`/recipes/${recipe.slug}`)"
              class="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              @click="handleClose"
            >
              <div class="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                <NuxtImg 
                  provider="cloudinary"
                  :src="recipe.image" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                  width="48"
                  height="48"
                  fit="cover"
                  loading="lazy"
                />
              </div>
              <div class="flex-grow">
                <h4 class="text-sm font-bold text-foreground leading-tight">{{ recipe.title }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] font-bold text-emerald-500 uppercase">{{ recipe.macros?.protein || 0 }}g Protein</span>
                  <span class="text-[10px] text-muted-foreground">•</span>
                  <span class="text-[10px] text-muted-foreground uppercase">{{ (recipe.prepTimeMins || 0) + (recipe.cookTimeMins || 0) }}m</span>
                </div>
              </div>
              <svg class="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <div v-else-if="query.length >= 2" class="p-12 text-center text-muted-foreground">
            <div class="text-3xl mb-2 text-muted-foreground">🔭</div>
            <p class="text-sm">{{ t('search.noResults', { query }) }}</p>
          </div>

          <div v-else class="p-8 text-center">
             <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{{ t('search.trySearching') }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3 bg-muted/30 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
          <span>{{ t('search.poweredBy') }}</span>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <span class="bg-muted px-1 rounded text-muted-foreground">↵</span> {{ t('search.select') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

