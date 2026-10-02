<script setup lang="ts">
import Img from '@/components/Img.vue'
import type { Recipe } from '@/components/recipeCard.vue'

const props = defineProps<{
  recipe?: Recipe | null
}>()

const localePath = useLocalePath()
const { t } = useI18n()
const { formatText } = useFormatText()
</script>

<template>
  <section v-if="props.recipe" class="my-16">
    <div class="relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-lg hover:shadow-xl transition-all duration-500">
      <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
        <!-- Photo Side (Left 6-7 cols) -->
        <div class="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden bg-slate-900 group">
          <Img
            v-if="props.recipe.image"
            :src="props.recipe.image"
            :alt="props.recipe.alt || props.recipe.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          <!-- Top Badge -->
          <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
              <Icon name="ph:star-fill" class="w-3.5 h-3.5" />
              {{ t('home.editorialFeature.badge') }}
            </span>
          </div>

          <!-- Quick Stat Overlay on Mobile -->
          <div class="absolute bottom-4 left-4 lg:hidden z-10 flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-black bg-black/70 backdrop-blur-md text-emerald-400 border border-white/10">
              💪 {{ props.recipe.macros.protein }}g Protein
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
              ⏱ {{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }}m
            </span>
          </div>
        </div>

        <!-- Story / Metadata Side (Right 6 cols) -->
        <div class="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <!-- Kicker -->
            <div class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500 mb-3">
              <Icon name="ph:fire-bold" class="w-4 h-4 text-amber-500" />
              <span>{{ t('home.editorialFeature.kicker') }}</span>
            </div>

            <!-- Title -->
            <NuxtLink
              :to="localePath({ name: 'recipes-slug', params: { slug: props.recipe.slug } })"
              class="group"
            >
              <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-foreground group-hover:text-emerald-500 transition-colors leading-[1.15] mb-4">
                {{ props.recipe.title }}
              </h2>
            </NuxtLink>

            <!-- Description -->
            <!-- eslint-disable vue/no-v-html -->
            <p
              v-if="props.recipe.description"
              class="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed mb-6"
              v-html="formatText(props.recipe.description)"
            />
            <!-- eslint-enable vue/no-v-html -->

            <!-- Macro Trio Dials -->
            <div class="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/60 mb-6">
              <div class="flex flex-col items-center justify-center p-2 rounded-xl bg-card border border-border/40 text-center">
                <span class="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Protein</span>
                <span class="text-lg sm:text-xl font-black text-emerald-500 leading-tight mt-0.5">
                  {{ props.recipe.macros.protein }}g
                </span>
              </div>
              <div class="flex flex-col items-center justify-center p-2 rounded-xl bg-card border border-border/40 text-center">
                <span class="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Calories</span>
                <span class="text-lg sm:text-xl font-black text-foreground leading-tight mt-0.5">
                  {{ props.recipe.macros.calories }}
                </span>
              </div>
              <div class="flex flex-col items-center justify-center p-2 rounded-xl bg-card border border-border/40 text-center">
                <span class="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Ready In</span>
                <span class="text-lg sm:text-xl font-black text-amber-500 leading-tight mt-0.5">
                  {{ props.recipe.prepTimeMins + props.recipe.cookTimeMins }}m
                </span>
              </div>
            </div>
          </div>

          <!-- Author Attribution & CTA Button -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div class="flex items-center gap-3">
              <img
                src="/images/tom.avif"
                alt="Tom Harrison"
                class="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/30"
              >
              <div class="text-left">
                <span class="block text-xs font-black text-foreground">{{ t('home.editorialFeature.author') }}</span>
                <span class="block text-[11px] text-muted-foreground">Tested in our home kitchen</span>
              </div>
            </div>

            <NuxtLink
              :to="localePath({ name: 'recipes-slug', params: { slug: props.recipe.slug } })"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>{{ t('home.editorialFeature.cta') }}</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
