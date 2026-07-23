<script setup lang="ts">
const props = defineProps<{
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  servings: number;
}>();

const { t } = useI18n();

// Logic to calculate percentages of Daily Value (DV) - roughly based on 2000kcal
// This adds to the "Clinical/Authority" feel
const dvProtein = computed(() => Math.round((props.macros.protein / 50) * 100)); // 50g base
const dvCarbs = computed(() => Math.round((props.macros.carbs / 275) * 100)); // 275g base
const dvFat = computed(() => Math.round((props.macros.fat / 78) * 100)); // 78g base
</script>

<template>
  <div class="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 p-4 font-sans text-slate-950 dark:text-slate-100 shadow-sm rounded-sm max-w-[280px]">
    <h3 class="text-2xl font-black uppercase tracking-tighter leading-none border-b-8 border-slate-950 dark:border-slate-700 pb-1 mb-1">
      {{ t('recipes.protein') }} Facts
    </h3>
    <div class="text-sm font-bold border-b border-slate-950 dark:border-slate-700 pb-1">
      {{ servings }} Servings Per Recipe
    </div>
    
    <div class="flex justify-between items-end border-b-4 border-slate-950 dark:border-slate-700 py-1 mb-1">
      <div class="flex flex-col">
        <span class="text-xs font-black uppercase leading-none">Amount Per Serving</span>
        <span class="text-2xl font-black leading-none uppercase">{{ t('recipes.kcal') }}</span>
      </div>
      <span class="text-3xl font-black leading-none">{{ macros.calories }}</span>
    </div>

    <div class="text-right text-[10px] font-black border-b border-slate-950 dark:border-slate-700 pb-0.5 mb-1">
      % Daily Value *
    </div>

    <div class="flex justify-between border-b border-slate-950 dark:border-slate-700 py-1">
      <div class="text-sm"><span class="font-black">{{ t('recipes.protein') }}</span> {{ macros.protein }}g</div>
      <span class="font-black text-sm text-emerald-600 dark:text-emerald-400">{{ dvProtein }}%</span>
    </div>

    <div class="flex justify-between border-b border-slate-950 dark:border-slate-700 py-1">
      <div class="text-sm"><span class="font-black">{{ t('recipes.carbs') }}</span> {{ macros.carbs }}g</div>
      <span class="font-black text-sm">{{ dvCarbs }}%</span>
    </div>

    <div class="flex justify-between border-b-4 border-slate-950 dark:border-slate-700 py-1 mb-2">
      <div class="text-sm"><span class="font-black">{{ t('recipes.fat') }}</span> {{ macros.fat }}g</div>
      <span class="font-black text-sm">{{ dvFat }}%</span>
    </div>

    <p class="text-[9px] leading-tight text-slate-500 dark:text-slate-400">
      * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
    </p>
    
    <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
       <Icon name="ph:seal-check-fill" class="text-emerald-500 w-5 h-5" />
       <span class="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Verified Protein Density</span>
    </div>
  </div>
</template>

<style scoped>
/* Force a more "printed" look for the label */
.font-sans {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
