<script setup>
import Calendar from 'primevue/calendar'

import { VField, VInputCaption } from '@/shared'

defineProps({
  modelValue: {
    type: [String, Number, Date],
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  selectionMode: {
    type: String,
    default: 'single'
  },
  dateFormat: {
    type: String,
    default: 'dd.mm.yy'
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  inline: {
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
  manualInput: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'DD.MM.YYYY'
  },
  iconDisplay: {
    type: String,
    default: 'input'
  },
  caption: {
    type: String,
    default: ''
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  showTime: {
    type: Boolean,
    default: false
  },
  showSeconds: {
    type: Boolean,
    default: false
  },
  hideOnDateTimeSelect: {
    type: Boolean,
    default: true
  },
  hourFormat: {
    type: String,
    default: '24'
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <VField :id="id" :label="label" :required="required" :disabled="disabled">
    <Calendar
      :input-id="id"
      :model-value="modelValue"
      :selection-mode="selectionMode"
      :date-format="dateFormat"
      :manual-input="manualInput"
      :placeholder="placeholder"
      :inline="inline"
      :show-icon="showIcon"
      :icon-display="iconDisplay"
      :show-time="showTime"
      :show-seconds="showSeconds"
      :hour-format="hourFormat"
      :hide-on-date-time-select="hideOnDateTimeSelect"
      class="vet-calendar"
      @update:model-value="(value) => $emit('update:modelValue', value)"
    />
    <VInputCaption v-if="caption">
      {{ caption }}
    </VInputCaption>
  </VField>
</template>

<style scoped>
.vet-calendar {
  width: 100%;
}
</style>
