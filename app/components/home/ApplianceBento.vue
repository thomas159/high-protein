<script setup lang="ts">
import Img from '@/components/Img.vue'

interface MiniRecipe {
  title: string
  slug: string
  image?: string
  alt?: string
  prepTimeMins: number
  cookTimeMins: number
  macros: {
    calories: number
    protein: number
    carbs?: number
    fat?: number
  }
}

const props = defineProps<{
  airFryerRecipes: MiniRecipe[]
  ninjaCreamiRecipes: MiniRecipe[]
}>()

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-black uppercase tracking-widest text-emerald-500">Kitchen Powerhouses</span>
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-1 mb-0">
          {{ t('home.applianceBento.title') }}
        </h2>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Air Fryer Bento Tile -->
      <div class="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-card via-card to-amber-500/5 border border-border/80 shadow-md relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Icon name="ph:wind-duotone" class="w-4 h-4" />
              Air Fryer
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-2">
            {{ t('home.applianceBento.airFryerTitle') }}
          </h3>
          <p class="text-sm text-muted-foreground leading-relaxed mb-6">
            {{ t('home.applianceBento.airFryerDesc') }}
          </p>

          <!-- Mini Cards List -->
          <div class="space-y-3 mb-6">
            <NuxtLink
              v-for="recipe in props.airFryerRecipes.slice(0, 2)"
              :key="recipe.slug"
              :to="localePath({ name: 'recipes-slug', params: { slug: recipe.slug } })"
              class="flex items-center gap-4 p-3 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/60 hover:border-amber-500/30 transition-all duration-300 group/item"
            >
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                <Img
                  v-if="recipe.image"
                  :src="recipe.image"
                  :alt="recipe.alt || recipe.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
              </div>
              <div class="flex-grow min-w-0">
                <h4 class="text-sm sm:text-base font-black text-foreground leading-snug group-hover/item:text-amber-500 transition-colors">
                  {{ recipe.title }}
                </h4>
                <div class="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground font-semibold">
                  <span class="text-emerald-500 font-bold">💪 {{ recipe.macros.protein }}g</span>
                  <span>🔥 {{ recipe.macros.calories }} kcal</span>
                  <span>⏱ {{ recipe.prepTimeMins + recipe.cookTimeMins }}m</span>
                </div>
              </div>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 text-muted-foreground group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all shrink-0 mr-2" />
            </NuxtLink>
          </div>
        </div>

        <!-- Footer link -->
        <NuxtLink
          :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.airfryer') } })"
          class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors"
        >
          {{ t('home.applianceBento.airFryerCta') }} &rarr;
        </NuxtLink>
      </div>

      <!-- Ninja Creami Bento Tile -->
      <div class="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-card via-card to-teal-500/5 border border-border/80 shadow-md relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Icon name="ph:ice-cream-duotone" class="w-4 h-4" />
              Ninja Creami
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-2">
            {{ t('home.applianceBento.ninjaCreamiTitle') }}
          </h3>
          <p class="text-sm text-muted-foreground leading-relaxed mb-6">
            {{ t('home.applianceBento.ninjaCreamiDesc') }}
          </p>

          <!-- Mini Cards List -->
          <div class="space-y-3 mb-6">
            <NuxtLink
              v-for="recipe in props.ninjaCreamiRecipes.slice(0, 2)"
              :key="recipe.slug"
              :to="localePath({ name: 'recipes-slug', params: { slug: recipe.slug } })"
              class="flex items-center gap-4 p-3 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/60 hover:border-teal-500/30 transition-all duration-300 group/item"
            >
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                <Img
                  v-if="recipe.image"
                  :src="recipe.image"
                  :alt="recipe.alt || recipe.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
              </div>
              <div class="flex-grow min-w-0">
                <h4 class="text-sm sm:text-base font-black text-foreground leading-snug group-hover/item:text-teal-400 transition-colors">
                  {{ recipe.title }}
                </h4>
                <div class="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground font-semibold">
                  <span class="text-emerald-500 font-bold">💪 {{ recipe.macros.protein }}g</span>
                  <span>🔥 {{ recipe.macros.calories }} kcal</span>
                  <span>⏱ {{ recipe.prepTimeMins + recipe.cookTimeMins }}m</span>
                </div>
              </div>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 text-muted-foreground group-hover/item:text-teal-400 group-hover/item:translate-x-1 transition-all shrink-0 mr-2" />
            </NuxtLink>
          </div>
        </div>

        <!-- Footer link -->
        <NuxtLink
          :to="localePath({ name: 'categories-slug', params: { slug: t('categorySlugs.ninjacreami') } })"
          class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors"
        >
          {{ t('home.applianceBento.ninjaCreamiCta') }} &rarr;
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
