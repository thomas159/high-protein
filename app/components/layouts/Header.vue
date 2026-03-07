<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

// Logic to apply theme and persist it
const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  
  isDark.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})

const navLinks = [
  { name: 'All Recipes', path: '/categories/all-recipes' },
  { name: 'High Protein', path: '/categories/high-protein' },
  { name: 'Vegan', path: '/categories/vegan' },
  { name: 'Air fryer', path: '/categories/air-fryer' },
]
</script>

<template>
  <nav class="relative container bg-background border-b border-border">
    <div class="mx-auto px-4 py-2 flex items-center justify-between">
      
      <NuxtLink to="/" class="text-xl font-bold text-foreground">
        <img
          :src="isDark ? '/images/logo-dark.avif' : '/images/logo.avif'"
          alt="Logo"
          width="240"
          height="60">
      </NuxtLink>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            class="hover:text-foreground transition-colors pb-1 border-b-2 border-transparent"
            active-class="!text-foreground !border-emerald-500"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <ClientOnly>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground transition-all flex items-center justify-center border border-border cursor-pointer"
            aria-label="Toggle Theme"
          >
            <svg v-if="isDark" class="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-else class="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <template #fallback>
            <div class="w-9 h-9 bg-muted rounded-lg border border-border"></div>
          </template>
        </ClientOnly>

        <button class="md:hidden p-2 text-muted-foreground" @click="isMenuOpen = !isMenuOpen">
          </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-background border-b border-border z-50 shadow-xl">
        <div class="flex flex-col p-6 gap-4 text-base font-medium">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            @click="isMenuOpen = false"
            class="text-muted-foreground border-l-4 border-transparent pl-2"
            active-class="!text-emerald-500 !border-emerald-500"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>