<template>
  <header class="bg-white border-b border-slate-200 py-6 px-4 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      
      <NuxtLink to="/" class="font-serif text-2xl font-bold text-slate-900 tracking-tight">
        <span class="text-orange-500">HotRecipes</span>
      </NuxtLink>
      
      <div class="hidden md:block w-72">
        <input 
          type="text" 
          placeholder="Search recipes..." 
          class="w-full bg-slate-100 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow text-slate-800"
        >
      </div>
      
      <button class="md:hidden text-2xl text-slate-800">☰</button>
      
    </div>
  </header>
</template>