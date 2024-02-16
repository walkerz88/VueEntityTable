<script setup>
/* import { useDialogStore } from '@/app/store'

const props = defineProps({
  header: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const dialog = useDialogStore()

const onClick = () => {
  dialog.show({ header: props.header, text: props.text })
} */
</script>

<template>
  <div>{{ text }}</div>
  <!-- <div
    v-if="text"
    v-tooltip="{ value: text, class: 'entity-table-v-tooltip' }"
    class="vue-entity-table-tooltip-cell"
    @click="onClick"
  >
    {{ text }}
  </div> -->
</template>