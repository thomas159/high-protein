<script setup lang="ts">
export interface Src {
  src?: string;
}

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  preload?: boolean;
  high?: boolean;
}>(), {
  src: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000',
  alt: 'High-Protein Recipe Meal',
  loading: undefined,
  priority: false,
  preload: false,
  high: false,
});

const computedLoading = computed(() => {
  if (props.loading) return props.loading
  if (props.priority || props.preload || props.high) return 'eager'
  return 'lazy'
})

const isPreload = computed(() => {
  return props.preload || props.priority || props.high
})
</script>

<template>
  <NuxtImg 
    provider="cloudinary"
    :src="props.src"
    :alt="props.alt"
    :loading="computedLoading"
    :preload="isPreload"
    class="w-full h-full object-cover" />
</template>