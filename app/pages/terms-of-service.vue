<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  title: `Terms of Service - ${appConfig.siteName}`,
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
    <h1 class="text-4xl font-bold mb-6">Terms of Service</h1>
    
    <section class="mb-8">
      <p>Welcome to <strong>{{ appConfig.siteName }}</strong>.</p>
      <p>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use {{ appConfig.siteName }} if you do not agree to take all of the terms and conditions stated on this page.
      </p>
    </section>

    <h2 class="text-2xl font-semibold mt-8 text-emerald-500">1. Recipe & Health Disclaimer</h2>
    <div class="bg-muted p-4 rounded-lg border-l-4 border-emerald-500 my-4 text-sm">
      <p class="font-bold mb-2 uppercase">Important Safety Notice:</p>
      <p>
        All content on {{ appConfig.siteName }} is provided for informational purposes only. We are not nutritionists or medical professionals. 
        You are responsible for your own safety in the kitchen. We are not liable for any adverse reactions to food (allergies), 
        injuries sustained during cooking, or errors in recipe outcomes. Use your best judgment when handling raw ingredients and kitchen equipment.
      </p>
    </div>

    <h2 class="text-2xl font-semibold mt-8">2. Intellectual Property Rights</h2>
    <p>
      Unless otherwise stated, {{ appConfig.siteName }} and/or its licensors own the intellectual property rights for all material on this website. 
      All intellectual property rights are reserved. You may access this from {{ appConfig.siteName }} for your own personal use subjected to restrictions set in these terms and conditions.
    </p>
    <p class="mt-2 font-medium">You must not:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Republish our recipes or photos without direct written credit and a backlink.</li>
      <li>Sell, rent, or sub-license material from {{ appConfig.siteName }}.</li>
      <li>Reproduce, duplicate, or copy material for commercial purposes.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8">3. Cookies</h2>
    <p>
      We employ the use of cookies. By accessing {{ appConfig.siteName }}, you agreed to use cookies in agreement with our Privacy Policy. 
      As noted in our policy, our advertising partners (such as Google AdSense) may also use cookies to track user behavior.
    </p>

    <h2 class="text-2xl font-semibold mt-8">4. User Comments</h2>
    <p>
      Users may be allowed to post comments on recipes. {{ appConfig.siteName }} does not filter or edit comments prior to their presence on the website. 
      Comments reflect the views of the person who posts them. We reserve the right to monitor and remove any comments that are deemed inappropriate or offensive.
    </p>

    <h2 class="text-2xl font-semibold mt-8">5. Governing Law</h2>
    <p>
      These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, 
      and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
    </p>

    <div class="mt-12 text-sm text-muted-foreground border-t border-border pt-8">
      <p>If you have any questions regarding these Terms, please contact us via our <NuxtLink to="/contact" class="text-emerald-500 underline">Contact Page</NuxtLink>.</p>
    </div>
  </div>
</template>