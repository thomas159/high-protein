// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/eslint-module',
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
    url: 'https://hotrecipes.co.uk',
    name: 'Spicy & Healthy Recipes',
    description: 'Quick, low-calorie meals for busy weeknights.',
    defaultLocale: 'en',
  },
  ogImage: {
    enabled: true,
  },
  sitemap: {
    includeAppSources: true,
    sources: [
      '/api/__sitemap__/urls', // Internal route for content discovery
    ]
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'My Recipe Site',
      logo: '/logo.png'
    }
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
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        flag: 'twemoji:flag-united-kingdom',
        file: 'en.json',
      },
      // {
      //   code: 'vi',
      //   name: 'Tiếng Việt',
      //   flag: 'twemoji:flag-vietnam',
      //   file: 'vi.json',
      // },
    ],
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
        'cyrillic-ext',
        'cyrillic',
        'greek-ext',
        'greek',
        'vietnamese',
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