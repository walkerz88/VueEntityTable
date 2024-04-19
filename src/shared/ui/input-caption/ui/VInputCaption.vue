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
      'vet-input-caption',
      isEmptyValue(severity) === false && `vet-input-caption--${severity}`
    ]"
  >
    <slot />
  </small>
</template>

<style scoped>
.vet-input-caption {
  display: block;
  margin-top: 0.25rem;
  color: var(--text-color-secondary);
}

.vet-input-caption + .vet-input-caption {
  margin-top: 0;
}

.vet-input-caption--danger {
  color: var(--red-500);
}
</style>
