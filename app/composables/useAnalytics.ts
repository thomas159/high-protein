// composables/useAnalytics.ts
export const useAnalytics = () => {
  // 1. Initialize the official scripts (won't load yet if trigger is manual)
  const ga = useScriptGoogleAnalytics({
    id: 'G-YHZ3LGX35G',
    trigger: 'manual',
    options: {
      initialDataLayer: { debug_mode: true } // Replaces your manual debug_mode logic
    }
  })

  const gtm = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual'
  })

  const initializeScripts = () => {
    // Nuxt Scripts handles the "already loaded" check internally
    ga.load()
    gtm.load()
  }

  const checkConsent = () => {
    if (!import.meta.client) return null
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      initializeScripts()
    }
    return consent
  }

  return { 
    initializeScripts, 
    checkConsent,
    // You can expose the proxy if you need to call gtag('event', ...) elsewhere
    gtag: ga.proxy.gtag 
  }
}