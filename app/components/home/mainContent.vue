<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
<div class="text-gray-800">

<main class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
  
  <aside class="lg:col-span-3">
    <div class="border border-gray-200 bg-white rounded-sm shadow-sm overflow-hidden">
      <div class="bg-flavor-sap text-white py-3 px-4 font-bold text-center text-sm">
        Welcome to our food blog!
      </div>
      
      <div class="p-6 flex flex-col items-center">
        <div class="w-40 h-40 rounded-sm overflow-hidden mb-4 border border-gray-100">
          <!-- <img src="james.jpg" class="w-full h-full object-cover" alt="James Carter"> -->
        </div>
        
        <h2 class="text-flavor-deep font-bold text-xl tracking-tighter mb-2">JAMES CARTER</h2>
        <p class="text-gray-500 text-xs text-center leading-relaxed mb-6">
          A passionate food lover, James shares easy and tasty recipes on {{ appConfig.siteName }} to inspire home cooks and food enthusiasts alike.
        </p>
        
        <div class="font-signature text-3xl text-flavor-deep mb-6">James Carter</div>
        
        <div class="flex gap-4 text-gray-400">
          <a href="#" class="hover:text-flavor-sap"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="hover:text-flavor-sap"><i class="fab fa-instagram"></i></a>
          <a href="#" class="hover:text-flavor-sap"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
    </div>
  </aside>

  <section class="lg:col-span-9">
   latest
  </section>
</main>
</div>
</template>