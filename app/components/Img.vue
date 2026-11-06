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
  width?: number | string;
  height?: number | string;
  sizes?: string;
}>(), {
  src: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000',
  alt: 'High-Protein Recipe Meal',
  loading: undefined,
  priority: false,
  preload: false,
  high: false,
  width: undefined,
  height: undefined,
  // Responsive by default so the browser never downloads the full-size original for a small card.
  // Every value needs a breakpoint prefix: a bare '100vw' makes @nuxt/image 2.0 emit broken 1w/2w srcset entries
  sizes: 'sm:100vw md:50vw lg:33vw xl:25vw',
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
    :fetchpriority="isPreload ? 'high' : undefined"
    :width="props.width"
    :height="props.height"
    :sizes="props.sizes"
    class="w-full h-full object-cover" />
</template>