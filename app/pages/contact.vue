<script setup lang="ts">
const appConfig = useAppConfig()
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
    alert("Something went wrong. Please try again.")
  } finally {
    loading.value = false
  }
}
useHead({
  title: `Contact Us - ${appConfig.siteName}`, 
  meta: [
    { 
      name: 'description', 
      content: `Have a question or a recipe suggestion? Reach out to the ${appConfig.siteName} team.` 
    }
  ]
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-16">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-4">Get in Touch</h1>
      <p class="text-muted-foreground">
        Have a question about a recipe? Interested in a partnership? We'd love to hear from you.
      </p>
    </div>

    <div v-if="submitted" class="bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-400 p-6 rounded-xl text-center">
      <h3 class="font-bold text-lg">Message Sent!</h3>
      <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
      <button 
        role="button"
        aria-label="Send another message"
        @click="submitted = false" class="mt-4 text-sm underline">Send another message</button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">Name</label>
          <input 
            v-model="formData.name"
            type="text" 
            required
            placeholder="Your name"
            class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input 
            v-model="formData.email"
            type="email" 
            required
            placeholder="your@email.com"
            class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Message</label>
        <textarea 
          v-model="formData.message"
          rows="5" 
          required
          placeholder="How can we help?"
          class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
        ></textarea>
      </div>

      <button 
        role="button"
        aria-label="Send Message"
        type="submit" 
        :disabled="loading"
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ loading ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>