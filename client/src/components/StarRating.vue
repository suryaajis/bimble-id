<template>
  <div class="flex items-center gap-1">
    <template v-for="i in 10" :key="i">
      <button
        v-if="editable"
        @click="emit('update:modelValue', i)"
        @mouseenter="hovered = i"
        @mouseleave="hovered = 0"
        class="text-lg leading-none focus:outline-none transition-transform hover:scale-110"
        :aria-label="`Rate ${i}`"
      >
        <span :class="(hovered || modelValue) >= i ? 'text-yellow-400' : 'text-gray-200'">★</span>
      </button>
      <span v-else class="text-lg leading-none" :class="modelValue >= i ? 'text-yellow-400' : 'text-gray-200'">★</span>
    </template>
    <span v-if="modelValue" class="text-sm font-medium text-gray-600 ml-1">{{ modelValue }}/10</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ modelValue: { type: Number, default: 0 }, editable: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])
const hovered = ref(0)
</script>
