<script setup lang="ts">
const { t } = useI18n()

const standards = computed(() => [
  {
    icon: 'ph:lightning-duotone',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    title: t('home.valueBanner.speed'),
    sub: t('home.valueBanner.speedSub')
  },
  {
    icon: 'ph:barbell-duotone',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    title: t('home.valueBanner.protein'),
    sub: t('home.valueBanner.proteinSub')
  },
  {
    icon: 'ph:scales-duotone',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    title: t('home.valueBanner.quality'),
    sub: t('home.valueBanner.qualitySub')
  },
  {
    icon: 'ph:plant-duotone',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    title: t('home.valueBanner.plant'),
    sub: t('home.valueBanner.plantSub')
  }
])
</script>

<template>
  <section class="py-6 px-5 sm:px-8 bg-card/60 rounded-3xl border border-border/80 backdrop-blur-sm shadow-sm">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      <div
        v-for="(item, idx) in standards"
        :key="idx"
        class="flex items-center gap-3.5"
      >
        <div class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border" :class="item.color">
          <Icon :name="item.icon" class="w-5 h-5" />
        </div>
        <div class="flex flex-col">
          <span class="text-xs sm:text-sm font-black uppercase tracking-tight text-foreground leading-snug">
            {{ item.title }}
          </span>
          <span class="text-[11px] font-medium text-muted-foreground leading-tight">
            {{ item.sub }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
