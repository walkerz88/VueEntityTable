<script setup>
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import Chips from 'primevue/chips'
import TriStateCheckbox from 'primevue/tristatecheckbox'

import {
  VField,
  VInputCaption,
  VSubmitButton,
  VFieldset,
  VCheckbox,
  VCalendar,
  VInputText,
  VDropdown,
  VInputRange
} from '@/shared'

import {
  FIELD_TYPE_MULTISELECT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_MULTICHECKBOX,
  FIELD_TYPE_CHIPS,
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_CALENDAR,
  FIELD_TYPE_RANGE
} from '@/shared/constants/fieldTypes'

import { useEntityTableFilter } from '../lib'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  filterDescriptor: {
    type: Array,
    default: () => []
  },
  dirty: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'on-submit'])

const { generateId, handleChange, handleDrop, handleSubmit } =
  useEntityTableFilter({
    props,
    emit
  })
</script>
<template>
  <div class="vue-entity-table-filter">
    <div class="vue-entity-table-filter__content">
      <template v-for="field in filterDescriptor" :key="field.name">
        <VDropdown
          v-if="field.type === FIELD_TYPE_SELECT"
          v-bind="field.props"
          :id="generateId(field.name)"
          :model-value="modelValue[field.name]"
          :label="field.label"
          :placeholder="field.placeholder"
          :options="field.options || []"
          @update:model-value="
            (value) => handleChange({ name: field.name, value })
          "
        />

        <VField
          v-else-if="field.type === FIELD_TYPE_MULTISELECT"
          :id="generateId(field.name)"
          :label="field.label"
        >
          <MultiSelect
            :id="generateId(field.name)"
            :model-value="modelValue[field.name]"
            :options="field.options || []"
            :placeholder="field.placeholder"
            option-label="label"
            option-value="value"
            class="vue-entity-table-filter__multiselect"
            @update:model-value="
              (value) => handleChange({ name: field.name, value })
            "
          />
          <VInputCaption v-if="field.caption">
            {{ field.caption }}
          </VInputCaption>
        </VField>

        <div
          v-else-if="field.type === FIELD_TYPE_CHECKBOX"
          class="vue-entity-table-filter__tristatecheckbox"
        >
          <TriStateCheckbox
            :input-id="generateId(field.name)"
            :model-value="modelValue[field.name]"
            @update:model-value="
              (value) => handleChange({ name: field.name, value })
            "
          />
          <label :for="generateId(field.name)">
            {{ field.label }}
          </label>
        </div>

        <VFieldset
          v-else-if="field.type === FIELD_TYPE_MULTICHECKBOX"
          :label="field.label"
        >
          <VCheckbox
            v-for="item in field.options"
            :id="generateId(`${field.name}_${item.value}`)"
            :key="item.value"
            :model-value="modelValue[field.name]"
            :label="item.label"
            :value="item.value"
            :binary="false"
            @update:model-value="
              (value) => handleChange({ name: field.name, value })
            "
          />
        </VFieldset>

        <VField
          v-else-if="field.type === FIELD_TYPE_CHIPS"
          :id="generateId(field.name)"
          :label="field.label"
        >
          <Chips
            :id="generateId(field.name)"
            :model-value="modelValue[field.name]"
            :placeholder="field.placeholder"
            :add-on-blur="true"
            separator=","
            class="vue-entity-table-filter__chips"
            @update:model-value="
              (value) => handleChange({ name: field.name, value })
            "
          />
          <VInputCaption v-if="field.caption">
            {{ field.caption }}
          </VInputCaption>
        </VField>

        <VCalendar
          v-else-if="field.type === FIELD_TYPE_CALENDAR"
          v-bind="field.props"
          :id="generateId(field.name)"
          :model-value="modelValue[field.name]"
          :label="field.label"
          @update:model-value="
            (value) => handleChange({ name: field.name, value })
          "
        />

        <VInputRange
          v-else-if="field.type === FIELD_TYPE_RANGE"
          :label="field.label"
          :from="modelValue[field.valueFrom]"
          :to="modelValue[field.valueTo]"
          :id-from="generateId(field.nameFrom)"
          :id-to="generateId(field.nameTo)"
          :placeholder-from="field.placeholderFrom"
          :placeholder-to="field.placeholderTo"
          @update:from="
            (value) => handleChange({ name: field.nameFrom, value })
          "
          @update:to="(value) => handleChange({ name: field.nameTo, value })"
        />

        <VInputText
          v-else
          :id="generateId(field.name)"
          :model-value="modelValue[field.name]"
          :label="field.label"
          :placeholder="field.placeholder"
          :caption="field.caption"
          @update:model-value="
            (value) => handleChange({ name: field.name, value })
          "
        />
      </template>
    </div>
    <div class="vue-entity-table-filter__footer">
      <Button label="Clear" severity="secondary" text @click="handleDrop" />
      <VSubmitButton
        label="Submit"
        severity="primary"
        @on-click="handleSubmit"
      />
    </div>
  </div>
</template>
