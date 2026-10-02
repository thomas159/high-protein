<script setup lang="ts">
import Img from '@/components/Img.vue'

export interface Recipe {
  title: string;
  slug: string;
  description: string;
  image?: string; 
  alt?: string;
  categories: string[];
  tags: string[];
  rating: number;
  reviews: number;
  prepTimeMins: number;
  cookTimeMins: number;
  servings: number;
  macros: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  ingredients: {
    item: string;
    amount: number;
    unit: string;
  }[];
}
const props = defineProps<{
  recipe: Recipe;
}>();

const { formatText } = useFormatText()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <NuxtLink 
    :to="localePath({ name: 'recipes-slug', params: { slug: props.recipe.slug } })" 
    class="group bg-card rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl border border-border/80 overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-1.5"
  >
    <div class="h-60 sm:h-64 w-full overflow-hidden relative bg-slate-900">
      <Img 
        :src="props.recipe.image"   
        :alt="props.recipe.alt || props.recipe.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Top Badges -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-2">
        <span 
          v-if="props.recipe.categories?.length" 
          class="font-body text-[10px] font-black uppercase tracking-wider bg-background/90 text-foreground px-2.5 py-1 rounded-full backdrop-blur-md border border-border/60 shadow"
        >
          {{ t(`categories.${props.recipe.categories[0]}`) }}
        </span>
      </div>

      <!-- High Protein / Popular Badge -->
      <div v-if="props.recipe.macros.protein >= 25" class="absolute top-3 right-3 z-10">
        <span class="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
          {{ props.recipe.macros.protein >= 30 ? '30g+ CLUB' : t('tags.high-protein') }}
        </span>
      </div>
    </div>
    
    <div class="p-4 sm:p-5 flex-grow flex flex-col">
      <!-- Micro-meta row -->
      <div class="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">
        <span class="inline-flex items-center gap-1 text-emerald-500 font-black">
          <Icon name="ph:barbell-bold" class="w-3.5 h-3.5" />
          {{ props.recipe.macros.protein }}g
        </span>
        <span class="text-border/80">•</span>
        <span class="inline-flex items-center gap-1">
          <Icon name="ph:fire-bold" class="w-3.5 h-3.5 text-amber-500" />
          {{ props.recipe.macros.calories }} kcal
        </span>
        <span class="text-border/80">•</span>
        <span class="inline-flex items-center gap-1">
          <Icon name="ph:timer-bold" class="w-3.5 h-3.5" />
          {{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }}m
        </span>
      </div>
      
      <h2 class="font-display text-base sm:text-lg font-black text-foreground mb-2 group-hover:text-emerald-500 transition-colors leading-snug tracking-tight">
        {{ props.recipe.title }}
      </h2>
      
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="font-body text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed" v-html="formatText(props.recipe.description)"/>
      
      <div class="mt-auto pt-3 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-emerald-500 group-hover:text-emerald-400 border-t border-border/60 transition-colors">
        <span>{{ t('home.hero.viewRecipe') }}</span>
        <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
    </div>
  </NuxtLink>
</template>