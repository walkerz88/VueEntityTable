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
      'VField',
      disabled === true && 'VField--disabled',
      removeMargin === true && 'VField--remove-margin'
    ]"
  >
    <label
      v-if="label || hasLabelSlot === true"
      :for="id"
      class="VField__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <span v-show="required === true" class="VField__required"> * </span>
    </label>
    <slot />
  </div>
</template>

<style scoped>
.VField {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  align-items: flex-start;
}

.VField--remove-margin {
  margin-bottom: 0;
}

.VField:deep(.p-inputtext),
.VField:deep(.p-password) {
  width: 100%;
}

.VField__label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.VField__required {
  color: var(--red-500);
}

.VField--disabled .VField__label {
  opacity: 0.7;
}
</style>
