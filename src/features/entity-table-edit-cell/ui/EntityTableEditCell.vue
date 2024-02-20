<script setup>
import { ref, nextTick } from 'vue'

import Textarea from 'primevue/textarea'

const props = defineProps({
  value: {
    type: [String, Number, null, undefined],
    default: ''
  },
  row: {
    type: Object,
    default: () => ({})
  },
  column: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['on-submit'])

const inputRef = ref(null)
const isEdit = ref(false)
const initValue = ref(props.value)
const inputValue = ref(props.value)

const onOpenEdit = async () => {
  isEdit.value = true

  await nextTick()

  inputRef.value.$el.focus()
}

const onCloseEdit = () => {
  inputValue.value = initValue.value
  isEdit.value = false
}

const onSubmit = () => {
  isEdit.value = false
  initValue.value = inputValue.value

  emit('on-submit', {
    value: inputValue.value
  })
}
</script>

<template>
  <div v-show="isEdit === true" class="vue-entity-table-edit-cell">
    <div class="vue-entity-table-edit-cell__controls">
      <button class="vue-entity-table-edit-cell__button" @click="onCloseEdit">
        <i class="pi pi-times" />
      </button>
      <button class="vue-entity-table-edit-cell__button" @click="onSubmit">
        <i class="pi pi-save" />
      </button>
    </div>
    <Textarea
      ref="inputRef"
      v-model="inputValue"
      :auto-resize="true"
      class="vue-entity-table-edit-cell__textarea"
    />
  </div>
  <div v-show="isEdit === false" class="vue-entity-table-edit-cell">
    <div class="vue-entity-table-edit-cell__controls">
      <button class="vue-entity-table-edit-cell__button" @click="onOpenEdit">
        <i v-if="inputValue" class="pi pi-pencil" />
        <i v-else class="pi pi-plus" />
      </button>
    </div>
    <div v-if="inputValue" class="vue-entity-table-edit-cell__value">
      {{ inputValue }}
    </div>
  </div>
</template>
