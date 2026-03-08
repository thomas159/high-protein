<script setup lang="ts">
</script>

<template>
   <div class="min-h-screen font-sans pb-24 md:pb-0 bg-background text-foreground antialiased transition-colors duration-300">
   <header class="sticky top-0 w-full border-b bg-background z-50">
      <LayoutsHeader />
    </header>
    <div class="container py-8 px-4">
      <NuxtPage />
    </div>
    <CookieBanner />
    <LayoutsFooter />
  </div>
</template>