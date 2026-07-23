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
    const rawResults = await queryCollection('recipes')
      // Language filtering: English recipes don't have .es, Spanish recipes do
      .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
      // Main search logic
      .where('title', 'LIKE', `%${newQuery}%`)
      .limit(6)
      .all()
    
    // If no title matches, try searching keywords (simplified for this iteration)
    if (rawResults.length === 0) {
       const keywordResults = await queryCollection('recipes')
        .where('path', locale.value === 'es' ? 'LIKE' : 'NOT LIKE', '%.es')
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
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm" @click.self="handleClose">
      <div 
        class="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- Search Input -->
        <div class="p-4 border-b border-slate-800 flex items-center gap-4">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            ref="searchInput"
            v-model="query"
            type="text" 
            :placeholder="t('search.placeholder')"
            class="flex-grow bg-transparent border-none text-slate-200 focus:ring-0 text-lg placeholder:text-slate-600 outline-none"
          />
          <div class="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase bg-slate-800 px-2 py-1 rounded">
            <span>{{ t('search.shortcut') }}</span>
          </div>
        </div>

        <!-- Results Tray -->
        <div class="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <div v-if="isSearching" class="p-8 text-center text-slate-500 italic text-sm">
            {{ t('search.searching') }}
          </div>
          
          <div v-else-if="results.length > 0" class="flex flex-col gap-1">
            <NuxtLink 
              v-for="recipe in results" 
              :key="recipe.path"
              :to="localePath(`/recipes/${recipe.slug}`)"
              @click="handleClose"
              class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors group"
            >
              <div class="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0">
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
                <h4 class="text-sm font-bold text-slate-200 leading-tight">{{ recipe.title }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] font-bold text-emerald-500 uppercase">{{ recipe.macros?.protein || 0 }}g Protein</span>
                  <span class="text-[10px] text-slate-500">•</span>
                  <span class="text-[10px] text-slate-500 uppercase">{{ (recipe.prepTimeMins || 0) + (recipe.cookTimeMins || 0) }}m</span>
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <div v-else-if="query.length >= 2" class="p-12 text-center text-slate-500">
            <div class="text-3xl mb-2 text-slate-700">🔭</div>
            <p class="text-sm">{{ t('search.noResults', { query }) }}</p>
          </div>

          <div v-else class="p-8 text-center">
             <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{{ t('search.trySearching') }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-600 uppercase font-bold tracking-widest">
          <span>{{ t('search.poweredBy') }}</span>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <span class="bg-slate-800 px-1 rounded text-slate-400">↵</span> {{ t('search.select') }}
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

