export const useAnalytics = () => {
  const { load, status, proxy } = useScriptGoogleTagManager({
    id: 'GTM-WHMK6XD7',
    trigger: 'manual' 
  })

  const initializeScripts = () => {
    if (!import.meta.client) return
    
    proxy.dataLayer.push({
      event: 'default_consent_granted',
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })

    load() 
    localStorage.setItem('cookie-consent', 'accepted')
  }

  const checkConsent = () => {
    if (!import.meta.client) return 'pending'
    
    // Get the actual value from storage
    const consent = localStorage.getItem('cookie-consent')
    
    if (consent === 'accepted') {
      initializeScripts()
    }
    
    // RETURN the value so the component knows what happened
    return consent 
  }

  return { 
    initializeScripts, 
    checkConsent, 
    status 
  }
}