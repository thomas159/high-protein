import { computed, useHead, useState } from '#imports'

export const useAnalytics = () => {
  // Use a standard ref or useState to track activation
  const scriptsEnabled = useState('scripts_enabled', () => false)
  const GA_ID = 'G-YHZ3LGX35G'
  const ADSENSE_ID = 'ca-pub-2508418027852597'

  // Define the helper function globally for the browser
  const defineGtag = () => {
    if (import.meta.server) return
    
    window.dataLayer = window.dataLayer || []
    // Assigning to window fixes the "gtag is not defined" error
    window.gtag = function (...args: any[]) { 
      window.dataLayer.push(args) 
    }
    
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { 
      cookie_domain: 'auto',
      debug_mode: true
    })
  }

  const initializeScripts = () => {
    // Prevent double-initialization or server-side execution
    if (import.meta.server || scriptsEnabled.value) return
    
    scriptsEnabled.value = true
    defineGtag()
  }

  // Nuxt/Unhead will watch this computed property
  useHead({
    script: computed(() => {
      if (!scriptsEnabled.value) return []
      return [
        { 
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, 
          async: true,
          key: 'google-analytics' // Adding keys helps Nuxt manage the tags
        },
        { 
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`, 
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

  return {
    scriptsEnabled,
    initializeScripts,
    checkConsent
  }
}