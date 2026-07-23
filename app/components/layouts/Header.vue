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

const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

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
      
 <NuxtLink :to="localePath('/')" class="block w-[200px]" aria-label="Homepage">
  <img
    src="/images/logo.avif"
    alt="Logo"
    width="200"
    height="50"
    class="w-full h-auto dark:hidden block" 
  />
    
  <img
    src="/images/logo-dark.avif"
    alt="Logo"
    width="200"
    height="50"
    class="w-full h-auto hidden dark:block" 
  />
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
              @click="isSearchOpen = true"
              aria-label="Search Recipes"
            >
              <svg class="w-5 h-5 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="hidden lg:block ml-2 text-[10px] font-bold text-slate-500 uppercase">Search</span>
            </button>

            <NuxtLink
              :to="switchLocalePath(locale === 'en' ? 'es' : 'en')"
              class="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground transition-all flex items-center justify-center border border-border cursor-pointer group"
              :aria-label="`Switch to ${locale === 'en' ? 'Español' : 'English'}`"
            >
              <span class="text-[10px] font-extrabold uppercase group-hover:text-emerald-500 transition-colors w-5 h-5 flex items-center justify-center">
                {{ locale === 'en' ? 'es' : 'en' }}
              </span>
            </NuxtLink>

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
              @click.stop="isMenuOpen = false"
              class="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-2xl border border-border/50 hover:bg-accent hover:border-emerald-500/50 transition-all duration-300 group"
              active-class="!bg-emerald-500/10 !border-emerald-500"
            >
              <Icon :name="cat.icon" class="w-8 h-8 mb-2 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
              <span class="text-xs font-bold uppercase tracking-widest text-foreground">{{ $t(`categories.${cat.key}`) }}</span>
            </NuxtLink>
          </div>

          <!-- Quick Navigation -->
          <div class="flex flex-col gap-4 pt-6 border-t border-border">
            <NuxtLink :to="localePath('/')" @click="isMenuOpen = false" class="flex items-center gap-3 text-lg font-bold">
              <Icon name="ph:house-duotone" class="w-6 h-6 text-emerald-500" />
              {{ $t('nav.home') }}
            </NuxtLink>
             <NuxtLink to="/about" @click="isMenuOpen = false" class="flex items-center gap-3 text-lg font-bold">
              <Icon name="ph:user-duotone" class="w-6 h-6 text-emerald-500" />
              {{ $t('nav.about') }}
            </NuxtLink>
          </div>

          <!-- Social/Brand Presence -->
          <div class="mt-auto pt-10 flex flex-col items-center gap-4">
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