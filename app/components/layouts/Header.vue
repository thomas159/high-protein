<script setup>
import { RECIPE_CATEGORIES } from '~/utils/constants'
const colorMode = useColorMode()
const isMenuOpen = ref(false)

// Computed property to check if it's currently dark
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const isLangOpen = ref(false)
const langDropdownRef = ref(null)

onClickOutside(langDropdownRef, () => {
  isLangOpen.value = false
})

const languageOptions = [
  { code: 'en', name: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'Español', short: 'ES', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', short: 'DE', flag: '🇩🇪' }
]

// Modernized search state
const isSearchOpen = ref(false)
const keys = useMagicKeys()
const cmdK = keys['Meta+K']
const ctrlK = keys['Control+K']

watch([cmdK, ctrlK], (v) => {
  if (v[0] || v[1]) {
    isSearchOpen.value = true
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <nav class="relative container border-b border-border">
    <div class="mx-auto px-4 py-2 flex items-center justify-between">
      
 <NuxtLink :to="localePath('/')" class="block w-[200px]" aria-label="Hot Recipes Homepage">
  <img
    src="/images/logo.avif"
    alt="Hot Recipes - High-Protein Vegetarian & Vegan Recipes"
    width="200"
    height="50"
    class="w-full h-auto dark:hidden block" 
  >
    
  <img
    src="/images/logo-dark.avif"
    alt="Hot Recipes - High-Protein Vegetarian & Vegan Recipes"
    width="200"
    height="50"
    class="w-full h-auto hidden dark:block" 
  >
</NuxtLink>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <NuxtLink 
            v-for="cat in RECIPE_CATEGORIES" 
            :key="cat.key"
            :to="localePath(`/categories/${$t(`categorySlugs.${cat.key}`)}`)" 
            class="flex items-center gap-1.5 hover:text-foreground transition-all pb-1 border-b-2 border-transparent hover:border-border"
            active-class="!text-foreground !border-emerald-500"
          >
            <Icon :name="cat.icon" class="w-4 h-4 opacity-70" />
            {{ $t(`categories.${cat.key}`) }}
          </NuxtLink>
        </div>

        <ClientOnly>
          <div class="flex items-center gap-2 border-l border-border pl-4">
            <!-- Search Button -->
            <button 
              class="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground transition-all flex items-center justify-center border border-border cursor-pointer group relative"
              aria-label="Search Recipes"
              @click="isSearchOpen = true"
            >
              <svg class="w-5 h-5 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="hidden lg:block ml-2 text-[10px] font-bold text-slate-500 uppercase">Search</span>
            </button>

            <!-- Multi-Language Dropdown -->
            <div ref="langDropdownRef" class="relative">
              <button
                class="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 border border-border cursor-pointer group"
                aria-label="Select language"
                :aria-expanded="isLangOpen"
                @click="isLangOpen = !isLangOpen"
              >
                <span class="text-[11px] font-extrabold uppercase group-hover:text-emerald-500 transition-colors">
                  {{ locale }}
                </span>
                <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': isLangOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Transition name="fade">
                <div 
                  v-if="isLangOpen" 
                  class="absolute right-0 mt-2 w-36 bg-card border border-border rounded-xl shadow-xl py-1.5 z-50 overflow-hidden"
                >
                  <NuxtLink
                    v-for="l in languageOptions"
                    :key="l.code"
                    :to="switchLocalePath(l.code)"
                    class="flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-muted/80 transition-colors"
                    :class="locale === l.code ? 'text-emerald-500 font-bold bg-emerald-500/10' : 'text-foreground'"
                    @click="isLangOpen = false"
                  >
                    <div class="flex items-center gap-2">
                      <span>{{ l.flag }}</span>
                      <span>{{ l.name }}</span>
                    </div>
                    <span class="text-[10px] font-mono uppercase opacity-60">{{ l.short }}</span>
                  </NuxtLink>
                </div>
              </Transition>
            </div>

            <button 
              class="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground transition-all flex items-center justify-center border border-border cursor-pointer"
              role="button"
              aria-label="Toggle Theme"
              @click.stop="toggleTheme" 
            >
              <svg v-if="isDark" class="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <svg v-else class="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </ClientOnly>

        <button 
          class="md:hidden p-2 text-muted-foreground cursor-pointer" 
          role="button"
          aria-label="Toggle mobile menu"
          @click="isMenuOpen = !isMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-xl z-[60] overflow-y-auto">
        <div class="flex flex-col p-6 gap-8">
          
          <!-- Category Grid -->
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink 
              v-for="cat in RECIPE_CATEGORIES" 
              :key="cat.key"
              :to="localePath(`/categories/${$t(`categorySlugs.${cat.key}`)}`)" 
              class="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-2xl border border-border/50 hover:bg-accent hover:border-emerald-500/50 transition-all duration-300 group"
              active-class="!bg-emerald-500/10 !border-emerald-500"
              @click.stop="isMenuOpen = false"
            >
              <Icon :name="cat.icon" class="w-8 h-8 mb-2 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
              <span class="text-xs font-bold uppercase tracking-widest text-foreground">{{ $t(`categories.${cat.key}`) }}</span>
            </NuxtLink>
          </div>

          <!-- Quick Navigation -->
          <div class="flex flex-col gap-4 pt-6 border-t border-border">
            <NuxtLink :to="localePath('/')" class="flex items-center gap-3 text-lg font-bold" @click="isMenuOpen = false">
              <Icon name="ph:house-duotone" class="w-6 h-6 text-emerald-500" />
              {{ $t('nav.home') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/about')" class="flex items-center gap-3 text-lg font-bold" @click="isMenuOpen = false">
              <Icon name="ph:user-duotone" class="w-6 h-6 text-emerald-500" />
              {{ $t('nav.about') }}
            </NuxtLink>
          </div>

          <!-- Language Selector for Mobile -->
          <div class="flex flex-col gap-3 pt-6 border-t border-border">
            <span class="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Language / Sprache / Idioma</span>
            <div class="grid grid-cols-3 gap-2">
              <NuxtLink
                v-for="l in languageOptions"
                :key="l.code"
                :to="switchLocalePath(l.code)"
                class="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all"
                :class="locale === l.code ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-muted/60 text-muted-foreground hover:text-foreground border-border'"
                @click="isMenuOpen = false"
              >
                <span>{{ l.flag }}</span>
                <span>{{ l.short }}</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Social/Brand Presence -->
          <div class="mt-auto pt-6 flex flex-col items-center gap-4">
            <a href="https://pinterest.com/hotRecipesUk" target="_blank" class="flex items-center gap-2 px-6 py-3 bg-red-600/10 text-red-600 rounded-full font-bold text-sm border border-red-600/20 hover:bg-red-600 hover:text-white transition-all">
              <Icon name="ph:pinterest-logo-bold" class="w-5 h-5" />
              Follow on Pinterest
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <SearchModal 
      :is-open="isSearchOpen" 
      @close="isSearchOpen = false" 
    />
  </nav>
</template>