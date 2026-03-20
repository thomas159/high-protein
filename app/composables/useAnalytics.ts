// composables/useAnalytics.ts
export const useAnalytics = () => {
  const { load, status, proxy } = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual' 
  })

  // This is the function the banner needs
  const initializeScripts = () => {
    if (!import.meta.client) return
    
    // Set Consent Mode v2 defaults/grants
    proxy.dataLayer.push({
      event: 'default_consent_granted',
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })

    load() // Nuxt Scripts triggers the actual network request here
    localStorage.setItem('cookie-consent', 'accepted')
  }

  const checkConsent = () => {
    if (import.meta.client && localStorage.getItem('cookie-consent') === 'accepted') {
      initializeScripts()
    }
  }

  return { 
    initializeScripts, // Export this to fix the TypeError
    checkConsent, 
    status 
  }
}