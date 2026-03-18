// composables/useAnalytics.ts
import { useHead, useState, computed } from '#imports'

// composables/useAnalytics.ts
export const useAnalytics = () => {
  const scriptsEnabled = useState('scripts_enabled', () => false)
  const GA_ID = 'G-YHZ3LGX35G'
  const GTM_ID = 'GTM-WHMK6XD7'

  const initializeScripts = () => {
    // Strictly prevent execution during 'nuxt generate'
    if (!import.meta.client || scriptsEnabled.value) return
    
    scriptsEnabled.value = true

    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args) { window.dataLayer.push(args); }
    
    window.gtag('js', new Date())
    
    // FORCE DEBUG MODE for testing static builds
    window.gtag('config', GA_ID, { 
      cookie_domain: 'auto',
      debug_mode: true 
    })

    // GTM Init
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })
  }

  // Use watch to ensure useHead updates AFTER the static page is loaded
  watch(scriptsEnabled, (enabled) => {
    if (enabled && import.meta.client) {
      useHead({
        script: [
          { src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`, async: true },
          { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true }
        ]
      })
    }
  }, { immediate: true })

  const checkConsent = () => {
    if (!import.meta.client) return null
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      initializeScripts()
    }
    return consent
  }

  return { scriptsEnabled, initializeScripts, checkConsent }
}