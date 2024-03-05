<script setup>
import { computed } from 'vue'

import Button from 'primevue/button'

import { SORT_DESC, SORT_ASC } from '@/shared/constants/sort'

const props = defineProps({
  sortKey: {
    type: String,
    default: null
  },
  sortDirection: {
    type: String,
    default: SORT_DESC
  },
  column: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:sortKey', 'update:sortDirection'])

const isActive = computed(() => {
  const { column, sortKey } = props
  const key = column.sortName || column.name

  return sortKey === key
})

const handleSort = () => {
  const { column, sortDirection } = props
  const key = column.sortName || column.name

  if (isActive.value === false) {
    emit('update:sortKey', key)
    emit('update:sortDirection', SORT_DESC)

    return
  }

  if (sortDirection === SORT_DESC) {
    emit('update:sortDirection', SORT_ASC)

    return
  }

  if (sortDirection === SORT_ASC) {
    emit('update:sortKey', null)
    emit('update:sortDirection', SORT_DESC)

    return
  }
}

const severity = computed(() =>
  isActive.value === true ? 'primary' : 'secondary'
)

const icon = computed(() => {
  const { sortDirection } = props

  if (isActive.value === false) {
    return 'pi pi-sort-amount-down'
  }

  if (sortDirection === SORT_ASC) {
    return 'pi pi-sort-amount-up'
  }

  return 'pi pi-sort-amount-down'
})
</script>

<template>
  <Button
    class="vue-entity-table-sort-button"
    :severity="severity"
    :icon="icon"
    text
    rounded
    @click="handleSort"
  />
</template>
