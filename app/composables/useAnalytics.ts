// composables/useAnalytics.ts
import { useHead, useState, computed } from '#imports'

export const useAnalytics = () => {
  const scriptsEnabled = useState<boolean>('scripts_enabled', () => false)
  
  // Your specific IDs
  const GTM_ID = 'GTM-WHMK6XD7'
  const GA_ID = 'G-YHZ3LGX35G'
  const ADSENSE_ID = 'ca-pub-2508418027852597'

  const initializeScripts = () => {
    if (import.meta.server || scriptsEnabled.value) return
    
    scriptsEnabled.value = true

    // 1. Initialize DataLayer for GTM
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    // 2. Define gtag globally
    window.gtag = function (...args: any[]) { 
      window.dataLayer.push(args) 
    }
    
    // 3. Configure GA4 Measurement ID
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, {
      cookie_domain: 'auto',
      // Sending the stream name as a custom dimension can be helpful
      stream_name: 'hotrecipes' 
    })
  }

  useHead({
    script: computed(() => {
      if (!scriptsEnabled.value) return []
      return [
        // Google Tag Manager Script
        {
          src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
          async: true,
          key: 'gtm-js'
        },
        // Google Analytics 4 (Measurement ID: G-YHZ3LGX35G)
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
          async: true,
          key: 'ga-js'
        },
        // Google AdSense
        {
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`,
          async: true,
          crossorigin: 'anonymous',
          key: 'ads-js'
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

  return {
    scriptsEnabled,
    initializeScripts,
    checkConsent
  }
}