<script setup>
import InputText from 'primevue/inputtext'

import { VField, VInputCaption } from '@/shared'

defineProps({
  modelValue: {
    type: [String, Number],
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
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <VField :id="id" :label="label" :required="required" :disabled="disabled">
    <div class="vet-input-text__wrapper">
      <i
        v-show="loading === true"
        class="pi pi-spin pi-spinner vet-input-text__spinner"
      />
      <InputText
        :id="id"
        :model-value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :autofocus="autofocus"
        @update:model-value="(value) => $emit('update:modelValue', value)"
      />
    </div>
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </VField>
</template>

<style scoped>
.vet-input-text__wrapper {
  width: 100%;
  position: relative;
}

.vet-input-text__spinner {
  position: absolute;
  top: 50%;
  right: 1rem;
  margin-top: -7px;
}
</style>
