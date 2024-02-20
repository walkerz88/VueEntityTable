<script setup>
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

import {
  EntityTableCopyCell,
  EntityTableTooltipCell,
  EntityTableEditCell
} from '@/features'

import { VImageThumb, VLoader, isBoolean, isEmptyValue } from '@/shared'

import { useEntityTableContent } from '../lib'

import { TABLE_CONTROLS_CELL_STYLES } from './../constants'
import {
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_IMAGE,
  FIELD_EDITABLE_TEXT,
  FIELD_TYPE_TOOLTIP
} from '@/shared/constants/fieldTypes'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  descriptor: {
    type: Array,
    default: () => []
  },
  visibleColumns: {
    type: Array,
    default: () => ['id']
  },
  selectedRows: {
    type: Array,
    default: undefined
  },
  expandedRows: {
    type: Array,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: true
  },
  copyable: {
    type: Boolean,
    default: true
  },
  rowUniqueKey: {
    type: String,
    default: 'id'
  }
})

const emit = defineEmits([
  'update:selectedRows',
  'update:expandedRows',
  'on-submit-edit-cell',
  'on-click-edit',
  'on-click-copy'
])

const {
  slots,
  selectableRows,
  isSelectedAll,
  selectCheckboxExist,
  expandable,
  totalCols,
  onChangeSelectedAll,
  onChangeSelectedRow,
  getColumnValue,
  isRowSelected
} = useEntityTableContent({ props, emit })
</script>

<template>
  <div
    :class="[
      'vue-entity-table-content',
      loading === true && 'vue-entity-table-content--loading'
    ]"
  >
    <VLoader v-show="loading === true" />
    <div
      :class="[
        'vue-entity-table-content__inner',
        loading === true && 'vue-entity-table-content__inner--loading'
      ]"
    >
      <table class="vue-entity-table-content__table">
        <thead class="vue-entity-table-content__header">
          <tr>
            <!-- Заголовок массового выделения -->
            <th
              v-if="selectCheckboxExist === true"
              :style="TABLE_CONTROLS_CELL_STYLES"
            >
              <Checkbox
                :model-value="isSelectedAll"
                binary
                :true-value="true"
                :false-value="false"
                :disabled="selectableRows.length === 0"
                @update:model-value="
                  (nextValue) => onChangeSelectedAll(nextValue)
                "
              />
            </th>

            <!-- Заголовок кнопка редактирования -->
            <th v-if="editable === true" :style="TABLE_CONTROLS_CELL_STYLES" />

            <!-- Заголовок разворачивания -->
            <th
              v-if="expandable === true"
              :style="TABLE_CONTROLS_CELL_STYLES"
            />

            <!-- Заголовки колонок -->
            <template v-for="column in descriptor" :key="column.label">
              <th
                v-if="visibleColumns.includes(column.name)"
                :style="column.headerStyle"
                :class="[
                  column.align && `vue-entity-table-align-${column.align}`,
                  column.headerClass
                ]"
              >
                {{ column.label }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="vue-entity-table-content__body">
          <template v-if="isEmptyValue(modelValue) === false">
            <template
              v-for="(row, index) in modelValue"
              :key="`row_${row[rowUniqueKey]}_${index}`"
            >
              <tr class="vue-entity-table-content__row">
                <!-- Колонка массового выделения -->
                <td
                  v-if="selectCheckboxExist === true"
                  :style="TABLE_CONTROLS_CELL_STYLES"
                >
                  <Checkbox
                    v-if="row.selectable !== false"
                    :model-value="isRowSelected(row)"
                    binary
                    :true-value="true"
                    :false-value="false"
                    @click="(event) => onChangeSelectedRow({ event, row })"
                  />
                </td>

                <!-- Кнопка редактирования -->
                <td
                  v-if="editable === true && row.editable !== false"
                  :style="TABLE_CONTROLS_CELL_STYLES"
                >
                  <Button
                    class="vue-entity-table-content__icon"
                    icon="pi pi-pencil"
                    text
                    rounded
                    @click="() => emit('on-click-edit', { row, index })"
                  />
                </td>

                <!-- Кнопка разворачивания -->
                <td
                  v-if="expandable === true"
                  :style="TABLE_CONTROLS_CELL_STYLES"
                >
                  <Button
                    icon="pi pi-arrows-v"
                    :severity="
                      expandedRows.includes(index) === true
                        ? 'primary'
                        : 'secondary'
                    "
                    text
                    rounded
                    class="c-icon-button"
                    @click="() => emit('update:expandedRows', { row, index })"
                  />
                </td>

                <!-- Колонки -->
                <template
                  v-for="column in descriptor"
                  :key="`column_${column.name}`"
                >
                  <td
                    v-if="visibleColumns.includes(column.name)"
                    :style="column.style"
                    :class="[
                      column.align && `vue-entity-table-align-${column.align}`,
                      column.class
                    ]"
                  >
                    <!-- Собственный шаблон -->
                    <slot
                      v-if="Boolean(slots[column.name]) === true"
                      :name="column.name"
                      :row="row"
                      :column="column"
                      :value="getColumnValue({ column, row })"
                    />

                    <!-- Boolean -->
                    <template v-else-if="column.type === FIELD_TYPE_CHECKBOX">
                      <span
                        v-if="
                          isBoolean(getColumnValue({ column, row })) === true
                        "
                        :class="
                          row[column.name] === true
                            ? 'pi pi-check-circle c-text-success'
                            : 'pi pi pi-times-circle c-text-danger'
                        "
                      />
                      <template v-else>
                        {{ getColumnValue({ column, row }) }}
                      </template>
                    </template>

                    <!-- Изображение -->
                    <VImageThumb
                      v-else-if="column.type === FIELD_TYPE_IMAGE"
                      :src="getColumnValue({ column, row })"
                      preview
                    />

                    <!-- Можно редактировать текст -->
                    <EntityTableEditCell
                      v-else-if="column.type === FIELD_EDITABLE_TEXT"
                      :value="getColumnValue({ column, row })"
                      :column="column"
                      :row="row"
                      @on-submit="
                        ({ value }) =>
                          emit('on-submit-edit-cell', {
                            column,
                            row,
                            value,
                            index
                          })
                      "
                    />

                    <!-- Ячейки, которые можно копировать -->
                    <EntityTableCopyCell
                      v-else
                      :value="getColumnValue({ column, row })"
                      :copyable="
                        copyable === true && column.isCopyable !== false
                      "
                      @on-click-copy="
                        ({ value }) =>
                          emit('on-click-copy', row, column, value, index)
                      "
                    >
                      <!-- Всплывающий текст -->
                      <EntityTableTooltipCell
                        v-if="column.type === FIELD_TYPE_TOOLTIP"
                        :header="column.label"
                        :text="getColumnValue({ column, row })"
                      />

                      <!-- Обычный текст -->
                      <template v-else>
                        {{ getColumnValue({ column, row }) }}
                      </template>
                    </EntityTableCopyCell>
                  </td>
                </template>
              </tr>
              <tr
                v-if="expandable && expandedRows.includes(index) === true"
                class="vue-entity-table-content__expansion"
              >
                <td :colspan="totalCols">
                  <slot name="expansion" :row="row" :index="index" />
                </td>
              </tr>
            </template>
          </template>
          <template v-else-if="loading === false">
            <tr>
              <td :colspan="totalCols" class="c-text-caption">
                Записей не найдено
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
