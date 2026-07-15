<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.about.title', { siteName: appConfig.siteName }),
  description: () => t('seo.about.description', { siteName: appConfig.siteName }),
  ogTitle: () => t('seo.about.title', { siteName: appConfig.siteName }),
  ogDescription: () => t('seo.about.description', { siteName: appConfig.siteName }),
  twitterTitle: () => t('seo.about.title', { siteName: appConfig.siteName }),
  twitterDescription: () => t('seo.about.description', { siteName: appConfig.siteName }),
  twitterCard: 'summary_large_image'
})

const stats = [
  { label: 'Recipes', value: '50+' },
  { label: 'Home Cooks', value: '10k+' },
  { label: 'Kitchen Tips', value: '100+' },
]
const localePath = useLocalePath()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <section class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        {{ t('about.title', { span: '' }).split('{span}')[0] }}<span class="text-emerald-500">{{ t('about.span') }}</span>{{ t('about.title', { span: '' }).split('{span}')[1] }}
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed">
        {{ t('about.description', { siteName: appConfig.siteName }) }}
      </p>
    </section>

    <div class="grid md:grid-cols-2 gap-12 items-start mb-16">
      <div class="space-y-6">
        <div class="rounded-2xl overflow-hidden bg-muted aspect-square">
         <img 
            src="/images/tom-gym.avif" 
            alt="Tom, creator of Hot Recipes, at the gym" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Social Media Links -->
        <div class="flex justify-center gap-6 pt-2">
          <a href="https://www.pinterest.com/hotRecipesUk" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-emerald-500 transition-colors" aria-label="Pinterest">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.625 0 12.017 0z"/></svg>
          </a>
        </div>
      </div>
      
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-foreground">{{ t('about.story.title', { siteName: appConfig.siteName }) }}</h2>
        <p class="text-muted-foreground">
          {{ t('about.story.p1') }}
        </p>
        <p class="text-muted-foreground">
          {{ t('about.story.p2') }}
        </p>
        <p class="text-muted-foreground">
          {{ t('about.story.p3') }}
        </p>
        <p class="text-muted-foreground font-medium">
          {{ t('about.story.expect', { siteName: appConfig.siteName }) }}
        </p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{{ t('about.story.list1') }}</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{{ t('about.story.list2') }}</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{{ t('about.story.list3') }}</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{{ t('about.story.list4') }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- <section class="grid grid-cols-3 gap-4 py-10 border-y border-border mb-16">
      <div v-for="stat in stats" :key="stat.label" class="text-center">
        <div class="text-2xl md:text-3xl font-bold text-foreground">{{ stat.value }}</div>
        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </section> -->

    <section class="bg-muted rounded-3xl p-8 md:p-12 text-center">
      <h2 class="text-2xl font-bold mb-4">{{ t('about.cta.title') }}</h2>
      <p class="text-muted-foreground mb-8">
        {{ t('about.cta.description', { siteName: appConfig.siteName }) }}
      </p>
      <NuxtLink 
        :to="localePath('/categories/all-recipes')" 
        class="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        {{ t('about.cta.button') }}
      </NuxtLink>
    </section>
  </div>
</template>