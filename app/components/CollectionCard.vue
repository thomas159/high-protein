<script setup lang="ts">
import Img from '@/components/Img.vue'

export interface Collection {
  title: string;
  slug: string;
  description: string;
  image?: string;
}

const props = defineProps<{
  collection: Collection;
}>();
</script>

<template>
  <NuxtLink 
    :to="`/collections/${props.collection.slug}`" 
    class="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row hover:-translate-y-2"
  >
    <!-- Text on the left -->
    <div class="p-6 flex-grow flex flex-col justify-center order-2 md:order-1 md:w-1/2">
      <h2 class="font-display text-2xl font-extrabold text-foreground mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 leading-tight">
        {{ props.collection.title }}
      </h2>
      <p class="font-body text-sm text-muted-foreground line-clamp-3 md:line-clamp-4 leading-relaxed">
        {{ props.collection.description }}
      </p>
    </div>

    <!-- Image on the right -->
    <div class="h-52 md:h-auto md:w-1/2 overflow-hidden relative order-1 md:order-2 shrink-0 border-b md:border-b-0 md:border-l border-border">
      <Img 
        :src="props.collection.image"   
        :alt="props.collection.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
    </div>
  </NuxtLink>
</template>