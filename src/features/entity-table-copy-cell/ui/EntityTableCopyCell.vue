<script setup>
import { computed } from 'vue'

import Button from 'primevue/button'

import { isEmptyValue, copyToClipboard } from '@/shared'

const props = defineProps({
  copyable: {
    type: Boolean,
    default: true
  },
  value: {
    type: [String, Number, Array, Date, Boolean],
    default: ''
  }
})

const emit = defineEmits(['on-click-copy'])

const isCopyable = computed(
  () => props.copyable === true && isEmptyValue(props.value) === false
)

const handleClick = async () => {
  try {
    await copyToClipboard(props.value)

    emit('on-click-copy', { value: props.value })
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="vue-entity-table-copy-cell">
    <slot />
    <Button
      v-if="isCopyable === true"
      class="vue-entity-table-copy-cell__button"
      severity="secondary"
      rounded
      text
      icon="pi pi-copy"
      @click="handleClick"
    />
  </div>
</template>
