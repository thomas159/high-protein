// composables/useAnalytics.ts
export const useAnalytics = () => {
  const { load, status, proxy } = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual',
  })

  const initializeScripts = () => {
    if (!import.meta.client) return
    
    // 1. Manually ensure dataLayer exists before GTM script arrives
    window.dataLayer = window.dataLayer || []
    
    // 2. Push Consent BEFORE loading
    window.dataLayer.push({
      'event': 'consent_update',
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    })

    // 3. Save and Load
    localStorage.setItem('cookie-consent', 'accepted')
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

  return { initializeScripts, checkConsent, status }
}