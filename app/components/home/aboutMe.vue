<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <section class="container mx-auto py-8 px-6 my-12 bg-muted/30 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-center border border-border">
    <div class="w-32 h-32 rounded-full overflow-hidden shrink-0 ring-4 ring-emerald-500/20">
      <img src="/images/tom.avif" class="w-full h-full object-cover" :alt="appConfig.author" />
    </div>
    
    <div class="max-w-xl text-center md:text-left">
      <h2 class="text-2xl font-bold text-foreground mb-2">Hi, I'm {{ appConfig.author }}! 👋</h2>
      <p class="text-muted-foreground mb-4 leading-relaxed">
        I share fast, macro-friendly, and high-protein recipes on {{ appConfig.siteName }} to help you hit your fitness goals without spending hours in the kitchen.
      </p>
      <NuxtLink to="/about" class="inline-flex items-center text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
        Read My Story <span class="ml-1">&rarr;</span>
      </NuxtLink>
    </div>
  </section>
</template>