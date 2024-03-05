<script setup>
import {
  EntityTableTopBar,
  EntityTableContent,
  EntityTablePagination,
  EntityTableAside,
  EntityTableFilter
  /* EntityTableSettings */
} from '@/features'

import { useVueEntityTable } from '../lib'

import { SORT_DESC } from '@/shared/constants/sort'

import '@/assets/variables.css'
import '@/assets/style.css'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  descriptor: {
    type: Array,
    default: () => []
  },
  filterDescriptor: {
    type: Object,
    default: () => {}
  },
  selectedRows: {
    type: Array,
    default: undefined
  },
  expandedRows: {
    type: Array,
    default: undefined
  },
  editable: {
    type: Boolean,
    default: true
  },
  fetchDataFunction: {
    type: Function,
    default: undefined
  },
  fetchDataTransformer: {
    type: Function,
    default: (data) => data
  },
  loading: {
    type: Boolean,
    default: false
  },
  fetchTrigger: {
    type: Number,
    default: 0
  },
  showTotal: {
    type: Boolean,
    default: true
  },
  copyable: {
    type: Boolean,
    default: true
  },
  /* router: {
    type: Object,
    default: undefined
  },
  saveFilterToUrl: {
    type: Boolean,
    default: false
  }, */
  search: {
    type: String,
    default: undefined
  },
  searchDataFunction: {
    type: Function,
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
  sortKey: {
    type: String,
    default: null
  },
  sortDirection: {
    type: String,
    default: SORT_DESC
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:selectedRows',
  'update:expandedRows',
  'update:search',
  'update:sortKey',
  'update:sortDirection',
  'on-row-expand',
  'on-row-collapse',
  'on-toggle-filter',
  'on-toggle-settings',
  'on-click-edit',
  'on-click-copy'
])

const {
  showLoading,
  visibleColumns,
  hasExpansionSlot,
  stateTotal,
  stateLimit,
  stateOffset,
  slots,
  hasFilter,
  hasSettings,
  filterValues,
  filterIsDirty,
  sidebarActive,
  someSidebarActive,
  isSearchLoading,
  handleToggleSidebar,
  closeAllSidebars,
  handlePageChange,
  handleUpdateData,
  handleUpdateSelectedRows,
  handleDropAllSelected,
  handleUpdateExpandedRows,
  handleSubmitFilter,
  handleSearch,
  handleUpdateSortKey,
  handleUpdateSortDirection
} = useVueEntityTable({ props, emit })
</script>
<template>
  <div class="vue-entity-table">
    <div
      :class="[
        'vue-entity-table__inner',
        someSidebarActive === true && 'vue-entity-table__inner--aside-active'
      ]"
    >
      <EntityTableTopBar
        :search="search"
        :search-id="searchId"
        :search-placeholder="searchPlaceholder"
        :selected-rows="selectedRows"
        :has-filter="hasFilter"
        :has-settings="hasSettings"
        :filter-active="sidebarActive.filter"
        :settings-active="sidebarActive.settings"
        :filter-is-dirty="filterIsDirty"
        :loading="showLoading"
        :search-loading="isSearchLoading"
        @update:toggle-aside="handleToggleSidebar"
        @update:search="(value) => handleSearch(value)"
        @on-update-data="handleUpdateData"
        @on-drop-all-selected="handleDropAllSelected"
      >
        <template #topbar-left>
          <slot name="topbar-left" />
        </template>
        <template #topbar-right>
          <slot name="topbar-right" />
        </template>
      </EntityTableTopBar>
      <EntityTableContent
        :model-value="modelValue"
        :descriptor="descriptor"
        :visible-columns="visibleColumns"
        :selected-rows="selectedRows"
        :expanded-rows="expandedRows"
        :loading="showLoading"
        :editable="editable"
        :copyable="copyable"
        :sort-key="sortKey"
        :sort-direction="sortDirection"
        @update:sort-key="handleUpdateSortKey"
        @update:sort-direction="handleUpdateSortDirection"
        @update:selected-rows="handleUpdateSelectedRows"
        @update:expanded-rows="handleUpdateExpandedRows"
        @on-click-edit="
          ({ row, index }) =>
            emit('on-click-edit', { data: modelValue, row, index })
        "
        @on-click-copy="
          ({ row, column, value, index }) =>
            emit('on-click-copy', {
              data: modelValue,
              row,
              column,
              value,
              index
            })
        "
      >
        <template
          v-for="(_, slotName) in slots"
          #[slotName]="{ row, column, value }"
        >
          <slot :name="slotName" :row="row" :column="column" :value="value" />
        </template>
        <template v-if="hasExpansionSlot" #expansion="{ row, index }">
          <slot name="expansion" :row="row" :index="index" />
        </template>
      </EntityTableContent>
      <EntityTablePagination
        :total="stateTotal"
        :rows="stateLimit"
        :offset="stateOffset"
        :show-total="showTotal"
        @on-page-change="handlePageChange"
      />
    </div>
    <EntityTableAside
      v-if="hasFilter"
      :model-value="sidebarActive.filter"
      title="Фильтр"
      icon="pi pi-filter"
      @update:model-value="closeAllSidebars"
    >
      <EntityTableFilter
        v-model="filterValues"
        :filter-descriptor="filterDescriptor"
        :dirty="filterIsDirty"
        @on-submit="handleSubmitFilter"
      />
    </EntityTableAside>
    <!-- <EntityTableAside
      v-if="hasSettings"
      :model-value="sidebarActive.settings"
      title="Настройки"
      icon="pi pi-cog"
      @update:model-value="closeAllSidebars"
    >
      <EntityTableSettings />
    </EntityTableAside> -->
  </div>
</template>
