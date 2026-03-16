<script setup lang="ts">
const appConfig = useAppConfig()
const showBanner = ref(false)

// We define our IDs here for easy updates
const GA_ID = 'G-YHZ3LGX35G'
const ADSENSE_ID = 'ca-pub-2508418027852597'

// Reactive state to control when scripts are injected into the DOM
const scriptsEnabled = ref(false)

// UseHead will reactively inject these tags as soon as scriptsEnabled becomes true
useHead({
  script: computed(() => {
    if (!scriptsEnabled.value) return []
    return [
      // 1. Google Analytics (Main Tag)
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        async: true
      },
      // 2. Google AdSense
      {
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`,
        async: true,
        crossorigin: 'anonymous'
      }
    ]
  })
})

const initializeScripts = () => {
  scriptsEnabled.value = true

  // 3. Initialize gtag logic
  window.dataLayer = window.dataLayer || []
  
  // Replace 'arguments' with rest parameters (...args)
  function gtag(...args: any[]) { 
    window.dataLayer.push(args) 
  }
  
  gtag('js', new Date())
  gtag('config', GA_ID, {
    cookie_domain: 'auto'
  })
}

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    showBanner.value = true
  } else if (consent === 'accepted') {
    initializeScripts()
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
  initializeScripts()
}

const declineCookies = () => {
  localStorage.setItem('cookie-consent', 'declined')
  showBanner.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transform transition duration-500 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div 
      v-if="showBanner" 
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-sm z-[100]"
    >
      <div class="bg-background border border-border shadow-2xl rounded-2xl p-6">
        <div class="flex items-start gap-4">
          <div class="bg-emerald-500/10 p-2 rounded-lg">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-foreground">Cookie Policy</h3>
            <p class="text-sm text-muted-foreground mt-1 leading-relaxed">
              We use cookies to enhance your "{{ appConfig.siteName }}" experience and analyze our traffic.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-6">
          <button 
            id="cookieDecline"
            role="button"
            aria-label="cookieDecline"
            @click="declineCookies"
            class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button 
            id="cookieAccept"
            role="button"
            aria-label="cookieAccept"
            @click="acceptCookies"
            class="px-4 py-2 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>