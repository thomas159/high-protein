// composables/useAnalytics.ts
export const useAnalytics = () => {
  const { load, status, proxy } = useScriptGoogleAnalytics({
    id: 'G-YHZ3LGX35G',
    trigger: 'manual',
  })

  const initializeScripts = () => {
    if (!import.meta.client) return
    
    // 1. Save consent locally
    localStorage.setItem('cookie-consent', 'accepted')

    // 2. Set GA4 Consent Mode directly
    proxy.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    })

    // 3. Fire the script
    load()
  }

  const checkConsent = () => {
    if (!import.meta.client) return 'pending'
    const consent = localStorage.getItem('cookie-consent')
    
    if (consent === 'accepted') {
      load() 
    }
    return consent 
  }

  return { 
    initializeScripts, 
    checkConsent, 
    status,
    // Use this for custom events: trackEvent('purchase', { value: 10 })
    trackEvent: (name: string, params?: object) => proxy.gtag('event', name, params)
  }
}