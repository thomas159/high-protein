<script setup lang="ts">
import Img from '@/components/Img.vue'
import type { Recipe } from '@/components/recipeCard.vue'

const props = defineProps<{
  recipes: Recipe[]
}>()

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section v-if="props.recipes?.length" class="my-16">
    <div class="text-center max-w-xl mx-auto mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
        <Icon name="ph:instagram-logo-bold" class="w-3.5 h-3.5" />
        <span>@{{ t('home.instagramStrip.handle') }}</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-tight italic text-foreground mb-1">
        {{ t('home.instagramStrip.title') }}
      </h2>
      <p class="text-xs sm:text-sm text-muted-foreground">
        {{ t('home.instagramStrip.subtitle') }}
      </p>
    </div>

    <!-- 6-Image Grid (Desktop) & Swipe Rail (Mobile) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      <NuxtLink
        v-for="recipe in props.recipes.slice(0, 6)"
        :key="recipe.slug"
        :to="localePath({ name: 'recipes-slug', params: { slug: recipe.slug } })"
        class="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-border/80 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Img
          v-if="recipe.image"
          :src="recipe.image"
          :alt="recipe.alt || recipe.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
          <span class="text-[11px] font-black text-white leading-tight line-clamp-2 mb-1">
            {{ recipe.title }}
          </span>
          <span class="text-[10px] font-extrabold text-emerald-400">
            💪 {{ recipe.macros.protein }}g Protein
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
