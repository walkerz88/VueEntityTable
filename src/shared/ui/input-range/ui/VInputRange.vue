<script setup>
import { inject } from 'vue'

import InputText from 'primevue/inputtext'

import { VField, VInputCaption } from '@/shared'

defineProps({
  from: {
    type: [String, Number],
    default: ''
  },
  to: {
    type: [String, Number],
    default: ''
  },
  idFrom: {
    type: String,
    default: ''
  },
  idTo: {
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
  placeholderFrom: {
    type: String,
    default: ''
  },
  placeholderTo: {
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

defineEmits(['update:from', 'update:to'])

const getValidationLocalization = inject('getValidationLocalization')
</script>

<template>
  <VField :id="idFrom" :label="label" :required="required" :disabled="disabled">
    <div class="vet-input-range">
      <i
        v-show="loading === true"
        class="pi pi-spin pi-spinner vet-input-range__spinner"
      />
      <InputText
        :id="idFrom"
        :model-value="from"
        :disabled="disabled"
        :placeholder="placeholderFrom"
        :class="{ 'vet-input-range__from': true, 'p-invalid': error }"
        :autofocus="autofocus"
        class=""
        @update:model-value="(value) => $emit('update:from', value)"
      />
      <InputText
        :id="idTo"
        :model-value="to"
        :disabled="disabled"
        :placeholder="placeholderTo"
        :class="{ 'vet-input-range__to': true, 'p-invalid': error }"
        @update:model-value="(value) => $emit('update:to', value)"
      />
    </div>
    <VInputCaption v-if="error" severity="danger">
      {{
        getValidationLocalization({
          field: label,
          error
        })
      }}
    </VInputCaption>
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </VField>
</template>

<style scoped>
.vet-input-range {
  display: flex;
  width: 100%;
  position: relative;
}

.vet-input-range__spinner {
  position: absolute;
  top: 50%;
  right: 1rem;
  margin-top: -7px;
}

.vet-input-range__from,
.vet-input-range__to {
  width: 50%;
}

.vet-input-range__from {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.vet-input-range__to {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
