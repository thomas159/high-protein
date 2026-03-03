<template>
  <!-- Top Navigation -->
  <nav class="bg-slate-950 border-b border-slate-800/80 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <svg class="text-emerald-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            <span class="font-bold text-xl tracking-tight text-white">KitchenPal</span>
          </div>
          <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" class="text-white border-b-2 border-emerald-500 pb-1">Recipes</a>
            <a href="#" class="hover:text-white transition-colors">20g+ Protein</a>
            <a href="#" class="hover:text-white transition-colors">Vegan</a>
            <a href="#" class="hover:text-white transition-colors">Meal Prep</a>
          </div>
          <div class="flex items-center gap-4">
            <button class="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button class="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>