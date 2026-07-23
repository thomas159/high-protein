<script setup lang="ts">
const appConfig = useAppConfig()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="container mx-auto py-8 px-6 my-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-center">
    <div class="w-32 h-32 rounded-full overflow-hidden shrink-0 ring-4 ring-emerald-500/20">
      <img src="/images/tom.avif" class="w-full h-full object-cover" :alt="appConfig.author" />
    </div>
    
    <div class="max-w-xl text-center md:text-left">
      <h2 class="text-2xl font-black uppercase tracking-tighter italic text-white mb-2">{{ t('home.about.hi', { author: appConfig.author }) }}</h2>
      <p class="text-muted-foreground mb-4 leading-relaxed">
        {{ t('home.about.description', { siteName: appConfig.siteName }) }}
      </p>
      <NuxtLink :to="localePath('/about')" class="inline-flex items-center text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
        {{ t('home.about.readMore') }} <span class="ml-1">&rarr;</span>
      </NuxtLink>
    </div>
  </section>
</template>