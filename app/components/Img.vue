<script setup lang="ts">
// 1. Define the interface to match your Recipe data structure
export interface Src {
  src?: string;
}

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
}>(), {
  src: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000',
  alt: 'Recipe Image',
});
</script>

<template>
  <NuxtImg 
    provider="cloudinary"
    :src="props.src"
    :alt="props.alt"
    loading="lazy"
    class="w-full h-full object-cover" />
</template>