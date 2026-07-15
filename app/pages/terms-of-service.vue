<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

useHead({
  title: t('seo.terms.title', { siteName: appConfig.siteName }),
  meta: [
    { name: 'robots', content: 'noindex' },
    { name: 'description', content: t('seo.terms.description', { siteName: appConfig.siteName }) }
  ]
})
const localePath = useLocalePath()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
    <h1 class="text-4xl font-bold mb-6">{{ $t('termsOfService.title') }}</h1>
    
    <section class="mb-8">
      <p><strong>{{ $t('termsOfService.welcome', { siteName: appConfig.siteName }) }}</strong></p>
      <p>{{ $t('termsOfService.p1', { siteName: appConfig.siteName }) }}</p>
    </section>

    <h2 class="text-2xl font-semibold mt-8 text-emerald-500">{{ $t('termsOfService.s1.title') }}</h2>
    <div class="bg-muted p-4 rounded-lg border-l-4 border-emerald-500 my-4 text-sm">
      <p class="font-bold mb-2 uppercase">{{ $t('termsOfService.s1.notice') }}</p>
      <p>{{ $t('termsOfService.s1.p', { siteName: appConfig.siteName }) }}</p>
    </div>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('termsOfService.s2.title') }}</h2>
    <p>{{ $t('termsOfService.s2.p', { siteName: appConfig.siteName }) }}</p>
    <p class="mt-2 font-medium">{{ $t('termsOfService.s2.mustNot') }}</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>{{ $t('termsOfService.s2.li1') }}</li>
      <li>{{ $t('termsOfService.s2.li2', { siteName: appConfig.siteName }) }}</li>
      <li>{{ $t('termsOfService.s2.li3') }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('termsOfService.s3.title') }}</h2>
    <p>{{ $t('termsOfService.s3.p', { siteName: appConfig.siteName }) }}</p>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('termsOfService.s4.title') }}</h2>
    <p>{{ $t('termsOfService.s4.p', { siteName: appConfig.siteName }) }}</p>

    <h2 class="text-2xl font-semibold mt-8">{{ $t('termsOfService.s5.title') }}</h2>
    <p>{{ $t('termsOfService.s5.p') }}</p>

    <div class="mt-12 text-sm text-muted-foreground border-t border-border pt-8">
      <p>
        {{ $t('termsOfService.contact.p') }}
        <NuxtLink :to="localePath('/contact')" class="text-emerald-500 underline">{{ $t('termsOfService.contact.link') }}</NuxtLink>.
      </p>
    </div>
  </div>
</template>