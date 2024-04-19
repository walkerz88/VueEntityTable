<script setup>
import { computed, useSlots } from 'vue'

defineProps({
  id: {
    type: String,
    default: 'field'
  },
  label: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  removeMargin: {
    type: Boolean,
    default: false
  }
})
const slots = useSlots()

const hasLabelSlot = computed(() => Boolean(slots.label))
</script>

<template>
  <div
    :class="[
      'vet-field',
      disabled === true && 'vet-field--disabled',
      removeMargin === true && 'vet-field--remove-margin'
    ]"
  >
    <label
      v-if="label || hasLabelSlot === true"
      :for="id"
      class="vet-field__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <span v-show="required === true" class="vet-field__required"> * </span>
    </label>
    <slot />
  </div>
</template>

<style scoped>
.vet-field {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  align-items: flex-start;
}

.vet-field--remove-margin {
  margin-bottom: 0;
}

.vet-field:deep(.p-inputtext),
.vet-field:deep(.p-password) {
  width: 100%;
}

.vet-field__label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.vet-field__required {
  color: var(--red-500);
}

.vet-field--disabled .vet-field__label {
  opacity: 0.7;
}
</style>
