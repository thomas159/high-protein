<script setup lang="ts">
import Img from '@/components/Img.vue'

export interface Recipe {
  title: string;
  slug: string;
  description: string;
  image?: string; 
  alt?: string;
  categories: string;
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
  high?: boolean;
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
    <div :class="[high ? 'flex-grow min-h-[300px]' : 'h-52', 'w-full overflow-hidden relative']">
      <Img 
        :src="props.recipe.image"   
        :high="props.high"
        :alt="props.recipe.alt"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div class="absolute top-3 left-3">
        <!-- <span class="font-body text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/20 shadow-sm">
          {{ props.recipe.categories }}
        </span> -->
      </div>
    </div>
    
    <div class="p-2 flex-grow flex flex-col">
      
      <h2 class="font-display text-base font-extrabold text-foreground mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 md:line-clamp-2 leading-tight">
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
        High Protein
      </span>
    </div>
  </NuxtLink>
</template>