<script setup>
import { inject } from 'vue'
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
  error: {
    type: Object,
    required: false,
    default: null
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
  <div :class="['VCheckbox', removeMargin && 'VCheckbox--remove-margin']">
    <div class="VCheckbox__content">
      <Checkbox
        :input-id="id"
        :model-value="modelValue"
        :value="value"
        :disabled="disabled"
        :true-value="trueValue"
        :binary="binary"
        :name="id"
        :class="{ 'p-invalid': error }"
        @update:model-value="
          (nextValue) => $emit('update:modelValue', nextValue)
        "
      />
      <label v-if="label" :for="id" class="VCheckbox__label">
        {{ label }}
      </label>
    </div>
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </div>
</template>

<style scoped>
.VCheckbox {
  margin-bottom: 1rem;
}

.VCheckbox--remove-margin {
  margin-bottom: 0;
}

.VCheckbox__content {
  display: flex;
  gap: 0.5rem;
}

.VCheckbox__label {
  margin-top: 1px;
  cursor: pointer;
}

.VCheckbox__caption {
  color: var(--text-color-secondary);
  margin-top: 0.25rem;
}

.VCheckbox__error {
  color: var(--red-500);
  margin-top: 0.25rem;
}
</style>
