<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Flavor Feast',
  meta: [{ name: 'robots', content: 'noindex' }] // Usually best to keep legal pages out of main search results
})

const siteName = "Flavor Feast"
const lastUpdated = "March 2026"
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
    <h1 class="text-4xl font-bold mb-2">Privacy Policy</h1>
    <p class="text-muted-foreground mb-8">Last Updated: {{ lastUpdated }}</p>

    <section class="mb-8">
      <p>
        At <strong>{{ siteName }}</strong>, accessible from your-domain.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {{ siteName }} and how we use it.
      </p>
    </section>

    <h2 class="text-2xl font-semibold mt-8">1. Log Files</h2>
    <p>
      {{ siteName }} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
    </p>

    <h2 class="text-2xl font-semibold mt-8 text-emerald-500">2. Google DoubleClick DART Cookie</h2>
    <p>
      Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: 
      <a href="https://policies.google.com/technologies/ads" class="text-emerald-500 underline" target="_blank">https://policies.google.com/technologies/ads</a>
    </p>

    <h2 class="text-2xl font-semibold mt-8">3. Our Advertising Partners</h2>
    <p>
      Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
    </p>
    <ul>
      <li><strong>Google AdSense</strong></li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8">4. Privacy Policies</h2>
    <p>
      Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on {{ siteName }}, which are sent directly to users' browser. They automatically receive your IP address when this occurs.
    </p>

    <h2 class="text-2xl font-semibold mt-8">5. Third Party Privacy Policies</h2>
    <p>
      {{ siteName }}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
    </p>

    <h2 class="text-2xl font-semibold mt-8">6. Consent</h2>
    <p>
      By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
    </p>

    <div class="mt-12 p-6 bg-muted rounded-xl border border-border">
      <h3 class="text-lg font-bold mb-2">Questions?</h3>
      <p class="text-sm">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our contact page.</p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the prose looks good with your theme */
.prose {
  color: var(--foreground);
}
</style>