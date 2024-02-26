<script setup>
import Button from 'primevue/button'

import { isEmptyValue, VInputText } from '@/shared'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  selectedRows: {
    type: Array,
    default: undefined
  },
  hasFilter: {
    type: Boolean,
    default: false
  },
  filterActive: {
    type: Boolean,
    default: false
  },
  filterIsDirty: {
    type: Boolean,
    default: false
  },
  hasSettings: {
    type: Boolean,
    default: false
  },
  settingsActive: {
    type: Boolean,
    default: false
  },
  search: {
    type: String,
    default: undefined
  },
  searchId: {
    type: String,
    default: 'entity-search'
  },
  searchPlaceholder: {
    type: String,
    default: 'Search'
  },
  searchLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:toggle-aside',
  'update:search',
  'on-update-data',
  'on-drop-all-selected'
])

const handleUpdateData = () => {
  emit('on-update-data')
}

const handleDropAllSelected = () => {
  emit('on-drop-all-selected')
}

const handleToggleFilter = () => {
  emit('update:toggle-aside', { key: 'filter', value: !props.filterActive })
}

/* const handleToggleSettings = () => {
  emit('update:toggle-aside', { key: 'settings', value: !props.settingsActive })
} */
</script>
<template>
  <div class="vue-entity-table-top-bar">
    <div class="vue-entity-table-top-bar__left">
      <Button
        v-if="hasFilter === true"
        icon="pi pi-filter"
        :severity="filterIsDirty === true ? 'primary' : 'secondary'"
        text
        rounded
        class="vue-entity-table-top-bar__icon-button"
        @click="handleToggleFilter"
      />
      <!-- <Button
        v-if="hasSettings === true"
        icon="pi pi-cog"
        severity="secondary"
        text
        rounded
        class="vue-entity-table-top-bar__icon-button"
        @click="handleToggleSettings"
      /> -->
      <Button
        icon="pi pi-refresh"
        severity="secondary"
        text
        rounded
        class="vue-entity-table-top-bar__icon-button"
        :loading="loading === true"
        @click="handleUpdateData"
      />
      <VInputText
        v-if="search !== undefined"
        :id="searchId"
        :model-value="search"
        :loading="searchLoading === true"
        :placeholder="searchPlaceholder"
        remove-margin
        @update:model-value="(value) => emit('update:search', value)"
      />
      <slot name="topbar-left" />
      <div
        v-if="isEmptyValue(selectedRows) === false"
        class="vue-entity-table-top-bar__counter"
      >
        <span>Выбрано записей: {{ selectedRows.length }}</span>
        <Button
          icon="pi pi-times"
          severity="secondary"
          text
          rounded
          class="vue-entity-table-top-bar__icon-button"
          @click="handleDropAllSelected"
        />
      </div>
    </div>
    <div class="vue-entity-table-top-bar__right">
      <slot name="topbar-right" />
    </div>
  </div>
</template>
