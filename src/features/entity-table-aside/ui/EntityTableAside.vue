<script setup>
import Button from 'primevue/button'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const onClose = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    :class="[
      'vue-entity-table-aside',
      modelValue === true && 'vue-entity-table-aside--active'
    ]"
  >
    <div class="vue-entity-table-aside__header">
      <div class="vue-entity-table-aside__title">
        <i v-show="icon !== undefined" :class="icon" />
        {{ title }}
      </div>
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-text p-button-danger c-icon-button"
        @click="onClose"
      />
    </div>
    <div class="vue-entity-table-aside__content">
      <slot />
    </div>
  </div>
</template>
