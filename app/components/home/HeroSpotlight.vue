<script setup lang="ts">
import Img from '@/components/Img.vue'

interface MacroBreakdown {
  calories: number
  carbs: number
  protein: number
  fat: number
}

interface SpotlightRecipe {
  title: string
  slug: string
  description?: string
  image?: string
  alt?: string
  categories?: string[]
  prepTimeMins: number
  cookTimeMins: number
  macros: MacroBreakdown
}

const props = defineProps<{
  recipe?: SpotlightRecipe | null
}>()

const localePath = useLocalePath()
const { t } = useI18n()
const { formatText } = useFormatText()
</script>

<template>
  <div v-if="props.recipe" class="relative group">
    <!-- Subtle glow backdrop -->
    <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

    <NuxtLink
      :to="localePath({ name: 'recipes-slug', params: { slug: props.recipe.slug } })"
      class="relative flex flex-col bg-card rounded-3xl border border-border/80 shadow-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:border-emerald-500/50"
    >
      <!-- Media Header -->
      <div class="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
        <Img
          v-if="props.recipe.image"
          :src="props.recipe.image"
          :alt="props.recipe.alt || props.recipe.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <!-- Floating Badges -->
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            {{ t('home.hero.spotlightBadge') }}
          </span>
          <span
            v-if="props.recipe.categories?.length"
            class="bg-background/90 text-foreground backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border/60 shadow"
          >
            {{ t(`categories.${props.recipe.categories[0]}`) }}
          </span>
        </div>

        <!-- Quick Ready Tag over image -->
        <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div class="text-white">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">⚡ Fast & High-Protein</span>
            <h3 class="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
              {{ props.recipe.title }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Content Body -->
      <div class="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-5 sm:gap-6">
        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="props.recipe.description"
          class="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
          v-html="formatText(props.recipe.description)"
        />
        <!-- eslint-enable vue/no-v-html -->

        <!-- Macro Trio Dashboard -->
        <div class="grid grid-cols-3 gap-2.5 sm:gap-3">
          <!-- Protein -->
          <div class="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span class="text-lg sm:text-2xl font-black tracking-tight text-emerald-500">
              {{ props.recipe.macros.protein }}g
            </span>
            <span class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {{ t('recipes.protein') }}
            </span>
          </div>

          <!-- Calories -->
          <div class="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-muted/60 border border-border text-center">
            <span class="text-lg sm:text-2xl font-black tracking-tight text-foreground">
              {{ props.recipe.macros.calories }}
            </span>
            <span class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Kcal
            </span>
          </div>

          <!-- Total Time -->
          <div class="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-muted/60 border border-border text-center">
            <span class="text-lg sm:text-2xl font-black tracking-tight text-foreground">
              {{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }}m
            </span>
            <span class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Cook Time
            </span>
          </div>
        </div>

        <!-- Action Button Bar -->
        <div class="flex items-center justify-between pt-2 border-t border-border/60">
          <span class="text-xs font-bold text-muted-foreground">
            Complete macro breakdown inside
          </span>
          <span class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
            {{ t('home.hero.viewRecipe') }} &rarr;
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
