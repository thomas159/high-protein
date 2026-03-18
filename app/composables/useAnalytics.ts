// composables/useAnalytics.ts
export const useAnalytics = () => {
  const scriptsEnabled = useState('scripts_enabled', () => false)
  const GTM_ID = 'GTM-WHMK6XD7'
  const GA_ID = 'G-YHZ3LGX35G'
  const ADSENSE_ID = 'ca-pub-2508418027852597'

  const initializeScripts = () => {
    if (import.meta.server || scriptsEnabled.value) return
    
    scriptsEnabled.value = true

    // Initialize dataLayer for GTM
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    // Existing gtag logic for GA4
    window.gtag = function (...args: any[]) { 
      window.dataLayer.push(args) 
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }

  useHead({
    script: computed(() => {
      if (!scriptsEnabled.value) return []
      return [
        // Google Tag Manager
        {
          src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
          async: true,
          key: 'gtm-script'
        },
        // GA4
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
          async: true,
          key: 'google-analytics'
        },
        // AdSense
        {
          src: `https://pagead2.googlesyndication.com/adsbygoogle.js?client=${ADSENSE_ID}`,
          async: true,
          crossorigin: 'anonymous',
          key: 'google-adsense'
        }
      ]
    })
  })

  const checkConsent = () => {
    if (import.meta.server) return null
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      initializeScripts()
    }
    return consent
  }

  return { scriptsEnabled, initializeScripts, checkConsent }
}