<script setup lang="ts">
</script>

<template>
   <div class="min-h-screen font-sans pb-24 md:pb-0 bg-background text-foreground antialiased transition-colors duration-300">
    <LayoutsHeader />
    <div class="container">
      <NuxtPage />
    </div>
    <LayoutsFooter />
  </div>
</template>

<!-- <style>
/* Added global styling for dark mode background */
body {
  @apply antialiased bg-slate-950 text-slate-200;
}
</style> -->