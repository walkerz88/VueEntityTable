<script setup>
import { ref } from 'vue'

import { VueEntityTable } from './widgets/vue-entity-table'

import { SORT_DESC } from '@/shared/constants/sort'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'

const descriptor = [
  {
    name: 'id',
    label: 'ID',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    align: 'right',
    sortable: true
  },
  {
    name: 'name',
    label: 'Name',
    sortable: true
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'editableText'
  },
  {
    name: 'address',
    label: 'Address',
    type: 'tooltip',
    dataTransform: ({ value }) => value?.city || 'No address'
  }
]

const filterDescriptor = [
  {
    name: 'id',
    label: 'Filter by ID',
    value: ''
  },
  {
    name: 'date',
    label: 'Date',
    type: 'calendar',
    value: null,
    props: {
      showTime: true
    }
  },
  {
    name: 'dropdown',
    label: 'Dropdown',
    type: 'select',
    value: null,
    options: [
      {
        label: 'hello',
        value: 'hello'
      },
      {
        label: 'world',
        value: 'world'
      }
    ]
  }
]

const tableData = ref([])
const search = ref('')
const sortKey = ref(null)
const sortDirection = ref(SORT_DESC)
const selectedRows = ref([])
const expandedRows = ref([])

const fetchDataFunction = async (payload) => {
  console.log(payload)

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return { data }
}

const searchDataFunction = async (payload) => {
  console.log(payload)

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return { data }
}

const handleClickEdit = (data) => {
  console.log(data)
}

const handleSubmitEditCell = (data) => {
  console.log(data)
}
</script>

<template>
  <div class="wrapper">
    <VueEntityTable
      v-model="tableData"
      v-model:selected-rows="selectedRows"
      v-model:search="search"
      v-model:sort-key="sortKey"
      v-model:sort-direction="sortDirection"
      v-model:expanded-rows="expandedRows"
      :descriptor="descriptor"
      :filter-descriptor="filterDescriptor"
      :fetch-data-function="fetchDataFunction"
      :search-data-function="searchDataFunction"
      @on-click-edit="handleClickEdit"
      @on-submit-edit-cell="handleSubmitEditCell"
    >
      <template #expansion="{ row, index }">
        <div class="expansion">
          <pre>Index: {{ index }}<br><br>Row Full Data: {{ row }}</pre>
        </div>
      </template>
    </VueEntityTable>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

.wrapper {
  height: 100vh;
}

.expansion {
  padding: 1rem;
}
</style>
