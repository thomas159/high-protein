<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

useHead({
  title: t('seo.privacy.title', { siteName: appConfig.siteName }),
  meta: [
    { name: 'robots', content: 'noindex' },
    { name: 'description', content: t('seo.privacy.description', { siteName: appConfig.siteName }) }
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
    <h1 class="text-4xl font-bold mb-2">{{ $t('privacyPolicy.title') }}</h1>
    <p class="text-muted-foreground mb-8">{{ $t('privacyPolicy.lastUpdated') }} {{ appConfig.lastUpdated }}</p>

    <section class="mb-8">
      <p v-html="$t('privacyPolicy.intro1', { siteName: appConfig.siteName })"></p>
    </section>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('privacyPolicy.s1.title') }}</h2>
    <p>{{ $t('privacyPolicy.s1.p', { siteName: appConfig.siteName }) }}</p>

    <h2 class="text-2xl font-semibold mt-8 text-emerald-500">{{ $t('privacyPolicy.s2.title') }}</h2>
    <p>
      {{ $t('privacyPolicy.s2.p') }}
      <a href="https://policies.google.com/technologies/ads" class="text-emerald-500 underline" target="_blank">https://policies.google.com/technologies/ads</a>
    </p>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('privacyPolicy.s3.title') }}</h2>
    <p>{{ $t('privacyPolicy.s3.p') }}</p>
    <ul>
      <li><strong>Google AdSense</strong></li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('privacyPolicy.s4.title') }}</h2>
    <p>{{ $t('privacyPolicy.s4.p', { siteName: appConfig.siteName }) }}</p>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('privacyPolicy.s5.title') }}</h2>
    <p>{{ $t('privacyPolicy.s5.p', { siteName: appConfig.siteName }) }}</p>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('privacyPolicy.s6.title') }}</h2>
    <p>{{ $t('privacyPolicy.s6.p') }}</p>

    <div class="mt-12 p-6 bg-muted rounded-xl border border-border">
      <h3 class="text-lg font-bold mb-2">{{ $t('privacyPolicy.questions.title') }}</h3>
      <p class="text-sm">
        {{ $t('privacyPolicy.questions.p') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.prose {
  color: var(--foreground);
}
</style>