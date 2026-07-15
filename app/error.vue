<script setup lang="ts">
import type { NuxtError } from '#app'
const { app } = useAppConfig()

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: 'Error - ' + (props.error?.statusCode || t('error.unknown')),
  meta: [
    {
      name: 'description',
      content: t('error.message')
    }
  ]
})
</script>

<template>
  <div class="error-page w-full">
    <div class="flex flex-col items-center justify-center">
      <h1 class="italic">{{ error?.statusCode }}</h1>
      <span class="text-lg -mt-10 mb-4">{{ error?.statusCode === 404 ? t('error.pageNotFound') : (error?.message || t('error.message')) }}</span>
      <UButton role="button" aria-label="Back to Home" icon="material-symbols:arrow-insert" @click="handleError">{{ t('error.back') }}</UButton>
    </div>
    <USeparator orientation="vertical" />
    <div class="relative flex flex-col items-center justify-center">
      <div class="absolute left-1/2 -top-[10%] z-[-1] transform -translate-x-1/2 -translate-y-1/4 bg-green-500/50 filter blur-3xl w-[500px] h-[500px] rounded-full" />
      <div>
        <h2 class="text-3xl font-bold text-center mb-2">{{  }}</h2>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;

  h1 {
    font-size: 10rem;
  }
}
</style>