// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  sourcemap: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/content', // Ensure this is @nuxt/content v3 if using the 'build' property
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    '@nuxt/scripts',
    '@vercel/analytics',
    '@vercel/speed-insights'
  ],
  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-YHZ3LGX35G' // Your GA4 Measurement ID
      }
    }
  },
  // Site Configuration
  site: {
    url: 'https://www.hotrecipes.co.uk',
    name: 'Hot Recipes',
    description: 'Quick, tasty, and high-protein vegetarian and vegan recipes designed to fuel your goals without sacrificing flavor.',
    defaultLocale: 'en',
    trailingSlash: false,
  },
  ogImage: {
    enabled: true,
  },
  sitemap: {
    includeAppSources: true,
    exclude: ['/api/**'],
    sources: [
      '/api/__sitemap__/urls', // Internal route for content discovery
    ]
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Hot Recipes',
      logo: '/logo.svg'
    }
  },
  robots: {
    disallow: ['/api', '/admin']
  },
  // Content
  content: {
    database: {
      type: 'sqlite',
      driver: 'wasm'
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai'
          }
        }
      }
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  colorMode: {
    dataValue: 'theme',
    classPrefix: '',
    classSuffix: '',
    fallback: 'light',
    storage: 'localStorage',
    storageKey: 'theme',
  },
  image: {
    domains: ['high-protein.vercel.app'],
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/',
      // modifiers: {
      //   effect: 'sharpen:100',
      //   quality: 'auto:best'
      // }
    },
    // dir: 'public/images',
    // quality: 80,
    format: ['webp'],
    screens: {
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536
    }
  },
  css: ['~/assets/css/styles.css'],
  runtimeConfig: {
    public: {
      GOOGLE_API_KEY: process.env.GG_API_KEY,
      SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
    }
  },
  vite: {
    server: {
      allowedHosts: ['localhost', '.dev'],
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.plugin === '@tailwindcss/vite:generate:build' && warning.message.includes('Sourcemap is likely to be incorrect')) return
          warn(warning)
        }
      }
    },
  },
  i18n: {
    baseUrl: 'https://www.hotrecipes.co.uk',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    langDir: 'locales',
    lazy: true,
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        flag: 'twemoji:flag-united-kingdom',
        file: 'en.json',
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        flag: 'twemoji:flag-spain',
        file: 'es.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    pages: {
      'recipes': {
        en: '/recipes',
        es: '/recetas'
      },
      'recipes-slug': {
        en: '/recipes/[slug]',
        es: '/recetas/[slug]'
      },
      'collections': {
        en: '/collections',
        es: '/colecciones'
      },
      'collections-slug': {
        en: '/collections/[slug]',
        es: '/colecciones/[slug]'
      },
      'categories-slug': {
        en: '/categories/[slug]',
        es: '/categorias/[slug]'
      },
      'about': {
        en: '/about',
        es: '/sobre-nosotros'
      },
      'contact': {
        en: '/contact',
        es: '/contacto'
      },
      'privacy-policy': {
        en: '/privacy-policy',
        es: '/politica-de-privacidad'
      },
      'terms-of-service': {
        en: '/terms-of-service',
        es: '/terminos-de-servicio'
      }
    }
  },
  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google' },
      { name: 'Poppins', provider: 'google', weights: [400, 700] }
    ],
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      subsets: [
        'latin-ext',
        'latin',
      ]
    },
  },
  eslint: {
    overrideConfig: {
      rules: {
        'vue/multi-word-component-names': [0],
      }
    }
  }
})