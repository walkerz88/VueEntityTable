<script setup>
import Paginator from 'primevue/paginator'

defineProps({
  total: {
    type: Number,
    default: 0
  },
  limit: {
    type: Number,
    default: 20
  },
  offset: {
    type: Number,
    default: 20
  },
  showTotal: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['on-page-change', 'on-limit-change'])

const handlePageChange = ({ page, rows }) => {
  emit('on-page-change', { page, rows })
}
</script>
<template>
  <div class="vue-entity-table-pagination">
    <template v-if="showTotal === true"> Всего записей: {{ total }} </template>
    <span v-else />
    <Paginator
      :rows="limit"
      :total-records="total"
      :first="offset"
      :rows-per-page-options="[10, 20, 30, 50]"
      @page="handlePageChange"
    />
  </div>
</template>
