<script setup lang="ts">
// 1. Define the interface to match your Recipe data structure
export interface Src {
  src?: string;
}

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  high?: boolean;
}>(), {
  src: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000',
  alt: 'Recipe Image',
  high: false,
});
</script>

<template>
  <NuxtImg 
    provider="cloudinary"
    :src="props.src"
    :alt="props.alt"
    :preload="props.high && { fetchPriority: 'high' }"
    :loading="!props.high ? 'lazy' : 'eager'"
    class="w-full h-full object-cover" />
</template>