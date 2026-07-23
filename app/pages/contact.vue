<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const response = await fetch('https://formspree.io/f/mlgpdjge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })

    if (response.ok) {
      submitted.value = true
    }
  } catch (error) {
    alert(t('contact.form.error'))
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: () => t('seo.contact.title', { siteName: appConfig.siteName }),
  description: () => t('seo.contact.description', { siteName: appConfig.siteName }),
  ogTitle: () => t('seo.contact.title', { siteName: appConfig.siteName }),
  ogDescription: () => t('seo.contact.description', { siteName: appConfig.siteName }),
  twitterTitle: () => t('seo.contact.title', { siteName: appConfig.siteName }),
  twitterDescription: () => t('seo.contact.description', { siteName: appConfig.siteName }),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-16">
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-6">{{ $t('contact.title') }}</h1>
      <p class="text-muted-foreground">
        {{ $t('contact.description') }}
      </p>
    </div>

    <div v-if="submitted" class="bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-400 p-6 rounded-xl text-center">
      <h3 class="font-bold text-lg">{{ $t('contact.success.title') }}</h3>
      <p>{{ $t('contact.success.description') }}</p>
      <button 
        role="button"
        :aria-label="$t('contact.success.button')"
        @click="submitted = false" class="mt-4 text-sm underline">{{ $t('contact.success.button') }}</button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('contact.form.name') }}</label>
          <input 
            v-model="formData.name"
            type="text" 
            required
            :placeholder="$t('contact.form.namePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('contact.form.email') }}</label>
          <input 
            v-model="formData.email"
            type="email" 
            required
            :placeholder="$t('contact.form.emailPlaceholder')"
            class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('contact.form.message') }}</label>
        <textarea 
          v-model="formData.message"
          rows="5" 
          required
          :placeholder="$t('contact.form.messagePlaceholder')"
          class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
        ></textarea>
      </div>

      <button 
        role="button"
        :aria-label="$t('contact.form.send')"
        type="submit" 
        :disabled="loading"
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ loading ? $t('contact.form.sending') : $t('contact.form.send') }}
      </button>
    </form>
  </div>
</template>