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
    :to="localePath(`/recipes/${props.recipe.slug}`)" 
    class="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-2"
  >
    <div class="h-52 w-full overflow-hidden relative">
      <Img 
        :src="props.recipe.image"   
        :alt="props.recipe.alt"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div class="absolute top-3 left-3 flex flex-wrap gap-2">
        <span 
          v-if="props.recipe.categories?.length" 
          class="font-body text-[9px] font-black uppercase tracking-widest bg-slate-950/80 text-white px-2 py-1 rounded-sm backdrop-blur-md border border-white/10 shadow-lg"
        >
          {{ t(`categories.${props.recipe.categories[0]}`) }}
        </span>
      </div>
    </div>
    
    <div class="p-4 flex-grow flex flex-col">
      
      <h2 class="font-display text-lg font-black text-foreground mb-2 group-hover:text-emerald-500 transition-colors md:line-clamp-2 leading-tight tracking-tight">
        {{ props.recipe.title }}
      </h2>
      
      <p class="font-body text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed" v-html="formatText(props.recipe.description)">
      </p>
      
      <div class="mt-auto pt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-t border-border/50">
        <div class="flex items-center gap-1.5">
          <span class="text-emerald-500">💪</span>
          <span>{{ props.recipe.macros.protein }}g {{ t('recipes.protein') }}</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1">
            <span class="opacity-70 text-amber-500">🔥</span>
            <span>{{ t('recipes.kcalCount', { count: props.recipe.macros.calories }) }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1">
            <span class="opacity-70">⏱</span>
            <span>{{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }}m</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- High Protein Badge -->
    <div v-if="props.recipe.macros.protein >= 20" class="absolute top-3 right-3 z-10">
      <span class="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded shadow-lg border border-emerald-400/50">
        {{ t('tags.high-protein') }}
      </span>
    </div>
  </NuxtLink>
</template>