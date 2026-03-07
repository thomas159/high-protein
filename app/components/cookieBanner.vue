<script setup lang="ts">
const showBanner = ref(false)

// Function to inject Google Analytics
const loadAnalytics = () => {
  const gaId = 'G-XXXXXXXXXX' // Replace with your actual ID
  
  // Add the main GA script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date())
  gtag('config', gaId)
}

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    showBanner.value = true
  } else if (consent === 'accepted') {
    loadAnalytics()
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
  loadAnalytics() // Load immediately on click
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
              We use cookies to enhance your "Flavor Feast" experience and analyze our traffic.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-6">
          <button 
            @click="declineCookies"
            class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Decline
          </button>
          <button 
            @click="acceptCookies"
            class="px-4 py-2 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>