<script setup lang="ts">
interface Props {
  color?: 'green' | 'white' | 'clear'
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green',
  size: 'large',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button 
    :class="[
      'inline-flex items-center gap-2 font-semibold rounded-full transition-colors cursor-pointer capitalize',
      props.size === 'small' ? 'px-4 py-1.5 text-sm' : 'px-6 py-3',
      props.color === 'clear' ? 'bg-transparent text-[#ee6726] hover:bg-[#ee6726]/10 border border-transparent underline shadow-none' :
      props.color === 'white' ? 'bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-gray-200 shadow-sm' : 
      'bg-emerald-500 hover:bg-emerald-600 text-white border border-transparent shadow-sm'
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>