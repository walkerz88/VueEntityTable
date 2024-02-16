<script setup>
import { isEmptyValue } from '@/shared'

defineProps({
  severity: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <small
    :class="[
      'VInputCaption',
      isEmptyValue(severity) === false && `VInputCaption--${severity}`
    ]"
  >
    <slot />
  </small>
</template>

<style scoped>
.VInputCaption {
  display: block;
  margin-top: 0.25rem;
  color: var(--text-color-secondary);
}

.VInputCaption + .VInputCaption {
  margin-top: 0;
}

.VInputCaption--danger {
  color: var(--red-500);
}
</style>
