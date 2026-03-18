// composables/useAnalytics.ts
export const useAnalytics = () => {
  const scriptsEnabled = useState('scripts_enabled', () => false)
  const GA_ID = 'G-YHZ3LGX35G'
  const ADSENSE_ID = 'ca-pub-2508418027852597'

  const initializeScripts = () => {
    if (import.meta.server || scriptsEnabled.value) return
    
    scriptsEnabled.value = true

    // Initialize gtag logic
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) { 
      window.dataLayer.push(args) 
    }
    
    gtag('js', new Date())
    gtag('config', GA_ID, { cookie_domain: 'auto' })
  }

  // Inject scripts into <head> reactively
  useHead({
    script: computed(() => {
      if (!scriptsEnabled.value) return []
      return [
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
        { 
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`, 
          async: true, 
          crossorigin: 'anonymous' 
        }
      ]
    })
  })

  const checkConsent = () => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      initializeScripts()
    }
    return consent
  }

  return {
    scriptsEnabled,
    initializeScripts,
    checkConsent
  }
}