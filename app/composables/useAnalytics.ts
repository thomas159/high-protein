// composables/useAnalytics.ts
export const useAnalytics = () => {
  const { load, status, proxy } = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual',
    // CRITICAL: This fires at the EXACT moment GTM starts
    onBeforeGtmStart() {
      window.dataLayer.push({
        event: 'default_consent_granted',
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'wait_for_update': 500 // Gives GTM a tiny window to process
      })
    }
  })

  const initializeScripts = () => {
    if (!import.meta.client) return
    
    // Save to storage first
    localStorage.setItem('cookie-consent', 'accepted')
    
    // Trigger the script load
    load() 
  }

  const checkConsent = () => {
    if (!import.meta.client) return 'pending'
    const consent = localStorage.getItem('cookie-consent')
    
    // If already accepted, load GTM immediately
    if (consent === 'accepted') {
      load() 
    }
    return consent 
  }

  return { 
    initializeScripts, 
    checkConsent, 
    status,
    // Expose the proxy so you can push custom events from pages
    gtmPush: (payload: object) => proxy.dataLayer.push(payload)
  }
}