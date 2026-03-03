<script setup lang="ts">
// 1. Define the interface to match your Recipe data structure
export interface Src {
  src?: string;
}

const props = defineProps<{
  src?: string;
  alt?: string;
}>();
</script>

<template>
  <img 
    :src="props.src 
      ? `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${props.src}` 
      : 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000'"
    :alt="props.alt || 'Recipe Image'"
    class="w-full h-full object-cover">
</template>