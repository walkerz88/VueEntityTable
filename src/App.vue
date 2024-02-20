<script setup>
import { ref } from 'vue'

import { VueEntityTable } from './widgets/vue-entity-table'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'

const descriptor = [
  {
    name: 'id',
    label: 'ID'
  },
  {
    name: 'email',
    label: 'Email',
    align: 'right'
  },
  {
    name: 'name',
    label: 'Name'
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
    label: 'Filter by ID'
  },
  {
    name: 'date',
    label: 'Date',
    type: 'calendar',
    props: {
      showTime: true
    }
  }
]

const tableData = ref([])

const fetchDataFunction = async (payload) => {
  console.log(payload)

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return { data }
}
</script>

<template>
  <div class="wrapper">
    <VueEntityTable
      v-model="tableData"
      :descriptor="descriptor"
      :filter-descriptor="filterDescriptor"
      :fetch-data-function="fetchDataFunction"
      :show-total="true"
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
