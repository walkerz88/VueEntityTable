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
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
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
  caption: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <VField :id="id" :label="label" :required="required" :disabled="disabled">
    <Dropdown
      :id="id"
      :model-value="modelValue"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :show-clear="showClear"
      class="vet-dropdown"
      @update:model-value="(value) => $emit('update:modelValue', value)"
    />
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </VField>
</template>

<style scoped>
.vet-dropdown {
  width: 100%;
}
</style>
