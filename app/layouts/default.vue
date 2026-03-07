<script setup lang="ts">
</script>

<template>
   <div class="min-h-screen font-sans pb-24 md:pb-0 bg-background text-foreground antialiased transition-colors duration-300">
   <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <LayoutsHeader />
    </header>
    <div class="container pt-4 px-4">
      <NuxtPage />
    </div>
    <LayoutsFooter />
  </div>
</template>