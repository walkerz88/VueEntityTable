<script setup>
import Checkbox from 'primevue/checkbox'

import { VInputCaption } from '@/shared'

defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: ''
  },
  value: {
    type: [String, Number, Boolean, Array],
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  label: {
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
  placeholder: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  trueValue: {
    type: Boolean,
    default: true
  },
  binary: {
    type: Boolean,
    default: true
  },
  removeMargin: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="['vet-checkbox', removeMargin && 'vet-checkbox--remove-margin']">
    <div class="vet-checkbox__content">
      <Checkbox
        :input-id="id"
        :model-value="modelValue"
        :value="value"
        :disabled="disabled"
        :true-value="trueValue"
        :binary="binary"
        :name="id"
        @update:model-value="
          (nextValue) => $emit('update:modelValue', nextValue)
        "
      />
      <label v-if="label" :for="id" class="vet-checkbox__label">
        {{ label }}
      </label>
    </div>
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </div>
</template>

<style scoped>
.vet-checkbox {
  margin-bottom: 1rem;
}

.vet-checkbox--remove-margin {
  margin-bottom: 0;
}

.vet-checkbox__content {
  display: flex;
  gap: 0.5rem;
}

.vet-checkbox__label {
  margin-top: 1px;
  cursor: pointer;
}

.vet-checkbox__caption {
  color: var(--text-color-secondary);
  margin-top: 0.25rem;
}
</style>
