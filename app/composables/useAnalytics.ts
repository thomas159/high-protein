export const useAnalytics = () => {
  // Only manage GTM. GA4 will be triggered BY GTM.
  const { load, status, proxy } = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual' 
  })

  const grantConsent = () => {
    if (!import.meta.client) return
    
    // 1. Tell GTM/GA that consent is granted (Consent Mode v2)
    proxy.dataLayer.push({
      event: 'default_consent_granted',
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    })

    // 2. Load the actual GTM script
    load()
    
    localStorage.setItem('cookie-consent', 'accepted')
  }

  const checkConsent = () => {
    if (import.meta.client && localStorage.getItem('cookie-consent') === 'accepted') {
      grantConsent()
    }
  }

  return { grantConsent, checkConsent, status }
}