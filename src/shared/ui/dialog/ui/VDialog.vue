<script setup>
import { computed, useSlots } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import { VSubmitButton } from '@/shared'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  header: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  defaultFooter: {
    type: Boolean,
    default: false
  },
  footerCancelLabel: {
    type: String,
    default: 'Отмена'
  },
  footerSubmitSeverity: {
    type: String,
    default: 'primary'
  },
  footerSubmitLabel: {
    type: String,
    default: 'Далее'
  },
  loading: {
    type: Boolean,
    default: false
  },
  invalid: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'on-hide', 'on-submit-form'])

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)

const handleUpdateVisible = (value) => {
  if (value === false) {
    emit('update:modelValue', false)
    emit('on-hide')
  }
}

const handleSubmitForm = () => {
  emit('on-submit-form')
}
</script>

<template>
  <Dialog
    :visible="modelValue"
    :header="header"
    modal
    @update:visible="handleUpdateVisible"
  >
    <template #header>
      <slot v-if="hasHeaderSlot === true" name="header" />
      <div v-else-if="header" class="VDialog__header">
        <div class="VDialog__title">{{ header }}</div>
        <div v-if="caption" class="VDialog__caption">{{ caption }}</div>
      </div>
      <span v-else />
    </template>

    <slot />

    <template v-if="hasFooterSlot === true || defaultFooter === true" #footer>
      <slot v-if="hasFooterSlot === true" name="footer" />
      <div v-else-if="defaultFooter === true" class="VDialog__footer">
        <Button
          :label="footerCancelLabel"
          text
          severity="secondary"
          @click="() => handleUpdateVisible(false)"
        />
        <VSubmitButton
          :label="footerSubmitLabel"
          :severity="footerSubmitSeverity"
          :loading="loading === true"
          :disabled="invalid === true"
          @on-click="handleSubmitForm"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.VDialog__header {
  padding-right: 1rem;
}

.VDialog__title {
  font-weight: 700;
  font-size: 1.25rem;
}

.VDialog__caption {
  color: var(--text-color-secondary);
}

.VDialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
