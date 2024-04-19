<script setup>
import Button from 'primevue/button'

defineProps({
  label: {
    type: String,
    default: 'Сохранить'
  },
  size: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  severity: {
    type: String,
    default: 'success'
  }
})

const emits = defineEmits(['on-click'])

const handleOnClick = () => {
  emits('on-click')
}
</script>

<template>
  <Button
    :severity="disabled === true ? 'secondary' : severity"
    :size="size"
    :label="label"
    :text="text"
    :loading="loading === true"
    :disabled="disabled === true"
    class="vet-submit-button"
    @click="handleOnClick"
  />
</template>

<style scoped>
.vet-submit-button:deep(.p-button-label) {
  transition: none;
}
</style>
