<script setup lang="ts">
export interface Recipe {
  title: string;
  description: string;
  image?: string; // Optional, matching our Zod schema
  category: string;
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
console.log(props.recipe)
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    
    <!-- Left Column: Details -->
    <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center h-full">
        <!-- Breadcrumbs -->
        <nav class="text-sm text-slate-400 mb-4 flex items-center gap-2">
        <a href="#" class="hover:text-emerald-400 transition-colors">Recipes</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        <span class="text-white font-medium">Burgers</span>
        </nav>

        <!-- Logistics Tags (No Macros Here) -->
        <div class="flex flex-wrap gap-2 mb-5">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/30 text-emerald-400 border border-emerald-800/50">
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            Vegetarian
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/60">
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            35 mins
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/60">
            Dinner
        </span>
        </div>

        <!-- Title (Stylized) -->
        <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
        {{ recipe.title }}
        </h1>

        <!-- Description -->
        <p class="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
        A hearty, high-protein veggie burger, packed with a spicy chickpea patty and topped with fresh avocado & cheese — served with perfectly roasted sweet potato fries.
        </p>

        <!-- Reviews -->
        <div class="flex items-center gap-2 mb-8">
        <div class="flex text-amber-400">
            <svg v-for="i in 4" :key="i" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/><rect x="0" y="0" width="12" height="24" fill="currentColor" style="mix-blend-mode: color;"/></svg>
        </div>
        <span class="font-semibold text-white">4.9</span>
        <span class="text-sm text-slate-400 underline decoration-slate-600 cursor-pointer hover:text-white transition-colors">(347 reviews)</span>
        </div>

        <!-- Macro Blocks (The Only Place Numbers Live) -->
        <div class="grid grid-cols-4 gap-3 md:gap-4 border-t border-b border-slate-800/80 py-6">
        <div class="bg-emerald-900/20 rounded-xl p-3 md:p-4 text-center border border-emerald-800/40">
            <div class="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">22g</div>
            <div class="text-[10px] md:text-xs font-semibold text-emerald-300/80 tracking-wider uppercase">Protein</div>
        </div>
        <div class="bg-slate-900/50 rounded-xl p-3 md:p-4 text-center border border-slate-800">
            <div class="text-2xl md:text-3xl font-bold text-white mb-1">380</div>
            <div class="text-[10px] md:text-xs font-semibold text-slate-400 tracking-wider uppercase">Kcal</div>
        </div>
        <div class="bg-slate-900/50 rounded-xl p-3 md:p-4 text-center border border-slate-800">
            <div class="text-2xl md:text-3xl font-bold text-white mb-1">45g</div>
            <div class="text-[10px] md:text-xs font-semibold text-slate-400 tracking-wider uppercase">Carbs</div>
        </div>
        <div class="bg-slate-900/50 rounded-xl p-3 md:p-4 text-center border border-slate-800">
            <div class="text-2xl md:text-3xl font-bold text-white mb-1">8g</div>
            <div class="text-[10px] md:text-xs font-semibold text-slate-400 tracking-wider uppercase">Fibre</div>
        </div>
        </div>
    </div>

    <!-- Right Column: Image -->
    <div class="order-1 lg:order-2 lg:col-span-5 relative h-[300px] md:h-[400px] lg:h-[500px]">
        <img src="https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1000" alt="Vegetarian Burger" class="w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-800" />
        
        <!-- Save Action (The ONLY save button) -->
        <!-- <button @click="isSaved = !isSaved" class="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-slate-700 hover:scale-105 transition-transform" :class="{'text-rose-500': isSaved, 'text-slate-300': !isSaved}">
        <svg class="w-6 h-6" :class="{'fill-current': isSaved}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button> -->
    </div>
    </div>
</template>