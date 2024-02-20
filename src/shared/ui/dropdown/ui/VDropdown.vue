<script setup>
import Dropdown from 'primevue/dropdown'

import { VField, VInputCaption } from '@/shared'

defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: undefined
  },
  optionValue: {
    type: String,
    default: undefined
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
  loading: {
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
  autofocus: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <VField
    :id="id"
    :label="label"
    :required="required"
    :disabled="disabled"
  >
    <Dropdown
      :id="id"
      :model-value="modelValue"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="{ 'p-invalid': error }"
      :autofocus="autofocus"
      class="v-dropdown"
      @update:model-value="(value) => $emit('update:modelValue', value)"
    />
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </VField>
</template>

<style scoped>
.v-dropdown {
  width: 100%;
}
</style>
