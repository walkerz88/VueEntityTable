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
</script>

<template>
  <div class="wrapper">
    {{ sortKey }}{{ sortDirection }}{{ search }}
    <VueEntityTable
      v-model="tableData"
      v-model:search="search"
      v-model:sort-key="sortKey"
      v-model:sort-direction="sortDirection"
      :descriptor="descriptor"
      :filter-descriptor="filterDescriptor"
      :fetch-data-function="fetchDataFunction"
      :search-data-function="searchDataFunction"
      show-total
      @on-click-edit="({ row }) => console.log({ row })"
    />
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

* {
  box-sizing: border-box;
}

.wrapper {
  height: 100vh;
}
</style>
