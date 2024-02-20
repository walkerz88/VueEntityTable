<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'

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

const visible = ref(false)

const onClick = () => {
  visible.value = true
}
</script>

<template>
  <div v-if="text" class="vue-entity-table-tooltip-cell" @click="onClick">
    {{ text }}
  </div>

  <Dialog
    v-model:visible="visible"
    :header="header"
    :style="{ width: '100%', maxWidth: '640px' }"
    :draggable="false"
    modal
  >
    {{ text }}
  </Dialog>
</template>
