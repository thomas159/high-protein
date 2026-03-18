<script setup lang="ts">
const appConfig = useAppConfig()
const { initializeScripts, checkConsent } = useAnalytics()

const showBanner = ref(false)

onMounted(() => {
  // We check consent status on mount
  const consent = checkConsent()
  
  // Only show the banner if no choice (accepted/declined) has been made yet
  if (!consent) {
    showBanner.value = true
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
  // Trigger the script injection immediately
  initializeScripts()
}

const declineCookies = () => {
  localStorage.setItem('cookie-consent', 'declined')
  showBanner.value = false
  // We do NOT call initializeScripts here
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
            type="button"
            aria-label="Decline cookies"
            @click="declineCookies"
            class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button 
            id="cookieAccept"
            type="button"
            aria-label="Accept all cookies"
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